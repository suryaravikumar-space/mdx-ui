import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Illustration ────────────────────────────────────────────────────────────
// Single diagram or screenshot with an optional caption.
// Designed to be used standalone or inside IllustrationBlock.

export interface IllustrationProps extends React.HTMLAttributes<HTMLElement> {
  src: string
  alt: string
  caption?: string
}

export const Illustration = React.forwardRef<HTMLElement, IllustrationProps>(
  ({ src, alt, caption, className, ...props }, ref) => (
    <figure ref={ref} className={cn("flex flex-col", className)} {...props}>
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <img
          src={src}
          alt={alt}
          className="w-full"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
)
Illustration.displayName = "Illustration"

// ─── IllustrationBlock ───────────────────────────────────────────────────────
// Responsive grid of 1–3 illustrations, as seen in react.dev.
//
// Usage:
//   <IllustrationBlock>
//     <Illustration src="/before.png" alt="Before" caption="Before" />
//     <Illustration src="/after.png"  alt="After"  caption="After"  />
//   </IllustrationBlock>

const colClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
}

export interface IllustrationBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3
  caption?: string
}

export const IllustrationBlock = React.forwardRef<HTMLDivElement, IllustrationBlockProps>(
  ({ cols, children, caption, className, ...props }, ref) => {
    // Auto-detect column count from number of children if not specified
    const count = React.Children.count(children)
    const resolvedCols = cols ?? ((count <= 3 ? count : 2) as 1 | 2 | 3)

    return (
      <div ref={ref} className={cn("my-6", className)} {...props}>
        <div className={cn("grid gap-4", colClasses[resolvedCols])}>
          {children}
        </div>
        {caption && (
          <p className="mt-3 text-center text-sm text-muted-foreground italic">
            {caption}
          </p>
        )}
      </div>
    )
  }
)
IllustrationBlock.displayName = "IllustrationBlock"
