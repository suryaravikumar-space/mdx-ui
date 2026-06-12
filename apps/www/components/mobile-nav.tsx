"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicSidebar } from "@/components/dynamic-sidebar";

const navLinks = [
  { label: "/docs", href: "/docs" },
  { label: "/components", href: "/components" },
  { label: "/playground", href: "/playground" },
];

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="-ml-1.5 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute left-0 top-14 h-[calc(100vh-3.5rem)] w-[85%] max-w-xs overflow-y-auto border-r border-border/60 bg-background p-6 shadow-xl">
            <nav className="flex flex-col gap-1 border-b border-border/60 pb-4">
              {navLinks.map(({ label, href }) => {
                const isActive = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "rounded-md px-3 py-2 font-mono text-sm transition-colors",
                      isActive
                        ? "bg-green-500/8 text-green-600 dark:text-green-400"
                        : "text-muted-foreground hover:bg-accent hover:text-foreground",
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
            <div className="pt-4">
              <DynamicSidebar />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
