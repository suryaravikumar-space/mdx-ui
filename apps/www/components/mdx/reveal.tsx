import * as React from "react"
import { cn } from "@/lib/utils"
import { focusRingInset, transitions } from "@/lib/primitives"
import { Collapse } from "@/lib/motion"

export interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Label text shown on the toggle button */
  label?: string
  /** Start in the open state */
  defaultOpen?: boolean
}

/**
 * Reveal — animated click-to-reveal panel for answers, hints, and spoilers.
 *
 * Unlike the native <details>-based Spoiler, Reveal uses the Collapse
 * primitive so the open/close transition is smooth.
 *
 * @example
 * <Reveal label="Show solution">
 *   The answer is to use a hash map for O(1) lookups.
 * </Reveal>
 */
export const Reveal = React.forwardRef<HTMLDivElement, RevealProps>(
  ({ label = "Show answer", defaultOpen = false, children, className, ...props }, ref) => {
    const [open, setOpen] = React.useState(defaultOpen)

    return (
      <div
        ref={ref}
        className={cn("my-4 overflow-hidden rounded-lg border border-border bg-card", className)}
        {...props}
      >
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          aria-expanded={open}
          className={cn(
            "flex w-full items-center justify-between px-4 py-3",
            "text-sm font-medium text-foreground",
            transitions.colors,
            "hover:bg-muted/50",
            focusRingInset
          )}
        >
          <span>{label}</span>
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
            className={cn(
              "shrink-0 text-muted-foreground",
              transitions.transform,
              open && "rotate-180"
            )}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <Collapse open={open}>
          <div className="border-t border-border px-4 py-3 text-sm text-muted-foreground">
            {children}
          </div>
        </Collapse>
      </div>
    )
  }
)
Reveal.displayName = "Reveal"
