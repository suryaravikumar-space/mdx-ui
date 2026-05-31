import * as React from "react";
import { cn } from "@/lib/utils";

// ─── TerminalLine ─────────────────────────────────────────────────────────────

export interface TerminalLineProps {
  /** Render as a command input line (adds $ prompt, white text) */
  cmd?: boolean;
  children: React.ReactNode;
}

export const TerminalLine = React.forwardRef<HTMLDivElement, TerminalLineProps>(
  ({ cmd = false, children }, ref) => (
    <div ref={ref} className="flex gap-2 font-mono text-sm leading-6">
      {cmd && (
        <span className="select-none text-green-400" aria-hidden="true">
          $
        </span>
      )}
      <span className={cn(cmd ? "text-zinc-100" : "text-zinc-400")}>
        {children}
      </span>
    </div>
  ),
);
TerminalLine.displayName = "TerminalLine";

// ─── Terminal ─────────────────────────────────────────────────────────────────

export interface TerminalProps extends React.HTMLAttributes<HTMLElement> {
  title?: string;
}

export const Terminal = React.forwardRef<HTMLElement, TerminalProps>(
  ({ title = "Terminal", children, className, ...props }, ref) => (
    <figure
      ref={ref}
      className={cn(
        "my-6 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900",
        className,
      )}
      {...props}
    >
      {/* Title bar */}
      <div className="flex items-center gap-3 border-b border-zinc-700 bg-zinc-800 px-4 py-2">
        <div className="flex gap-1.5" aria-hidden="true">
          <div className="h-3 w-3 rounded-full bg-red-500/80" />
          <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <div className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        {title && (
          <span className="flex-1 text-center text-xs text-zinc-400">
            {title}
          </span>
        )}
      </div>
      {/* Content */}
      <div className="space-y-0.5 p-4">{children}</div>
    </figure>
  ),
);
Terminal.displayName = "Terminal";
