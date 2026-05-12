import * as React from "react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — BASIC STRUCTURAL PRIMITIVES
// Frac · Pow · Sub · Sqrt · Abs · Paren · Deg · Inf
// ═══════════════════════════════════════════════════════════════════════════════

interface FracProps {
  num: React.ReactNode;
  den: React.ReactNode;
  className?: string;
}
/** Fraction: num/den rendered as a vertical stack with a dividing line. */
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

interface PowProps {
  exp: React.ReactNode;
  base?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
/** Power/exponent: base^exp. Pass base as children or the `base` prop. */
export function Pow({ exp, base, children, className }: PowProps) {
  return (
    <span className={cn("inline-flex items-start", className)}>
      <span>{children ?? base}</span>
      <span className="relative -top-[0.45em] text-[0.72em] leading-none">
        {exp}
      </span>
    </span>
  );
}
Pow.displayName = "Pow";

interface SubProps {
  sub: React.ReactNode;
  base?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}
/** Subscript: base_sub. Pass base as children or the `base` prop. */
export function Sub({ sub, base, children, className }: SubProps) {
  return (
    <span className={cn("inline-flex items-end", className)}>
      <span>{children ?? base}</span>
      <span className="relative top-[0.3em] text-[0.72em] leading-none">
        {sub}
      </span>
    </span>
  );
}
Sub.displayName = "Sub";

interface SqrtProps {
  children: React.ReactNode;
  /** Root index — omit for square root, 3 for cube root, etc. */
  n?: React.ReactNode;
  className?: string;
}
/** Radical: √x or ⁿ√x with overbar. */
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
      <span className="select-none text-[1.25em] leading-none font-light">
        √
      </span>
      <span className="border-t border-current px-0.5 leading-snug">
        {children}
      </span>
    </span>
  );
}
Sqrt.displayName = "Sqrt";

/** Absolute value: |expr|. */
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
      <span className="select-none text-[1.2em] font-light leading-none">
        |
      </span>
      <span>{children}</span>
      <span className="select-none text-[1.2em] font-light leading-none">
        |
      </span>
    </span>
  );
}
Abs.displayName = "Abs";

/** Parentheses wrapper — slightly larger, scales with content height. */
export function Paren({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("mx-px inline-flex items-center", className)}>
      <span className="select-none text-[1.3em] font-light leading-none">
        (
      </span>
      <span>{children}</span>
      <span className="select-none text-[1.3em] font-light leading-none">
        )
      </span>
    </span>
  );
}
Paren.displayName = "Paren";

/** Degree symbol as superscript: 30°. */
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

/** Infinity symbol ∞. */
export function Inf({ className }: { className?: string }) {
  return (
    <span className={cn("font-serif", className)} aria-label="infinity">
      ∞
    </span>
  );
}
Inf.displayName = "Inf";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 2 — CALCULUS
// Integral · Sum · Prod · Lim · Limsup · Liminf · Deriv · PDeriv · Nabla · Laplacian
// ═══════════════════════════════════════════════════════════════════════════════

