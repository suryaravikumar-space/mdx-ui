import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Change type badge styles ─────────────────────────────────────────────────

const CHANGE_TYPES = {
  added: {
    label: "Added",
    className:
      "bg-green-500/10  text-green-700  dark:text-green-400  border-green-500/20",
  },
  fixed: {
    label: "Fixed",
    className:
      "bg-blue-500/10   text-blue-700   dark:text-blue-400   border-blue-500/20",
  },
  changed: {
    label: "Changed",
    className:
      "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  },
  removed: {
    label: "Removed",
    className:
      "bg-red-500/10    text-red-700    dark:text-red-400    border-red-500/20",
  },
  security: {
    label: "Security",
    className:
      "bg-orange-500/10 text-orange-700 dark:text-orange-400 border-orange-500/20",
  },
} as const;

export type ChangeType = keyof typeof CHANGE_TYPES;

// ─── ChangelogItem ────────────────────────────────────────────────────────────

export interface ChangelogItemProps extends React.HTMLAttributes<HTMLLIElement> {
  type?: ChangeType;
}

export const ChangelogItem = React.forwardRef<
  HTMLLIElement,
  ChangelogItemProps
>(({ type = "added", children, className, ...props }, ref) => {
  const meta = CHANGE_TYPES[type];
  return (
    <li
      ref={ref}
      className={cn("flex items-start gap-3 py-1", className)}
      {...props}
    >
      <span
        className={cn(
          "mt-0.5 shrink-0 rounded border px-1.5 py-0.5 text-xs font-medium",
          meta.className,
        )}
      >
        {meta.label}
      </span>
      <span className="text-sm text-muted-foreground leading-relaxed">
        {children}
      </span>
    </li>
  );
});
ChangelogItem.displayName = "ChangelogItem";

// ─── ChangelogEntry ───────────────────────────────────────────────────────────

export interface ChangelogEntryProps extends React.HTMLAttributes<HTMLDivElement> {
  version: string;
  date?: string;
}

export const ChangelogEntry = React.forwardRef<
  HTMLDivElement,
  ChangelogEntryProps
>(({ version, date, children, className, ...props }, ref) => (
  <div ref={ref} className={cn("relative pl-6", className)} {...props}>
    {/* Timeline dot */}
    <div className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full border-2 border-primary bg-background" />
    <div className="mb-2 flex items-baseline gap-3">
      <span className="font-mono text-sm font-bold text-foreground">
        {version}
      </span>
      {date && <span className="text-xs text-muted-foreground">{date}</span>}
    </div>
    <ul className="space-y-0.5">{children}</ul>
  </div>
));
ChangelogEntry.displayName = "ChangelogEntry";

// ─── Changelog ───────────────────────────────────────────────────────────────

export type ChangelogProps = React.HTMLAttributes<HTMLDivElement>

export const Changelog = React.forwardRef<HTMLDivElement, ChangelogProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "my-6 ml-1.5 space-y-8 border-l-2 border-border pl-4",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  ),
);
Changelog.displayName = "Changelog";
