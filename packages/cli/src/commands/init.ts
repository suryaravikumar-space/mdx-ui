import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { execa } from "execa";
import {
  detectProjectStructure,
  type Framework,
  type MdxPipeline,
} from "../utils/detect-structure.js";
import { scanMdxComponents, printScanWarnings } from "../utils/scan-mdx.js";
import { ping } from "../utils/telemetry.js";
import {
  CSS_VARS_BLOCK_V3,
  CSS_VARS_BLOCK_V4,
  MDXUI_SEMANTIC_TOKENS,
  MDXUI_V4_THEME,
  MDXUI_TAILWIND_COLOR_SCALES,
  TAILWIND_V3_THEME_EXTENSIONS,
} from "../lib/css-tokens.js";

const FRAMEWORK_LABELS: Record<Framework, string> = {
  nextjs: "Next.js",
  astro: "Astro",
  react: "React",
  unknown: "Unknown",
};

export const init = new Command()
  .name("init")
  .description("Initialize your project for docsui")
  .action(async () => {
    console.log(chalk.bold("\n✨ Welcome to docsui!\n"));

    const cwd = process.cwd();
    const structure = await detectProjectStructure(cwd);

    console.log(
      chalk.dim(
        `Detected framework: ${chalk.white(FRAMEWORK_LABELS[structure.framework])}`,
      ),
    );
    console.log(
      chalk.dim(`Structure: ${structure.hasSrc ? "src/" : "root-level"}\n`),
    );

    const config = await prompts([
      {
        type: "text",
        name: "componentsDir",
        message: "Where should we put the components?",
        initial: structure.componentsDir,
      },
      {
        type: "confirm",
        name: "typescript",
        message: "Are you using TypeScript?",
        initial: structure.hasTypeScript,
      },
      {
        type: "confirm",
        name: "tailwind",
        message: "Are you using Tailwind CSS?",
        initial: structure.hasTailwind,
      },
    ]);

    const spinner = ora("Initializing project...").start();

    try {
      await fs.ensureDir(path.join(cwd, config.componentsDir));
      await fs.ensureDir(path.join(cwd, structure.libDir));

      const ext = config.typescript ? "ts" : "js";
      const utilsContent = config.typescript
        ? `import { clsx, type ClassValue } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs))\n}\n`
        : `import { clsx } from "clsx"\nimport { twMerge } from "tailwind-merge"\n\nexport function cn(...inputs) {\n  return twMerge(clsx(inputs))\n}\n`;

      const utilsPath = path.join(cwd, structure.libDir, `utils.${ext}`);
      if (!(await fs.pathExists(utilsPath))) {
        await fs.writeFile(utilsPath, utilsContent);
      }

      // Framework-specific setup
      await setupFramework(structure.framework, cwd, spinner);

      // Set up @/ path alias
      if (config.typescript) {
        await setupPathAlias(
          structure.framework,
          structure.hasSrc,
          cwd,
          spinner,
        );
      }

      // Set up CSS variable tokens
      let cssFile: string | null = null;
      let tailwindConfig: string | null = null;
      if (config.tailwind) {
        const twVersion = await detectTailwindVersion(cwd);
        cssFile = await setupGlobalCSS(
          structure.framework,
          structure.hasSrc,
          cwd,
          twVersion,
          spinner,
        );
        tailwindConfig = await setupTailwindConfig(cwd, twVersion, spinner);
      }

      // Create mdx-components.tsx with patch markers
      await setupMdxComponents(
        config.componentsDir,
        config.typescript,
        cwd,
        spinner,
      );

      await fs.writeJSON(
        path.join(cwd, "docsui.json"),
        {
          $schema: "https://docsui.dev/schema.json",
          framework: structure.framework,
          mdxPipeline: structure.mdxPipeline,
          componentsDir: config.componentsDir,
          typescript: config.typescript,
          tailwind: config.tailwind,
          ...(cssFile && { cssFile }),
          ...(tailwindConfig && { tailwindConfig }),
        },
        { spaces: 2 },
      );

      spinner.succeed("Project initialized!");
      ping("init", { framework: structure.framework });

      console.log(chalk.green("\n✓ docsui.json"));
      console.log(chalk.green(`✓ ${config.componentsDir}/`));
      console.log(chalk.green(`✓ ${structure.libDir}/utils.${ext}`));
      console.log(
        chalk.green(
          `✓ ${config.componentsDir}/mdx-components.${config.typescript ? "tsx" : "jsx"}`,
        ),
      );
      if (config.typescript && structure.framework !== "nextjs") {
        console.log(
          chalk.green("✓ Configured @/ path alias in tsconfig and vite.config"),
        );
      }
      if (config.tailwind) {
        console.log(
          chalk.green(
            "✓ Added CSS variable tokens to globals.css and tailwind.config",
          ),
        );
      }

      printNextSteps(structure.framework, structure.mdxPipeline);

      // Scan MDX files for unregistered components
      const pm = (await fs.pathExists(path.join(cwd, "pnpm-lock.yaml")))
        ? "pnpm"
        : (await fs.pathExists(path.join(cwd, "yarn.lock")))
          ? "yarn"
          : "npm";
      const scanResults = await scanMdxComponents(cwd);
      printScanWarnings(scanResults, pm);
    } catch (error) {
      spinner.fail("Failed to initialize project");
      console.error(error);
      process.exit(1);
    }
  });

