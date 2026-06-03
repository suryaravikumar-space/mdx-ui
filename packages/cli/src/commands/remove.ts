import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { getConfig } from "../utils/get-config.js";
import {
  COMPONENT_MDX_MAP,
  COMPONENT_FILES,
} from "../lib/component-registry.js";

async function unpatchMdxComponents(
  componentName: string,
  componentsDir: string,
  cwd: string,
): Promise<void> {
  const mapping = COMPONENT_MDX_MAP[componentName];
  if (!mapping) return;

  const mdxPath = path.join(cwd, componentsDir, "mdx-components.tsx");
  if (!(await fs.pathExists(mdxPath))) return;

  let content = await fs.readFile(mdxPath, "utf-8");

  // Remove the import line
  const lines = content.split("\n");
  content = lines
    .filter((line) => !line.includes(`from "${mapping.importFile}"`))
    .join("\n");

  // Remove element mappings (e.g. `    h1: H1,`)
  for (const [element, component] of Object.entries(mapping.elementMappings)) {
    content = content.replace(
      new RegExp(`\n[ \t]+${element}:\\s*${component},`, "g"),
      "",
    );
  }

  // Remove named export mappings (e.g. `    Accordion,`)
  for (const exportName of mapping.imports) {
    const alreadyMapped = Object.values(mapping.elementMappings).includes(
      exportName,
    );
    if (!alreadyMapped) {
      content = content.replace(new RegExp(`\n[ \t]+${exportName},`, "g"), "");
    }
  }

  await fs.writeFile(mdxPath, content, "utf-8");
}

async function discoverInstalled(
  componentsDir: string,
  cwd: string,
): Promise<string[]> {
  const dir = path.join(cwd, componentsDir);
  if (!(await fs.pathExists(dir))) return [];

  const files = await fs.readdir(dir);
  const installed: string[] = [];

  for (const [name, componentFiles] of Object.entries(COMPONENT_FILES)) {
    // Only check component-dir files (lib/* live elsewhere — don't gate on them)
    const ownFiles = componentFiles.filter((f) => !f.startsWith("lib/"));
    if (ownFiles.length > 0 && ownFiles.every((f) => files.includes(f)))
      installed.push(name);
  }

  // mdx-components.tsx is special — listed separately
  if (files.includes("mdx-components.tsx")) installed.push("mdx-components");

  const libDir = componentsDir.startsWith("src/") ? "src/lib" : "lib";
  if (await fs.pathExists(path.join(cwd, libDir, "utils.ts")))
    installed.push("utils");

  return [...new Set(installed)];
}

export const remove = new Command()
  .name("remove")
  .description("Remove installed components from your project")
  .argument("[components...]", "components to remove")
  .action(async (components: string[]) => {
    console.log();

    const config = await getConfig();
    if (!config) {
      console.log(chalk.red("✗ No docsui.json found."));
      console.log(chalk.yellow("  Run: npx docsui-cli@latest init\n"));
      process.exit(1);
    }

    const cwd = process.cwd();

    if (components.length === 0) {
      const installed = await discoverInstalled(config.componentsDir, cwd);
      if (installed.length === 0) {
        console.log(chalk.yellow("No installed components found.\n"));
        process.exit(0);
      }

      const { selected } = await prompts({
        type: "multiselect",
        name: "selected",
        message: "Which components would you like to remove?",
        choices: installed.map((name) => ({ title: name, value: name })),
      });

      if (!selected || selected.length === 0) {
        console.log(chalk.yellow("Nothing selected.\n"));
        process.exit(0);
      }

      components = selected;
    }

    const { confirmed } = await prompts({
      type: "confirm",
      name: "confirmed",
      message: `Remove ${components.length} component${components.length !== 1 ? "s" : ""}? (${components.join(", ")})`,
      initial: false,
    });

    if (!confirmed) {
      console.log(chalk.yellow("\nCancelled.\n"));
      process.exit(0);
    }

    console.log();
    const removed: string[] = [];
    const notFound: string[] = [];

    for (const name of components) {
      const files =
        name === "mdx-components"
          ? ["mdx-components.tsx"]
          : COMPONENT_FILES[name];

      if (!files) {
        notFound.push(name);
        continue;
      }

      let deleted = false;
      const libRoot = config.componentsDir.startsWith("src/")
        ? path.join(cwd, "src")
        : cwd;
      for (const file of files) {
        const filePath = file.startsWith("lib/")
          ? path.join(libRoot, file)
          : path.join(cwd, config.componentsDir, file);
        if (await fs.pathExists(filePath)) {
          await fs.remove(filePath);
          deleted = true;
        }
      }

      await unpatchMdxComponents(name, config.componentsDir, cwd);

      if (deleted) {
        removed.push(name);
        console.log(chalk.green(`  ✓ removed ${name}`));
      } else {
        notFound.push(name);
        console.log(chalk.dim(`  – ${name} (not installed)`));
      }
    }

    console.log();
    if (removed.length > 0) {
      console.log(
        chalk.bold(
          `Removed ${removed.length} component${removed.length !== 1 ? "s" : ""}.`,
        ),
      );
    }
    if (notFound.length > 0) {
      console.log(
        chalk.yellow(`${notFound.length} not found: ${notFound.join(", ")}`),
      );
    }
    console.log();
  });
