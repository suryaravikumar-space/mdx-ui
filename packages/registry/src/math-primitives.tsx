import * as React from "react";
import { cn } from "@/lib/utils";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 1 — BASIC STRUCTURAL PRIMITIVES
// Expr · Frac · Pow · Sub · Sqrt · Abs · Paren · Deg · Inf
// ═══════════════════════════════════════════════════════════════════════════════

/** Inline composition wrapper — groups text, symbols, and components into a single expression node. Use instead of fragments or bare spans when passing multiple children as a JSX prop. */
export function Expr({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center align-middle", className)}>
      {children}
    </span>
  );
}
Expr.displayName = "Expr";

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
      <span className="self-stretch border-b border-current px-1 pb-1 text-center leading-snug">
        {num}
      </span>
      <span className="px-1 pt-1 leading-snug">{den}</span>
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
    <span className={cn("mx-px inline-flex items-stretch", className)}>
      <span className="flex items-center select-none text-[1.6em] font-extralight leading-none">
        (
      </span>
      <span className="mx-0.5">{children}</span>
      <span className="flex items-center select-none text-[1.6em] font-extralight leading-none">
        )
      </span>
    </span>
  );
}
Paren.displayName = "Paren";

/** Curly brace grouping: {expr}. Use for set notation or visual grouping with braces. */
export function Brace({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("mx-px inline-flex items-stretch", className)}>
      <span className="flex items-center select-none text-[1.6em] font-extralight leading-none">
        {"{"}
      </span>
      <span className="mx-0.5">{children}</span>
      <span className="flex items-center select-none text-[1.6em] font-extralight leading-none">
        {"}"}
      </span>
    </span>
  );
}
Brace.displayName = "Brace";

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

// ─── Convenience shorthands ───────────────────────────────────────────────────

/**
 * DegNum — renders a numeric degree value with the degree symbol.
 * Convenience over `<Deg>{n}</Deg>` when the value is a JS number prop.
 *
 * @example <DegNum n={90} />  →  90°
 */
export function DegNum({ n, className }: { n: number; className?: string }) {
  return <Deg className={className}>{n}</Deg>;
}
DegNum.displayName = "DegNum";

/** Equals sign with standard math spacing. */
export const Eq = mkSym("=", "equals", "mx-1");

/** Not-equal sign ≠. Alias for `Neq` with a more descriptive name. */
export const NotEq = mkSym("≠", "not equal", "mx-1");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION — ACCENTS
// Bar · Hat · Tilde · Dot · DDot
// ═══════════════════════════════════════════════════════════════════════════════

/** Overline / mean bar: x̄. Border-top over the child content. */
export function Bar({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="math"
      aria-label="bar over"
      className={cn(
        "mx-0.5 inline-block border-t border-current pt-px",
        className,
      )}
    >
      {children}
    </span>
  );
}
Bar.displayName = "Bar";

const mkAccent = (accent: string, label: string) => {
  const Accent = ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <span
      role="math"
      aria-label={label}
      className={cn("mx-0.5 inline-flex flex-col items-center", className)}
    >
      <span className="text-[0.65em] leading-none select-none">{accent}</span>
      <span>{children}</span>
    </span>
  );
  Accent.displayName = label
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  return Accent;
};

/** Hat accent: x̂ — unit vector or estimate. */
export const Hat = mkAccent("∧", "hat over");
/** Tilde accent: x̃ — approximate or equivalence class. */
export const Tilde = mkAccent("~", "tilde over");
/** Single dot accent: ẋ — first time derivative (Newton notation). */
export const DotAccent = mkAccent("·", "dot over");
/** Double dot accent: ẍ — second time derivative (Newton notation). */
export const DDot = mkAccent("··", "double dot over");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION — EXTENDED CALCULUS
// ContourIntegral · Overbrace · Underbrace
// ═══════════════════════════════════════════════════════════════════════════════

/** Contour integral ∮ — closed curve integral with optional bounds. */
export function ContourIntegral({
  from,
  to,
  children,
  className,
}: BoundedProps) {
  return (
    <span
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      <span className="inline-flex flex-col items-end">
        {to !== undefined && (
          <span className="text-[0.62em] leading-none">{to}</span>
        )}
        <span className="select-none text-[1.9em] font-light leading-none">
          ∮
        </span>
        {from !== undefined && (
          <span className="text-[0.62em] leading-none">{from}</span>
        )}
      </span>
      {children && <span className="ml-0.5">{children}</span>}
    </span>
  );
}
ContourIntegral.displayName = "ContourIntegral";

/** Overbrace ⏞ with an optional label above. Groups terms with annotation. */
export function Overbrace({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label?: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("mx-0.5 inline-flex flex-col items-center", className)}>
      {label && (
        <span className="text-[0.65em] leading-none text-muted-foreground">
          {label}
        </span>
      )}
      <span className="w-full text-center text-[0.8em] leading-none select-none">
        ⏞
      </span>
      <span>{children}</span>
    </span>
  );
}
Overbrace.displayName = "Overbrace";

