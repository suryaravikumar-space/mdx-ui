"use client"

import * as React from "react"
import katex from "katex"
import { cn } from "./lib/utils"

interface MathProps {
  children: string
  block?: boolean
  className?: string
}

export function Math({ children, block = false, className }: MathProps) {
  const html = React.useMemo(() => {
    try {
      return katex.renderToString(children, {
        displayMode: block,
        throwOnError: false,
        trust: false,
        // chemistry support via mhchem macro pattern
        macros: {
          "\\R": "\\mathbb{R}",
          "\\N": "\\mathbb{N}",
          "\\Z": "\\mathbb{Z}",
          "\\C": "\\mathbb{C}",
        },
      })
    } catch {
      return `<span style="color:red">Invalid math: ${children}</span>`
    }
  }, [children, block])

  if (block) {
    return (
      <div
        className={cn("my-4 overflow-x-auto py-2 text-center", className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    )
  }

  return (
    <span
      className={cn("inline-block align-middle", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

export function BlockMath({ children, className }: { children: string; className?: string }) {
  return <Math block className={className}>{children}</Math>
}

export function InlineMath({ children, className }: { children: string; className?: string }) {
  return <Math className={className}>{children}</Math>
}
