import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../accordion";

function TestAccordion({
  type = "single" as "single" | "multiple",
  collapsible = true,
  defaultValue,
}: {
  type?: "single" | "multiple";
  collapsible?: boolean;
  defaultValue?: string | string[];
}) {
  return (
    <Accordion
      type={type}
      collapsible={collapsible}
      defaultValue={defaultValue}
    >
      <AccordionItem value="a">
        <AccordionTrigger>Section A</AccordionTrigger>
        <AccordionContent>Content A</AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Section B</AccordionTrigger>
        <AccordionContent>Content B</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

/**
 * With Collapse animation, content stays in the DOM but is hidden via
 * aria-hidden="true" on the Collapse wrapper when the item is closed.
 */
const isHiddenByCollapse = (el: HTMLElement) =>
  Boolean(el.closest('[aria-hidden="true"]'));

describe("Accordion", () => {
  it("renders all triggers", () => {
    render(<TestAccordion />);
    expect(screen.getByText("Section A")).toBeInTheDocument();
    expect(screen.getByText("Section B")).toBeInTheDocument();
  });

  it("hides content by default when no defaultValue", () => {
    render(<TestAccordion />);
    expect(isHiddenByCollapse(screen.getByText("Content A"))).toBe(true);
    expect(isHiddenByCollapse(screen.getByText("Content B"))).toBe(true);
  });

  it("shows content for item set via defaultValue, hides others", () => {
    render(<TestAccordion defaultValue="a" />);
    expect(isHiddenByCollapse(screen.getByText("Content A"))).toBe(false);
    expect(isHiddenByCollapse(screen.getByText("Content B"))).toBe(true);
  });

  it("opens content on trigger click", async () => {
    render(<TestAccordion />);
    await userEvent.click(screen.getByText("Section A"));
    expect(isHiddenByCollapse(screen.getByText("Content A"))).toBe(false);
  });

  it("closes content on second click when collapsible=true", async () => {
    render(<TestAccordion />);
    await userEvent.click(screen.getByText("Section A"));
    expect(isHiddenByCollapse(screen.getByText("Content A"))).toBe(false);
    await userEvent.click(screen.getByText("Section A"));
    expect(isHiddenByCollapse(screen.getByText("Content A"))).toBe(true);
  });

  it("does not close item when collapsible=false", async () => {
    render(<TestAccordion collapsible={false} defaultValue="a" />);
    await userEvent.click(screen.getByText("Section A"));
    expect(isHiddenByCollapse(screen.getByText("Content A"))).toBe(false);
  });

  it("single type closes previous item when another is opened", async () => {
    render(<TestAccordion type="single" />);
    await userEvent.click(screen.getByText("Section A"));
    await userEvent.click(screen.getByText("Section B"));
    expect(isHiddenByCollapse(screen.getByText("Content A"))).toBe(true);
    expect(isHiddenByCollapse(screen.getByText("Content B"))).toBe(false);
  });

  it("multiple type keeps all open items visible", async () => {
    render(<TestAccordion type="multiple" />);
    await userEvent.click(screen.getByText("Section A"));
    await userEvent.click(screen.getByText("Section B"));
    expect(isHiddenByCollapse(screen.getByText("Content A"))).toBe(false);
    expect(isHiddenByCollapse(screen.getByText("Content B"))).toBe(false);
  });

  it("multiple type closes individual item independently", async () => {
    render(<TestAccordion type="multiple" />);
    await userEvent.click(screen.getByText("Section A"));
    await userEvent.click(screen.getByText("Section B"));
    await userEvent.click(screen.getByText("Section A"));
    expect(isHiddenByCollapse(screen.getByText("Content A"))).toBe(true);
    expect(isHiddenByCollapse(screen.getByText("Content B"))).toBe(false);
  });

  it("trigger has aria-expanded=false when closed", () => {
    render(<TestAccordion />);
    expect(screen.getByText("Section A").closest("button")).toHaveAttribute(
      "aria-expanded",
      "false",
    );
  });

  it("trigger has aria-expanded=true when open", async () => {
    render(<TestAccordion />);
    const trigger = screen.getByText("Section A").closest("button")!;
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("throws when AccordionTrigger is used outside Accordion", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<AccordionTrigger>Orphan</AccordionTrigger>)).toThrow();
    spy.mockRestore();
  });

  it("throws when AccordionContent is used outside Accordion", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => render(<AccordionContent>Orphan</AccordionContent>)).toThrow();
    spy.mockRestore();
  });

  it("applies custom className to Accordion", () => {
    const { container } = render(<TestAccordion />);
    expect(container.firstChild).toHaveClass("divide-y");
  });
});
