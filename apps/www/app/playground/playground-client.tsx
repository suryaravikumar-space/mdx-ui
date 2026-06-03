"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { cn } from "@/lib/utils";
import { compileMdx } from "./actions";
import { PLAYGROUND_COMPONENTS } from "@/lib/playground-components";

export const DEFAULT_MDX = `# Setting Up Authentication

Paste any LLM-generated Markdown here — the remark plugin transforms it into
rich UI automatically. **No JSX required.**

> [!NOTE]
> This blockquote was written in plain Markdown. DocsUI turned it into this styled callout.

## Requirements

| Package   | Version | Purpose          |
| --------- | ------- | ---------------- |
| next-auth | ^5.0.0  | Authentication   |
| prisma    | ^5.0.0  | Database ORM     |
| bcrypt    | ^5.1.0  | Password hashing |

The table above became a styled DataTable automatically.

## Setup Steps

1. Install the packages above
2. Configure your database connection string
3. Add the auth provider to your app

The ordered list became animated Steps.

> [!WARNING]
> Never store plaintext passwords. Use bcrypt with a cost factor ≥ 12.

## Architecture

\`\`\`mermaid
flowchart TD
  A[User] -->|Login| B[NextAuth]
  B --> C{Valid?}
  C -->|Yes| D[Session Created]
  C -->|No| E[401 Error]
\`\`\`

## Math Snippets

Inline derivative: $f(x) = x^3$ gives $f'(x) = 3x^2$.

Power rule for integration:

$$\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$$

Fundamental theorem of calculus:

$$\int_a^b f(x) \, dx = F(b) - F(a)$$

Chain rule — if $h(x) = f(g(x))$ then $h'(x) = f'(g(x)) \cdot g'(x)$.
`;

