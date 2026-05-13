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

      // Set up @/ path alias
      if (config.typescript) {
        await setupPathAlias(structure.framework, structure.hasSrc, cwd, spinner)
      }

      // Set up CSS variable tokens
      if (config.tailwind) {
        const twVersion = await detectTailwindVersion(cwd)
        await setupGlobalCSS(structure.framework, structure.hasSrc, cwd, twVersion, spinner)
        await setupTailwindConfig(cwd, twVersion, spinner)
      }

      // Create mdx-components.tsx with patch markers
      await setupMdxComponents(config.componentsDir, config.typescript, cwd, spinner)

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
      console.log(chalk.green(`✓ Created ${config.componentsDir}/mdx-components.${config.typescript ? "tsx" : "jsx"}`))
      if (config.typescript && structure.framework !== "nextjs") {
        console.log(chalk.green("✓ Configured @/ path alias in tsconfig and vite.config"))
      }
      if (config.tailwind) {
        console.log(chalk.green("✓ Added CSS variable tokens to globals.css and tailwind.config"))
      }

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

async function setupPathAlias(framework: Framework, hasSrc: boolean, cwd: string, spinner: ReturnType<typeof ora>) {
  // Next.js already configures @/ alias — skip
  if (framework === "nextjs") return

  const aliasTarget = hasSrc ? "./src" : "."
  const aliasTargetTs = hasSrc ? ["./src/*"] : ["./*"]

  // Patch tsconfig.json
  const tsconfigPaths = [
    path.join(cwd, "tsconfig.app.json"), // Vite generates this
    path.join(cwd, "tsconfig.json"),
  ]

  for (const tsconfigPath of tsconfigPaths) {
    if (!(await fs.pathExists(tsconfigPath))) continue
    try {
      const tsconfig = await fs.readJSON(tsconfigPath)
      tsconfig.compilerOptions = tsconfig.compilerOptions ?? {}
      tsconfig.compilerOptions.baseUrl = "."
      tsconfig.compilerOptions.paths = {
        ...(tsconfig.compilerOptions.paths ?? {}),
        "@/*": aliasTargetTs,
      }
      await fs.writeJSON(tsconfigPath, tsconfig, { spaces: 2 })
      spinner.text = `Patched ${path.basename(tsconfigPath)} with @/ alias`
    } catch {
      // non-fatal
    }
  }

  // Patch vite.config.ts / vite.config.js
  const viteConfigPaths = [
    path.join(cwd, "vite.config.ts"),
    path.join(cwd, "vite.config.js"),
    path.join(cwd, "vite.config.mts"),
  ]

  for (const viteConfigPath of viteConfigPaths) {
    if (!(await fs.pathExists(viteConfigPath))) continue
    try {
      let content = await fs.readFile(viteConfigPath, "utf-8")

      // Add path import if missing
      if (!content.includes("import path from")) {
        content = `import path from "path"\n` + content
      }

      // Add resolve.alias if missing
      if (!content.includes("resolve:") && !content.includes("alias:")) {
        content = content.replace(
          /defineConfig\s*\(\s*\{/,
          `defineConfig({\n  resolve: {\n    alias: {\n      "@": path.resolve(__dirname, "${aliasTarget}"),\n    },\n  },`
        )
      }

      await fs.writeFile(viteConfigPath, content)
      spinner.text = `Patched ${path.basename(viteConfigPath)} with @/ alias`

      // Ensure @types/node is installed for path module
      const pkg = await fs.readJSON(path.join(cwd, "package.json"))
      const deps = { ...pkg.dependencies, ...pkg.devDependencies }
      if (!("@types/node" in deps)) {
        spinner.text = "Installing @types/node..."
        const pm = (await fs.pathExists(path.join(cwd, "pnpm-lock.yaml")))
          ? "pnpm"
          : (await fs.pathExists(path.join(cwd, "yarn.lock")))
          ? "yarn"
          : "npm"
        const addCmd = pm === "npm" ? "install" : "add"
        await execa(pm, [addCmd, "-D", "@types/node"], { cwd })
      }
    } catch {
      // non-fatal
    }
    break // only patch the first vite config found
  }
}

// Raw CSS variable values (framework/version agnostic)
const CSS_VARS_ROOT = `
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 47.4% 11.2%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 47.4% 11.2%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 47.4% 11.2%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 47.4% 11.2%;
    --radius: 0.5rem;
  }
  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;
    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;
    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;
    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;
    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;
    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;
    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }`

// Shiki dual-theme CSS — works with rehype-pretty-code defaultColor:false
const SHIKI_CSS = `
/* Shiki syntax highlighting — light/dark dual theme */
[data-code-block] code span {
  color: var(--shiki-light);
  font-style: var(--shiki-light-font-style);
  font-weight: var(--shiki-light-font-weight);
}
.dark [data-code-block] code span {
  color: var(--shiki-dark);
  font-style: var(--shiki-dark-font-style);
  font-weight: var(--shiki-dark-font-weight);
}
`

// Tailwind v3 — uses @layer base + @apply
const CSS_VARS_BLOCK_V3 = `
@layer base {${CSS_VARS_ROOT}
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
${SHIKI_CSS}`

// Tailwind v4 — @layer base and @apply not required; use @theme inline for token mapping
const CSS_VARS_BLOCK_V4 = `
@theme inline {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  --radius-lg: var(--radius);
  --radius-md: calc(var(--radius) - 2px);
  --radius-sm: calc(var(--radius) - 4px);
}
${CSS_VARS_ROOT}

*, *::before, *::after {
  border-color: hsl(var(--border));
}
body {
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
${SHIKI_CSS}`

// Tailwind v3 tailwind.config theme.extend patch
const TAILWIND_V3_THEME_EXTENSIONS = `
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },`

async function detectTailwindVersion(cwd: string): Promise<4 | 3> {
  try {
    const pkg = await fs.readJSON(path.join(cwd, "package.json"))
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }
    const version: string = deps["tailwindcss"] ?? ""
    return version.match(/^\^?4/) ? 4 : 3
  } catch {
    return 3
  }
}

async function setupGlobalCSS(
  _framework: Framework,
  hasSrc: boolean,
  cwd: string,
  twVersion: 4 | 3,
  spinner: ReturnType<typeof ora>
) {
  // All known CSS entry-point paths across all frameworks
  const candidatePaths = [
    path.join(cwd, "src/app/globals.css"),    // Next.js App Router (src)
    path.join(cwd, "app/globals.css"),         // Next.js App Router (root)
    path.join(cwd, "src/styles/globals.css"),  // Astro / custom
    path.join(cwd, "src/styles/global.css"),   // Astro / custom
    path.join(cwd, "src/index.css"),           // Vite React
    path.join(cwd, "src/globals.css"),         // custom
    path.join(cwd, "index.css"),               // root-level
    path.join(cwd, "globals.css"),             // root-level
  ]

  let cssPath: string | null = null
  for (const p of candidatePaths) {
    if (await fs.pathExists(p)) {
      cssPath = p
      break
    }
  }

  const cssVarsBlock = twVersion === 4 ? CSS_VARS_BLOCK_V4 : CSS_VARS_BLOCK_V3
  const twDirectives = twVersion === 4
    ? `@import "tailwindcss";\n`
    : `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`

  // No CSS file found — create one
  if (!cssPath) {
    cssPath = hasSrc
      ? path.join(cwd, "src/index.css")
      : path.join(cwd, "index.css")
    await fs.ensureDir(path.dirname(cssPath))
    await fs.writeFile(cssPath, twDirectives + cssVarsBlock)
    spinner.text = `Created ${path.relative(cwd, cssPath)} with CSS variable tokens`

    // Auto-inject import into JS/TS entry files
    const entryFiles = [
      "src/main.tsx", "src/main.ts", "src/index.tsx", "src/index.ts",
      "main.tsx", "main.ts", "src/entry.ts", "src/entry.tsx",
    ]
    for (const entry of entryFiles) {
      const entryPath = path.join(cwd, entry)
      if (!(await fs.pathExists(entryPath))) continue
      const entryContent = await fs.readFile(entryPath, "utf-8")
      if (!entryContent.includes(".css")) {
        const rel = path.relative(path.dirname(entryPath), cssPath).replace(/\\/g, "/")
        await fs.writeFile(entryPath, `import "./${rel}"\n` + entryContent)
        spinner.text = `Added CSS import to ${entry}`
      }
      break
    }
    return
  }

  try {
    const content = await fs.readFile(cssPath, "utf-8")
    if (content.includes("--background:") || content.includes("--foreground:")) return
    await fs.appendFile(cssPath, cssVarsBlock)
    spinner.text = `Added CSS variable tokens to ${path.relative(cwd, cssPath)}`
  } catch {
    // non-fatal
  }
}

async function setupTailwindConfig(cwd: string, twVersion: 4 | 3, spinner: ReturnType<typeof ora>) {
  // Tailwind v4 stores all config in CSS — no tailwind.config file to patch
  if (twVersion === 4) return

  const configPaths = [
    path.join(cwd, "tailwind.config.ts"),
    path.join(cwd, "tailwind.config.js"),
    path.join(cwd, "tailwind.config.mjs"),
    path.join(cwd, "tailwind.config.cjs"),
  ]

  let configPath: string | null = null
  for (const p of configPaths) {
    if (await fs.pathExists(p)) {
      configPath = p
      break
    }
  }

  if (!configPath) return

  try {
    let content = await fs.readFile(configPath, "utf-8")
    if (content.includes("hsl(var(--background))") || content.includes("--background")) return

    if (content.includes("extend:")) {
      content = content.replace(
        /extend:\s*\{/,
        `extend: {\n${TAILWIND_V3_THEME_EXTENSIONS}`
      )
    } else if (content.includes("theme:")) {
      content = content.replace(
        /theme:\s*\{/,
        `theme: {\n    extend: {\n${TAILWIND_V3_THEME_EXTENSIONS}\n    },`
      )
    }

    await fs.writeFile(configPath, content)
    spinner.text = `Patched ${path.basename(configPath)} with CSS variable theme colors`
  } catch {
    // non-fatal
  }
}

async function setupMdxComponents(
  componentsDir: string,
  typescript: boolean,
  cwd: string,
  spinner: ReturnType<typeof ora>
) {
  const ext = typescript ? "tsx" : "jsx"
  const mdxPath = path.join(cwd, componentsDir, `mdx-components.${ext}`)

  if (await fs.pathExists(mdxPath)) return

  const content = `// Auto-managed by mdx-ui CLI — run \`npx @ravikumarsurya/mdx-ui add <component>\` to update.
// @mdx-ui-imports-start
// @mdx-ui-imports-end

export const mdxComponents = {
// @mdx-ui-mappings-start
// @mdx-ui-mappings-end
}
`

  await fs.ensureDir(path.dirname(mdxPath))
  await fs.writeFile(mdxPath, content)
  spinner.text = `Created ${path.relative(cwd, mdxPath)}`
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
