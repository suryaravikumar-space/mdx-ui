/**
 * remark-mdx-ui
 *
 * Upgrades standard markdown patterns to mdx-ui components.
 * Works with any AI-generated markdown (OpenAI, Claude, Gemini, etc.)
 * and any MDX pipeline (contentlayer, next-mdx-remote, @next/mdx).
 *
 * Transforms:
 *  blockquote  →  <Callout>          (GFM alerts + **Note:** syntax)
 *  table       →  <DataTable>        (markdown tables)
 *  ordered list→  <Steps><Step>      (opt-in, numbered lists)
 *  ==text==    →  <Highlight>        (opt-in, ==marked== syntax)
 *  ```mermaid  →  <Mermaid chart={…} /> (mermaid diagrams)
 */

import { visit } from "unist-util-visit"
import type { Plugin } from "unified"
import type { Root, Blockquote, Table, List, Paragraph, Text, Code } from "mdast"

// ─── Options ──────────────────────────────────────────────────────────────────

export interface RemarkMdxUiOptions {
  /**
   * Transform blockquotes to <Callout>.
   * Supports GitHub GFM alert syntax ([!NOTE], [!WARNING], etc.)
   * and legacy (**Note:**, **Warning:**, etc.).
   * @default true
   */
  callout?: boolean

  /**
   * Transform markdown tables to <DataTable headers rows />.
   * @default true
   */
  table?: boolean

  /**
   * Transform top-level ordered lists to <Steps><Step>.
   * Useful for numbered procedures. Set to true to enable.
   * @default false
   */
  steps?: boolean

  /**
   * Transform ==highlighted text== to <Highlight>.
   * @default false
   */
  highlight?: boolean

  /**
   * Transform ```mermaid code blocks to <Mermaid chart={…} />.
   * Auto-detects the diagram type (flowchart, sequenceDiagram, etc.)
   * and passes the raw diagram source as the `chart` prop.
   * @default true
   */
  mermaid?: boolean
}

// ─── Helpers: MDX JSX node builders ──────────────────────────────────────────

/** Build estree for a 1-D string/number array literal */
function estree1D(values: (string | number)[]) {
  return {
    type: "Program",
    sourceType: "module",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "ArrayExpression",
          elements: values.map((v) => ({
            type: "Literal",
            value: v,
            raw: JSON.stringify(v),
          })),
        },
      },
    ],
    comments: [],
  }
}

/** Build estree for a 2-D array literal */
function estree2D(values: (string | number)[][]) {
  return {
    type: "Program",
    sourceType: "module",
    body: [
      {
        type: "ExpressionStatement",
        expression: {
          type: "ArrayExpression",
          elements: values.map((row) => ({
            type: "ArrayExpression",
            elements: row.map((v) => ({
              type: "Literal",
              value: v,
              raw: JSON.stringify(v),
            })),
          })),
        },
      },
    ],
    comments: [],
  }
}

/** String attribute  name="value" */
function strAttr(name: string, value: string) {
  return { type: "mdxJsxAttribute", name, value }
}

/** Expression attribute  name={expr} */
function exprAttr(name: string, jsCode: string, estreeNode: unknown) {
  return {
    type: "mdxJsxAttribute",
    name,
    value: {
      type: "mdxJsxAttributeValueExpression",
      value: jsCode,
      data: { estree: estreeNode },
    },
  }
}

/** Create a block-level MDX JSX element */
function jsxBlock(name: string, attributes: unknown[], children: unknown[]) {
  return { type: "mdxJsxFlowElement", name, attributes, children }
}

// ─── Extract plain text from mdast node children ──────────────────────────────

function toText(node: { children?: unknown[] }): string {
  if (!node.children) return ""
  return (node.children as any[])
    .map((child: any) => {
      if (child.type === "text") return child.value as string
      if (child.type === "inlineCode") return child.value as string
      if (child.children) return toText(child)
      return ""
    })
    .join("")
}

// ─── Transform 1: Blockquote → <Callout> ─────────────────────────────────────

const GFM_TYPE_MAP: Record<string, string> = {
  NOTE:      "info",
  TIP:       "success",
  IMPORTANT: "info",
  WARNING:   "warning",
  CAUTION:   "error",
}

const LEGACY_TYPE_MAP: Record<string, string> = {
  note:      "info",
  tip:       "success",
  info:      "info",
  important: "info",
  warning:   "warning",
  warn:      "warning",
  caution:   "error",
  danger:    "error",
  error:     "error",
}

