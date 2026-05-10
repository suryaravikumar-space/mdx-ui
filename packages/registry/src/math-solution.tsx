import * as React from "react";
import { cn } from "@/lib/utils";

// ── Solution ──────────────────────────────────────────────────────────────────
interface SolutionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Problem statement shown in the header — e.g. "Solve: 2x + 4 = 10" */
  title?: string;
  children: React.ReactNode;
}

/**
 * Solution — a step-by-step mathematical solution block.
 *
 * Place <SolutionStep> children inside. End with <SolutionAnswer> for the result.
 *
 * @example
 * <Solution title="Solve: 2x + 4 = 10">
 *   <SolutionStep reason="Given">2x + 4 = 10</SolutionStep>
 *   <SolutionStep reason="Subtract 4 from both sides">2x = 6</SolutionStep>
 *   <SolutionStep reason="Divide both sides by 2">x = 3</SolutionStep>
 *   <SolutionAnswer>x = 3</SolutionAnswer>
 * </Solution>
 */
export function Solution({
  title,
  children,
  className,
  ...props
}: SolutionProps) {
  return (
    <div
      className={cn("my-6 overflow-hidden rounded-lg border", className)}
      {...props}
    >
      {title && (
        <div className="border-b bg-muted/40 px-4 py-2.5 font-mono text-sm font-semibold">
          {title}
        </div>
      )}
      <div className="divide-y">{children}</div>
    </div>
  );
}
Solution.displayName = "Solution";

// ── SolutionStep ──────────────────────────────────────────────────────────────
interface SolutionStepProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Short explanation for this step, shown on the right */
  reason?: string;
  /** Visually highlight this step (e.g. the key transformation) */
  highlight?: boolean;
  children: React.ReactNode;
}

/**
 * SolutionStep — one line in a <Solution> block.
 *
 * The math expression goes in `children`; the `reason` appears right-aligned
 * in muted text. Use `highlight` to draw attention to a key step.
 *
 * @example
 * <SolutionStep reason="Subtract 4 from both sides">2x = 6</SolutionStep>
 * <SolutionStep highlight reason="Critical identity">sin²θ + cos²θ = 1</SolutionStep>
 */
export function SolutionStep({
  reason,
  highlight = false,
  children,
  className,
  ...props
}: SolutionStepProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-6 px-4 py-3",
        highlight && "bg-primary/5",
        className,
      )}
      {...props}
    >
      <span className="font-mono text-sm leading-relaxed">{children}</span>
      {reason && (
        <span className="mt-0.5 shrink-0 text-right text-xs italic text-muted-foreground">
          {reason}
        </span>
      )}
    </div>
  );
}
SolutionStep.displayName = "SolutionStep";

// ── SolutionAnswer ────────────────────────────────────────────────────────────
/**
 * SolutionAnswer — the final result at the bottom of a <Solution>.
 *
 * Displays a "∴" (therefore) badge followed by the answer expression.
 *
 * @example
 * <SolutionAnswer>x = 3</SolutionAnswer>
 * <SolutionAnswer><Frac num="1" den="2" /></SolutionAnswer>
 */
export function SolutionAnswer({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 border-t bg-primary/5 px-4 py-3",
        className,
      )}
      {...props}
    >
      <span
        aria-label="therefore"
        className="shrink-0 rounded bg-primary px-1.5 py-0.5 font-mono text-[11px] font-bold text-primary-foreground"
      >
        ∴
      </span>
      <span className="font-mono text-sm font-semibold">{children}</span>
    </div>
  );
}
SolutionAnswer.displayName = "SolutionAnswer";

// ── SolutionNote ──────────────────────────────────────────────────────────────
/**
 * SolutionNote — an inline annotation or insight within a <Solution>.
 *
 * Use for commentary that is not a direct algebraic step — e.g. "Note that…"
 * or "This uses the Pythagorean identity."
 *
 * @example
 * <SolutionNote>Using the identity sin²θ + cos²θ = 1</SolutionNote>
 */
export function SolutionNote({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "border-l-2 border-muted-foreground/30 bg-muted/20 px-4 py-2 text-xs text-muted-foreground italic",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
SolutionNote.displayName = "SolutionNote";
