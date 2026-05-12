"use client";
import * as React from "react";
import katex from "katex";
import { cn } from "@/lib/utils";

// Shared macros — available to all math components.
// Add shorthands here so both human authors and AI generation stay concise.
const KATEX_MACROS: Record<string, string> = {
  // Number sets
  "\\R": "\\mathbb{R}",
  "\\N": "\\mathbb{N}",
  "\\Z": "\\mathbb{Z}",
  "\\C": "\\mathbb{C}",
  "\\Q": "\\mathbb{Q}",
  "\\E": "\\mathbb{E}", // expected value
  "\\PP": "\\mathbb{P}", // probability (\\P is taken by KaTeX)
  "\\F": "\\mathbb{F}",
  // Calculus
  "\\d": "\\,\\mathrm{d}", // differential: \d x  →  dx
  "\\eps": "\\varepsilon",
  // Common bracketed operators (parameterized)
  "\\norm": "\\left\\|#1\\right\\|", // \norm{v}
  "\\abs": "\\left|#1\\right|", // \abs{x}
  "\\inner": "\\left\\langle#1,#2\\right\\rangle", // \inner{u}{v}
  "\\set": "\\left\\{#1\\right\\}", // \set{x \mid x > 0}
  "\\floor": "\\left\\lfloor#1\\right\\rfloor",
  "\\ceil": "\\left\\lceil#1\\right\\rceil",
};

interface MathProps {
  children: string;
  block?: boolean;
  className?: string;
}

export function Math({ children, block = false, className }: MathProps) {
  const html = React.useMemo(() => {
    try {
      return katex.renderToString(children, {
        displayMode: block,
        throwOnError: false,
        trust: false,
        macros: KATEX_MACROS,
      });
    } catch {
      return `<span style="color:red">Invalid math: ${children}</span>`;
    }
  }, [children, block]);

  if (block) {
    return (
      <div
        className={cn("my-4 overflow-x-auto py-2 text-center", className)}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={cn("inline-block align-middle", className)}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export function BlockMath({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <Math block className={className}>
      {children}
    </Math>
  );
}

export function InlineMath({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return <Math className={className}>{children}</Math>;
}

/**
 * Inline LaTeX — short alias for InlineMath.
 * Pass LaTeX via the `expr` prop: backslashes and braces are literal,
 * no JS string escaping needed.
 *
 * @example
 * // In MDX — clean, no curly braces:
 * The formula <M expr="\frac{a}{b}" /> is a fraction.
 *
 * // AI-generated LaTeX maps directly:
 * <M expr="\sum_{i=0}^{n} x_i" />
 */
export function M({ expr, className }: { expr: string; className?: string }) {
  return <InlineMath className={className}>{expr}</InlineMath>;
}
M.displayName = "M";

/**
 * Block/display LaTeX — short alias for BlockMath.
 * Pass LaTeX via the `expr` prop: backslashes and braces are literal,
 * no JS string escaping needed.
 *
 * @example
 * <BM expr="x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}" />
 */
export function BM({ expr, className }: { expr: string; className?: string }) {
  return <BlockMath className={className}>{expr}</BlockMath>;
}
BM.displayName = "BM";
