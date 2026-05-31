import * as React from "react";
import { cn } from "@/lib/utils";

// ─── ImageRenderer context ────────────────────────────────────────────────────
// Holds the underlying <img> renderer so consumers can swap in next/image,
// Remix's Image, Astro's image helper, etc. — once at the layout level.

type ImageRenderer = (
  props: React.ImgHTMLAttributes<HTMLImageElement>,
) => React.ReactNode;

const defaultRenderer: ImageRenderer = (props) => (
  // sensible defaults that work in every framework
  <img loading="lazy" decoding="async" {...props} />
);

const ImageRendererContext =
  React.createContext<ImageRenderer>(defaultRenderer);

export interface ImageRendererProviderProps {
  /** Custom image renderer — e.g. Next.js: `(p) => <NextImage {...p} />` */
  renderer: ImageRenderer;
  children: React.ReactNode;
}

export function ImageRendererProvider({
  renderer,
  children,
}: ImageRendererProviderProps) {
  return (
    <ImageRendererContext.Provider value={renderer}>
      {children}
    </ImageRendererContext.Provider>
  );
}

// ─── Image ───────────────────────────────────────────────────────────────────

export interface ImageProps extends React.HTMLAttributes<HTMLElement> {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export const Image = React.forwardRef<HTMLElement, ImageProps>(
  ({ src, alt, caption, className, width, height, ...props }, ref) => {
    const renderImage = React.useContext(ImageRendererContext);
    return (
      <figure
        ref={ref}
        className={cn("my-6 flex flex-col", className)}
        {...props}
      >
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          {renderImage({ src, alt, width, height, className: "w-full" })}
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground italic">
            {caption}
          </figcaption>
        )}
      </figure>
    );
  },
);
Image.displayName = "Image";

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
};

export interface ImageGlossaryProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: 1 | 2 | 3;
  caption?: string;
}

export const ImageGlossary = React.forwardRef<
  HTMLDivElement,
  ImageGlossaryProps
>(({ cols, children, caption, className, ...props }, ref) => {
  const count = React.Children.count(children);
  const resolvedCols = cols ?? ((count <= 3 ? count : 2) as 1 | 2 | 3);

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
  );
});
ImageGlossary.displayName = "ImageGlossary";
