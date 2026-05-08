import * as React from "react"
import { cn } from "@/lib/utils"

export interface VideoProps extends React.HTMLAttributes<HTMLElement> {
  src: string
  title?: string
  caption?: string
  autoPlay?: boolean
  loop?: boolean
  muted?: boolean
}

function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtube\.com\/watch\?(?:.*&)?v=([a-zA-Z0-9_-]+)/,
    /youtu\.be\/([a-zA-Z0-9_-]+)/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]+)/,
  ]
  for (const p of patterns) {
    const m = url.match(p)
    if (m) return m[1]
  }
  return null
}

function getVimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(\d+)/)
  return m ? m[1] : null
}

export const Video = React.forwardRef<HTMLElement, VideoProps>(
  ({ src, title, caption, autoPlay, loop, muted, className, ...props }, ref) => {
    const youtubeId = getYouTubeId(src)
    const vimeoId = !youtubeId ? getVimeoId(src) : null
    const isHtml5 = !youtubeId && !vimeoId

    return (
      <figure ref={ref} className={cn("my-6", className)} {...props}>
        <div className="overflow-hidden rounded-lg border border-border bg-black">
          {youtubeId ? (
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}${autoPlay ? "?autoplay=1" : ""}`}
                title={title ?? "YouTube video"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          ) : vimeoId ? (
            <div className="relative aspect-video">
              <iframe
                src={`https://player.vimeo.com/video/${vimeoId}${autoPlay ? "?autoplay=1" : ""}`}
                title={title ?? "Vimeo video"}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
          ) : (
            <video
              src={src}
              title={title}
              controls
              autoPlay={autoPlay}
              loop={loop}
              muted={muted ?? autoPlay}
              playsInline
              className="w-full"
            />
          )}
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  }
)
Video.displayName = "Video"
