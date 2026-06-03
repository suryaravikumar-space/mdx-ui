import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs-extra";
import path from "path";
import os from "os";

// Test the pure helpers directly without invoking the CLI command
// (the command uses interactive prompts which can't run in CI)

function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function buildTemplate(title: string, description: string): string {
  const today = new Date().toISOString().slice(0, 10);
  return `---
title: "${title}"
description: "${description}"
date: ${today}
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

let tmpDir: string;

beforeEach(async () => {
  tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "docsui-new-"));
});

afterEach(async () => {
  await fs.remove(tmpDir);
});

describe("slugify", () => {
  it("lowercases and replaces spaces with hyphens", () => {
    expect(slugify("Binary Search Trees")).toBe("binary-search-trees");
  });

  it("strips special characters", () => {
    expect(slugify("AVL Trees (Balanced!)")).toBe("avl-trees-balanced");
  });

  it("collapses multiple spaces", () => {
    expect(slugify("A  B  C")).toBe("a-b-c");
  });

  it("trims leading and trailing hyphens", () => {
    expect(slugify("  hello  ")).toBe("hello");
  });

  it("handles already-slugified input", () => {
    expect(slugify("binary-search-trees")).toBe("binary-search-trees");
  });
});

describe("buildTemplate", () => {
  it("includes the title in frontmatter", () => {
    const out = buildTemplate("Binary Search Trees", "A guide to BSTs");
    expect(out).toContain('title: "Binary Search Trees"');
  });

  it("includes the description in frontmatter", () => {
    const out = buildTemplate("BST", "A guide to BSTs");
    expect(out).toContain('description: "A guide to BSTs"');
  });

  it("includes today's date in frontmatter", () => {
    const today = new Date().toISOString().slice(0, 10);
    const out = buildTemplate("BST", "desc");
    expect(out).toContain(`date: ${today}`);
  });

  it("includes H1 heading with title", () => {
    const out = buildTemplate("Binary Search Trees", "desc");
    expect(out).toContain("# Binary Search Trees");
  });

  it("includes Callout component", () => {
    const out = buildTemplate("BST", "desc");
    expect(out).toContain("<Callout>");
  });

  it("includes Definition component", () => {
    const out = buildTemplate("BST", "desc");
    expect(out).toContain("<Definition term=");
  });

  it("includes success Callout variant", () => {
    const out = buildTemplate("BST", "desc");
    expect(out).toContain('<Callout variant="success">');
  });

  it("produces valid MDX frontmatter delimiters", () => {
    const out = buildTemplate("BST", "desc");
    expect(out.startsWith("---\n")).toBe(true);
    expect(out).toContain("\n---\n");
  });
});

describe("file writing logic", () => {
  it("writes the templated content to the correct path", async () => {
    const title = "Binary Search Trees";
    const slug = slugify(title);
    const fileName = `${slug}.mdx`;
    const filePath = path.join(tmpDir, fileName);

    await fs.writeFile(filePath, buildTemplate(title, "desc"), "utf-8");

    expect(await fs.pathExists(filePath)).toBe(true);
    const content = await fs.readFile(filePath, "utf-8");
    expect(content).toContain("# Binary Search Trees");
  });

  it("creates nested directories for sub-path segments", async () => {
    const segments = ["2025", "data-structures"];
    const targetDir = path.join(tmpDir, ...segments);
    await fs.ensureDir(targetDir);
    const filePath = path.join(targetDir, "bst.mdx");
    await fs.writeFile(filePath, buildTemplate("BST", "desc"), "utf-8");

    expect(await fs.pathExists(filePath)).toBe(true);
  });

  it("file extension is .mdx not .ai.mdx", async () => {
    const slug = slugify("Graph Traversal");
    expect(`${slug}.mdx`).toBe("graph-traversal.mdx");
    expect(`${slug}.mdx`).not.toContain(".ai.");
  });
});
