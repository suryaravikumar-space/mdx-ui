import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { CodeBlock } from "../code-block"

const mockWriteText = jest.fn().mockResolvedValue(undefined)
Object.defineProperty(navigator, "clipboard", {
  value: { writeText: mockWriteText },
  writable: true,
})

describe("CodeBlock", () => {
  beforeEach(() => mockWriteText.mockClear())

  it("renders code content", () => {
    render(<CodeBlock>const x = 1</CodeBlock>)
    expect(screen.getByText("const x = 1")).toBeInTheDocument()
  })

  it("shows title when provided", () => {
    render(<CodeBlock title="example.ts">code</CodeBlock>)
    expect(screen.getByText("example.ts")).toBeInTheDocument()
  })

  it("shows lang when title is not provided", () => {
    render(<CodeBlock lang="typescript">code</CodeBlock>)
    expect(screen.getByText("typescript")).toBeInTheDocument()
  })

  it("shows 'code' fallback in header when neither title nor lang provided", () => {
    render(<CodeBlock>some content</CodeBlock>)
    expect(screen.getByText("code")).toBeInTheDocument()
  })

  it("shows Copy button", () => {
    render(<CodeBlock>const x = 1</CodeBlock>)
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument()
  })

  it("copies code to clipboard on button click", async () => {
    render(<CodeBlock>const x = 1</CodeBlock>)
    await userEvent.click(screen.getByRole("button", { name: /copy/i }))
    expect(mockWriteText).toHaveBeenCalledWith("const x = 1")
  })

  it("shows Copied! after clicking copy", async () => {
    render(<CodeBlock>const x = 1</CodeBlock>)
    await userEvent.click(screen.getByRole("button", { name: /copy/i }))
    await waitFor(() => expect(screen.getByText("Copied!")).toBeInTheDocument())
  })

  it("applies custom className", () => {
    const { container } = render(<CodeBlock className="my-class">code</CodeBlock>)
    expect(container.querySelector("pre")).toHaveClass("my-class")
  })
})
