import Link from "next/link";
import { ArrowRight, Coins, Code2, Bot, ShieldCheck } from "lucide-react";
import type { CSSProperties } from "react";

const floatingSymbols = [
  { symbol: "∑", x: "8%", y: "18%", size: "2.2rem", delay: "0s", dur: "18s" },
  {
    symbol: "∇",
    x: "84%",
    y: "22%",
    size: "1.8rem",
    delay: "1.2s",
    dur: "22s",
  },
  { symbol: "∂", x: "18%", y: "68%", size: "2rem", delay: "2.1s", dur: "20s" },
  {
    symbol: "∫",
    x: "76%",
    y: "62%",
    size: "2.6rem",
    delay: "0.6s",
    dur: "16s",
  },
  { symbol: "λ", x: "44%", y: "8%", size: "1.6rem", delay: "3.2s", dur: "19s" },
  { symbol: "π", x: "62%", y: "78%", size: "2rem", delay: "1.8s", dur: "24s" },
  { symbol: "θ", x: "4%", y: "52%", size: "1.6rem", delay: "2.7s", dur: "17s" },
  {
    symbol: "α",
    x: "91%",
    y: "44%",
    size: "1.8rem",
    delay: "4.1s",
    dur: "21s",
  },
  {
    symbol: "ℏ",
    x: "28%",
    y: "28%",
    size: "1.5rem",
    delay: "0.9s",
    dur: "23s",
  },
  {
    symbol: "</>",
    x: "78%",
    y: "12%",
    size: "0.9rem",
    delay: "2.3s",
    dur: "18s",
  },
  {
    symbol: "mdx",
    x: "14%",
    y: "84%",
    size: "0.85rem",
    delay: "1.5s",
    dur: "20s",
  },
  {
    symbol: "⟺",
    x: "54%",
    y: "88%",
    size: "1.3rem",
    delay: "3.8s",
    dur: "16s",
  },
];

const glyphStrip = [
  "∑",
  "∇",
  "∂",
  "∫",
  "λ",
  "π",
  "θ",
  "α",
  "ℏ",
  "</>",
  "mdx",
  "⟺",
];

