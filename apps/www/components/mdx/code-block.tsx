"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  title?: string;
  showLineNumbers?: boolean;
  /** Set by rehype-pretty-code: the fenced code language (e.g. "tsx") */
  "data-language"?: string;
  /** Set by rehype-pretty-code when a title annotation is present */
  "data-title"?: string;
}

export const CodeBlock = React.forwardRef<HTMLElement, CodeBlockProps>(
  function CodeBlock(
    {
      className,
      title,
      showLineNumbers = false,
      children,
      "data-language": dataLanguage,
      "data-title": dataTitle,
      ...props
    },
    ref,
  ) {
    const [copied, setCopied] = React.useState(false);
    const preRef = React.useRef<HTMLPreElement>(null);

    const displayTitle = title ?? dataTitle;
    const language = dataLanguage;

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

    return (
      <figure
        ref={ref}
        className="my-6 overflow-hidden rounded-lg border border-border bg-muted"
        data-code-block
      >
        <div className="flex items-center justify-between border-b border-border bg-muted/80 px-4 py-2 min-h-[36px]">
          <div className="flex items-center gap-2">
            {displayTitle ? (
              <span className="text-sm font-medium text-foreground">
                {displayTitle}
              </span>
            ) : language ? (
              <span className="text-xs text-muted-foreground font-mono uppercase tracking-wide">
                {language}
              </span>
            ) : null}
          </div>
          <button
            onClick={handleCopy}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors select-none"
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
        </div>
        <pre
          ref={preRef}
          className={cn(
            "overflow-x-auto p-4 text-sm",
            "[&_code]:bg-transparent [&_code]:p-0 [&_code]:border-0 [&_code]:text-inherit",
            showLineNumbers && "[counter-reset:line]",
            className,
          )}
          {...props}
        >
          {children}
        </pre>
      </figure>
    );
  },
);
CodeBlock.displayName = "CodeBlock";