/** Underbrace ⏟ with an optional label below. Groups terms with annotation. */
export function Underbrace({
  children,
  label,
  className,
}: {
  children: React.ReactNode;
  label?: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("mx-0.5 inline-flex flex-col items-center", className)}>
      <span>{children}</span>
      <span className="w-full text-center text-[0.8em] leading-none select-none">
        ⏟
      </span>
      {label && (
        <span className="text-[0.65em] leading-none text-muted-foreground">
          {label}
        </span>
      )}
    </span>
  );
}
Underbrace.displayName = "Underbrace";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION — PIECEWISE FUNCTIONS
// Case · Cases
// ═══════════════════════════════════════════════════════════════════════════════

interface CaseProps {
  expr: React.ReactNode;
  when: React.ReactNode;
  className?: string;
}

/** A single branch in a piecewise function — pair expr with its condition. */
export function Case({ expr, when, className }: CaseProps) {
  return (
    <span className={cn("contents", className)}>
      <span className="pr-4">{expr}</span>
      <span className="text-muted-foreground text-[0.88em]">if {when}</span>
    </span>
  );
}
Case.displayName = "Case";

interface CasesProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Piecewise / cases function — renders a left brace with expression–condition rows.
 *
 * @example
 * <Cases>
 *   <Case expr="x" when="x ≥ 0" />
 *   <Case expr={<span>−x</span>} when="x < 0" />
 * </Cases>
 */
export function Cases({ children, className }: CasesProps) {
  return (
    <span
      role="math"
      aria-label="piecewise function"
      className={cn(
        "inline-grid gap-x-2 gap-y-1 border-l-[2.5px] border-current pl-2 my-1",
        className,
      )}
      style={{ gridTemplateColumns: "auto auto" }}
    >
      {children}
    </span>
  );
}
Cases.displayName = "Cases";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION — GEOMETRY
// Angle · Triangle · Parallel · Perpendicular · Segment · Ray · Arc · Similar
// ═══════════════════════════════════════════════════════════════════════════════

/** Angle ∠ABC — renders ∠ prefix before the vertex label. */
export function Angle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="math"
      aria-label="angle"
      className={cn("mx-0.5 inline-flex items-center", className)}
    >
      <span className="select-none font-serif mr-px">∠</span>
      <span>{children}</span>
    </span>
  );
}
Angle.displayName = "Angle";

/** Triangle △ABC — renders △ prefix before the vertex label. */
export function Triangle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="math"
      aria-label="triangle"
      className={cn("mx-0.5 inline-flex items-center", className)}
    >
      <span className="select-none font-serif mr-px">△</span>
      <span>{children}</span>
    </span>
  );
}
Triangle.displayName = "Triangle";

/** Line segment AB̄ — overline above the two endpoint labels. */
export function Segment({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="math"
      aria-label="segment"
      className={cn(
        "mx-0.5 inline-block border-t border-current pt-px font-serif",
        className,
      )}
    >
      {children}
    </span>
  );
}
Segment.displayName = "Segment";

/** Ray AB→ — arrow above the endpoint labels. */
export function Ray({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="math"
      aria-label="ray"
      className={cn("mx-0.5 inline-flex flex-col items-start", className)}
    >
      <span className="text-[0.65em] leading-none select-none self-end">→</span>
      <span className="font-serif">{children}</span>
    </span>
  );
}
Ray.displayName = "Ray";

/** Arc ⌢ — arc above two endpoint labels. */
export function Arc({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="math"
      aria-label="arc"
      className={cn("mx-0.5 inline-flex flex-col items-center", className)}
    >
      <span className="text-[0.8em] leading-none select-none">⌢</span>
      <span className="font-serif">{children}</span>
    </span>
  );
}
Arc.displayName = "Arc";

/** Parallel ∥ — two lines are parallel. */
export const Parallel = mkSym("∥", "parallel", "mx-1");
/** Perpendicular ⊥ — two lines are perpendicular. */
export const Perpendicular = mkSym("⊥", "perpendicular", "mx-1");
/** Therefore ∴ — geometric conclusion marker. Already exported above as Therefore. */
/** Right angle symbol ⊾ — marks a 90° angle in diagrams. */
export const RightAngle = mkSym("⊾", "right angle", "mx-1");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 12 — ARROWS
// Single, double, long, harpoon, diagonal, chemistry equilibrium
// ═══════════════════════════════════════════════════════════════════════════════

// Single-headed arrows
export const LeftArrow = mkSym("←", "left arrow", "mx-1");
export const UpArrow = mkSym("↑", "up arrow", "mx-1");
export const DownArrow = mkSym("↓", "down arrow", "mx-1");
export const LeftRightArrow = mkSym("↔", "left right arrow", "mx-1");
export const NearArrow = mkSym("↗", "north east arrow", "mx-1");
export const SeArrow = mkSym("↘", "south east arrow", "mx-1");
export const SwArrow = mkSym("↙", "south west arrow", "mx-1");
export const NwArrow = mkSym("↖", "north west arrow", "mx-1");
export const HookRightArrow = mkSym("↪", "hook right arrow", "mx-1");
export const HookLeftArrow = mkSym("↩", "hook left arrow", "mx-1");
export const TwoHeadRight = mkSym("↠", "two head right arrow", "mx-1");
export const TwoHeadLeft = mkSym("↞", "two head left arrow", "mx-1");
export const UpDownArrow = mkSym("↕", "up down arrow", "mx-1");

