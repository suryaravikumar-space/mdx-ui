import * as React from "react";
import { cn } from "@/lib/utils";

export type SecurityNoteSeverity = "info" | "warning" | "critical";

export interface SecurityNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual severity level — controls icon and colour scheme */
  severity?: SecurityNoteSeverity;
  /** Optional title rendered above the body */
  title?: string;
  children: React.ReactNode;
}

const severityConfig: Record<
  SecurityNoteSeverity,
  {
    border: string;
    bg: string;
    icon: string;
    label: string;
    icon_svg: React.ReactNode;
  }
> = {
  info: {
    border: "border-blue-200 dark:border-blue-800",
    bg: "bg-blue-50 dark:bg-blue-950/40",
    icon: "text-blue-600 dark:text-blue-400",
    label: "text-blue-800 dark:text-blue-300",
    icon_svg: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  warning: {
    border: "border-amber-200 dark:border-amber-800",
    bg: "bg-amber-50 dark:bg-amber-950/40",
    icon: "text-amber-600 dark:text-amber-400",
    label: "text-amber-800 dark:text-amber-300",
    icon_svg: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  critical: {
    border: "border-red-200 dark:border-red-800",
    bg: "bg-red-50 dark:bg-red-950/40",
    icon: "text-red-600 dark:text-red-400",
    label: "text-red-800 dark:text-red-300",
    icon_svg: (
      <svg
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
};

const defaultTitles: Record<SecurityNoteSeverity, string> = {
  info: "Security Note",
  warning: "Security Warning",
  critical: "Critical Security Advisory",
};

/**
 * SecurityNote — security-specific callout with severity levels.
 *
 * Use this for security notices, vulnerability disclosures, key management
 * caveats, or compliance-critical instructions. Unlike a generic Callout,
 * SecurityNote carries an explicit severity (`info | warning | critical`)
 * that controls both the visual treatment and the accessible label.
 *
 * @example
 * <SecurityNote severity="warning" title="OTP Fuse Burn">
 *   QFPROM fuse values are permanent once written. Ensure correct values
 *   before provisioning production devices.
 * </SecurityNote>
 *
 * <SecurityNote severity="critical">
 *   Never store private keys in non-volatile memory outside of the
 *   Secure Execution Environment (SEE).
 * </SecurityNote>
 */
export const SecurityNote = React.forwardRef<HTMLDivElement, SecurityNoteProps>(
  ({ severity = "info", title, children, className, ...props }, ref) => {
    const cfg = severityConfig[severity];
    const displayTitle = title ?? defaultTitles[severity];

    return (
      <div
        ref={ref}
        role="note"
        data-security-note
        data-severity={severity}
        className={cn(
          "my-6 rounded-lg border px-4 py-3",
          cfg.border,
          cfg.bg,
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "flex items-center gap-2 font-semibold text-sm",
            cfg.icon,
          )}
        >
          <span className={cn("shrink-0", cfg.icon)}>{cfg.icon_svg}</span>
          <span className={cfg.label}>{displayTitle}</span>
        </div>
        <div className="mt-2 text-sm text-foreground/80">{children}</div>
      </div>
    );
  },
);
SecurityNote.displayName = "SecurityNote";
