"use server"

import { serialize } from "next-mdx-remote/serialize"
import type { MDXRemoteSerializeResult } from "next-mdx-remote"
import remarkMdxUi from "@ravikumarsurya/remark-mdx-ui"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

export async function compileMdx(
  source: string,
): Promise<
  { ok: true; result: MDXRemoteSerializeResult } | { ok: false; error: string }
> {
  try {
    const result = await serialize(source, {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [[remarkMdxUi, { callout: true, table: true, steps: true, mermaid: true }], remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    })
    return { ok: true, result }
  } catch (e: unknown) {
    const raw = e instanceof Error ? e.message : String(e)
    const error = raw.split("\n").filter(Boolean)[0] ?? raw
    return { ok: false, error }
  }
}
