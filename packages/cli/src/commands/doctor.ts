import { Command } from "commander";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { getConfig } from "../utils/get-config.js";
import { COMPONENT_FILES, COMPONENT_DEPS } from "../lib/component-registry.js";
import type { MdxPipeline } from "../utils/detect-structure.js";

interface Issue {
  level: "error" | "warn";
  message: string;
}

async function getInstalledDeps(cwd: string): Promise<Set<string>> {
  const installed = new Set<string>();
  const p = path.join(cwd, "package.json");
  if (!(await fs.pathExists(p))) return installed;
  try {
    const pkg = await fs.readJSON(p);
    const allDeps = {
      ...pkg.dependencies,
      ...pkg.devDependencies,
      ...pkg.peerDependencies,
    };
    Object.keys(allDeps).forEach((d) => installed.add(d));
  } catch {
    /* ignore */
  }
  return installed;
}

export const doctor = new Command()
  .name("doctor")
  .description(
    "Check your project for missing dependencies or broken component setup",
  )
  .action(async () => {
    console.log();
    console.log(chalk.bold("Running docsui doctor...\n"));

    const issues: Issue[] = [];
    const cwd = process.cwd();

    // ── 1. Config ──────────────────────────────────────────────────────────
    const config = await getConfig();
    if (!config) {
      issues.push({
        level: "error",
        message: "No docsui.json found — run: npx docsui-cli@latest init",
      });
      printReport(issues);
      return;
    }
    console.log(
      `  ${chalk.green("✓")}  docsui.json found  ${chalk.dim(`(componentsDir: ${config.componentsDir})`)}`,
    );

    // ── 2. Components dir ──────────────────────────────────────────────────
    const compDir = path.join(cwd, config.componentsDir);
    if (!(await fs.pathExists(compDir))) {
      issues.push({
        level: "error",
        message: `Components directory not found: ${config.componentsDir}`,
      });
      printReport(issues);
      return;
    }

    // ── 3. Discover installed components ──────────────────────────────────
    const files = await fs.readdir(compDir);
    const installed: string[] = [];
    for (const [name, compFiles] of Object.entries(COMPONENT_FILES)) {
      // lib/* files live outside componentsDir — only check component-dir files
      const ownFiles = compFiles.filter((f) => !f.startsWith("lib/"));
      if (ownFiles.length > 0 && ownFiles.every((f) => files.includes(f)))
        installed.push(name);
    }

    if (installed.length === 0) {
      console.log(
        chalk.yellow("  No docsui components found in components directory."),
      );
      printReport(issues);
      return;
    }
    console.log(
      `  ${chalk.green("✓")}  ${installed.length} component${installed.length !== 1 ? "s" : ""} installed  ${chalk.dim(`(${installed.join(", ")})`)}\n`,
    );

    // ── 4. lib/utils.ts ────────────────────────────────────────────────────
    const libDir = config.componentsDir.startsWith("src/") ? "src/lib" : "lib";
    const utilsPath = path.join(cwd, libDir, "utils.ts");
    if (!(await fs.pathExists(utilsPath))) {
      issues.push({
        level: "error",
        message: `lib/utils.ts not found — run: npx docsui-cli@latest add utils`,
      });
    } else {
      console.log(`  ${chalk.green("✓")}  ${libDir}/utils.ts`);
    }

    // ── 5. npm dependencies ────────────────────────────────────────────────
    const installedDeps = await getInstalledDeps(cwd);
    const missingDeps = new Set<string>();

    for (const name of installed) {
      for (const dep of COMPONENT_DEPS[name] ?? []) {
        if (!installedDeps.has(dep)) missingDeps.add(dep);
      }
    }

    if (missingDeps.size > 0) {
      for (const dep of missingDeps) {
        issues.push({
          level: "error",
          message: `Missing npm dependency: ${dep}`,
        });
      }
      console.log();
      console.log(
        `  ${chalk.red("✗")}  Missing deps: ${chalk.bold([...missingDeps].join(", "))}`,
      );
      console.log(`     Fix: npm install ${[...missingDeps].join(" ")}`);
    } else {
      console.log(`  ${chalk.green("✓")}  All npm dependencies present`);
    }

    // ── 6. CSS semantic tokens ─────────────────────────────────────────────
    if (config.cssFile) {
      const cssPath = path.join(cwd, config.cssFile);
      if (!(await fs.pathExists(cssPath))) {
        issues.push({
          level: "warn",
          message: `CSS file not found: ${config.cssFile}`,
        });
      } else {
        const cssContent = await fs.readFile(cssPath, "utf-8");
        if (!cssContent.includes("--mdxui-info-bg")) {
          issues.push({
            level: "warn",
            message: `Missing docsui semantic tokens in ${config.cssFile} — re-run: npx docsui-cli@latest init`,
          });
          console.log(
            `  ${chalk.yellow("~")}  --mdxui-* tokens missing from ${config.cssFile}`,
          );
        } else {
          console.log(
            `  ${chalk.green("✓")}  docsui CSS tokens in ${config.cssFile}`,
          );
        }
      }
    }

    // ── 7. Tailwind config docsui color scales ─────────────────────────────
    if (config.tailwindConfig) {
      const twPath = path.join(cwd, config.tailwindConfig);
      if (await fs.pathExists(twPath)) {
        const twContent = await fs.readFile(twPath, "utf-8");
        if (!twContent.includes("--mdxui-info-border")) {
          issues.push({
            level: "warn",
            message: `docsui semantic colors missing from ${config.tailwindConfig} — re-run: npx docsui-cli@latest init`,
          });
          console.log(
            `  ${chalk.yellow("~")}  docsui colors missing from ${config.tailwindConfig}`,
          );
        } else {
          console.log(
            `  ${chalk.green("✓")}  docsui colors in ${config.tailwindConfig}`,
          );
        }
      }
    }

    // ── 8. mdx-components.tsx ──────────────────────────────────────────────
    const mdxPath = path.join(cwd, config.componentsDir, "mdx-components.tsx");
    if (!(await fs.pathExists(mdxPath))) {
      issues.push({
        level: "warn",
        message:
          "mdx-components.tsx not found — component auto-mapping unavailable",
      });
    } else {
      const mdxContent = await fs.readFile(mdxPath, "utf-8");
      const notMapped: string[] = [];
      for (const name of installed) {
        if (!mdxContent.includes(`from "./${name}"`)) notMapped.push(name);
      }
      if (notMapped.length > 0) {
        issues.push({
          level: "warn",
          message: `Not imported in mdx-components.tsx: ${notMapped.join(", ")} — re-run add for these components`,
        });
        console.log();
        console.log(
          `  ${chalk.yellow("~")}  Not mapped in mdx-components.tsx: ${notMapped.join(", ")}`,
        );
      } else {
        console.log(`  ${chalk.green("✓")}  mdx-components.tsx looks good`);
      }
    }

    // ── 9. Remark plugin ──────────────────────────────────────────────────────
    const remarkPkg = "@docsui-io/remark-plugin";
    if (!installedDeps.has(remarkPkg)) {
      issues.push({
        level: "warn",
        message: `${remarkPkg} not installed — markdown won't auto-upgrade to components. Run: npm install ${remarkPkg}`,
      });
      console.log(`  ${chalk.yellow("~")}  ${remarkPkg} not installed`);
    } else {
      const pipeline = config.mdxPipeline ?? "unknown";
      const wired = await checkRemarkPluginWired(pipeline, cwd);
      if (wired === null) {
        // pipeline unknown or next-mdx-remote (programmatic) — just confirm package present
        console.log(`  ${chalk.green("✓")}  ${remarkPkg} installed`);
      } else if (!wired) {
        issues.push({
          level: "warn",
          message: `remarkMdxUi not found in ${pipeline} config — add it to remarkPlugins`,
        });
        console.log(
          `  ${chalk.yellow("~")}  remarkMdxUi not wired in ${pipeline} config`,
        );
      } else {
        console.log(
          `  ${chalk.green("✓")}  remarkMdxUi wired in ${pipeline} config`,
        );
      }
    }

    printReport(issues);
  });

