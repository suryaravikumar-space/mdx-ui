"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { TocEntry } from "@/lib/toc";

interface TocProps {
  toc: TocEntry[];
}

export function TableOfContents({ toc }: TocProps) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0% 0% -80% 0%",
      },
    );

    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((heading) => observer.observe(heading));

    return () => {
      headings.forEach((heading) => observer.unobserve(heading));
    };
  }, []);

  if (!toc || toc.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-foreground/40">
        On This Page
      </p>
      <Tree tree={toc} activeId={activeId} />
    </div>
  );
}

function Tree({ tree, activeId }: { tree: TocEntry[]; activeId: string }) {
  return tree?.length ? (
    <div className="flex flex-col space-y-1">
      {tree.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          className={cn(
            "border-l-2 py-1 pl-3 text-sm leading-snug no-underline transition-colors",
            item.level === 3 && "ml-3 text-[13px]",
            activeId === item.id
              ? "border-green-500 font-medium text-foreground"
              : "border-transparent text-muted-foreground hover:border-border hover:text-foreground",
          )}
        >
          {item.text}
        </a>
      ))}
    </div>
  ) : null;
}
