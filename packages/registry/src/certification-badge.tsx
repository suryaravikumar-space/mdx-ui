import * as React from "react";
import { cn } from "@/lib/utils";

export type CertStatus = "active" | "pending" | "expired";

export interface Certification {
  /** Certification name, e.g. "ISO 27001:2022" or "TISAX" */
  name: string;
  /** Scope or standard description, e.g. "Information Security Management" */
  scope?: string;
  /** Year awarded or last renewed */
  year?: string | number;
  /** Current status */
  status?: CertStatus;
}

export interface CertificationBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** One or more certifications to display */
  certs: Certification[];
}

const statusConfig: Record<
  CertStatus,
  { dot: string; badge: string; label: string }
> = {
  active: {
    dot: "bg-emerald-500",
    badge: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/40",
    label: "Active",
  },
  pending: {
    dot: "bg-amber-400",
    badge: "border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-950/40",
    label: "Pending",
  },
  expired: {
    dot: "bg-muted-foreground/60",
    badge: "border-border bg-muted/40",
    label: "Expired",
  },
};

/**
 * CertificationBadge — compliance certification display.
 *
 * Renders one or more compliance or security certification chips (ISO 27001,
 * TISAX, SOC 2, GDPR, etc.) with an optional scope description, year, and
 * status indicator. Designed to sit at the top of a compliance or privacy
 * section to establish context at a glance.
 *
 * @example
 * <CertificationBadge
 *   certs={[
 *     { name: "ISO 27001:2022", scope: "Information Security Management", year: 2023, status: "active" },
 *     { name: "TISAX",         scope: "Automotive Information Security",  year: 2024, status: "active" },
 *     { name: "SOC 2 Type II", scope: "Trust Services Criteria",                    status: "pending" },
 *   ]}
 * />
 */
export const CertificationBadge = React.forwardRef<
  HTMLDivElement,
  CertificationBadgeProps
>(({ certs, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-certification-badge
      className={cn("my-6 flex flex-wrap gap-3", className)}
      {...props}
    >
      {certs.map((cert, i) => {
        const status = cert.status ?? "active";
        const cfg = statusConfig[status];

        return (
          <div
            key={i}
            className={cn(
              "flex min-w-[140px] flex-col gap-1 rounded-lg border px-3.5 py-2.5",
              cfg.badge,
            )}
          >
            {/* Name + status dot */}
            <div className="flex items-center gap-2">
              <span
                aria-hidden="true"
                className={cn("h-2 w-2 shrink-0 rounded-full", cfg.dot)}
              />
              <span className="text-sm font-semibold text-foreground">
                {cert.name}
              </span>
            </div>

            {/* Scope */}
            {cert.scope && (
              <p className="ml-4 text-xs text-muted-foreground">{cert.scope}</p>
            )}

            {/* Year + status */}
            <div className="ml-4 flex items-center gap-2 text-[11px] text-muted-foreground">
              {cert.year && <span>{cert.year}</span>}
              {cert.year && <span>·</span>}
              <span>{cfg.label}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
});
CertificationBadge.displayName = "CertificationBadge";
