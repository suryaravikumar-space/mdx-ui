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

    // Watch Tailwind dark class on <html>
    const observer = new MutationObserver(() => setIsDark(check()))
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    // Watch system preference
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

// ─── Component ────────────────────────────────────────────────────────────────

interface MermaidProps {
  /** Diagram source passed as a string prop (used by the remark plugin). */
  chart?: string
  /** Diagram source passed as children (manual MDX usage). */
  children?: string
  className?: string
}

export function Mermaid({ chart, children, className }: MermaidProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [svg, setSvg] = React.useState<string>("")
  const [error, setError] = React.useState<string>("")
  const id = React.useId().replace(/:/g, "")
  const isDark = useDarkMode()

  const diagram = (chart ?? children ?? "").trim()
  const diagramType = detectDiagramType(diagram)
  const label = TYPE_LABELS[diagramType]

  React.useEffect(() => {
    if (!diagram) return
    let cancelled = false
    const cacheKey = `${diagram}:${isDark}`

    // Return cached SVG immediately — avoids flicker on re-mount / theme toggle
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

export const MermaidFlowchart    = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidSequence     = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidClass        = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidState        = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidER           = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidGantt        = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidPie          = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidGitGraph     = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidMindmap      = (props: DiagramProps) => <Mermaid {...props} />
export const MermaidTimeline     = (props: DiagramProps) => <Mermaid {...props} />
