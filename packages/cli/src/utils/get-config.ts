import fs from "fs-extra";
import path from "path";
import type { Framework, MdxPipeline } from "./detect-structure.js";

export interface Config {
  componentsDir: string;
  typescript: boolean;
  tailwind: boolean;
  framework?: Framework;
  mdxPipeline?: MdxPipeline;
  cssFile?: string; // relative path to globals.css
  tailwindConfig?: string; // relative path to tailwind.config.*
}

export async function getConfig(): Promise<Config | null> {
  const cwd = process.cwd();
  const configPath = path.join(cwd, "docsui.json");

  try {
    const exists = await fs.pathExists(configPath);
    if (!exists) {
      return null;
    }

    const config = await fs.readJSON(configPath);
    return config;
  } catch {
    return null;
  }
}
