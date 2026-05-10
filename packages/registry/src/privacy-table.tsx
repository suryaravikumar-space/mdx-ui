import * as React from "react";
import { cn } from "@/lib/utils";

export interface PrivacyRow {
  /** Type of personal data collected, e.g. "Email Address" */
  dataType: string;
  /** Why this data is collected */
  purpose: string;
  /** Legal basis under GDPR or equivalent, e.g. "Consent", "Legitimate Interest" */
  legalBasis?: string;
  /** How long data is retained, e.g. "Until account deletion" or "90 days" */
  retention?: string;
  /** Whether this data is shared with third parties */
  shared?: boolean;
}

export interface PrivacyTableProps extends React.HTMLAttributes<HTMLDivElement> {
  rows: PrivacyRow[];
  /** Optional caption rendered below the table */
  caption?: string;
}

/**
 * PrivacyTable — personal data collection documentation table.
 *
 * Documents what personal information is collected, the purpose, legal basis,
 * retention period, and third-party sharing status — following the format
 * expected by GDPR Records of Processing Activities (RoPA) and similar
 * privacy compliance frameworks (ISO 27001, TISAX).
 *
 * Only renders columns that have data in at least one row. The "Shared"
 * column uses a clear yes/no indicator.
 *
 * @example
 * <PrivacyTable
 *   rows={[
 *     {
 *       dataType: "Email Address",
 *       purpose: "Account authentication and notifications",
 *       legalBasis: "Consent",
 *       retention: "Until account deletion",
 *       shared: false,
 *     },
 *     {
 *       dataType: "Chipset Serial Number",
 *       purpose: "Device identification and diagnostics",
 *       legalBasis: "Legitimate Interest",
 *       retention: "5 years",
 *       shared: true,
 *     },
 *   ]}
 *   caption="Collected in accordance with Qualcomm Privacy Policy"
 * />
 */
export const PrivacyTable = React.forwardRef<HTMLDivElement, PrivacyTableProps>(
  ({ rows, caption, className, ...props }, ref) => {
    const hasLegalBasis = rows.some((r) => r.legalBasis !== undefined);
    const hasRetention = rows.some((r) => r.retention !== undefined);
    const hasShared = rows.some((r) => r.shared !== undefined);

    return (
      <div
        ref={ref}
        data-privacy-table
        className={cn("my-6 w-full overflow-x-auto", className)}
        {...props}
      >
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/50">
              <th
                scope="col"
                className="px-4 py-2 text-left font-semibold text-foreground"
              >
                Data Type
              </th>
              <th
                scope="col"
                className="px-4 py-2 text-left font-semibold text-foreground"
              >
                Purpose
              </th>
              {hasLegalBasis && (
                <th
                  scope="col"
                  className="px-4 py-2 text-left font-semibold text-foreground"
                >
                  Legal Basis
                </th>
              )}
              {hasRetention && (
                <th
                  scope="col"
                  className="px-4 py-2 text-left font-semibold text-foreground"
                >
                  Retention
                </th>
              )}
              {hasShared && (
                <th
                  scope="col"
                  className="px-4 py-2 text-left font-semibold text-foreground"
                >
                  3rd Party
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-border last:border-0 odd:bg-background even:bg-muted/30"
              >
                <td className="px-4 py-2 font-medium text-foreground">
                  {row.dataType}
                </td>
                <td className="px-4 py-2 text-muted-foreground">
                  {row.purpose}
                </td>
                {hasLegalBasis && (
                  <td className="px-4 py-2">
                    {row.legalBasis ? (
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-foreground">
                        {row.legalBasis}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </td>
                )}
                {hasRetention && (
                  <td className="px-4 py-2 text-sm text-muted-foreground">
                    {row.retention ?? "—"}
                  </td>
                )}
                {hasShared && (
                  <td className="px-4 py-2">
                    {row.shared === undefined ? (
                      <span className="text-muted-foreground">—</span>
                    ) : row.shared ? (
                      <span
                        aria-label="shared with third parties"
                        className="font-semibold text-amber-600 dark:text-amber-400"
                      >
                        Yes
                      </span>
                    ) : (
                      <span
                        aria-label="not shared"
                        className="font-semibold text-emerald-600 dark:text-emerald-400"
                      >
                        No
                      </span>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {caption && (
          <p className="mt-2 text-center text-xs text-muted-foreground">
            {caption}
          </p>
        )}
      </div>
    );
  },
);
PrivacyTable.displayName = "PrivacyTable";
