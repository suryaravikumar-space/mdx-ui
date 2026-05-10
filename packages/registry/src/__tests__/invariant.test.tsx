import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Invariant } from "../invariant";

describe("Invariant", () => {
  it("renders the invariant statement", () => {
    render(
      <Invariant>
        An AVL tree remains balanced after every operation.
      </Invariant>,
    );
    expect(
      screen.getByText("An AVL tree remains balanced after every operation."),
    ).toBeInTheDocument();
  });

  it("does not render complexity badge when not provided", () => {
    const { container } = render(<Invariant>statement</Invariant>);
    expect(container.querySelector(".font-mono")).not.toBeInTheDocument();
  });

  it("renders complexity badge when provided", () => {
    render(<Invariant complexity="O(log n)">statement</Invariant>);
    expect(screen.getByText("O(log n)")).toBeInTheDocument();
  });

  it("has data-invariant attribute on root", () => {
    const { container } = render(<Invariant>statement</Invariant>);
    expect(container.firstChild).toHaveAttribute("data-invariant");
  });

  it("renders shield icon (aria-hidden)", () => {
    const { container } = render(<Invariant>statement</Invariant>);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Invariant className="custom">statement</Invariant>,
    );
    expect(container.firstChild).toHaveClass("custom");
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Invariant ref={ref}>statement</Invariant>);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("passes through HTML attributes", () => {
    const { container } = render(
      <Invariant data-testid="inv-block">statement</Invariant>,
    );
    expect(container.firstChild).toHaveAttribute("data-testid", "inv-block");
  });
});
