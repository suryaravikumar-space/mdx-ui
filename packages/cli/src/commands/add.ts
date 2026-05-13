import { Command } from "commander"
import prompts from "prompts"
import chalk from "chalk"
import ora from "ora"
import fs from "fs-extra"
import path from "path"
import { getConfig } from "../utils/get-config.js"
import { fetchComponent, type ComponentData } from "../utils/fetch-component.js"
import { installDependencies } from "../utils/install-deps.js"
import { writeComponent } from "../utils/write-component.js"
import { COMPONENT_MDX_MAP, REGISTRY } from "../lib/component-registry.js"

interface RegistryComponent {
  name: string
  type: string
  description: string
  files: string[]
  registryDependencies?: string[]
}

async function patchMdxComponents(
  componentName: string,
  componentsDir: string,
  cwd: string
): Promise<void> {
  const mapping = COMPONENT_MDX_MAP[componentName]
  if (!mapping) return

  // Prefer .tsx but fall back to .jsx
  let mdxPath = path.join(cwd, componentsDir, "mdx-components.tsx")
  if (!(await fs.pathExists(mdxPath))) {
    const jsxPath = path.join(cwd, componentsDir, "mdx-components.jsx")
    if (await fs.pathExists(jsxPath)) {
      mdxPath = jsxPath
    } else {
      // File doesn't exist yet — create it with markers so patching can proceed
      await fs.ensureDir(path.dirname(mdxPath))
      await fs.writeFile(
        mdxPath,
        `// Auto-managed by mdx-ui CLI — run \`npx @ravikumarsurya/mdx-ui add <component>\` to update.\n// @mdx-ui-imports-start\n// @mdx-ui-imports-end\n\nexport const mdxComponents = {\n// @mdx-ui-mappings-start\n// @mdx-ui-mappings-end\n}\n`
      )
    }
  }

  let content = await fs.readFile(mdxPath, "utf-8")

  const IMPORTS_START = "// @mdx-ui-imports-start"
  const IMPORTS_END   = "// @mdx-ui-imports-end"
  const MAP_START     = "// @mdx-ui-mappings-start"
  const MAP_END       = "// @mdx-ui-mappings-end"

  // --- patch imports block ---
  const iStart = content.indexOf(IMPORTS_START)
  const iEnd   = content.indexOf(IMPORTS_END)
  if (iStart !== -1 && iEnd !== -1) {
    const block = content.slice(iStart + IMPORTS_START.length, iEnd)
    if (!block.includes(mapping.importFile)) {
      const line = `\nimport { ${mapping.imports.join(", ")} } from "${mapping.importFile}"`
      content =
        content.slice(0, iStart + IMPORTS_START.length) +
        block + line + "\n" +
        content.slice(iEnd)
    }
  }

  // --- patch mappings block ---
  const mStart = content.indexOf(MAP_START)
  const mEnd   = content.indexOf(MAP_END)
  if (mStart !== -1 && mEnd !== -1) {
    const block = content.slice(mStart + MAP_START.length, mEnd)
    let additions = ""

    for (const [element, component] of Object.entries(mapping.elementMappings)) {
      if (!block.includes(`${element}:`)) {
        additions += `\n    ${element}: ${component},`
      }
    }

    for (const exportName of mapping.imports) {
      const alreadyMapped = Object.values(mapping.elementMappings).includes(exportName)
      if (!alreadyMapped && !block.includes(`${exportName},`) && !block.includes(`${exportName}:`)) {
        additions += `\n    ${exportName},`
      }
    }

    if (additions) {
      content =
        content.slice(0, mStart + MAP_START.length) +
        block + additions + "\n    " +
        content.slice(mEnd)
    }
  }

  await fs.writeFile(mdxPath, content)
}

function loadRegistry(): { components: RegistryComponent[] } {
  return {
    components: Object.entries(REGISTRY)
      .filter(([name]) => name !== "utils")
      .map(([name, entry]) => ({
        name,
        type: "mdx",
        description: entry.description,
        files: entry.files,
      })),
  }
}

export const add = new Command()
  .name("add")
  .description("Add components to your project")
  .argument("[components...]", "components to add")
  .action(async (components: string[]) => {
    console.log()

    const config = await getConfig()

    if (!config) {
      console.log(chalk.red("✗ No mdx-ui.json found"))
      console.log(chalk.yellow("Run 'npx mdx-ui init' first"))
      process.exit(1)
    }

    if (components.length === 0) {
      const registry = loadRegistry()
      const mdxComponents = registry.components.filter((c: RegistryComponent) => c.type === "mdx")

      const { selected } = await prompts({
        type: "multiselect",
        name: "selected",
        message: "Which components would you like to add?",
        choices: mdxComponents.map((c: RegistryComponent) => ({
          title: c.name
            .split("-")
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" "),
          value: c.name,
          description: c.description,
        })),
      })

      components = selected
    }

    if (!components || components.length === 0) {
      console.log(chalk.yellow("No components selected"))
      process.exit(0)
    }

    const spinner = ora("Fetching components...").start()

    try {
      const componentsData: ComponentData[] = []
      const processedComponents = new Set<string>()

      async function fetchComponentRecursive(componentName: string) {
        if (processedComponents.has(componentName)) return
        processedComponents.add(componentName)
        const data = await fetchComponent(componentName)

        if (data.registryDependencies && data.registryDependencies.length > 0) {
          for (const depName of data.registryDependencies) {
            await fetchComponentRecursive(depName)
          }
        }

        componentsData.push(data)
      }

      for (const component of components) {
        await fetchComponentRecursive(component)
      }

      spinner.text = "Installing dependencies..."

      const allDeps = new Set<string>()
      for (const data of componentsData) {
        data.dependencies?.forEach((dep: string) => allDeps.add(dep))
      }

      if (allDeps.size > 0) {
        await installDependencies(Array.from(allDeps))
      }

      spinner.text = "Writing components..."

      for (const data of componentsData) {
        await writeComponent(data, config)
      }

      for (const component of components) {
        await patchMdxComponents(component, config.componentsDir, process.cwd())
      }

      spinner.succeed("Components added successfully!")

      console.log()
      for (const component of components) {
        console.log(chalk.green(`✓ ${component}`))
      }

      console.log()
      console.log(chalk.bold("Done! 🎉"))
      console.log()
    } catch (error: any) {
      spinner.fail("Failed to add components")
      console.error(chalk.red(error.message))
      process.exit(1)
    }
  })
