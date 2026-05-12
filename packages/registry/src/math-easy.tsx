import * as React from "react";
import katex from "katex";
import { cn } from "@/lib/utils";

// Shared macros — duplicated from math.tsx so this file can be distributed
// independently by the CLI without requiring math.tsx as a dependency.
const KATEX_MACROS: Record<string, string> = {
  "\\R": "\\mathbb{R}",
  "\\N": "\\mathbb{N}",
  "\\Z": "\\mathbb{Z}",
  "\\C": "\\mathbb{C}",
  "\\Q": "\\mathbb{Q}",
  "\\E": "\\mathbb{E}",
  "\\PP": "\\mathbb{P}",
  "\\F": "\\mathbb{F}",
  "\\d": "\\,\\mathrm{d}",
  "\\eps": "\\varepsilon",
  "\\norm": "\\left\\|#1\\right\\|",
  "\\abs": "\\left|#1\\right|",
  "\\inner": "\\left\\langle#1,#2\\right\\rangle",
  "\\set": "\\left\\{#1\\right\\}",
  "\\floor": "\\left\\lfloor#1\\right\\rfloor",
  "\\ceil": "\\left\\lceil#1\\right\\rceil",
};

/**
 * Convert a human-readable math DSL string to LaTeX.
 * No backslashes required — write natural words and symbols.
 *
 * Processing order is intentional: longer / more-specific patterns run before
 * shorter ones to avoid partial matches (e.g. "<=>" before "<=" and "=>").
 */