async function setupFramework(
  framework: Framework,
  cwd: string,
  spinner: ReturnType<typeof ora>,
) {
  if (framework !== "astro") return;

  const pkg = await fs.readJSON(path.join(cwd, "package.json"));
  const deps = { ...pkg.dependencies, ...pkg.devDependencies };

  if (!("@astrojs/react" in deps)) {
    spinner.text = "Installing @astrojs/react...";
    const pm = (await fs.pathExists(path.join(cwd, "pnpm-lock.yaml")))
      ? "pnpm"
      : (await fs.pathExists(path.join(cwd, "yarn.lock")))
        ? "yarn"
        : "npm";
    const addCmd = pm === "npm" ? "install" : "add";
    await execa(
      pm,
      [
        addCmd,
        "-D",
        "@astrojs/react",
        "react",
        "react-dom",
        "@types/react",
        "@types/react-dom",
      ],
      { cwd },
    );
  }

  // Patch astro.config to add react integration
  const astroConfig = (await fs.pathExists(path.join(cwd, "astro.config.ts")))
    ? path.join(cwd, "astro.config.ts")
    : path.join(cwd, "astro.config.mjs");

  if (await fs.pathExists(astroConfig)) {
    let content = await fs.readFile(astroConfig, "utf-8");
    if (!content.includes("@astrojs/react")) {
      content = `import react from "@astrojs/react"\n` + content;
      content = content.replace(
        /integrations:\s*\[/,
        "integrations: [\n    react(),",
      );
      await fs.writeFile(astroConfig, content);
    }
  }
}

async function setupPathAlias(
  framework: Framework,
  hasSrc: boolean,
  cwd: string,
  spinner: ReturnType<typeof ora>,
) {
  // Next.js already configures @/ alias — skip
  if (framework === "nextjs") return;

  const aliasTarget = hasSrc ? "./src" : ".";
  const aliasTargetTs = hasSrc ? ["./src/*"] : ["./*"];

  // Patch tsconfig.json
  const tsconfigPaths = [
    path.join(cwd, "tsconfig.app.json"), // Vite generates this
    path.join(cwd, "tsconfig.json"),
  ];

  for (const tsconfigPath of tsconfigPaths) {
    if (!(await fs.pathExists(tsconfigPath))) continue;
    try {
      const tsconfig = await fs.readJSON(tsconfigPath);
      tsconfig.compilerOptions = tsconfig.compilerOptions ?? {};
      tsconfig.compilerOptions.baseUrl = ".";
      tsconfig.compilerOptions.paths = {
        ...(tsconfig.compilerOptions.paths ?? {}),
        "@/*": aliasTargetTs,
      };
      await fs.writeJSON(tsconfigPath, tsconfig, { spaces: 2 });
      spinner.text = `Patched ${path.basename(tsconfigPath)} with @/ alias`;
    } catch {
      // non-fatal
    }
  }

  // Patch vite.config.ts / vite.config.js
  const viteConfigPaths = [
    path.join(cwd, "vite.config.ts"),
    path.join(cwd, "vite.config.js"),
    path.join(cwd, "vite.config.mts"),
  ];

  for (const viteConfigPath of viteConfigPaths) {
    if (!(await fs.pathExists(viteConfigPath))) continue;
    try {
      let content = await fs.readFile(viteConfigPath, "utf-8");

      // Add path import if missing
      if (!content.includes("import path from")) {
        content = `import path from "path"\n` + content;
      }

      // Add resolve.alias if missing
      if (!content.includes("resolve:") && !content.includes("alias:")) {
        content = content.replace(
          /defineConfig\s*\(\s*\{/,
          `defineConfig({\n  resolve: {\n    alias: {\n      "@": path.resolve(__dirname, "${aliasTarget}"),\n    },\n  },`,
        );
      }

      await fs.writeFile(viteConfigPath, content);
      spinner.text = `Patched ${path.basename(viteConfigPath)} with @/ alias`;

      // Ensure @types/node is installed for path module
      const pkg = await fs.readJSON(path.join(cwd, "package.json"));
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      if (!("@types/node" in deps)) {
        spinner.text = "Installing @types/node...";
        const pm = (await fs.pathExists(path.join(cwd, "pnpm-lock.yaml")))
          ? "pnpm"
          : (await fs.pathExists(path.join(cwd, "yarn.lock")))
            ? "yarn"
            : "npm";
        const addCmd = pm === "npm" ? "install" : "add";
        await execa(pm, [addCmd, "-D", "@types/node"], { cwd });
      }
    } catch {
      // non-fatal
    }
    break; // only patch the first vite config found
  }
}

async function detectTailwindVersion(cwd: string): Promise<4 | 3> {
  try {
    const pkg = await fs.readJSON(path.join(cwd, "package.json"));
    const deps = { ...pkg.dependencies, ...pkg.devDependencies };
    const version: string = deps["tailwindcss"] ?? "";
    return version.match(/^\^?4/) ? 4 : 3;
  } catch {
    return 3;
  }
}

async function setupGlobalCSS(
  _framework: Framework,
  hasSrc: boolean,
  cwd: string,
  twVersion: 4 | 3,
  spinner: ReturnType<typeof ora>,
): Promise<string | null> {
  // All known CSS entry-point paths across all frameworks
  const candidatePaths = [
    path.join(cwd, "src/app/globals.css"), // Next.js App Router (src)
    path.join(cwd, "app/globals.css"), // Next.js App Router (root)
    path.join(cwd, "src/styles/globals.css"), // Astro / custom
    path.join(cwd, "src/styles/global.css"), // Astro / custom
    path.join(cwd, "src/index.css"), // Vite React
    path.join(cwd, "src/globals.css"), // custom
    path.join(cwd, "index.css"), // root-level
    path.join(cwd, "globals.css"), // root-level
  ];

  let cssPath: string | null = null;
  for (const p of candidatePaths) {
    if (await fs.pathExists(p)) {
      cssPath = p;
      break;
    }
  }

  const cssVarsBlock = twVersion === 4 ? CSS_VARS_BLOCK_V4 : CSS_VARS_BLOCK_V3;
  const twDirectives =
    twVersion === 4
      ? `@import "tailwindcss";\n`
      : `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n`;

  // No CSS file found — create one
  if (!cssPath) {
    cssPath = hasSrc
      ? path.join(cwd, "src/index.css")
      : path.join(cwd, "index.css");
    await fs.ensureDir(path.dirname(cssPath));
    const v4Theme = twVersion === 4 ? MDXUI_V4_THEME : "";
    await fs.writeFile(
      cssPath,
      twDirectives + cssVarsBlock + MDXUI_SEMANTIC_TOKENS + v4Theme,
    );
    spinner.text = `Created ${path.relative(cwd, cssPath)} with CSS variable tokens`;

    // Auto-inject import into JS/TS entry files
    const entryFiles = [
      "src/main.tsx",
      "src/main.ts",
      "src/index.tsx",
      "src/index.ts",
      "main.tsx",
      "main.ts",
      "src/entry.ts",
      "src/entry.tsx",
    ];
    for (const entry of entryFiles) {
      const entryPath = path.join(cwd, entry);
      if (!(await fs.pathExists(entryPath))) continue;
      const entryContent = await fs.readFile(entryPath, "utf-8");
      if (!entryContent.includes(".css")) {
        const rel = path
          .relative(path.dirname(entryPath), cssPath)
          .replace(/\\/g, "/");
        await fs.writeFile(entryPath, `import "./${rel}"\n` + entryContent);
        spinner.text = `Added CSS import to ${entry}`;
      }
      break;
    }
    return path.relative(cwd, cssPath);
  }

  let content = "";
  try {
    content = await fs.readFile(cssPath, "utf-8");
  } catch {
    return path.relative(cwd, cssPath);
  }

  // Inject base shadcn tokens only if not already present
  if (
    !content.includes("--background:") &&
    !content.includes("--foreground:")
  ) {
    try {
      await fs.appendFile(cssPath, cssVarsBlock);
      content += cssVarsBlock;
      spinner.text = `Added CSS variable tokens to ${path.relative(cwd, cssPath)}`;
    } catch {
      // non-fatal
    }
  }

  // Inject docsui semantic tokens independently — even on existing shadcn projects
  // Use the in-memory content (possibly updated above) to avoid a second disk read
  if (!content.includes("--mdxui-info-bg")) {
    try {
      const v4Theme = twVersion === 4 ? MDXUI_V4_THEME : "";
      await fs.appendFile(cssPath, MDXUI_SEMANTIC_TOKENS + v4Theme);
      spinner.text = `Added docsui semantic tokens to ${path.relative(cwd, cssPath)}`;
    } catch {
      // non-fatal
    }
  }

  return path.relative(cwd, cssPath);
}

function injectMdxuiColorsIntoConfig(content: string): string {
  const colorsIdx = content.indexOf("colors:");
  if (colorsIdx === -1) {
    return content.includes("extend:")
      ? content.replace(
          /extend:\s*\{/,
          `extend: {\n      colors: {\n${MDXUI_TAILWIND_COLOR_SCALES}\n      },`,
        )
      : content;
  }
  const openBrace = content.indexOf("{", colorsIdx);
  if (openBrace === -1) return content;
  let depth = 0;
  let closeIdx = -1;
  for (let i = openBrace; i < content.length; i++) {
    if (content[i] === "{") depth++;
    else if (content[i] === "}") {
      if (--depth === 0) {
        closeIdx = i;
        break;
      }
    }
  }
  if (closeIdx === -1) return content;
  return (
    content.slice(0, closeIdx) +
    `\n${MDXUI_TAILWIND_COLOR_SCALES}\n      ` +
    content.slice(closeIdx)
  );
}

async function setupTailwindConfig(
  cwd: string,
  twVersion: 4 | 3,
  spinner: ReturnType<typeof ora>,
): Promise<string | null> {
  // Tailwind v4 stores all config in CSS — no tailwind.config file to patch
  if (twVersion === 4) return null;

  const configPaths = [
    path.join(cwd, "tailwind.config.ts"),
    path.join(cwd, "tailwind.config.js"),
    path.join(cwd, "tailwind.config.mjs"),
    path.join(cwd, "tailwind.config.cjs"),
  ];

  let configPath: string | null = null;
  for (const p of configPaths) {
    if (await fs.pathExists(p)) {
      configPath = p;
      break;
    }
  }

  if (!configPath) return null;

  try {
    let content = await fs.readFile(configPath, "utf-8");
    const hasShadcn =
      content.includes("hsl(var(--background))") ||
      content.includes('"--background"');
    const hasMdxui = content.includes("--mdxui-info-border");

    if (!hasShadcn) {
      // Fresh config — inject full shadcn + docsui block
      if (content.includes("extend:")) {
        content = content.replace(
          /extend:\s*\{/,
          `extend: {\n${TAILWIND_V3_THEME_EXTENSIONS}`,
        );
      } else if (content.includes("theme:")) {
        content = content.replace(
          /theme:\s*\{/,
          `theme: {\n    extend: {\n${TAILWIND_V3_THEME_EXTENSIONS}\n    },`,
        );
      }
      await fs.writeFile(configPath, content);
      spinner.text = `Patched ${path.basename(configPath)} with CSS variable theme colors`;
    } else if (!hasMdxui) {
      // Existing shadcn config — inject only the docsui semantic color scales
      content = injectMdxuiColorsIntoConfig(content);
      await fs.writeFile(configPath, content);
      spinner.text = `Added docsui semantic colors to ${path.basename(configPath)}`;
    }
  } catch {
    // non-fatal
  }
  return path.relative(cwd, configPath);
}

async function setupMdxComponents(
  componentsDir: string,
  typescript: boolean,
  cwd: string,
  spinner: ReturnType<typeof ora>,
) {
  const ext = typescript ? "tsx" : "jsx";
  const mdxPath = path.join(cwd, componentsDir, `mdx-components.${ext}`);

  if (await fs.pathExists(mdxPath)) return;

  const content = `export const mdxComponents = {
}
`;

  await fs.ensureDir(path.dirname(mdxPath));
  await fs.writeFile(mdxPath, content);
  spinner.text = `Created ${path.relative(cwd, mdxPath)}`;
}

const REMARK_PLUGIN_SNIPPETS: Record<MdxPipeline, string | null> = {
  contentlayer: `
  // contentlayer.config.ts
  import remarkMdxUi from "@docsui-cli/remark-plugin"

  export default makeSource({
    mdxOptions: {
      remarkPlugins: [
        [remarkMdxUi, { callout: true, table: true, steps: true, mermaid: true }],
      ],
    },
  })`,

  "next-mdx-remote": `
  // In your compileMdx / serialize call:
  import remarkMdxUi from "@docsui-cli/remark-plugin"

  const result = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [
        [remarkMdxUi, { callout: true, table: true, steps: true, mermaid: true }],
      ],
    },
  })`,

  "next-mdx": `
  // next.config.ts
  import remarkMdxUi from "@docsui-cli/remark-plugin"

  const withMDX = createMDX({
    options: {
      remarkPlugins: [
        [remarkMdxUi, { callout: true, table: true, steps: true, mermaid: true }],
      ],
    },
  })`,

  "astro-mdx": `
  // astro.config.ts
  import remarkMdxUi from "@docsui-cli/remark-plugin"

  export default defineConfig({
    markdown: {
      remarkPlugins: [
        [remarkMdxUi, { callout: true, table: true, steps: true, mermaid: true }],
      ],
    },
  })`,

  "mdx-rollup": `
  // vite.config.ts
  import remarkMdxUi from "@docsui-cli/remark-plugin"

  export default defineConfig({
    plugins: [
      mdx({
        remarkPlugins: [
          [remarkMdxUi, { callout: true, table: true, steps: true, mermaid: true }],
        ],
      }),
    ],
  })`,

  unknown: null,
};

function printNextSteps(framework: Framework, mdxPipeline: MdxPipeline) {
  console.log(chalk.bold("\n🎉 You're all set!\n"));
  console.log("Next steps:");
  console.log(chalk.cyan("  npx docsui-cli@latest add callout"));
  console.log(chalk.cyan("  npx docsui-cli@latest list"));

  // Remark plugin setup
  const snippet = REMARK_PLUGIN_SNIPPETS[mdxPipeline];
  if (snippet) {
    console.log(
      chalk.bold(
        "\n📦 Wire up the remark plugin so markdown auto-upgrades to components:",
      ),
    );
    console.log(chalk.dim("  Install: npm install @docsui-cli/remark-plugin"));
    console.log(chalk.white(snippet));
  } else {
    console.log(
      chalk.dim(
        "\n📦 To enable auto-upgrade of markdown → components, add the remark plugin:",
      ),
    );
    console.log(chalk.dim("  npm install @docsui-cli/remark-plugin"));
    console.log(
      chalk.dim(
        "  Then add remarkMdxUi to your MDX pipeline's remarkPlugins array.",
      ),
    );
  }

  if (framework === "astro") {
    console.log(
      chalk.dim("\nFor interactive components in Astro, use client:load:"),
    );
    console.log(chalk.white("  <Callout client:load>Hello</Callout>"));
  }

  if (framework !== "unknown") {
    console.log(
      chalk.dim(
        "\nFor math/chemistry support, import KaTeX CSS in your root layout:",
      ),
    );
    console.log(chalk.white('  import "katex/dist/katex.min.css"'));
  }

  console.log();
}
