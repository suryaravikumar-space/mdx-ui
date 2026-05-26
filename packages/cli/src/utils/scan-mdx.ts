// ─── MDX Component Scanner ───────────────────────────────────────────────────
//
// Scans .mdx files in the project for JSX component usage, compares against
// what is registered in mdx-components.tsx, and warns about missing ones.

import fs from "fs-extra";
import path from "path";
import chalk from "chalk";
import { glob } from "glob";

// Extract all uppercase JSX tag names from MDX content
export function extractComponentNames(content: string): Set<string> {
  const names = new Set<string>();
  // Match opening tags: <ComponentName or <ComponentName.SubName
  const tagRe = /<([A-Z][a-zA-Z0-9]*)/g;
  // Skip inside code fences
  const stripped = content
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]*`/g, "");
  let m: RegExpExecArray | null;
  while ((m = tagRe.exec(stripped)) !== null) {
    names.add(m[1]);
  }
  return names;
}

// Extract registered component names from mdx-components.tsx
export function extractRegistered(mdxComponentsSource: string): Set<string> {
  const names = new Set<string>();
  // Match: import { Foo, Bar } from "./something"
  const importRe = /import\s*\{([^}]+)\}/g;
  let m: RegExpExecArray | null;
  while ((m = importRe.exec(mdxComponentsSource)) !== null) {
    m[1].split(",").forEach((s) => {
      // Handle "Foo as Bar" aliases
      const name = s
        .trim()
        .split(/\s+as\s+/)
        .pop()
        ?.trim();
      if (name && /^[A-Z]/.test(name)) names.add(name);
    });
  }
  // Also match shorthand exports: { foo: Foo } → capture Foo
  const mapRe = /:\s*([A-Z][a-zA-Z0-9]*)/g;
  while ((m = mapRe.exec(mdxComponentsSource)) !== null) {
    names.add(m[1]);
  }
  return names;
}

// HTML-like elements and React built-ins to skip
const IGNORE = new Set([
  "Fragment",
  "React",
  "StrictMode",
  "Suspense",
  "ErrorBoundary",
]);

export interface ScanResult {
  file: string;
  missing: Array<{ name: string; installAs: string }>;
}

/**
 * Scan all .mdx files under cwd for unregistered components.
 * Returns results and prints warnings to the console.
 */
export async function scanMdxComponents(cwd: string): Promise<ScanResult[]> {
  // Find the mdx-components.tsx file
  const candidates = [
    "src/components/mdx-ui/mdx-components.tsx",
    "src/components/mdx-components.tsx",
    "components/mdx-ui/mdx-components.tsx",
    "components/mdx-components.tsx",
  ];

  let mdxComponentsPath = "";
  for (const c of candidates) {
    const full = path.join(cwd, c);
    if (fs.existsSync(full)) {
      mdxComponentsPath = full;
      break;
    }
  }

  const registered = mdxComponentsPath
    ? extractRegistered(fs.readFileSync(mdxComponentsPath, "utf-8"))
    : new Set<string>();

  // Find all .mdx files
  const mdxFiles = await glob("**/*.mdx", {
    cwd,
    ignore: ["**/node_modules/**", "**/dist/**", "**/.next/**"],
    absolute: true,
  });

  if (mdxFiles.length === 0) return [];

  const results: ScanResult[] = [];

  for (const file of mdxFiles) {
    const content = fs.readFileSync(file, "utf-8");
    const used = extractComponentNames(content);
    const missing: ScanResult["missing"] = [];

    for (const name of used) {
      if (IGNORE.has(name)) continue;
      if (registered.has(name)) continue;
      // Convert PascalCase to kebab-case for install command
      const installAs = name
        .replace(/([A-Z])/g, (m, c, i) => (i === 0 ? c : `-${c}`))
        .toLowerCase();
      missing.push({ name, installAs });
    }

    if (missing.length > 0) {
      results.push({ file: path.relative(cwd, file), missing });
    }
  }

  return results;
}

/**
 * Print scan results as warnings with install commands.
 */
export function printScanWarnings(results: ScanResult[], pm = "pnpm"): void {
  if (results.length === 0) return;

  // Collect all unique missing components across files
  const allMissing = new Map<string, string>();
  for (const r of results) {
    for (const m of r.missing) allMissing.set(m.name, m.installAs);
  }

  console.log("");
  console.log(chalk.yellow("⚠ Unregistered components found in MDX files:\n"));

  for (const { file, missing } of results) {
    for (const { name } of missing) {
      console.log(
        `  ${chalk.dim(file)} → ${chalk.cyan(`<${name}>`)} is not installed`,
      );
    }
  }

  console.log("");
  console.log(chalk.bold("Fix:"));

  const dlx = pm === "pnpm" ? "pnpm dlx" : pm === "yarn" ? "yarn dlx" : "npx";
  const installNames = [...allMissing.values()].join(" ");
  console.log(
    `  ${chalk.green(`${dlx} @ravikumarsurya/mdx-ui add ${installNames}`)}`,
  );
  console.log("");
}
