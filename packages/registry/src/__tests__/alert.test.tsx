import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Alert, AlertTitle, AlertDescription } from "../alert"

describe("Alert", () => {
  it("renders with role=alert", () => {
    render(<Alert>message</Alert>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(<Alert>Something happened</Alert>)
    expect(screen.getByText("Something happened")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    render(<Alert className="my-class">msg</Alert>)
    expect(screen.getByRole("alert")).toHaveClass("my-class")
  })

  it.each(["default", "info", "warning", "destructive", "success"] as const)(
    "renders variant=%s without crashing",
    (variant) => {
      render(<Alert variant={variant}>content</Alert>)
      expect(screen.getByRole("alert")).toBeInTheDocument()
    }
  )
})

describe("AlertTitle", () => {
  it("renders text content", () => {
    render(<AlertTitle>Heads up</AlertTitle>)
    expect(screen.getByText("Heads up")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(<AlertTitle className="bold-title">Title</AlertTitle>)
    expect(container.firstChild).toHaveClass("bold-title")
  })
})

describe("AlertDescription", () => {
  it("renders text content", () => {
    render(<AlertDescription>Details here</AlertDescription>)
    expect(screen.getByText("Details here")).toBeInTheDocument()
  })
})

describe("Alert composition", () => {
  it("renders title and description together", () => {
    render(
      <Alert>
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>Something went wrong</AlertDescription>
      </Alert>
    )
    expect(screen.getByText("Warning")).toBeInTheDocument()
    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
  })
})