// Returns true if wired, false if not wired or config not found, null if pipeline is programmatic/unknown
async function checkRemarkPluginWired(
  pipeline: MdxPipeline,
  cwd: string,
): Promise<boolean | null> {
  const CONFIG_CANDIDATES: Partial<Record<MdxPipeline, string[]>> = {
    contentlayer: ["contentlayer.config.ts", "contentlayer.config.js"],
    "next-mdx": [
      "next.config.ts",
      "next.config.mjs",
      "next.config.js",
      "next.config.cjs",
    ],
    "astro-mdx": ["astro.config.ts", "astro.config.mjs"],
    "mdx-rollup": ["vite.config.ts", "vite.config.js", "vite.config.mts"],
  };

  const candidates = CONFIG_CANDIDATES[pipeline];
  if (!candidates) return null; // next-mdx-remote (programmatic) or unknown

  for (const candidate of candidates) {
    const p = path.join(cwd, candidate);
    if (!(await fs.pathExists(p))) continue;
    const content = await fs.readFile(p, "utf-8");
    // Strip comment lines before checking — a commented-out reference is not "wired"
    const uncommented = content
      .split("\n")
      .filter((line) => !/^\s*(\/\/|\/\*|\*)/.test(line))
      .join("\n");
    return (
      uncommented.includes("remarkMdxUi") ||
      uncommented.includes("@docsui-io/remark-plugin")
    );
  }
  return false; // config file not found — plugin definitely not wired
}

function printReport(issues: Issue[]) {
  console.log();

  if (issues.length === 0) {
    console.log(chalk.green(chalk.bold("All checks passed.")));
    console.log();
    return;
  }

  const errors = issues.filter((i) => i.level === "error");
  const warns = issues.filter((i) => i.level === "warn");

  if (errors.length > 0) {
    console.log(
      chalk.red(
        chalk.bold(`${errors.length} error${errors.length !== 1 ? "s" : ""}:`),
      ),
    );
    for (const e of errors) console.log(`  ${chalk.red("✗")}  ${e.message}`);
    console.log();
  }
  if (warns.length > 0) {
    console.log(
      chalk.yellow(
        chalk.bold(`${warns.length} warning${warns.length !== 1 ? "s" : ""}:`),
      ),
    );
    for (const w of warns) console.log(`  ${chalk.yellow("~")}  ${w.message}`);
    console.log();
  }
}
