"use client"

import * as React from "react"
import { cn } from "./lib/utils"

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  title?: string
  lang?: string
  showLineNumbers?: boolean
}

export function CodeBlock({
  className,
  title,
  lang,
  showLineNumbers = false,
  children,
  ...props
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  const text = React.useMemo(() => {
    if (typeof children === "string") return children
    if (React.isValidElement(children)) {
      const inner = (children as React.ReactElement<{ children?: React.ReactNode }>).props.children
      return typeof inner === "string" ? inner : ""
    }
    return ""
  }, [children])

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [text])

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-gray-700 bg-gray-950">
      <div className="flex items-center justify-between border-b border-gray-700 bg-gray-900 px-4 py-2">
        <span className="text-sm font-medium text-gray-400">
          {title ?? lang ?? "code"}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded px-2 py-1 text-xs text-gray-400 transition hover:bg-gray-700 hover:text-white"
          aria-label="Copy code"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre
        className={cn(
          "overflow-x-auto p-4",
          showLineNumbers && "[counter-reset:line]",
          className
        )}
        {...props}
      >
        <code className="text-sm text-gray-300">{children}</code>
      </pre>
    </div>
  )
}
