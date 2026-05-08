import * as React from "react"
import { cn } from "@/lib/utils"

type DiffLineType = "add" | "remove" | "context"

interface DiffLine {
  type: DiffLineType
  content: string
}

function parseDiff(raw: string): DiffLine[] {
  return raw
    .split("\n")
    .map((line): DiffLine => {
      if (line.startsWith("+")) return { type: "add",    content: line.slice(1) }
      if (line.startsWith("-")) return { type: "remove", content: line.slice(1) }
      return { type: "context", content: line.startsWith(" ") ? line.slice(1) : line }
    })
}

export interface DiffBlockProps extends React.HTMLAttributes<HTMLElement> {
  title?: string
}

export const DiffBlock = React.forwardRef<HTMLElement, DiffBlockProps>(
  ({ children, title, className, ...props }, ref) => {
    const raw = typeof children === "string" ? children.trim() : ""
    const lines = parseDiff(raw)

    return (
      <figure
        ref={ref}
        className={cn("my-6 overflow-hidden rounded-lg border border-border bg-muted", className)}
        data-diff-block
        {...props}
      >
        {title && (
          <div className="flex items-center border-b border-border bg-muted/80 px-4 py-2 min-h-[36px]">
            <span className="text-sm font-medium text-foreground">{title}</span>
          </div>
        )}
        <pre className="overflow-x-auto p-4 text-sm font-mono leading-6">
          {lines.map((line, i) => (
            <div
              key={i}
              className={cn(
                "-mx-4 px-4",
                line.type === "add"    && "bg-green-500/15 text-green-700 dark:text-green-400",
                line.type === "remove" && "bg-red-500/15 text-red-700 dark:text-red-400",
              )}
            >
              <span className="mr-3 select-none text-xs opacity-50 font-mono">
                {line.type === "add" ? "+" : line.type === "remove" ? "-" : " "}
              </span>
              {line.content}
            </div>
          ))}
        </pre>
      </figure>
    )
  }
)
DiffBlock.displayName = "DiffBlock"
