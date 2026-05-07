import * as React from "react"
import { cn } from "@/lib/utils"

export interface HorizontalRuleProps {
  className?: string
  variant?: "default" | "dashed" | "dotted" | "gradient"
}

export function HorizontalRule({
  className,
  variant = "default"
}: HorizontalRuleProps) {
  const variantStyles = {
    default: "border-t border-border",
    dashed: "border-t border-dashed border-border",
    dotted: "border-t border-dotted border-border",
    gradient: "h-px bg-gradient-to-r from-transparent via-border to-transparent border-0"
  }

  return (
    <hr className={cn("my-8", variantStyles[variant], className)} />
  )
}
