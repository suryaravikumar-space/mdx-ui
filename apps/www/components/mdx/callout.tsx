import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const calloutVariants = cva(
  "my-6 flex gap-3 rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "border-border bg-muted/50",
        info: "border-sky-300 bg-sky-50 dark:border-sky-800 dark:bg-sky-950/30",
        warning: "border-amber-300 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/30",
        danger: "border-destructive/50 bg-destructive/10",
        success: "border-green-300 bg-green-50 dark:border-green-800 dark:bg-green-950/30",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface CalloutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  icon?: React.ReactNode
  title?: string
}

export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant, icon, title, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(calloutVariants({ variant }), className)}
      {...props}
    >
      {icon && <div className="flex-shrink-0 text-foreground">{icon}</div>}
      <div className="flex-1">
        {title && (
          <div className="mb-1 font-semibold text-foreground">{title}</div>
        )}
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  )
)
Callout.displayName = "Callout"
