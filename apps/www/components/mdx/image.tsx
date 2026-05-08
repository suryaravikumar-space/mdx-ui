import * as React from "react"
import { cn } from "@/lib/utils"

// ─── Image ───────────────────────────────────────────────────────────────────

export interface ImageProps extends React.HTMLAttributes<HTMLElement> {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export const Image = React.forwardRef<HTMLElement, ImageProps>(
  ({ src, alt, caption, className, width, height, ...props }, ref) => (
    <figure ref={ref} className={cn("my-6 flex flex-col", className)} {...props}>
      <div className="overflow-hidden rounded-lg border border-border bg-card">
        <img src={src} alt={alt} width={width} height={height} className="w-full" />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
)
Image.displayName = "Image"

// ─── ImageGlossary ───────────────────────────────────────────────────────────
// Responsive 1–3 column grid of images, as seen in react.dev.
//
// Usage:
//   <ImageGlossary>
//     <Image src="/before.png" alt="Before" caption="Before" />
//     <Image src="/after.png"  alt="After"  caption="After"  />
//   </ImageGlossary>

const colClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
}

export interface ImageGlossaryProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3
  caption?: string
}

export const ImageGlossary = React.forwardRef<HTMLDivElement, ImageGlossaryProps>(
  ({ cols, children, caption, className, ...props }, ref) => {
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
ImageGlossary.displayName = "ImageGlossary"
