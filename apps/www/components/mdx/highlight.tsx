import * as React from "react";
import { cn } from "@/lib/utils";

// Marker-style highlight: transparent top 45%, colour bottom 55%
// Uses Tailwind arbitrary bg values so dark: variant works correctly.
const colorClasses: Record<string, string> = {
  yellow: [
    "bg-[linear-gradient(transparent_45%,rgba(253,224,71,0.55)_45%)]",
    "dark:bg-[linear-gradient(transparent_45%,rgba(253,224,71,0.22)_45%)]",
  ].join(" "),
  blue: [
    "bg-[linear-gradient(transparent_45%,rgba(147,197,253,0.65)_45%)]",
    "dark:bg-[linear-gradient(transparent_45%,rgba(96,165,250,0.25)_45%)]",
  ].join(" "),
  green: [
    "bg-[linear-gradient(transparent_45%,rgba(134,239,172,0.65)_45%)]",
    "dark:bg-[linear-gradient(transparent_45%,rgba(74,222,128,0.25)_45%)]",
  ].join(" "),
  pink: [
    "bg-[linear-gradient(transparent_45%,rgba(249,168,212,0.65)_45%)]",
    "dark:bg-[linear-gradient(transparent_45%,rgba(244,114,182,0.25)_45%)]",
  ].join(" "),
  purple: [
    "bg-[linear-gradient(transparent_45%,rgba(216,180,254,0.65)_45%)]",
    "dark:bg-[linear-gradient(transparent_45%,rgba(192,132,252,0.25)_45%)]",
  ].join(" "),
};

export interface HighlightProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Highlight colour — simulates a real marker pen.
   * @default "yellow"
   */
  color?: "yellow" | "blue" | "green" | "pink" | "purple";
  children: React.ReactNode;
}

export const Highlight = React.forwardRef<HTMLElement, HighlightProps>(
  ({ color = "yellow", className, children, ...props }, ref) => (
    <mark
      ref={ref}
      className={cn(
        "rounded-sm bg-transparent [background-size:100%_100%] [background-repeat:no-repeat]",
        colorClasses[color] ?? colorClasses.yellow,
        className,
      )}
      {...props}
    >
      {children}
    </mark>
  ),
);
Highlight.displayName = "Highlight";
