"use client";

import React, { useState, useEffect, useCallback } from "react";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import { cn } from "@/lib/utils";
import { transitions } from "@/lib/primitives";
import { PLAYGROUND_COMPONENTS } from "@/lib/playground-components";
import { compileMdx } from "@/app/playground/actions";

interface SandboxProps {
  /** Initial MDX code shown in the editor */
  code: string;
  /** Min height of the preview pane */
  minHeight?: number;
}

type Tab = "preview" | "code" | "edit";

export function Sandbox({ code: defaultCode, minHeight = 120 }: SandboxProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const [source, setSource] = useState(defaultCode);
  const [compiled, setCompiled] = useState<MDXRemoteSerializeResult | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [copied, setCopied] = useState(false);

  const compile = useCallback(async (mdx: string) => {
    setIsCompiling(true);
    const res = await compileMdx(mdx);
    setIsCompiling(false);
    if (res.ok) {
      setCompiled(res.result);
      setError(null);
    } else {
      setError(res.error);
    }
  }, []);

  // compile on mount with default code
  useEffect(() => {
    compile(defaultCode);
  }, []);

  // recompile on edit with debounce
  useEffect(() => {
    if (tab !== "edit") return;
    const t = setTimeout(() => compile(source), 600);
    return () => clearTimeout(t);
  }, [source, tab, compile]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(source).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openInPlayground = () => {
    const encoded = btoa(unescape(encodeURIComponent(source)));
    window.open(`/playground?code=${encoded}`, "_blank");
  };

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-border bg-muted/80 px-2 py-1.5">
        <div className="flex gap-1">
          {(["preview", "code", "edit"] as Tab[]).map((t) => (
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
              {t === "edit"
                ? "✏️ Edit"
                : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {(tab === "code" || tab === "edit") && (
            <button
              type="button"
              onClick={handleCopy}
              className={cn(
                "text-xs",
                transitions.colors,
                "text-muted-foreground hover:text-foreground",
              )}
            >
              {copied ? "✓ Copied" : "Copy"}
            </button>
          )}
          <button
            type="button"
            onClick={openInPlayground}
            className={cn(
              "rounded border border-border px-2 py-0.5 text-xs",
              transitions.colors,
              "text-muted-foreground hover:border-foreground/30 hover:text-foreground",
            )}
          >
            Open in Playground ↗
          </button>
        </div>
      </div>

      {/* Preview tab */}
      {tab === "preview" && (
        <div
          className="flex items-center justify-center bg-background p-6"
          style={{ minHeight }}
        >
          {compiled ? (
            <div className="w-full">
              <MDXRemote
                {...compiled}
                components={PLAYGROUND_COMPONENTS as any}
              />
            </div>
          ) : (
            <span className="animate-pulse font-mono text-xs text-muted-foreground">
              loading…
            </span>
          )}
        </div>
      )}

      {/* Code tab — read-only */}
      {tab === "code" && (
        <pre
          className="overflow-x-auto bg-muted p-4 font-mono text-sm leading-6"
          style={{ minHeight }}
        >
          <code>{defaultCode}</code>
        </pre>
      )}

      {/* Edit tab — live editable */}
      {tab === "edit" && (
        <div className="flex min-h-0" style={{ minHeight: minHeight + 80 }}>
          {/* Editor */}
          <div className="flex w-1/2 flex-col border-r border-border">
            <div className="border-b border-border bg-muted/40 px-3 py-1">
              <span className="font-mono text-xs text-muted-foreground">
                mdx
              </span>
            </div>
            <textarea
              value={source}
              onChange={(e) => setSource(e.target.value)}
              spellCheck={false}
              className="flex-1 resize-none bg-background px-4 py-3 font-mono text-sm leading-6 text-foreground outline-none"
              style={{ tabSize: 2, minHeight: minHeight + 60 }}
              aria-label="MDX editor"
            />
          </div>

          {/* Live preview */}
          <div className="flex w-1/2 flex-col">
            <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-3 py-1">
              <span className="font-mono text-xs text-muted-foreground">
                preview
              </span>
              {isCompiling && (
                <span className="animate-pulse font-mono text-xs text-muted-foreground">
                  compiling…
                </span>
              )}
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {error ? (
                <div className="rounded border border-destructive/50 bg-destructive/10 p-3">
                  <p className="mb-1 font-mono text-xs font-semibold text-destructive">
                    Error
                  </p>
                  <pre className="whitespace-pre-wrap font-mono text-xs text-destructive/80">
                    {error}
                  </pre>
                </div>
              ) : compiled ? (
                <MDXRemote
                  {...compiled}
                  components={PLAYGROUND_COMPONENTS as any}
                />
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
