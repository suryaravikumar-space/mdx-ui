import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Heading, H1, H2, H3, H4, H5, H6 } from "../heading"

describe("Heading", () => {
  it("renders as h2 by default", () => {
    render(<Heading>Default heading</Heading>)
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
  })

  it("renders as the element specified by `as`", () => {
    render(<Heading as="h4">H4 heading</Heading>)
    expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument()
  })

  it("renders text content", () => {
    render(<Heading>Hello</Heading>)
    expect(screen.getByText("Hello")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<Heading className="custom">text</Heading>)
    expect(screen.getByText("text")).toHaveClass("custom")
  })
})

describe("H1–H6 anchor headings", () => {
  it("H1 renders as h1", () => {
    render(<H1>Page Title</H1>)
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
  })

  it("H2 renders as h2", () => {
    render(<H2>Section</H2>)
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument()
  })

  it("H3 renders as h3", () => {
    render(<H3>Subsection</H3>)
    expect(screen.getByRole("heading", { level: 3 })).toBeInTheDocument()
  })

  it("H4 renders as h4", () => {
    render(<H4>H4</H4>)
    expect(screen.getByRole("heading", { level: 4 })).toBeInTheDocument()
  })

  it("H5 renders as h5", () => {
    render(<H5>H5</H5>)
    expect(screen.getByRole("heading", { level: 5 })).toBeInTheDocument()
  })

  it("H6 renders as h6", () => {
    render(<H6>H6</H6>)
    expect(screen.getByRole("heading", { level: 6 })).toBeInTheDocument()
  })

  it("generates an id from text content (slugify)", () => {
    render(<H2>Getting Started</H2>)
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute("id", "getting-started")
  })

  it("slugify strips special characters", () => {
    render(<H2>What's New?</H2>)
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute("id", "whats-new")
  })

  it("uses provided id over auto-generated slug", () => {
    render(<H2 id="custom-id">Section Title</H2>)
    expect(screen.getByRole("heading", { level: 2 })).toHaveAttribute("id", "custom-id")
  })

  it("renders anchor link with href pointing to slug", () => {
    render(<H2>Installation</H2>)
    const link = screen.getByRole("link", { hidden: true })
    expect(link).toHaveAttribute("href", "#installation")
  })

  it("anchor link is aria-hidden", () => {
    render(<H2>Setup</H2>)
    expect(screen.getByRole("link", { hidden: true })).toHaveAttribute("aria-hidden", "true")
  })
})
