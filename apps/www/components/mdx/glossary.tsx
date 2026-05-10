import * as React from "react"
import { cn } from "@/lib/utils"
import { focusRing, popoverSurface } from "@/lib/primitives"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface GlossaryEntry {
  /** Short display label for the term (shown as popover heading) */
  label: string
  /** Full definition rendered in the popover */
  definition: string
}

interface GlossaryContextValue {
  terms: Record<string, GlossaryEntry>
}

// ─── Context ─────────────────────────────────────────────────────────────────

const GlossaryContext = React.createContext<GlossaryContextValue>({ terms: {} })

// ─── GlossaryProvider ────────────────────────────────────────────────────────

export interface GlossaryProviderProps {
  /**
   * Map of term IDs to definitions.
   * @example
   * terms={{ bfs: { label: "BFS", definition: "Breadth-First Search..." } }}
   */
  terms: Record<string, GlossaryEntry>
  children: React.ReactNode
}

/**
 * GlossaryProvider — wraps content and makes term definitions available
 * to all <Term> descendants.
 *
 * @example
 * <GlossaryProvider terms={{ bfs: { label: "BFS", definition: "..." } }}>
 *   <Term id="bfs" /> explores nodes level by level.
 * </GlossaryProvider>
 */
export function GlossaryProvider({ terms, children }: GlossaryProviderProps) {
  return (
    <GlossaryContext.Provider value={{ terms }}>
      {children}
    </GlossaryContext.Provider>
  )
}

// ─── Term ─────────────────────────────────────────────────────────────────────

export interface TermProps {
  /** Must match a key in the nearest GlossaryProvider's terms map */
  id: string
  /** Override display text; defaults to entry.label */
  children?: React.ReactNode
  className?: string
}

/**
 * Term — an inline word/phrase linked to a glossary definition.
 *
 * Renders with a subtle dotted underline. Clicking opens a popover showing
 * the term label and its full definition. Pressing Escape or clicking outside
 * closes the popover. Degrades gracefully when used outside a GlossaryProvider.
 *
 * @example
 * <Term id="bfs" /> is used for level-order traversal.
 */
export function Term({ id, children, className }: TermProps) {
  const { terms } = React.useContext(GlossaryContext)
  const entry = terms[id]
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLSpanElement>(null)
  const popoverId = React.useId()

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false) }
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("mousedown", onDown)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("mousedown", onDown)
    }
  }, [open])

  // Graceful degradation when term id isn't in the provider
  if (!entry) return <>{children ?? id}</>

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-describedby={open ? popoverId : undefined}
        onClick={() => setOpen(v => !v)}
        className={cn(
          "inline cursor-pointer font-medium",
          "border-b border-dotted border-foreground/50",
          "hover:border-foreground",
          "focus-visible:rounded-sm",
          focusRing
        )}
      >
        {children ?? entry.label}
      </button>

      {open && (
        <span
          id={popoverId}
          role="tooltip"
          className={cn(
            "absolute bottom-full left-0 z-50 mb-2",
            "w-72 px-3 py-2.5 text-sm",
            popoverSurface
          )}
        >
          <span className="mb-1 block font-semibold text-foreground">
            {entry.label}
          </span>
          <span className="text-popover-foreground/90">{entry.definition}</span>
          {/* down-pointing arrow */}
          <span
            aria-hidden="true"
            className="absolute left-4 top-full border-4 border-transparent border-t-border"
            style={{ marginTop: "-1px" }}
          />
        </span>
      )}
    </span>
  )
}
Term.displayName = "Term"
