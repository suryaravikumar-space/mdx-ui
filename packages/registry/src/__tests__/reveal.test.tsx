import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { Reveal } from "../reveal"

describe("Reveal", () => {
  it("renders the label button", () => {
    render(<Reveal label="Show answer">content</Reveal>)
    expect(screen.getByRole("button", { name: "Show answer" })).toBeInTheDocument()
  })

  it("hides content by default via Collapse aria-hidden", () => {
    render(<Reveal label="Show answer">hidden content</Reveal>)
    const content = screen.getByText("hidden content")
    expect(content.closest('[aria-hidden="true"]')).toBeInTheDocument()
  })

  it("reveals content on click", async () => {
    render(<Reveal label="Show answer">revealed content</Reveal>)
    await userEvent.click(screen.getByRole("button"))
    const content = screen.getByText("revealed content")
    expect(content.closest('[aria-hidden="true"]')).not.toBeInTheDocument()
  })

  it("hides content again on second click", async () => {
    render(<Reveal label="Show answer">content</Reveal>)
    await userEvent.click(screen.getByRole("button"))
    await userEvent.click(screen.getByRole("button"))
    expect(screen.getByText("content").closest('[aria-hidden="true"]')).toBeInTheDocument()
  })

  it("sets aria-expanded=false by default", () => {
    render(<Reveal label="Show answer">content</Reveal>)
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false")
  })

  it("sets aria-expanded=true when open", async () => {
    render(<Reveal label="Show answer">content</Reveal>)
    await userEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "true")
  })

  it("uses default label when none provided", () => {
    render(<Reveal>content</Reveal>)
    expect(screen.getByRole("button", { name: "Show answer" })).toBeInTheDocument()
  })

  it("starts open when defaultOpen=true", () => {
    render(<Reveal defaultOpen label="Show answer">content</Reveal>)
    expect(screen.getByText("content").closest('[aria-hidden="true"]')).not.toBeInTheDocument()
  })

  it("applies custom className to root", () => {
    const { container } = render(<Reveal className="custom" label="Show">c</Reveal>)
    expect(container.firstChild).toHaveClass("custom")
  })
})
