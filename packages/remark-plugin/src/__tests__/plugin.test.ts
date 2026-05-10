import { describe, it, expect } from "vitest"
import type { Root, Blockquote, Table, List, Text, Paragraph } from "mdast"
import remarkMdxUi from "../index"

// ─── AST helpers ────────────────────────────────────────────────────────────

function makeRoot(...children: Root["children"]): Root {
  return { type: "root", children }
}

function paragraph(...children: Paragraph["children"]): Paragraph {
  return { type: "paragraph", children }
}

function text(value: string): Text {
  return { type: "text", value }
}

function strong(value: string) {
  return { type: "strong", children: [text(value)] }
}

function blockquote(...children: Blockquote["children"]): Blockquote {
  return { type: "blockquote", children }
}

function tableNode(rows: string[][]): Table {
  return {
    type: "table",
    align: rows[0].map(() => null),
    children: rows.map((cells) => ({
      type: "tableRow",
      children: cells.map((cell) => ({
        type: "tableCell",
        children: [text(cell)],
      })),
    })),
  }
}

function orderedList(...items: string[]): List {
  return {
    type: "list",
    ordered: true,
    spread: false,
    children: items.map((item) => ({
      type: "listItem",
      spread: false,
      children: [paragraph(text(item))],
    })),
  }
}

function codeNode(lang: string, value: string) {
  return { type: "code" as const, lang, value, meta: null }
}

/** Run the plugin on a root node and return the mutated tree */
function run(tree: Root, options = {}) {
  remarkMdxUi(options)!(tree, undefined as any, () => {})
  return tree
}

// ─── Transform 1: Callout ───────────────────────────────────────────────────

describe("remarkMdxUi — callout transform", () => {
  it("converts a plain blockquote to <Callout>", () => {
    const tree = makeRoot(blockquote(paragraph(text("A plain quote"))))
    run(tree)
    expect(tree.children[0]).toMatchObject({ type: "mdxJsxFlowElement", name: "Callout" })
  })

  it("sets type=info for [!NOTE] GFM alert", () => {
    const tree = makeRoot(
      blockquote(paragraph(text("[!NOTE]\nThis is a note")))
    )
    run(tree)
    const node = tree.children[0] as any
    expect(node.name).toBe("Callout")
    expect(node.attributes).toContainEqual({ type: "mdxJsxAttribute", name: "type", value: "info" })
  })

  it("sets type=warning for [!WARNING] GFM alert", () => {
    const tree = makeRoot(
      blockquote(paragraph(text("[!WARNING]\nBe careful")))
    )
    run(tree)
    const node = tree.children[0] as any
    expect(node.attributes).toContainEqual({ type: "mdxJsxAttribute", name: "type", value: "warning" })
  })

  it("sets type=success for [!TIP] GFM alert", () => {
    const tree = makeRoot(
      blockquote(paragraph(text("[!TIP]\nPro tip here")))
    )
    run(tree)
    const node = tree.children[0] as any
    expect(node.attributes).toContainEqual({ type: "mdxJsxAttribute", name: "type", value: "success" })
  })

  it("sets type=info for legacy **Note:** syntax", () => {
    const tree = makeRoot(
      blockquote(paragraph(strong("Note:"), text(" This is important")))
    )
    run(tree)
    const node = tree.children[0] as any
    expect(node.name).toBe("Callout")
    expect(node.attributes).toContainEqual({ type: "mdxJsxAttribute", name: "type", value: "info" })
  })

  it("sets type=warning for legacy **Warning:** syntax", () => {
    const tree = makeRoot(
      blockquote(paragraph(strong("Warning:"), text(" Watch out")))
    )
    run(tree)
    const node = tree.children[0] as any
    expect(node.attributes).toContainEqual({ type: "mdxJsxAttribute", name: "type", value: "warning" })
  })

  it("sets type=error for legacy **Danger:** syntax", () => {
    const tree = makeRoot(
      blockquote(paragraph(strong("Danger:"), text(" Destructive action")))
    )
    run(tree)
    const node = tree.children[0] as any
    expect(node.attributes).toContainEqual({ type: "mdxJsxAttribute", name: "type", value: "error" })
  })

  it("does not transform blockquotes when callout=false", () => {
    const tree = makeRoot(blockquote(paragraph(text("Quote"))))
    run(tree, { callout: false })
    expect(tree.children[0].type).toBe("blockquote")
  })
})

// ─── Transform 2: DataTable ─────────────────────────────────────────────────

describe("remarkMdxUi — table transform", () => {
  it("converts a markdown table to <DataTable>", () => {
    const tree = makeRoot(
      tableNode([
        ["Name", "Age"],
        ["Alice", "30"],
        ["Bob", "25"],
      ])
    )
    run(tree)
    expect(tree.children[0]).toMatchObject({ type: "mdxJsxFlowElement", name: "DataTable" })
  })

  it("sets headers attribute from first row", () => {
    const tree = makeRoot(
      tableNode([
        ["Name", "Role"],
        ["Alice", "Admin"],
      ])
    )
    run(tree)
    const node = tree.children[0] as any
    const headersAttr = node.attributes.find((a: any) => a.name === "headers")
    expect(headersAttr.value.value).toBe('["Name","Role"]')
  })

  it("sets rows attribute from body rows", () => {
    const tree = makeRoot(
      tableNode([
        ["Name", "Role"],
        ["Alice", "Admin"],
        ["Bob", "Editor"],
      ])
    )
    run(tree)
    const node = tree.children[0] as any
    const rowsAttr = node.attributes.find((a: any) => a.name === "rows")
    expect(rowsAttr.value.value).toBe('[["Alice","Admin"],["Bob","Editor"]]')
  })

  it("does not transform tables when table=false", () => {
    const tree = makeRoot(tableNode([["A", "B"], ["1", "2"]]))
    run(tree, { table: false })
    expect(tree.children[0].type).toBe("table")
  })
})

