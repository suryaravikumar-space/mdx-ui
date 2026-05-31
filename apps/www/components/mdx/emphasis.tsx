import * as React from "react";
import { cn } from "@/lib/utils";

export interface EmphasisProps extends React.HTMLAttributes<HTMLElement> {}

export const Strong = React.forwardRef<HTMLElement, EmphasisProps>(
  ({ children, className, ...props }, ref) => (
    <strong
      ref={ref}
      className={cn("font-semibold text-foreground", className)}
      {...props}
    >
      {children}
    </strong>
  ),
);
Strong.displayName = "Strong";

export const Em = React.forwardRef<HTMLElement, EmphasisProps>(
  ({ children, className, ...props }, ref) => (
    <em
      ref={ref}
      className={cn("italic text-foreground", className)}
      {...props}
    >
      {children}
    </em>
  ),
);
Em.displayName = "Em";
