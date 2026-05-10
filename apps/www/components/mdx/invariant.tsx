import * as React from "react";
import { cn } from "@/lib/utils";

export interface InvariantProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional complexity annotation, e.g. "O(log n)" */
  complexity?: string;
  children: React.ReactNode;
}

/**
 * Invariant — a formal invariant statement.
 *
 * Highlights a condition that must always hold, with an optional
 * complexity annotation badge. Use for correctness claims in algorithm
 * and data structure documentation.
 *
 * @example
 * <Invariant complexity="O(log n)">
 *   An AVL tree remains height-balanced after every insertion and deletion.
 * </Invariant>
 */
export const Invariant = React.forwardRef<HTMLDivElement, InvariantProps>(
  ({ complexity, children, className, ...props }, ref) => (
    <div
      ref={ref}
      data-invariant
      className={cn(
        "my-6 flex gap-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3",
        className,
      )}
      {...props}
    >
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 shrink-0 text-primary"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
      <div className="flex flex-1 flex-wrap items-start justify-between gap-2">
        <p className="text-sm text-foreground">{children}</p>
        {complexity && (
          <span className="shrink-0 rounded border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-xs text-primary">
            {complexity}
          </span>
        )}
      </div>
    </div>
  ),
);
Invariant.displayName = "Invariant";
