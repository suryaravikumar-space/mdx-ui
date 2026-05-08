"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
  registerTab: (value: string) => void
  unregisterTab: (value: string) => void
  tabs: React.MutableRefObject<string[]>
}

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined)

function useTabsContext() {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within Tabs")
  }
  return context
}

export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value: controlledValue, onValueChange, children, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue || "")
    const value = controlledValue ?? internalValue
    const tabsRef = React.useRef<string[]>([])

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        setInternalValue(newValue)
        onValueChange?.(newValue)
      },
      [onValueChange]
    )

    const registerTab = React.useCallback((tabValue: string) => {
      if (!tabsRef.current.includes(tabValue)) {
        tabsRef.current = [...tabsRef.current, tabValue]
      }
    }, [])

    const unregisterTab = React.useCallback((tabValue: string) => {
      tabsRef.current = tabsRef.current.filter(t => t !== tabValue)
    }, [])

    return (
      <TabsContext.Provider
        value={{ value, onValueChange: handleValueChange, registerTab, unregisterTab, tabs: tabsRef }}
      >
        <div ref={ref} className={className} {...props}>{children}</div>
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = "Tabs"

export interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

export const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, children, ...props }, ref) => {
    const { value, onValueChange, tabs } = useTabsContext()

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      const allTabs = tabs.current
      if (!allTabs.length) return
      const idx = allTabs.indexOf(value)
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        onValueChange(allTabs[Math.max(0, idx - 1)])
      } else if (e.key === "ArrowRight") {
        e.preventDefault()
        onValueChange(allTabs[Math.min(allTabs.length - 1, idx + 1)])
      } else if (e.key === "Home") {
        e.preventDefault()
        onValueChange(allTabs[0])
      } else if (e.key === "End") {
        e.preventDefault()
        onValueChange(allTabs[allTabs.length - 1])
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
          className
        )}
        role="tablist"
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsList.displayName = "TabsList"

export interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string
}

export const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value: triggerValue, children, ...props }, ref) => {
    const { value, onValueChange, registerTab, unregisterTab } = useTabsContext()
    const isActive = value === triggerValue

    React.useEffect(() => {
      registerTab(triggerValue)
      return () => unregisterTab(triggerValue)
    }, [triggerValue, registerTab, unregisterTab])

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        tabIndex={isActive ? 0 : -1}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
          isActive
            ? "bg-background text-foreground shadow-sm"
            : "hover:bg-muted/80 hover:text-foreground",
          className
        )}
        onClick={() => onValueChange(triggerValue)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

export interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string
}

export const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value: contentValue, children, ...props }, ref) => {
    const { value } = useTabsContext()
    const isActive = value === contentValue

    if (!isActive) return null

    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn(
          "mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = "TabsContent"
