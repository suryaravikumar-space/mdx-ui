import fs from "fs-extra";
import path from "path";

export interface SaveMdxPageOptions {
  /** The MDX string to write */
  content: string;
  /** Root output folder — e.g. "content", "docs", "src/content" */
  outDir: string;
  /**
   * Ordered path segments.
   * Every item except the last becomes a folder.
   * The last item becomes the filename (`.ai.mdx` is appended automatically).
   *
   * @example
   * path: ["2025", "data-structures", "binary-search-trees", "introduction"]
   * // writes to: <outDir>/2025/data-structures/binary-search-trees/introduction.ai.mdx
   *
   * @example
   * path: ["lecture-1"]
   * // writes to: <outDir>/lecture-1.ai.mdx
   */
  path: string[];
}

export interface SaveMdxPageResult {
  /** Absolute path of the written file */
  filePath: string;
  /** Path relative to process.cwd() */
  relativePath: string;
}

/**
 * Write an MDX string to a fully dynamic folder structure.
 *
 * No assumptions about segment names, year, subject, or depth.
 * The caller owns the structure entirely via the `path` array.
 */
export async function saveMdxPage(
  options: SaveMdxPageOptions,
): Promise<SaveMdxPageResult> {
  const { content, outDir, path: segments } = options;

  if (!content || content.trim() === "") {
    throw new Error("saveMdxPage: content must not be empty");
  }

  if (!outDir || outDir.trim() === "") {
    throw new Error("saveMdxPage: outDir must not be empty");
  }

  if (!segments || segments.length === 0) {
    throw new Error("saveMdxPage: path must have at least one segment");
  }

  // Validate each segment — no absolute paths or directory traversal
  for (const segment of segments) {
    if (!segment || segment.trim() === "") {
      throw new Error("saveMdxPage: path segments must not be empty strings");
    }
    if (path.isAbsolute(segment)) {
      throw new Error(
        `saveMdxPage: path segment "${segment}" must not be absolute`,
      );
    }
    if (segment.includes("..")) {
      throw new Error(
        `saveMdxPage: path segment "${segment}" must not contain ".."`,
      );
    }
  }

  // Last segment = filename, rest = folders
  const folders = segments.slice(0, -1);
  const rawName = segments[segments.length - 1];

  // Strip any existing extension then append .ai.mdx
  const baseName = rawName.replace(/\.[^.]+$/, "");
  const fileName = `${baseName}.ai.mdx`;

  const cwd = process.cwd();
  const absoluteOutDir = path.isAbsolute(outDir)
    ? outDir
    : path.join(cwd, outDir);

  const targetDir = path.join(absoluteOutDir, ...folders);
  const filePath = path.join(targetDir, fileName);

  await fs.ensureDir(targetDir);
  await fs.writeFile(filePath, content, "utf-8");

  const relativePath = path.relative(cwd, filePath);

  return { filePath, relativePath };
}
