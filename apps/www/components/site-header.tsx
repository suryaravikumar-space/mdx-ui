import Link from "next/link";
import { Code2 } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-indigo-500 shadow-lg shadow-violet-500/25">
              <Code2 className="h-4 w-4 text-white" />
            </div>
            <span className="bg-gradient-to-r from-violet-600 to-indigo-400 bg-clip-text font-bold text-transparent dark:from-violet-400 dark:to-indigo-300">
              MDX UI
            </span>
          </Link>
        </div>
        <nav className="flex flex-1 items-center justify-end space-x-6 text-sm font-medium">
          <Link
            href="/docs"
            className="transition-colors hover:text-violet-600 dark:hover:text-violet-400"
          >
            Documentation
          </Link>
          <Link
            href="/components"
            className="transition-colors hover:text-violet-600 dark:hover:text-violet-400"
          >
            Components
          </Link>
          <Link
            href="https://github.com/suryaravikumar-space/mdx-ui"
            className="transition-colors hover:text-violet-600 dark:hover:text-violet-400"
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
