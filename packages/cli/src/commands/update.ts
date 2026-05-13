import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { getConfig, type Config } from "../utils/get-config.js";
import {
  fetchComponent,
  type ComponentData,
} from "../utils/fetch-component.js";
import { installDependencies } from "../utils/install-deps.js";
import { writeComponent } from "../utils/write-component.js";
import {
  FILE_TO_COMPONENT,
  COMPONENT_MDX_MAP,
} from "../lib/component-registry.js";

async function patchMdxComponents(
  componentName: string,
  componentsDir: string,
  cwd: string,
): Promise<void> {
  const mapping = COMPONENT_MDX_MAP[componentName];
  if (!mapping) return;

  // Skip components that have no MDX exports (e.g. utils — internal lib only)
  if (
    mapping.imports.length === 0 &&
    Object.keys(mapping.elementMappings).length === 0
  )
    return;

  let mdxPath = path.join(cwd, componentsDir, "mdx-components.tsx");
  if (!(await fs.pathExists(mdxPath))) {
    const jsxPath = path.join(cwd, componentsDir, "mdx-components.jsx");
    if (await fs.pathExists(jsxPath)) mdxPath = jsxPath;
    else return; // don't auto-create on update
  }

  let content = await fs.readFile(mdxPath, "utf-8");

  // inject import
  if (!content.includes(mapping.importFile)) {
    const importLine = `import { ${mapping.imports.join(", ")} } from "${mapping.importFile}"\n`;
    const exportIdx = content.indexOf("export const mdxComponents");
    content =
      exportIdx !== -1
        ? content.slice(0, exportIdx) + importLine + content.slice(exportIdx)
        : importLine + content;
  }

  // locate the mdxComponents object body first (used for membership checks)
  const ANCHOR = "export const mdxComponents";
  const anchorIdx = content.indexOf(ANCHOR);
  const openBrace = anchorIdx !== -1 ? content.indexOf("{", anchorIdx) : -1;
  let closeIdx = -1;
  if (openBrace !== -1) {
    let depth = 0;
    for (let i = openBrace; i < content.length; i++) {
      if (content[i] === "{") depth++;
      else if (content[i] === "}") {
        depth--;
        if (depth === 0) {
          closeIdx = i;
          break;
        }
      }
    }
  }
  const objectBody =
    openBrace !== -1 && closeIdx !== -1
      ? content.slice(openBrace + 1, closeIdx)
      : "";

  // build additions list, checking membership against objectBody only
  const additions: string[] = [];
  for (const [element, component] of Object.entries(mapping.elementMappings)) {
    if (
      !objectBody.includes(`${element}:`) &&
      !objectBody.includes(`${element} :`)
    )
      additions.push(`  ${element}: ${component},`);
  }
  for (const exportName of mapping.imports) {
    const alreadyMapped = Object.values(mapping.elementMappings).includes(
      exportName,
    );
    if (
      !alreadyMapped &&
      !objectBody.includes(`${exportName},`) &&
      !objectBody.includes(`${exportName}:`)
    )
      additions.push(`  ${exportName},`);
  }

  if (additions.length > 0 && closeIdx !== -1) {
    content =
      content.slice(0, closeIdx) +
      additions.join("\n") +
      "\n" +
      content.slice(closeIdx);
  }

  await fs.writeFile(mdxPath, content);
}

interface DiffResult {
  name: string;
  data: ComponentData;
  changedFiles: string[];
  hasChanges: boolean;
}

