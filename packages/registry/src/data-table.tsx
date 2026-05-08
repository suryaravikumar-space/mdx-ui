"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface DataTableColumn<T = Record<string, unknown>> {
  /** Key from the data row object */
  key: string
  /** Column header label */
  header: string
  /** Allow clicking the header to sort by this column */
  sortable?: boolean
  /** Include this column when searching (default: true) */
  searchable?: boolean
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
  /** Show a search input above the table to filter rows */
  searchable?: boolean
  /** Placeholder for the search input */
  searchPlaceholder?: string
  /** Optional caption rendered below the table */
  caption?: string
  /** Text shown when data array is empty or no rows match the search */
  emptyText?: string
  className?: string
}

type SortDir = "asc" | "desc" | null

function sortRows<T extends Record<string, unknown>>(
  rows: T[],
  key: string | null,
  dir: SortDir
): T[] {
  if (!key || !dir) return rows
  return [...rows].sort((a, b) => {
    const av = a[key] ?? ""
    const bv = b[key] ?? ""
    const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true, sensitivity: "base" })
    return dir === "asc" ? cmp : -cmp
  })
}

function SortIcon({ dir }: { dir: SortDir }) {
  if (dir === "asc") return (
    <svg className="ml-1.5 inline h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  if (dir === "desc") return (
    <svg className="ml-1.5 inline h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
  return (
    <svg className="ml-1.5 inline h-3.5 w-3.5 opacity-30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="M8 9l4-4 4 4M16 15l-4 4-4-4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchable = false,
  searchPlaceholder = "Search…",
  caption,
  emptyText = "No data available.",
  className,
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState("")
  const [sortKey, setSortKey] = React.useState<string | null>(null)
  const [sortDir, setSortDir] = React.useState<SortDir>(null)

  const handleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key)
      setSortDir("asc")
    } else if (sortDir === "asc") {
      setSortDir("desc")
    } else {
      setSortKey(null)
      setSortDir(null)
    }
  }

  const searchableCols = columns.filter((c) => c.searchable !== false)

  const filtered = React.useMemo(() => {
    if (!search.trim()) return data
    const q = search.trim().toLowerCase()
    return data.filter((row) =>
      searchableCols.some((col) =>
        String(row[col.key] ?? "").toLowerCase().includes(q)
      )
    )
  }, [data, search, searchableCols])

  const sorted = React.useMemo(
    () => sortRows(filtered, sortKey, sortDir),
    [filtered, sortKey, sortDir]
  )

  return (
    <div className={cn("my-6 w-full space-y-3", className)}>
      {searchable && (
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full rounded-md border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
      )}
      <div className="w-full overflow-x-auto rounded-lg border">
        <table className="w-full caption-bottom text-sm">
          {caption && (
            <caption className="mt-4 pb-2 text-sm text-muted-foreground">{caption}</caption>
          )}
          <thead className="border-b bg-muted/50">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  className={cn(
                    "h-12 px-4 text-left align-middle font-medium text-muted-foreground",
                    col.sortable && "cursor-pointer select-none hover:text-foreground",
                    col.className
                  )}
                >
                  {col.header}
                  {col.sortable && (
                    <SortIcon dir={sortKey === col.key ? sortDir : null} />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {sorted.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  {search ? `No results for "${search}"` : emptyText}
                </td>
              </tr>
            ) : (
              sorted.map((row, rowIndex) => (
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
    </div>
  )
}
DataTable.displayName = "DataTable"
