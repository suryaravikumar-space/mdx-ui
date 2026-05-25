import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { getConfig } from "../utils/get-config.js";
import {
  fetchComponent,
  type ComponentData,
} from "../utils/fetch-component.js";
import { installDependencies } from "../utils/install-deps.js";

import { COMPONENT_MDX_MAP, REGISTRY } from "../lib/component-registry.js";
import { scanMdxComponents, printScanWarnings } from "../utils/scan-mdx.js";
import { ping } from "../utils/telemetry.js";

interface RegistryComponent {
  name: string;
  type: string;
  description: string;
  files: string[];
  registryDependencies?: string[];
}

/** Find mdx-components.{tsx,jsx} — checks componentsDir first, then common fallbacks. */
async function findMdxComponentsFile(
  componentsDir: string,
  cwd: string,
): Promise<string | null> {
  const candidates = [
    path.join(cwd, componentsDir, "mdx-components.tsx"),
    path.join(cwd, componentsDir, "mdx-components.jsx"),
    // common fallbacks in case init used a different dir than the actual file
    path.join(cwd, "src/components/mdx-components.tsx"),
    path.join(cwd, "src/components/mdx-components.jsx"),
    path.join(cwd, "components/mdx-components.tsx"),
    path.join(cwd, "components/mdx-components.jsx"),
    path.join(cwd, "src/mdx-components.tsx"),
    path.join(cwd, "src/mdx-components.jsx"),
  ];
  for (const p of candidates) {
    if (await fs.pathExists(p)) return p;
  }
  return null;
}

async function patchMdxComponents(
  componentName: string,
  componentsDir: string,
  cwd: string,
): Promise<{ patched: boolean; mdxPath: string }> {
  const mapping = COMPONENT_MDX_MAP[componentName];
  if (!mapping) return { patched: false, mdxPath: "" };

  // Skip components that have no MDX exports (e.g. utils — internal lib only)
  if (
    mapping.imports.length === 0 &&
    Object.keys(mapping.elementMappings).length === 0
  )
    return { patched: false, mdxPath: "" };

  // Find existing file or create at componentsDir
  let mdxPath = await findMdxComponentsFile(componentsDir, cwd);
  if (!mdxPath) {
    mdxPath = path.join(cwd, componentsDir, "mdx-components.tsx");
    await fs.ensureDir(path.dirname(mdxPath));
    await fs.writeFile(mdxPath, `export const mdxComponents = {\n}\n`);
  }

  let content = await fs.readFile(mdxPath, "utf-8");

  // --- inject import if not already present ---
  if (!content.includes(mapping.importFile)) {
    const importLine = `import { ${mapping.imports.join(", ")} } from "${mapping.importFile}"\n`;
    // Insert before `export const mdxComponents` (or prepend)
    const exportIdx = content.indexOf("export const mdxComponents");
    if (exportIdx !== -1) {
      content =
        content.slice(0, exportIdx) + importLine + content.slice(exportIdx);
    } else {
      content = importLine + content;
    }
  }

  // --- locate the mdxComponents object body first (used for membership checks) ---
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
  // objectBody is the content between { and } of mdxComponents
  const objectBody =
    openBrace !== -1 && closeIdx !== -1
      ? content.slice(openBrace + 1, closeIdx)
      : "";

  // --- build additions list, checking membership against objectBody only ---
  const additions: string[] = [];

  for (const [element, component] of Object.entries(mapping.elementMappings)) {
    if (
      !objectBody.includes(`${element}:`) &&
      !objectBody.includes(`${element} :`)
    ) {
      additions.push(`  ${element}: ${component},`);
    }
  }

  for (const exportName of mapping.imports) {
    const alreadyMapped = Object.values(mapping.elementMappings).includes(
      exportName,
    );
    if (
      !alreadyMapped &&
      !objectBody.includes(`${exportName},`) &&
      !objectBody.includes(`${exportName}:`)
    ) {
      additions.push(`  ${exportName},`);
    }
  }

  if (additions.length > 0 && closeIdx !== -1) {
    content =
      content.slice(0, closeIdx) +
      additions.join("\n") +
      "\n" +
      content.slice(closeIdx);
  }

  await fs.writeFile(mdxPath, content);
  return { patched: true, mdxPath };
}

function loadRegistry(): { components: RegistryComponent[] } {
  return {
    components: Object.entries(REGISTRY)
      .filter(([name]) => name !== "utils")
      .map(([name, entry]) => ({
        name,
        type: "mdx",
        description: entry.description,
        files: entry.files,
      })),
  };
}