interface BoundedProps {
  from?: React.ReactNode;
  to?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

/** Integral ∫ with optional lower/upper bounds. Nest for double/triple integrals. */
export function Integral({ from, to, children, className }: BoundedProps) {
  return (
    <span
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      <span className="inline-flex flex-col items-end">
        {to !== undefined && (
          <span className="text-[0.62em] leading-none">{to}</span>
        )}
        <span className="select-none text-[1.9em] font-light leading-none">
          ∫
        </span>
        {from !== undefined && (
          <span className="text-[0.62em] leading-none">{from}</span>
        )}
      </span>
      {children && <span className="ml-0.5">{children}</span>}
    </span>
  );
}
Integral.displayName = "Integral";

/** Summation Σ with optional index bounds. */
export function Sum({ from, to, children, className }: BoundedProps) {
  return (
    <span
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      <span className="inline-flex flex-col items-center">
        {to !== undefined && (
          <span className="text-[0.62em] leading-none">{to}</span>
        )}
        <span className="select-none text-[1.5em] leading-none">Σ</span>
        {from !== undefined && (
          <span className="text-[0.62em] leading-none">{from}</span>
        )}
      </span>
      {children && <span className="ml-0.5">{children}</span>}
    </span>
  );
}
Sum.displayName = "Sum";

/** Product Π with optional index bounds. */
export function Prod({ from, to, children, className }: BoundedProps) {
  return (
    <span
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      <span className="inline-flex flex-col items-center">
        {to !== undefined && (
          <span className="text-[0.62em] leading-none">{to}</span>
        )}
        <span className="select-none text-[1.4em] leading-none">Π</span>
        {from !== undefined && (
          <span className="text-[0.62em] leading-none">{from}</span>
        )}
      </span>
      {children && <span className="ml-0.5">{children}</span>}
    </span>
  );
}
Prod.displayName = "Prod";

/** Limit: lim_{sub} expr. */
export function Lim({
  sub,
  children,
  className,
}: {
  sub: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      <span className="inline-flex flex-col items-center">
        <span className="font-serif text-sm leading-none">lim</span>
        <span className="text-[0.6em] leading-none">{sub}</span>
      </span>
      {children && <span className="ml-1">{children}</span>}
    </span>
  );
}
Lim.displayName = "Lim";

/** lim sup — limit superior with optional subscript bound. */
export function Limsup({
  sub,
  children,
  className,
}: {
  sub?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      <span className="inline-flex flex-col items-center">
        <span className="font-serif text-sm leading-none">lim sup</span>
        {sub !== undefined && (
          <span className="text-[0.6em] leading-none">{sub}</span>
        )}
      </span>
      {children && <span className="ml-1">{children}</span>}
    </span>
  );
}
Limsup.displayName = "Limsup";

/** lim inf — limit inferior with optional subscript bound. */
export function Liminf({
  sub,
  children,
  className,
}: {
  sub?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      <span className="inline-flex flex-col items-center">
        <span className="font-serif text-sm leading-none">lim inf</span>
        {sub !== undefined && (
          <span className="text-[0.6em] leading-none">{sub}</span>
        )}
      </span>
      {children && <span className="ml-1">{children}</span>}
    </span>
  );
}
Liminf.displayName = "Liminf";

/** Ordinary derivative d^n/dx^n. `of` = variable name, `n` = order. */
export function Deriv({
  of: variable = "x",
  n,
  children,
  className,
}: {
  of?: string;
  n?: number;
  children?: React.ReactNode;
  className?: string;
}) {
  const sup =
    n && n > 1 ? (
      <span className="relative -top-1 text-[0.72em]">{n}</span>
    ) : null;
  return (
    <span
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      <Frac
        num={<>d{sup}</>}
        den={
          <>
            d{variable}
            {sup}
          </>
        }
      />
      {children && <span className="ml-0.5">{children}</span>}
    </span>
  );
}
Deriv.displayName = "Deriv";

/** Partial derivative ∂^n/∂x^n. */
export function PDeriv({
  of: variable = "x",
  n,
  children,
  className,
}: {
  of?: string;
  n?: number;
  children?: React.ReactNode;
  className?: string;
}) {
  const sup =
    n && n > 1 ? (
      <span className="relative -top-1 text-[0.72em]">{n}</span>
    ) : null;
  return (
    <span
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      <Frac
        num={<>∂{sup}</>}
        den={
          <>
            ∂{variable}
            {sup}
          </>
        }
      />
      {children && <span className="ml-0.5">{children}</span>}
    </span>
  );
}
PDeriv.displayName = "PDeriv";

/** Del / Nabla operator ∇. */
export function Nabla({ className }: { className?: string }) {
  return (
    <span className={cn("font-serif", className)} aria-label="nabla">
      ∇
    </span>
  );
}
Nabla.displayName = "Nabla";

/** Laplacian operator ∇². */
export function Laplacian({ className }: { className?: string }) {
  return (
    <span className={cn("font-serif", className)} aria-label="laplacian">
      ∇²
    </span>
  );
}
Laplacian.displayName = "Laplacian";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 3 — TRIGONOMETRY
// Sin · Cos · Tan · Cot · Sec · Csc
// ArcSin · ArcCos · ArcTan
// Sinh · Cosh · Tanh · Log · Ln · Exp
// ═══════════════════════════════════════════════════════════════════════════════

function mkTrig(name: string) {
  const TrigFn = ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => (
    <span className={cn("mx-0.5 inline-flex items-center", className)}>
      <span className="font-serif">{name}</span>
      {children !== undefined && <Paren>{children}</Paren>}
    </span>
  );
  TrigFn.displayName = name.charAt(0).toUpperCase() + name.slice(1);
  return TrigFn;
}

export const Sin = mkTrig("sin");
export const Cos = mkTrig("cos");
export const Tan = mkTrig("tan");
export const Cot = mkTrig("cot");
export const Sec = mkTrig("sec");
export const Csc = mkTrig("csc");
export const ArcSin = mkTrig("arcsin");
export const ArcCos = mkTrig("arccos");
export const ArcTan = mkTrig("arctan");
export const Sinh = mkTrig("sinh");
export const Cosh = mkTrig("cosh");
export const Tanh = mkTrig("tanh");
export const Log = mkTrig("log");
export const Ln = mkTrig("ln");
export const Exp = mkTrig("exp");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 4 — ALGEBRA & COMBINATORICS
// Factorial · Choose · Perm · Mod · GCD · LCM
// ═══════════════════════════════════════════════════════════════════════════════

/** Factorial n! */
export function Factorial({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-baseline", className)}>
      {children}
      <span>!</span>
    </span>
  );
}
Factorial.displayName = "Factorial";

/** Binomial coefficient (n choose k) — stacked pair in tall parentheses. */
export function Choose({
  n,
  k,
  className,
}: {
  n: React.ReactNode;
  k: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="math"
      aria-label={`${n} choose ${k}`}
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      <span className="select-none font-serif text-[1.4em] font-light leading-none">
        (
      </span>
      <span className="inline-flex flex-col items-center text-[0.88em]">
        <span className="px-1 leading-tight">{n}</span>
        <span className="px-1 leading-tight">{k}</span>
      </span>
      <span className="select-none font-serif text-[1.4em] font-light leading-none">
        )
      </span>
    </span>
  );
}
Choose.displayName = "Choose";

/** Permutation P(n, r) — stacked super/subscript form. */
export function Perm({
  n,
  r,
  className,
}: {
  n: React.ReactNode;
  r: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="math"
      aria-label={`P ${n} ${r}`}
      className={cn("mx-0.5 inline-flex items-start", className)}
    >
      <span className="font-serif">P</span>
      <span className="inline-flex flex-col text-[0.62em]">
        <span className="leading-none">{n}</span>
        <span className="leading-none">{r}</span>
      </span>
    </span>
  );
}
Perm.displayName = "Perm";

/** Modulo: a mod n. */
export function Mod({
  a,
  n,
  className,
}: {
  a: React.ReactNode;
  n: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("mx-0.5 inline-flex items-center gap-1", className)}>
      {a}
      <span className="font-serif text-sm">mod</span>
      {n}
    </span>
  );
}
Mod.displayName = "Mod";

