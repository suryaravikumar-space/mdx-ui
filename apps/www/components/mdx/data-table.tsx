"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Column definition (programmatic API) ────────────────────────────────────

export interface DataTableColumn<T = Record<string, unknown>> {
  key: string;
  header: string;
  /** Enable sorting on this column */
  sortable?: boolean;
  /** Auto-detected if omitted: "string" → A→Z, "number" → 1→9, "date" → Newest */
  sortType?: "string" | "number" | "date";
  /** Include in search (default true) */
  searchable?: boolean;
  /** Custom cell renderer */
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
  className?: string;
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface DataTableProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  /**
   * Simple MDX API — pass plain string arrays.
   * Column headers. A header can be a string or an object to configure sorting.
   *
   * @example
   * headers={["Name", "Type", "Required"]}
   * headers={[{ label: "Size", sortType: "number" }, "Name"]}
   */
  headers?: Array<
    string | { label: string; sortType?: "string" | "number" | "date" }
  >;

  /**
   * Simple MDX API — 2-D array of cell values.
   *
   * @example
   * rows={[
   *   ["src",   "string", "Yes"],
   *   ["width", "number", "No"],
   * ]}
   */
  rows?: Array<Array<string | number>>;

  /**
   * Programmatic API — use when data comes from a fetch / import / database.
   * Pair with `data`.
   */
  columns?: DataTableColumn<T>[];

  /** Programmatic API — array of row objects. Pair with `columns`. */
  data?: T[];

  // ── Features (both APIs) ──────────────────────────────────────────────────

  /** Show a search box that filters rows in real time */
  searchable?: boolean;
  searchPlaceholder?: string;

  /**
   * Enable click-to-sort on every column (simple API).
   * For the programmatic API, set `sortable` per column instead.
   */
  sortable?: boolean;

  /** Enable pagination with a rows-per-page selector */
  pagination?: boolean;
  /** Initial rows per page */
  defaultPageSize?: number;
  /** Options in the rows-per-page dropdown */
  pageSizeOptions?: number[];

  caption?: string;
  emptyText?: string;
  className?: string;
}

// ─── Internal normalised shape ────────────────────────────────────────────────

interface NCol {
  key: string;
  header: string;
  sortable: boolean;
  sortType: "string" | "number" | "date";
  searchable: boolean;
  render?: (
    value: unknown,
    row: Record<string, unknown>,
    index: number,
  ) => React.ReactNode;
  className?: string;
}

type NRow = Record<string, unknown>;

// ─── Sort helpers ─────────────────────────────────────────────────────────────

type SortDir = "asc" | "desc" | null;

function detectType(rows: NRow[], key: string): "date" | "number" | "string" {
  const sample = rows.find((r) => r[key] != null)?.[key];
  if (sample == null) return "string";
  if (typeof sample === "number") return "number";
  if (!isNaN(Number(sample)) && String(sample).trim() !== "") return "number";
  if (!isNaN(Date.parse(String(sample)))) return "date";
  return "string";
}

function cmp(
  a: unknown,
  b: unknown,
  type: "string" | "number" | "date",
): number {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (type === "number") return Number(a) - Number(b);
  if (type === "date")
    return new Date(String(a)).getTime() - new Date(String(b)).getTime();
  return String(a).localeCompare(String(b), undefined, {
    sensitivity: "base",
    numeric: true,
  });
}

function sortLabel(
  type: "string" | "number" | "date",
  dir: "asc" | "desc",
): string {
  if (type === "number") return dir === "asc" ? "1→9" : "9→1";
  if (type === "date") return dir === "asc" ? "Oldest" : "Newest";
  return dir === "asc" ? "A→Z" : "Z→A";
}

// ─── Icons ────────────────────────────────────────────────────────────────────

