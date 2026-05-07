"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  title?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  className,
  title,
  showLineNumbers = false,
  children,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)
  const preRef = React.useRef<HTMLPreElement>(null)

  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? ""
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // clipboard not available
    }
  }

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border bg-muted">
      <div className="flex items-center justify-between border-b border-border bg-muted/80 px-4 py-2 min-h-[36px]">
        <span className="text-sm font-medium text-foreground">{title}</span>
        <button
          onClick={handleCopy}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors select-none"
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? "✓ Copied" : "Copy"}
        </button>
      </div>
      <pre
        ref={preRef}
        className={cn(
          "overflow-x-auto p-4",
          showLineNumbers && "[counter-reset:line]",
          className
        )}
        {...props}
      >
        <code className="text-sm text-muted-foreground">{children}</code>
      </pre>
    </div>
  )
}
