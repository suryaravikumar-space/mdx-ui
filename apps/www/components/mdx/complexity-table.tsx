import * as React from "react"
import { cn } from "@/lib/utils"

export interface ComplexityRow {
  operation: string
  best?: string
  average?: string
  worst?: string
  space?: string
}

export interface ComplexityTableProps
  extends React.HTMLAttributes<HTMLDivElement> {
  rows: ComplexityRow[]
  /** Optional caption displayed below the table */
  caption?: string
}

/**
 * ComplexityTable — structured time and space complexity display.
 *
 * Renders a table of algorithm operation complexities. Only shows
 * columns (Best, Average, Worst, Space) that have data in at least
 * one row. Missing values render as an em dash (—).
 *
 * @example
 * <ComplexityTable
 *   rows={[
 *     { operation: "Search", best: "O(1)", average: "O(log n)", worst: "O(n)" },
 *     { operation: "Insert", best: "O(log n)", average: "O(log n)", worst: "O(n)" },
 *   ]}
 * />
 */
export const ComplexityTable = React.forwardRef<
  HTMLDivElement,
  ComplexityTableProps
>(({ rows, caption, className, ...props }, ref) => {
  const hasBest = rows.some((r) => r.best !== undefined)
  const hasAverage = rows.some((r) => r.average !== undefined)
  const hasWorst = rows.some((r) => r.worst !== undefined)
  const hasSpace = rows.some((r) => r.space !== undefined)

  return (
    <div
      ref={ref}
      data-complexity-table
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
              Operation
            </th>
            {hasBest && (
              <th
                scope="col"
                className="px-4 py-2 text-left font-semibold text-foreground"
              >
                Best
              </th>
            )}
            {hasAverage && (
              <th
                scope="col"
                className="px-4 py-2 text-left font-semibold text-foreground"
              >
                Average
              </th>
            )}
            {hasWorst && (
              <th
                scope="col"
                className="px-4 py-2 text-left font-semibold text-foreground"
              >
                Worst
              </th>
            )}
            {hasSpace && (
              <th
                scope="col"
                className="px-4 py-2 text-left font-semibold text-foreground"
              >
                Space
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
                {row.operation}
              </td>
              {hasBest && (
                <td className="px-4 py-2 font-mono text-muted-foreground">
                  {row.best ?? "—"}
                </td>
              )}
              {hasAverage && (
                <td className="px-4 py-2 font-mono text-muted-foreground">
                  {row.average ?? "—"}
                </td>
              )}
              {hasWorst && (
                <td className="px-4 py-2 font-mono text-muted-foreground">
                  {row.worst ?? "—"}
                </td>
              )}
              {hasSpace && (
                <td className="px-4 py-2 font-mono text-muted-foreground">
                  {row.space ?? "—"}
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
  )
})
ComplexityTable.displayName = "ComplexityTable"
