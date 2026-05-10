import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  LinkCard,
} from "../card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card body</Card>);
    expect(screen.getByText("Card body")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(<Card className="custom-card">x</Card>);
    expect(container.firstChild).toHaveClass("custom-card");
  });

  it("renders as a div", () => {
    const { container } = render(<Card>x</Card>);
    expect(container.firstChild?.nodeName).toBe("DIV");
  });
});

describe("Card sub-components", () => {
  it("CardHeader renders children", () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText("Header content")).toBeInTheDocument();
  });

  it("CardTitle renders as h3", () => {
    render(<CardTitle>My Title</CardTitle>);
    expect(
      screen.getByRole("heading", { level: 3, name: "My Title" }),
    ).toBeInTheDocument();
  });

  it("CardDescription renders children", () => {
    render(<CardDescription>A description</CardDescription>);
    expect(screen.getByText("A description")).toBeInTheDocument();
  });

  it("CardContent renders children", () => {
    render(<CardContent>Body text</CardContent>);
    expect(screen.getByText("Body text")).toBeInTheDocument();
  });

  it("CardFooter renders children", () => {
    render(<CardFooter>Footer actions</CardFooter>);
    expect(screen.getByText("Footer actions")).toBeInTheDocument();
  });
});

describe("Card full composition", () => {
  it("renders all parts together", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Desc</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    );
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Desc")).toBeInTheDocument();
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });
});

describe("LinkCard", () => {
  it("renders as an anchor", () => {
    render(<LinkCard title="Go here" href="/somewhere" />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  it("renders the title", () => {
    render(<LinkCard title="Getting Started" href="/" />);
    expect(screen.getByText("Getting Started")).toBeInTheDocument();
  });

  it("renders description when provided", () => {
    render(<LinkCard title="Docs" description="Read the docs" href="/" />);
    expect(screen.getByText("Read the docs")).toBeInTheDocument();
  });

  it("does not render description element when omitted", () => {
    const { container } = render(<LinkCard title="No desc" href="/" />);
    // Only the title div should be present, no description div with mt-1
    const descEl = container.querySelector(".mt-1");
    expect(descEl).not.toBeInTheDocument();
  });

  it("sets href correctly", () => {
    render(<LinkCard title="Link" href="/guide" />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/guide");
  });

  it("renders children alongside title", () => {
    render(
      <LinkCard title="Card" href="/">
        <span>Extra content</span>
      </LinkCard>,
    );
    expect(screen.getByText("Extra content")).toBeInTheDocument();
  });
});
