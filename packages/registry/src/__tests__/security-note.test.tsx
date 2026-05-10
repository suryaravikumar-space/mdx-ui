import * as React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { SecurityNote } from "../security-note"

describe("SecurityNote", () => {
  it("renders children", () => {
    render(<SecurityNote>Never expose private keys.</SecurityNote>)
    expect(screen.getByText("Never expose private keys.")).toBeInTheDocument()
  })

  it("defaults severity to info and shows Security Note title", () => {
    render(<SecurityNote>Note content.</SecurityNote>)
    expect(screen.getByText("Security Note")).toBeInTheDocument()
  })

  it("uses Security Warning title for warning severity", () => {
    render(<SecurityNote severity="warning">Warning content.</SecurityNote>)
    expect(screen.getByText("Security Warning")).toBeInTheDocument()
  })

  it("uses Critical Security Advisory title for critical severity", () => {
    render(<SecurityNote severity="critical">Critical content.</SecurityNote>)
    expect(screen.getByText("Critical Security Advisory")).toBeInTheDocument()
  })

  it("renders custom title when provided", () => {
    render(<SecurityNote title="OTP Fuse Warning">Burn carefully.</SecurityNote>)
    expect(screen.getByText("OTP Fuse Warning")).toBeInTheDocument()
  })

  it("sets data-security-note attribute", () => {
    const { container } = render(<SecurityNote>Content</SecurityNote>)
    expect(container.querySelector("[data-security-note]")).toBeInTheDocument()
  })

  it("sets data-severity attribute", () => {
    const { container } = render(
      <SecurityNote severity="critical">Content</SecurityNote>,
    )
    expect(
      container.querySelector("[data-severity='critical']"),
    ).toBeInTheDocument()
  })

  it("has role=note", () => {
    render(<SecurityNote>Accessible note.</SecurityNote>)
    expect(screen.getByRole("note")).toBeInTheDocument()
  })

  it("accepts className", () => {
    const { container } = render(
      <SecurityNote className="mt-12">Content</SecurityNote>,
    )
    expect(container.firstChild).toHaveClass("mt-12")
  })

  it("renders all three severities without errors", () => {
    const { unmount } = render(<SecurityNote severity="info">a</SecurityNote>)
    unmount()
    const { unmount: u2 } = render(<SecurityNote severity="warning">b</SecurityNote>)
    u2()
    render(<SecurityNote severity="critical">c</SecurityNote>)
    expect(screen.getByText("c")).toBeInTheDocument()
  })
})
