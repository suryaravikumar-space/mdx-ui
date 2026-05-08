import * as React from "react"
import { cn } from "@/lib/utils"

export interface ImageProps extends React.HTMLAttributes<HTMLElement> {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
}

export const Image = React.forwardRef<HTMLElement, ImageProps>(
  ({ src, alt, caption, className, width, height, ...props }, ref) => (
    <figure ref={ref} className={cn("my-6", className)} {...props}>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg border border-border w-full"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
          {caption}
        </figcaption>
      )}
    </figure>
  )
)
Image.displayName = "Image"
