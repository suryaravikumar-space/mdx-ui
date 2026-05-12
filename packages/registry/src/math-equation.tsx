import * as React from "react";
import { cn } from "@/lib/utils";

// ── Equation ──────────────────────────────────────────────────────────────────
interface EquationProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional equation number/label displayed on the right — e.g. "1" or "E1" */
  label?: string;
  /** If true, renders with no outer box — useful inside Solution blocks */
  inline?: boolean;
  children: React.ReactNode;
}

/**
 * Equation — a centered display-equation block.
 *
 * Compose with math primitives (Frac, Pow, Sqrt, Greek, etc.) or plain text.
 * Pass `label` to number the equation for cross-referencing.
 *
 * @example
 * <Equation label="1">
 *   E = mc<Pow exp="2" />
 * </Equation>
 *
 * @example
 * <Equation>
 *   F(<Greek letter="omega" />) = ∫ f(x) e<Pow exp={<>-i<Greek letter="omega" />x</>} /> dx
 * </Equation>
 */
export function Equation({
  label,
  inline = false,
  children,
  className,
  ...props
}: EquationProps) {
  if (inline) {
    return (
      <span
        role="math"
        className={cn("mx-1 inline-flex items-center font-serif", className)}
        {...(props as React.HTMLAttributes<HTMLSpanElement>)}
      >
        {children}
      </span>
    );
  }

  return (
    <div
      role="math"
      className={cn(
        "my-6 flex items-center gap-4 rounded-lg border bg-muted/20 px-6 py-5",
        className,
      )}
      {...props}
    >
      <span className="flex-1 text-center font-serif text-base leading-loose tracking-wide">
        {children}
      </span>
      {label && (
        <span className="shrink-0 font-mono text-sm text-muted-foreground">
          ({label})
        </span>
      )}
    </div>
  );
}
Equation.displayName = "Equation";

// ── Equation System ───────────────────────────────────────────────────────────
/**
 * EqSystem — display a system of simultaneous equations with a left brace.
 *
 * Each direct child is treated as one equation in the system.
 *
 * @example
 * <EqSystem>
 *   <div>x + y = 5</div>
 *   <div>2x − y = 1</div>
 * </EqSystem>
 */
export function EqSystem({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("my-6 inline-flex items-stretch gap-2", className)}
      {...props}
    >
      {/* Left brace */}
      <svg
        viewBox="0 0 10 60"
        className="w-3 shrink-0"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M8 2 Q2 2 2 8 L2 24 Q2 30 5 30 Q2 30 2 36 L2 52 Q2 58 8 58"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      <div className="flex flex-col justify-center gap-1.5 font-serif text-base">
        {children}
      </div>
    </div>
  );
}
EqSystem.displayName = "EqSystem";
// Relation symbols (Approx, Neq, Leq, Geq, Arrow, Implies, Iff, etc.)
// live in math-primitives — import them from there.
