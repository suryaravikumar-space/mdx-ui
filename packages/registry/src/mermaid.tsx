"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// Module-level cache: key = `${diagram}:${isDark}` → rendered SVG string
const svgCache = new Map<string, string>()

function useDarkMode(): boolean {
  const [isDark, setIsDark] = React.useState(false)

  React.useEffect(() => {
    const check = () =>
      document.documentElement.classList.contains("dark") ||
      window.matchMedia("(prefers-color-scheme: dark)").matches

    setIsDark(check())

    const observer = new MutationObserver(() => setIsDark(check()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const onMqChange = () => setIsDark(check())
    mq.addEventListener("change", onMqChange)

    return () => {
      observer.disconnect()
      mq.removeEventListener("change", onMqChange)
    }
  }, [])

  return isDark
}

// ─── Diagram-type detection ───────────────────────────────────────────────────

export type MermaidDiagramType =
  | "flowchart"
  | "sequenceDiagram"
  | "classDiagram"
  | "stateDiagram"
  | "erDiagram"
  | "gantt"
  | "pie"
  | "gitGraph"
  | "mindmap"
  | "timeline"
  | "unknown"

const TYPE_LABELS: Record<MermaidDiagramType, string> = {
  flowchart:       "Flowchart",
  sequenceDiagram: "Sequence Diagram",
  classDiagram:    "Class Diagram",
  stateDiagram:    "State Diagram",
  erDiagram:       "ER Diagram",
  gantt:           "Gantt Chart",
  pie:             "Pie Chart",
  gitGraph:        "Git Graph",
  mindmap:         "Mind Map",
  timeline:        "Timeline",
  unknown:         "Diagram",
}

export function detectDiagramType(diagram: string): MermaidDiagramType {
  const first = diagram.trim().split("\n")[0].toLowerCase().trim()
  if (first.startsWith("flowchart") || first === "graph" || first.startsWith("graph ")) return "flowchart"
  if (first.startsWith("sequencediagram")) return "sequenceDiagram"
  if (first.startsWith("classdiagram"))    return "classDiagram"
  if (first.startsWith("statediagram"))    return "stateDiagram"
  if (first.startsWith("erdiagram"))       return "erDiagram"
  if (first.startsWith("gantt"))           return "gantt"
  if (first.startsWith("pie"))             return "pie"
  if (first.startsWith("gitgraph"))        return "gitGraph"
  if (first.startsWith("mindmap"))         return "mindmap"
  if (first.startsWith("timeline"))        return "timeline"
  return "unknown"
}

// ─── Base component ───────────────────────────────────────────────────────────

interface MermaidProps {
  /** Diagram source as a prop (used by the remark plugin and data-structure components). */
  chart?: string
  /** Diagram source as children (manual MDX usage). */
  children?: string
  /** Override the auto-detected type label shown in the header. */
  label?: string
  className?: string
}

export function Mermaid({ chart, children, label: labelOverride, className }: MermaidProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [svg, setSvg] = React.useState<string>("")
  const [error, setError] = React.useState<string>("")
  const id = React.useId().replace(/:/g, "")
  const isDark = useDarkMode()

  const diagram = (chart ?? children ?? "").trim()
  const diagramType = detectDiagramType(diagram)
  const label = labelOverride ?? TYPE_LABELS[diagramType]

  React.useEffect(() => {
    if (!diagram) return
    let cancelled = false
    const cacheKey = `${diagram}:${isDark}`

    if (svgCache.has(cacheKey)) {
      setSvg(svgCache.get(cacheKey)!)
      return
    }

    async function render() {
      try {
        const mermaid = (await import("mermaid")).default
        mermaid.initialize({
          startOnLoad: false,
          theme: isDark ? "dark" : "neutral",
          securityLevel: "strict",
        })
        const { svg: rendered } = await mermaid.render(`mermaid-${id}`, diagram)
        if (!cancelled) {
          svgCache.set(cacheKey, rendered)
          setSvg(rendered)
        }
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Render failed")
      }
    }

    render()
    return () => { cancelled = true }
  }, [diagram, id, isDark])

  if (error) {
    return (
      <div className="my-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
        Diagram error: {error}
      </div>
    )
  }

  if (!svg) {
    return (
      <div className={cn("my-4 flex h-32 items-center justify-center rounded-lg border bg-muted/30", className)}>
        <span className="text-sm text-muted-foreground">Rendering diagram…</span>
      </div>
    )
  }

  return (
    <div className={cn("my-4 overflow-hidden rounded-lg border bg-background", className)}>
      <div className="flex items-center border-b bg-muted/40 px-3 py-1.5">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      </div>
      <div
        ref={ref}
        className="overflow-x-auto p-4"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  )
}

// ─── Per-type convenience components ─────────────────────────────────────────

type DiagramProps = Omit<MermaidProps, "chart"> & { chart?: string }

export const MermaidFlowchart = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidSequence  = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidClass     = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidState     = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidER        = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidGantt     = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidPie       = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidGitGraph  = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidMindmap   = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidTimeline  = (props: DiagramProps) => <Mermaid {...props} />

// ─── Data-structure utilities ─────────────────────────────────────────────────

// ── BST ──────────────────────────────────────────────────────────────────────

interface BSTNode {
  value: number
  left?: BSTNode
  right?: BSTNode
}

function bstInsert(root: BSTNode | null, v: number): BSTNode {
  if (!root) return { value: v }
  if (v < root.value) return { ...root, left: bstInsert(root.left ?? null, v) }
  if (v > root.value) return { ...root, right: bstInsert(root.right ?? null, v) }
  return root // duplicates ignored
}

function buildBST(values: number[]): BSTNode | null {
  return values.reduce<BSTNode | null>((r, v) => bstInsert(r, v), null)
}

function bstToMermaid(root: BSTNode | null): string {
  if (!root) return "flowchart TD\n  empty([empty])"
  const nodeDefs: string[] = []
  const edgeDefs: string[] = []
  let c = 0

  function traverse(node: BSTNode): string {
    const id = `N${c++}`
    nodeDefs.push(`  ${id}((${node.value}))`)
    if (node.left) {
      const lid = traverse(node.left)
      edgeDefs.push(`  ${id} --> ${lid}`)
    }
    if (node.right) {
      const rid = traverse(node.right)
      edgeDefs.push(`  ${id} --> ${rid}`)
    }
    return id
  }

  traverse(root)
  return ["flowchart TD", ...nodeDefs, ...edgeDefs].join("\n")
}

// ── General tree ──────────────────────────────────────────────────────────────

export interface TreeNode {
  label: string
  children?: TreeNode[]
}

function treeToMermaid(root: TreeNode, direction: "TD" | "LR"): string {
  const nodeDefs: string[] = []
  const edgeDefs: string[] = []
  let c = 0

  function traverse(node: TreeNode): string {
    const id = `T${c++}`
    nodeDefs.push(`  ${id}["${node.label.replace(/"/g, "'")}"]`)
    for (const child of node.children ?? []) {
      const cid = traverse(child)
      edgeDefs.push(`  ${id} --> ${cid}`)
    }
    return id
  }

  traverse(root)
  return [`flowchart ${direction}`, ...nodeDefs, ...edgeDefs].join("\n")
}

// ── BFS / DFS ─────────────────────────────────────────────────────────────────

type AdjMap = Map<string, string[]>

function buildAdj(nodes: string[], edges: [string, string][], directed: boolean): AdjMap {
  const adj: AdjMap = new Map(nodes.map((n) => [n, []]))
  for (const [a, b] of edges) {
    if (!adj.has(a)) adj.set(a, [])
    if (!adj.has(b)) adj.set(b, [])
    adj.get(a)!.push(b)
    if (!directed) adj.get(b)!.push(a)
  }
  return adj
}

function computeBFS(nodes: string[], edges: [string, string][], start: string, directed: boolean): string[] {
  const adj = buildAdj(nodes, edges, directed)
  const order: string[] = []
  const queue = [start]
  const seen = new Set([start])
  while (queue.length > 0) {
    const n = queue.shift()!
    order.push(n)
    for (const nb of adj.get(n) ?? []) {
      if (!seen.has(nb)) { seen.add(nb); queue.push(nb) }
    }
  }
  return order
}

function computeDFS(nodes: string[], edges: [string, string][], start: string, directed: boolean): string[] {
  const adj = buildAdj(nodes, edges, directed)
  const order: string[] = []
  const seen = new Set<string>()
  function dfs(n: string) {
    seen.add(n)
    order.push(n)
    for (const nb of adj.get(n) ?? []) {
      if (!seen.has(nb)) dfs(nb)
    }
  }
  dfs(start)
  return order
}

// ① ② ③ … ⑳  — used to annotate visit order on nodes
const CIRCLED = ["①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩",
                 "⑪","⑫","⑬","⑭","⑮","⑯","⑰","⑱","⑲","⑳"]

function graphToMermaid(
  nodes: string[],
  edges: [string, string][],
  order: string[],
  directed: boolean,
): string {
  const orderMap = new Map(order.map((n, i) => [n, i + 1]))
  const sanitize = (n: string) => n.replace(/[^a-zA-Z0-9_]/g, "_")

  const nodeDefs = nodes.map((n) => {
    const idx = orderMap.get(n)
    const badge = idx != null ? (CIRCLED[idx - 1] ?? String(idx)) + " " : ""
    return `  ${sanitize(n)}["${badge}${n}"]`
  })

  const arrow = directed ? "-->" : "---"
  const seen = new Set<string>()
  const edgeDefs: string[] = []
  for (const [a, b] of edges) {
    const key = directed ? `${a}→${b}` : [a, b].sort().join("—")
    if (!seen.has(key)) {
      seen.add(key)
      edgeDefs.push(`  ${sanitize(a)} ${arrow} ${sanitize(b)}`)
    }
  }

  return ["flowchart TD", ...nodeDefs, ...edgeDefs].join("\n")
}

// ─── Data-structure components ────────────────────────────────────────────────

export interface MermaidBSTProps {
  /** Values to insert into the BST in the order given. */
  values: number[]
  className?: string
}

/**
 * Renders a Binary Search Tree from a list of values.
 * Values are inserted left-to-right; duplicates are ignored.
 *
 * @example
 * <MermaidBST values={[5, 3, 7, 1, 4, 6, 8]} />
 */
export function MermaidBST({ values, className }: MermaidBSTProps) {
  const chart = bstToMermaid(buildBST(values))
  return <Mermaid chart={chart} label="Binary Search Tree" className={className} />
}

export interface MermaidTreeProps {
  /** Nested tree structure to render. */
  data: TreeNode
  /** Layout direction. @default "TD" */
  direction?: "TD" | "LR"
  className?: string
}

/**
 * Renders a generic tree from a nested { label, children } structure.
 *
 * @example
 * <MermaidTree data={{ label: "root", children: [{ label: "A" }, { label: "B" }] }} />
 */
export function MermaidTree({ data, direction = "TD", className }: MermaidTreeProps) {
  const chart = treeToMermaid(data, direction)
  return <Mermaid chart={chart} label="Tree" className={className} />
}

export interface MermaidTraversalProps {
  /** All node names in the graph. */
  nodes: string[]
  /** Undirected or directed edges as [from, to] pairs. */
  edges: [string, string][]
  /** Starting node for the traversal. */
  start: string
  /** Treat edges as directed. @default false */
  directed?: boolean
  className?: string
}

/**
 * Renders a graph with BFS traversal order annotated on each node (① ② ③ …).
 *
 * @example
 * <MermaidBFS
 *   nodes={["A","B","C","D","E"]}
 *   edges={[["A","B"],["A","C"],["B","D"],["B","E"]]}
 *   start="A"
 * />
 */
export function MermaidBFS({ nodes, edges, start, directed = false, className }: MermaidTraversalProps) {
  const order = computeBFS(nodes, edges, start, directed)
  const chart = graphToMermaid(nodes, edges, order, directed)
  return <Mermaid chart={chart} label="BFS Traversal" className={className} />
}

/**
 * Renders a graph with DFS traversal order annotated on each node (① ② ③ …).
 *
 * @example
 * <MermaidDFS
 *   nodes={["A","B","C","D","E"]}
 *   edges={[["A","B"],["A","C"],["B","D"],["B","E"]]}
 *   start="A"
 * />
 */
export function MermaidDFS({ nodes, edges, start, directed = false, className }: MermaidTraversalProps) {
  const order = computeDFS(nodes, edges, start, directed)
  const chart = graphToMermaid(nodes, edges, order, directed)
  return <Mermaid chart={chart} label="DFS Traversal" className={className} />
}
