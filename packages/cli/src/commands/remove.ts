import { Command } from "commander"
import prompts from "prompts"
import chalk from "chalk"
import fs from "fs-extra"
import path from "path"
import { getConfig } from "../utils/get-config.js"

// Same map as add.ts — drives import/mapping cleanup
const COMPONENT_MDX_MAP: Record<string, {
  importFile: string
  imports: string[]
  elementMappings: Record<string, string>
}> = {
  "alert":          { importFile: "./alert",          imports: ["Alert","AlertTitle","AlertDescription"],                                                      elementMappings: {} },
  "accordion":      { importFile: "./accordion",      imports: ["Accordion","AccordionItem","AccordionTrigger","AccordionContent"],                                elementMappings: {} },
  "heading":        { importFile: "./heading",        imports: ["H1","H2","H3","H4","H5","H6"],                                                                   elementMappings: { h1:"H1", h2:"H2", h3:"H3", h4:"H4", h5:"H5", h6:"H6" } },
  "paragraph":      { importFile: "./paragraph",      imports: ["Paragraph"],                                                                                     elementMappings: { p:"Paragraph" } },
  "blockquote":     { importFile: "./blockquote",     imports: ["Blockquote"],                                                                                    elementMappings: { blockquote:"Blockquote" } },
  "list":           { importFile: "./list",           imports: ["UnorderedList","OrderedList","ListItem"],                                                         elementMappings: { ul:"UnorderedList", ol:"OrderedList", li:"ListItem" } },
  "inline-code":    { importFile: "./inline-code",    imports: ["Code"],                                                                                          elementMappings: { code:"Code" } },
  "kbd":            { importFile: "./kbd",            imports: ["Kbd"],                                                                                       elementMappings: {} },
  "link":           { importFile: "./link",           imports: ["Link"],                                                                                      elementMappings: { a: "Link" } },
  "image":          { importFile: "./image",          imports: ["Image","ImageGlossary"],                                                                         elementMappings: { img:"Image" } },
  "horizontal-rule":{ importFile: "./horizontal-rule",imports: ["HorizontalRule"],                                                                                elementMappings: { hr:"HorizontalRule" } },
  "emphasis":       { importFile: "./emphasis",       imports: ["Strong","Em"],                                                                                   elementMappings: { strong:"Strong", em:"Em" } },
  "table":          { importFile: "./table",          imports: ["Table","TableHeader","TableBody","TableFooter","TableRow","TableHead","TableCell","TableCaption"], elementMappings: { table:"Table", thead:"TableHeader", tbody:"TableBody", tfoot:"TableFooter", tr:"TableRow", th:"TableHead", td:"TableCell" } },
  "card":           { importFile: "./card",           imports: ["Card","CardHeader","CardTitle","CardDescription","CardContent","CardFooter","LinkCard"], elementMappings: {} },
  "callout":        { importFile: "./callout",        imports: ["Callout"],                                                                                       elementMappings: {} },
  "tabs":           { importFile: "./tabs",           imports: ["Tabs","TabsList","TabsTrigger","TabsContent"],                                                    elementMappings: {} },
  "spoiler":        { importFile: "./spoiler",         imports: ["Spoiler"],                                                                               elementMappings: {} },
  "steps":          { importFile: "./steps",          imports: ["Steps","Step"],                                                                                  elementMappings: {} },
  "tree":           { importFile: "./tree",           imports: ["Tree","TreeItem"],                                                                               elementMappings: {} },
  "file-tree":      { importFile: "./file-tree",      imports: ["FileTree"],                                                                                      elementMappings: {} },
  "badge":          { importFile: "./badge",          imports: ["Badge"],                                                                                         elementMappings: {} },
  "math":           { importFile: "./math",           imports: ["Math","BlockMath","InlineMath"],                                                                 elementMappings: {} },
  "video":          { importFile: "./video",          imports: ["Video"],                                                                                        elementMappings: {} },
  "mermaid":        { importFile: "./mermaid",        imports: ["Mermaid"],                                                                                       elementMappings: {} },
  "code-block":     { importFile: "./code-block",     imports: ["CodeBlock"],                                                                                     elementMappings: { pre:"CodeBlock" } },
  "code-group":     { importFile: "./code-group",     imports: ["CodeGroup"],                                                                                     elementMappings: {} },
}

// Component name → files to delete (relative to componentsDir)
const COMPONENT_FILES: Record<string, string[]> = {
  "alert":          ["alert.tsx"],
  "accordion":      ["accordion.tsx"],
  "badge":          ["badge.tsx"],
  "blockquote":     ["blockquote.tsx"],
  "card":           ["card.tsx"],
  "callout":        ["callout.tsx"],
  "code-block":     ["code-block.tsx"],
  "code-group":     ["code-group.tsx"],
  "emphasis":       ["emphasis.tsx"],
  "file-tree":      ["file-tree.tsx"],
  "heading":        ["heading.tsx"],
  "headings":       ["headings.tsx"],
  "horizontal-rule":["horizontal-rule.tsx"],
  "kbd":            ["kbd.tsx"],
  "link":           ["link.tsx"],
  "image":          ["image.tsx"],
  "inline-code":    ["inline-code.tsx"],
  "list":           ["list.tsx"],
  "math":           ["math.tsx"],
  "mdx-components": ["mdx-components.tsx"],
  "video":          ["video.tsx"],
  "mermaid":        ["mermaid.tsx"],
  "paragraph":      ["paragraph.tsx"],
  "spoiler":        ["spoiler.tsx"],
  "steps":          ["steps.tsx"],
  "table":          ["table.tsx"],
  "tabs":           ["tabs.tsx"],
  "tree":           ["tree.tsx"],
}

