import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Definition } from "../definition";

describe("Definition", () => {
  it("renders the term label", () => {
    render(
      <Definition term="Invariant">A condition that always holds.</Definition>,
    );
    expect(screen.getByText("Invariant")).toBeInTheDocument();
  });

  it("renders the definition body", () => {
    render(
      <Definition term="Invariant">A condition that always holds.</Definition>,
    );
    expect(
      screen.getByText("A condition that always holds."),
    ).toBeInTheDocument();
  });

  it("renders children as the definition body", () => {
    render(
      <Definition term="BST">
        A binary tree where left children are smaller and right children are
        larger.
      </Definition>,
    );
    expect(screen.getByText(/left children are smaller/)).toBeInTheDocument();
  });

  it("has data-definition attribute on root", () => {
    const { container } = render(<Definition term="Term">body</Definition>);
    expect(container.firstChild).toHaveAttribute("data-definition");
  });

  it("applies custom className", () => {
    const { container } = render(
      <Definition term="Term" className="custom-class">
        body
      </Definition>,
    );
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("forwards ref to root div", () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <Definition term="Term" ref={ref}>
        body
      </Definition>,
    );
    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("DIV");
  });

  it("passes through additional HTML attributes", () => {
    const { container } = render(
      <Definition term="Term" data-testid="def-block">
        body
      </Definition>,
    );
    expect(container.firstChild).toHaveAttribute("data-testid", "def-block");
  });
});
