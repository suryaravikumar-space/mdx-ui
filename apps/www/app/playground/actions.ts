"use server";

import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import remarkMdxUi from "@ravikumarsurya/remark-mdx-ui";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

function sanitizeForSerialize(source: string): string {
  const lines = source.split("\n");
  const out: string[] = [];
  // Track opening backtick run length (0 = not in fence).
  // A closing fence requires >= as many backticks as the opener, matching CommonMark.
  let fenceLen = 0;
  for (const line of lines) {
    const stripped = line.trimStart();
    if (stripped.startsWith("`")) {
      const runLen = stripped.match(/^(`+)/)?.[1].length ?? 0;
      if (runLen >= 3) {
        if (fenceLen === 0) {
          fenceLen = runLen;
          out.push(line);
          continue;
        } else if (runLen >= fenceLen) {
          fenceLen = 0;
          out.push(line);
          continue;
        }
      }
    }
    if (fenceLen > 0) {
      out.push(line);
      continue;
    }
    // Strip ES module imports and exports — not supported by next-mdx-remote serialize
    if (/^import\s+.+from\s+['"]/.test(line)) continue;
    if (/^export\s+(default|const|let|var|function|class)\s+/.test(line))
      continue;
    // Strip trailing semicolons from self-closing JSX tags (/>; → />)
    out.push(line.replace(/(\/>)\s*;\s*$/, "$1"));
  }
  return out.join("\n").trim();
}

export async function compileMdx(
  source: string,
): Promise<
  { ok: true; result: MDXRemoteSerializeResult } | { ok: false; error: string }
> {
  try {
    const result = await serialize(sanitizeForSerialize(source), {
      parseFrontmatter: true,
      blockJS: false,
      mdxOptions: {
        remarkPlugins: [
          [
            remarkMdxUi,
            { callout: true, table: true, steps: true, mermaid: true },
          ],
          remarkMath,
        ],
        rehypePlugins: [rehypeKatex],
      },
    });
    return { ok: true, result };
  } catch (e: unknown) {
    const raw = e instanceof Error ? e.message : String(e);
    const error = raw.split("\n").filter(Boolean)[0] ?? raw;
    return { ok: false, error };
  }
}