async function unpatchMdxComponents(
  componentName: string,
  componentsDir: string,
  cwd: string
): Promise<void> {
  const mapping = COMPONENT_MDX_MAP[componentName]
  if (!mapping) return

  const mdxPath = path.join(cwd, componentsDir, "mdx-components.tsx")
  if (!(await fs.pathExists(mdxPath))) return

  let content = await fs.readFile(mdxPath, "utf-8")

  // Remove the import line
  const lines = content.split("\n")
  const filteredLines = lines.filter(
    line => !line.includes(`from "${mapping.importFile}"`)
  )
  content = filteredLines.join("\n")

  // Remove element mappings (e.g. `    h1: H1,`)
  for (const [element, component] of Object.entries(mapping.elementMappings)) {
    content = content.replace(
      new RegExp(`\n[ \t]+${element}:\\s*${component},`, "g"),
      ""
    )
  }

  // Remove named export mappings (e.g. `    Accordion,`)
  for (const exportName of mapping.imports) {
    const alreadyMapped = Object.values(mapping.elementMappings).includes(exportName)
    if (!alreadyMapped) {
      content = content.replace(
        new RegExp(`\n[ \t]+${exportName},`, "g"),
        ""
      )
    }
  }

  await fs.writeFile(mdxPath, content, "utf-8")
}

async function discoverInstalled(componentsDir: string, cwd: string): Promise<string[]> {
  const dir = path.join(cwd, componentsDir)
  if (!(await fs.pathExists(dir))) return []

  const files = await fs.readdir(dir)
  const installed: string[] = []

  for (const [name, componentFiles] of Object.entries(COMPONENT_FILES)) {
    if (componentFiles.every(f => files.includes(f))) {
      installed.push(name)
    }
  }

  // Check utils separately
  const libDir = componentsDir.startsWith("src/") ? "src/lib" : "lib"
  if (await fs.pathExists(path.join(cwd, libDir, "utils.ts"))) {
    installed.push("utils")
  }

  return [...new Set(installed)]
}

export const remove = new Command()
  .name("remove")
  .description("Remove installed components from your project")
  .argument("[components...]", "components to remove")
  .action(async (components: string[]) => {
    console.log()

    const config = await getConfig()
    if (!config) {
      console.log(chalk.red("✗ No mdx-ui.json found."))
      console.log(chalk.yellow("  Run: npx @ravikumarsurya/mdx-ui init\n"))
      process.exit(1)
    }

    const cwd = process.cwd()

    if (components.length === 0) {
      const installed = await discoverInstalled(config.componentsDir, cwd)
      if (installed.length === 0) {
        console.log(chalk.yellow("No installed components found.\n"))
        process.exit(0)
      }

      const { selected } = await prompts({
        type: "multiselect",
        name: "selected",
        message: "Which components would you like to remove?",
        choices: installed.map(name => ({ title: name, value: name })),
      })

      if (!selected || selected.length === 0) {
        console.log(chalk.yellow("Nothing selected.\n"))
        process.exit(0)
      }

      components = selected
    }

    // Confirm before deleting
    const { confirmed } = await prompts({
      type: "confirm",
      name: "confirmed",
      message: `Remove ${components.length} component${components.length !== 1 ? "s" : ""}? (${components.join(", ")})`,
      initial: false,
    })

    if (!confirmed) {
      console.log(chalk.yellow("\nCancelled.\n"))
      process.exit(0)
    }

    console.log()
    const removed: string[] = []
    const notFound: string[] = []

    for (const name of components) {
      const files = COMPONENT_FILES[name]

      if (!files) {
        notFound.push(name)
        continue
      }

      let deleted = false
      for (const file of files) {
        const filePath = path.join(cwd, config.componentsDir, file)
        if (await fs.pathExists(filePath)) {
          await fs.remove(filePath)
          deleted = true
        }
      }

      // Clean up mdx-components.tsx
      await unpatchMdxComponents(name, config.componentsDir, cwd)

      if (deleted) {
        removed.push(name)
        console.log(chalk.green(`  ✓ removed ${name}`))
      } else {
        notFound.push(name)
        console.log(chalk.dim(`  – ${name} (not installed)`))
      }
    }

    console.log()
    if (removed.length > 0) {
      console.log(chalk.bold(`Removed ${removed.length} component${removed.length !== 1 ? "s" : ""}.`))
    }
    if (notFound.length > 0) {
      console.log(chalk.yellow(`${notFound.length} not found: ${notFound.join(", ")}`))
    }
    console.log()
  })
