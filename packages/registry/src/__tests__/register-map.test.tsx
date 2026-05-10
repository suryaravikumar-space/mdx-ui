import * as React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { RegisterMap } from "../register-map"

const rows = [
  {
    address: "0x00780000",
    name: "QFPROM_CORR_RD_WR_PERM_LSB",
    bits: "31:0",
    access: "OTP" as const,
    reset: "0x00000000",
    description: "Read/write permissions for fuse rows.",
  },
  {
    address: "0x00780008",
    name: "QFPROM_CORR_JTAG_ID",
    bits: "31:0",
    access: "RO" as const,
    reset: "0x009600E1",
    description: "JTAG identification register.",
  },
]

describe("RegisterMap", () => {
  it("renders register names", () => {
    render(<RegisterMap rows={rows} />)
    expect(screen.getByText("QFPROM_CORR_RD_WR_PERM_LSB")).toBeInTheDocument()
    expect(screen.getByText("QFPROM_CORR_JTAG_ID")).toBeInTheDocument()
  })

  it("renders addresses", () => {
    render(<RegisterMap rows={rows} />)
    expect(screen.getByText("0x00780000")).toBeInTheDocument()
    expect(screen.getByText("0x00780008")).toBeInTheDocument()
  })

  it("renders access type badges", () => {
    render(<RegisterMap rows={rows} />)
    expect(screen.getByText("OTP")).toBeInTheDocument()
    expect(screen.getByText("RO")).toBeInTheDocument()
  })

  it("renders column headers", () => {
    render(<RegisterMap rows={rows} />)
    expect(screen.getByText("Address")).toBeInTheDocument()
    expect(screen.getByText("Register")).toBeInTheDocument()
    expect(screen.getByText("Bits")).toBeInTheDocument()
    expect(screen.getByText("Access")).toBeInTheDocument()
    expect(screen.getByText("Reset")).toBeInTheDocument()
    expect(screen.getByText("Description")).toBeInTheDocument()
  })

  it("renders optional title when provided", () => {
    render(<RegisterMap title="Security Control Block" rows={rows} />)
    expect(screen.getByText("Security Control Block")).toBeInTheDocument()
  })

  it("does not render title area when title is omitted", () => {
    render(<RegisterMap rows={rows} />)
    expect(screen.queryByText("Security Control Block")).not.toBeInTheDocument()
  })

  it("renders caption when provided", () => {
    render(<RegisterMap rows={rows} caption="Source: Qualcomm QFPROM ICD" />)
    expect(screen.getByText("Source: Qualcomm QFPROM ICD")).toBeInTheDocument()
  })

  it("omits Address column when no row has address", () => {
    const noAddr = [{ name: "REG_A", access: "RW" as const }]
    render(<RegisterMap rows={noAddr} />)
    expect(screen.queryByText("Address")).not.toBeInTheDocument()
  })

  it("renders em dash for missing optional fields", () => {
    const sparse = [
      { name: "REG_A", access: "RW" as const },
      { name: "REG_B", access: "RO" as const, bits: "7:0" },
    ]
    render(<RegisterMap rows={sparse} />)
    expect(screen.getByText("—")).toBeInTheDocument()
  })

  it("sets data-register-map attribute", () => {
    const { container } = render(<RegisterMap rows={rows} />)
    expect(container.querySelector("[data-register-map]")).toBeInTheDocument()
  })
})
