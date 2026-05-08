import { Command } from "commander"
import chalk from "chalk"
import ora from "ora"
import fs from "fs-extra"
import path from "path"
import { getConfig } from "../utils/get-config.js"
import { fetchComponent, type ComponentData } from "../utils/fetch-component.js"
import { installDependencies } from "../utils/install-deps.js"
import { writeComponent } from "../utils/write-component.js"

// Map component filenames → registry component names
const FILE_TO_COMPONENT: Record<string, string> = {
  "accordion.tsx":      "accordion",
  "badge.tsx":          "badge",
  "blockquote.tsx":     "blockquote",
  "callout.tsx":        "callout",
  "code-block.tsx":     "code-block",
  "code-group.tsx":     "code-group",
  "emphasis.tsx":       "emphasis",
  "file-tree.tsx":      "file-tree",
  "heading.tsx":        "heading",
  "headings.tsx":       "headings",
  "horizontal-rule.tsx":"horizontal-rule",
  "image.tsx":          "image",
  "inline-code.tsx":    "inline-code",
  "list.tsx":           "list",
  "math.tsx":           "math",
  "mdx-components.tsx": "mdx-components",
  "mermaid.tsx":        "mermaid",
  "paragraph.tsx":      "paragraph",
  "steps.tsx":          "steps",
  "table.tsx":          "table",
  "tabs.tsx":           "tabs",
  "tree.tsx":           "tree",
}

async function discoverInstalled(componentsDir: string, cwd: string): Promise<string[]> {
  const dir = path.join(cwd, componentsDir)
  if (!(await fs.pathExists(dir))) return []

  const files = await fs.readdir(dir)
  const found = files
    .map(f => FILE_TO_COMPONENT[f])
    .filter((n): n is string => !!n)

  // Check for utils
  const libDir = componentsDir.startsWith("src/") ? "src/lib" : "lib"
  if (await fs.pathExists(path.join(cwd, libDir, "utils.ts"))) {
    found.unshift("utils")
  }

  return [...new Set(found)]
}

export const update = new Command()
  .name("update")
  .description("Update installed components to their latest versions")
  .argument("[components...]", "components to update (omit to update all installed)")
  .action(async (targets: string[]) => {
    console.log()

    const config = await getConfig()
    if (!config) {
      console.log(chalk.red("✗ No mdx-ui.json found."))
      console.log(chalk.yellow("  Run: npx @ravikumarsurya/mdx-ui init\n"))
      process.exit(1)
    }

    const cwd = process.cwd()
    let toUpdate: string[]

    if (targets.length > 0) {
      toUpdate = targets
    } else {
      toUpdate = await discoverInstalled(config.componentsDir, cwd)
      if (toUpdate.length === 0) {
        console.log(chalk.yellow("No installed components found."))
        console.log(chalk.dim("  Run: npx @ravikumarsurya/mdx-ui add <component>\n"))
        process.exit(0)
      }
    }

    console.log(chalk.bold(`Updating ${toUpdate.length} component${toUpdate.length !== 1 ? "s" : ""}...\n`))
    const spinner = ora("Fetching latest versions...").start()

    try {
      // Resolve all components including registry dependencies
      const componentsData: ComponentData[] = []
      const processed = new Set<string>()

      async function fetchRecursive(name: string) {
        if (processed.has(name)) return
        processed.add(name)
        const data = await fetchComponent(name)
        if (data.registryDependencies?.length) {
          for (const dep of data.registryDependencies) {
            await fetchRecursive(dep)
          }
        }
        componentsData.push(data)
      }

      for (const name of toUpdate) {
        await fetchRecursive(name)
      }

      spinner.text = "Installing dependencies..."
      const allDeps = new Set<string>()
      for (const data of componentsData) {
        data.dependencies?.forEach(d => allDeps.add(d))
      }
      if (allDeps.size > 0) {
        await installDependencies(Array.from(allDeps))
      }

      spinner.text = "Writing updated components..."
      for (const data of componentsData) {
        await writeComponent(data, config)
      }

      spinner.succeed("Components updated!")
      console.log()
      for (const name of toUpdate) {
        console.log(chalk.green(`  ✓ ${name}`))
      }
      console.log()
    } catch (error: any) {
      spinner.fail("Update failed")
      console.error(chalk.red(`  ${error.message}\n`))
      process.exit(1)
    }
  })
