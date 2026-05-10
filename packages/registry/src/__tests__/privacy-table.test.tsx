import * as React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { PrivacyTable } from "../privacy-table"

const rows = [
  {
    dataType: "Email Address",
    purpose: "Account authentication",
    legalBasis: "Consent",
    retention: "Until account deletion",
    shared: false,
  },
  {
    dataType: "Chipset Serial Number",
    purpose: "Device identification",
    legalBasis: "Legitimate Interest",
    retention: "5 years",
    shared: true,
  },
  {
    dataType: "Battery Usage",
    purpose: "Performance analytics",
  },
]

describe("PrivacyTable", () => {
  it("renders data type names", () => {
    render(<PrivacyTable rows={rows} />)
    expect(screen.getByText("Email Address")).toBeInTheDocument()
    expect(screen.getByText("Chipset Serial Number")).toBeInTheDocument()
    expect(screen.getByText("Battery Usage")).toBeInTheDocument()
  })

  it("renders purposes", () => {
    render(<PrivacyTable rows={rows} />)
    expect(screen.getByText("Account authentication")).toBeInTheDocument()
    expect(screen.getByText("Device identification")).toBeInTheDocument()
  })

  it("renders column headers", () => {
    render(<PrivacyTable rows={rows} />)
    expect(screen.getByText("Data Type")).toBeInTheDocument()
    expect(screen.getByText("Purpose")).toBeInTheDocument()
    expect(screen.getByText("Legal Basis")).toBeInTheDocument()
    expect(screen.getByText("Retention")).toBeInTheDocument()
    expect(screen.getByText("3rd Party")).toBeInTheDocument()
  })

  it("renders legal basis pills", () => {
    render(<PrivacyTable rows={rows} />)
    expect(screen.getByText("Consent")).toBeInTheDocument()
    expect(screen.getByText("Legitimate Interest")).toBeInTheDocument()
  })

  it("shows Yes for shared=true", () => {
    render(<PrivacyTable rows={rows} />)
    expect(screen.getByLabelText("shared with third parties")).toBeInTheDocument()
  })

  it("shows No for shared=false", () => {
    render(<PrivacyTable rows={rows} />)
    expect(screen.getByLabelText("not shared")).toBeInTheDocument()
  })

  it("shows em dash for missing optional columns in a row", () => {
    render(<PrivacyTable rows={rows} />)
    const dashes = screen.getAllByText("—")
    expect(dashes.length).toBeGreaterThan(0)
  })

  it("omits Legal Basis column when no row has it", () => {
    const minimal = [
      { dataType: "IP Address", purpose: "Network routing" },
      { dataType: "Device ID", purpose: "Analytics" },
    ]
    render(<PrivacyTable rows={minimal} />)
    expect(screen.queryByText("Legal Basis")).not.toBeInTheDocument()
  })

  it("renders caption when provided", () => {
    render(
      <PrivacyTable
        rows={rows}
        caption="Per Qualcomm Privacy Policy v2.4"
      />,
    )
    expect(screen.getByText("Per Qualcomm Privacy Policy v2.4")).toBeInTheDocument()
  })

  it("does not render caption element when not provided", () => {
    const { container } = render(<PrivacyTable rows={rows} />)
    expect(container.querySelector("p")).not.toBeInTheDocument()
  })

  it("sets data-privacy-table attribute", () => {
    const { container } = render(<PrivacyTable rows={rows} />)
    expect(container.querySelector("[data-privacy-table]")).toBeInTheDocument()
  })
})
