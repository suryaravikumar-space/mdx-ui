"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import * as P from "@/components/mdx/math-primitives";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Entry {
  component: string;
  category: string;
  usage: string;
  description: string;
  preview: React.ReactNode;
}

// ─── Category labels ──────────────────────────────────────────────────────────

const CAT_LABEL: Record<string, string> = {
  composition: "Composition",
  arithmetic: "Arithmetic",
  calculus: "Calculus",
  trig: "Trig & Functions",
  algebra: "Algebra",
  sets: "Set Theory",
  logic: "Logic",
  "linear-algebra": "Linear Algebra",
  probability: "Probability",
  greek: "Greek",
  relations: "Relations",
  definition: "Definition",
  accents: "Accents",
  arrows: "Arrows",
  brackets: "Brackets",
  geometry: "Geometry",
  physics: "Physics",
  chemistry: "Chemistry",
  script: "Script",
  operators: "Operators",
  dots: "Dots",
  cs: "CS / Algorithms",
  school: "School",
  shorthands: "Shorthands",
  misc: "Misc",
};

// ─── Catalog ──────────────────────────────────────────────────────────────────

const CATALOG: Entry[] = [
  // ── Composition ───────────────────────────────────────────────────────────
  {
    component: "Expr",
    category: "composition",
    usage: '<Expr>x <Pow exp="2">dx</Pow></Expr>',
    description:
      "Inline composition wrapper — groups text, symbols, and components into one node",
    preview: (
      <P.Expr>
        x <P.Pow exp="2">dx</P.Pow>
      </P.Expr>
    ),
  },
  // ── Arithmetic ────────────────────────────────────────────────────────────
  {
    component: "Frac",
    category: "arithmetic",
    usage: '<Frac num="a" den="b" />',
    description: "Vertical fraction a/b",
    preview: <P.Frac num="a" den="b" />,
  },
  {
    component: "Pow",
    category: "arithmetic",
    usage: '<Pow exp="2">x</Pow>',
    description: "Superscript exponent x²",
    preview: <P.Pow exp="2">x</P.Pow>,
  },
  {
    component: "Sub",
    category: "arithmetic",
    usage: '<Sub sub="n">x</Sub>',
    description: "Subscript x_n",
    preview: <P.Sub sub="n">x</P.Sub>,
  },
  {
    component: "Sqrt",
    category: "arithmetic",
    usage: "<Sqrt>x</Sqrt>",
    description: "Square root √x with overbar",
    preview: <P.Sqrt>x</P.Sqrt>,
  },
  {
    component: "Abs",
    category: "arithmetic",
    usage: "<Abs>x</Abs>",
    description: "Absolute value |x|",
    preview: <P.Abs>x</P.Abs>,
  },
  {
    component: "Brace",
    category: "arithmetic",
    usage: "<Brace>x + y</Brace>",
    description: "Curly brace grouping {x+y}",
    preview: <P.Brace>x+y</P.Brace>,
  },
  {
    component: "Paren",
    category: "arithmetic",
    usage: "<Paren>x + y</Paren>",
    description: "Auto-sized parentheses",
    preview: <P.Paren>x+y</P.Paren>,
  },
  {
    component: "Inf",
    category: "arithmetic",
    usage: "<Inf />",
    description: "Infinity ∞",
    preview: <P.Inf />,
  },
  {
    component: "Deg",
    category: "arithmetic",
    usage: "<Deg>90</Deg>",
    description: "Degree symbol 90°",
    preview: <P.Deg>90</P.Deg>,
  },
  {
    component: "PlusMinus",
    category: "arithmetic",
    usage: "<PlusMinus />",
    description: "Plus-minus ±",
    preview: <P.PlusMinus />,
  },
  {
    component: "MinusPlus",
    category: "arithmetic",
    usage: "<MinusPlus />",
    description: "Minus-plus ∓",
    preview: <P.MinusPlus />,
  },

  // ── School ────────────────────────────────────────────────────────────────
  {
    component: "Times",
    category: "school",
    usage: "<Times />",
    description: "Multiplication cross ×",
    preview: <P.Times />,
  },
  {
    component: "Division",
    category: "school",
    usage: "<Division />",
    description: "Division sign ÷",
    preview: <P.Division />,
  },
  {
    component: "Percent",
    category: "school",
    usage: "<Percent />",
    description: "Percent sign %",
    preview: <P.Percent />,
  },
  {
    component: "Permille",
    category: "school",
    usage: "<Permille />",
    description: "Per mille ‰",
    preview: <P.Permille />,
  },
  {
    component: "Proportion",
    category: "school",
    usage: "<Proportion />",
    description: "Proportion symbol ∷",
    preview: <P.Proportion />,
  },
  {
    component: "Ratio",
    category: "school",
    usage: "<Ratio />",
    description: "Ratio colon ∶",
    preview: <P.Ratio />,
  },

  // ── Calculus ──────────────────────────────────────────────────────────────
  {
    component: "Integral",
    category: "calculus",
    usage: '<Integral from="a" to="b">f dx</Integral>',
    description: "Definite integral ∫ₐᵇ",
    preview: (
      <P.Integral from="a" to="b">
        f dx
      </P.Integral>
    ),
  },
  {
    component: "ContourIntegral",
    category: "calculus",
    usage: "<ContourIntegral>f dz</ContourIntegral>",
    description: "Contour integral ∮",
    preview: <P.ContourIntegral>f dz</P.ContourIntegral>,
  },
  {
    component: "DoubleInt",
    category: "calculus",
    usage: "<DoubleInt />",
    description: "Double integral ∬",
    preview: <P.DoubleInt />,
  },
  {
    component: "TripleInt",
    category: "calculus",
    usage: "<TripleInt />",
    description: "Triple integral ∭",
    preview: <P.TripleInt />,
  },
  {
    component: "Sum",
    category: "calculus",
    usage: '<Sum from="i=0" to="n">aᵢ</Sum>',
    description: "Summation Σ with bounds",
    preview: (
      <P.Sum from="i=0" to="n">
        aᵢ
      </P.Sum>
    ),
  },
  {
    component: "Prod",
    category: "calculus",
    usage: '<Prod from="i=1" to="n">aᵢ</Prod>',
    description: "Product Π with bounds",
    preview: (
      <P.Prod from="i=1" to="n">
        aᵢ
      </P.Prod>
    ),
  },
  {
    component: "Lim",
    category: "calculus",
    usage: '<Lim sub="x → 0">f(x)</Lim>',
    description: "Limit lim_{x→0}",
    preview: <P.Lim sub="x→0">f(x)</P.Lim>,
  },
  {
    component: "Limsup",
    category: "calculus",
    usage: '<Limsup sub="n→∞">aₙ</Limsup>',
    description: "Limit superior lim sup",
    preview: <P.Limsup sub="n→∞">aₙ</P.Limsup>,
  },
  {
    component: "Liminf",
    category: "calculus",
    usage: '<Liminf sub="n→∞">aₙ</Liminf>',
    description: "Limit inferior lim inf",
    preview: <P.Liminf sub="n→∞">aₙ</P.Liminf>,
  },
  {
    component: "Deriv",
    category: "calculus",
    usage: '<Deriv of="y" />',
    description: "Leibniz derivative d/dy",
    preview: <P.Deriv of="y" />,
  },
  {
    component: "PDeriv",
    category: "calculus",
    usage: '<PDeriv of="f" />',
    description: "Partial derivative ∂f/∂x",
    preview: <P.PDeriv of="f" />,
  },
  {
    component: "Nabla",
    category: "calculus",
    usage: "<Nabla />",
    description: "Nabla / gradient ∇",
    preview: <P.Nabla />,
  },
  {
    component: "Laplacian",
    category: "calculus",
    usage: "<Laplacian />",
    description: "Laplace operator ∇²",
    preview: <P.Laplacian />,
  },
  {
    component: "Differential",
    category: "calculus",
    usage: "<Differential />x",
    description: "Upright d for differentials",
    preview: (
      <>
        <P.Differential />x
      </>
    ),
  },
  {
    component: "Overbrace",
    category: "calculus",
    usage: '<Overbrace label="n">a+b</Overbrace>',
    description: "Brace above with label",
    preview: <P.Overbrace label="n">a+b</P.Overbrace>,
  },
  {
    component: "Underbrace",
    category: "calculus",
    usage: '<Underbrace label="n">a+b</Underbrace>',
    description: "Brace below with label",
    preview: <P.Underbrace label="n">a+b</P.Underbrace>,
  },

  // ── Trig & Functions ──────────────────────────────────────────────────────
  {
    component: "Sin",
    category: "trig",
    usage: "<Sin />",
    description: "Sine function",
    preview: <P.Sin />,
  },
  {
    component: "Cos",
    category: "trig",
    usage: "<Cos />",
    description: "Cosine function",
    preview: <P.Cos />,
  },
  {
    component: "Tan",
    category: "trig",
    usage: "<Tan />",
    description: "Tangent function",
    preview: <P.Tan />,
  },
  {
    component: "Cot",
    category: "trig",
    usage: "<Cot />",
    description: "Cotangent",
    preview: <P.Cot />,
  },
  {
    component: "Sec",
    category: "trig",
    usage: "<Sec />",
    description: "Secant",
    preview: <P.Sec />,
  },
  {
    component: "Csc",
    category: "trig",
    usage: "<Csc />",
    description: "Cosecant",
    preview: <P.Csc />,
  },
  {
    component: "ArcSin",
    category: "trig",
    usage: "<ArcSin />",
    description: "Inverse sine",
    preview: <P.ArcSin />,
  },
  {
    component: "ArcCos",
    category: "trig",
    usage: "<ArcCos />",
    description: "Inverse cosine",
    preview: <P.ArcCos />,
  },
  {
    component: "ArcTan",
    category: "trig",
    usage: "<ArcTan />",
    description: "Inverse tangent",
    preview: <P.ArcTan />,
  },
  {
    component: "Sinh",
    category: "trig",
    usage: "<Sinh />",
    description: "Hyperbolic sine",
    preview: <P.Sinh />,
  },
  {
    component: "Cosh",
    category: "trig",
    usage: "<Cosh />",
    description: "Hyperbolic cosine",
    preview: <P.Cosh />,
  },
  {
    component: "Tanh",
    category: "trig",
    usage: "<Tanh />",
    description: "Hyperbolic tangent",
    preview: <P.Tanh />,
  },
  {
    component: "Log",
    category: "trig",
    usage: "<Log />",
    description: "Logarithm",
    preview: <P.Log />,
  },
  {
    component: "Ln",
    category: "trig",
    usage: "<Ln />",
    description: "Natural log ln",
    preview: <P.Ln />,
  },
  {
    component: "Exp",
    category: "trig",
    usage: "<Exp />",
    description: "Exponential exp",
    preview: <P.Exp />,
  },

  // ── Algebra & Combinatorics ───────────────────────────────────────────────
  {
    component: "Factorial",
    category: "algebra",
    usage: "<Factorial>n</Factorial>",
    description: "Factorial n!",
    preview: <P.Factorial>n</P.Factorial>,
  },
  {
    component: "Choose",
    category: "algebra",
    usage: '<Choose n="n" k="k" />',
    description: "Binomial coefficient C(n,k)",
    preview: <P.Choose n="n" k="k" />,
  },
  {
    component: "Floor",
    category: "algebra",
    usage: "<Floor>x</Floor>",
    description: "Floor ⌊x⌋",
    preview: <P.Floor>x</P.Floor>,
  },
  {
    component: "Ceil",
    category: "algebra",
    usage: "<Ceil>x</Ceil>",
    description: "Ceiling ⌈x⌉",
    preview: <P.Ceil>x</P.Ceil>,
  },
  {
    component: "Mod",
    category: "algebra",
    usage: '<Mod a="a" n="n" />',
    description: "Modulo a mod n",
    preview: <P.Mod a="a" n="n" />,
  },
  {
    component: "GCD",
    category: "algebra",
    usage: '<GCD a="a" b="b" />',
    description: "GCD(a, b)",
    preview: <P.GCD a="a" b="b" />,
  },
  {
    component: "LCM",
    category: "algebra",
    usage: '<LCM a="a" b="b" />',
    description: "LCM(a, b)",
    preview: <P.LCM a="a" b="b" />,
  },
  {
    component: "Perm",
    category: "algebra",
    usage: '<Perm n="n" r="r" />',
    description: "Permutation P(n,r)",
    preview: <P.Perm n="n" r="r" />,
  },

  // ── Set Theory ────────────────────────────────────────────────────────────
  {
    component: "In",
    category: "sets",
    usage: "<In />",
    description: "Element of ∈",
    preview: <P.In />,
  },
  {
    component: "NotIn",
    category: "sets",
    usage: "<NotIn />",
    description: "Not element of ∉",
    preview: <P.NotIn />,
  },
  {
    component: "Subset",
    category: "sets",
    usage: "<Subset />",
    description: "Subset ⊂",
    preview: <P.Subset />,
  },
  {
    component: "SubsetEq",
    category: "sets",
    usage: "<SubsetEq />",
    description: "Subset or equal ⊆",
    preview: <P.SubsetEq />,
  },
  {
    component: "ProperSubset",
    category: "sets",
    usage: "<ProperSubset />",
    description: "Proper subset ⊊",
    preview: <P.ProperSubset />,
  },
  {
    component: "Union",
    category: "sets",
    usage: "<Union />",
    description: "Set union ∪",
    preview: <P.Union />,
  },
  {
    component: "Intersect",
    category: "sets",
    usage: "<Intersect />",
    description: "Set intersection ∩",
    preview: <P.Intersect />,
  },
  {
    component: "SetMinus",
    category: "sets",
    usage: "<SetMinus />",
    description: "Set minus ∖",
    preview: <P.SetMinus />,
  },
  {
    component: "Empty",
    category: "sets",
    usage: "<Empty />",
    description: "Empty set ∅",
    preview: <P.Empty />,
  },
  {
    component: "NN",
    category: "sets",
    usage: "<NN />",
    description: "Natural numbers ℕ",
    preview: <P.NN />,
  },
  {
    component: "ZZ",
    category: "sets",
    usage: "<ZZ />",
    description: "Integers ℤ",
    preview: <P.ZZ />,
  },
  {
    component: "QQ",
    category: "sets",
    usage: "<QQ />",
    description: "Rationals ℚ",
    preview: <P.QQ />,
  },
  {
    component: "RR",
    category: "sets",
    usage: "<RR />",
    description: "Reals ℝ",
    preview: <P.RR />,
  },
  {
    component: "CC",
    category: "sets",
    usage: "<CC />",
    description: "Complex numbers ℂ",
    preview: <P.CC />,
  },
  {
    component: "BigUnion",
    category: "sets",
    usage: '<BigUnion from="i=1" to="n">Aᵢ</BigUnion>',
    description: "Indexed union ⋃",
    preview: (
      <P.BigUnion from="i=1" to="n">
        Aᵢ
      </P.BigUnion>
    ),
  },
  {
    component: "BigIntersect",
    category: "sets",
    usage: '<BigIntersect from="i=1" to="n">Aᵢ</BigIntersect>',
    description: "Indexed intersection ⋂",
    preview: (
      <P.BigIntersect from="i=1" to="n">
        Aᵢ
      </P.BigIntersect>
    ),
  },
  {
    component: "SetOf",
    category: "sets",
    usage: '<SetOf variable="x" condition="x > 0" />',
    description: "Set-builder {x | cond}",
    preview: <P.SetOf variable="x" condition="x > 0" />,
  },
  {
    component: "Cardinality",
    category: "sets",
    usage: "<Cardinality>A</Cardinality>",
    description: "Cardinality |A|",
    preview: <P.Cardinality>A</P.Cardinality>,
  },
  {
    component: "PowerSet",
    category: "sets",
    usage: "<PowerSet>A</PowerSet>",
    description: "Power set 𝒫(A)",
    preview: <P.PowerSet>A</P.PowerSet>,
  },

  // ── Logic & Proof ─────────────────────────────────────────────────────────
  {
    component: "And",
    category: "logic",
    usage: "<And />",
    description: "Logical AND ∧",
    preview: <P.And />,
  },
  {
    component: "Or",
    category: "logic",
    usage: "<Or />",
    description: "Logical OR ∨",
    preview: <P.Or />,
  },
  {
    component: "Not",
    category: "logic",
    usage: "<Not />",
    description: "Logical NOT ¬",
    preview: <P.Not />,
  },
  {
    component: "Xor",
    category: "logic",
    usage: "<Xor />",
    description: "XOR ⊕",
    preview: <P.Xor />,
  },
  {
    component: "Implies",
    category: "logic",
    usage: "<Implies />",
    description: "Implication ⟹",
    preview: <P.Implies />,
  },
  {
    component: "Iff",
    category: "logic",
    usage: "<Iff />",
    description: "Biconditional ⟺",
    preview: <P.Iff />,
  },
  {
    component: "ForAll",
    category: "logic",
    usage: "<ForAll />",
    description: "Universal quantifier ∀",
    preview: <P.ForAll />,
  },
  {
    component: "Exists",
    category: "logic",
    usage: "<Exists />",
    description: "Existential ∃",
    preview: <P.Exists />,
  },
  {
    component: "NotExists",
    category: "logic",
    usage: "<NotExists />",
    description: "Does not exist ∄",
    preview: <P.NotExists />,
  },
  {
    component: "Therefore",
    category: "logic",
    usage: "<Therefore />",
    description: "Therefore ∴",
    preview: <P.Therefore />,
  },
  {
    component: "Because",
    category: "logic",
    usage: "<Because />",
    description: "Because ∵",
    preview: <P.Because />,
  },
  {
    component: "Turnstile",
    category: "logic",
    usage: "<Turnstile />",
    description: "Proves ⊢",
    preview: <P.Turnstile />,
  },
  {
    component: "Models",
    category: "logic",
    usage: "<Models />",
    description: "Models / entails ⊨",
    preview: <P.Models />,
  },
  {
    component: "Top",
    category: "logic",
    usage: "<Top />",
    description: "Tautology / true ⊤",
    preview: <P.Top />,
  },
  {
    component: "Bot",
    category: "logic",
    usage: "<Bot />",
    description: "Contradiction / false ⊥",
    preview: <P.Bot />,
  },
  {
    component: "QED",
    category: "logic",
    usage: "<QED />",
    description: "End of proof ∎",
    preview: <P.QED />,
  },
  {
    component: "BigAnd",
    category: "logic",
    usage: '<BigAnd from="i=1" to="n">Pᵢ</BigAnd>',
    description: "N-ary AND ⋀",
    preview: (
      <P.BigAnd from="i=1" to="n">
        Pᵢ
      </P.BigAnd>
    ),
  },
  {
    component: "BigOr",
    category: "logic",
    usage: '<BigOr from="i=1" to="n">Pᵢ</BigOr>',
    description: "N-ary OR ⋁",
    preview: (
      <P.BigOr from="i=1" to="n">
        Pᵢ
      </P.BigOr>
    ),
  },
  {
    component: "Cases",
    category: "logic",
    usage: '<Cases><Case expr="x" when="x ≥ 0" /></Cases>',
    description: "Piecewise / cases function",
    preview: (
      <P.Cases>
        <P.Case expr="x" when="x≥0" />
        <P.Case expr={<>−x</>} when="x<0" />
      </P.Cases>
    ),
  },

  // ── Linear Algebra ────────────────────────────────────────────────────────
  {
    component: "Vec",
    category: "linear-algebra",
    usage: "<Vec>v</Vec>",
    description: "Vector with arrow",
    preview: <P.Vec>v</P.Vec>,
  },
  {
    component: "Norm",
    category: "linear-algebra",
    usage: "<Norm>v</Norm>",
    description: "Norm ‖v‖",
    preview: <P.Norm>v</P.Norm>,
  },
  {
    component: "Dot",
    category: "linear-algebra",
    usage: "<Dot />",
    description: "Dot product ·",
    preview: <P.Dot />,
  },
  {
    component: "Cross",
    category: "linear-algebra",
    usage: "<Cross />",
    description: "Cross product ×",
    preview: <P.Cross />,
  },
  {
    component: "Transpose",
    category: "linear-algebra",
    usage: "<Transpose>A</Transpose>",
    description: "Matrix transpose Aᵀ",
    preview: <P.Transpose>A</P.Transpose>,
  },
  {
    component: "Det",
    category: "linear-algebra",
    usage: "<Det>A</Det>",
    description: "Determinant |A|",
    preview: <P.Det>A</P.Det>,
  },
  {
    component: "Matrix",
    category: "linear-algebra",
    usage: '<Matrix rows={[["a","b"],["c","d"]]} />',
    description: "2×2 matrix with brackets",
    preview: (
      <P.Matrix
        rows={[
          ["a", "b"],
          ["c", "d"],
        ]}
      />
    ),
  },
  {
    component: "SpanOp",
    category: "linear-algebra",
    usage: "<SpanOp>v₁,v₂</SpanOp>",
    description: "Span of vectors",
    preview: <P.SpanOp>v</P.SpanOp>,
  },
  {
    component: "Rank",
    category: "linear-algebra",
    usage: "<Rank>A</Rank>",
    description: "Rank of matrix",
    preview: <P.Rank>A</P.Rank>,
  },
  {
    component: "Dim",
    category: "linear-algebra",
    usage: "<Dim>V</Dim>",
    description: "Dimension of space",
    preview: <P.Dim>V</P.Dim>,
  },

  // ── Probability & Statistics ──────────────────────────────────────────────
  {
    component: "Prob",
    category: "probability",
    usage: "<Prob>A</Prob>",
    description: "Probability P(A)",
    preview: <P.Prob>A</P.Prob>,
  },
  {
    component: "CondProb",
    category: "probability",
    usage: "<CondProb event={<>A</>} given={<>B</>} />",
    description: "Conditional P(A|B)",
    preview: <P.CondProb event={<>A</>} given={<>B</>} />,
  },
  {
    component: "Expected",
    category: "probability",
    usage: "<Expected>X</Expected>",
    description: "Expected value 𝔼[X]",
    preview: <P.Expected>X</P.Expected>,
  },
  {
    component: "Variance",
    category: "probability",
    usage: "<Variance>X</Variance>",
    description: "Variance Var(X)",
    preview: <P.Variance>X</P.Variance>,
  },
  {
    component: "StdDev",
    category: "probability",
    usage: "<StdDev>X</StdDev>",
    description: "Standard deviation SD(X)",
    preview: <P.StdDev>X</P.StdDev>,
  },
  {
    component: "Cov",
    category: "probability",
    usage: "<Cov x={<>X</>} y={<>Y</>} />",
    description: "Covariance Cov(X,Y)",
    preview: <P.Cov x={<>X</>} y={<>Y</>} />,
  },
  {
    component: "Dist",
    category: "probability",
    usage: '<Dist name="N" params={<>μ,σ</>} />',
    description: "Distribution X ~ N(μ,σ)",
    preview: <P.Dist name="N" params={<>μ,σ</>} />,
  },

  // ── Greek Letters ─────────────────────────────────────────────────────────
  {
    component: "Alpha",
    category: "greek",
    usage: "<Alpha />",
    description: "α alpha",
    preview: <P.Alpha />,
  },
  {
    component: "Beta",
    category: "greek",
    usage: "<Beta />",
    description: "β beta",
    preview: <P.Beta />,
  },
  {
    component: "Gamma",
    category: "greek",
    usage: "<Gamma />",
    description: "γ gamma",
    preview: <P.Gamma />,
  },
  {
    component: "GDelta",
    category: "greek",
    usage: "<GDelta />",
    description: "δ delta",
    preview: <P.GDelta />,
  },
  {
    component: "Epsilon",
    category: "greek",
    usage: "<Epsilon />",
    description: "ε epsilon",
    preview: <P.Epsilon />,
  },
  {
    component: "Zeta",
    category: "greek",
    usage: "<Zeta />",
    description: "ζ zeta",
    preview: <P.Zeta />,
  },
  {
    component: "Eta",
    category: "greek",
    usage: "<Eta />",
    description: "η eta",
    preview: <P.Eta />,
  },
  {
    component: "Theta",
    category: "greek",
    usage: "<Theta />",
    description: "θ theta",
    preview: <P.Theta />,
  },
  {
    component: "Lambda",
    category: "greek",
    usage: "<Lambda />",
    description: "λ lambda",
    preview: <P.Lambda />,
  },
  {
    component: "Mu",
    category: "greek",
    usage: "<Mu />",
    description: "μ mu",
    preview: <P.Mu />,
  },
  {
    component: "Nu",
    category: "greek",
    usage: "<Nu />",
    description: "ν nu",
    preview: <P.Nu />,
  },
  {
    component: "Xi",
    category: "greek",
    usage: "<Xi />",
    description: "ξ xi",
    preview: <P.Xi />,
  },
  {
    component: "PiSym",
    category: "greek",
    usage: "<PiSym />",
    description: "π pi",
    preview: <P.PiSym />,
  },
  {
    component: "Rho",
    category: "greek",
    usage: "<Rho />",
    description: "ρ rho",
    preview: <P.Rho />,
  },
  {
    component: "SigmaSym",
    category: "greek",
    usage: "<SigmaSym />",
    description: "σ sigma",
    preview: <P.SigmaSym />,
  },
  {
    component: "Tau",
    category: "greek",
    usage: "<Tau />",
    description: "τ tau",
    preview: <P.Tau />,
  },
  {
    component: "Phi",
    category: "greek",
    usage: "<Phi />",
    description: "φ phi",
    preview: <P.Phi />,
  },
  {
    component: "Chi",
    category: "greek",
    usage: "<Chi />",
    description: "χ chi",
    preview: <P.Chi />,
  },
  {
    component: "Psi",
    category: "greek",
    usage: "<Psi />",
    description: "ψ psi",
    preview: <P.Psi />,
  },
  {
    component: "Omega",
    category: "greek",
    usage: "<Omega />",
    description: "ω omega",
    preview: <P.Omega />,
  },
  {
    component: "GammaU",
    category: "greek",
    usage: "<GammaU />",
    description: "Γ Gamma",
    preview: <P.GammaU />,
  },
  {
    component: "DeltaU",
    category: "greek",
    usage: "<DeltaU />",
    description: "Δ Delta",
    preview: <P.DeltaU />,
  },
  {
    component: "ThetaU",
    category: "greek",
    usage: "<ThetaU />",
    description: "Θ Theta",
    preview: <P.ThetaU />,
  },
  {
    component: "LambdaU",
    category: "greek",
    usage: "<LambdaU />",
    description: "Λ Lambda",
    preview: <P.LambdaU />,
  },
  {
    component: "SigmaU",
    category: "greek",
    usage: "<SigmaU />",
    description: "Σ Sigma",
    preview: <P.SigmaU />,
  },
  {
    component: "PhiU",
    category: "greek",
    usage: "<PhiU />",
    description: "Φ Phi",
    preview: <P.PhiU />,
  },
  {
    component: "PsiU",
    category: "greek",
    usage: "<PsiU />",
    description: "Ψ Psi",
    preview: <P.PsiU />,
  },
  {
    component: "OmegaU",
    category: "greek",
    usage: "<OmegaU />",
    description: "Ω Omega",
    preview: <P.OmegaU />,
  },
  {
    component: "Varphi",
    category: "greek",
    usage: "<Varphi />",
    description: "ϕ varphi",
    preview: <P.Varphi />,
  },
  {
    component: "Vartheta",
    category: "greek",
    usage: "<Vartheta />",
    description: "ϑ vartheta",
    preview: <P.Vartheta />,
  },

  // ── Relations ─────────────────────────────────────────────────────────────
  {
    component: "Eq",
    category: "relations",
    usage: "<Eq />",
    description: "Equals =",
    preview: <P.Eq />,
  },
  {
    component: "Neq",
    category: "relations",
    usage: "<Neq />",
    description: "Not equal ≠",
    preview: <P.Neq />,
  },
  {
    component: "Leq",
    category: "relations",
    usage: "<Leq />",
    description: "Less or equal ≤",
    preview: <P.Leq />,
  },
  {
    component: "Geq",
    category: "relations",
    usage: "<Geq />",
    description: "Greater or equal ≥",
    preview: <P.Geq />,
  },
  {
    component: "Ll",
    category: "relations",
    usage: "<Ll />",
    description: "Much less than ≪",
    preview: <P.Ll />,
  },
  {
    component: "Gg",
    category: "relations",
    usage: "<Gg />",
    description: "Much greater than ≫",
    preview: <P.Gg />,
  },
  {
    component: "Approx",
    category: "relations",
    usage: "<Approx />",
    description: "Approximately ≈",
    preview: <P.Approx />,
  },
  {
    component: "Equiv",
    category: "relations",
    usage: "<Equiv />",
    description: "Equivalent ≡",
    preview: <P.Equiv />,
  },
  {
    component: "Sim",
    category: "relations",
    usage: "<Sim />",
    description: "Similar ∼",
    preview: <P.Sim />,
  },
  {
    component: "Propto",
    category: "relations",
    usage: "<Propto />",
    description: "Proportional ∝",
    preview: <P.Propto />,
  },
  {
    component: "Prec",
    category: "relations",
    usage: "<Prec />",
    description: "Precedes ≺",
    preview: <P.Prec />,
  },
  {
    component: "Succ",
    category: "relations",
    usage: "<Succ />",
    description: "Succeeds ≻",
    preview: <P.Succ />,
  },
  {
    component: "Divides",
    category: "relations",
    usage: "<Divides />",
    description: "Divides ∣",
    preview: <P.Divides />,
  },

  // ── Definition ────────────────────────────────────────────────────────────
  {
    component: "DefEq",
    category: "definition",
    usage: "<DefEq />",
    description: "Defined as :=",
    preview: <P.DefEq />,
  },
  {
    component: "DefinedAs",
    category: "definition",
    usage: "<DefinedAs />",
    description: "Defined as ≜",
    preview: <P.DefinedAs />,
  },
  {
    component: "Approaches",
    category: "definition",
    usage: "<Approaches />",
    description: "Approaches ≐",
    preview: <P.Approaches />,
  },
  {
    component: "Corresponds",
    category: "definition",
    usage: "<Corresponds />",
    description: "Corresponds to ≙",
    preview: <P.Corresponds />,
  },

  // ── Accents ───────────────────────────────────────────────────────────────
  {
    component: "Bar",
    category: "accents",
    usage: "<Bar>x</Bar>",
    description: "Overline / mean x̄",
    preview: <P.Bar>x</P.Bar>,
  },
  {
    component: "Hat",
    category: "accents",
    usage: "<Hat>x</Hat>",
    description: "Hat accent x̂",
    preview: <P.Hat>x</P.Hat>,
  },
  {
    component: "Tilde",
    category: "accents",
    usage: "<Tilde>x</Tilde>",
    description: "Tilde accent x̃",
    preview: <P.Tilde>x</P.Tilde>,
  },
  {
    component: "DotAccent",
    category: "accents",
    usage: "<DotAccent>x</DotAccent>",
    description: "Single dot (Newton) ẋ",
    preview: <P.DotAccent>x</P.DotAccent>,
  },
  {
    component: "DDot",
    category: "accents",
    usage: "<DDot>x</DDot>",
    description: "Double dot (Newton) ẍ",
    preview: <P.DDot>x</P.DDot>,
  },
  {
    component: "PrimeOf",
    category: "accents",
    usage: "<PrimeOf>f</PrimeOf>",
    description: "Prime notation f′",
    preview: <P.PrimeOf>f</P.PrimeOf>,
  },
  {
    component: "Prime",
    category: "accents",
    usage: "f<Prime />",
    description: "Inline prime ′",
    preview: (
      <>
        f<P.Prime />
      </>
    ),
  },
  {
    component: "Vec",
    category: "accents",
    usage: "<Vec>v</Vec>",
    description: "Vector arrow overhead",
    preview: <P.Vec>v</P.Vec>,
  },

  // ── Arrows ────────────────────────────────────────────────────────────────
  {
    component: "Arrow",
    category: "arrows",
    usage: "<Arrow />",
    description: "Right arrow →",
    preview: <P.Arrow />,
  },
  {
    component: "LeftArrow",
    category: "arrows",
    usage: "<LeftArrow />",
    description: "Left arrow ←",
    preview: <P.LeftArrow />,
  },
  {
    component: "LeftRightArrow",
    category: "arrows",
    usage: "<LeftRightArrow />",
    description: "Left-right ↔",
    preview: <P.LeftRightArrow />,
  },
  {
    component: "DoubleRightArrow",
    category: "arrows",
    usage: "<DoubleRightArrow />",
    description: "Double right ⇒",
    preview: <P.DoubleRightArrow />,
  },
  {
    component: "DoubleLeftRightArrow",
    category: "arrows",
    usage: "<DoubleLeftRightArrow />",
    description: "Double both ⇔",
    preview: <P.DoubleLeftRightArrow />,
  },
  {
    component: "LongRightArrow",
    category: "arrows",
    usage: "<LongRightArrow />",
    description: "Long right ⟶",
    preview: <P.LongRightArrow />,
  },
  {
    component: "MapsTo",
    category: "arrows",
    usage: "<MapsTo />",
    description: "Maps to ↦",
    preview: <P.MapsTo />,
  },
  {
    component: "HookRightArrow",
    category: "arrows",
    usage: "<HookRightArrow />",
    description: "Hook right ↪",
    preview: <P.HookRightArrow />,
  },
  {
    component: "EquilibriumArrow",
    category: "arrows",
    usage: "<EquilibriumArrow />",
    description: "Equilibrium ⇌",
    preview: <P.EquilibriumArrow />,
  },

  // ── Brackets ──────────────────────────────────────────────────────────────
  {
    component: "AngleBracket",
    category: "brackets",
    usage: "<AngleBracket>u, v</AngleBracket>",
    description: "Angle brackets ⟨u, v⟩",
    preview: <P.AngleBracket>u, v</P.AngleBracket>,
  },
  {
    component: "Interval",
    category: "brackets",
    usage: '<Interval a="0" b="1" />',
    description: "Interval [0, 1]",
    preview: <P.Interval a="0" b="1" />,
  },
  {
    component: "DoubleBracket",
    category: "brackets",
    usage: "<DoubleBracket>P</DoubleBracket>",
    description: "Iverson bracket ⟦P⟧",
    preview: <P.DoubleBracket>P</P.DoubleBracket>,
  },
  {
    component: "BraKet",
    category: "brackets",
    usage: "<BraKet bra={<>ψ</>} ket={<>φ</>} />",
    description: "Dirac ⟨ψ|φ⟩",
    preview: <P.BraKet bra={<>ψ</>} ket={<>φ</>} />,
  },

  // ── Geometry ──────────────────────────────────────────────────────────────
  {
    component: "Angle",
    category: "geometry",
    usage: "<Angle>ABC</Angle>",
    description: "Angle ∠ABC",
    preview: <P.Angle>ABC</P.Angle>,
  },
  {
    component: "MeasuredAngle",
    category: "geometry",
    usage: "<MeasuredAngle />",
    description: "Measured angle ∡",
    preview: <P.MeasuredAngle />,
  },
  {
    component: "Triangle",
    category: "geometry",
    usage: "<Triangle>ABC</Triangle>",
    description: "Triangle △ABC",
    preview: <P.Triangle>ABC</P.Triangle>,
  },
  {
    component: "RightTriangle",
    category: "geometry",
    usage: "<RightTriangle />",
    description: "Right triangle ⊿",
    preview: <P.RightTriangle />,
  },
  {
    component: "Segment",
    category: "geometry",
    usage: "<Segment>AB</Segment>",
    description: "Line segment AB̄",
    preview: <P.Segment>AB</P.Segment>,
  },
  {
    component: "Ray",
    category: "geometry",
    usage: "<Ray>AB</Ray>",
    description: "Ray AB→",
    preview: <P.Ray>AB</P.Ray>,
  },
  {
    component: "Arc",
    category: "geometry",
    usage: "<Arc>AB</Arc>",
    description: "Arc ⌢ over AB",
    preview: <P.Arc>AB</P.Arc>,
  },
  {
    component: "Parallel",
    category: "geometry",
    usage: "<Parallel />",
    description: "Parallel ∥",
    preview: <P.Parallel />,
  },
  {
    component: "Perpendicular",
    category: "geometry",
    usage: "<Perpendicular />",
    description: "Perpendicular ⊥",
    preview: <P.Perpendicular />,
  },
  {
    component: "Diameter",
    category: "geometry",
    usage: "<Diameter />",
    description: "Diameter symbol ⌀",
    preview: <P.Diameter />,
  },
  {
    component: "GeoCong",
    category: "geometry",
    usage: "<GeoCong />",
    description: "Congruent ≅",
    preview: <P.GeoCong />,
  },
  {
    component: "GeoSim",
    category: "geometry",
    usage: "<GeoSim />",
    description: "Similar ∼",
    preview: <P.GeoSim />,
  },

  // ── Physics ───────────────────────────────────────────────────────────────
  {
    component: "HBar",
    category: "physics",
    usage: "<HBar />",
    description: "Reduced Planck ℏ",
    preview: <P.HBar />,
  },
  {
    component: "Bra",
    category: "physics",
    usage: "<Bra>ψ</Bra>",
    description: "Bra ⟨ψ|",
    preview: <P.Bra>ψ</P.Bra>,
  },
  {
    component: "Ket",
    category: "physics",
    usage: "<Ket>φ</Ket>",
    description: "Ket |φ⟩",
    preview: <P.Ket>φ</P.Ket>,
  },

  // ── Chemistry ─────────────────────────────────────────────────────────────
  {
    component: "ReactionArrow",
    category: "chemistry",
    usage: "<ReactionArrow />",
    description: "Reaction ⟶",
    preview: <P.ReactionArrow />,
  },
  {
    component: "ChemEquilibrium",
    category: "chemistry",
    usage: "<ChemEquilibrium />",
    description: "Equilibrium ⇌",
    preview: <P.ChemEquilibrium />,
  },
  {
    component: "GasMarker",
    category: "chemistry",
    usage: "<GasMarker />",
    description: "Gas evolves ↑",
    preview: <P.GasMarker />,
  },
  {
    component: "PrecipitateMarker",
    category: "chemistry",
    usage: "<PrecipitateMarker />",
    description: "Precipitate ↓",
    preview: <P.PrecipitateMarker />,
  },
  {
    component: "SingleBond",
    category: "chemistry",
    usage: "C<SingleBond />H",
    description: "Single bond —",
    preview: (
      <>
        C<P.SingleBond />H
      </>
    ),
  },
  {
    component: "DoubleBond",
    category: "chemistry",
    usage: "C<DoubleBond />O",
    description: "Double bond ═",
    preview: (
      <>
        C<P.DoubleBond />O
      </>
    ),
  },
  {
    component: "TripleBond",
    category: "chemistry",
    usage: "N<TripleBond />N",
    description: "Triple bond ≡",
    preview: (
      <>
        N<P.TripleBond />N
      </>
    ),
  },

  // ── Script Letters ────────────────────────────────────────────────────────
  {
    component: "ScriptL",
    category: "script",
    usage: "<ScriptL />",
    description: "ℒ — Laplace transform",
    preview: <P.ScriptL />,
  },
  {
    component: "ScriptF",
    category: "script",
    usage: "<ScriptF />",
    description: "ℱ — Fourier transform",
    preview: <P.ScriptF />,
  },
  {
    component: "ScriptO",
    category: "script",
    usage: "<ScriptO />",
    description: "𝒪 — complexity notation",
    preview: <P.ScriptO />,
  },
  {
    component: "ScriptH",
    category: "script",
    usage: "<ScriptH />",
    description: "ℋ — Hilbert space",
    preview: <P.ScriptH />,
  },
  {
    component: "ScriptEll",
    category: "script",
    usage: "<ScriptEll />",
    description: "ℓ — ell-p spaces",
    preview: <P.ScriptEll />,
  },
  {
    component: "ScriptA",
    category: "script",
    usage: "<ScriptA />",
    description: "𝒜 — script A",
    preview: <P.ScriptA />,
  },
  {
    component: "ScriptE",
    category: "script",
    usage: "<ScriptE />",
    description: "ℰ — Euler / energy",
    preview: <P.ScriptE />,
  },

  // ── Operators ─────────────────────────────────────────────────────────────
  {
    component: "DirectSum",
    category: "operators",
    usage: "<DirectSum />",
    description: "Direct sum ⊕",
    preview: <P.DirectSum />,
  },
  {
    component: "OTimes",
    category: "operators",
    usage: "<OTimes />",
    description: "Tensor product ⊗",
    preview: <P.OTimes />,
  },
  {
    component: "Convo",
    category: "operators",
    usage: "<Convo />",
    description: "Convolution ∗",
    preview: <P.Convo />,
  },
  {
    component: "Compose",
    category: "operators",
    usage: "<Compose />",
    description: "Composition ∘",
    preview: <P.Compose />,
  },
  {
    component: "Hadamard",
    category: "operators",
    usage: "<Hadamard />",
    description: "Hadamard product ⊙",
    preview: <P.Hadamard />,
  },
  {
    component: "Aleph",
    category: "operators",
    usage: "<Aleph />",
    description: "Aleph ℵ (cardinality)",
    preview: <P.Aleph />,
  },

  // ── Dots ──────────────────────────────────────────────────────────────────
  {
    component: "CDots",
    category: "dots",
    usage: "<CDots />",
    description: "Centered dots ⋯",
    preview: <P.CDots />,
  },
  {
    component: "VDots",
    category: "dots",
    usage: "<VDots />",
    description: "Vertical dots ⋮",
    preview: <P.VDots />,
  },
  {
    component: "DDots",
    category: "dots",
    usage: "<DDots />",
    description: "Diagonal dots ⋱",
    preview: <P.DDots />,
  },
  {
    component: "LDots",
    category: "dots",
    usage: "<LDots />",
    description: "Baseline ellipsis …",
    preview: <P.LDots />,
  },

  // ── CS / Algorithms ───────────────────────────────────────────────────────
  {
    component: "BigO",
    category: "cs",
    usage: "<BigO />(n)",
    description: "Big-O upper bound O(n)",
    preview: (
      <>
        <P.BigO />
        (n)
      </>
    ),
  },
  {
    component: "BigTheta",
    category: "cs",
    usage: "<BigTheta />(n)",
    description: "Big-Theta tight bound Θ(n)",
    preview: (
      <>
        <P.BigTheta />
        (n)
      </>
    ),
  },
  {
    component: "BigOmega",
    category: "cs",
    usage: "<BigOmega />(n)",
    description: "Big-Omega lower bound Ω(n)",
    preview: (
      <>
        <P.BigOmega />
        (n)
      </>
    ),
  },
  {
    component: "LittleO",
    category: "cs",
    usage: "<LittleO />(n)",
    description: "little-o strict upper o(n)",
    preview: (
      <>
        <P.LittleO />
        (n)
      </>
    ),
  },
  {
    component: "LittleOmega",
    category: "cs",
    usage: "<LittleOmega />(n)",
    description: "little-omega strict lower ω(n)",
    preview: (
      <>
        <P.LittleOmega />
        (n)
      </>
    ),
  },

  // ── Shorthands ────────────────────────────────────────────────────────────
  {
    component: "Squared",
    category: "shorthands",
    usage: "<Squared>x</Squared>",
    description: "x² square shorthand",
    preview: <P.Squared>x</P.Squared>,
  },
  {
    component: "Cubed",
    category: "shorthands",
    usage: "<Cubed>x</Cubed>",
    description: "x³ cube shorthand",
    preview: <P.Cubed>x</P.Cubed>,
  },
  {
    component: "Inverse",
    category: "shorthands",
    usage: "<Inverse>A</Inverse>",
    description: "A⁻¹ inverse shorthand",
    preview: <P.Inverse>A</P.Inverse>,
  },
  {
    component: "SubZero",
    category: "shorthands",
    usage: "<SubZero>x</SubZero>",
    description: "x₀ subscript zero",
    preview: <P.SubZero>x</P.SubZero>,
  },
];