export const add = new Command()
  .name("add")
  .description("Add components to your project")
  .argument("[components...]", "components to add")
  .option(
    "-o, --overwrite",
    "overwrite existing files without prompting",
    false,
  )
  .option("-a, --all", "add all available components", false)
  .action(
    async (
      components: string[],
      opts: { overwrite: boolean; all: boolean },
    ) => {
      console.log();

      const config = await getConfig();

      if (!config) {
        console.log(chalk.red("✗ No mdx-ui.json found"));
        console.log(chalk.yellow("Run 'npx mdx-ui init' first"));
        process.exit(1);
      }

      if (opts.all) {
        const registry = loadRegistry();
        components = registry.components
          .filter((c: RegistryComponent) => c.type === "mdx")
          .map((c: RegistryComponent) => c.name);
        console.log(
          chalk.dim(`Adding all ${components.length} components...\n`),
        );
      } else if (components.length === 0) {
        const registry = loadRegistry();
        const mdxComponents = registry.components.filter(
          (c: RegistryComponent) => c.type === "mdx",
        );

        const { selected } = await prompts({
          type: "multiselect",
          name: "selected",
          message: "Which components would you like to add?",
          choices: mdxComponents.map((c: RegistryComponent) => ({
            title: c.name
              .split("-")
              .map(
                (word: string) => word.charAt(0).toUpperCase() + word.slice(1),
              )
              .join(" "),
            value: c.name,
            description: c.description,
          })),
        });

        components = selected;
      }

      if (!components || components.length === 0) {
        console.log(chalk.yellow("No components selected"));
        process.exit(0);
      }

      const spinner = ora("Fetching components...").start();

      try {
        const componentsData: ComponentData[] = [];
        const processedComponents = new Set<string>();

        async function fetchComponentRecursive(componentName: string) {
          if (processedComponents.has(componentName)) return;
          processedComponents.add(componentName);
          const data = await fetchComponent(componentName);

          if (
            data.registryDependencies &&
            data.registryDependencies.length > 0
          ) {
            for (const depName of data.registryDependencies) {
              await fetchComponentRecursive(depName);
            }
          }

          componentsData.push(data);
        }

        for (const component of components) {
          await fetchComponentRecursive(component);
        }

        spinner.text = "Installing dependencies...";

        const allDeps = new Set<string>();
        for (const data of componentsData) {
          data.dependencies?.forEach((dep: string) => allDeps.add(dep));
        }

        if (allDeps.size > 0) {
          await installDependencies(Array.from(allDeps));
        }

        spinner.stop();

        const cwd = process.cwd();
        const framework = config.framework ?? "unknown";
        const written: string[] = [];
        const skipped: string[] = [];

        for (const data of componentsData) {
          for (const file of data.files) {
            // Resolve file path (mirrors writeComponent logic)
            const libRoot = config.componentsDir.startsWith("src/")
              ? path.join(cwd, "src")
              : cwd;
            const filePath = file.path.startsWith("lib/")
              ? path.join(libRoot, file.path)
              : path.join(cwd, config.componentsDir, file.path);

            let incoming = file.content;
            if (framework === "react") {
              incoming = incoming.replace(/^["']use client["']\n\n?/m, "");
            }

            const exists = await fs.pathExists(filePath);

            if (exists) {
              const existing = await fs.readFile(filePath, "utf-8");

              // Content identical — silent skip
              if (existing.trim() === incoming.trim()) {
                skipped.push(file.path);
                continue;
              }

              // Content differs — respect --overwrite or ask
              if (!opts.overwrite) {
                const { overwrite } = await prompts({
                  type: "confirm",
                  name: "overwrite",
                  message: `${chalk.yellow(file.path)} already exists and has local changes. Overwrite?`,
                  initial: false,
                });

                if (!overwrite) {
                  skipped.push(file.path);
                  continue;
                }
              }
            }

            await fs.ensureDir(path.dirname(filePath));
            await fs.writeFile(filePath, incoming, "utf-8");
            written.push(file.path);
          }
        }

        // Patch mdx-components.tsx for ALL fetched components (including deps)
        let patchedFile = "";
        for (const data of componentsData) {
          const result = await patchMdxComponents(
            data.name,
            config.componentsDir,
            cwd,
          );
          if (result.patched && !patchedFile) {
            patchedFile = path.relative(cwd, result.mdxPath);
          }
        }

        console.log();
        for (const component of components) {
          console.log(chalk.green(`✓ ${component}`));
        }
        if (skipped.length > 0) {
          console.log(chalk.dim(`  skipped: ${skipped.join(", ")}`));
        }
        if (patchedFile) {
          console.log(chalk.dim(`  updated: ${patchedFile}`));
        }

        console.log();
        console.log(chalk.bold("Done! 🎉"));
        console.log();
        ping("add", { components });

        const pm = (await fs.pathExists(path.join(cwd, "pnpm-lock.yaml")))
          ? "pnpm"
          : (await fs.pathExists(path.join(cwd, "yarn.lock")))
            ? "yarn"
            : "npm";
        const scanResults = await scanMdxComponents(cwd);
        printScanWarnings(scanResults, pm);
      } catch (error: unknown) {
        spinner.fail("Failed to add components");
        const msg = error instanceof Error ? error.message : String(error);
        console.error(chalk.red(msg));
        process.exit(1);
      }
    },
  );