/** GCD(a, b). */
export function GCD({
  a,
  b,
  className,
}: {
  a: React.ReactNode;
  b: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("mx-0.5 inline-flex items-center", className)}>
      <span className="font-serif text-sm">gcd</span>
      <Paren>
        {a}, {b}
      </Paren>
    </span>
  );
}
GCD.displayName = "GCD";

/** LCM(a, b). */
export function LCM({
  a,
  b,
  className,
}: {
  a: React.ReactNode;
  b: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("mx-0.5 inline-flex items-center", className)}>
      <span className="font-serif text-sm">lcm</span>
      <Paren>
        {a}, {b}
      </Paren>
    </span>
  );
}
LCM.displayName = "LCM";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 5 — SET THEORY & DISCRETE MATH
// Floor · Ceil · SetOf · Card · PowerSet
// In · NotIn · Subset · SubsetEq · Supset · Union · Intersect · Empty · SetMinus
// ═══════════════════════════════════════════════════════════════════════════════

/** Floor function: ⌊x⌋. */
export function Floor({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("mx-0.5 inline-flex items-center gap-px", className)}>
      <span className="select-none font-mono">⌊</span>
      {children}
      <span className="select-none font-mono">⌋</span>
    </span>
  );
}
Floor.displayName = "Floor";

