import * as React from "react";
import { cn } from "@/lib/utils";

export type RegisterAccess = "RO" | "WO" | "RW" | "OTP" | "RC";

export interface RegisterRow {
  /** Memory-mapped address in hex, e.g. "0x00780000" */
  address?: string;
  /** Register or fuse name */
  name: string;
  /** Bit field range, e.g. "31:0" or "7:0" */
  bits?: string;
  /** Access type */
  access?: RegisterAccess;
  /** Reset / default value in hex */
  reset?: string;
  /** Human-readable description */
  description?: string;
}

export interface RegisterMapProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional section / block title */
  title?: string;
  rows: RegisterRow[];
  /** Optional caption rendered below the table */
  caption?: string;
}

const accessStyle: Record<RegisterAccess, string> = {
  RO: "text-sky-700 dark:text-sky-400",
  WO: "text-violet-700 dark:text-violet-400",
  RW: "text-emerald-700 dark:text-emerald-400",
  OTP: "text-amber-700 dark:text-amber-400",
  RC: "text-rose-700 dark:text-rose-400",
};

/**
 * RegisterMap — hardware register or OTP fuse map table.
 *
 * Documents memory-mapped registers, OTP fuse fields (e.g. QFPROM), or any
 * bit-addressable hardware configuration. Only renders columns that have
 * data in at least one row. Access types are colour-coded:
 * RO (sky), WO (violet), RW (green), OTP (amber), RC (rose).
 *
 * @example
 * <RegisterMap
 *   title="QFPROM Fuse Map — Security Control"
 *   rows={[
 *     { address: "0x00780000", name: "QFPROM_CORR_RD_WR_PERM_LSB", bits: "31:0", access: "OTP", reset: "0x00000000", description: "Read/write permissions for fuse rows." },
 *     { address: "0x00780008", name: "QFPROM_CORR_JTAG_ID",        bits: "31:0", access: "RO",  reset: "0x009600E1", description: "JTAG identification register." },
 *   ]}
 * />
 */
export const RegisterMap = React.forwardRef<HTMLDivElement, RegisterMapProps>(
  ({ title, rows, caption, className, ...props }, ref) => {
    const hasAddress = rows.some((r) => r.address !== undefined);
    const hasBits = rows.some((r) => r.bits !== undefined);
    const hasAccess = rows.some((r) => r.access !== undefined);
    const hasReset = rows.some((r) => r.reset !== undefined);
    const hasDescription = rows.some((r) => r.description !== undefined);

    return (
      <div
        ref={ref}
        data-register-map
        className={cn(
          "my-6 overflow-hidden rounded-lg border border-border",
          className,
        )}
        {...props}
      >
        {title && (
          <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-2.5">
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            <span className="text-sm font-semibold text-foreground">
              {title}
            </span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                {hasAddress && (
                  <th
                    scope="col"
                    className="px-4 py-2 text-left font-semibold text-foreground"
                  >
                    Address
                  </th>
                )}
                <th
                  scope="col"
                  className="px-4 py-2 text-left font-semibold text-foreground"
                >
                  Register
                </th>
                {hasBits && (
                  <th
                    scope="col"
                    className="px-4 py-2 text-left font-semibold text-foreground"
                  >
                    Bits
                  </th>
                )}
                {hasAccess && (
                  <th
                    scope="col"
                    className="px-4 py-2 text-left font-semibold text-foreground"
                  >
                    Access
                  </th>
                )}
                {hasReset && (
                  <th
                    scope="col"
                    className="px-4 py-2 text-left font-semibold text-foreground"
                  >
                    Reset
                  </th>
                )}
                {hasDescription && (
                  <th
                    scope="col"
                    className="px-4 py-2 text-left font-semibold text-foreground"
                  >
                    Description
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
                  {hasAddress && (
                    <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                      {row.address ?? "—"}
                    </td>
                  )}
                  <td className="px-4 py-2 font-mono text-xs font-medium text-foreground">
                    {row.name}
                  </td>
                  {hasBits && (
                    <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                      {row.bits ?? "—"}
                    </td>
                  )}
                  {hasAccess && (
                    <td className="px-4 py-2">
                      {row.access ? (
                        <span
                          className={cn(
                            "rounded border px-1.5 py-0.5 font-mono text-[11px] font-semibold",
                            accessStyle[row.access],
                            "border-current/30 bg-current/5",
                          )}
                        >
                          {row.access}
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                  )}
                  {hasReset && (
                    <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                      {row.reset ?? "—"}
                    </td>
                  )}
                  {hasDescription && (
                    <td className="px-4 py-2 text-sm text-muted-foreground">
                      {row.description ?? "—"}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {caption && (
          <p className="border-t border-border px-4 py-2 text-center text-xs text-muted-foreground">
            {caption}
          </p>
        )}
      </div>
    );
  },
);
RegisterMap.displayName = "RegisterMap";
