import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { getConfig } from "../utils/get-config.js";
import { REGISTRY } from "../lib/component-registry.js";

// Non-component entries that should be listed separately
const UTILITY_NAMES = new Set(["utils"]);

function buildRegistryFromSource() {
  return {
    components: Object.entries(REGISTRY).map(([name, entry]) => ({
      name,
      type: UTILITY_NAMES.has(name) ? "utility" : "mdx",
      description: entry.description,
      files: entry.files,
    })),
  };
}

async function loadRegistry() {
  return buildRegistryFromSource();
}

export const list = new Command()
  .name("list")
  .description("List all available components")
  .option("-i, --installed", "show only installed components")
  .action(async (opts: { installed?: boolean }) => {
    console.log();

    if (opts.installed) {
      const config = await getConfig();
      if (!config) {
        console.log(chalk.red("✗ No docsui.json found."));
        console.log(chalk.yellow("  Run: npx docsui-cli@latest init\n"));
        process.exit(1);
      }

      const cwd = process.cwd();
      const dir = path.join(cwd, config.componentsDir);

      if (!(await fs.pathExists(dir))) {
        console.log(chalk.yellow("No components installed yet."));
        console.log(chalk.dim("  Run: npx docsui-cli@latest add\n"));
        process.exit(0);
      }

      const files = await fs.readdir(dir);
      const installed = files
        .filter((f) => f.endsWith(".tsx") && f !== "mdx-components.tsx")
        .map((f) => f.replace(".tsx", ""));

      if (installed.length === 0) {
        console.log(chalk.yellow("No components installed yet."));
        console.log(chalk.dim("  Run: npx docsui-cli@latest add\n"));
        process.exit(0);
      }

      console.log(chalk.bold(`Installed components (${installed.length}):\n`));
      for (const name of installed.sort()) {
        console.log(chalk.green(`  ✓ ${name}`));
      }
      console.log();
      return;
    }

    console.log(chalk.bold("Available components:\n"));

    const registry = await loadRegistry();

    // Group by type
    const mdxComponents = registry.components.filter((c) => c.type === "mdx");
    const utilityComponents = registry.components.filter(
      (c) => c.type === "utility",
    );

    if (mdxComponents.length > 0) {
      console.log(chalk.bold("  MDX Components:"));
      for (const component of mdxComponents) {
        console.log(
          chalk.cyan(`    ${component.name.padEnd(18)}`),
          component.description,
        );
      }
      console.log();
    }

    if (utilityComponents.length > 0) {
      console.log(chalk.bold("  Utilities:"));
      for (const component of utilityComponents) {
        console.log(
          chalk.cyan(`    ${component.name.padEnd(18)}`),
          component.description,
        );
      }
      console.log();
    }

    console.log(chalk.dim("Usage:"));
    console.log(chalk.dim("  npx docsui-cli@latest add <component>"));
    console.log();
  });
