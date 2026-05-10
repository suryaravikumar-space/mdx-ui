import * as React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DataTypeTable } from "../data-type-table";

const rows = [
  {
    type: "INT8",
    bits: 8,
    range: "-128 to 127",
    quantized: true,
    description: "Inference integer",
  },
  {
    type: "FP16",
    bits: 16,
    range: "±65504",
    quantized: false,
    description: "Half-precision float",
  },
  { type: "FP32", bits: 32, range: "±3.4e38", quantized: false },
];

describe("DataTypeTable", () => {
  it("renders type names", () => {
    render(<DataTypeTable rows={rows} />);
    expect(screen.getByText("INT8")).toBeInTheDocument();
    expect(screen.getByText("FP16")).toBeInTheDocument();
    expect(screen.getByText("FP32")).toBeInTheDocument();
  });

  it("renders column headers when data present", () => {
    render(<DataTypeTable rows={rows} />);
    expect(screen.getByText("Bits")).toBeInTheDocument();
    expect(screen.getByText("Range")).toBeInTheDocument();
    expect(screen.getByText("Quantized")).toBeInTheDocument();
    expect(screen.getByText("Notes")).toBeInTheDocument();
  });

  it("renders check indicator for quantized=true", () => {
    render(<DataTypeTable rows={rows} />);
    const check = screen.getByLabelText("yes");
    expect(check).toBeInTheDocument();
  });

  it("renders cross indicator for quantized=false", () => {
    render(<DataTypeTable rows={rows} />);
    const crosses = screen.getAllByLabelText("no");
    expect(crosses.length).toBeGreaterThan(0);
  });

  it("renders em dash for missing optional fields", () => {
    const sparseRows = [
      { type: "INT4", bits: 4 },
      { type: "INT8", bits: 8, range: "-128 to 127" },
    ];
    render(<DataTypeTable rows={sparseRows} />);
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("renders caption when provided", () => {
    render(<DataTypeTable rows={rows} caption="QAIRT supported types" />);
    expect(screen.getByText("QAIRT supported types")).toBeInTheDocument();
  });

  it("does not render caption element when not provided", () => {
    const { container } = render(<DataTypeTable rows={rows} />);
    expect(container.querySelector("p")).not.toBeInTheDocument();
  });

  it("omits Shape column when no row has shape", () => {
    render(<DataTypeTable rows={rows} />);
    expect(screen.queryByText("Shape")).not.toBeInTheDocument();
  });

  it("renders Shape column when at least one row has shape", () => {
    const withShape = [...rows, { type: "Tensor", shape: "scalar | vector" }];
    render(<DataTypeTable rows={withShape} />);
    expect(screen.getByText("Shape")).toBeInTheDocument();
    expect(screen.getByText("scalar | vector")).toBeInTheDocument();
  });

  it("sets data-data-type-table attribute", () => {
    const { container } = render(<DataTypeTable rows={rows} />);
    expect(
      container.querySelector("[data-data-type-table]"),
    ).toBeInTheDocument();
  });
});
