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

export const CodeGroup = React.forwardRef<HTMLElement, CodeGroupProps>(
  function CodeGroup({ children, className }, ref) {
    const [activeIndex, setActiveIndex] = React.useState(0);
    const [copied, setCopied] = React.useState(false);
    const preRef = React.useRef<HTMLPreElement>(null);

    // Each child is a CodeBlock (or styled pre) element from the mdx component map.
    // rehype-pretty-code sets data-language and data-title on the <pre>; those props
    // pass through regardless of which component pre is mapped to.
    const tabs: TabInfo[] = [];
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) return;
      const props = child.props as Record<string, unknown>;
      const language = props["data-language"] as string | undefined;
      const title = props["data-title"] as string | undefined;
      tabs.push({
        label: title ?? language ?? "Code",
        content: props.children as React.ReactNode,
      });
    });

    if (tabs.length === 0) return null;

    const clampedIndex = Math.min(activeIndex, tabs.length - 1);
    const active = tabs[clampedIndex];

    const handleCopy = async () => {
      const text = preRef.current?.innerText ?? "";
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
          "my-6 overflow-hidden rounded-lg border border-border bg-muted",
          className,
        )}
        data-code-block
      >
        {/* Tab bar */}
        <div className="flex items-center justify-between border-b border-border bg-muted/80 min-h-[36px]">
          <div
            className="flex overflow-x-auto"
            role="tablist"
            aria-label="Code examples"
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
                  "px-4 py-2 text-sm font-medium transition-colors shrink-0 border-b-2 -mb-px",
                  i === clampedIndex
                    ? "text-foreground border-primary"
                    : "text-muted-foreground border-transparent hover:text-foreground",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleCopy}
            className="px-4 text-xs text-muted-foreground hover:text-foreground transition-colors select-none shrink-0"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>

        {/* Active tab content */}
        <pre
          ref={preRef}
          role="tabpanel"
          className="overflow-x-auto p-4 text-sm [&_code]:bg-transparent [&_code]:p-0 [&_code]:border-0 [&_code]:text-inherit"
        >
          {active.content}
        </pre>
      </figure>
    );
  },
);
CodeGroup.displayName = "CodeGroup";
