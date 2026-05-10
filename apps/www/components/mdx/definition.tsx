import * as React from "react";
import { cn } from "@/lib/utils";

export interface DefinitionProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The word or phrase being defined */
  term: string;
  children: React.ReactNode;
}

/**
 * Definition — a formal definition block.
 *
 * Renders the term as a small-caps label above the definition body.
 * Use at the first occurrence of a specialised term in a document.
 *
 * @example
 * <Definition term="Invariant">
 *   A condition that holds true before and after every operation on a data structure.
 * </Definition>
 */
export const Definition = React.forwardRef<HTMLDivElement, DefinitionProps>(
  ({ term, children, className, ...props }, ref) => (
    <div
      ref={ref}
      data-definition
      className={cn("my-6 border-l-4 border-primary py-2 pl-4", className)}
      {...props}
    >
      <div className="mb-1 text-sm font-semibold uppercase tracking-wide text-foreground">
        {term}
      </div>
      <div className="text-sm text-muted-foreground">{children}</div>
    </div>
  ),
);
Definition.displayName = "Definition";
