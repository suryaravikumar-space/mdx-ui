import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Callout } from "../callout"

describe("Callout", () => {
  it("renders children", () => {
    render(<Callout>Hello world</Callout>)
    expect(screen.getByText("Hello world")).toBeInTheDocument()
  })

  it("renders title when provided", () => {
    render(<Callout title="Note">Some content</Callout>)
    expect(screen.getByText("Note")).toBeInTheDocument()
    expect(screen.getByText("Some content")).toBeInTheDocument()
  })

  it("does not render title element when title is omitted", () => {
    const { container } = render(<Callout>Content</Callout>)
    expect(container.querySelector(".font-semibold")).not.toBeInTheDocument()
  })

  it("renders icon when provided", () => {
    render(<Callout icon={<span data-testid="icon">⚠️</span>}>Content</Callout>)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("does not render icon wrapper when icon is omitted", () => {
    const { container } = render(<Callout>Content</Callout>)
    expect(container.querySelector(".flex-shrink-0")).not.toBeInTheDocument()
  })

  it.each(["default", "info", "warning", "danger", "success"] as const)(
    "renders variant=%s without crashing",
    (variant) => {
      const { container } = render(<Callout variant={variant}>Content</Callout>)
      expect(container.firstChild).toBeInTheDocument()
    }
  )

  it("applies custom className", () => {
    const { container } = render(<Callout className="custom-class">Content</Callout>)
    expect(container.firstChild).toHaveClass("custom-class")
  })
})
