import * as React from "react"
import { cn } from "@/lib/utils"

export interface ImageProps {
  src: string
  alt: string
  caption?: string
  className?: string
  width?: number
  height?: number
}

export function Image({
  src,
  alt,
  caption,
  className,
  width,
  height
}: ImageProps) {
  return (
    <figure className={cn("my-6", className)}>
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
}
