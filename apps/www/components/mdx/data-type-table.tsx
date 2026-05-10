import * as React from "react";
import { cn } from "@/lib/utils";

export interface DataTypeRow {
  /** Type name, e.g. "INT8", "FP16", "BF16" */
  type: string;
  /** Bit width, e.g. 8, 16, 32 */
  bits?: number;
  /** Numeric range or value range, e.g. "-128 to 127" or "±65504" */
  range?: string;
  /** Tensor shape description, e.g. "scalar | vector | matrix" */
  shape?: string;
  /** Whether this type supports quantization */
  quantized?: boolean;
  /** Optional prose note about this type */
  description?: string;
}

export interface DataTypeTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  rows: DataTypeRow[];
  /** Optional caption rendered below the table */
  caption?: string;
}

/**
 * DataTypeTable — AI/ML numeric data type and tensor spec table.
 *
 * Documents hardware-supported data types such as INT8, FP16, BF16, FP32.
 * Only renders columns (Bits, Range, Shape, Quantized, Description) that
 * have data in at least one row. The Quantized column uses a check/cross
 * indicator rather than raw boolean text.
 *
 * @example
 * <DataTypeTable
 *   rows={[
 *     { type: "INT8",  bits: 8,  range: "-128 to 127",   quantized: true,  description: "Inference optimised integer" },
 *     { type: "FP16",  bits: 16, range: "±65504",        quantized: false, description: "Half-precision float" },
 *     { type: "FP32",  bits: 32, range: "±3.4 × 10³⁸",  quantized: false, description: "Full-precision float" },
 *   ]}
 *   caption="Qualcomm AI Runtime (QAIRT) supported types"
 * />
 */
export const DataTypeTable = React.forwardRef<
  HTMLDivElement,
  DataTypeTableProps
>(({ rows, caption, className, ...props }, ref) => {
  const hasBits = rows.some((r) => r.bits !== undefined);
  const hasRange = rows.some((r) => r.range !== undefined);
  const hasShape = rows.some((r) => r.shape !== undefined);
  const hasQuantized = rows.some((r) => r.quantized !== undefined);
  const hasDescription = rows.some((r) => r.description !== undefined);

  return (
    <div
      ref={ref}
      data-data-type-table
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
              Type
            </th>
            {hasBits && (
              <th
                scope="col"
                className="px-4 py-2 text-left font-semibold text-foreground"
              >
                Bits
              </th>
            )}
            {hasRange && (
              <th
                scope="col"
                className="px-4 py-2 text-left font-semibold text-foreground"
              >
                Range
              </th>
            )}
            {hasShape && (
              <th
                scope="col"
                className="px-4 py-2 text-left font-semibold text-foreground"
              >
                Shape
              </th>
            )}
            {hasQuantized && (
              <th
                scope="col"
                className="px-4 py-2 text-left font-semibold text-foreground"
              >
                Quantized
              </th>
            )}
            {hasDescription && (
              <th
                scope="col"
                className="px-4 py-2 text-left font-semibold text-foreground"
              >
                Notes
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
              <td className="px-4 py-2 font-mono font-semibold text-foreground">
                {row.type}
              </td>
              {hasBits && (
                <td className="px-4 py-2 font-mono text-muted-foreground">
                  {row.bits !== undefined ? row.bits : "—"}
                </td>
              )}
              {hasRange && (
                <td className="px-4 py-2 font-mono text-xs text-muted-foreground">
                  {row.range ?? "—"}
                </td>
              )}
              {hasShape && (
                <td className="px-4 py-2 text-muted-foreground">
                  {row.shape ?? "—"}
                </td>
              )}
              {hasQuantized && (
                <td className="px-4 py-2">
                  {row.quantized === undefined ? (
                    <span className="text-muted-foreground">—</span>
                  ) : row.quantized ? (
                    <span
                      aria-label="yes"
                      className="font-semibold text-emerald-600 dark:text-emerald-400"
                    >
                      ✓
                    </span>
                  ) : (
                    <span
                      aria-label="no"
                      className="text-muted-foreground"
                    >
                      ✗
                    </span>
                  )}
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
      {caption && (
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  );
});
DataTypeTable.displayName = "DataTypeTable";
