import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Badge } from "../badge";

describe("Badge", () => {
  it("renders children", () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Badge className="extra">Label</Badge>);
    expect(container.firstChild).toHaveClass("extra");
  });

  it.each([
    "default",
    "secondary",
    "destructive",
    "outline",
    "success",
    "warning",
    "info",
  ] as const)("renders variant=%s without crashing", (variant) => {
    render(<Badge variant={variant}>badge</Badge>);
    expect(screen.getByText("badge")).toBeInTheDocument();
  });

  it("renders as a div element", () => {
    const { container } = render(<Badge>Tag</Badge>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });
});