// Double-headed (implication style)
export const DoubleLeftArrow = mkSym("⇐", "double left arrow", "mx-1");
export const DoubleRightArrow = mkSym("⇒", "double right arrow", "mx-1");
export const DoubleLeftRightArrow = mkSym(
  "⇔",
  "double left right arrow",
  "mx-1",
);
export const DoubleUpArrow = mkSym("⇑", "double up arrow", "mx-1");
export const DoubleDownArrow = mkSym("⇓", "double down arrow", "mx-1");
export const DoubleUpDownArrow = mkSym("⇕", "double up down arrow", "mx-1");

// Long arrows
export const LongRightArrow = mkSym("⟶", "long right arrow", "mx-1");
export const LongLeftArrow = mkSym("⟵", "long left arrow", "mx-1");
export const LongLeftRightArrow = mkSym("⟷", "long left right arrow", "mx-1");
export const LongMapsTo = mkSym("⟼", "long maps to", "mx-1");

// Harpoons (used in chemistry / physics)
export const RightHarpoonUp = mkSym("⇀", "right harpoon up", "mx-1");
export const RightHarpoonDown = mkSym("⇁", "right harpoon down", "mx-1");
export const LeftHarpoonUp = mkSym("↼", "left harpoon up", "mx-1");
export const LeftHarpoonDown = mkSym("↽", "left harpoon down", "mx-1");
export const EquilibriumArrow = mkSym("⇌", "equilibrium arrow", "mx-1");
export const DoubleHarpoon = mkSym("⇋", "double harpoon", "mx-1");

// Curved / circular
export const CircleArrow = mkSym("↻", "clockwise circle arrow", "mx-1");
export const CircleArrowLeft = mkSym(
  "↺",
  "counter clockwise circle arrow",
  "mx-1",
);

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 13 — DOTS & ELLIPSIS
// CDots · VDots · DDots · LDots · Therefore dots
// ═══════════════════════════════════════════════════════════════════════════════

export const CDots = ({
  count = 3,
  className,
}: {
  count?: number;
  className?: string;
}) => (
  <span className={cn("mx-1 font-serif", className)} aria-label="centered dots">
    {"·".repeat(count)}
  </span>
);
export const VDots = mkSym("⋮", "vertical dots"); // vertical dots
export const DDots = mkSym("⋱", "diagonal dots"); // diagonal dots (down-right)
export const LDots = mkSym("…", "lower dots"); // baseline ellipsis
export const UpDots = mkSym("⋰", "diagonal dots up"); // diagonal dots (up-right)

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 14 — BRACKETS & INTERVALS
// AngleBracket · DoubleBracket · Interval
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Angle brackets ⟨ ⟩ — inner product, expectation, Dirac notation.
 * @example <AngleBracket>u, v</AngleBracket>  →  ⟨u, v⟩
 */
export function AngleBracket({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="math"
      aria-label="angle bracket"
      className={cn("mx-0.5 inline-flex items-center", className)}
    >
      <span className="select-none text-[1.1em] font-light">⟨</span>
      <span>{children}</span>
      <span className="select-none text-[1.1em] font-light">⟩</span>
    </span>
  );
}
AngleBracket.displayName = "AngleBracket";

/**
 * Double square brackets ⟦ ⟧ — Iverson bracket / semantic bracket.
 * @example <DoubleBracket>P</DoubleBracket>  →  ⟦P⟧
 */
export function DoubleBracket({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="math"
      aria-label="double bracket"
      className={cn("mx-0.5 inline-flex items-center", className)}
    >
      <span className="select-none text-[1.1em] font-light">⟦</span>
      <span>{children}</span>
      <span className="select-none text-[1.1em] font-light">⟧</span>
    </span>
  );
}
DoubleBracket.displayName = "DoubleBracket";

interface IntervalProps {
  a: React.ReactNode;
  b: React.ReactNode;
  /** Open left endpoint — uses ( instead of [ */
  leftOpen?: boolean;
  /** Open right endpoint — uses ) instead of ] */
  rightOpen?: boolean;
  className?: string;
}

/**
 * Interval notation — [a, b], (a, b), (a, b], [a, b).
 * @example <Interval a="0" b="1" />          →  [0, 1]
 * @example <Interval a="0" b="1" leftOpen /> →  (0, 1]
 */
