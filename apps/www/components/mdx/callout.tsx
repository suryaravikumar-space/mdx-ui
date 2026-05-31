import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const InfoIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);
const NoteIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);
const TipIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="9" y1="18" x2="15" y2="18" />
    <line x1="10" y1="22" x2="14" y2="22" />
    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14" />
  </svg>
);
const WarningIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const DangerIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const SuccessIcon = () => (
  <svg
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const VARIANT_ICONS = {
  default: null,
  info: <InfoIcon />,
  note: <NoteIcon />,
  tip: <TipIcon />,
  warning: <WarningIcon />,
  danger: <DangerIcon />,
  success: <SuccessIcon />,
} as const;

const ICON_COLOR: Record<string, string> = {
  default: "text-muted-foreground",
  info: "text-info-accent",
  note: "text-note-accent",
  tip: "text-tip-accent",
  warning: "text-warning-accent",
  danger: "text-danger-accent",
  success: "text-success-accent",
};

const TITLE_COLOR: Record<string, string> = {
  default: "text-foreground",
  info: "text-info-accent",
  note: "text-note-accent",
  tip: "text-tip-accent",
  warning: "text-warning-accent",
  danger: "text-danger-accent",
  success: "text-success-accent",
};

const calloutVariants = cva("my-6 flex gap-3 rounded-lg border p-4 text-sm", {
  variants: {
    variant: {
      default: "border-border bg-muted/50 text-foreground",
      info: "border-info-border bg-info-bg text-info-text",
      note: "border-note-border bg-note-bg text-note-text",
      tip: "border-tip-border bg-tip-bg text-tip-text",
      warning: "border-warning-border bg-warning-bg text-warning-text",
      danger: "border-danger-border bg-danger-bg text-danger-text",
      success: "border-success-border bg-success-bg text-success-text",
    },
  },
  defaultVariants: { variant: "default" },
});

export interface CalloutProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof calloutVariants> {
  icon?: React.ReactNode;
  title?: string;
}

export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ className, variant, icon, title, children, ...props }, ref) => {
    const key = (variant ?? "default") as keyof typeof VARIANT_ICONS;
    const resolvedIcon = icon !== undefined ? icon : VARIANT_ICONS[key];

    return (
      <div
        ref={ref}
        className={cn(calloutVariants({ variant }), className)}
        {...props}
      >
        {resolvedIcon && (
          <div className={cn("mt-0.5 flex-shrink-0", ICON_COLOR[key])}>
            {resolvedIcon}
          </div>
        )}
        <div className="min-w-0 flex-1">
          {title && (
            <div className={cn("mb-1 font-semibold", TITLE_COLOR[key])}>
              {title}
            </div>
          )}
          <div className="leading-relaxed [&>p:first-child]:mt-0 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    );
  },
);
Callout.displayName = "Callout";
