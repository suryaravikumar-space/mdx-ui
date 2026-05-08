import { Command } from "commander"
import chalk from "chalk"
import fs from "fs-extra"
import path from "path"
import { getConfig } from "../utils/get-config.js"
import { COMPONENT_FILES, COMPONENT_DEPS } from "../lib/component-registry.js"

interface Issue {
  level: "error" | "warn"
  message: string
}

async function getInstalledDeps(cwd: string): Promise<Set<string>> {
  const installed = new Set<string>()
  const p = path.join(cwd, "package.json")
  if (!(await fs.pathExists(p))) return installed
  try {
    const pkg = await fs.readJSON(p)
    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies, ...pkg.peerDependencies }
    Object.keys(allDeps).forEach(d => installed.add(d))
  } catch { /* ignore */ }
  return installed
}

export const doctor = new Command()
  .name("doctor")
  .description("Check your project for missing dependencies or broken component setup")
  .action(async () => {
    console.log()
    console.log(chalk.bold("Running mdx-ui doctor...\n"))

    const issues: Issue[] = []
    const cwd = process.cwd()

    // ── 1. Config ──────────────────────────────────────────────────────────
    const config = await getConfig()
    if (!config) {
      issues.push({ level: "error", message: "No mdx-ui.json found — run: npx @ravikumarsurya/mdx-ui init" })
      printReport(issues)
      return
    }
    console.log(`  ${chalk.green("✓")}  mdx-ui.json found  ${chalk.dim(`(componentsDir: ${config.componentsDir})`)}`)

    // ── 2. Components dir ──────────────────────────────────────────────────
    const compDir = path.join(cwd, config.componentsDir)
    if (!(await fs.pathExists(compDir))) {
      issues.push({ level: "error", message: `Components directory not found: ${config.componentsDir}` })
      printReport(issues)
      return
    }

    // ── 3. Discover installed components ──────────────────────────────────
    const files = await fs.readdir(compDir)
    const installed: string[] = []
    for (const [name, compFiles] of Object.entries(COMPONENT_FILES)) {
      if (compFiles.every(f => files.includes(f))) installed.push(name)
    }

    if (installed.length === 0) {
      console.log(chalk.yellow("  No mdx-ui components found in components directory."))
      printReport(issues)
      return
    }
    console.log(`  ${chalk.green("✓")}  ${installed.length} component${installed.length !== 1 ? "s" : ""} installed  ${chalk.dim(`(${installed.join(", ")})`)}\n`)

    // ── 4. lib/utils.ts ────────────────────────────────────────────────────
    const libDir = config.componentsDir.startsWith("src/") ? "src/lib" : "lib"
    const utilsPath = path.join(cwd, libDir, "utils.ts")
    if (!(await fs.pathExists(utilsPath))) {
      issues.push({ level: "error", message: `lib/utils.ts not found — run: npx @ravikumarsurya/mdx-ui add utils` })
    } else {
      console.log(`  ${chalk.green("✓")}  ${libDir}/utils.ts`)
    }

    // ── 5. npm dependencies ────────────────────────────────────────────────
    const installedDeps = await getInstalledDeps(cwd)
    const missingDeps = new Set<string>()

    for (const name of installed) {
      for (const dep of COMPONENT_DEPS[name] ?? []) {
        if (!installedDeps.has(dep)) missingDeps.add(dep)
      }
    }

    if (missingDeps.size > 0) {
      for (const dep of missingDeps) {
        issues.push({ level: "error", message: `Missing npm dependency: ${dep}` })
      }
      console.log()
      console.log(`  ${chalk.red("✗")}  Missing deps: ${chalk.bold([...missingDeps].join(", "))}`)
      console.log(`     Fix: npm install ${[...missingDeps].join(" ")}`)
    } else {
      console.log(`  ${chalk.green("✓")}  All npm dependencies present`)
    }

    // ── 6. mdx-components.tsx ──────────────────────────────────────────────
    const mdxPath = path.join(cwd, config.componentsDir, "mdx-components.tsx")
    if (!(await fs.pathExists(mdxPath))) {
      issues.push({ level: "warn", message: "mdx-components.tsx not found — component auto-mapping unavailable" })
    } else {
      const mdxContent = await fs.readFile(mdxPath, "utf-8")
      const notMapped: string[] = []
      for (const name of installed) {
        if (!mdxContent.includes(`from "./${name}"`)) notMapped.push(name)
      }
      if (notMapped.length > 0) {
        issues.push({ level: "warn", message: `Not imported in mdx-components.tsx: ${notMapped.join(", ")} — re-run add for these components` })
        console.log()
        console.log(`  ${chalk.yellow("~")}  Not mapped in mdx-components.tsx: ${notMapped.join(", ")}`)
      } else {
        console.log(`  ${chalk.green("✓")}  mdx-components.tsx looks good`)
      }
    }

    printReport(issues)
  })

function printReport(issues: Issue[]) {
  console.log()

  if (issues.length === 0) {
    console.log(chalk.green(chalk.bold("All checks passed.")))
    console.log()
    return
  }

  const errors = issues.filter(i => i.level === "error")
  const warns  = issues.filter(i => i.level === "warn")

  if (errors.length > 0) {
    console.log(chalk.red(chalk.bold(`${errors.length} error${errors.length !== 1 ? "s" : ""}:`)))
    for (const e of errors) console.log(`  ${chalk.red("✗")}  ${e.message}`)
    console.log()
  }
  if (warns.length > 0) {
    console.log(chalk.yellow(chalk.bold(`${warns.length} warning${warns.length !== 1 ? "s" : ""}:`)))
    for (const w of warns) console.log(`  ${chalk.yellow("~")}  ${w.message}`)
    console.log()
  }
}