export function Interval({
  a,
  b,
  leftOpen = false,
  rightOpen = false,
  className,
}: IntervalProps) {
  return (
    <span
      role="math"
      aria-label={`interval ${leftOpen ? "open" : "closed"} ${a} to ${b} ${rightOpen ? "open" : "closed"}`}
      className={cn("mx-0.5 inline-flex items-center", className)}
    >
      <span className="select-none">{leftOpen ? "(" : "["}</span>
      <span>{a}</span>
      <span className="mx-0.5 select-none">,</span>
      <span>{b}</span>
      <span className="select-none">{rightOpen ? ")" : "]"}</span>
    </span>
  );
}
Interval.displayName = "Interval";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 15 — SCRIPT / CALLIGRAPHIC LETTERS
// ℒ ℱ ℋ ℰ ℳ 𝒜 ℬ 𝒞 … — transforms, spaces, operators
// ═══════════════════════════════════════════════════════════════════════════════

const mkScript = (letter: string, label: string) => {
  const S = ({ className }: { className?: string }) => (
    <span
      className={cn("mx-0.5 font-serif italic", className)}
      aria-label={label}
    >
      {letter}
    </span>
  );
  S.displayName = label
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
  return S;
};

export const ScriptA = mkScript("𝒜", "script A");
export const ScriptB = mkScript("ℬ", "script B");
export const ScriptC = mkScript("𝒞", "script C");
export const ScriptD = mkScript("𝒟", "script D");
export const ScriptE = mkScript("ℰ", "script E"); // also Euler/energy
export const ScriptF = mkScript("ℱ", "script F"); // Fourier transform ℱ
export const ScriptG = mkScript("𝒢", "script G");
export const ScriptH = mkScript("ℋ", "script H"); // Hilbert space ℋ
export const ScriptI = mkScript("ℐ", "script I");
export const ScriptJ = mkScript("𝒥", "script J");
export const ScriptK = mkScript("𝒦", "script K");
export const ScriptL = mkScript("ℒ", "script L"); // Laplace transform ℒ
export const ScriptM = mkScript("ℳ", "script M");
export const ScriptN = mkScript("𝒩", "script N");
export const ScriptO = mkScript("𝒪", "script O"); // Big-O notation 𝒪
export const ScriptP = mkScript("𝒫", "script P");
export const ScriptQ = mkScript("𝒬", "script Q");
export const ScriptR = mkScript("ℛ", "script R"); // Riemann ℛ
export const ScriptS = mkScript("𝒮", "script S");
export const ScriptT = mkScript("𝒯", "script T");
export const ScriptU = mkScript("𝒰", "script U");
export const ScriptV = mkScript("𝒱", "script V");
export const ScriptW = mkScript("𝒲", "script W");
export const ScriptX = mkScript("𝒳", "script X");
export const ScriptY = mkScript("𝒴", "script Y");
export const ScriptZ = mkScript("𝒵", "script Z");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 16 — PHYSICS
// HBar · Bra · Ket · BraKet · Angstrom · Planck
// ═══════════════════════════════════════════════════════════════════════════════

/** ℏ — reduced Planck constant (h-bar). */
export const HBar = mkSym("ℏ", "h bar");

/** Ångström Å — unit of length (0.1 nm). */
export const Angstrom = mkSym("Å", "angstrom");

/** ∞ alias for physics context — use <Inf /> directly instead. */
export const InfSym = Inf;

/**
 * Bra ⟨ψ| — left part of Dirac bra-ket notation.
 * @example <Bra>psi</Bra>  →  ⟨ψ|
 */
export function Bra({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="math"
      aria-label="bra"
      className={cn("mx-0.5 inline-flex items-center", className)}
    >
      <span className="select-none text-[1.1em] font-light">⟨</span>
      <span>{children}</span>
      <span className="select-none font-light">|</span>
    </span>
  );
}
Bra.displayName = "Bra";

/**
 * Ket |φ⟩ — right part of Dirac bra-ket notation.
 * @example <Ket>phi</Ket>  →  |φ⟩
 */
export function Ket({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="math"
      aria-label="ket"
      className={cn("mx-0.5 inline-flex items-center", className)}
    >
      <span className="select-none font-light">|</span>
      <span>{children}</span>
      <span className="select-none text-[1.1em] font-light">⟩</span>
    </span>
  );
}
Ket.displayName = "Ket";

/**
 * BraKet ⟨ψ|φ⟩ — full Dirac inner product.
 * @example <BraKet bra={<Psi />} ket={<Phi />} />
 */
export function BraKet({
  bra,
  ket,
  className,
}: {
  bra: React.ReactNode;
  ket: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      role="math"
      aria-label="bra ket"
      className={cn("mx-0.5 inline-flex items-center", className)}
    >
      <span className="select-none text-[1.1em] font-light">⟨</span>
      <span>{bra}</span>
      <span className="mx-px select-none font-light">|</span>
      <span>{ket}</span>
      <span className="select-none text-[1.1em] font-light">⟩</span>
    </span>
  );
}
BraKet.displayName = "BraKet";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 17 — EXTRA OPERATORS
// DirectSum · Hadamard · CircledDiv · Star · Bullet · Dagger · Bowtie
// ═══════════════════════════════════════════════════════════════════════════════

