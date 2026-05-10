import * as React from "react";
import { cn } from "@/lib/utils";
import { transitions } from "@/lib/primitives";

export interface PreviewProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Raw source code string displayed in the Code tab */
  code: string;
  /** Language label shown in the code pane (e.g. "tsx", "html") */
  lang?: string;
  /**
   * The rendered component(s) shown in the Preview tab.
   * Authors write this as JSX children; the code string is separate.
   */
  children: React.ReactNode;
}

/**
 * Preview — side-by-side (tabbed) component preview + source code.
 *
 * Shows a "Preview" tab with the rendered output and a "Code" tab with
 * the raw source. Includes a copy button on the code pane.
 *
 * @example
 * <Preview lang="tsx" code={`<Badge variant="success">Done</Badge>`}>
 *   <Badge variant="success">Done</Badge>
 * </Preview>
 */
export const Preview = React.forwardRef<HTMLDivElement, PreviewProps>(
  ({ code, lang = "tsx", children, className, ...props }, ref) => {
    const [tab, setTab] = React.useState<"preview" | "code">("preview");
    const [copied, setCopied] = React.useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard unavailable
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          "my-6 overflow-hidden rounded-lg border border-border",
          className,
        )}
        {...props}
      >
        {/* Tab bar */}
        <div className="flex items-center justify-between border-b border-border bg-muted/80 px-2 py-1.5">
          <div className="flex gap-1">
            {(["preview", "code"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-md px-3 py-1 text-xs font-medium capitalize",
                  transitions.colors,
                  tab === t
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {tab === "code" && (
            <button
              type="button"
              onClick={handleCopy}
              aria-label={copied ? "Copied" : "Copy code"}
              className={cn(
                "mr-1 text-xs",
                transitions.colors,
                "text-muted-foreground hover:text-foreground",
              )}
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          )}
        </div>

        {/* Preview pane */}
        {tab === "preview" && (
          <div className="flex min-h-24 items-center justify-center bg-background p-6">
            {children}
          </div>
        )}

        {/* Code pane */}
        {tab === "code" && (
          <div className="relative bg-muted">
            <span className="absolute right-3 top-2 font-mono text-xs uppercase tracking-wide text-muted-foreground">
              {lang}
            </span>
            <pre className="overflow-x-auto p-4 text-sm">
              <code>{code}</code>
            </pre>
          </div>
        )}
      </div>
    );
  },
);
Preview.displayName = "Preview";
