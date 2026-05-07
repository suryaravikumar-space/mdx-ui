"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AccordionContextValue {
  openValues: string[]
  toggle: (item: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(undefined)

function useAccordionContext() {
  const ctx = React.useContext(AccordionContext)
  if (!ctx) throw new Error("Accordion components must be used within Accordion")
  return ctx
}

const AccordionItemContext = React.createContext<string>("")

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  collapsible?: boolean
}

export function Accordion({
  type = "single",
  defaultValue,
  collapsible = true,
  children,
  className,
  ...props
}: AccordionProps) {
  const initial = defaultValue
    ? Array.isArray(defaultValue) ? defaultValue : [defaultValue]
    : []
  const [openValues, setOpenValues] = React.useState<string[]>(initial)

  const toggle = React.useCallback(
    (item: string) => {
      if (type === "single") {
        setOpenValues(prev =>
          prev.includes(item) ? (collapsible ? [] : prev) : [item]
        )
      } else {
        setOpenValues(prev =>
          prev.includes(item) ? prev.filter(v => v !== item) : [...prev, item]
        )
      }
    },
    [type, collapsible]
  )

  return (
    <AccordionContext.Provider value={{ openValues, toggle }}>
      <div
        className={cn("divide-y divide-border rounded-md border border-border", className)}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export function AccordionItem({ value, children, className, ...props }: AccordionItemProps) {
  return (
    <AccordionItemContext.Provider value={value}>
      <div className={cn("px-4", className)} {...props}>
        {children}
      </div>
    </AccordionItemContext.Provider>
  )
}

export interface AccordionTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function AccordionTrigger({ children, className, ...props }: AccordionTriggerProps) {
  const { openValues, toggle } = useAccordionContext()
  const itemValue = React.useContext(AccordionItemContext)
  const isOpen = openValues.includes(itemValue)

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      onClick={() => toggle(itemValue)}
      className={cn(
        "flex w-full items-center justify-between py-4 text-sm font-medium text-foreground transition-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
      {...props}
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "shrink-0 text-muted-foreground transition-transform duration-200",
          isOpen && "rotate-180"
        )}
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  )
}

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function AccordionContent({ children, className, ...props }: AccordionContentProps) {
  const { openValues } = useAccordionContext()
  const itemValue = React.useContext(AccordionItemContext)
  const isOpen = openValues.includes(itemValue)

  if (!isOpen) return null

  return (
    <div className={cn("pb-4 pt-0 text-sm text-muted-foreground", className)} {...props}>
      {children}
    </div>
  )
}
