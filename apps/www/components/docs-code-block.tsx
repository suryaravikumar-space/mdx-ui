"use client";

import * as React from "react";

export function DocsCodeBlock({
  children,
  ...props
}: React.HTMLAttributes<HTMLPreElement>) {
  const ref = React.useRef<HTMLPreElement>(null);
  const [copied, setCopied] = React.useState(false);
  const [playground, setPlayground] = React.useState(false);

  function getCode() {
    return ref.current?.textContent ?? "";
  }

  function copy() {
    navigator.clipboard.writeText(getCode()).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  function openInPlayground() {
    const code = getCode();
    navigator.clipboard.writeText(code).catch(() => {});
    setPlayground(true);
    setTimeout(() => setPlayground(false), 1500);
    const bytes = new TextEncoder().encode(code);
    let binary = "";
    for (const byte of bytes) binary += String.fromCharCode(byte);
    const encoded = btoa(binary);
    window.location.href = `/playground?code=${encoded}`;
  }

  const btnClass =
    "flex items-center gap-1 rounded border border-white/10 bg-white/5 px-2 py-1 font-mono text-[11px] text-white/40 opacity-0 transition-all group-hover:opacity-100 hover:border-white/20 hover:bg-white/10 hover:text-white/80";

  return (
    <div className="group relative">
      <pre
        ref={ref}
        className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4"
        {...props}
      >
        {children}
      </pre>
      <div className="absolute right-2 top-2 flex gap-1">
        <button onClick={copy} title="Copy code" className={btnClass}>
          {copied ? "✓" : "Copy"}
        </button>
        <button
          onClick={openInPlayground}
          title="Copy and open in Playground"
          className={btnClass}
        >
          {playground ? "✓" : "Try in Playground ↗"}
        </button>
      </div>
    </div>
  );
}
