import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Blockquote } from "../blockquote"

describe("Blockquote", () => {
  it("renders children", () => {
    render(<Blockquote>Do or do not.</Blockquote>)
    expect(screen.getByText("Do or do not.")).toBeInTheDocument()
  })

  it("renders as a blockquote element", () => {
    const { container } = render(<Blockquote>Quote</Blockquote>)
    expect(container.firstChild?.nodeName).toBe("BLOCKQUOTE")
  })

  it("renders cite footer when cite prop is provided", () => {
    render(<Blockquote cite="Yoda">Do or do not.</Blockquote>)
    expect(screen.getByText(/Yoda/)).toBeInTheDocument()
  })

  it("renders em dash before cite text", () => {
    render(<Blockquote cite="Yoda">Quote</Blockquote>)
    const footer = screen.getByText(/— Yoda/)
    expect(footer).toBeInTheDocument()
  })

  it("does not render footer when cite is omitted", () => {
    const { container } = render(<Blockquote>Quote</Blockquote>)
    expect(container.querySelector("footer")).not.toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<Blockquote className="my-quote">text</Blockquote>)
    expect(container.firstChild).toHaveClass("my-quote")
  })
})