export const DirectSum = mkSym("⊕", "direct sum", "mx-1");
export const Hadamard = mkSym("⊙", "hadamard product", "mx-1");
export const CircledDiv = mkSym("⊘", "circled division", "mx-1");
export const CircledStar = mkSym("⊛", "circled star", "mx-1");
export const CircledPlus = mkSym("⊕", "circled plus", "mx-1");
export const CircledMinus = mkSym("⊖", "circled minus", "mx-1");
export const CircledTimes = mkSym("⊗", "circled times", "mx-1"); // alias OTimes
export const WreathProduct = mkSym("≀", "wreath product", "mx-1");
export const Star = mkSym("⋆", "star", "mx-1");
export const Bullet = mkSym("•", "bullet", "mx-1");
export const Dagger = mkSym("†", "dagger", "mx-1");
export const DoubleDagger = mkSym("‡", "double dagger", "mx-1");
export const Diamond = mkSym("⋄", "diamond", "mx-1");
export const Bowtie = mkSym("⋈", "bowtie", "mx-1");
export const Amalg = mkSym("∐", "coproduct amalg", "mx-1");
export const SmallInt = mkSym("∫", "integral small", "mx-0.5"); // inline ∫ without sizing
export const DoubleInt = mkSym("∬", "double integral", "mx-1");
export const TripleInt = mkSym("∭", "triple integral", "mx-1");
export const SurfaceInt = mkSym("∯", "surface integral", "mx-1");
export const VolumeInt = mkSym("∰", "volume integral", "mx-1");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 18 — PRIME NOTATION
// Prime · DoublePrime · TriplePrime · PrimeOf
// ═══════════════════════════════════════════════════════════════════════════════

/** Single prime ′ — derivative or transpose shorthand. */
export const Prime = mkSym("′", "prime", "text-[0.75em]");
/** Double prime ″ — second derivative. */
export const DoublePrime = mkSym("″", "double prime", "text-[0.75em]");
/** Triple prime ‴ — third derivative. */
export const TriplePrime = mkSym("‴", "triple prime", "text-[0.75em]");

/**
 * PrimeOf — renders an expression immediately followed by a prime.
 * @example <PrimeOf>f</PrimeOf>  →  f′
 */
export function PrimeOf({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-start", className)}>
      <span>{children}</span>
      <span className="text-[0.75em] leading-none">′</span>
    </span>
  );
}
PrimeOf.displayName = "PrimeOf";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 19 — CHEMISTRY
// ReactionArrow · DoubleReactionArrow · GasMarker · PrecipitateMarker · Bond
// ═══════════════════════════════════════════════════════════════════════════════

export const ReactionArrow = mkSym("⟶", "reaction arrow", "mx-1");
export const GasMarker = mkSym("↑", "gas product", "mx-1");
export const PrecipitateMarker = mkSym("↓", "precipitate", "mx-1");
export const ChemEquilibrium = mkSym("⇌", "chemical equilibrium", "mx-1");

/** Single bond — (–). */
export const SingleBond = mkSym("—", "single bond", "mx-px");
/** Double bond — (=). */
export const DoubleBond = mkSym("═", "double bond", "mx-px");
/** Triple bond — (≡). */
export const TripleBond = mkSym("≡", "triple bond", "mx-px");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 20 — NUMBER THEORY & MISC OPERATORS
// Lcm · Gcd · Ord · Sgn · Arg · Re · Im · Res
// ═══════════════════════════════════════════════════════════════════════════════

const mkOp2 = (name: string) => {
  const Op = ({
    children,
    className,
  }: {
    children?: React.ReactNode;
    className?: string;
  }) => (
    <span
      className={cn("mx-0.5 inline-flex items-center align-middle", className)}
    >
      <span className="font-serif text-sm leading-none">{name}</span>
      {children && <span className="ml-0.5">{children}</span>}
    </span>
  );
  Op.displayName = name.charAt(0).toUpperCase() + name.slice(1);
  return Op;
};

export const Lcm = mkOp2("lcm");
export const Gcd = mkOp2("gcd");
export const Ord = mkOp2("ord");
export const Sgn = mkOp2("sgn");
export const Arg = mkOp2("arg");
export const Re = mkOp2("Re");
export const Im = mkOp2("Im");
export const Res = mkOp2("Res");
export const Sup = mkOp2("sup");
export const Inf2 = mkOp2("inf"); // infimum operator (not infinity)
export const Max = mkOp2("max");
export const Min = mkOp2("min");
export const Ker = mkOp2("ker");
export const Hom = mkOp2("Hom");
export const End = mkOp2("End");
export const Aut = mkOp2("Aut");
export const Der = mkOp2("der");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 21 — GEOMETRIC SHAPES (additional)
// Circle · Square · Rhombus · Pentagon · Hexagon
// ═══════════════════════════════════════════════════════════════════════════════