function SortBadge({
  dir,
  type,
}: {
  dir: SortDir;
  type: "string" | "number" | "date";
}) {
  if (!dir)
    return (
      <svg
        className="ml-1.5 inline h-3.5 w-3.5 opacity-30"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <path
          d="M8 9l4-4 4 4M16 15l-4 4-4-4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  return (
    <span className="ml-1.5 inline text-[10px] font-semibold text-foreground">
      {sortLabel(type, dir)}
    </span>
  );
}

function Chevron({ d }: { d: "left" | "right" }) {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      {d === "left" ? (
        <path
          d="M15 18l-6-6 6-6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

// ─── Pagination bar ───────────────────────────────────────────────────────────

const DEFAULT_PAGE_SIZES = [10, 25, 50, 100];

function PaginationBar({
  total,
  page,
  pageSize,
  options,
  onPage,
  onSize,
}: {
  total: number;
  page: number;
  pageSize: number;
  options: number[];
  onPage: (p: number) => void;
  onSize: (n: number) => void;
}) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, total);

  const pages: (number | "…")[] = [];
  const push = (n: number) => {
    if (!pages.includes(n)) pages.push(n);
  };
  push(1);
  if (page > 3) pages.push("…");
  for (
    let i = Math.max(2, page - 1);
    i <= Math.min(totalPages - 1, page + 1);
    i++
  )
    push(i);
  if (page < totalPages - 2) pages.push("…");
  if (totalPages > 1) push(totalPages);

  const btn =
    "inline-flex h-8 min-w-[2rem] items-center justify-center rounded px-1.5 text-sm transition-colors";

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <span>Rows per page</span>
        <select
          value={pageSize}
          onChange={(e) => {
            onSize(Number(e.target.value));
            onPage(1);
          }}
          className="rounded border bg-background px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {options.map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-1">
        <span className="mr-2">
          {from}–{to} of {total}
        </span>
        <button
          onClick={() => onPage(page - 1)}
          disabled={page === 1}
          className={cn(btn, "border hover:bg-muted disabled:opacity-40")}
          aria-label="Previous"
        >
          <Chevron d="left" />
        </button>
        {pages.map((p, i) =>
          p === "…" ? (
            <span key={`e${i}`} className={cn(btn, "cursor-default")}>
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onPage(p as number)}
              className={cn(
                btn,
                p === page
                  ? "border border-ring bg-background font-semibold text-foreground"
                  : "hover:bg-muted",
              )}
            >
              {p}
            </button>
          ),
        )}
        <button
          onClick={() => onPage(page + 1)}
          disabled={page === totalPages}
          className={cn(btn, "border hover:bg-muted disabled:opacity-40")}
          aria-label="Next"
        >
          <Chevron d="right" />
        </button>
      </div>
    </div>
  );
}

// ─── DataTable ────────────────────────────────────────────────────────────────

