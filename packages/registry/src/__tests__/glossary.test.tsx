import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { GlossaryProvider, Term } from "../glossary"

const terms = {
  bfs: { label: "BFS", definition: "Breadth-First Search: explores level by level." },
  dfs: { label: "DFS", definition: "Depth-First Search: explores as far as possible." },
}

function Wrapper({ children }: { children: React.ReactNode }) {
  return <GlossaryProvider terms={terms}>{children}</GlossaryProvider>
}

describe("GlossaryProvider + Term", () => {
  it("renders term label as a button", () => {
    render(<Term id="bfs" />, { wrapper: Wrapper })
    expect(screen.getByRole("button", { name: "BFS" })).toBeInTheDocument()
  })

  it("renders custom children text instead of label", () => {
    render(<Term id="bfs">breadth-first search</Term>, { wrapper: Wrapper })
    expect(screen.getByRole("button", { name: "breadth-first search" })).toBeInTheDocument()
  })

  it("does not show popover by default", () => {
    render(<Term id="bfs" />, { wrapper: Wrapper })
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
  })

  it("shows popover on click", async () => {
    render(<Term id="bfs" />, { wrapper: Wrapper })
    await userEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("tooltip")).toBeInTheDocument()
    expect(screen.getByText("Breadth-First Search: explores level by level.")).toBeInTheDocument()
  })

  it("shows term label in popover heading", async () => {
    render(<Term id="bfs" />, { wrapper: Wrapper })
    await userEvent.click(screen.getByRole("button"))
    const tooltip = screen.getByRole("tooltip")
    expect(tooltip).toHaveTextContent("BFS")
  })

  it("closes popover on second click", async () => {
    render(<Term id="bfs" />, { wrapper: Wrapper })
    await userEvent.click(screen.getByRole("button"))
    await userEvent.click(screen.getByRole("button"))
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
  })

  it("closes popover on Escape key", async () => {
    render(<Term id="bfs" />, { wrapper: Wrapper })
    await userEvent.click(screen.getByRole("button"))
    expect(screen.getByRole("tooltip")).toBeInTheDocument()
    fireEvent.keyDown(document, { key: "Escape" })
    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument()
  })

  it("sets aria-expanded correctly", async () => {
    render(<Term id="bfs" />, { wrapper: Wrapper })
    const btn = screen.getByRole("button")
    expect(btn).toHaveAttribute("aria-expanded", "false")
    await userEvent.click(btn)
    expect(btn).toHaveAttribute("aria-expanded", "true")
  })

  it("degrades gracefully when term id is not in provider", () => {
    render(<GlossaryProvider terms={{}}><Term id="unknown">fallback text</Term></GlossaryProvider>)
    expect(screen.getByText("fallback text")).toBeInTheDocument()
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("degrades to id text when no children and term not found", () => {
    render(<GlossaryProvider terms={{}}><Term id="unknown-term" /></GlossaryProvider>)
    expect(screen.getByText("unknown-term")).toBeInTheDocument()
  })

  it("multiple terms work independently", async () => {
    render(
      <Wrapper>
        <Term id="bfs" />
        <Term id="dfs" />
      </Wrapper>
    )
    await userEvent.click(screen.getByRole("button", { name: "BFS" }))
    expect(screen.getByText("Breadth-First Search: explores level by level.")).toBeInTheDocument()
    expect(screen.queryByText("Depth-First Search: explores as far as possible.")).not.toBeInTheDocument()
  })
})