/** Ceiling function: ⌈x⌉. */
export function Ceil({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("mx-0.5 inline-flex items-center gap-px", className)}>
      <span className="select-none font-mono">⌈</span>
      {children}
      <span className="select-none font-mono">⌉</span>
    </span>
  );
}
Ceil.displayName = "Ceil";

/** Set-builder notation: { x | condition }. */
export function SetOf({
  variable,
  condition,
  className,
}: {
  variable: React.ReactNode;
  condition: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("mx-0.5 inline-flex items-center gap-1", className)}>
      <span className="font-serif">{"{"}</span>
      {variable}
      <span className="mx-0.5 font-serif">|</span>
      {condition}
      <span className="font-serif">{"}"}</span>
    </span>
  );
}
SetOf.displayName = "SetOf";

/** Cardinality |A|. */
export function Cardinality({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("mx-0.5 inline-flex items-center", className)}
      aria-label="cardinality"
    >
      <span className="font-serif">|</span>
      {children}
      <span className="font-serif">|</span>
    </span>
  );
}
Cardinality.displayName = "Cardinality";

/** Power set 𝒫(A). */
export function PowerSet({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("mx-0.5 inline-flex items-center", className)}
      aria-label="power set"
    >
      <span className="font-serif italic">𝒫</span>
      <Paren>{children}</Paren>
    </span>
  );
}
PowerSet.displayName = "PowerSet";

// Symbol factory
const mkSym = (sym: string, label: string, extraCls = "") => {
  const Sym = ({ className }: { className?: string }) => (
    <span
      className={cn("mx-1 font-serif", extraCls, className)}
      aria-label={label}
    >
      {sym}
    </span>
  );
  Sym.displayName = label
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  return Sym;
};

// Set relations
export const In = mkSym("∈", "element of");
export const NotIn = mkSym("∉", "not element of");
export const Subset = mkSym("⊂", "subset");
export const SubsetEq = mkSym("⊆", "subset or equal");
export const Supset = mkSym("⊃", "superset");
export const SupsetEq = mkSym("⊇", "superset or equal");
export const Union = mkSym("∪", "union");
export const Intersect = mkSym("∩", "intersection");
export const Empty = mkSym("∅", "empty set");
export const SetMinus = mkSym("∖", "set minus");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 6 — NUMBER SYSTEMS
// NN · ZZ · QQ · RR · CC · PP · FF · Complex · Conj
// ═══════════════════════════════════════════════════════════════════════════════

const mkNumSet = (sym: string, label: string) => {
  const NS = ({ className }: { className?: string }) => (
    <span className={cn("font-serif", className)} aria-label={label}>
      {sym}
    </span>
  );
  NS.displayName = label;
  return NS;
};

export const NN = mkNumSet("ℕ", "natural numbers");
export const ZZ = mkNumSet("ℤ", "integers");
export const QQ = mkNumSet("ℚ", "rationals");
export const RR = mkNumSet("ℝ", "reals");
export const CC = mkNumSet("ℂ", "complex numbers");
export const PP = mkNumSet("ℙ", "primes");
export const FF = mkNumSet("𝔽", "field");

/** Complex number display: a + bi. */
export function Complex({
  re,
  im,
  className,
}: {
  re: React.ReactNode;
  im: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-baseline gap-0.5", className)}>
      {re}
      <span>+</span>
      {im}
      <span className="font-serif italic">i</span>
    </span>
  );
}
Complex.displayName = "Complex";

