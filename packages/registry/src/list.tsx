import * as React from "react";
import { cn } from "@/lib/utils";

export type ListProps = React.HTMLAttributes<HTMLUListElement | HTMLOListElement>
export type ListItemProps = React.HTMLAttributes<HTMLLIElement>

export const UnorderedList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ children, className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "list-disc list-outside ml-6 my-4 space-y-2 text-foreground",
      className,
    )}
    {...props}
  >
    {children}
  </ul>
));
UnorderedList.displayName = "UnorderedList";

export const OrderedList = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ children, className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn(
      "list-decimal list-outside ml-6 my-4 space-y-2 text-foreground",
      className,
    )}
    {...props}
  >
    {children}
  </ol>
));
OrderedList.displayName = "OrderedList";

export const ListItem = React.forwardRef<HTMLLIElement, ListItemProps>(
  ({ children, className, ...props }, ref) => (
    <li ref={ref} className={cn("leading-relaxed", className)} {...props}>
      {children}
    </li>
  ),
);
ListItem.displayName = "ListItem";
