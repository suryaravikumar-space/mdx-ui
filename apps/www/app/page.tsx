import Link from "next/link";
import { ArrowRight, Coins, Code2, Bot } from "lucide-react";
import type { CSSProperties } from "react";

const floatingSymbols = [
  { symbol: "∑", x: "8%", y: "18%", size: "2.2rem", delay: "0s", dur: "9s" },
  { symbol: "∇", x: "84%", y: "22%", size: "1.8rem", delay: "1.2s", dur: "11s" },
  { symbol: "∂", x: "18%", y: "68%", size: "2rem", delay: "2.1s", dur: "10s" },
  { symbol: "∫", x: "76%", y: "62%", size: "2.6rem", delay: "0.6s", dur: "12s" },
  { symbol: "λ", x: "44%", y: "8%", size: "1.6rem", delay: "3.2s", dur: "8s" },
  { symbol: "π", x: "62%", y: "78%", size: "2rem", delay: "1.8s", dur: "13s" },
  { symbol: "θ", x: "4%", y: "52%", size: "1.6rem", delay: "2.7s", dur: "9s" },
  { symbol: "α", x: "91%", y: "44%", size: "1.8rem", delay: "4.1s", dur: "8s" },
  { symbol: "ℏ", x: "28%", y: "28%", size: "1.5rem", delay: "0.9s", dur: "11s" },
  { symbol: "</>", x: "78%", y: "12%", size: "0.9rem", delay: "2.3s", dur: "9s" },
  { symbol: "mdx", x: "14%", y: "84%", size: "0.85rem", delay: "1.5s", dur: "10s" },
  { symbol: "⟺", x: "54%", y: "88%", size: "1.3rem", delay: "3.8s", dur: "12s" },
];

