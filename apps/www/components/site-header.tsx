"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "/docs", href: "/docs" },
  { label: "/components", href: "/components" },
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur-xl">
      <div className="container grid h-14 grid-cols-3 items-center">

        {/* Left — logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-green-400 to-green-600 shadow-sm shadow-green-500/30">
            <span className="font-mono text-[11px] font-bold leading-none text-green-950">
              /&gt;
            </span>
          </div>
          <span className="font-mono text-sm font-semibold tracking-tight">
            MDX UI
          </span>
        </Link>

        {/* Center — nav links */}
        <nav className="flex items-center justify-center gap-1">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "rounded-md px-3 py-1.5 font-mono text-sm transition-colors",
                  isActive
                    ? "bg-green-500/8 text-green-600 dark:text-green-400"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Right — actions */}
        <div className="flex items-center justify-end gap-1.5">
          <Link
            href="https://github.com/suryaravikumar-space/mdx-ui"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          >
            <Github className="h-4 w-4" />
          </Link>
          <ThemeToggle />
          <Link
            href="/docs"
            className="ml-1 inline-flex h-8 items-center justify-center rounded-md bg-green-500 px-4 font-mono text-xs font-semibold text-green-950 transition-all hover:bg-green-400"
          >
            $ init
          </Link>
        </div>

      </div>
    </header>
  );
}
