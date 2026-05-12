import * as React from "react";
import { cn } from "@/lib/utils";

type PinType = "INPUT" | "OUTPUT" | "BIDIR" | "POWER" | "GND" | "NC";

interface PinRow {
  pin: number | string;
  signal: string;
  type?: PinType;
  voltage?: string;
  altFunction?: string;
  description?: string;
}

interface PinTableProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  connector?: string;
  rows: PinRow[];
  caption?: string;
}

const typeStyles: Record<PinType, string> = {
  INPUT: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  OUTPUT: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  BIDIR: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  POWER: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  GND: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  NC: "bg-muted text-muted-foreground",
};

export function PinTable({
  title,
  connector,
  rows,
  caption,
  className,
  ...props
}: PinTableProps) {
  return (
    <div className={cn("my-6 overflow-hidden rounded-lg border border-border", className)} {...props}>
      {(title || connector) && (
        <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4 py-2">
          {title && <span className="text-sm font-semibold">{title}</span>}
          {connector && (
            <span className="rounded bg-muted px-2 py-0.5 font-mono text-xs text-muted-foreground">
              {connector}
            </span>
          )}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <th className="px-3 py-2">Pin</th>
              <th className="px-3 py-2">Signal</th>
              <th className="px-3 py-2">Type</th>
              <th className="px-3 py-2">Voltage</th>
              <th className="px-3 py-2">Alt Function</th>
              <th className="px-3 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-border/60 last:border-0 even:bg-muted/20"
              >
                <td className="px-3 py-2 font-mono text-xs font-medium">
                  {row.pin}
                </td>
                <td className="px-3 py-2 font-mono text-xs font-semibold">
                  {row.signal}
                </td>
                <td className="px-3 py-2">
                  {row.type ? (
                    <span
                      className={cn(
                        "rounded px-1.5 py-0.5 font-mono text-[10px] font-bold",
                        typeStyles[row.type],
                      )}
                    >
                      {row.type}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  {row.voltage ?? "—"}
                </td>
                <td className="px-3 py-2 font-mono text-xs text-muted-foreground">
                  {row.altFunction ?? "—"}
                </td>
                <td className="px-3 py-2 text-xs text-muted-foreground">
                  {row.description ?? ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <p className="border-t border-border/60 bg-muted/20 px-4 py-2 text-xs text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  );
}
