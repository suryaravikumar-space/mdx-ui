"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import * as P from "@/components/mdx/math-primitives";
import * as Fig from "@/components/mdx/geometry-2d";
import * as Elec from "@/components/mdx/electronics";
import { Grid, GridCell, GridLine } from "@/components/mdx/grid";

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
  "geometry-2d": "Geometry 2D (Visual)",
  electronics: "Electronics & Circuits",
  physics: "Physics",
  chemistry: "Chemistry",
  script: "Script",
  operators: "Operators",
  dots: "Dots",
  cs: "CS / Algorithms",
  school: "School",
  shorthands: "Shorthands",
  "math-2": "Math II (Advanced)",
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
  {
    component: "Grid",
    category: "composition",
    usage:
      '<Grid cols="auto auto" rows="auto auto">\n  <GridCell col={1} row={1}>a</GridCell>\n  <GridCell col={2} row={1}>b</GridCell>\n  <GridLine col="1 / 3" row={2} />\n</Grid>',
    description:
      "Generic CSS grid container for div-free tabular/stepwise layouts (long division, step tables)",
    preview: (
      <Grid cols="2rem 2rem" rows="auto auto" gapX="0.5rem" gapY="0.25rem">
        <GridCell col={1} row={1}>
          a
        </GridCell>
        <GridCell col={2} row={1}>
          b
        </GridCell>
        <GridLine col="1 / 3" row={2} />
        <GridCell col={2} row={2}>
          c
        </GridCell>
      </Grid>
    ),
  },
  {
    component: "GridCell",
    category: "composition",
    usage: '<GridCell col={1} row={1} align="center">x</GridCell>',
    description:
      "Placed cell inside a Grid — position content with col/row and alignment",
    preview: (
      <Grid cols="2rem" rows="2rem">
        <GridCell col={1} row={1} align="center" className="border border-current">
          x
        </GridCell>
      </Grid>
    ),
  },
  {
    component: "GridLine",
    category: "composition",
    usage: '<GridLine col="1 / 3" row={2} />',
    description:
      "Horizontal or vertical divider line placed inside a Grid (subtraction rules, separators)",
    preview: (
      <Grid cols="2rem 2rem" rows="1rem 1rem">
        <GridCell col={1} row={1}>
          a
        </GridCell>
        <GridCell col={2} row={1}>
          b
        </GridCell>
        <GridLine col="1 / 3" row={2} />
      </Grid>
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
    component: "Plus",
    category: "school",
    usage: "<Plus />",
    description: "Plus sign +",
    preview: <P.Plus />,
  },
  {
    component: "Minus",
    category: "school",
    usage: "<Minus />",
    description: "Minus sign −",
    preview: <P.Minus />,
  },
  {
    component: "Mul",
    category: "school",
    usage: "<Mul />",
    description: "Multiplication ×",
    preview: <P.Mul />,
  },
  {
    component: "Div",
    category: "school",
    usage: "<Div />",
    description: "Division slash /",
    preview: <P.Div />,
  },
  {
    component: "Modulus",
    category: "school",
    usage: "<Modulus />",
    description: "Modulus operator % (programming)",
    preview: <P.Modulus />,
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
    usage: "<CDots /> or <CDots count={5} />",
    description:
      "Centered dots — count prop controls number of dots (default 3)",
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

  // ── Math II (Advanced) ────────────────────────────────────────────────────
  {
    component: "Complex",
    category: "math-2",
    usage: '<Complex re="a" im="b" />',
    description: "a+bi — complex number expression",
    preview: <P.Complex re="a" im="b" />,
  },
  {
    component: "ImagUnit",
    category: "math-2",
    usage: "<ImagUnit />",
    description: "i — imaginary unit",
    preview: <P.ImagUnit />,
  },
  {
    component: "EulerE",
    category: "math-2",
    usage: "<EulerE />",
    description: "e — Euler's number",
    preview: <P.EulerE />,
  },
  {
    component: "FrakR",
    category: "math-2",
    usage: "<FrakR />",
    description: "ℜ — real part (fraktur)",
    preview: <P.FrakR />,
  },
  {
    component: "FrakI",
    category: "math-2",
    usage: "<FrakI />",
    description: "ℑ — imaginary part (fraktur)",
    preview: <P.FrakI />,
  },
  {
    component: "Re",
    category: "math-2",
    usage: "<Re />",
    description: "Re — real part operator",
    preview: <P.Re />,
  },
  {
    component: "Im",
    category: "math-2",
    usage: "<Im />",
    description: "Im — imaginary part operator",
    preview: <P.Im />,
  },
  {
    component: "FF",
    category: "math-2",
    usage: "<FF />",
    description: "𝔽 — field (number system)",
    preview: <P.FF />,
  },
  {
    component: "PP",
    category: "math-2",
    usage: "<PP />",
    description: "ℙ — prime numbers",
    preview: <P.PP />,
  },
  {
    component: "Gcd",
    category: "math-2",
    usage: "<Gcd />",
    description: "gcd — greatest common divisor",
    preview: <P.Gcd />,
  },
  {
    component: "Lcm",
    category: "math-2",
    usage: "<Lcm />",
    description: "lcm — least common multiple",
    preview: <P.Lcm />,
  },
  {
    component: "Arg",
    category: "math-2",
    usage: "<Arg />",
    description: "arg — argument of complex number",
    preview: <P.Arg />,
  },
  {
    component: "Sgn",
    category: "math-2",
    usage: "<Sgn />",
    description: "sgn — sign function",
    preview: <P.Sgn />,
  },
  {
    component: "Ord",
    category: "math-2",
    usage: "<Ord />",
    description: "ord — order of element",
    preview: <P.Ord />,
  },
  {
    component: "Ker",
    category: "math-2",
    usage: "<Ker />",
    description: "ker — kernel of a map",
    preview: <P.Ker />,
  },
  {
    component: "Hom",
    category: "math-2",
    usage: "<Hom />",
    description: "Hom — homomorphism set",
    preview: <P.Hom />,
  },
  {
    component: "Aut",
    category: "math-2",
    usage: "<Aut />",
    description: "Aut — automorphism group",
    preview: <P.Aut />,
  },
  {
    component: "Der",
    category: "math-2",
    usage: "<Der />",
    description: "der — derivation operator",
    preview: <P.Der />,
  },
  {
    component: "Res",
    category: "math-2",
    usage: "<Res />",
    description: "Res — residue (complex analysis)",
    preview: <P.Res />,
  },
  {
    component: "Trace",
    category: "math-2",
    usage: "<Trace />",
    description: "tr — trace of a matrix",
    preview: <P.Trace />,
  },
  {
    component: "WreathProduct",
    category: "math-2",
    usage: "<WreathProduct />",
    description: "≀ — wreath product",
    preview: <P.WreathProduct />,
  },
  {
    component: "Weierstrass",
    category: "math-2",
    usage: "<Weierstrass />",
    description: "℘ — Weierstrass p-function",
    preview: <P.Weierstrass />,
  },
  {
    component: "SmallInt",
    category: "math-2",
    usage: "<SmallInt />",
    description: "∫ — inline integral (unsized)",
    preview: <P.SmallInt />,
  },
  {
    component: "SurfaceInt",
    category: "math-2",
    usage: "<SurfaceInt />",
    description: "∯ — surface integral",
    preview: <P.SurfaceInt />,
  },
  {
    component: "VolumeInt",
    category: "math-2",
    usage: "<VolumeInt />",
    description: "∰ — volume integral",
    preview: <P.VolumeInt />,
  },
  {
    component: "Lapl",
    category: "math-2",
    usage: "<Lapl />",
    description: "△ — Laplacian operator",
    preview: <P.Lapl />,
  },
  {
    component: "NaturalLog",
    category: "math-2",
    usage: "<NaturalLog />",
    description: "e — natural log base alias",
    preview: <P.NaturalLog />,
  },
  {
    component: "Cong",
    category: "math-2",
    usage: "<Cong />",
    description: "≅ — congruent",
    preview: <P.Cong />,
  },
  {
    component: "AsympEq",
    category: "math-2",
    usage: "<AsympEq />",
    description: "≃ — asymptotically equal",
    preview: <P.AsympEq />,
  },
  {
    component: "NotAsympEq",
    category: "math-2",
    usage: "<NotAsympEq />",
    description: "≄ — not asymptotically equal",
    preview: <P.NotAsympEq />,
  },
  {
    component: "EqDef",
    category: "math-2",
    usage: "<EqDef />",
    description: "≝ — equal by definition",
    preview: <P.EqDef />,
  },
  {
    component: "GreaterLess",
    category: "math-2",
    usage: "<GreaterLess />",
    description: "≷ — greater or less than",
    preview: <P.GreaterLess />,
  },
  {
    component: "PrecEq",
    category: "math-2",
    usage: "<PrecEq />",
    description: "≼ — precedes or equal",
    preview: <P.PrecEq />,
  },
  {
    component: "SuccEq",
    category: "math-2",
    usage: "<SuccEq />",
    description: "≽ — succeeds or equal",
    preview: <P.SuccEq />,
  },
  {
    component: "Bowtie",
    category: "math-2",
    usage: "<Bowtie />",
    description: "⋈ — bowtie / natural join",
    preview: <P.Bowtie />,
  },
  {
    component: "Amalg",
    category: "math-2",
    usage: "<Amalg />",
    description: "∐ — coproduct / amalgamation",
    preview: <P.Amalg />,
  },
  {
    component: "Bullet",
    category: "math-2",
    usage: "<Bullet />",
    description: "• — bullet operator",
    preview: <P.Bullet />,
  },
  {
    component: "Dagger",
    category: "math-2",
    usage: "<Dagger />",
    description: "† — dagger / adjoint",
    preview: <P.Dagger />,
  },
  {
    component: "DoubleDagger",
    category: "math-2",
    usage: "<DoubleDagger />",
    description: "‡ — double dagger",
    preview: <P.DoubleDagger />,
  },
  {
    component: "Tombstone",
    category: "math-2",
    usage: "<Tombstone />",
    description: "∎ — end of proof (tombstone)",
    preview: <P.Tombstone />,
  },
  {
    component: "RightAngle",
    category: "math-2",
    usage: "<RightAngle />",
    description: "⊾ — right angle symbol",
    preview: <P.RightAngle />,
  },
  {
    component: "RightAngleCorner",
    category: "math-2",
    usage: "<RightAngleCorner />",
    description: "⌐ — right angle corner",
    preview: <P.RightAngleCorner />,
  },
  {
    component: "NullOp",
    category: "math-2",
    usage: "<NullOp />",
    description: "null — null operator placeholder",
    preview: <P.NullOp />,
  },

  // ── Geometry 2D (Visual) ──────────────────────────────────────────────────
  {
    component: "FigScene",
    category: "geometry-2d",
    usage:
      "<FigScene width={200} height={150} xRange={[-3,3]} yRange={[-3,3]}>\n  {/* Fig* children */}\n</FigScene>",
    description:
      "SVG coordinate plane — wraps all Fig* primitives and provides grid + axes",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-3, 3]} />
    ),
  },
  {
    component: "FigPoint",
    category: "geometry-2d",
    usage: '<FigPoint x={2} y={1} label="A" />',
    description: "Labeled dot at a world coordinate",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-3, 3]}>
        <Fig.FigPoint x={1} y={1} label="A" />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigVector",
    category: "geometry-2d",
    usage: '<FigVector fromX={0} fromY={0} toX={2} toY={2} label="v" />',
    description:
      "Directed arrow with arrowhead from one world point to another",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-3, 3]}>
        <Fig.FigVector toX={2} toY={1.5} label="v" />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigLine",
    category: "geometry-2d",
    usage: "<FigLine x1={-2} y1={-1} x2={2} y2={1} />",
    description: "Straight line segment between two world points",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-3, 3]}>
        <Fig.FigLine x1={-2} y1={-1} x2={2} y2={1} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigSegment",
    category: "geometry-2d",
    usage: '<FigSegment x1={-1} y1={0} x2={1} y2={2} label="c" tickMarks />',
    description: "Line segment with optional midpoint label and tick marks",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-3, 3]}>
        <Fig.FigSegment x1={-1} y1={-1} x2={1} y2={1} label="c" tickMarks />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigCircle",
    category: "geometry-2d",
    usage: "<FigCircle cx={0} cy={0} r={2} />",
    description: "Circle at world center with world-unit radius",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-3, 3]}>
        <Fig.FigCircle cx={0} cy={0} r={2} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigArc",
    category: "geometry-2d",
    usage: "<FigArc cx={0} cy={0} r={1.5} startDeg={0} endDeg={120} />",
    description: "Partial arc — angles in degrees, counter-clockwise",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-3, 3]}>
        <Fig.FigArc cx={0} cy={0} r={2} startDeg={0} endDeg={90} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigAngle",
    category: "geometry-2d",
    usage:
      '<FigAngle vertex={{x:0,y:0}} from={{x:1,y:0}} to={{x:0,y:1}} label="θ" />',
    description: "Arc sweep showing the angle at a vertex between two rays",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-3, 3]}>
        <Fig.FigVector toX={2} toY={0} />
        <Fig.FigVector toX={0} toY={2} />
        <Fig.FigAngle
          vertex={{ x: 0, y: 0 }}
          from={{ x: 1, y: 0 }}
          to={{ x: 0, y: 1 }}
          label="θ"
        />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigPolygon",
    category: "geometry-2d",
    usage:
      '<FigPolygon points={[[0,0],[2,0],[1,2]]} fill="currentColor" opacity={0.15} label="△" />',
    description: "Closed polygon from world-coordinate vertices",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-3, 3]}>
        <Fig.FigPolygon
          points={[
            [0, 0],
            [2, 0],
            [1, 2],
          ]}
          fill="currentColor"
          opacity={0.15}
        />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigLabel",
    category: "geometry-2d",
    usage: "<FigLabel x={1} y={1}>A</FigLabel>",
    description: "Arbitrary text at a world coordinate",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-3, 3]}>
        <Fig.FigLabel x={0} y={0} fontSize={14}>
          O
        </Fig.FigLabel>
      </Fig.FigScene>
    ),
  },

  // ── Engineering Lines ─────────────────────────────────────────────────────
  {
    component: "FigVisibleLine",
    category: "geometry-2d",
    usage: "<FigVisibleLine x1={-2} y1={0} x2={2} y2={0} />",
    description: "Continuous thick line — visible outer edges",
    preview: (
      <Fig.FigScene
        width={120}
        height={60}
        xRange={[-3, 3]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Fig.FigVisibleLine x1={-2} y1={0} x2={2} y2={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigHiddenLine",
    category: "geometry-2d",
    usage: "<FigHiddenLine x1={-2} y1={0} x2={2} y2={0} />",
    description: "Dashed medium line — hidden / obscured features",
    preview: (
      <Fig.FigScene
        width={120}
        height={60}
        xRange={[-3, 3]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Fig.FigHiddenLine x1={-2} y1={0} x2={2} y2={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigCenterLine",
    category: "geometry-2d",
    usage: "<FigCenterLine x1={-2} y1={0} x2={2} y2={0} />",
    description: "Alternating long/short dashes — symmetry axes",
    preview: (
      <Fig.FigScene
        width={120}
        height={60}
        xRange={[-3, 3]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Fig.FigCenterLine x1={-2} y1={0} x2={2} y2={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigPhantomLine",
    category: "geometry-2d",
    usage: "<FigPhantomLine x1={-2} y1={0} x2={2} y2={0} />",
    description: "One long, two short dashes — phantom / moving parts",
    preview: (
      <Fig.FigScene
        width={120}
        height={60}
        xRange={[-3, 3]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Fig.FigPhantomLine x1={-2} y1={0} x2={2} y2={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigDimensionLine",
    category: "geometry-2d",
    usage: '<FigDimensionLine x1={-2} y1={0} x2={2} y2={0} label="4" />',
    description: "Thin line with double arrowheads — dimension measurement",
    preview: (
      <Fig.FigScene
        width={120}
        height={60}
        xRange={[-3, 3]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Fig.FigDimensionLine x1={-2} y1={0} x2={2} y2={0} label="4" />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigExtensionLine",
    category: "geometry-2d",
    usage: "<FigExtensionLine x1={0} y1={-1} x2={0} y2={1} />",
    description: "Very thin boundary line alongside dimension lines",
    preview: (
      <Fig.FigScene
        width={120}
        height={60}
        xRange={[-3, 3]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Fig.FigExtensionLine x1={-2} y1={0} x2={2} y2={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigLeaderLine",
    category: "geometry-2d",
    usage: '<FigLeaderLine x1={2} y1={1} x2={0} y2={0} note="R5" />',
    description: "Thin pointer line with arrowhead and note",
    preview: (
      <Fig.FigScene
        width={120}
        height={90}
        xRange={[-3, 3]}
        yRange={[-2, 2]}
        showGrid={false}
        showAxes={false}
      >
        <Fig.FigLeaderLine x1={2} y1={1} x2={0} y2={0} note="R5" />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigCuttingPlane",
    category: "geometry-2d",
    usage: "<FigCuttingPlane x1={-2} y1={0} x2={2} y2={0} />",
    description: "Heavy dashed line — section cut path",
    preview: (
      <Fig.FigScene
        width={120}
        height={60}
        xRange={[-3, 3]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Fig.FigCuttingPlane x1={-2} y1={0} x2={2} y2={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigBreakLine",
    category: "geometry-2d",
    usage: "<FigBreakLine x1={-2} y1={0} x2={2} y2={0} />",
    description: "Wavy line — shortened view break",
    preview: (
      <Fig.FigScene
        width={120}
        height={60}
        xRange={[-3, 3]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Fig.FigBreakLine x1={-2} y1={0} x2={2} y2={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigSectionHatch",
    category: "geometry-2d",
    usage: "<FigSectionHatch x={-1} y={-1} w={2} h={2} />",
    description: "Diagonal hatching over a rectangular region — cross-section",
    preview: (
      <Fig.FigScene
        width={120}
        height={90}
        xRange={[-3, 3]}
        yRange={[-2, 2]}
        showGrid={false}
        showAxes={false}
      >
        <Fig.FigSectionHatch x={-1} y={-1} w={2} h={2} />
      </Fig.FigScene>
    ),
  },

  // ── Curves & Conics ───────────────────────────────────────────────────────
  {
    component: "FigEllipse",
    category: "geometry-2d",
    usage: "<FigEllipse cx={0} cy={0} rx={2} ry={1} />",
    description: "Ellipse with separate x/y radii",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigEllipse cx={0} cy={0} rx={2} ry={1} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigSemicircle",
    category: "geometry-2d",
    usage: '<FigSemicircle cx={0} cy={0} r={2} orientation="top" />',
    description: "Half circle — top / bottom / left / right",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigSemicircle cx={0} cy={0} r={2} orientation="top" />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigOval",
    category: "geometry-2d",
    usage: "<FigOval cx={0} cy={0} rx={2} ry={1.2} asymmetry={0.3} />",
    description: "Egg-shaped oval with adjustable asymmetry",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigOval cx={0} cy={0} rx={2} ry={1.2} asymmetry={0.3} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigCrescent",
    category: "geometry-2d",
    usage: "<FigCrescent cx={0} cy={0} r={2} innerR={1.5} offsetX={0.8} />",
    description: "Crescent — outer circle with inner-circle bite removed",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigCrescent
          cx={0}
          cy={0}
          r={2}
          innerR={1.5}
          offsetX={0.8}
          opacity={0.4}
        />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigLens",
    category: "geometry-2d",
    usage: "<FigLens cx={0} cy={0} spread={1} r={2} />",
    description: "Lens — intersection of two equal overlapping circles",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigLens cx={0} cy={0} spread={1} r={2} opacity={0.3} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigLune",
    category: "geometry-2d",
    usage: "<FigLune cx={0} cy={0} r={2} innerR={1.6} offsetX={0.7} />",
    description:
      "Lune — region inside outer circle, outside offset inner circle",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigLune
          cx={0}
          cy={0}
          r={2}
          innerR={1.6}
          offsetX={0.7}
          opacity={0.4}
        />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigParabola",
    category: "geometry-2d",
    usage: "<FigParabola h={0} k={-2} a={0.5} />",
    description: "Parabola — vertex form y = a(x−h)² + k",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-3, 3]}>
        <Fig.FigParabola h={0} k={-2} a={0.5} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigHyperbola",
    category: "geometry-2d",
    usage: "<FigHyperbola h={0} k={0} a={1} b={1} />",
    description: "Hyperbola — both branches, standard form",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-3, 3]}>
        <Fig.FigHyperbola h={0} k={0} a={0.8} b={0.8} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigCardioid",
    category: "geometry-2d",
    usage: "<FigCardioid cx={0} cy={0} a={1.5} />",
    description: "Cardioid — heart-shaped polar curve r = a(1 + cosθ)",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-4, 2]} yRange={[-2, 2]}>
        <Fig.FigCardioid cx={-1} cy={0} a={1.5} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigLimacon",
    category: "geometry-2d",
    usage: "<FigLimacon cx={0} cy={0} a={1} b={1.5} />",
    description:
      "Limaçon — polar curve r = a + b·cosθ, shows inner loop when b > a",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigLimacon cx={0} cy={0} a={0.8} b={1.5} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigLemniscate",
    category: "geometry-2d",
    usage: "<FigLemniscate cx={0} cy={0} a={2} />",
    description: "Lemniscate — figure-eight, r² = a²·cos(2θ)",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigLemniscate cx={0} cy={0} a={2} />
      </Fig.FigScene>
    ),
  },

  // ── Triangles ─────────────────────────────────────────────────────────────
  {
    component: "FigRightAngleMarker",
    category: "geometry-2d",
    usage:
      "<FigRightAngleMarker vertex={{x:0,y:0}} leg1={{x:1,y:0}} leg2={{x:0,y:1}} />",
    description: "Small square marker at a 90° corner",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-1, 4]} yRange={[-1, 3]}>
        <Fig.FigLine x1={0} y1={0} x2={3} y2={0} />
        <Fig.FigLine x1={0} y1={0} x2={0} y2={2} />
        <Fig.FigRightAngleMarker
          vertex={{ x: 0, y: 0 }}
          leg1={{ x: 1, y: 0 }}
          leg2={{ x: 0, y: 1 }}
        />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigEquilateralTriangle",
    category: "geometry-2d",
    usage: "<FigEquilateralTriangle cx={0} cy={0} r={2} />",
    description: "Equilateral triangle — all sides equal",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigEquilateralTriangle cx={0} cy={0} r={2} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigIsoscelesTriangle",
    category: "geometry-2d",
    usage: "<FigIsoscelesTriangle cx={0} baseY={-1} base={3} height={3} />",
    description: "Isosceles triangle — two equal sides with tick marks",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigIsoscelesTriangle cx={0} baseY={-1} base={3} height={3} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigScaleneTriangle",
    category: "geometry-2d",
    usage:
      "<FigScaleneTriangle x1={-2} y1={-1} x2={2} y2={-1} x3={0.5} y3={1.5} />",
    description: "Scalene triangle — all sides different",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigScaleneTriangle
          x1={-2}
          y1={-1}
          x2={2}
          y2={-1}
          x3={0.5}
          y3={1.5}
        />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigRightTriangle",
    category: "geometry-2d",
    usage:
      '<FigRightTriangle x={-2} y={-1} base={3} height={2.5} labelA="a" labelB="b" labelC="c" />',
    description:
      "Right triangle — auto right-angle marker, optional side labels",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigRightTriangle x={-2} y={-1} base={3} height={2.5} />
      </Fig.FigScene>
    ),
  },

  // ── Quadrilaterals ────────────────────────────────────────────────────────
  {
    component: "FigRect",
    category: "geometry-2d",
    usage: "<FigRect x={-2} y={-1} w={4} h={2} />",
    description: "Rectangle — bottom-left corner + width + height",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigRect x={-2} y={-1} w={4} h={2} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigSquare",
    category: "geometry-2d",
    usage: "<FigSquare cx={0} cy={0} side={3} />",
    description: "Square — centre + side length",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigSquare cx={0} cy={0} side={3} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigRhombus",
    category: "geometry-2d",
    usage: "<FigRhombus cx={0} cy={0} dx={2} dy={1.5} />",
    description: "Rhombus — centre + half-diagonals",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigRhombus cx={0} cy={0} dx={2} dy={1.5} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigParallelogram",
    category: "geometry-2d",
    usage: "<FigParallelogram x={-2} y={-1} w={3} h={2} skew={1} />",
    description: "Parallelogram — rectangle with horizontal skew",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigParallelogram x={-2} y={-1} w={3} h={2} skew={0.8} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigTrapezoid",
    category: "geometry-2d",
    usage: "<FigTrapezoid cx={0} y={-1} topW={2} bottomW={4} h={2} />",
    description: "Trapezoid — symmetric, different top and bottom widths",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigTrapezoid cx={0} y={-1} topW={2} bottomW={4} h={2} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigKite",
    category: "geometry-2d",
    usage: "<FigKite cx={0} cy={0} topH={2} bottomH={1} halfW={1.5} />",
    description: "Kite — two pairs of adjacent equal sides",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigKite cx={0} cy={0} topH={2} bottomH={1} halfW={1.5} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigDart",
    category: "geometry-2d",
    usage: "<FigDart cx={0} cy={0} topH={2} concaveDepth={0.5} halfW={1.5} />",
    description: "Dart / chevron — concave arrowhead shape",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigDart cx={0} cy={0} topH={2} concaveDepth={0.5} halfW={1.5} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigCrossQuad",
    category: "geometry-2d",
    usage:
      "<FigCrossQuad x1={-2} y1={-1} x2={2} y2={-1} x3={-1} y3={1} x4={1} y4={1} />",
    description: "Cross-quadrilateral — self-intersecting butterfly shape",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigCrossQuad
          x1={-2}
          y1={-1}
          x2={2}
          y2={-1}
          x3={-1}
          y3={1}
          x4={1}
          y4={1}
        />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigAntiparallelogram",
    category: "geometry-2d",
    usage: "<FigAntiparallelogram x={-2} y={-1} w={3} h={2} skew={1} />",
    description: "Antiparallelogram — opposite sides cross",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigAntiparallelogram x={-2} y={-1} w={3} h={2} skew={0.8} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigCyclicQuad",
    category: "geometry-2d",
    usage: "<FigCyclicQuad cx={0} cy={0} r={2} angles={[20, 110, 200, 310]} />",
    description: "Cyclic quadrilateral — 4 vertices on a circle",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigCyclicQuad cx={0} cy={0} r={2} angles={[20, 110, 200, 310]} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigTangentialQuad",
    category: "geometry-2d",
    usage:
      "<FigTangentialQuad points={[[-2,-1],[2,-1],[1.5,1],[-1.5,1]]} inCx={0} inCy={0} inR={1} />",
    description: "Tangential quadrilateral — inscribed circle shown",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigTangentialQuad
          points={[
            [-2, -1],
            [2, -1],
            [1.5, 1],
            [-1.5, 1],
          ]}
          inCx={0}
          inCy={0}
          inR={0.9}
        />
      </Fig.FigScene>
    ),
  },

  // ── Regular Polygons ──────────────────────────────────────────────────────
  {
    component: "FigRegularPolygon",
    category: "geometry-2d",
    usage: "<FigRegularPolygon cx={0} cy={0} r={2} sides={6} />",
    description: "Regular n-gon — set sides to any number",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigRegularPolygon cx={0} cy={0} r={2} sides={6} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigPentagon",
    category: "geometry-2d",
    usage: "<FigPentagon cx={0} cy={0} r={2} />",
    description: "Regular pentagon — 5 sides",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigPentagon cx={0} cy={0} r={2} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigHexagon",
    category: "geometry-2d",
    usage: "<FigHexagon cx={0} cy={0} r={2} />",
    description: "Regular hexagon — 6 sides",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigHexagon cx={0} cy={0} r={2} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigHeptagon",
    category: "geometry-2d",
    usage: "<FigHeptagon cx={0} cy={0} r={2} />",
    description: "Regular heptagon — 7 sides",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigHeptagon cx={0} cy={0} r={2} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigOctagon",
    category: "geometry-2d",
    usage: "<FigOctagon cx={0} cy={0} r={2} />",
    description: "Regular octagon — 8 sides",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigOctagon cx={0} cy={0} r={2} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigNonagon",
    category: "geometry-2d",
    usage: "<FigNonagon cx={0} cy={0} r={2} />",
    description: "Regular nonagon — 9 sides",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigNonagon cx={0} cy={0} r={2} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigDecagon",
    category: "geometry-2d",
    usage: "<FigDecagon cx={0} cy={0} r={2} />",
    description: "Regular decagon — 10 sides",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigDecagon cx={0} cy={0} r={2} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigHendecagon",
    category: "geometry-2d",
    usage: "<FigHendecagon cx={0} cy={0} r={2} />",
    description: "Regular hendecagon — 11 sides",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigHendecagon cx={0} cy={0} r={2} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigDodecagon",
    category: "geometry-2d",
    usage: "<FigDodecagon cx={0} cy={0} r={2} />",
    description: "Regular dodecagon — 12 sides",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigDodecagon cx={0} cy={0} r={2} />
      </Fig.FigScene>
    ),
  },

  // ── Star Polygons ─────────────────────────────────────────────────────────
  {
    component: "FigStarPolygon",
    category: "geometry-2d",
    usage: "<FigStarPolygon cx={0} cy={0} r={2} points={5} />",
    description: "Star polygon — set points (outer tips) and innerRatio",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigStarPolygon cx={0} cy={0} r={2} points={5} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigPentagram",
    category: "geometry-2d",
    usage: "<FigPentagram cx={0} cy={0} r={2} />",
    description: "Five-pointed star (pentagram)",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigPentagram cx={0} cy={0} r={2} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigHexagram",
    category: "geometry-2d",
    usage: "<FigHexagram cx={0} cy={0} r={2} />",
    description: "Six-pointed star (Star of David)",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigHexagram cx={0} cy={0} r={2} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigOctagram",
    category: "geometry-2d",
    usage: "<FigOctagram cx={0} cy={0} r={2} />",
    description: "Eight-pointed star (octagram)",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigOctagram cx={0} cy={0} r={2} />
      </Fig.FigScene>
    ),
  },

  // ── Fractals ──────────────────────────────────────────────────────────────
  {
    component: "FigKochSnowflake",
    category: "geometry-2d",
    usage: "<FigKochSnowflake cx={0} cy={0} r={2} iterations={3} />",
    description: "Koch snowflake fractal — iterations 1–5",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigKochSnowflake cx={0} cy={0} r={2} iterations={3} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigSierpinskiTriangle",
    category: "geometry-2d",
    usage: "<FigSierpinskiTriangle cx={0} cy={0} r={2} iterations={4} />",
    description: "Sierpiński triangle fractal — iterations 1–6",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigSierpinskiTriangle cx={0} cy={0} r={2} iterations={4} />
      </Fig.FigScene>
    ),
  },

  // ── Special / Annotations ─────────────────────────────────────────────────
  {
    component: "FigMeasure",
    category: "geometry-2d",
    usage: '<FigMeasure x1={-2} y1={0} x2={2} y2={0} label="4 units" />',
    description: "Double-headed measurement arrow between two points",
    preview: (
      <Fig.FigScene
        width={120}
        height={90}
        xRange={[-3, 3]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Fig.FigMeasure x1={-2} y1={0} x2={2} y2={0} label="4" />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigCirclePi",
    category: "geometry-2d",
    usage: "<FigCirclePi cx={0} cy={0} r={1.5} />",
    description:
      "Circle with π annotations — radius, diameter, C = 2πr ≈ 22/7·d",
    preview: (
      <Fig.FigScene
        width={120}
        height={120}
        xRange={[-2.5, 2.5]}
        yRange={[-2.5, 2.5]}
      >
        <Fig.FigCirclePi cx={0} cy={0} r={1.5} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigContour",
    category: "geometry-2d",
    usage: "<FigContour cx={0} cy={0} levels={[0.5, 1, 1.5, 2]} />",
    description: "Concentric contour / level curves",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigContour cx={0} cy={0} levels={[0.5, 1, 1.5, 2]} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigFunnel",
    category: "geometry-2d",
    usage: "<FigFunnel cx={0} topY={-1} topW={4} bottomW={1} h={2} />",
    description: "Funnel / trapezoid — wide at top, narrow at bottom",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigFunnel cx={0} topY={-1} topW={4} bottomW={1} h={2} />
      </Fig.FigScene>
    ),
  },
  {
    component: "FigCuboid",
    category: "geometry-2d",
    usage: "<FigCuboid x={-2} y={-1} w={3} h={2} d={1} />",
    description: "Cuboid — isometric 3D box drawn in 2D (3 visible faces)",
    preview: (
      <Fig.FigScene width={120} height={90} xRange={[-3, 3]} yRange={[-2, 2]}>
        <Fig.FigCuboid x={-1.5} y={-1} w={2.5} h={1.5} d={0.8} />
      </Fig.FigScene>
    ),
  },

  // ── Electronics & Circuits ────────────────────────────────────────────────
  {
    component: "ElecWire",
    category: "electronics",
    usage: "<ElecWire x1={0} y1={0} x2={3} y2={0} />",
    description: "Plain conductor wire between two world points",
    preview: (
      <Fig.FigScene
        width={160}
        height={60}
        xRange={[-0.5, 5.5]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecWire x1={0} y1={0} x2={5} y2={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecResistor",
    category: "electronics",
    usage: '<ElecResistor x1={0} y1={0} x2={4} y2={0} label="10Ω" />',
    description: "American zigzag resistor symbol with optional value label",
    preview: (
      <Fig.FigScene
        width={160}
        height={80}
        xRange={[-0.5, 5.5]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecResistor x1={0} y1={0} x2={5} y2={0} label="10Ω" />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecCapacitor",
    category: "electronics",
    usage: '<ElecCapacitor x1={0} y1={0} x2={4} y2={0} label="10µF" />',
    description: "Capacitor — two parallel plates",
    preview: (
      <Fig.FigScene
        width={160}
        height={80}
        xRange={[-0.5, 5.5]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecCapacitor x1={0} y1={0} x2={5} y2={0} label="10µF" />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecInductor",
    category: "electronics",
    usage: '<ElecInductor x1={0} y1={0} x2={4} y2={0} label="2mH" />',
    description: "Inductor — series of semicircular coil arcs",
    preview: (
      <Fig.FigScene
        width={160}
        height={80}
        xRange={[-0.5, 5.5]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecInductor x1={0} y1={0} x2={5} y2={0} label="2mH" />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecFuse",
    category: "electronics",
    usage: '<ElecFuse x1={0} y1={0} x2={4} y2={0} label="2A" />',
    description: "Fuse — small rectangle across the wire",
    preview: (
      <Fig.FigScene
        width={160}
        height={80}
        xRange={[-0.5, 5.5]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecFuse x1={0} y1={0} x2={5} y2={0} label="2A" />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecBattery",
    category: "electronics",
    usage: '<ElecBattery x1={0} y1={-2} x2={0} y2={2} label="9V" />',
    description: "Battery — alternating long/short lines, + at x2,y2",
    preview: (
      <Fig.FigScene
        width={80}
        height={160}
        xRange={[-2, 2]}
        yRange={[-0.5, 5.5]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecBattery x1={0} y1={0} x2={0} y2={5} label="9V" />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecVoltageSource",
    category: "electronics",
    usage: '<ElecVoltageSource x1={0} y1={-2} x2={0} y2={2} label="Vs" />',
    description: "DC voltage source — circle with ± inside",
    preview: (
      <Fig.FigScene
        width={80}
        height={160}
        xRange={[-2, 2]}
        yRange={[-0.5, 5.5]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecVoltageSource x1={0} y1={0} x2={0} y2={5} label="Vs" />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecACSource",
    category: "electronics",
    usage: '<ElecACSource x1={0} y1={-2} x2={0} y2={2} label="AC" />',
    description: "AC voltage source — circle with ~ inside",
    preview: (
      <Fig.FigScene
        width={80}
        height={160}
        xRange={[-2, 2]}
        yRange={[-0.5, 5.5]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecACSource x1={0} y1={0} x2={0} y2={5} label="AC" />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecCurrentSource",
    category: "electronics",
    usage: '<ElecCurrentSource x1={0} y1={0} x2={4} y2={0} label="Is" />',
    description: "Current source — circle with directional arrow inside",
    preview: (
      <Fig.FigScene
        width={160}
        height={80}
        xRange={[-0.5, 5.5]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecCurrentSource x1={0} y1={0} x2={5} y2={0} label="Is" />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecSwitch",
    category: "electronics",
    usage: "<ElecSwitch x1={0} y1={0} x2={4} y2={0} />",
    description: "Switch — open (default) or closed with `closed` prop",
    preview: (
      <Fig.FigScene
        width={160}
        height={80}
        xRange={[-0.5, 5.5]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecSwitch x1={0} y1={0} x2={5} y2={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecDiode",
    category: "electronics",
    usage: '<ElecDiode x1={0} y1={0} x2={4} y2={0} label="D1" />',
    description: "Diode — filled triangle + bar, current flows x1→x2",
    preview: (
      <Fig.FigScene
        width={160}
        height={80}
        xRange={[-0.5, 5.5]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecDiode x1={0} y1={0} x2={5} y2={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecLED",
    category: "electronics",
    usage: '<ElecLED x1={0} y1={0} x2={4} y2={0} label="LED" />',
    description: "LED — diode with two emission arrows",
    preview: (
      <Fig.FigScene
        width={160}
        height={80}
        xRange={[-0.5, 5.5]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecLED x1={0} y1={0} x2={5} y2={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecLamp",
    category: "electronics",
    usage: '<ElecLamp x1={0} y1={0} x2={4} y2={0} label="L1" />',
    description: "Lamp — circle with X cross inside",
    preview: (
      <Fig.FigScene
        width={160}
        height={80}
        xRange={[-0.5, 5.5]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecLamp x1={0} y1={0} x2={5} y2={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecVoltmeter",
    category: "electronics",
    usage: "<ElecVoltmeter x1={0} y1={0} x2={4} y2={0} />",
    description: "Voltmeter — circle with V, connect in parallel",
    preview: (
      <Fig.FigScene
        width={160}
        height={80}
        xRange={[-0.5, 5.5]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecVoltmeter x1={0} y1={0} x2={5} y2={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecAmmeter",
    category: "electronics",
    usage: "<ElecAmmeter x1={0} y1={0} x2={4} y2={0} />",
    description: "Ammeter — circle with A, connect in series",
    preview: (
      <Fig.FigScene
        width={160}
        height={80}
        xRange={[-0.5, 5.5]}
        yRange={[-1, 1]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecAmmeter x1={0} y1={0} x2={5} y2={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecNode",
    category: "electronics",
    usage: '<ElecNode x={0} y={0} label="A" />',
    description: "Junction dot — marks a connected node between wires",
    preview: (
      <Fig.FigScene
        width={120}
        height={90}
        xRange={[-2, 2]}
        yRange={[-2, 2]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecWire x1={-2} y1={0} x2={2} y2={0} />
        <Elec.ElecWire x1={0} y1={0} x2={0} y2={2} />
        <Elec.ElecNode x={0} y={0} label="A" />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecGround",
    category: "electronics",
    usage: "<ElecGround x={0} y={0} />",
    description: "Ground symbol — 3 descending horizontal lines",
    preview: (
      <Fig.FigScene
        width={120}
        height={90}
        xRange={[-2, 2]}
        yRange={[-2, 2]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecWire x1={0} y1={2} x2={0} y2={0} />
        <Elec.ElecGround x={0} y={0} />
      </Fig.FigScene>
    ),
  },
  {
    component: "ElecLabel",
    category: "electronics",
    usage: "<ElecLabel x={0} y={0}>V₁</ElecLabel>",
    description: "Standalone text label at a world coordinate inside FigScene",
    preview: (
      <Fig.FigScene
        width={120}
        height={90}
        xRange={[-2, 2]}
        yRange={[-2, 2]}
        showGrid={false}
        showAxes={false}
      >
        <Elec.ElecLabel x={0} y={0} fontSize={16}>
          V₁
        </Elec.ElecLabel>
      </Fig.FigScene>
    ),
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
