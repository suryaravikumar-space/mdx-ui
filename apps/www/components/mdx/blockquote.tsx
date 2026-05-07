import * as React from "react"
import { cn } from "@/lib/utils"

export interface BlockquoteProps {
  children: React.ReactNode
  className?: string
  cite?: string
}

export function Blockquote({ children, className, cite }: BlockquoteProps) {
  return (
    <blockquote
      className={cn(
        "border-l-4 border-primary pl-4 py-2 my-4 italic text-foreground bg-primary/5",
        className
      )}
    >
      {children}
      {cite && (
        <footer className="text-sm text-muted-foreground mt-2 not-italic">
          — {cite}
        </footer>
      )}
    </blockquote>
  )
}
