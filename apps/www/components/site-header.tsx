import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-green-500/10 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent" />
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-green-400 to-green-600 shadow-lg shadow-green-500/30">
              <span className="font-mono text-[11px] font-bold leading-none text-green-950">
                /&gt;
              </span>
            </div>
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text font-mono font-bold tracking-tight text-transparent dark:from-green-300 dark:to-emerald-200">
              MDX UI
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-end space-x-6 text-sm font-medium">
          <Link
            href="/docs"
            className="font-mono text-muted-foreground transition-colors hover:text-green-500 dark:hover:text-green-400"
          >
            Documentation
          </Link>
          <Link
            href="/components"
            className="font-mono text-muted-foreground transition-colors hover:text-green-500 dark:hover:text-green-400"
          >
            Components
          </Link>
          <Link
            href="https://github.com/suryaravikumar-space/mdx-ui"
            className="font-mono text-muted-foreground transition-colors hover:text-green-500 dark:hover:text-green-400"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