/** Complex conjugate: z̄ — overbar over expression. */
export function Conj({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("inline-flex flex-col items-center", className)}
      aria-label="conjugate"
    >
      <span className="border-t border-current px-0.5 leading-snug">
        {children}
      </span>
    </span>
  );
}
Conj.displayName = "Conj";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 7 — LOGIC & PROOF
// And · Or · Not · Xor · Nand · Nor
// ForAll · Exists · NotExists
// Implies · Iff · Therefore · Because · Turnstile · QED
// ═══════════════════════════════════════════════════════════════════════════════

export const And = mkSym("∧", "and");
export const Or = mkSym("∨", "or");
export const Not = mkSym("¬", "not", "mr-px");
export const Xor = mkSym("⊕", "xor");
export const Nand = mkSym("↑", "nand");
export const Nor = mkSym("↓", "nor");
export const ForAll = mkSym("∀", "for all", "mr-px");
export const Exists = mkSym("∃", "there exists", "mr-px");
export const NotExists = mkSym("∄", "there does not exist", "mr-px");
export const Therefore = mkSym("∴", "therefore");
export const Because = mkSym("∵", "because");
export const Turnstile = mkSym("⊢", "proves");
export const Implies = mkSym("⟹", "implies");
export const Iff = mkSym("⟺", "if and only if");

/** QED end-of-proof square □. */
export function QED({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "ml-auto inline-block h-3 w-3 border border-current",
        className,
      )}
      aria-label="QED"
    />
  );
}
QED.displayName = "QED";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 8 — LINEAR ALGEBRA & MATRICES
// Vec · Norm · Dot · Cross · Transpose · Det · Matrix
// Span · Rank · Dim · Null · Img · Trace
// ═══════════════════════════════════════════════════════════════════════════════

/** Column vector with right-arrow overhead. */
export function Vec({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex flex-col items-center align-middle",
        className,
      )}
      aria-label="vector"
    >
      <span className="select-none text-[0.55em] leading-none">→</span>
      <span className="font-bold leading-none">{children}</span>
    </span>
  );
}
Vec.displayName = "Vec";

/** Vector/matrix norm ‖v‖. */
export function Norm({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("mx-0.5 inline-flex items-center gap-px", className)}
      aria-label="norm"
    >
      <span className="select-none font-mono text-[1.1em]">‖</span>
      {children}
      <span className="select-none font-mono text-[1.1em]">‖</span>
    </span>
  );
}
Norm.displayName = "Norm";

export const Dot = mkSym("·", "dot product", "mx-1");
export const Cross = mkSym("×", "cross product", "mx-1");

/** Transpose: A^T. */
export function Transpose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Pow exp="T" className={className}>
      {children}
    </Pow>
  );
}
Transpose.displayName = "Transpose";

/** Determinant — bar form |A| or word form det(A). */
export function Det({
  children,
  variant = "bar",
  className,
}: {
  children: React.ReactNode;
  variant?: "bar" | "det";
  className?: string;
}) {
  if (variant === "det") {
    return (
      <span
        className={cn("mx-0.5 inline-flex items-center", className)}
        aria-label="determinant"
      >
        <span className="font-serif">det</span>
        <Paren>{children}</Paren>
      </span>
    );
  }
  return <Abs className={className}>{children}</Abs>;
}
Det.displayName = "Det";

/**
 * Matrix — 2-D grid with surrounding brackets.
 *
 * @example
 * <Matrix rows={[["1","2"],["3","4"]]} />
 * <Matrix rows={[["a","b"],["c","d"]]} bracket="round" />
 */
