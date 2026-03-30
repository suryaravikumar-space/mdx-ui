import { Command } from "commander"
import prompts from "prompts"
import chalk from "chalk"
import ora from "ora"
import fs from "fs-extra"
import path from "path"
import { execa } from "execa"
import { detectProjectStructure, type Framework } from "../utils/detect-structure.js"

const FRAMEWORK_LABELS: Record<Framework, string> = {
  nextjs: "Next.js",
  astro: "Astro",
  react: "React",
  unknown: "Unknown",
}

export const init = new Command()
  .name("init")
  .description("Initialize your project for mdx-ui")
  .action(async () => {
    console.log(chalk.bold("\n✨ Welcome to mdx-ui!\n"))

    const cwd = process.cwd()
    const structure = await detectProjectStructure(cwd)

    console.log(chalk.dim(`Detected framework: ${chalk.white(FRAMEWORK_LABELS[structure.framework])}`))
    console.log(chalk.dim(`Structure: ${structure.hasSrc ? "src/" : "root-level"}\n`))

    const config = await prompts([
      {
        type: "text",
        name: "componentsDir",
        message: "Where should we put the components?",
        initial: structure.componentsDir,
      },
      {
        type: "confirm",
        name: "typescript",
        message: "Are you using TypeScript?",
        initial: structure.hasTypeScript,
      },
      {
        type: "confirm",
        name: "tailwind",
        message: "Are you using Tailwind CSS?",
        initial: structure.hasTailwind,
      },
    ])

    const spinner = ora("Initializing project...").start()

    try {
      await fs.ensureDir(path.join(cwd, config.componentsDir))
      await fs.ensureDir(path.join(cwd, structure.libDir))

      const ext = config.typescript ? "ts" : "js"
      const utilsContent = config.typescript
        ? `import { clsx, type ClassValue } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}\n`
        : `import { clsx } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs) {\n  return twMerge(clsx(inputs))\n}\n`

      await fs.writeFile(path.join(cwd, structure.libDir, `utils.${ext}`), utilsContent)

      // Framework-specific setup
      await setupFramework(structure.framework, cwd, spinner)

      await fs.writeJSON(
        path.join(cwd, "mdx-ui.json"),
        {
          $schema: "https://mdx-ui.com/schema.json",
          framework: structure.framework,
          componentsDir: config.componentsDir,
          typescript: config.typescript,
          tailwind: config.tailwind,
        },
        { spaces: 2 }
      )

      spinner.succeed("Project initialized!")

      console.log(chalk.green("\n✓ Created mdx-ui.json"))
      console.log(chalk.green(`✓ Created ${config.componentsDir}/`))
      console.log(chalk.green(`✓ Created ${structure.libDir}/utils.${ext}`))

      printNextSteps(structure.framework)
    } catch (error) {
      spinner.fail("Failed to initialize project")
      console.error(error)
      process.exit(1)
    }
  })

async function setupFramework(framework: Framework, cwd: string, spinner: ReturnType<typeof ora>) {
  if (framework !== "astro") return

  const pkg = await fs.readJSON(path.join(cwd, "package.json"))
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }

  if (!("@astrojs/react" in deps)) {
    spinner.text = "Installing @astrojs/react..."
    const pm = (await fs.pathExists(path.join(cwd, "pnpm-lock.yaml")))
      ? "pnpm"
      : (await fs.pathExists(path.join(cwd, "yarn.lock")))
      ? "yarn"
      : "npm"
    const addCmd = pm === "npm" ? "install" : "add"
    await execa(pm, [addCmd, "-D", "@astrojs/react", "react", "react-dom", "@types/react", "@types/react-dom"], { cwd })
  }

  // Patch astro.config to add react integration
  const astroConfig =
    (await fs.pathExists(path.join(cwd, "astro.config.ts")))
      ? path.join(cwd, "astro.config.ts")
      : path.join(cwd, "astro.config.mjs")

  if (await fs.pathExists(astroConfig)) {
    let content = await fs.readFile(astroConfig, "utf-8")
    if (!content.includes("@astrojs/react")) {
      content = `import react from "@astrojs/react"\n` + content
      content = content.replace(/integrations:\s*\[/, "integrations: [\n    react(),")
      await fs.writeFile(astroConfig, content)
    }
  }
}

function printNextSteps(framework: Framework) {
  console.log(chalk.bold("\n🎉 You're all set!\n"))
  console.log("Next steps:")
  console.log(chalk.cyan("  npx @ravikumarsurya/mdx-ui add callout"))
  console.log(chalk.cyan("  npx @ravikumarsurya/mdx-ui list"))

  if (framework === "astro") {
    console.log(chalk.dim("\nFor interactive components in Astro, use client:load:"))
    console.log(chalk.white("  <Callout client:load>Hello</Callout>"))
  }

  if (framework !== "unknown") {
    console.log(chalk.dim("\nFor math/chemistry support, import KaTeX CSS in your root layout:"))
    console.log(chalk.white('  import "katex/dist/katex.min.css"'))
  }

  console.log()
}
