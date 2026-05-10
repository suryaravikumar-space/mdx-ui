/**
 * Design primitives
 *
 * Shared Tailwind class strings extracted from patterns that repeat across
 * every component. Import these instead of copy-pasting the same strings.
 *
 * Usage:
 *   import { focusRing, surface, transitions } from "@/lib/primitives"
 *   className={cn(surface, focusRing, className)}
 */

/** Full focus-visible ring used on every interactive element */
export const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/** Inset focus ring (for buttons inside bordered containers) */
export const focusRingInset =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset";

/** Bordered muted surface — code blocks, accordion, inline containers */
export const surface = "rounded-lg border border-border bg-muted";

/** Card surface — white/card background with shadow */
export const cardSurface = "rounded-lg border border-border bg-card shadow-sm";

/** Popover surface — used for tooltips, menus */
export const popoverSurface =
  "rounded-md border border-border bg-popover text-popover-foreground shadow-md";

/** Standard small muted body text */
export const mutedText = "text-sm text-muted-foreground";

/** Block-level vertical rhythm used by all prose components */
export const blockSpacing = "my-6";

/** Consistent transition timings */
export const transitions = {
  colors: "transition-colors duration-200",
  all: "transition-all duration-200",
  transform: "transition-transform duration-200",
  opacity: "transition-opacity duration-200",
} as const;

/** Chevron SVG (reused in accordion, reveal, spoiler) */
export const chevronPath = "m6 9 6 6 6-6";
