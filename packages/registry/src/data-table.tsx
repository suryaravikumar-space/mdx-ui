import * as React from "react"
import { cn } from "@/lib/utils"

export interface DataTableColumn<T = Record<string, unknown>> {
  /** Key from the data row object */
  key: string
  /** Column header label */
  header: string
  /** Optional custom cell renderer */
  render?: (value: unknown, row: T, index: number) => React.ReactNode
  /** Extra classes applied to both the <th> and <td> for this column */
  className?: string
}

export interface DataTableProps<T extends Record<string, unknown> = Record<string, unknown>> {
  /** Column definitions */
  columns: DataTableColumn<T>[]
  /** Array of row objects — can come from static data, imported JSON, or a fetched API response */
  data: T[]
  /** Optional caption rendered below the table */
  caption?: string
  /** Text shown when data array is empty */
  emptyText?: string
  className?: string
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  caption,
  emptyText = "No data available.",
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn("my-6 w-full overflow-x-auto rounded-lg border", className)}>
      <table className="w-full caption-bottom text-sm">
        {caption && (
          <caption className="mt-4 pb-2 text-sm text-muted-foreground">{caption}</caption>
        )}
        <thead className="border-b bg-muted/50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "h-12 px-4 text-left align-middle font-medium text-muted-foreground",
                  col.className
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-8 text-center text-muted-foreground"
              >
                {emptyText}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b transition-colors hover:bg-muted/50"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn("px-4 py-3 align-middle", col.className)}
                  >
                    {col.render
                      ? col.render(row[col.key], row, rowIndex)
                      : String(row[col.key] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
DataTable.displayName = "DataTable"
