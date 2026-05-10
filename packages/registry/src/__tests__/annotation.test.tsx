import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { Annotation } from "../annotation"

describe("Annotation", () => {
  it("renders annotated text as a button", () => {
    render(<Annotation note="explanation">O(n²)</Annotation>)
    expect(screen.getByRole("button", { name: /O\(n²\)/i })).toBeInTheDocument()
  })

  it("does not show popover by default", () => {
    render(<Annotation note="This is the explanation">term</Annotation>)
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
  })

  it("shows popover on click", async () => {
    render(<Annotation note="Quadratic time complexity">O(n²)</Annotation>)
    await userEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("tooltip")).toBeInTheDocument()
    expect(screen.getByText("Quadratic time complexity")).toBeInTheDocument()
  })

  it("hides popover on second click", async () => {
    render(<Annotation note="explanation">term</Annotation>)
    await userEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("tooltip")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button"))
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
  })

  it("sets aria-expanded=false when closed", () => {
    render(<Annotation note="note">term</Annotation>)
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false")
  })

  it("sets aria-expanded=true when open", async () => {
    render(<Annotation note="note">term</Annotation>)
    await userEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true")
  })

  it("closes popover on Escape key", async () => {
    render(<Annotation note="explanation">term</Annotation>)
    await userEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("tooltip")).toBeInTheDocument()
    fireEvent.keyDown(document, { key: "Escape" })
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<Annotation note="note" className="custom-class">term</Annotation>)
    expect(container.firstChild).toHaveClass("custom-class")
  })
})