// ─── Transform 3: Steps ──────────────────────────────────────────────────────

describe("remarkMdxUi — steps transform", () => {
  it("converts an ordered list to <Steps><Step> when steps=true", () => {
    const tree = makeRoot(orderedList("First", "Second", "Third"))
    run(tree, { steps: true })
    const stepsNode = tree.children[0] as any
    expect(stepsNode.name).toBe("Steps")
    expect(stepsNode.children[0].name).toBe("Step")
    expect(stepsNode.children).toHaveLength(3)
  })

  it("does not transform ordered lists when steps=false (default)", () => {
    const tree = makeRoot(orderedList("One", "Two"))
    run(tree)
    expect(tree.children[0].type).toBe("list")
  })

  it("does not transform unordered lists", () => {
    const unordered: List = {
      type: "list",
      ordered: false,
      spread: false,
      children: [
        { type: "listItem", spread: false, children: [paragraph(text("item"))] },
      ],
    }
    const tree = makeRoot(unordered)
    run(tree, { steps: true })
    expect(tree.children[0].type).toBe("list")
  })
})

// ─── Transform 4: Mermaid ────────────────────────────────────────────────────

describe("remarkMdxUi — mermaid transform", () => {
  it("converts a mermaid code block to <Mermaid>", () => {
    const diagram = "graph TD\n  A --> B"
    const tree = makeRoot(codeNode("mermaid", diagram))
    run(tree)
    const node = tree.children[0] as any
    expect(node.name).toBe("Mermaid")
  })

  it("sets chart attribute with the diagram source", () => {
    const diagram = "graph TD\n  A --> B"
    const tree = makeRoot(codeNode("mermaid", diagram))
    run(tree)
    const node = tree.children[0] as any
    const chartAttr = node.attributes.find((a: any) => a.name === "chart")
    expect(chartAttr.value.value).toBe(JSON.stringify(diagram))
  })

  it("does not transform non-mermaid code blocks", () => {
    const tree = makeRoot(codeNode("typescript", "const x = 1"))
    run(tree)
    expect(tree.children[0].type).toBe("code")
  })

  it("does not transform mermaid blocks when mermaid=false", () => {
    const tree = makeRoot(codeNode("mermaid", "graph TD"))
    run(tree, { mermaid: false })
    expect(tree.children[0].type).toBe("code")
  })
})

// ─── Transform 5: Highlight ──────────────────────────────────────────────────

describe("remarkMdxUi — highlight transform", () => {
  it("converts ==text== to <Highlight> when highlight=true", () => {
    const tree = makeRoot(paragraph(text("This is ==important== text")))
    run(tree, { highlight: true })
    const para = tree.children[0] as Paragraph
    const highlightNode = para.children.find((c: any) => c.type === "mdxJsxTextElement") as any
    expect(highlightNode).toBeDefined()
    expect(highlightNode.name).toBe("Highlight")
    expect(highlightNode.children[0].value).toBe("important")
  })

  it("preserves surrounding text around highlighted span", () => {
    const tree = makeRoot(paragraph(text("Before ==mark== after")))
    run(tree, { highlight: true })
    const para = tree.children[0] as Paragraph
    const texts = para.children.filter((c) => c.type === "text") as Text[]
    expect(texts[0].value).toBe("Before ")
    expect(texts[1].value).toBe(" after")
  })

  it("does not transform ==text== when highlight=false (default)", () => {
    const tree = makeRoot(paragraph(text("This is ==important== text")))
    run(tree)
    const para = tree.children[0] as Paragraph
    expect(para.children[0]).toMatchObject({ type: "text", value: "This is ==important== text" })
  })
})

// ─── Option defaults ─────────────────────────────────────────────────────────

describe("remarkMdxUi — default options", () => {
  it("callout, table, mermaid are on by default", () => {
    const tree = makeRoot(
      blockquote(paragraph(text("Note"))),
      tableNode([["A"], ["1"]]),
      codeNode("mermaid", "graph TD")
    )
    run(tree) // no options
    expect((tree.children[0] as any).name).toBe("Callout")
    expect((tree.children[1] as any).name).toBe("DataTable")
    expect((tree.children[2] as any).name).toBe("Mermaid")
  })

  it("steps and highlight are off by default", () => {
    const tree = makeRoot(
      orderedList("A", "B"),
      paragraph(text("==hi=="))
    )
    run(tree)
    expect(tree.children[0].type).toBe("list")
    expect((tree.children[1] as Paragraph).children[0]).toMatchObject({ type: "text", value: "==hi==" })
  })
})