export function DataTable<T extends Record<string, unknown>>({
  // simple API
  headers,
  rows,
  // programmatic API
  columns,
  data,
  // features
  searchable = false,
  searchPlaceholder = "Search…",
  sortable: globalSortable = false,
  pagination = false,
  defaultPageSize = 10,
  pageSizeOptions = DEFAULT_PAGE_SIZES,
  caption,
  emptyText = "No data available.",
  className,
}: DataTableProps<T>) {
  // ── Normalise both APIs into NCol[] + NRow[] ──────────────────────────────
  const { ncols, nrows } = React.useMemo<{
    ncols: NCol[];
    nrows: NRow[];
  }>(() => {
    // Simple API
    if (headers && rows) {
      const nc: NCol[] = headers.map((h, i) => {
        const isObj = typeof h === "object";
        return {
          key: String(i),
          header: isObj ? h.label : h,
          sortable: globalSortable,
          sortType: isObj && h.sortType ? h.sortType : "string", // refined after rows known
          searchable: true,
        };
      });
      const nr: NRow[] = rows.map((r) =>
        Object.fromEntries(r.map((cell, i) => [String(i), cell])),
      );
      // Auto-detect sort types from actual values
      nc.forEach((col, i) => {
        if (
          col.sortable &&
          !(typeof headers[i] === "object" && headers[i].sortType)
        ) {
          col.sortType = detectType(nr, col.key);
        }
      });
      return { ncols: nc, nrows: nr };
    }

    // Programmatic API
    if (columns && data) {
      const nr = data as unknown as NRow[];
      const nc: NCol[] = columns.map((col) => ({
        key: col.key,
        header: col.header,
        sortable: col.sortable ?? false,
        sortType: col.sortType ?? detectType(nr, col.key),
        searchable: col.searchable ?? true,
        render: col.render as NCol["render"],
        className: col.className,
      }));
      return { ncols: nc, nrows: nr };
    }

    return { ncols: [], nrows: [] };
  }, [headers, rows, columns, data, globalSortable]);

  // ── State ─────────────────────────────────────────────────────────────────
  const [search, setSearch] = React.useState("");
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDir>(null);
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(defaultPageSize);

  const handleSort = (key: string) => {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") setSortDir("desc");
    else {
      setSortKey(null);
      setSortDir(null);
    }
    setPage(1);
  };

  React.useEffect(() => {
    setPage(1);
  }, [search, sortKey, sortDir]);

  // ── Pipeline: filter → sort → paginate ───────────────────────────────────
  const searchableCols = ncols.filter((c) => c.searchable);

  const filtered = React.useMemo(() => {
    if (!search.trim()) return nrows;
    const q = search.trim().toLowerCase();
    return nrows.filter((row) =>
      searchableCols.some((col) =>
        String(row[col.key] ?? "")
          .toLowerCase()
          .includes(q),
      ),
    );
  }, [nrows, search, searchableCols]);

  const sorted = React.useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    const type = ncols.find((c) => c.key === sortKey)?.sortType ?? "string";
    return [...filtered].sort((a, b) => {
      const v = cmp(a[sortKey], b[sortKey], type);
      return sortDir === "asc" ? v : -v;
    });
  }, [filtered, sortKey, sortDir, ncols]);

  const paged = React.useMemo(() => {
    if (!pagination) return sorted;
    return sorted.slice((page - 1) * pageSize, page * pageSize);
  }, [sorted, pagination, page, pageSize]);

  const emptyMsg = search.trim() ? `No results for "${search}"` : emptyText;

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={cn("my-6 w-full space-y-2", className)}>
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
            <caption className="mt-4 pb-2 text-sm text-muted-foreground">
              {caption}
            </caption>
          )}
          <thead className="border-b bg-muted/50">
            <tr>
              {ncols.map((col) => (
                <th
                  key={col.key}
                  onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  className={cn(
                    "h-12 px-4 text-left align-middle font-medium text-muted-foreground",
                    col.sortable &&
                      "cursor-pointer select-none hover:text-foreground",
                    col.className,
                  )}
                >
                  {col.header}
                  {col.sortable && (
                    <SortBadge
                      dir={sortKey === col.key ? sortDir : null}
                      type={col.sortType}
                    />
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="[&_tr:last-child]:border-0">
            {paged.length === 0 ? (
              <tr>
                <td
                  colSpan={ncols.length}
                  className="px-4 py-8 text-center text-muted-foreground"
                >
                  {emptyMsg}
                </td>
              </tr>
            ) : (
              paged.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-b transition-colors hover:bg-muted/50"
                >
                  {ncols.map((col) => (
                    <td
                      key={col.key}
                      className={cn("px-4 py-3 align-middle", col.className)}
                    >
                      {col.render
                        ? col.render(
                            row[col.key],
                            row,
                            (page - 1) * pageSize + ri,
                          )
                        : String(row[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && sorted.length > 0 && (
        <PaginationBar
          total={sorted.length}
          page={page}
          pageSize={pageSize}
          options={pageSizeOptions}
          onPage={setPage}
          onSize={setPageSize}
        />
      )}
    </div>
  );
}
DataTable.displayName = "DataTable";
