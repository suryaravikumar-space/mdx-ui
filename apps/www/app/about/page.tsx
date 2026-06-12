import Link from "next/link";
import type { Metadata } from "next";
import { Github, Twitter, ArrowRight } from "lucide-react";
import { siteConfig, authors } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name} — ${siteConfig.description}`,
};

export default function AboutPage() {
  return (
    <main className="container max-w-4xl py-10 lg:py-16">
      <div className="space-y-2">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
          About {siteConfig.name}
        </h1>
        <p className="text-lg text-muted-foreground">
          Copy-paste MDX components for documentation sites.
        </p>
      </div>

      <div className="mt-8 space-y-10">
        <section className="space-y-3">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            What is {siteConfig.name}?
          </h2>
          <p className="leading-7 text-muted-foreground">
            {siteConfig.name} is an open source library of React/MDX components
            — math primitives, data structure visualizations, tables, diagrams,
            callouts, and general documentation primitives — designed to drop
            straight into MDX-powered docs sites.
          </p>
          <p className="leading-7 text-muted-foreground">
            It follows the{" "}
            <Link
              href="https://ui.shadcn.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground"
            >
              shadcn/ui
            </Link>{" "}
            copy-and-paste philosophy: components are added to <em>your</em>{" "}
            project via the CLI and live in your codebase, not buried in{" "}
            <code>node_modules</code>, so you can read, modify, and own every
            line.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            How it started
          </h2>
          <p className="leading-7 text-muted-foreground">
            {siteConfig.name} started in December 2025 as a focused component
            library for technical and educational documentation — the kind of
            content that needs more than headings and code blocks: equations,
            complexity tables, register maps, tree and graph visualizers, and
            interactive walkthroughs.
          </p>
          <p className="leading-7 text-muted-foreground">
            It&rsquo;s released under the{" "}
            <Link
              href={siteConfig.license.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground"
            >
              {siteConfig.license.name} License
            </Link>{" "}
            and built fully in the open on GitHub — issues, discussions, and
            pull requests are welcome.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Maintainers
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {authors.map((author) => (
              <div
                key={author.name}
                className="flex flex-col gap-2 rounded-lg border p-4"
              >
                <div>
                  <h3 className="font-semibold">{author.name}</h3>
                  <p className="text-sm text-muted-foreground">{author.role}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <Link
                    href={author.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${author.name} on GitHub`}
                    className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                  >
                    <Github className="h-4 w-4" />
                  </Link>
                  {author.twitter && (
                    <Link
                      href={author.twitter}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${author.name} on Twitter`}
                      className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <Twitter className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight">
            Get involved
          </h2>
          <p className="leading-7 text-muted-foreground">
            Whether it&rsquo;s reporting a bug, suggesting a component, or
            opening a pull request, contributions of all sizes are welcome.
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-9 items-center gap-1.5 rounded-md border px-4 text-sm font-medium transition-colors hover:bg-accent"
            >
              <Github className="h-4 w-4" />
              View on GitHub
            </Link>
            <Link
              href="/community"
              className="inline-flex h-9 items-center gap-1.5 rounded-md bg-green-500 px-4 text-sm font-semibold text-green-950 transition-colors hover:bg-green-400"
            >
              Join the community
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