export default function Home() {
  return (
    <main className="flex-1 overflow-x-hidden">
      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section className="relative flex flex-col items-center gap-6 px-4 py-28 text-center md:py-40">
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          aria-hidden
        >
          <div className="absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/4 rounded-full bg-violet-600/20 blur-[120px]" />
          <div className="absolute -left-24 top-24 h-[280px] w-[280px] rounded-full bg-indigo-600/15 blur-[80px]" />
          <div className="absolute -right-24 top-24 h-[280px] w-[280px] rounded-full bg-purple-600/15 blur-[80px]" />
        </div>

        {/* Floating math symbols */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 select-none overflow-hidden"
          aria-hidden
        >
          {floatingSymbols.map((s, i) => (
            <span
              key={i}
              className="animate-float absolute font-mono text-violet-500/25 dark:text-violet-400/20"
              style={
                {
                  left: s.x,
                  top: s.y,
                  fontSize: s.size,
                  animationDelay: s.delay,
                  "--float-duration": s.dur,
                } as CSSProperties
              }
            >
              {s.symbol}
            </span>
          ))}
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/5 px-4 py-1.5 text-sm text-violet-600 backdrop-blur-sm dark:text-violet-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
          </span>
          LLM writes Markdown. You get components.
        </div>

        {/* Headline */}
        <h1 className="max-w-[900px] text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
          Transform LLM Markdown into{" "}
          <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-400 bg-clip-text text-transparent dark:from-violet-400 dark:via-purple-300 dark:to-indigo-300">
            Rich, Interactive UI
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-[680px] text-lg text-muted-foreground sm:text-xl">
          MDX UI is a token-efficient bridge between any LLM and React. The AI
          writes plain Markdown — your pipeline transforms it into beautiful,
          interactive components automatically.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/docs"
            className="inline-flex h-11 items-center justify-center rounded-md bg-gradient-to-r from-violet-600 to-indigo-500 px-8 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-all hover:scale-[1.02] hover:shadow-violet-500/50"
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <Link
            href="/components"
            className="inline-flex h-11 items-center justify-center rounded-md border border-violet-500/30 bg-violet-500/5 px-8 text-sm font-medium text-violet-600 backdrop-blur-sm transition-all hover:border-violet-500/50 hover:bg-violet-500/10 dark:text-violet-400"
          >
            Browse Components
          </Link>
        </div>
      </section>

      {/* ── Token cost table ──────────────────────────────────────────────────── */}
      <section className="container py-12 md:py-16">
        <div className="mx-auto max-w-[780px]">
          <p className="mb-4 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Why Markdown — not JSX, JSON, or HTML
          </p>
          <div className="overflow-hidden rounded-xl border border-violet-500/15 shadow-lg shadow-violet-500/5">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-violet-500/5">
                  <th className="px-4 py-3 text-left font-medium">Format</th>
                  <th className="px-4 py-3 text-left font-medium">
                    Relative Token Cost
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Problem</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-gradient-to-r from-violet-500/8 to-indigo-500/5">
                  <td className="px-4 py-3 font-semibold text-violet-600 dark:text-violet-400">
                    Markdown (MDX UI)
                  </td>
                  <td className="px-4 py-3 font-bold text-violet-600 dark:text-violet-400">
                    1× baseline
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">None</td>
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
        <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              icon: Coins,
              title: "Token-Efficient by Design",
              body: (
                <>
                  The LLM never writes{" "}
                  <code className="rounded bg-violet-500/10 px-1 py-0.5 text-xs text-violet-600 dark:text-violet-400">
                    &lt;Callout&gt;
                  </code>
                  . It writes standard Markdown. Your AST pipeline transforms it
                  — deterministically, testably, cheaply.
                </>
              ),
            },
            {
              icon: Bot,
              title: "Model Agnostic",
              body: "Works with Groq, OpenAI, Anthropic, Gemini, or any local model. No fine-tuning, no per-model prompts. Swap models without changing your pipeline.",
            },
            {
              icon: Code2,
              title: "You Own the Code",
              body: "50+ components copied directly into your project — shadcn-style. Modify, extend, or replace anything without waiting for an npm update.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="group flex flex-col gap-4 rounded-xl border border-violet-500/10 bg-gradient-to-br from-violet-500/5 to-indigo-500/5 p-6 backdrop-blur-sm transition-all hover:border-violet-500/25 hover:shadow-lg hover:shadow-violet-500/10"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-500 shadow-md shadow-violet-500/20">
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────────────────────── */}
      <section className="container border-t border-violet-500/10 py-12 md:py-24">
        <div className="mx-auto max-w-[780px]">
          <h2 className="mb-2 text-center text-3xl font-bold tracking-tighter">
            How it{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-400 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-300">
              works
            </span>
          </h2>
          <p className="mb-10 text-center text-muted-foreground">
            The LLM stays in its comfort zone. Your pipeline handles the rest.
          </p>
          <div className="space-y-4">
            {[
              {
                step: "1",
                title: "LLM generates plain Markdown",
                desc: 'Any model, any provider. Standard GitHub-flavored Markdown — no JSX, no custom tags. Just > [!NOTE] text and ```python code blocks.',
              },
              {
                step: "2",
                title: "preprocessMarkdown cleans the output",
                desc: "Fixes escaping issues, normalizes whitespace, and handles edge cases in LLM-generated text before AST parsing.",
              },
              {
                step: "3",
                title: "remarkMdxUi transforms at the AST level",
                desc: '> [!NOTE] becomes <Callout variant="info">, tables become <DataTable>, code fences become <CodeBlock> with Shiki highlighting.',
              },
              {
                step: "4",
                title: "Your components render it",
                desc: "MDX evaluates the transformed output using your component map. Full theme support, fully customizable, zero LLM involvement.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="flex gap-4 rounded-xl border border-violet-500/10 bg-gradient-to-r from-violet-500/5 to-transparent p-5 transition-all hover:border-violet-500/20"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-indigo-500 text-sm font-bold text-white shadow-sm shadow-violet-500/30">
                  {step}
                </div>
                <div>
                  <p className="font-semibold">{title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────────── */}
      <section className="relative container overflow-hidden border-t border-violet-500/10 py-12 md:py-24">
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          aria-hidden
        >
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[100px]" />
        </div>
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            LLM writes Markdown.{" "}
            <span className="bg-gradient-to-r from-violet-600 to-indigo-400 bg-clip-text text-transparent dark:from-violet-400 dark:to-indigo-300">
              You get components.
            </span>
          </h2>
          <p className="max-w-[600px] text-lg text-muted-foreground">
            Start with one command. Works with Next.js, Astro, and Vite React.
          </p>
          <code className="rounded-lg border border-violet-500/20 bg-violet-500/5 px-6 py-3 font-mono text-sm text-violet-600 dark:text-violet-400">
            npx @ravikumarsurya/mdx-ui init
          </code>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/docs/installation"
              className="inline-flex h-11 items-center justify-center rounded-md bg-gradient-to-r from-violet-600 to-indigo-500 px-8 text-sm font-medium text-white shadow-lg shadow-violet-500/30 transition-all hover:scale-[1.02] hover:shadow-violet-500/50"
            >
              Installation Guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/docs/integration/ai-content"
              className="inline-flex h-11 items-center justify-center rounded-md border border-violet-500/30 bg-violet-500/5 px-8 text-sm font-medium text-violet-600 backdrop-blur-sm transition-all hover:border-violet-500/50 hover:bg-violet-500/10 dark:text-violet-400"
            >
              AI Integration Guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