export default function Home() {
  return (
    <main className="flex-1 overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center gap-6 px-4 py-28 text-center md:py-40">
        {/* Grid background */}
        <div className="hero-grid-bg" aria-hidden />

        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <div
            className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/4"
            style={{
              width: "900px",
              height: "600px",
              background:
                "radial-gradient(closest-side, rgba(34,197,94,0.28), rgba(134,239,172,0.08) 40%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
        </div>

        {/* Floating math symbols */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
          aria-hidden
        >
          {floatingSymbols.map((s, i) => (
            <span
              key={i}
              className="absolute font-mono"
              style={
                {
                  left: s.x,
                  top: s.y,
                  fontSize: s.size,
                  color: "rgba(134,239,172,0.12)",
                  animationName: "mdx-drift",
                  animationDuration: s.dur,
                  animationDelay: s.delay,
                  animationTimingFunction: "ease-in-out",
                  animationIterationCount: "infinite",
                } as CSSProperties
              }
            >
              {s.symbol}
            </span>
          ))}
        </div>

        {/* Pulse pill badge */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-green-500/25 bg-green-500/5 px-4 py-1.5 text-sm text-green-600 backdrop-blur-sm dark:text-green-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          LLM writes Markdown. You get components.
        </div>

        {/* Headline */}
        <h1 className="max-w-[900px] text-4xl font-bold leading-tight tracking-[-0.03em] md:text-6xl lg:leading-[1.05]">
          Transform LLM Markdown into <br className="hidden sm:inline" />
          <span className="gradient-text">Rich, Interactive UI</span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-[640px] text-lg text-muted-foreground sm:text-xl">
          MDX UI is a token-efficient bridge between any LLM and React. The AI
          writes plain Markdown — your pipeline transforms it into beautiful,
          interactive components automatically.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            href="/docs"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-green-400 to-green-600 px-7 font-mono text-sm font-semibold text-green-950 shadow-[0_8px_32px_-8px_rgba(34,197,94,0.55)] transition-all hover:brightness-110"
          >
            Get Started <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/components"
            className="inline-flex h-11 items-center justify-center rounded-lg border border-green-500/20 bg-green-500/5 px-7 font-mono text-sm font-semibold text-green-600 backdrop-blur-sm transition-all hover:border-green-500/40 hover:bg-green-500/10 dark:text-green-400"
          >
            Browse Components
          </Link>
        </div>

        {/* Glyph strip */}
        <div className="mt-8 flex flex-wrap justify-center gap-4 font-mono text-xl tracking-widest text-green-300/30">
          {glyphStrip.map((g, i) => (
            <span
              key={i}
              className={
                i % 2 === 0 ? "text-green-400/60" : "text-green-300/25"
              }
            >
              {g}
            </span>
          ))}
        </div>
      </section>

      {/* ── Token cost table ──────────────────────────────────────────────────── */}
      <section className="container py-12 md:py-16">
        <div className="mx-auto max-w-[780px]">
          <p className="mb-3 text-center font-mono text-xs font-medium uppercase tracking-widest text-green-600 dark:text-green-500">
            {"// "}why markdown — not jsx, json, or html
          </p>
          <div className="overflow-hidden rounded-xl border border-green-500/15 shadow-lg shadow-green-500/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-green-500/5">
                  <th className="px-4 py-3 text-left font-medium">Format</th>
                  <th className="px-4 py-3 text-left font-medium">
                    Relative Token Cost
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Problem</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-green-500/5">
                  <td className="px-4 py-3 font-semibold text-green-600 dark:text-green-400">
                    Markdown (MDX UI)
                  </td>
                  <td className="px-4 py-3 font-bold text-green-600 dark:text-green-400">
                    1× baseline
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">None.</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">JSON</td>
                  <td className="px-4 py-3">2.6×</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Brittle parsing, no native UI mapping
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">JSX / custom schema</td>
                  <td className="px-4 py-3">3–5×</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    LLM hallucinates props and components
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3">HTML</td>
                  <td className="px-4 py-3">5–10×</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    Massive waste, security risks
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── Feature cards ─────────────────────────────────────────────────────── */}
      <section className="container py-12 md:py-24">
        <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              glyph: "∑",
              title: "Token-Efficient by Design",
              body: (
                <>
                  The LLM never writes{" "}
                  <code className="rounded bg-green-500/10 px-1 py-0.5 text-xs text-green-600 dark:text-green-400">
                    &lt;Callout&gt;
                  </code>
                  . It writes standard Markdown. Your AST pipeline transforms it
                  — deterministically, testably, cheaply.
                </>
              ),
            },
            {
              glyph: "λ",
              title: "Model Agnostic",
              body: "Works with Groq, OpenAI, Anthropic, Gemini, or any local model. No fine-tuning, no per-model prompts. Swap models without changing your pipeline.",
            },
            {
              glyph: "</>",
              title: "You Own the Code",
              body: "50+ components copied directly into your project — shadcn-style. Modify, extend, or replace anything without waiting for an npm update.",
            },
            {
              glyph: "⟡",
              title: "MCP Server Included",
              body: "Claude Code reads your registry before writing MDX. One config line — no prompting, no hallucinated components, no manual validation.",
            },
          ].map(({ glyph, title, body }) => (
            <div
              key={title}
              className="group flex flex-col gap-4 rounded-2xl border border-white/8 bg-white/[0.03] p-7 backdrop-blur-xl transition-all duration-200 hover:-translate-y-0.5 hover:border-green-500/40 hover:shadow-[0_0_0_1px_rgba(34,197,94,0.25),0_0_48px_-8px_rgba(34,197,94,0.20)] dark:border-white/5"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-green-400 to-green-600 font-mono text-xl font-bold text-green-950 shadow-[0_6px_24px_-6px_rgba(34,197,94,0.6),inset_0_1px_0_rgba(255,255,255,0.3)]">
                {glyph}
              </div>
              <h3 className="text-base font-bold">{title}</h3>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────────── */}
      <section className="container border-t border-green-500/10 py-12 md:py-24">
        <div className="mx-auto max-w-[780px]">
          <p className="mb-3 text-center font-mono text-xs font-medium uppercase tracking-widest text-green-600 dark:text-green-500">
            {"// "}how it works
          </p>
          <h2 className="mb-2 text-center text-3xl font-bold tracking-tighter">
            The LLM stays in its comfort zone.{" "}
            <span className="gradient-text">
              Your pipeline handles the rest.
            </span>
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            Four deterministic steps. No prompt engineering per component.
          </p>
          <div className="space-y-0">
            {[
              {
                step: "01",
                title: "LLM generates plain Markdown",
                desc: "Any model, any provider. Standard GitHub-flavored Markdown — no JSX, no custom tags. Just > [!NOTE] text and ```python code blocks.",
              },
              {
                step: "02",
                title: "preprocessMarkdown cleans the output",
                desc: "Fixes escaping issues, normalizes whitespace, and handles edge cases in LLM-generated text before AST parsing.",
              },
              {
                step: "03",
                title: "remarkMdxUi transforms at the AST level",
                desc: '> [!NOTE] becomes <Callout variant="info">, tables become <DataTable>, code fences become <CodeBlock> with Shiki highlighting.',
              },
              {
                step: "04",
                title: "Your components render it",
                desc: "MDX evaluates the transformed output using your component map. Full theme support, fully customizable, zero LLM involvement.",
              },
            ].map(({ step, title, desc }, i, arr) => (
              <div key={step} className="relative flex gap-5">
                {/* Dotted connector line */}
                {i < arr.length - 1 && (
                  <div
                    className="absolute left-[19px] top-10 w-px"
                    style={{
                      height: "calc(100% - 8px)",
                      backgroundImage:
                        "linear-gradient(to bottom, rgba(34,197,94,0.4) 50%, transparent 50%)",
                      backgroundSize: "1px 8px",
                    }}
                    aria-hidden
                  />
                )}
                {/* Step circle */}
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-[1.5px] border-green-500 font-mono text-xs font-semibold text-green-500 dark:border-green-400 dark:text-green-400">
                  {step}
                </div>
                <div className="pb-8 pt-1.5">
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MCP Server ────────────────────────────────────────────────────────── */}
      <section className="container border-t border-green-500/10 py-12 md:py-24">
        <div className="mx-auto max-w-[980px]">
          <p className="mb-3 text-center font-mono text-xs font-medium uppercase tracking-widest text-green-600 dark:text-green-500">
            {"// "}mcp server
          </p>
          <h2 className="mb-2 text-center text-3xl font-bold tracking-tighter">
            Claude Code knows your components.{" "}
            <span className="gradient-text">Out of the box.</span>
          </h2>
          <p className="mb-12 text-center text-muted-foreground">
            One config line. Claude reads your registry, generates valid MDX,
            and validates it — no prompting required.
          </p>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
            {/* Config snippet */}
            <div className="flex flex-col gap-3">
              <p className="font-mono text-xs font-medium text-green-600 dark:text-green-500">
                .claude/settings.json
              </p>
              <pre className="overflow-x-auto rounded-xl border border-green-500/15 bg-green-500/5 p-5 font-mono text-xs leading-relaxed text-green-700 dark:text-green-300">
                {`{
  "mcpServers": {
    "mdx-ui": {
      "command": "pnpm",
      "args": [
        "dlx",
        "@ravikumarsurya/mdx-ui",
        "mcp"
      ]
    }
  }
}`}
              </pre>
              <p className="text-xs text-muted-foreground">
                Works with Claude Code, Cursor, Windsurf, and any
                MCP-compatible client.
              </p>
            </div>

            {/* Capabilities */}
            <div className="flex flex-col justify-center gap-6">
              {[
                {
                  Icon: Bot,
                  title: "Registry-aware generation",
                  desc: "Claude reads your exact installed component list before writing a single line of MDX.",
                },
                {
                  Icon: ShieldCheck,
                  title: "Built-in validation",
                  desc: "Catches hallucinated or uninstalled components before they reach your renderer.",
                },
                {
                  Icon: Code2,
                  title: "Math content tools",
                  desc: "370+ math primitives exposed as MCP tools. Generate equations and proofs natively.",
                },
                {
                  Icon: Coins,
                  title: "Output Standard resource",
                  desc: "Injects the MDX UI output spec into Claude's context automatically — zero copy-paste.",
                },
              ].map(({ Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-green-500/20 bg-green-500/8">
                    <Icon className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {desc}
                    </p>
                  </div>
                </div>
              ))}

              <Link
                href="/docs/integration/mcp"
                className="mt-2 inline-flex items-center gap-1.5 font-mono text-sm font-medium text-green-600 transition-colors hover:text-green-500 dark:text-green-400"
              >
                MCP setup guide <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="relative container overflow-hidden border-t border-green-500/10 py-12 md:py-24">
        <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: "600px",
              height: "400px",
              background:
                "radial-gradient(closest-side, rgba(34,197,94,0.18), rgba(134,239,172,0.06) 50%, transparent 70%)",
              filter: "blur(60px)",
            }}
          />
        </div>
        <div className="mx-auto flex max-w-[780px] flex-col items-center gap-5 text-center">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-green-600 dark:text-green-500">
            {"// "}get started
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            LLM writes Markdown.{" "}
            <span className="gradient-text">You get components.</span>
          </h2>
          <p className="max-w-[600px] text-lg text-muted-foreground">
            Start with one command. Works with Next.js, Astro, and Vite React.
          </p>
          <code className="rounded-lg border border-green-500/20 bg-green-500/5 px-6 py-3 font-mono text-sm text-green-600 dark:text-green-400">
            npx @ravikumarsurya/mdx-ui init
          </code>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/docs/installation"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-br from-green-400 to-green-600 px-7 font-mono text-sm font-semibold text-green-950 shadow-[0_8px_32px_-8px_rgba(34,197,94,0.55)] transition-all hover:brightness-110"
            >
              Installation Guide <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/integration/ai-content"
              className="inline-flex h-11 items-center justify-center rounded-lg border border-green-500/20 bg-green-500/5 px-7 font-mono text-sm font-semibold text-green-600 backdrop-blur-sm transition-all hover:border-green-500/40 hover:bg-green-500/10 dark:text-green-400"
            >
              AI Integration Guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
