import * as React from "react";
import { cn } from "@/lib/utils";
import { focusRing, popoverSurface } from "@/lib/primitives";

export interface AnnotationProps {
  /** The explanation text shown in the popover */
  note: string;
  /** The annotated inline text */
  children: React.ReactNode;
  className?: string;
}

/**
 * Annotation — inline text with a click-to-reveal explanation popover.
 *
 * Renders the children with a dotted underline; clicking opens a tooltip
 * above the text. Pressing Escape or clicking outside dismisses it.
 *
 * @example
 * Look at this <Annotation note="Quadratic: for each element we scan all others">
 *   O(n²)
 * </Annotation> complexity.
 */
export function Annotation({ note, children, className }: AnnotationProps) {
  const [open, setOpen] = React.useState(false);
  const id = React.useId();
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  return (
    <span ref={ref} className={cn("relative inline-block", className)}>
      <button
        type="button"
        aria-expanded={open}
        aria-describedby={open ? id : undefined}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline cursor-pointer",
          "underline decoration-dotted underline-offset-4 decoration-foreground/60",
          "hover:decoration-foreground",
          "focus-visible:rounded-sm",
          focusRing,
        )}
      >
        {children}
      </button>

      {open && (
        <span
          id={id}
          role="tooltip"
          className={cn(
            "absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2",
            "w-64 px-3 py-2 text-sm",
            popoverSurface,
          )}
        >
          {note}
          {/* down-pointing CSS arrow */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-border"
            style={{ marginTop: "-1px" }}
          />
        </span>
      )}
    </span>
  );
}
Annotation.displayName = "Annotation";
