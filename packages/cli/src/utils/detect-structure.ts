import fs from "fs-extra"
import path from "path"

export type Framework = "nextjs" | "astro" | "react" | "unknown"

export interface ProjectStructure {
  hasSrc: boolean
  componentsDir: string
  libDir: string
  framework: Framework
  hasTypeScript: boolean
  hasTailwind: boolean
}

export async function detectProjectStructure(cwd: string = process.cwd()): Promise<ProjectStructure> {
  const srcExists = await fs.pathExists(path.join(cwd, "src"))
  const framework = await detectFramework(cwd)
  const hasTypeScript = await fs.pathExists(path.join(cwd, "tsconfig.json"))
  const hasTailwind =
    (await fs.pathExists(path.join(cwd, "tailwind.config.js"))) ||
    (await fs.pathExists(path.join(cwd, "tailwind.config.ts"))) ||
    (await fs.pathExists(path.join(cwd, "tailwind.config.mjs")))

  if (framework === "astro" || srcExists) {
    return {
      hasSrc: true,
      componentsDir: "src/components/mdx-ui",
      libDir: "src/lib",
      framework,
      hasTypeScript,
      hasTailwind,
    }
  }

  return {
    hasSrc: false,
    componentsDir: "components/mdx-ui",
    libDir: "lib",
    framework,
    hasTypeScript,
    hasTailwind,
  }
}

export async function detectFramework(cwd: string): Promise<Framework> {
  const pkgPath = path.join(cwd, "package.json")
  if (!(await fs.pathExists(pkgPath))) return "unknown"

  const pkg = await fs.readJSON(pkgPath)
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }

  if ("next" in deps) return "nextjs"
  if ("astro" in deps) return "astro"
  if ("react" in deps || "react-dom" in deps) return "react"
  return "unknown"
}