async function diffComponent(
  data: ComponentData,
  config: Config,
  cwd: string,
): Promise<DiffResult> {
  const changedFiles: string[] = [];
  const framework = (config as any).framework ?? "unknown";

  for (const file of data.files) {
    const libRoot = config.componentsDir.startsWith("src/")
      ? path.join(cwd, "src")
      : cwd;
    const filePath = file.path.startsWith("lib/")
      ? path.join(libRoot, file.path)
      : path.join(cwd, config.componentsDir, file.path);

    if (!(await fs.pathExists(filePath))) {
      changedFiles.push(file.path);
      continue;
    }

    const existing = await fs.readFile(filePath, "utf-8");
    let incoming = file.content;
    if (framework === "react") {
      incoming = incoming.replace(/^["']use client["']\n\n?/m, "");
    }

    if (existing.trim() !== incoming.trim()) {
      changedFiles.push(file.path);
    }
  }

  return {
    name: data.name,
    data,
    changedFiles,
    hasChanges: changedFiles.length > 0,
  };
}

async function discoverInstalled(
  componentsDir: string,
  cwd: string,
): Promise<string[]> {
  const dir = path.join(cwd, componentsDir);
  if (!(await fs.pathExists(dir))) return [];

  const files = await fs.readdir(dir);
  const found = files
    .map((f) => FILE_TO_COMPONENT[f])
    .filter((n): n is string => !!n);

  const libDir = componentsDir.startsWith("src/") ? "src/lib" : "lib";
  if (await fs.pathExists(path.join(cwd, libDir, "utils.ts"))) {
    found.unshift("utils");
  }

  return [...new Set(found)];
}

export const update = new Command()
  .name("update")
  .description("Update installed components to their latest versions")
  .argument(
    "[components...]",
    "components to update (omit to update all installed)",
  )
  .action(async (targets: string[]) => {
    console.log();

    const config = await getConfig();
    if (!config) {
      console.log(chalk.red("✗ No mdx-ui.json found."));
      console.log(chalk.yellow("  Run: npx @ravikumarsurya/mdx-ui init\n"));
      process.exit(1);
    }

    const cwd = process.cwd();
    let toUpdate: string[];

    if (targets.length > 0) {
      toUpdate = targets;
    } else {
      toUpdate = await discoverInstalled(config.componentsDir, cwd);
      if (toUpdate.length === 0) {
        console.log(chalk.yellow("No installed components found."));
        console.log(
          chalk.dim("  Run: npx @ravikumarsurya/mdx-ui add <component>\n"),
        );
        process.exit(0);
      }
    }

    const spinner = ora("Checking for updates...").start();

    try {
      const componentsData: ComponentData[] = [];
      const processed = new Set<string>();

      async function fetchRecursive(name: string) {
        if (processed.has(name)) return;
        processed.add(name);
        const data = await fetchComponent(name);
        if (data.registryDependencies?.length) {
          for (const dep of data.registryDependencies) {
            await fetchRecursive(dep);
          }
        }
        componentsData.push(data);
      }

      for (const name of toUpdate) {
        await fetchRecursive(name);
      }

      const diffs = await Promise.all(
        componentsData.map((data) => diffComponent(data, config, cwd)),
      );

      spinner.stop();
      console.log();

      const maxLen = Math.max(...diffs.map((d) => d.name.length));
      for (const diff of diffs) {
        const name = diff.name.padEnd(maxLen);
        if (diff.hasChanges) {
          console.log(
            `  ${chalk.yellow("~")}  ${name}  ${chalk.dim(diff.changedFiles.join(", "))}`,
          );
        } else {
          console.log(
            `  ${chalk.green("✓")}  ${name}  ${chalk.dim("up to date")}`,
          );
        }
      }
      console.log();

      const changed = diffs.filter((d) => d.hasChanges);

      if (changed.length === 0) {
        console.log(chalk.green("All components are up to date."));
        console.log();
        process.exit(0);
      }

      console.log(
        chalk.bold(
          `${changed.length} component${changed.length !== 1 ? "s have" : " has"} updates.`,
        ),
      );
      console.log();

      const { strategy } = await prompts({
        type: "select",
        name: "strategy",
        message: "How would you like to proceed?",
        choices: [
          {
            title: `Overwrite all  ${chalk.dim(`(${changed.length} component${changed.length !== 1 ? "s" : ""})`)}`,
            value: "all",
          },
          { title: "Skip all", value: "skip" },
          { title: "Choose which to update", value: "pick" },
        ],
      });

      if (!strategy || strategy === "skip") {
        console.log(chalk.yellow("\nSkipped. No files written.\n"));
        process.exit(0);
      }

      let toWrite: DiffResult[] = [];

      if (strategy === "all") {
        toWrite = changed;
      } else {
        const { selected } = await prompts({
          type: "multiselect",
          name: "selected",
          message: "Select components to update",
          choices: changed.map((d) => ({
            title: d.name,
            value: d.name,
            description: d.changedFiles.join(", "),
            selected: true,
          })),
        });

        if (!selected || selected.length === 0) {
          console.log(chalk.yellow("\nNothing selected. No files written.\n"));
          process.exit(0);
        }

        toWrite = changed.filter((d) => selected.includes(d.name));
      }

      console.log();
      const writeSpinner = ora("Installing dependencies...").start();

      const allDeps = new Set<string>();
      for (const diff of toWrite) {
        diff.data.dependencies?.forEach((d) => allDeps.add(d));
      }
      if (allDeps.size > 0) await installDependencies(Array.from(allDeps));

      writeSpinner.text = "Writing updated components...";
      for (const diff of toWrite) {
        await writeComponent(diff.data, config);
        await patchMdxComponents(diff.name, config.componentsDir, cwd);
      }

      writeSpinner.succeed("Done!");
      console.log();
      for (const diff of toWrite) {
        console.log(chalk.green(`  ✓ ${diff.name}`));
      }
      console.log();
    } catch (error: any) {
      spinner.fail("Update failed");
      console.error(chalk.red(`  ${error.message}\n`));
      process.exit(1);
    }
  });
