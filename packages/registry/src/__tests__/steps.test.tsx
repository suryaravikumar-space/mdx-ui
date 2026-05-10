import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Steps, Step } from "../steps"

describe("Steps", () => {
  it("renders children", () => {
    render(
      <Steps>
        <Step>First step content</Step>
      </Steps>
    )
    expect(screen.getByText("First step content")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<Steps className="custom-steps"><Step>x</Step></Steps>)
    expect(container.firstChild).toHaveClass("custom-steps")
  })
})

describe("Step", () => {
  it("renders children", () => {
    render(
      <Steps>
        <Step>Do something</Step>
      </Steps>
    )
    expect(screen.getByText("Do something")).toBeInTheDocument()
  })

  it("renders title when provided", () => {
    render(
      <Steps>
        <Step title="Install dependencies">Run npm install</Step>
      </Steps>
    )
    expect(screen.getByText("Install dependencies")).toBeInTheDocument()
    expect(screen.getByText("Run npm install")).toBeInTheDocument()
  })

  it("does not render title element when title is omitted", () => {
    const { container } = render(
      <Steps>
        <Step>No title here</Step>
      </Steps>
    )
    expect(container.querySelector("h3")).not.toBeInTheDocument()
  })

  it("applies custom className to Step", () => {
    const { container } = render(
      <Steps>
        <Step className="my-step">content</Step>
      </Steps>
    )
    expect(container.querySelector(".my-step")).toBeInTheDocument()
  })

  it("renders multiple steps", () => {
    render(
      <Steps>
        <Step title="Step 1">First</Step>
        <Step title="Step 2">Second</Step>
        <Step title="Step 3">Third</Step>
      </Steps>
    )
    expect(screen.getByText("Step 1")).toBeInTheDocument()
    expect(screen.getByText("Step 2")).toBeInTheDocument()
    expect(screen.getByText("Step 3")).toBeInTheDocument()
  })
})
