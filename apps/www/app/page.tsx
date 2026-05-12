import Link from "next/link";
import { ArrowRight, Coins, Code2, Bot } from "lucide-react";

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="container flex flex-col items-center gap-4 py-24 md:py-32">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <div className="inline-flex items-center rounded-full border px-4 py-1 text-sm text-muted-foreground">
            LLM writes Markdown. You get components.
          </div>
          <h1 className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Transform LLM Markdown into{" "}
            <br className="hidden sm:inline" />
            Rich, Interactive UI
          </h1>
          <p className="max-w-[750px] text-lg text-muted-foreground sm:text-xl">
            MDX UI is a token-efficient bridge between any LLM and React. The
            AI writes plain Markdown — your pipeline transforms it into
            beautiful, interactive components automatically.
          </p>
          <div className="flex gap-4">
            <Link
              href="/docs"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/components"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Browse Components
            </Link>
          </div>
        </div>
      </section>

      {/* Token cost comparison */}
      <section className="container py-12 md:py-16">
        <div className="mx-auto max-w-[780px]">
          <p className="mb-4 text-center text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Why Markdown — not JSX, JSON, or HTML
          </p>
          <div className="overflow-hidden rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left font-medium">Format</th>
                  <th className="px-4 py-3 text-left font-medium">Relative Token Cost</th>
                  <th className="px-4 py-3 text-left font-medium">Problem</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b bg-primary/5">
                  <td className="px-4 py-3 font-semibold">Markdown (MDX UI)</td>
                  <td className="px-4 py-3 font-bold text-primary">1× baseline</td>
                  <td className="px-4 py-3 text-muted-foreground">None</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">JSON</td>
                  <td className="px-4 py-3">2.6×</td>
                  <td className="px-4 py-3 text-muted-foreground">Brittle parsing, no native UI mapping</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-3">JSX / custom schema</td>
                  <td className="px-4 py-3">3–5×</td>
                  <td className="px-4 py-3 text-muted-foreground">LLM hallucinates props and components</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">HTML</td>
                  <td className="px-4 py-3">5–10×</td>
                  <td className="px-4 py-3 text-muted-foreground">Massive waste, security risks</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Feature cards */}
      <section className="container py-12 md:py-24">
        <div className="mx-auto grid max-w-[980px] grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col gap-3 rounded-lg border p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Coins className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">Token-Efficient by Design</h3>
            <p className="text-sm text-muted-foreground">
              The LLM never writes{" "}
              <code className="rounded bg-muted px-1 py-0.5 text-xs">
                &lt;Callout&gt;
              </code>
              . It writes standard Markdown. Your AST pipeline transforms it —
              deterministically, testably, cheaply.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-lg border p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Bot className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">Model Agnostic</h3>
            <p className="text-sm text-muted-foreground">
              Works with Groq, OpenAI, Anthropic, Gemini, or any local model.
              No fine-tuning, no per-model prompts. Swap models without changing
              your pipeline.
            </p>
          </div>
          <div className="flex flex-col gap-3 rounded-lg border p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">You Own the Code</h3>
            <p className="text-sm text-muted-foreground">
              50+ components copied directly into your project — shadcn-style.
              Modify, extend, or replace anything without waiting for an npm
              update.
            </p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container border-t py-12 md:py-24">
        <div className="mx-auto max-w-[780px]">
          <h2 className="mb-2 text-center text-3xl font-bold tracking-tighter">
            How it works
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
                desc: "> [!NOTE] becomes <Callout variant=\"info\">, tables become <DataTable>, code fences become <CodeBlock> with Shiki highlighting.",
              },
              {
                step: "4",
                title: "Your components render it",
                desc: "MDX evaluates the transformed output using your component map. Full theme support, fully customizable, zero LLM involvement.",
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 rounded-lg border p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
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

      {/* CTA */}
      <section className="container border-t py-12 md:py-24">
        <div className="mx-auto flex max-w-[980px] flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl">
            LLM writes Markdown. You get components.
          </h2>
          <p className="max-w-[600px] text-lg text-muted-foreground">
            Start with one command. Works with Next.js, Astro, and Vite React.
          </p>
          <code className="rounded-lg border bg-muted px-6 py-3 text-sm font-mono">
            npx @ravikumarsurya/mdx-ui init
          </code>
          <div className="flex gap-4">
            <Link
              href="/docs/installation"
              className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Installation Guide
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
            <Link
              href="/docs/integration/ai-content"
              className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              AI Integration Guide
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