export function toLatex(expr: string): string {
  let s = expr;

  // ── PASS 1: Multi-char operator sequences ─────────────────────────────────
  // Must run before single-char operators so "<=>" beats "<=" and "=>",
  // and "->" is available for lim() detection in pass 3.
  s = s.replace(/<=>/g, "\\Leftrightarrow ");
  s = s.replace(/=>/g, "\\Rightarrow ");
  s = s.replace(/<-/g, "\\leftarrow ");
  s = s.replace(/->/g, "\\to ");
  s = s.replace(/!=/g, "\\neq ");
  s = s.replace(/<=/g, "\\leq ");
  s = s.replace(/>=/g, "\\geq ");
  s = s.replace(/~=/g, "\\approx ");

  // ── PASS 2: Degrees ────────────────────────────────────────────────────────
  // "90deg" → "90^\circ" — runs before Greek pass so "deg" isn't touched.
  s = s.replace(/(\d+(?:\.\d+)?)deg\b/g, "$1^\\circ ");

  // ── PASS 3: Functions with parenthesised arguments ────────────────────────
  // cbrt before sqrt (cbrt starts with 'c', not 'sqrt', but explicit ordering
  // communicates intent).
  s = s.replace(/\bcbrt\(([^)]+)\)/g, "\\sqrt[3]{$1}");
  s = s.replace(/\bsqrt\(([^)]+)\)/g, "\\sqrt{$1}");

  // Bounded operators — form: name(lower, upper)
  // lim: "lim(x->0)" — "->" already replaced by "\to" in pass 1,
  // so the captured group becomes "x\to 0".
  s = s.replace(/\bsum\(([^,)]+),\s*([^)]+)\)/g, "\\sum_{$1}^{$2}");
  s = s.replace(/\bprod\(([^,)]+),\s*([^)]+)\)/g, "\\prod_{$1}^{$2}");
  s = s.replace(/\bint\(([^,)]+),\s*([^)]+)\)/g, "\\int_{$1}^{$2}");
  s = s.replace(/\blim\(([^)]+)\)/g, "\\lim_{$1}");

  // ── PASS 4: Fractions ─────────────────────────────────────────────────────
  // "(numerator)/word" → "\frac{numerator}{word}"
  // Runs after functions so inner sqrt/sum results are already resolved.
  s = s.replace(/\(([^)]+)\)\/(\w+)/g, "\\frac{$1}{$2}");

  // ── PASS 5: Set / logic keywords ──────────────────────────────────────────
  // "not in" MUST come before "in" — otherwise the "in" in "not in" would
  // already be replaced before the two-word phrase is checked.
  s = s.replace(/\bnot\s+in\b/g, "\\notin ");
  s = s.replace(/\bin\b/g, "\\in ");
  s = s.replace(/\bsubset\b/g, "\\subset ");
  s = s.replace(/\bsupset\b/g, "\\supset ");
  s = s.replace(/\bunion\b/g, "\\cup ");
  s = s.replace(/\bintersect\b/g, "\\cap ");
  s = s.replace(/\bforall\b/g, "\\forall ");
  s = s.replace(/\bexists\b/g, "\\exists ");
  // "not" (standalone) after "not in" is already handled above
  s = s.replace(/\bnot\b/g, "\\lnot ");
  s = s.replace(/\band\b/g, "\\land ");
  s = s.replace(/\bor\b/g, "\\lor ");

  // ── PASS 6: Greek letters ─────────────────────────────────────────────────
  // Uppercase variants BEFORE lowercase — defensive ordering (word boundaries
  // make it technically safe either way, but explicit ordering is clearer).
  s = s.replace(/\bTheta\b/g, "\\Theta ");
  s = s.replace(/\bGamma\b/g, "\\Gamma ");
  s = s.replace(/\bDelta\b/g, "\\Delta ");
  s = s.replace(/\bLambda\b/g, "\\Lambda ");
  s = s.replace(/\bXi\b/g, "\\Xi ");
  s = s.replace(/\bPi\b/g, "\\Pi ");
  s = s.replace(/\bSigma\b/g, "\\Sigma ");
  s = s.replace(/\bPhi\b/g, "\\Phi ");
  s = s.replace(/\bPsi\b/g, "\\Psi ");
  s = s.replace(/\bOmega\b/g, "\\Omega ");

  // Lowercase — longer names before shorter to be explicit about ordering.
  s = s.replace(/\bepsilon\b/g, "\\epsilon ");
  s = s.replace(/\bupsilon\b/g, "\\upsilon ");
  s = s.replace(/\btheta\b/g, "\\theta ");
  s = s.replace(/\blambda\b/g, "\\lambda ");
  s = s.replace(/\bomega\b/g, "\\omega ");
  s = s.replace(/\bsigma\b/g, "\\sigma ");
  s = s.replace(/\bdelta\b/g, "\\delta ");
  s = s.replace(/\bkappa\b/g, "\\kappa ");
  s = s.replace(/\bgamma\b/g, "\\gamma ");
  s = s.replace(/\balpha\b/g, "\\alpha ");
  s = s.replace(/\bbeta\b/g, "\\beta ");
  s = s.replace(/\bzeta\b/g, "\\zeta ");
  s = s.replace(/\biota\b/g, "\\iota ");
  s = s.replace(/\bxi\b/g, "\\xi ");
  s = s.replace(/\bmu\b/g, "\\mu ");
  s = s.replace(/\bnu\b/g, "\\nu ");
  s = s.replace(/\bphi\b/g, "\\phi ");
  s = s.replace(/\bchi\b/g, "\\chi ");
  s = s.replace(/\bpsi\b/g, "\\psi ");
  s = s.replace(/\brho\b/g, "\\rho ");
  s = s.replace(/\btau\b/g, "\\tau ");
  s = s.replace(/\beta\b/g, "\\eta ");
  s = s.replace(/\bpi\b/g, "\\pi ");

  // ── PASS 7: Constants ─────────────────────────────────────────────────────
  s = s.replace(/\binf\b/g, "\\infty ");
  s = s.replace(/\bpm\b/g, "\\pm ");

  // ── PASS 8: Ellipsis ──────────────────────────────────────────────────────
  s = s.replace(/\.\.\./g, "\\ldots ");

  return s.trim();
}

interface MEProps {
  children: string;
  block?: boolean;
  className?: string;
}

/**
 * ME — Math Easy.
 *
 * Write math in a human-readable DSL — no LaTeX backslashes needed.
 * The expression string is preprocessed to LaTeX then rendered by KaTeX.
 *
 * @example
 * <ME>theta in {90deg, 120deg, 210deg, 330deg}</ME>
 * <ME>(a+b)/c</ME>
 * <ME>sqrt(b^2 - 4ac)</ME>
 * <ME>sum(i=0, n) i^2</ME>
 * <ME block>x = (-b pm sqrt(b^2 - 4ac)) / (2a)</ME>
 *
 * Note: children must be a plain string.
 * Mixing JSX inside <ME> is not supported — use <M expr="..." /> for that.
 */
export function ME({ children, block = false, className }: MEProps) {
  const html = React.useMemo(() => {
    try {
      return katex.renderToString(toLatex(children), {
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
ME.displayName = "ME";

/**
 * BME — Block Math Easy.
 *
 * Display-mode alias for `<ME block>`.
 *
 * @example
 * <BME>x = (-b pm sqrt(b^2 - 4ac)) / (2a)</BME>
 */
export function BME({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  return (
    <ME block className={className}>
      {children}
    </ME>
  );
}
BME.displayName = "BME";
