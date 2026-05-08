#!/usr/bin/env node

import fs from "fs-extra"
import path from "path"
import { fileURLToPath } from "url"
import crypto from "crypto"

function integrity(content: string): string {
  return `sha256-${crypto.createHash("sha256").update(content).digest("base64")}`
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Component metadata - describes each component
const componentsMetadata: Record<string, {
  description: string
  dependencies?: string[]
  registryDependencies?: string[]
}> = {
  "alert": {
    description: "Semantic alert boxes with role='alert' and info/warning/destructive/success variants",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "accordion": {
    description: "Collapsible accordion sections with single or multiple open items",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "badge": {
    description: "Status badges with multiple variants (default, success, warning, info, destructive)",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "blockquote": {
    description: "Styled quote blocks with optional citation",
    dependencies: []
  },
  "card": {
    description: "Card layout components (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter) plus LinkCard for navigation grids",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "callout": {
    description: "Alert boxes for important information with variants",
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "code-block": {
    description: "Syntax highlighted code blocks with title and line numbers",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "changelog": {
    description: "Changelog component — versioned entries with a timeline and typed change badges (added/fixed/changed/removed/security)",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "code-group": {
    description: "Tabbed code block group — show npm/pnpm/yarn or multi-language examples side by side",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "diff-block": {
    description: "Code diff block — highlights + additions and - removals with green/red backgrounds",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "emphasis": {
    description: "Text emphasis components for bold (strong) and italic (em) styling",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "file-tree": {
    description: "Simple string-based file/folder tree structure with minimal syntax",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "heading": {
    description: "Flexible and reusable heading component with variant support",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["utils"]
  },
  "headings": {
    description: "Markdown headings (H1-H6) with auto-generated anchor links for navigation",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "horizontal-rule": {
    description: "Divider lines with multiple styles (default, dashed, dotted, gradient)",
    dependencies: []
  },
  "kbd": {
    description: "Keyboard shortcut display — styled <kbd> element for showing key combinations like Ctrl+K",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "link": {
    description: "Styled anchor — auto-detects external URLs, adds open-in-new-tab icon and rel='noopener noreferrer'",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "json-ld": {
    description: "JSON-LD structured data — renders a <script type='application/ld+json'> tag for SEO (Article, BreadcrumbList, FAQPage, etc.)",
    dependencies: []
  },
  "image": {
    description: "Image with optional caption, plus ImageGlossary — responsive 1–3 column grid of images as seen in react.dev",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "inline-code": {
    description: "Inline code component for displaying code snippets within text",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "list": {
    description: "Styled ordered and unordered lists with list items",
    dependencies: []
  },
  "math": {
    description: "LaTeX math rendering with block and inline support",
    dependencies: ["katex", "clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "mdx-components": {
    description: "Auto-discovering MDX component mapper - automatically uses all installed mdx-ui components",
    dependencies: ["@types/mdx"],
    registryDependencies: ["utils"]
  },
  "mermaid": {
    description: "Mermaid diagram rendering for flowcharts, sequences, and more",
    dependencies: ["mermaid", "clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "paragraph": {
    description: "Standard text paragraph component with proper spacing and typography",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "spoiler": {
    description: "Collapsible <details>/<summary> disclosure — lightweight alternative to Accordion for single items",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "terminal": {
    description: "Terminal window component — macOS-style title bar with traffic lights, TerminalLine for input/output lines",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "steps": {
    description: "Numbered step-by-step guides with visual indicators",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "table": {
    description: "Styled table components with header, body, footer, and caption",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "tabs": {
    description: "Tabbed content sections with state management and keyboard navigation",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "tree": {
    description: "Interactive file/folder tree structure for displaying project organization",
    dependencies: [],
    registryDependencies: ["utils"]
  },
  "video": {
    description: "Video embed — auto-detects YouTube, Vimeo, and HTML5 video sources with aspect-ratio container and optional caption",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"]
  },
  "utils": {
    description: "Utility functions for className merging (cn)",
    dependencies: ["clsx", "tailwind-merge"]
  }
}

async function buildRegistry() {
  console.log("🔨 Building registry from packages/registry/src...\n")

  const srcDir = path.join(__dirname, "../packages/registry/src")
  const registryDir = path.join(__dirname, "../registry")
  const mdxDir = path.join(registryDir, "mdx")

  // Ensure directories exist
  await fs.ensureDir(mdxDir)

  // Get all .tsx files from src
  const files = await fs.readdir(srcDir)
  const tsxFiles = files.filter(f => f.endsWith(".tsx"))

  const components: any[] = []

  for (const file of tsxFiles) {
    const componentName = file.replace(".tsx", "")
    const filePath = path.join(srcDir, file)
    const content = await fs.readFile(filePath, "utf-8")

    const metadata = componentsMetadata[componentName]
    if (!metadata) {
      console.warn(`⚠️  No metadata found for ${componentName}, skipping...`)
      continue
    }

    // Create component JSON
    const componentJson = {
      name: componentName,
      type: componentName === "utils" ? "utility" : "component",
      description: metadata.description,
      dependencies: metadata.dependencies || [],
      registryDependencies: metadata.registryDependencies || [],
      files: [
        {
          path: file,
          content: content,
          integrity: integrity(content),
        }
      ]
    }

    // Write individual component JSON
    const outputPath = path.join(mdxDir, `${componentName}.json`)
    await fs.writeJSON(outputPath, componentJson, { spaces: 2 })
    console.log(`✅ Generated ${componentName}.json`)

    // Add to registry
    components.push({
      name: componentName,
      type: componentName === "utils" ? "utility" : "mdx",
      description: metadata.description,
      files: [`mdx/${componentName}.json`],
      ...(metadata.registryDependencies && metadata.registryDependencies.length > 0
        ? { registryDependencies: metadata.registryDependencies }
        : {})
    })
  }

  // Check for lib/utils.ts
  const utilsPath = path.join(srcDir, "lib/utils.ts")
  if (await fs.pathExists(utilsPath)) {
    const content = await fs.readFile(utilsPath, "utf-8")
    const utilsMetadata = componentsMetadata["utils"]
    const componentJson = {
      name: "utils",
      type: "utility",
      description: utilsMetadata?.description || "Utility functions for className merging (cn)",
      dependencies: utilsMetadata?.dependencies || [],
      files: [
        {
          path: "lib/utils.ts",
          content: content,
          integrity: integrity(content),
        }
      ]
    }

    const outputPath = path.join(mdxDir, "utils.json")
    await fs.writeJSON(outputPath, componentJson, { spaces: 2 })
    console.log(`✅ Generated utils.json`)

    components.push({
      name: "utils",
      type: "utility",
      description: "Utility functions for className merging (cn)",
      files: ["mdx/utils.json"]
    })
  }

  // Generate main registry.json
  const registryJson = {
    $schema: "./schema.json",
    components: components.sort((a, b) => a.name.localeCompare(b.name))
  }

  await fs.writeJSON(path.join(registryDir, "registry.json"), registryJson, { spaces: 2 })
  console.log(`✅ Generated registry.json`)

  console.log(`\n🎉 Registry built successfully! Generated ${components.length} components.`)
}

buildRegistry().catch(console.error)
