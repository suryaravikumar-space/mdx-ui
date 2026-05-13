"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface TabInfo {
  label: string;
  content: React.ReactNode;
}

export interface CodeGroupProps {
  children: React.ReactNode;
  className?: string;
}

/** Extract tab label + content from a child element.
 *
 *  Two shapes are handled:
 *  1. Raw <pre data-language="x" data-title="y"> — from demos / direct JSX.
 *  2. <figure data-rehype-pretty-code-figure> wrapping a <figcaption> and <pre>
 *     — produced by rehype-pretty-code when code fences live inside MDX JSX.
 */
function extractTab(child: React.ReactElement): TabInfo | null {
  const props = child.props as Record<string, unknown>;

  // ── Shape 1: direct <pre data-language data-title> ──────────────────────────
  if (props["data-language"] !== undefined || props["data-title"] !== undefined) {
    return {
      label:
        (props["data-title"] as string | undefined) ??
        (props["data-language"] as string | undefined) ??
        "Code",
      content: props.children as React.ReactNode,
    };
  }

  // ── Shape 2: <figure data-rehype-pretty-code-figure> ────────────────────────
  if ("data-rehype-pretty-code-figure" in props) {
    let title: string | undefined;
    let language: string | undefined;
    let codeContent: React.ReactNode;

    React.Children.forEach(
      props.children as React.ReactNode,
      (figChild) => {
        if (!React.isValidElement(figChild)) return;
        const fp = figChild.props as Record<string, unknown>;

        // figcaption holds the title text
        if ("data-rehype-pretty-code-title" in fp) {
          title = typeof fp.children === "string" ? fp.children : undefined;
          language =
            language ?? (fp["data-language"] as string | undefined);
        }

        // pre holds the highlighted code
        if ((figChild.type as string) === "pre" || fp["data-language"] !== undefined) {
          language =
            language ?? (fp["data-language"] as string | undefined);
          // Pass the whole pre so Shiki colours are preserved
          codeContent = figChild;
        }
      },
    );

    return {
      label: title ?? language ?? "Code",
      content: codeContent ?? null,
    };
  }

  return null;
}

export const CodeGroup = React.forwardRef<HTMLElement, CodeGroupProps>(
  function CodeGroup({ children, className }, ref) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [copied, setCopied] = React.useState(false);
    const panelRef = React.useRef<HTMLDivElement>(null);

    const tabs: TabInfo[] = [];
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      const tab = extractTab(child);
      if (tab) tabs.push(tab);
    });

    if (tabs.length === 0) return null;

    const clampedIndex = Math.min(activeIndex, tabs.length - 1);
    const active = tabs[clampedIndex];

    const handleCopy = async () => {
      const text = panelRef.current?.innerText ?? "";
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard not available
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        setActiveIndex((index + 1) % tabs.length);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setActiveIndex((index - 1 + tabs.length) % tabs.length);
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveIndex(tabs.length - 1);
      }
    };

    return (
      <figure
        ref={ref}
        className={cn(
          "my-6 overflow-hidden rounded-xl border border-green-500/15 bg-zinc-950",
          className,
        )}
        data-code-block
      >
        {/* Tab bar */}
        <div className="flex items-center justify-between border-b border-green-500/10 bg-zinc-900/80">
          <div
            role="tablist"
            aria-label="Code examples"
            className="flex min-w-0 flex-1"
            style={{ overflowX: "auto", scrollbarWidth: "none" }}
          >
            {tabs.map((tab, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === clampedIndex}
                tabIndex={i === clampedIndex ? 0 : -1}
                onClick={() => setActiveIndex(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                className={cn(
                  "relative shrink-0 px-4 py-2.5 font-mono text-xs font-medium transition-colors",
                  i === clampedIndex
                    ? "text-green-400"
                    : "text-zinc-500 hover:text-zinc-300",
                )}
              >
                {tab.label}
                {i === clampedIndex && (
                  <span className="absolute inset-x-0 bottom-0 h-px bg-green-500" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="shrink-0 select-none px-4 py-2.5 font-mono text-xs text-zinc-500 transition-colors hover:text-green-400"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? "✓ copied" : "copy"}
          </button>
        </div>

        {/* Active tab content — data-rehype-pretty-code-figure keeps Shiki CSS vars in scope */}
        <div
          ref={panelRef}
          role="tabpanel"
          data-rehype-pretty-code-figure=""
          className="overflow-x-auto [&_pre]:m-0 [&_pre]:rounded-none [&_pre]:border-0 [&_pre]:bg-transparent [&_pre]:p-4"
        >
          {active.content}
        </div>
      </figure>
    );
  },
);
CodeGroup.displayName = "CodeGroup";
