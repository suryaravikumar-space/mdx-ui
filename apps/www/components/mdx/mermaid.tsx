"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface MermaidProps {
  children: string
  className?: string
}

export function Mermaid({ children, className }: MermaidProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [svg, setSvg] = React.useState<string>("")
  const [error, setError] = React.useState<string>("")
  const id = React.useId().replace(/:/g, "")

  React.useEffect(() => {
    let cancelled = false
    async function render() {
      try {
        const mermaid = (await import("mermaid")).default
        mermaid.initialize({ startOnLoad: false, theme: "neutral", securityLevel: "strict" })
        const { svg } = await mermaid.render(`mermaid-${id}`, children.trim())
        if (!cancelled) setSvg(svg)
      } catch (e) {
        if (!cancelled) setError(e instanceof Error ? e.message : "Render failed")
      }
    }
    render()
    return () => { cancelled = true }
  }, [children, id])

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
    <div
      ref={ref}
      className={cn("my-4 overflow-x-auto rounded-lg border bg-background p-4", className)}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}
