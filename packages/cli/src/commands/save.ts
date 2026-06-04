import { Command } from "commander";
import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import { saveMdxPage } from "../utils/save-mdx-page.js";

export const save = new Command()
  .name("save")
  .description("Save an MDX string to a structured file path")
  .requiredOption("-o, --out <dir>", "root output folder (e.g. content, docs)")
  .requiredOption(
    "-p, --path <segments...>",
    "ordered path segments — all but the last become folders, last becomes filename",
  )
  .option("-f, --file <file>", "read MDX content from a file instead of stdin")
  .action(async (opts: { out: string; path: string[]; file?: string }) => {
    console.log();

    let content: string;

    if (opts.file) {
      if (!(await fs.pathExists(opts.file))) {
        console.log(chalk.red(`✗ File not found: ${opts.file}`));
        process.exit(1);
      }
      content = await fs.readFile(opts.file, "utf-8");
    } else if (!process.stdin.isTTY) {
      // read from stdin pipe
      const chunks: Buffer[] = [];
      for await (const chunk of process.stdin) chunks.push(chunk);
      content = Buffer.concat(chunks).toString("utf-8");
    } else {
      console.log(
        chalk.red("✗ Provide MDX via --file or pipe it through stdin"),
      );
      console.log();
      console.log(chalk.dim("Examples:"));
      console.log(
        chalk.dim(
          "  docsui save --out content --path 2025 ds bst intro --file page.mdx",
        ),
      );
      console.log(
        chalk.dim(
          "  echo '<Callout>Hello</Callout>' | docsui save --out content --path 2025 ds bst intro",
        ),
      );
      process.exit(1);
    }

    const spinner = ora("Writing MDX file…").start();

    try {
      const result = await saveMdxPage({
        content,
        outDir: opts.out,
        path: opts.path,
      });

      spinner.succeed("MDX file saved");
      console.log();
      console.log(`  ${chalk.green("✓")} ${chalk.bold(result.relativePath)}`);
      console.log();
    } catch (error: unknown) {
      spinner.fail("Failed to save MDX file");
      const msg = error instanceof Error ? error.message : String(error);
      console.error(chalk.red(msg));
      process.exit(1);
    }
  });
