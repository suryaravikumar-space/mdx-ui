import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { CodeGroup } from "../code-group"

const mockWriteText = jest.fn().mockResolvedValue(undefined)
Object.defineProperty(navigator, "clipboard", {
  value: { writeText: mockWriteText },
  writable: true,
})

function makeChild(label: string, content: string) {
  return (
    <pre key={label} data-language={label}>
      {content}
    </pre>
  )
}

function makeChildWithTitle(title: string, content: string) {
  return (
    <pre key={title} data-title={title}>
      {content}
    </pre>
  )
}

describe("CodeGroup", () => {
  beforeEach(() => mockWriteText.mockClear())

  it("renders first tab content by default", () => {
    render(
      <CodeGroup>
        {makeChild("typescript", "const x = 1")}
        {makeChild("javascript", "var x = 1")}
      </CodeGroup>
    )
    expect(screen.getByText("const x = 1")).toBeInTheDocument()
    expect(screen.queryByText("var x = 1")).not.toBeInTheDocument()
  })

  it("renders tab labels from data-language", () => {
    render(
      <CodeGroup>
        {makeChild("typescript", "ts code")}
        {makeChild("javascript", "js code")}
      </CodeGroup>
    )
    expect(screen.getByRole("tab", { name: "typescript" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "javascript" })).toBeInTheDocument()
  })

  it("prefers data-title over data-language for tab label", () => {
    render(
      <CodeGroup>
        {makeChildWithTitle("main.ts", "ts code")}
      </CodeGroup>
    )
    expect(screen.getByRole("tab", { name: "main.ts" })).toBeInTheDocument()
  })

  it("falls back to Code label when neither title nor language provided", () => {
    render(
      <CodeGroup>
        <pre>some code</pre>
      </CodeGroup>
    )
    expect(screen.getByRole("tab", { name: "Code" })).toBeInTheDocument()
  })

  it("switches content on tab click", async () => {
    render(
      <CodeGroup>
        {makeChild("typescript", "const x = 1")}
        {makeChild("javascript", "var x = 1")}
      </CodeGroup>
    )
    await userEvent.click(screen.getByRole("tab", { name: "javascript" }))
    expect(screen.getByText("var x = 1")).toBeInTheDocument()
    expect(screen.queryByText("const x = 1")).not.toBeInTheDocument()
  })

  it("first tab has aria-selected=true by default", () => {
    render(
      <CodeGroup>
        {makeChild("typescript", "ts")}
        {makeChild("javascript", "js")}
      </CodeGroup>
    )
    expect(screen.getByRole("tab", { name: "typescript" })).toHaveAttribute("aria-selected", "true")
    expect(screen.getByRole("tab", { name: "javascript" })).toHaveAttribute("aria-selected", "false")
  })

  it("shows copy button", () => {
    render(
      <CodeGroup>
        {makeChild("typescript", "code")}
      </CodeGroup>
    )
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument()
  })

  it("returns null when no valid children are provided", () => {
    const { container } = render(<CodeGroup>{null}</CodeGroup>)
    expect(container.firstChild).toBeNull()
  })

  it("navigates tabs with ArrowRight key", async () => {
    render(
      <CodeGroup>
        {makeChild("typescript", "ts code")}
        {makeChild("javascript", "js code")}
      </CodeGroup>
    )
    const firstTab = screen.getByRole("tab", { name: "typescript" })
    firstTab.focus()
    fireEvent.keyDown(firstTab, { key: "ArrowRight" })
    expect(screen.getByText("js code")).toBeInTheDocument()
  })

  it("navigates tabs with ArrowLeft key", async () => {
    render(
      <CodeGroup>
        {makeChild("typescript", "ts code")}
        {makeChild("javascript", "js code")}
      </CodeGroup>
    )
    // Click second tab first
    await userEvent.click(screen.getByRole("tab", { name: "javascript" }))
    const secondTab = screen.getByRole("tab", { name: "javascript" })
    fireEvent.keyDown(secondTab, { key: "ArrowLeft" })
    expect(screen.getByText("ts code")).toBeInTheDocument()
  })

  it("Home key jumps to first tab", async () => {
    render(
      <CodeGroup>
        {makeChild("typescript", "ts code")}
        {makeChild("javascript", "js code")}
        {makeChild("python", "py code")}
      </CodeGroup>
    )
    await userEvent.click(screen.getByRole("tab", { name: "python" }))
    const lastTab = screen.getByRole("tab", { name: "python" })
    fireEvent.keyDown(lastTab, { key: "Home" })
    expect(screen.getByText("ts code")).toBeInTheDocument()
  })

  it("End key jumps to last tab", async () => {
    render(
      <CodeGroup>
        {makeChild("typescript", "ts code")}
        {makeChild("javascript", "js code")}
        {makeChild("python", "py code")}
      </CodeGroup>
    )
    const firstTab = screen.getByRole("tab", { name: "typescript" })
    fireEvent.keyDown(firstTab, { key: "End" })
    expect(screen.getByText("py code")).toBeInTheDocument()
  })
})
