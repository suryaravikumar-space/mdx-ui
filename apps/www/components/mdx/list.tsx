import * as React from "react"
import { cn } from "@/lib/utils"

export interface ListProps {
  children: React.ReactNode
  className?: string
}

export function UnorderedList({ children, className }: ListProps) {
  return (
    <ul className={cn("list-disc list-outside ml-6 my-4 space-y-2 text-foreground", className)}>
      {children}
    </ul>
  )
}

export function OrderedList({ children, className }: ListProps) {
  return (
    <ol className={cn("list-decimal list-outside ml-6 my-4 space-y-2 text-foreground", className)}>
      {children}
    </ol>
  )
}

export interface ListItemProps {
  children: React.ReactNode
  className?: string
}

export function ListItem({ children, className }: ListItemProps) {
  return (
    <li className={cn("leading-relaxed", className)}>
      {children}
    </li>
  )
}