export const Circle = mkSym("○", "circle", "mx-1");
export const FilledCircle = mkSym("●", "filled circle", "mx-1");
export const Square = mkSym("□", "square", "mx-1");
export const FilledSquare = mkSym("■", "filled square", "mx-1");
export const Rhombus = mkSym("◇", "rhombus", "mx-1");
export const FilledRhombus = mkSym("◆", "filled rhombus", "mx-1");
export const Pentagon = mkSym("⬠", "pentagon", "mx-1");
export const Hexagon = mkSym("⬡", "hexagon", "mx-1");
export const Ellipse = mkSym("⬭", "ellipse", "mx-1");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 22 — MISCELLANEOUS MATH SYMBOLS
// Aleph · Beth · Gimel · Daleth · Planck · Euler e · Imaginary i
// ═══════════════════════════════════════════════════════════════════════════════

export const Aleph = mkSym("ℵ", "aleph", "font-serif");
export const Beth = mkSym("ℶ", "beth", "font-serif");
export const Gimel = mkSym("ℷ", "gimel", "font-serif");
export const Daleth = mkSym("ℸ", "daleth", "font-serif");
export const PlanckH = mkSym("h", "Planck constant", "font-serif italic");
export const EulerE = mkSym("e", "Euler number", "font-serif italic");
export const ImagUnit = mkSym("i", "imaginary unit", "font-serif italic");
export const NaturalLog = mkSym("e", "natural log base", "font-serif italic"); // alias EulerE
export const PartialDiff = mkSym("∂", "partial differential");
export const Grad = mkSym("∇", "gradient nabla"); // alias Nabla
export const Lapl = mkSym("△", "Laplacian delta");
export const FlatSymbol = mkSym("♭", "flat");
export const SharpSymbol = mkSym("♯", "sharp");
export const NaturalSymbol = mkSym("♮", "natural");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 23 — SUBSCRIPT / SUPERSCRIPT SHORTHANDS
// SubZero · SubOne · SubTwo · PowTwo · PowThree · PowN
// ═══════════════════════════════════════════════════════════════════════════════

/** Subscript 0 — convenience for Sub with sub="0". */
export function SubZero({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Sub sub="0" className={className}>
      {children}
    </Sub>
  );
}
SubZero.displayName = "SubZero";

/** Subscript 1. */
export function SubOne({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Sub sub="1" className={className}>
      {children}
    </Sub>
  );
}
SubOne.displayName = "SubOne";

/** Subscript 2. */
export function SubTwo({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Sub sub="2" className={className}>
      {children}
    </Sub>
  );
}
SubTwo.displayName = "SubTwo";

/** Squared — x². */
export function Squared({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Pow exp="2" className={className}>
      {children}
    </Pow>
  );
}
Squared.displayName = "Squared";

/** Cubed — x³. */
export function Cubed({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Pow exp="3" className={className}>
      {children}
    </Pow>
  );
}
Cubed.displayName = "Cubed";

/** Inverse — x⁻¹. */
export function Inverse({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Pow exp="−1" className={className}>
      {children}
    </Pow>
  );
}
Inverse.displayName = "Inverse";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 24 — SCHOOL ARITHMETIC (K–8)
// Division · Times · Percent · Permille · Proportion · PlusMinus already above
// ═══════════════════════════════════════════════════════════════════════════════

/** + — addition / unary plus. */
export const Plus = mkSym("+", "plus", "mx-1");
/** − — subtraction / unary minus (U+2212, not a hyphen). */
export const Minus = mkSym("−", "minus", "mx-1");
/** × — multiplication (inline). */
export const Mul = mkSym("×", "multiply", "mx-1");
/** / — inline division. */
export const Div = mkSym("/", "division slash", "mx-0.5");
/** % — modulus operator (programming). Distinct from Percent (math). */
export const Modulus = mkSym("%", "modulus", "mx-0.5");
/** ÷ — division / obelus. Used in elementary school arithmetic. */
export const Division = mkSym("÷", "division", "mx-1");
/** × — multiplication cross. General multiplication (vs Cross which is vector). */
export const Times = mkSym("×", "times", "mx-1");
/** % — percent. */
export const Percent = mkSym("%", "percent", "mx-0.5");
/** ‰ — per mille (per thousand). */
export const Permille = mkSym("‰", "per mille", "mx-0.5");
/** ∷ — proportion. a : b ∷ c : d means a/b = c/d. */
export const Proportion = mkSym("∷", "proportion", "mx-1");
/** ∶ — ratio colon. Slightly different weight from plain colon. */
export const Ratio = mkSym("∶", "ratio", "mx-0.5");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 25 — GEOMETRY (additional)
// MeasuredAngle · SphericalAngle · Diameter · NotParallel · RightTriangle
// LeftAngle · Congruent already above as Cong
// ═══════════════════════════════════════════════════════════════════════════════

