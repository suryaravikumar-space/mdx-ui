import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs-extra";
import path from "path";
import os from "os";
import { saveMdxPage } from "../utils/save-mdx-page.js";

const MDX = "# Hello\n\n<Callout>Test</Callout>\n";

let tmpDir: string;

beforeEach(async () => {
  tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "docsui-test-"));
});

afterEach(async () => {
  await fs.remove(tmpDir);
});

describe("saveMdxPage", () => {
  it("writes a file with .ai.mdx extension", async () => {
    const result = await saveMdxPage({
      content: MDX,
      outDir: tmpDir,
      path: ["introduction"],
    });
    expect(result.filePath).toMatch(/introduction\.ai\.mdx$/);
    expect(await fs.pathExists(result.filePath)).toBe(true);
  });

  it("writes correct content to the file", async () => {
    const result = await saveMdxPage({
      content: MDX,
      outDir: tmpDir,
      path: ["introduction"],
    });
    const written = await fs.readFile(result.filePath, "utf-8");
    expect(written).toBe(MDX);
  });

  it("creates nested folders from path array", async () => {
    const result = await saveMdxPage({
      content: MDX,
      outDir: tmpDir,
      path: ["2025", "data-structures", "binary-search-trees", "introduction"],
    });
    expect(result.filePath).toMatch(
      /2025[/\\]data-structures[/\\]binary-search-trees[/\\]introduction\.ai\.mdx$/,
    );
    expect(await fs.pathExists(result.filePath)).toBe(true);
  });

  it("works with a single path segment — no subfolders", async () => {
    const result = await saveMdxPage({
      content: MDX,
      outDir: tmpDir,
      path: ["lecture-1"],
    });
    const dir = path.dirname(result.filePath);
    expect(dir).toBe(path.resolve(tmpDir));
    expect(result.filePath).toMatch(/lecture-1\.ai\.mdx$/);
  });

  it("strips existing extension from the last segment before appending .ai.mdx", async () => {
    const result = await saveMdxPage({
      content: MDX,
      outDir: tmpDir,
      path: ["intro.mdx"],
    });
    expect(result.filePath).toMatch(/intro\.ai\.mdx$/);
    expect(result.filePath).not.toMatch(/intro\.mdx\.ai\.mdx$/);
  });

  it("returns a relativePath relative to cwd", async () => {
    const result = await saveMdxPage({
      content: MDX,
      outDir: tmpDir,
      path: ["segment", "page"],
    });
    expect(path.isAbsolute(result.relativePath)).toBe(false);
  });

  it("creates outDir if it does not exist", async () => {
    const newDir = path.join(tmpDir, "brand-new-dir");
    const result = await saveMdxPage({
      content: MDX,
      outDir: newDir,
      path: ["page"],
    });
    expect(await fs.pathExists(result.filePath)).toBe(true);
  });

  it("uses any folder name — year, client, course, etc.", async () => {
    const result = await saveMdxPage({
      content: MDX,
      outDir: tmpDir,
      path: ["clients", "acme-corp", "onboarding", "getting-started"],
    });
    expect(result.filePath).toMatch(
      /clients[/\\]acme-corp[/\\]onboarding[/\\]getting-started\.ai\.mdx$/,
    );
  });

  it("throws when content is empty", async () => {
    await expect(
      saveMdxPage({ content: "", outDir: tmpDir, path: ["page"] }),
    ).rejects.toThrow("content must not be empty");
  });

  it("throws when outDir is empty", async () => {
    await expect(
      saveMdxPage({ content: MDX, outDir: "", path: ["page"] }),
    ).rejects.toThrow("outDir must not be empty");
  });

  it("throws when path array is empty", async () => {
    await expect(
      saveMdxPage({ content: MDX, outDir: tmpDir, path: [] }),
    ).rejects.toThrow("path must have at least one segment");
  });

  it("throws when a path segment is empty string", async () => {
    await expect(
      saveMdxPage({
        content: MDX,
        outDir: tmpDir,
        path: ["valid", "", "page"],
      }),
    ).rejects.toThrow("path segments must not be empty strings");
  });

  it("throws on directory traversal in path segment", async () => {
    await expect(
      saveMdxPage({
        content: MDX,
        outDir: tmpDir,
        path: ["../escape", "page"],
      }),
    ).rejects.toThrow('must not contain ".."');
  });

  it("overwrites existing file without error", async () => {
    const opts = { content: MDX, outDir: tmpDir, path: ["page"] };
    await saveMdxPage(opts);
    const result = await saveMdxPage({ ...opts, content: "# Updated\n" });
    const written = await fs.readFile(result.filePath, "utf-8");
    expect(written).toBe("# Updated\n");
  });
});
