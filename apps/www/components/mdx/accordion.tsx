import * as React from "react";
import { cn } from "@/lib/utils";
import { focusRing, transitions } from "@/lib/primitives";
import { Collapse } from "@/lib/motion";

interface AccordionContextValue {
  openValues: string[];
  toggle: (item: string) => void;
}

const AccordionContext = React.createContext<AccordionContextValue | undefined>(
  undefined,
);

function useAccordionContext() {
  const ctx = React.useContext(AccordionContext);
  if (!ctx)
    throw new Error("Accordion components must be used within Accordion");
  return ctx;
}

const AccordionItemContext = React.createContext<string>("");

export interface AccordionProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "single" | "multiple";
  defaultValue?: string | string[];
  collapsible?: boolean;
}

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      defaultValue,
      collapsible = true,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const initial = defaultValue
      ? Array.isArray(defaultValue)
        ? defaultValue
        : [defaultValue]
      : [];
    const [openValues, setOpenValues] = React.useState<string[]>(initial);

    const toggle = React.useCallback(
      (item: string) => {
        if (type === "single") {
          setOpenValues((prev) =>
            prev.includes(item) ? (collapsible ? [] : prev) : [item],
          );
        } else {
          setOpenValues((prev) =>
            prev.includes(item)
              ? prev.filter((v) => v !== item)
              : [...prev, item],
          );
        }
      },
      [type, collapsible],
    );

    return (
      <AccordionContext.Provider value={{ openValues, toggle }}>
        <div
          ref={ref}
          className={cn(
            "divide-y divide-border rounded-md border border-border",
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </AccordionContext.Provider>
    );
  },
);
Accordion.displayName = "Accordion";

export interface AccordionItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

export const AccordionItem = React.forwardRef<
  HTMLDivElement,
  AccordionItemProps
>(({ value, children, className, ...props }, ref) => (
  <AccordionItemContext.Provider value={value}>
    <div ref={ref} className={cn("px-4", className)} {...props}>
      {children}
    </div>
  </AccordionItemContext.Provider>
));
AccordionItem.displayName = "AccordionItem";

export interface AccordionTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const AccordionTrigger = React.forwardRef<
  HTMLButtonElement,
  AccordionTriggerProps
>(({ children, className, ...props }, ref) => {
  const { openValues, toggle } = useAccordionContext();
  const itemValue = React.useContext(AccordionItemContext);
  const isOpen = openValues.includes(itemValue);

  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={isOpen}
      onClick={() => toggle(itemValue)}
      className={cn(
        "flex w-full items-center justify-between py-4 text-sm font-medium text-foreground",
        transitions.all,
        "hover:underline",
        focusRing,
        className,
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
          "shrink-0 text-muted-foreground",
          transitions.transform,
          isOpen && "rotate-180",
        )}
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

export interface AccordionContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export const AccordionContent = React.forwardRef<
  HTMLDivElement,
  AccordionContentProps
>(({ children, className, ...props }, ref) => {
  const { openValues } = useAccordionContext();
  const itemValue = React.useContext(AccordionItemContext);
  const isOpen = openValues.includes(itemValue);

  return (
    <Collapse open={isOpen}>
      <div
        ref={ref}
        className={cn("pb-4 pt-0 text-sm text-muted-foreground", className)}
        {...props}
      >
        {children}
      </div>
    </Collapse>
  );
});
AccordionContent.displayName = "AccordionContent";