const EXAMPLES = [
  {
    label: "Auto",
    mdx: DEFAULT_MDX,
  },
  {
    label: "Math",
    mdx: `# Math — Step-by-Step Solutions

KaTeX-powered. \`<ME>\` for inline, \`<BME>\` for display — no backslashes needed.

## Problem 1: Quadratic Equation

Solve <ME>2x^2 - 4x - 6 = 0</ME>

<Solution title="Solve 2x² − 4x − 6 = 0">
  <SolutionStep reason="Divide all terms by 2">x² − 2x − 3 = 0</SolutionStep>
  <SolutionStep reason="Factor">(x − 3)(x + 1) = 0</SolutionStep>
  <SolutionStep highlight reason="Zero product property">x = 3  or  x = −1</SolutionStep>
  <SolutionAnswer>x = 3 or x = −1</SolutionAnswer>
</Solution>

## Problem 2: Differentiation

Find f′(x) for <ME>f(x) = x^3 - 3x^2 + 2</ME>

<Solution title="Differentiate f(x) = x³ − 3x² + 2">
  <SolutionNote>Power rule: d/dx[xⁿ] = nxⁿ⁻¹. Apply term by term.</SolutionNote>
  <SolutionStep reason="Differentiate x³"><ME>3x^2</ME></SolutionStep>
  <SolutionStep reason="Differentiate −3x²"><ME>-6x</ME></SolutionStep>
  <SolutionStep reason="Constant term drops to 0">0</SolutionStep>
  <SolutionAnswer><BME>f'(x) = 3x^2 - 6x</BME></SolutionAnswer>
</Solution>

## Problem 3: Definite Integral

Evaluate <ME>int(1, 2) (3x^2 + 2x) dx</ME>

<Solution title="∫₁² (3x² + 2x) dx">
  <SolutionNote>Integrate term by term, then apply the Fundamental Theorem of Calculus.</SolutionNote>
  <SolutionStep reason="Antiderivative"><ME>x^3 + x^2</ME></SolutionStep>
  <SolutionStep highlight reason="Evaluate at bounds [1, 2]"><ME>(2^3 + 2^2) - (1^3 + 1^2)</ME></SolutionStep>
  <SolutionStep reason="Simplify">(8 + 4) − (1 + 1) = 12 − 2</SolutionStep>
  <SolutionAnswer>10</SolutionAnswer>
</Solution>
`,
  },
  {
    label: "Cards",
    mdx: `# Card Layout

<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  <Card>
    <CardHeader>
      <CardTitle>Next.js</CardTitle>
      <CardDescription>React framework for production</CardDescription>
    </CardHeader>
    <CardContent>Full-stack React with file-based routing and SSR.</CardContent>
  </Card>
  <Card>
    <CardHeader>
      <CardTitle>Astro</CardTitle>
      <CardDescription>Ship less JavaScript</CardDescription>
    </CardHeader>
    <CardContent>Islands architecture for content-focused sites.</CardContent>
  </Card>
</div>

<LinkCard href="/docs" title="Read the docs" description="Everything you need to get started with DocsUI." />
`,
  },
  {
    label: "Math Primitives",
    mdx: `# Math Primitives — Problem Set

CSS-native math, no KaTeX. Uses Frac, Sqrt, Sum, Integral.

## 1. Fraction Arithmetic

Simplify <Frac num="3" den="4" /> + <Frac num="5" den="6" />

<Solution title="3/4 + 5/6">
  <SolutionStep reason="LCM of 4 and 6 is 12"><Frac num="9" den="12" /> + <Frac num="10" den="12" /></SolutionStep>
  <SolutionStep highlight reason="Add numerators"><Frac num="9 + 10" den="12" /></SolutionStep>
  <SolutionAnswer><Frac num="19" den="12" /></SolutionAnswer>
</Solution>

## 2. Definite Integration

<Equation>
  <Integral from="1" to="4"><Sqrt>x</Sqrt> dx</Integral>
</Equation>

<Solution>
  <SolutionNote>Rewrite <Sqrt>x</Sqrt> = <Pow exp="1/2">x</Pow>. Power rule: <Integral><Pow exp="n">x</Pow> dx</Integral> = <Frac num={<Pow exp="n+1">x</Pow>} den="n+1" /></SolutionNote>
  <SolutionStep reason="Antiderivative"><Frac num="2" den="3" /> · <Pow exp="3/2">x</Pow></SolutionStep>
  <SolutionStep highlight reason="Evaluate at bounds [1, 4]"><Frac num="2" den="3" /> · <Pow exp="3/2">4</Pow> − <Frac num="2" den="3" /> · <Pow exp="3/2">1</Pow></SolutionStep>
  <SolutionStep reason="4^(3/2) = 8, 1^(3/2) = 1"><Frac num="2" den="3" /> · 8 − <Frac num="2" den="3" /> · 1 = <Frac num="16" den="3" /> − <Frac num="2" den="3" /></SolutionStep>
  <SolutionAnswer><Frac num="14" den="3" /></SolutionAnswer>
</Solution>

## 3. Gauss's Sum

Prove <Sum from="k=1" to="n">k</Sum> = <Frac num="n(n+1)" den="2" />

<Solution title="Gauss's summation formula">
  <SolutionStep reason="Write S forwards">S = 1 + 2 + ··· + n</SolutionStep>
  <SolutionStep reason="Write S backwards">S = n + (n−1) + ··· + 1</SolutionStep>
  <SolutionStep highlight reason="n pairs, each summing to (n+1)">2S = n(n+1)</SolutionStep>
  <SolutionAnswer>S = <Frac num="n(n+1)" den="2" /></SolutionAnswer>
</Solution>
`,
  },
  {
    label: "Physics",
    mdx: `# Physics Primitives

Quantum mechanics and electromagnetism — HBar, Bra, Ket, Nabla, Vec and more.

## 1. Mass-Energy Equivalence

<Equation label="E1">
  E = <Pow exp="2">mc</Pow>
</Equation>

<Solution title="Derive E = mc²">
  <SolutionNote>From special relativity: the total energy of a body includes its rest energy.</SolutionNote>
  <SolutionStep reason="Relativistic energy-momentum relation"><Pow exp="2">E</Pow> = <Pow exp="2"><Paren>pc</Paren></Pow> + <Pow exp="2"><Paren>m<Pow exp="2">c</Pow></Paren></Pow></SolutionStep>
  <SolutionStep reason="At rest: p = 0"><Pow exp="2">E</Pow> = <Pow exp="2">m</Pow><Pow exp="4">c</Pow></SolutionStep>
  <SolutionStep highlight reason="Take square root">E = <Sqrt><Pow exp="2">m</Pow><Pow exp="4">c</Pow></Sqrt> = m<Pow exp="2">c</Pow></SolutionStep>
  <SolutionAnswer>E = m<Pow exp="2">c</Pow></SolutionAnswer>
</Solution>

## 2. Schrödinger Equation

<Equation label="TISE">
  −<Frac num={<Pow exp="2"><HBar /></Pow>} den="2m" /> <Nabla />²ψ + Vψ = Eψ
</Equation>

<Solution title="Particle in an infinite square well">
  <SolutionNote>V = 0 inside [0, L], boundary conditions ψ(0) = ψ(L) = 0.</SolutionNote>
  <SolutionStep reason="General solution inside well">ψ(x) = A sin(kx)</SolutionStep>
  <SolutionStep reason="Apply ψ(L) = 0">k = nπ/L</SolutionStep>
  <SolutionStep highlight reason="Quantised energies">Eₙ = <Frac num={<Pow exp="2"><HBar /></Pow>} den="2m" /> · <Frac num="n²π²" den="L²" /></SolutionStep>
  <SolutionAnswer>Eₙ = <Frac num="n²π²ℏ²" den="2mL²" /></SolutionAnswer>
</Solution>

## 3. Dirac Notation & Gauss's Law

Inner product: <BraKet bra={<Psi />} ket={<Phi />} /> = <Integral from="-∞" to="∞"><Conj><Psi /></Conj> <Phi /> dx</Integral>

Momentum operator: <Hat>p</Hat> = −i<HBar /><Deriv of="x" />

Expectation value: <Bra><Psi /></Bra><Hat>p</Hat><Ket><Psi /></Ket> = −i<HBar /><Integral from="-∞" to="∞"><Conj><Psi /></Conj> <PDeriv of="x"><Psi /></PDeriv> dx</Integral>

<Equation label="G">
  <Nabla /> · <Vec>E</Vec> = <Frac num="ρ" den="ε₀" />
</Equation>
`,
  },
  {
    label: "Security",
    mdx: `# Security Notes

<SecurityNote severity="critical">
  Never store plaintext passwords. Use bcrypt or Argon2 with a cost factor ≥ 12.
</SecurityNote>

<SecurityNote severity="warning">
  Validate and sanitize all user input on the server side before processing.
</SecurityNote>

<SecurityNote severity="info">
  Consider enabling HSTS and CSP headers for your production deployment.
</SecurityNote>

<Alert>
  <AlertTitle>Penetration testing</AlertTitle>
  <AlertDescription>
    Always get written authorization before testing any system you do not own.
  </AlertDescription>
</Alert>
`,
  },
];

