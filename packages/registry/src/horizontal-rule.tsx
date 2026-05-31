import * as React from "react";
import { cn } from "@/lib/utils";

export interface HorizontalRuleProps extends React.HTMLAttributes<HTMLHRElement> {
  variant?: "default" | "dashed" | "dotted" | "gradient";
}

export const HorizontalRule = React.forwardRef<
  HTMLHRElement,
  HorizontalRuleProps
>(({ className, variant = "default", ...props }, ref) => {
  const variantStyles = {
    default: "border-t border-border",
    dashed: "border-t border-dashed border-border",
    dotted: "border-t border-dotted border-border",
    gradient:
      "h-px bg-gradient-to-r from-transparent via-border to-transparent border-0",
  };

  return (
    <hr
      ref={ref}
      className={cn("my-8", variantStyles[variant], className)}
      {...props}
    />
  );
});
HorizontalRule.displayName = "HorizontalRule";