export function Matrix({
  rows,
  bracket = "square",
  className,
}: {
  rows: React.ReactNode[][];
  bracket?: "square" | "round" | "pipe" | "none";
  className?: string;
}) {
  const cols = Math.max(...rows.map((r) => r.length), 1);
  const [open, close] = (
    {
      square: ["[", "]"],
      round: ["(", ")"],
      pipe: ["|", "|"],
      none: ["", ""],
    } as const
  )[bracket];

  return (
    <span
      role="math"
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      {open && (
        <span className="select-none font-serif text-[2em] font-thin leading-none">
          {open}
        </span>
      )}
      <span
        className="mx-1 grid gap-x-3 gap-y-0.5 font-mono text-sm"
        style={{ gridTemplateColumns: `repeat(${cols}, auto)` }}
      >
        {rows.map((row, i) =>
          row.map((cell, j) => (
            <span key={`${i}-${j}`} className="text-center">
              {cell}
            </span>
          )),
        )}
      </span>
      {close && (
        <span className="select-none font-serif text-[2em] font-thin leading-none">
          {close}
        </span>
      )}
    </span>
  );
}
Matrix.displayName = "Matrix";

// Named LA operators
function mkOp(name: string) {
  const Op = ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => (
    <span className={cn("mx-0.5 inline-flex items-center", className)}>
      <span className="font-serif text-sm">{name}</span>
      {children !== undefined && <Paren>{children}</Paren>}
    </span>
  );
  Op.displayName = name.charAt(0).toUpperCase() + name.slice(1);
  return Op;
}

export const SpanOp = mkOp("span");
export const Rank = mkOp("rank");
export const Dim = mkOp("dim");
export const NullOp = mkOp("null");
export const Img = mkOp("img");
export const Trace = mkOp("tr");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 9 — STATISTICS & PROBABILITY
// Prob · CondProb · Expected · Variance · StdDev · Cov · Corr · Dist
// ═══════════════════════════════════════════════════════════════════════════════

/** Probability P(event). */
export function Prob({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("mx-0.5 inline-flex items-center", className)}
      aria-label="probability"
    >
      <span className="font-serif italic">P</span>
      <Paren>{children}</Paren>
    </span>
  );
}
Prob.displayName = "Prob";

/** Conditional probability P(event | given). */
export function CondProb({
  event,
  given,
  className,
}: {
  event: React.ReactNode;
  given: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("mx-0.5 inline-flex items-center", className)}
      aria-label="conditional probability"
    >
      <span className="font-serif italic">P</span>
      <span className="select-none text-[1.15em] font-light">(</span>
      {event}
      <span className="mx-0.5 select-none text-[1.15em] font-light">|</span>
      {given}
      <span className="select-none text-[1.15em] font-light">)</span>
    </span>
  );
}
CondProb.displayName = "CondProb";

/** Expected value 𝔼[X]. */
export function Expected({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("mx-0.5 inline-flex items-center", className)}
      aria-label="expected value"
    >
      <span className="font-serif">𝔼</span>
      <span className="select-none">[</span>
      {children}
      <span className="select-none">]</span>
    </span>
  );
}
Expected.displayName = "Expected";

/** Variance Var(X). */
export function Variance({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("mx-0.5 inline-flex items-center", className)}
      aria-label="variance"
    >
      <span className="font-serif">Var</span>
      <Paren>{children}</Paren>
    </span>
  );
}
Variance.displayName = "Variance";

/** Standard deviation SD(X). */
export function StdDev({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("mx-0.5 inline-flex items-center", className)}
      aria-label="standard deviation"
    >
      <span className="font-serif">SD</span>
      <Paren>{children}</Paren>
    </span>
  );
}
StdDev.displayName = "StdDev";

/** Covariance Cov(X, Y). */
export function Cov({
  x,
  y,
  className,
}: {
  x: React.ReactNode;
  y: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("mx-0.5 inline-flex items-center", className)}
      aria-label="covariance"
    >
      <span className="font-serif">Cov</span>
      <Paren>
        {x}, {y}
      </Paren>
    </span>
  );
}
Cov.displayName = "Cov";

