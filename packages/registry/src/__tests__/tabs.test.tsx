import React from "react"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import "@testing-library/jest-dom"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../tabs"

function TestTabs() {
  return (
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTrigger value="a">Tab A</TabsTrigger>
        <TabsTrigger value="b">Tab B</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Content A</TabsContent>
      <TabsContent value="b">Content B</TabsContent>
    </Tabs>
  )
}

describe("Tabs", () => {
  it("renders the default tab content", () => {
    render(<TestTabs />)
    expect(screen.getByText("Content A")).toBeInTheDocument()
    expect(screen.queryByText("Content B")).not.toBeInTheDocument()
  })

  it("switches content on trigger click", async () => {
    render(<TestTabs />)
    await userEvent.click(screen.getByText("Tab B"))
    expect(screen.getByText("Content B")).toBeInTheDocument()
    expect(screen.queryByText("Content A")).not.toBeInTheDocument()
  })

  it("renders all triggers", () => {
    render(<TestTabs />)
    expect(screen.getByText("Tab A")).toBeInTheDocument()
    expect(screen.getByText("Tab B")).toBeInTheDocument()
  })

  it("trigger has correct aria-selected on active tab", () => {
    render(<TestTabs />)
    expect(screen.getByText("Tab A").closest("[role=tab]")).toHaveAttribute("aria-selected", "true")
    expect(screen.getByText("Tab B").closest("[role=tab]")).toHaveAttribute("aria-selected", "false")
  })

  it("calls onValueChange when tab is clicked", async () => {
    const onValueChange = jest.fn()
    render(
      <Tabs defaultValue="a" onValueChange={onValueChange}>
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">A</TabsContent>
        <TabsContent value="b">B</TabsContent>
      </Tabs>
    )
    await userEvent.click(screen.getByText("B"))
    expect(onValueChange).toHaveBeenCalledWith("b")
  })

  it("throws when Tabs sub-component is used outside Tabs", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {})
    expect(() => render(<TabsTrigger value="x">X</TabsTrigger>)).toThrow()
    spy.mockRestore()
  })
})
