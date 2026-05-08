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

interface MermaidProps {
  children: string
  className?: string
}

export function Mermaid({ children, className }: MermaidProps) {
  const ref = React.useRef<HTMLDivElement>(null)
  const [svg, setSvg] = React.useState<string>("")
  const [error, setError] = React.useState<string>("")
  const id = React.useId().replace(/:/g, "")
  const isDark = useDarkMode()

  React.useEffect(() => {
    let cancelled = false
    const diagram = children.trim()
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
  }, [children, id, isDark])

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
