import * as React from "react"

export interface CollapseProps {
  /** Whether the content is visible */
  open: boolean
  children: React.ReactNode
  className?: string
}

/**
 * Collapse — animated height transition using CSS grid-template-rows.
 *
 * Technique: the outer div transitions between `grid-template-rows: 0fr`
 * (collapsed) and `1fr` (expanded). The inner div clips overflow.
 * This avoids JS height measurement and handles dynamic content naturally.
 *
 * @example
 * <Collapse open={isOpen}>
 *   <div className="py-4">content</div>
 * </Collapse>
 */
export function Collapse({ open, children, className }: CollapseProps) {
  return (
    <div
      aria-hidden={!open}
      style={{
        display: "grid",
        gridTemplateRows: open ? "1fr" : "0fr",
        transition: "grid-template-rows 220ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
      className={className}
    >
      <div style={{ overflow: "hidden" }}>{children}</div>
    </div>
  )
}
