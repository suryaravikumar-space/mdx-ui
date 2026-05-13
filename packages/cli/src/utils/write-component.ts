import fs from "fs-extra";
import path from "path";
import type { Config } from "./get-config.js";
import type { ComponentData } from "./fetch-component.js";

function resolveFilePath(
  filePath: string,
  componentsDir: string,
  cwd: string,
): string {
  if (filePath === "lib/utils.ts") {
    // utils lives at src/lib/utils.ts — imported via @/lib/utils alias
    const libRoot = componentsDir.startsWith("src/")
      ? path.join(cwd, "src")
      : cwd;
    return path.join(libRoot, filePath);
  }
  // Everything else (lib/primitives.ts, lib/motion.tsx, component files)
  // goes directly inside componentsDir so all mdx-ui files are in one place
  return path.join(cwd, componentsDir, filePath);
}

export async function writeComponent(
  component: ComponentData,
  config: Config,
): Promise<void> {
  const cwd = process.cwd();
  const framework = (config as any).framework ?? "unknown";

  for (const file of component.files) {
    const filePath = resolveFilePath(file.path, config.componentsDir, cwd);
    await fs.ensureDir(path.dirname(filePath));

    let content = file.content;

    // Strip "use client" for plain React (Vite/CRA) — not needed outside RSC frameworks
    if (framework === "react") {
      content = content.replace(/^["']use client["']\n\n?/m, "");
    }

    await fs.writeFile(filePath, content, "utf-8");
  }
}