/** ∡ — measured angle (arc with endpoint). Different from ∠ (plane angle). */
export const MeasuredAngle = mkSym("∡", "measured angle", "mx-1 font-serif");
/** ∢ — spherical angle. */
export const SphericalAngle = mkSym("∢", "spherical angle", "mx-1 font-serif");
/** ∟ — right angle (square corner symbol). */
export const RightAngleCorner = mkSym(
  "∟",
  "right angle corner",
  "mx-1 font-serif",
);
/** ⊿ — right triangle. */
export const RightTriangle = mkSym("⊿", "right triangle", "mx-1");
/** ∦ — not parallel. */
export const NotParallel = mkSym("∦", "not parallel", "mx-1");
/** ⌀ — diameter symbol. Used in engineering drawings. */
export const Diameter = mkSym("⌀", "diameter", "mx-1");
/** ≅ — congruent (geometry). Same as Cong, aliased with geometric label. */
export const GeoCong = mkSym("≅", "congruent", "mx-1");
/** ∼ — similar (geometry). Same as Sim, aliased with geometric label. */
export const GeoSim = mkSym("∼", "similar", "mx-1");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 26 — SET THEORY (additional)
// ProperSubset · ProperSuperset · BigUnion · BigIntersect · BigAnd · BigOr
// ═══════════════════════════════════════════════════════════════════════════════

/** ⊊ — proper subset (strict, ≠). */
export const ProperSubset = mkSym("⊊", "proper subset", "mx-1");
/** ⊋ — proper superset (strict, ≠). */
export const ProperSupset = mkSym("⊋", "proper superset", "mx-1");
/** ⊄ — not a subset. */
export const NotSubset = mkSym("⊄", "not subset", "mx-1");
/** ⊅ — not a superset. */
export const NotSupset = mkSym("⊅", "not superset", "mx-1");
/** ≁ — not similar. */
export const NotSim = mkSym("≁", "not similar", "mx-1");
/** ≇ — not congruent. */
export const NotCong = mkSym("≇", "not congruent", "mx-1");

/** ⋂ — n-ary big intersection (for indexed families). */
export function BigIntersect({ from, to, children, className }: BoundedProps) {
  return (
    <span
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      <span className="inline-flex flex-col items-center">
        {to !== undefined && (
          <span className="text-[0.62em] leading-none">{to}</span>
        )}
        <span className="select-none text-[1.6em] leading-none">⋂</span>
        {from !== undefined && (
          <span className="text-[0.62em] leading-none">{from}</span>
        )}
      </span>
      {children && <span className="ml-0.5">{children}</span>}
    </span>
  );
}
BigIntersect.displayName = "BigIntersect";

/** ⋃ — n-ary big union (for indexed families). */
export function BigUnion({ from, to, children, className }: BoundedProps) {
  return (
    <span
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      <span className="inline-flex flex-col items-center">
        {to !== undefined && (
          <span className="text-[0.62em] leading-none">{to}</span>
        )}
        <span className="select-none text-[1.6em] leading-none">⋃</span>
        {from !== undefined && (
          <span className="text-[0.62em] leading-none">{from}</span>
        )}
      </span>
      {children && <span className="ml-0.5">{children}</span>}
    </span>
  );
}
BigUnion.displayName = "BigUnion";

/** ⋀ — n-ary big AND (logic). */
export function BigAnd({ from, to, children, className }: BoundedProps) {
  return (
    <span
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      <span className="inline-flex flex-col items-center">
        {to !== undefined && (
          <span className="text-[0.62em] leading-none">{to}</span>
        )}
        <span className="select-none text-[1.5em] leading-none">⋀</span>
        {from !== undefined && (
          <span className="text-[0.62em] leading-none">{from}</span>
        )}
      </span>
      {children && <span className="ml-0.5">{children}</span>}
    </span>
  );
}
BigAnd.displayName = "BigAnd";

/** ⋁ — n-ary big OR (logic). */
export function BigOr({ from, to, children, className }: BoundedProps) {
  return (
    <span
      className={cn("mx-1 inline-flex items-center align-middle", className)}
    >
      <span className="inline-flex flex-col items-center">
        {to !== undefined && (
          <span className="text-[0.62em] leading-none">{to}</span>
        )}
        <span className="select-none text-[1.5em] leading-none">⋁</span>
        {from !== undefined && (
          <span className="text-[0.62em] leading-none">{from}</span>
        )}
      </span>
      {children && <span className="ml-0.5">{children}</span>}
    </span>
  );
}
BigOr.displayName = "BigOr";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 27 — EQUALITY & DEFINITION RELATIONS
// Approaches · DefinedAs · Corresponds · AssignEq · Equiv already above
// ═══════════════════════════════════════════════════════════════════════════════