interface PlaygroundClientProps {
  initialCompiled?: MDXRemoteSerializeResult;
}

export function PlaygroundClient({
  initialCompiled,
}: PlaygroundClientProps = {}) {
  const searchParams = useSearchParams();

  const getInitialSource = () => {
    const encoded = searchParams.get("code");
    if (encoded) {
      try {
        return decodeURIComponent(escape(atob(encoded)));
      } catch {
        // fall through to default
      }
    }
    return DEFAULT_MDX;
  };

  const [source, setSource] = useState(getInitialSource);
  const [compiled, setCompiled] = useState<MDXRemoteSerializeResult | null>(
    initialCompiled ?? null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [activePanel, setActivePanel] = useState<"editor" | "preview">(
    "editor",
  );

  const compile = useCallback(async (mdx: string) => {
    setIsCompiling(true);
    const res = await compileMdx(mdx);
    setIsCompiling(false);
    if (res.ok) {
      setCompiled(res.result);
      setError(null);
    } else {
      setError(res.error);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => compile(source), 600);
    return () => clearTimeout(t);
  }, [source, compile]);

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-border bg-background/95 px-4 py-2 backdrop-blur">
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-sm font-semibold text-green-600 dark:text-green-400">
            playground
          </span>
          {isCompiling && (
            <span className="animate-pulse font-mono text-xs text-muted-foreground">
              compiling…
            </span>
          )}
          {!isCompiling && error && (
            <span className="font-mono text-xs text-destructive">
              syntax error
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-mono text-xs text-muted-foreground">try:</span>
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              onClick={() => setSource(ex.mdx)}
              className="rounded border border-green-500/20 bg-green-500/5 px-2 py-0.5 font-mono text-xs text-green-600 transition-colors hover:bg-green-500/15 dark:text-green-400"
            >
              {ex.label}
            </button>
          ))}
        </div>

        {/* Mobile toggle */}
        <div className="ml-auto flex gap-1 md:hidden">
          {(["editor", "preview"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setActivePanel(p)}
              className={cn(
                "rounded px-2.5 py-1 text-xs font-medium capitalize transition-colors",
                activePanel === p
                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Panes */}
      <div className="flex min-h-0 flex-1">
        {/* Editor */}
        <div
          className={cn(
            "flex flex-col border-r border-border",
            "w-full md:w-1/2",
            activePanel !== "editor" && "hidden md:flex",
          )}
        >
          <div className="border-b border-border bg-muted/40 px-3 py-1.5 flex items-center justify-between">
            <span className="font-mono text-xs text-muted-foreground">
              editor.mdx
            </span>
            <span className="font-mono text-xs text-muted-foreground/60">
              paste your LLM output here
            </span>
          </div>
          <textarea
            value={source}
            onChange={(e) => setSource(e.target.value)}
            spellCheck={false}
            className="flex-1 resize-none bg-background px-4 py-3 font-mono text-sm leading-6 text-foreground outline-none"
            style={{ tabSize: 2 }}
            aria-label="MDX editor"
          />
        </div>

        {/* Preview */}
        <div
          className={cn(
            "flex flex-col",
            "w-full md:w-1/2",
            activePanel !== "preview" && "hidden md:flex",
          )}
        >
          <div className="border-b border-border bg-muted/40 px-3 py-1.5">
            <span className="font-mono text-xs text-muted-foreground">
              preview
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            {error ? (
              <div className="m-4 rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                <p className="mb-1.5 font-mono text-xs font-semibold text-destructive">
                  Compile error
                </p>
                <pre className="whitespace-pre-wrap font-mono text-xs text-destructive/80">
                  {error}
                </pre>
              </div>
            ) : compiled ? (
              <div className="mdx px-6 py-6">
                <MDXRemote
                  {...compiled}
                  components={PLAYGROUND_COMPONENTS as any}
                />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="animate-pulse font-mono text-xs text-muted-foreground">
                  compiling…
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
