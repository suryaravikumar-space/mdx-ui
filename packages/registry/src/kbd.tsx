import * as React from "react";
import { cn } from "@/lib/utils";

export type KbdProps = React.HTMLAttributes<HTMLElement>

export const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, children, ...props }, ref) => (
    <kbd
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs font-medium text-muted-foreground shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </kbd>
  ),
);
Kbd.displayName = "Kbd";
