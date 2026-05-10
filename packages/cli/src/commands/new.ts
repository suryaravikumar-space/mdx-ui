import { Command } from "commander";
import prompts from "prompts";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function buildTemplate(title: string, description: string): string {
  return `---
title: "${title}"
description: "${description}"
date: ${todayIso()}
---

# ${title}

<Callout>
  Write your introduction here.
</Callout>

## Overview

Your content goes here.

## Key Concepts

<Definition term="Term">
  Define your key terms here using the Definition component.
</Definition>

## Summary

<Callout variant="success">
  Summarize what the reader has learned.
</Callout>
`;
}

export const newCommand = new Command()
  .name("new")
  .description("Scaffold a new blank .mdx page with starter components")
  .argument("[title]", "page title (will be slugified for the filename)")
  .option("-o, --out <dir>", "output directory")
  .option(
    "-p, --path <segments...>",
    "optional sub-path segments placed between --out and the filename",
  )
  .action(
    async (
      titleArg: string | undefined,
      opts: { out?: string; path?: string[] },
    ) => {
      console.log();

      // Prompt for title if not provided as argument
      let title = titleArg;
      if (!title) {
        const res = await prompts({
          type: "text",
          name: "title",
          message: "Page title",
          validate: (v) => (v.trim() ? true : "Title cannot be empty"),
        });
        if (!res.title) process.exit(0);
        title = res.title as string;
      }

      // Prompt for output directory if not provided
      let outDir = opts.out;
      if (!outDir) {
        const res = await prompts({
          type: "text",
          name: "out",
          message: "Output directory",
          initial: "content",
        });
        if (res.out === undefined) process.exit(0);
        outDir = (res.out as string) || "content";
      }

      // Prompt for description
      const { description } = await prompts({
        type: "text",
        name: "description",
        message: "Short description (optional)",
        initial: "",
      });

      const slug = slugify(title);
      const fileName = `${slug}.mdx`;
      const segments = opts.path ?? [];

      const cwd = process.cwd();
      const absoluteOut = path.isAbsolute(outDir)
        ? outDir
        : path.join(cwd, outDir);
      const targetDir = path.join(absoluteOut, ...segments);
      const filePath = path.join(targetDir, fileName);
      const relativePath = path.relative(cwd, filePath);

      // Warn if file already exists
      if (await fs.pathExists(filePath)) {
        const { overwrite } = await prompts({
          type: "confirm",
          name: "overwrite",
          message: `${relativePath} already exists. Overwrite?`,
          initial: false,
        });
        if (!overwrite) {
          console.log(chalk.yellow("Cancelled."));
          process.exit(0);
        }
      }

      await fs.ensureDir(targetDir);
      await fs.writeFile(
        filePath,
        buildTemplate(title, (description as string) || title),
        "utf-8",
      );

      console.log();
      console.log(`  ${chalk.green("✓")} ${chalk.bold(relativePath)}`);
      console.log();
      console.log(
        chalk.dim("  Open the file and replace the placeholder content."),
      );
      console.log();
    },
  );
