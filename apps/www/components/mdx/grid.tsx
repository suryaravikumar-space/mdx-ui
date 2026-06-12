import * as React from "react";
import { cn } from "@/lib/utils";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** CSS grid-template-columns, e.g. "70px 70px 70px 70px 2px 1fr" */
  cols: string;
  /** CSS grid-template-rows */
  rows?: string;
  /** column-gap, default "1rem" */
  gapX?: string;
  /** row-gap, default "0.25rem" */
  gapY?: string;
}

/** Generic CSS grid container for tabular/stepwise layouts (long division, step tables, annotated diagrams). */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({ cols, rows, gapX, gapY, className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("inline-grid items-center", className)}
      style={{
        gridTemplateColumns: cols,
        gridTemplateRows: rows,
        columnGap: gapX ?? "1rem",
        rowGap: gapY ?? "0.25rem",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  ),
);
Grid.displayName = "Grid";

interface GridCellProps extends React.HTMLAttributes<HTMLDivElement> {
  /** grid-column, e.g. 1 or "1 / 5" */
  col?: string | number;
  /** grid-row, e.g. 2 or "1 / 11" */
  row?: string | number;
  align?: "start" | "center" | "end" | "stretch";
}

/** Placed cell inside a `Grid` — set `col`/`row` to position content. */
export const GridCell = React.forwardRef<HTMLDivElement, GridCellProps>(
  ({ col, row, align = "end", className, style, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center", className)}
      style={{ gridColumn: col, gridRow: row, justifySelf: align, ...style }}
      {...props}
    >
      {children}
    </div>
  ),
);
GridCell.displayName = "GridCell";

interface GridLineProps extends React.HTMLAttributes<HTMLDivElement> {
  col?: string | number;
  row?: string | number;
  orientation?: "horizontal" | "vertical";
}

/** Divider line placed inside a `Grid` (subtraction rules, vertical separators). */
export const GridLine = React.forwardRef<HTMLDivElement, GridLineProps>(
  ({ col, row, orientation = "horizontal", className, style, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        orientation === "horizontal"
          ? "border-t border-current w-full"
          : "border-l border-current h-full justify-self-center",
        className,
      )}
      style={{ gridColumn: col, gridRow: row, ...style }}
      {...props}
    />
  ),
);
GridLine.displayName = "GridLine";
