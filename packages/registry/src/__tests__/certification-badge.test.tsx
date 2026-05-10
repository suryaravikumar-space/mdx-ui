import * as React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { CertificationBadge } from "../certification-badge"

const certs = [
  {
    name: "ISO 27001:2022",
    scope: "Information Security Management",
    year: 2023,
    status: "active" as const,
  },
  {
    name: "TISAX",
    scope: "Automotive Information Security",
    year: 2024,
    status: "active" as const,
  },
  {
    name: "SOC 2 Type II",
    status: "pending" as const,
  },
]

describe("CertificationBadge", () => {
  it("renders certification names", () => {
    render(<CertificationBadge certs={certs} />)
    expect(screen.getByText("ISO 27001:2022")).toBeInTheDocument()
    expect(screen.getByText("TISAX")).toBeInTheDocument()
    expect(screen.getByText("SOC 2 Type II")).toBeInTheDocument()
  })

  it("renders scope when provided", () => {
    render(<CertificationBadge certs={certs} />)
    expect(screen.getByText("Information Security Management")).toBeInTheDocument()
    expect(screen.getByText("Automotive Information Security")).toBeInTheDocument()
  })

  it("renders year when provided", () => {
    render(<CertificationBadge certs={certs} />)
    expect(screen.getByText("2023")).toBeInTheDocument()
    expect(screen.getByText("2024")).toBeInTheDocument()
  })

  it("renders status labels", () => {
    render(<CertificationBadge certs={certs} />)
    const actives = screen.getAllByText("Active")
    expect(actives).toHaveLength(2)
    expect(screen.getByText("Pending")).toBeInTheDocument()
  })

  it("defaults missing status to active", () => {
    render(
      <CertificationBadge certs={[{ name: "GDPR" }]} />,
    )
    expect(screen.getByText("Active")).toBeInTheDocument()
  })

  it("renders expired status", () => {
    render(
      <CertificationBadge
        certs={[{ name: "Old Cert", status: "expired" }]}
      />,
    )
    expect(screen.getByText("Expired")).toBeInTheDocument()
  })

  it("does not render year or dot separator when year is absent", () => {
    render(
      <CertificationBadge certs={[{ name: "SOC 2 Type II", status: "pending" }]} />,
    )
    expect(screen.queryByText("·")).not.toBeInTheDocument()
  })

  it("sets data-certification-badge attribute", () => {
    const { container } = render(<CertificationBadge certs={certs} />)
    expect(
      container.querySelector("[data-certification-badge]"),
    ).toBeInTheDocument()
  })

  it("accepts className", () => {
    const { container } = render(
      <CertificationBadge certs={certs} className="gap-6" />,
    )
    expect(container.firstChild).toHaveClass("gap-6")
  })

  it("renders a single cert without errors", () => {
    render(
      <CertificationBadge certs={[{ name: "ISO 9001", year: 2022, status: "active" }]} />,
    )
    expect(screen.getByText("ISO 9001")).toBeInTheDocument()
  })
})
