import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { ComplexityTable } from "../complexity-table"

const bstRows = [
  { operation: "Search", best: "O(1)", average: "O(log n)", worst: "O(n)" },
  { operation: "Insert", best: "O(log n)", average: "O(log n)", worst: "O(n)" },
  { operation: "Delete", best: "O(log n)", average: "O(log n)", worst: "O(n)" },
]

describe("ComplexityTable", () => {
  it("renders all operation names", () => {
    render(<ComplexityTable rows={bstRows} />)
    expect(screen.getByText("Search")).toBeInTheDocument()
    expect(screen.getByText("Insert")).toBeInTheDocument()
    expect(screen.getByText("Delete")).toBeInTheDocument()
  })

  it("renders column headers for provided columns", () => {
    render(<ComplexityTable rows={bstRows} />)
    expect(screen.getByText("Best")).toBeInTheDocument()
    expect(screen.getByText("Average")).toBeInTheDocument()
    expect(screen.getByText("Worst")).toBeInTheDocument()
  })

  it("does not render Space column when no rows have space", () => {
    render(<ComplexityTable rows={bstRows} />)
    expect(screen.queryByText("Space")).not.toBeInTheDocument()
  })

  it("renders Space column when at least one row has space", () => {
    const rows = [
      { operation: "Sort", worst: "O(n log n)", space: "O(n)" },
    ]
    render(<ComplexityTable rows={rows} />)
    expect(screen.getByText("Space")).toBeInTheDocument()
    expect(screen.getByText("O(n)")).toBeInTheDocument()
  })

  it("renders caption when provided", () => {
    render(<ComplexityTable rows={bstRows} caption="BST Operations" />)
    expect(screen.getByText("BST Operations")).toBeInTheDocument()
  })

  it("does not render caption when not provided", () => {
    const { container } = render(<ComplexityTable rows={bstRows} />)
    // caption is a <p> element; no <p> should exist when caption is omitted
    expect(container.querySelector("p")).not.toBeInTheDocument()
  })

  it("renders dash for missing optional fields", () => {
    // "best" column is shown because row 1 has it; row 2 lacks it so renders "—"
    const rows = [
      { operation: "Search", best: "O(1)", worst: "O(n)" },
      { operation: "Insert", worst: "O(n)" },
    ]
    render(<ComplexityTable rows={rows} />)
    expect(screen.getByText("Best")).toBeInTheDocument()
    expect(screen.getByText("—")).toBeInTheDocument()
  })

  it("has data-complexity-table attribute on root", () => {
    const { container } = render(<ComplexityTable rows={bstRows} />)
    expect(container.firstChild).toHaveAttribute("data-complexity-table")
  })

  it("applies custom className", () => {
    const { container } = render(<ComplexityTable rows={bstRows} className="custom" />)
    expect(container.firstChild).toHaveClass("custom")
  })

  it("renders an empty table body when rows is empty", () => {
    render(<ComplexityTable rows={[]} />)
    const table = screen.getByRole("table")
    expect(table).toBeInTheDocument()
  })

  it("renders Operation header always", () => {
    render(<ComplexityTable rows={bstRows} />)
    expect(screen.getByRole("columnheader", { name: "Operation" })).toBeInTheDocument()
  })
})
