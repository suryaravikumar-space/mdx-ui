import * as React from "react"
import { cn } from "@/lib/utils"

export interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  cite?: string
}

export const Blockquote = React.forwardRef<HTMLQuoteElement, BlockquoteProps>(
  ({ children, className, cite, ...props }, ref) => (
    <blockquote
      ref={ref}
      className={cn(
        "border-l-4 border-primary pl-4 py-2 my-4 italic text-foreground bg-primary/5",
        className
      )}
      {...props}
    >
      {children}
      {cite && (
        <footer className="text-sm text-muted-foreground mt-2 not-italic">
          — {cite}
        </footer>
      )}
    </blockquote>
  )
)
Blockquote.displayName = "Blockquote"