/** Correlation Corr(X, Y). */
export function Corr({
  x,
  y,
  className,
}: {
  x: React.ReactNode;
  y: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn("mx-0.5 inline-flex items-center", className)}
      aria-label="correlation"
    >
      <span className="font-serif">Corr</span>
      <Paren>
        {x}, {y}
      </Paren>
    </span>
  );
}
Corr.displayName = "Corr";

/** Distribution notation: X ~ Name(params). */
export function Dist({
  name,
  params,
  className,
}: {
  name: string;
  params?: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("mx-0.5 inline-flex items-center gap-1", className)}>
      <span className="font-serif">∼</span>
      <span className="font-serif italic">{name}</span>
      {params !== undefined && <Paren>{params}</Paren>}
    </span>
  );
}
Dist.displayName = "Dist";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 10 — GREEK LETTERS
// Full lowercase + uppercase set
// ═══════════════════════════════════════════════════════════════════════════════

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

/** Any Greek letter by name. */
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

function mkGreek(letter: GreekLetter) {
  const Comp = ({ className }: { className?: string }) => (
    <Greek letter={letter} className={className} />
  );
  Comp.displayName = letter.charAt(0).toUpperCase() + letter.slice(1);
  return Comp;
}

// lowercase shortcuts
export const Alpha = mkGreek("alpha");
export const Beta = mkGreek("beta");
export const Gamma = mkGreek("gamma");
export const GDelta = mkGreek("delta");
export const Epsilon = mkGreek("epsilon");
export const Zeta = mkGreek("zeta");
export const Eta = mkGreek("eta");
export const Theta = mkGreek("theta");
export const Iota = mkGreek("iota");
export const Kappa = mkGreek("kappa");
export const Lambda = mkGreek("lambda");
export const Mu = mkGreek("mu");
export const Nu = mkGreek("nu");
export const Xi = mkGreek("xi");
export const PiSym = mkGreek("pi");
export const Rho = mkGreek("rho");
export const SigmaSym = mkGreek("sigma");
export const Tau = mkGreek("tau");
export const Upsilon = mkGreek("upsilon");
export const Phi = mkGreek("phi");
export const Chi = mkGreek("chi");
export const Psi = mkGreek("psi");
export const Omega = mkGreek("omega");
// uppercase shortcuts
export const GammaU = mkGreek("Gamma");
export const DeltaU = mkGreek("Delta");
export const ThetaU = mkGreek("Theta");
export const LambdaU = mkGreek("Lambda");
export const XiU = mkGreek("Xi");
export const PiU = mkGreek("Pi");
export const SigmaU = mkGreek("Sigma");
export const PhiU = mkGreek("Phi");
export const PsiU = mkGreek("Psi");
export const OmegaU = mkGreek("Omega");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 11 — RELATIONS, ARROWS & ARITHMETIC
// Neq · Approx · Equiv · Cong · Leq · Geq · Ll · Gg · Propto · Sim
// PlusMinus · MinusPlus · Divides · NotDivides · MapsTo · Compose · OTimes
// ═══════════════════════════════════════════════════════════════════════════════

// Comparison relations
export const Neq = mkSym("≠", "not equal");
export const Approx = mkSym("≈", "approximately equal");
export const Equiv = mkSym("≡", "equivalent");
export const Cong = mkSym("≅", "congruent");
export const Leq = mkSym("≤", "less than or equal");
export const Geq = mkSym("≥", "greater than or equal");
export const Ll = mkSym("≪", "much less than");
export const Gg = mkSym("≫", "much greater than");
export const Propto = mkSym("∝", "proportional to");
export const Sim = mkSym("∼", "similar");

// Arithmetic
export const PlusMinus = mkSym("±", "plus or minus");
export const MinusPlus = mkSym("∓", "minus or plus");

// Number theory
export const Divides = mkSym("∣", "divides");
export const NotDivides = mkSym("∤", "does not divide");

// Arrows & operations
export const Arrow = mkSym("→", "right arrow");
export const MapsTo = mkSym("↦", "maps to");
export const Compose = mkSym("∘", "composition");
export const OTimes = mkSym("⊗", "tensor product");