function transformCallouts(tree: Root) {
  visit(tree, "blockquote", (node: Blockquote, index, parent) => {
    if (!parent || index == null) return

    const first = node.children[0]
    if (first?.type !== "paragraph") return

    const firstChild = first.children[0]
    let calloutType = "info"
    let contentChildren: typeof node.children = [...node.children]

    // ── GFM alert syntax: [!NOTE]\n… ─────────────────────────────────────
    if (firstChild?.type === "text") {
      const match = (firstChild as Text).value.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\n?/i)
      if (match) {
        calloutType = GFM_TYPE_MAP[match[1].toUpperCase()] ?? "info"
        const rest = (firstChild as Text).value.slice(match[0].length).trimStart()
        if (rest) {
          ;(firstChild as Text).value = rest
        } else {
          // Remove the first paragraph if it only contained [!NOTE]
          first.children = first.children.slice(1)
          if (first.children.length === 0) {
            contentChildren = node.children.slice(1)
          }
        }
        parent.children[index] = jsxBlock("Callout", [strAttr("type", calloutType)], contentChildren) as any
        return
      }
    }

    // ── Legacy **Note:** syntax ───────────────────────────────────────────
    if (firstChild?.type === "strong") {
      const strongText = toText(firstChild as any).toLowerCase().replace(/:$/, "").trim()
      if (LEGACY_TYPE_MAP[strongText]) {
        calloutType = LEGACY_TYPE_MAP[strongText]
        // Drop the **Note:** node and optional leading ": " from the next sibling
        first.children = first.children.slice(1)
        const next = first.children[0] as Text | undefined
        if (next?.type === "text") next.value = next.value.replace(/^:\s*/, "")
        parent.children[index] = jsxBlock("Callout", [strAttr("type", calloutType)], contentChildren) as any
        return
      }
    }

    // ── Plain blockquote — wrap as default Callout ────────────────────────
    parent.children[index] = jsxBlock("Callout", [], contentChildren) as any
  })
}

// ─── Transform 2: Table → <DataTable> ────────────────────────────────────────

function transformTables(tree: Root) {
  visit(tree, "table", (node: Table, index, parent) => {
    if (!parent || index == null) return

    const [headerRow, ...bodyRows] = node.children

    const headers = headerRow.children.map((cell) => toText(cell as any))
    const rows = bodyRows.map((row) => row.children.map((cell) => toText(cell as any)))

    const headersCode = JSON.stringify(headers)
    const rowsCode = JSON.stringify(rows)

    parent.children[index] = jsxBlock(
      "DataTable",
      [
        exprAttr("headers", headersCode, estree1D(headers)),
        exprAttr("rows", rowsCode, estree2D(rows)),
      ],
      []
    ) as any
  })
}

// ─── Transform 3: Ordered list → <Steps><Step> ───────────────────────────────

function transformSteps(tree: Root) {
  visit(tree, "list", (node: List, index, parent) => {
    if (!parent || index == null) return
    if (!node.ordered) return

    const stepChildren = node.children.map((item) =>
      jsxBlock("Step", [], item.children)
    )

    parent.children[index] = jsxBlock("Steps", [], stepChildren) as any
  })
}

// ─── Transform 4: ==text== → <Highlight> ─────────────────────────────────────

const HIGHLIGHT_RE = /==([^=]+)==/g

function transformHighlight(tree: Root) {
  visit(tree, "text", (node: Text, index, parent) => {
    if (!parent || index == null) return
    if (!HIGHLIGHT_RE.test(node.value)) return
    HIGHLIGHT_RE.lastIndex = 0

    const newChildren: any[] = []
    let last = 0
    let match: RegExpExecArray | null

    while ((match = HIGHLIGHT_RE.exec(node.value)) !== null) {
      if (match.index > last) {
        newChildren.push({ type: "text", value: node.value.slice(last, match.index) })
      }
      newChildren.push({
        type: "mdxJsxTextElement",
        name: "Highlight",
        attributes: [],
        children: [{ type: "text", value: match[1] }],
      })
      last = match.index + match[0].length
    }

    if (last < node.value.length) {
      newChildren.push({ type: "text", value: node.value.slice(last) })
    }

    parent.children.splice(index, 1, ...newChildren)
  })
}

// ─── Transform 5: ```mermaid → <Mermaid chart={…} /> ─────────────────────────

function estreLiteral(value: string) {
  return {
    type: "Program",
    sourceType: "module",
    body: [
      {
        type: "ExpressionStatement",
        expression: { type: "Literal", value, raw: JSON.stringify(value) },
      },
    ],
    comments: [],
  }
}

function transformMermaid(tree: Root) {
  visit(tree, "code", (node: Code, index, parent) => {
    if (!parent || index == null) return
    if (node.lang !== "mermaid") return

    parent.children[index] = jsxBlock(
      "Mermaid",
      [exprAttr("chart", JSON.stringify(node.value), estreLiteral(node.value))],
      []
    ) as any
  })
}

// ─── Plugin ───────────────────────────────────────────────────────────────────

const remarkMdxUi: Plugin<[RemarkMdxUiOptions?], Root> = (options = {}) => {
  const {
    callout   = true,
    table     = true,
    steps     = false,
    highlight = false,
    mermaid   = true,
  } = options

  return (tree) => {
    if (mermaid)   transformMermaid(tree)
    if (callout)   transformCallouts(tree)
    if (table)     transformTables(tree)
    if (steps)     transformSteps(tree)
    if (highlight) transformHighlight(tree)
  }
}

export default remarkMdxUi

// ─── String pre-processor (run before MDX compiler) ──────────────────────────
export { preprocessMarkdown } from "./preprocess"

// ─── LLM response content extractor ──────────────────────────────────────────
export { extractContent } from "./extract"