// ─── Component ────────────────────────────────────────────────────────────────

export function SymbolBrowser() {
  const [search, setSearch] = React.useState("");
  const [activeCategory, setActiveCategory] = React.useState("all");
  const [copied, setCopied] = React.useState<string | null>(null);

  const categories = React.useMemo(() => {
    const seen = new Set<string>();
    CATALOG.forEach((e) => seen.add(e.category));
    return [...seen];
  }, []);

  const filtered = React.useMemo(() => {
    const q = search.toLowerCase().trim();
    return CATALOG.filter((e) => {
      if (activeCategory !== "all" && e.category !== activeCategory)
        return false;
      if (!q) return true;
      return (
        e.component.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.usage.toLowerCase().includes(q)
      );
    });
  }, [search, activeCategory]);

  const groups = React.useMemo(() => {
    if (activeCategory !== "all" || search) {
      return { [activeCategory]: filtered };
    }
    const g: Record<string, Entry[]> = {};
    filtered.forEach((e) => {
      if (!g[e.category]) g[e.category] = [];
      g[e.category].push(e);
    });
    return g;
  }, [filtered, activeCategory, search]);

  function copy(usage: string) {
    navigator.clipboard.writeText(usage).catch(() => {});
    setCopied(usage);
    setTimeout(() => setCopied(null), 1400);
  }

  return (
    <div className="my-6 space-y-4">
      {/* Search */}
      <input
        type="search"
        placeholder="Search by component name, description, or usage…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border bg-background px-4 py-2.5 text-sm outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
      />

      {/* Category pills */}
      <div
        className="
    flex gap-2 overflow-x-auto pb-1
    [&::-webkit-scrollbar]:h-[5px]
    [&::-webkit-scrollbar-thumb]:rounded-full
    [&::-webkit-scrollbar-thumb]:bg-gray-400
  "
      >
        {["all", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors",
              activeCategory === cat
                ? "bg-foreground text-background"
                : "border text-muted-foreground hover:border-foreground hover:text-foreground",
            )}
          >
            {cat === "all" ? "All" : (CAT_LABEL[cat] ?? cat)}
          </button>
        ))}
      </div>

      {/* Count */}
      <p className="text-xs text-muted-foreground">
        {filtered.length} component{filtered.length !== 1 ? "s" : ""}
        {search ? ` matching "${search}"` : ""}
      </p>

      {/* Grid groups */}
      <div className="space-y-8">
        {Object.entries(groups).map(([cat, entries]) =>
          entries.length === 0 ? null : (
            <div key={cat}>
              {activeCategory === "all" && !search && (
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {CAT_LABEL[cat] ?? cat}
                </h3>
              )}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {entries.map((entry) => (
                  <div
                    key={`${entry.component}-${entry.category}`}
                    className="flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground"
                  >
                    {/* Live preview */}
                    <div className="flex min-h-[60px] items-center justify-center bg-muted/30 px-3 py-4 text-[1.05em]">
                      {entry.preview}
                    </div>

                    {/* Name + description */}
                    <div className="flex flex-col gap-0.5 px-3 py-2">
                      <span className="font-mono text-xs font-semibold">
                        {entry.component}
                      </span>
                      <span className="text-[0.68rem] leading-snug text-muted-foreground">
                        {entry.description}
                      </span>
                    </div>

                    {/* Usage / copy */}
                    <button
                      onClick={() => copy(entry.usage)}
                      title="Click to copy"
                      className="border-t px-3 py-2 text-left font-mono text-[0.62rem] text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
                    >
                      {copied === entry.usage ? "✓ copied!" : entry.usage}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ),
        )}
      </div>

      {filtered.length === 0 && (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No components match &ldquo;{search}&rdquo;
        </p>
      )}
    </div>
  );
}
