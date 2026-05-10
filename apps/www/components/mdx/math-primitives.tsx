import * as React from "react";
import { cn } from "@/lib/utils";

// ── Fraction ──────────────────────────────────────────────────────────────────
interface FracProps {
  /** Numerator */
  num: React.ReactNode;
  /** Denominator */
  den: React.ReactNode;
  className?: string;
}
/**
 * Frac — inline fraction rendered as a vertical stack with a divider line.
 * @example <Frac num="1" den="2" />
 * @example <Frac num={<>x+1</>} den={<>x-1</>} />
 */
export function Frac({ num, den, className }: FracProps) {
  return (
    <span
      role="math"
      aria-label={`${num} over ${den}`}
      className={cn(
        "mx-0.5 inline-flex flex-col items-center align-middle text-[0.88em]",
        className,
      )}
    >
      <span className="border-b border-current px-1 leading-snug">{num}</span>
      <span className="px-1 leading-snug">{den}</span>
    </span>
  );
}
Frac.displayName = "Frac";

// ── Power / Exponent ──────────────────────────────────────────────────────────
interface PowProps {
  /** Exponent value */
  exp: React.ReactNode;
  /** Base (alternative to children) */
  base?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
/**
 * Pow — renders a base raised to an exponent: base^exp.
 * Pass the base as children or via the `base` prop.
 * @example <Pow exp="2">x</Pow>
 * @example <Pow base="e" exp={<>-iωt</>} />
 */
export function Pow({ exp, base, children, className }: PowProps) {
  return (
    <span className={cn("inline-flex items-start", className)}>
      <span>{children ?? base}</span>
      <span className="relative -top-[0.45em] text-[0.72em] leading-none">{exp}</span>
    </span>
  );
}
Pow.displayName = "Pow";

// ── Subscript ─────────────────────────────────────────────────────────────────
interface SubProps {
  /** Subscript value */
  sub: React.ReactNode;
  /** Base (alternative to children) */
  base?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
/**
 * Sub — renders a base with a subscript: base_sub.
 * @example <Sub sub="0">x</Sub>
 * @example <Sub base="a" sub="n" />
 */
export function Sub({ sub, base, children, className }: SubProps) {
  return (
    <span className={cn("inline-flex items-end", className)}>
      <span>{children ?? base}</span>
      <span className="relative top-[0.3em] text-[0.72em] leading-none">{sub}</span>
    </span>
  );
}
Sub.displayName = "Sub";

// ── Square / Nth Root ─────────────────────────────────────────────────────────
interface SqrtProps {
  /** Expression under the radical */
  children: React.ReactNode;
  /** Root index — omit for square root, pass 3 for cube root, etc. */
  n?: React.ReactNode;
  className?: string;
}
/**
 * Sqrt — renders a square root or nth root with a radical bar over the content.
 * @example <Sqrt>x + 1</Sqrt>
 * @example <Sqrt n="3">8</Sqrt>
 */
export function Sqrt({ children, n, className }: SqrtProps) {
  return (
    <span
      role="math"
      className={cn("mx-0.5 inline-flex items-center align-middle", className)}
    >
      {n && (
        <span className="relative -top-[0.35em] mr-px text-[0.62em] leading-none select-none">
          {n}
        </span>
      )}
      <span className="select-none text-[1.25em] leading-none font-light">√</span>
      <span className="border-t border-current px-0.5 leading-snug">{children}</span>
    </span>
  );
}
Sqrt.displayName = "Sqrt";

// ── Absolute Value ────────────────────────────────────────────────────────────
/**
 * Abs — wraps content in vertical bars: |expr|.
 * @example <Abs>x - 1</Abs>
 */
export function Abs({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="math"
      aria-label="absolute value"
      className={cn("mx-0.5 inline-flex items-center gap-px", className)}
    >
      <span className="select-none text-[1.2em] font-light leading-none">|</span>
      <span>{children}</span>
      <span className="select-none text-[1.2em] font-light leading-none">|</span>
    </span>
  );
}
Abs.displayName = "Abs";

// ── Degree ────────────────────────────────────────────────────────────────────
/**
 * Deg — appends a degree symbol as a superscript: 30°.
 * @example <Deg>30</Deg>
 * @example <Deg>90</Deg>
 */
export function Deg({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-start", className)}>
      {children}
      <span className="relative -top-[0.3em] select-none text-[0.7em] leading-none">
        °
      </span>
    </span>
  );
}
Deg.displayName = "Deg";

// ── Infinity & common constants ───────────────────────────────────────────────
/**
 * Inf — renders the infinity symbol ∞.
 */
export function Inf({ className }: { className?: string }) {
  return (
    <span className={cn("font-serif", className)} aria-label="infinity">
      ∞
    </span>
  );
}
Inf.displayName = "Inf";

// ── Greek Letters ─────────────────────────────────────────────────────────────
const GREEK_MAP = {
  alpha: "α",
  beta: "β",
  gamma: "γ",
  delta: "δ",
  epsilon: "ε",
  zeta: "ζ",
  eta: "η",
  theta: "θ",
  iota: "ι",
  kappa: "κ",
  lambda: "λ",
  mu: "μ",
  nu: "ν",
  xi: "ξ",
  pi: "π",
  rho: "ρ",
  sigma: "σ",
  tau: "τ",
  upsilon: "υ",
  phi: "φ",
  chi: "χ",
  psi: "ψ",
  omega: "ω",
  // uppercase
  Gamma: "Γ",
  Delta: "Δ",
  Theta: "Θ",
  Lambda: "Λ",
  Xi: "Ξ",
  Pi: "Π",
  Sigma: "Σ",
  Phi: "Φ",
  Psi: "Ψ",
  Omega: "Ω",
} as const;

type GreekLetter = keyof typeof GREEK_MAP;

/**
 * Greek — render any Greek letter by name.
 * @example <Greek letter="theta" />   → θ
 * @example <Greek letter="Sigma" />   → Σ
 */
export function Greek({
  letter,
  className,
}: {
  letter: GreekLetter;
  className?: string;
}) {
  return (
    <span className={cn("font-serif", className)} aria-label={letter}>
      {GREEK_MAP[letter]}
    </span>
  );
}
Greek.displayName = "Greek";

// Named shortcuts — import individually or destructure from math-primitives
function mkGreek(letter: GreekLetter) {
  const Comp = ({ className }: { className?: string }) => (
    <Greek letter={letter} className={className} />
  );
  Comp.displayName = letter.charAt(0).toUpperCase() + letter.slice(1);
  return Comp;
}

export const Alpha   = mkGreek("alpha");
export const Beta    = mkGreek("beta");
export const Gamma   = mkGreek("gamma");
export const GDelta  = mkGreek("delta");   // uppercase Δ
export const Epsilon = mkGreek("epsilon");
export const Theta   = mkGreek("theta");
export const Lambda  = mkGreek("lambda");
export const Mu      = mkGreek("mu");
export const PiSym   = mkGreek("pi");      // lowercase π (Pi conflicts with Math.PI)
export const Rho     = mkGreek("rho");
export const SigmaSym = mkGreek("sigma");  // lowercase σ
export const Tau     = mkGreek("tau");
export const Phi     = mkGreek("phi");
export const Omega   = mkGreek("omega");
// Uppercase
export const GammaU  = mkGreek("Gamma");   // Γ
export const DeltaU  = mkGreek("Delta");   // Δ
export const ThetaU  = mkGreek("Theta");   // Θ
export const LambdaU = mkGreek("Lambda");  // Λ
export const SigmaU  = mkGreek("Sigma");   // Σ
export const PhiU    = mkGreek("Phi");     // Φ
export const OmegaU  = mkGreek("Omega");   // Ω
