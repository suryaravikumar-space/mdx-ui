import fs from "fs-extra";
import path from "path";
import type { Framework } from "./detect-structure.js";

export interface Config {
  componentsDir: string;
  typescript: boolean;
  tailwind: boolean;
  framework?: Framework;
}

export async function getConfig(): Promise<Config | null> {
  const cwd = process.cwd();
  const configPath = path.join(cwd, "mdx-ui.json");

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
