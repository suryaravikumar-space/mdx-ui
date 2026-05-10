import * as React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { HardwareSpec } from "../hardware-spec"

describe("HardwareSpec", () => {
  it("renders the interface name", () => {
    render(<HardwareSpec name="USB 3.1 Gen 2" />)
    expect(screen.getByText("USB 3.1 Gen 2")).toBeInTheDocument()
  })

  it("renders provided fields", () => {
    render(
      <HardwareSpec
        name="PCIe Gen 4"
        type="Peripheral Component Interconnect Express"
        version="4.0"
        speed="16 GT/s"
        voltage="1.8V"
        pins={16}
        protocol="NVMe"
      />,
    )
    expect(screen.getByText("Peripheral Component Interconnect Express")).toBeInTheDocument()
    expect(screen.getByText("4.0")).toBeInTheDocument()
    expect(screen.getByText("16 GT/s")).toBeInTheDocument()
    expect(screen.getByText("1.8V")).toBeInTheDocument()
    expect(screen.getByText("16")).toBeInTheDocument()
    expect(screen.getByText("NVMe")).toBeInTheDocument()
  })

  it("renders labels for provided fields", () => {
    render(<HardwareSpec name="I2C" speed="400 kHz" voltage="3.3V" />)
    expect(screen.getByText("Speed")).toBeInTheDocument()
    expect(screen.getByText("Voltage")).toBeInTheDocument()
    expect(screen.queryByText("Version")).not.toBeInTheDocument()
    expect(screen.queryByText("Protocol")).not.toBeInTheDocument()
  })

  it("renders description when provided", () => {
    render(
      <HardwareSpec
        name="UART"
        description="Serial communication for debug console output."
      />,
    )
    expect(screen.getByText("Serial communication for debug console output.")).toBeInTheDocument()
  })

  it("does not render description element when not provided", () => {
    const { container } = render(<HardwareSpec name="SPI" />)
    expect(container.querySelector("p")).not.toBeInTheDocument()
  })

  it("sets data-hardware-spec attribute", () => {
    const { container } = render(<HardwareSpec name="USB" />)
    expect(container.querySelector("[data-hardware-spec]")).toBeInTheDocument()
  })

  it("accepts className", () => {
    const { container } = render(<HardwareSpec name="USB" className="custom-class" />)
    expect(container.firstChild).toHaveClass("custom-class")
  })

  it("renders pins as a number (0 is valid)", () => {
    render(<HardwareSpec name="Test" pins={0} />)
    expect(screen.getByText("0")).toBeInTheDocument()
    expect(screen.getByText("Pins")).toBeInTheDocument()
  })
})