/** ≐ — approaches / equal at limit. */
export const Approaches = mkSym("≐", "approaches", "mx-1");
/** ≜ — defined as (equal by definition). Common in engineering. */
export const DefinedAs = mkSym("≜", "defined as", "mx-1");
/** ≝ — equal by definition (alternate). */
export const EqDef = mkSym("≝", "equal by definition", "mx-1");
/** ≙ — corresponds to. */
export const Corresponds = mkSym("≙", "corresponds to", "mx-1");
/** ≚ — equiangular. */
export const Equiangular = mkSym("≚", "equiangular", "mx-1");
/** ≃ — asymptotically equal. */
export const AsympEq = mkSym("≃", "asymptotically equal", "mx-1");
/** ≄ — not asymptotically equal. */
export const NotAsympEq = mkSym("≄", "not asymptotically equal", "mx-1");
/** ≶ — less than or greater than (not equal). */
export const LessGreater = mkSym("≶", "less or greater", "mx-1");
/** ≷ — greater than or less than. */
export const GreaterLess = mkSym("≷", "greater or less", "mx-1");
/** ≺ — precedes. */
export const Prec = mkSym("≺", "precedes", "mx-1");
/** ≻ — succeeds. */
export const Succ = mkSym("≻", "succeeds", "mx-1");
/** ≼ — precedes or equal. */
export const PrecEq = mkSym("≼", "precedes or equal", "mx-1");
/** ≽ — succeeds or equal. */
export const SuccEq = mkSym("≽", "succeeds or equal", "mx-1");

/**
 * DefEq — := assignment / definition.
 * Renders ":=" with math spacing.
 * @example f(x) <DefEq /> x² + 1
 */
export function DefEq({ className }: { className?: string }) {
  return (
    <span className={cn("mx-1 font-serif", className)} aria-label="defined as">
      :=
    </span>
  );
}
DefEq.displayName = "DefEq";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 28 — ENGINEERING & ANALYSIS
// Convolution · Differential · Real/Imaginary symbols · ScriptL already above
// ═══════════════════════════════════════════════════════════════════════════════

/** ∗ — convolution star. Distinct from multiplication ×. */
export const Convo = mkSym("∗", "convolution", "mx-1");
/** ℓ — script-l. Length, ell function, ℓp spaces. */
export const ScriptEll = mkSym("ℓ", "script ell", "mx-0.5 font-serif italic");
/** ℜ — Real part symbol (Fraktur R). Alternate to Re operator. */
export const FrakR = mkSym("ℜ", "real part fraktur", "mx-0.5 font-serif");
/** ℑ — Imaginary part symbol (Fraktur I). Alternate to Im operator. */
export const FrakI = mkSym("ℑ", "imaginary part fraktur", "mx-0.5 font-serif");
/** ℘ — Weierstrass p. */
export const Weierstrass = mkSym(
  "℘",
  "Weierstrass p",
  "mx-0.5 font-serif italic",
);
/** ℓ² — square-summable sequences space shorthand. */
export const EllTwo = mkSym("ℓ²", "ell two space", "mx-0.5 font-serif italic");

/**
 * Differential — styled roman 'd' for calculus differentials.
 * Renders upright (non-italic) d to distinguish from variable d.
 * @example <Differential />x  →  dx  (with upright d)
 */
export function Differential({ className }: { className?: string }) {
  return (
    <span
      className={cn("mx-px not-italic font-sans text-[0.95em]", className)}
      aria-label="differential"
    >
      d
    </span>
  );
}
Differential.displayName = "Differential";

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 29 — LOGIC & PROOF (additional)
// Contradiction · TruthVal · Models · Entails
// ═══════════════════════════════════════════════════════════════════════════════

/** ⊨ — models / semantic entailment. */
export const Models = mkSym("⊨", "models", "mx-1");
/** ⊬ — does not prove. */
export const NotTurnstile = mkSym("⊬", "does not prove", "mx-1");
/** ⊭ — does not model. */
export const NotModels = mkSym("⊭", "does not model", "mx-1");
/** ⊤ — top / tautology / true. */
export const Top = mkSym("⊤", "top true", "mx-1");
/** ⊥ — bottom / contradiction / false. Same as Perpendicular in context. */
export const Bot = mkSym("⊥", "bottom false", "mx-1");
/** ↯ — contradiction (lightning bolt). */
export const Contradiction = mkSym("↯", "contradiction", "mx-1");
/** □ — end of proof (Halmos tombstone). Alternative to QED. */
export const Tombstone = mkSym("□", "tombstone QED", "mx-1");

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 30 — MISSING GREEK & VARIANTS
// Varsigma · Varepsilon · Varphi · Vartheta · Varpi · Varrho · Digamma
// ═══════════════════════════════════════════════════════════════════════════════

const mkGreekVariant = (char: string, name: string) => {
  const G = ({ className }: { className?: string }) => (
    <span
      className={cn("mx-px font-serif italic", className)}
      aria-label={name}
    >
      {char}
    </span>
  );
  G.displayName = name;
  return G;
};

export const Varsigma = mkGreekVariant("ς", "varsigma"); // alternate σ
export const Varepsilon = mkGreekVariant("ε", "varepsilon"); // alternate ε (more open)
export const Varphi = mkGreekVariant("φ", "varphi"); // alternate φ
export const Vartheta = mkGreekVariant("ϑ", "vartheta"); // alternate θ
export const Varpi = mkGreekVariant("ϖ", "varpi"); // alternate π
export const Varrho = mkGreekVariant("ϱ", "varrho"); // alternate ρ
export const Digamma = mkGreekVariant("ϝ", "digamma"); // archaic Greek
