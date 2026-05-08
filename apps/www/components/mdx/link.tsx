import * as React from "react"
import { cn } from "@/lib/utils"

function isExternalUrl(href: string): boolean {
  try {
    const url = new URL(href)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Override auto-detection of external URLs */
  external?: boolean
}

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href = "", children, className, external, target, rel, ...props }, ref) => {
    const isExternal = external ?? isExternalUrl(href)

    return (
      <a
        ref={ref}
        href={href}
        target={isExternal ? (target ?? "_blank") : target}
        rel={isExternal ? (rel ?? "noopener noreferrer") : rel}
        className={cn(
          "font-medium underline underline-offset-4 hover:text-foreground transition-colors",
          "inline-flex items-center gap-0.5",
          className
        )}
        {...props}
      >
        {children}
        {isExternal && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="shrink-0"
          >
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </svg>
        )}
      </a>
    )
  }
)
Link.displayName = "Link"
