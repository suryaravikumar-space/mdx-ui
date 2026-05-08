import * as React from "react"
import { cn } from "@/lib/utils"

export interface SpoilerProps extends React.HTMLAttributes<HTMLDetailsElement> {
  /** Text shown in the summary / toggle button */
  summary: string
  /** Start open */
  open?: boolean
}

export const Spoiler = React.forwardRef<HTMLDetailsElement, SpoilerProps>(
  ({ summary, children, className, open, ...props }, ref) => (
    <details
      ref={ref}
      open={open}
      className={cn("group my-4 rounded-lg border border-border bg-card", className)}
      {...props}
    >
      <summary className="flex cursor-pointer select-none list-none items-center justify-between px-4 py-3 text-sm font-medium hover:bg-muted/50 rounded-lg [&::-webkit-details-marker]:hidden">
        {summary}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="shrink-0 transition-transform duration-200 group-open:rotate-180"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </summary>
      <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
        {children}
      </div>
    </details>
  )
)
Spoiler.displayName = "Spoiler"
