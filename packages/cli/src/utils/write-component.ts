import fs from "fs-extra"
import path from "path"
import type { Config } from "./get-config.js"
import type { ComponentData } from "./fetch-component.js"

async function hasPathAlias(cwd: string): Promise<boolean> {
  const tsconfigPaths = [
    path.join(cwd, "tsconfig.app.json"),
    path.join(cwd, "tsconfig.json"),
  ]

  for (const tsconfigPath of tsconfigPaths) {
    if (!(await fs.pathExists(tsconfigPath))) continue
    try {
      const tsconfig = await fs.readJSON(tsconfigPath)
      const paths = tsconfig?.compilerOptions?.paths ?? {}
      if ("@/*" in paths) return true
    } catch {
      // continue
    }
  }
  return false
}

export async function writeComponent(
  component: ComponentData,
  config: Config
): Promise<void> {
  const cwd = process.cwd()
  const framework = (config as any).framework ?? "unknown"

  const aliasAvailable = await hasPathAlias(cwd)

  // Infer lib directory from components directory structure
  const hasSrc = config.componentsDir.startsWith("src/")
  const libDir = hasSrc ? "src/lib" : "lib"

  for (const file of component.files) {
    const filePath = path.join(cwd, config.componentsDir, file.path)
    await fs.ensureDir(path.dirname(filePath))

    let content = file.content

    // Strip "use client" for plain React (Vite/CRA) — not needed outside RSC frameworks
    if (framework === "react") {
      content = content.replace(/^["']use client["']\n\n?/m, "")
    }

    // If @/ alias is not configured, rewrite @/lib/utils to a relative path
    if (!aliasAvailable) {
      const utilsAbsolute = path.join(cwd, libDir, "utils")
      const fileDir = path.dirname(filePath)
      let relativePath = path.relative(fileDir, utilsAbsolute)
      if (!relativePath.startsWith(".")) relativePath = `./${relativePath}`
      content = content.split("@/lib/utils").join(relativePath)
    }

    await fs.writeFile(filePath, content, "utf-8")
  }
}
