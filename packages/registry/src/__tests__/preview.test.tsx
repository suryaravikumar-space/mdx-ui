import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { Preview } from "../preview"

describe("Preview", () => {
  const defaultProps = {
    code: '<Badge variant="success">Done</Badge>',
    lang: "tsx",
    children: <span>rendered output</span>,
  }

  it("shows Preview tab by default", () => {
    render(<Preview {...defaultProps} />)
    expect(screen.getByRole("button", { name: "preview" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "code" })).toBeInTheDocument()
  })

  it("renders children in preview tab", () => {
    render(<Preview {...defaultProps} />)
    expect(screen.getByText("rendered output")).toBeInTheDocument()
  })

  it("does not show code by default", () => {
    render(<Preview {...defaultProps} />)
    expect(screen.queryByText(defaultProps.code)).not.toBeInTheDocument()
  })

  it("switches to code tab on click", async () => {
    render(<Preview {...defaultProps} />)
    await userEvent.click(screen.getByRole("button", { name: "code" }))
    expect(screen.getByText(defaultProps.code)).toBeInTheDocument()
  })

  it("shows language label in code tab", async () => {
    render(<Preview {...defaultProps} />)
    await userEvent.click(screen.getByRole("button", { name: "code" }))
    expect(screen.getByText("tsx")).toBeInTheDocument()
  })

  it("shows copy button in code tab", async () => {
    render(<Preview {...defaultProps} />)
    await userEvent.click(screen.getByRole("button", { name: "code" }))
    expect(screen.getByRole("button", { name: /copy code/i })).toBeInTheDocument()
  })

  it("hides preview content when code tab is active", async () => {
    render(<Preview {...defaultProps} />)
    await userEvent.click(screen.getByRole("button", { name: "code" }))
    expect(screen.queryByText("rendered output")).not.toBeInTheDocument()
  })

  it("switches back to preview tab", async () => {
    render(<Preview {...defaultProps} />)
    await userEvent.click(screen.getByRole("button", { name: "code" }))
    await userEvent.click(screen.getByRole("button", { name: "preview" }))
    expect(screen.getByText("rendered output")).toBeInTheDocument()
    expect(screen.queryByText(defaultProps.code)).not.toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<Preview {...defaultProps} className="custom" />)
    expect(container.firstChild).toHaveClass("custom")
  })
})
