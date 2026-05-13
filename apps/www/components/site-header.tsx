import Link from "next/link";
import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-500/10 bg-background/90 backdrop-blur-xl">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-green-500/25 to-transparent" />
      <div className="container grid h-16 grid-cols-3 items-center">

        {/* Left — logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-green-400 to-green-600 shadow-md shadow-green-500/30">
            <span className="font-mono text-[11px] font-bold leading-none text-green-950">
              /&gt;
            </span>
          </div>
          <span className="font-mono text-sm font-bold tracking-tight">
            MDX UI
          </span>
        </Link>

        {/* Center — nav links */}
        <nav className="flex items-center justify-center gap-6">
          {[
            { label: "/docs", href: "/docs" },
            { label: "/components", href: "/components" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right — CTA + actions */}
        <div className="flex items-center justify-end gap-2">
          <Link
            href="https://github.com/suryaravikumar-space/mdx-ui"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </Link>
          <ThemeToggle />
          <Link
            href="/docs"
            className="ml-1 inline-flex h-8 items-center justify-center rounded-md bg-green-500 px-4 font-mono text-xs font-semibold text-green-950 shadow-[0_0_20px_-4px_rgba(34,197,94,0.6)] transition-all hover:bg-green-400"
          >
            $ init
          </Link>
        </div>

      </div>
    </header>
  );
}
