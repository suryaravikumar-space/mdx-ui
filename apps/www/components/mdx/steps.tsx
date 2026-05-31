import * as React from "react";
import { cn } from "@/lib/utils";

export interface StepsProps extends React.HTMLAttributes<HTMLDivElement> {}
export interface StepProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
}

export const Steps = React.forwardRef<HTMLDivElement, StepsProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("[counter-reset:step] my-6 space-y-8", className)}
      {...props}
    >
      {children}
    </div>
  ),
);
Steps.displayName = "Steps";

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ className, title, children, ...props }, ref) => (
    <div ref={ref} className={cn("relative flex gap-4", className)} {...props}>
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-border bg-muted text-sm font-bold text-foreground [counter-increment:step] before:content-[counter(step)]" />
        <div className="mt-2 h-full w-px bg-border" />
      </div>
      <div className="flex-1 pb-8">
        {title && (
          <h3 className="mb-2 font-semibold text-foreground">{title}</h3>
        )}
        <div className="text-muted-foreground">{children}</div>
      </div>
    </div>
  ),
);
Step.displayName = "Step";
