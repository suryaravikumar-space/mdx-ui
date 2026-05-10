import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Kbd } from "../kbd";

describe("Kbd", () => {
  it("renders children", () => {
    render(<Kbd>Ctrl</Kbd>);
    expect(screen.getByText("Ctrl")).toBeInTheDocument();
  });

  it("renders as a kbd element", () => {
    const { container } = render(<Kbd>Enter</Kbd>);
    expect(container.firstChild?.nodeName).toBe("KBD");
  });

  it("applies custom className", () => {
    const { container } = render(<Kbd className="my-kbd">K</Kbd>);
    expect(container.firstChild).toHaveClass("my-kbd");
  });

  it("forwards additional HTML attributes", () => {
    render(<Kbd data-testid="key-badge">Shift</Kbd>);
    expect(screen.getByTestId("key-badge")).toBeInTheDocument();
  });

  it("renders key combinations as separate Kbd elements", () => {
    render(
      <span>
        <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
      </span>,
    );
    expect(screen.getByText("Ctrl")).toBeInTheDocument();
    expect(screen.getByText("K")).toBeInTheDocument();
  });
});
