import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { CodeBlock } from "../code-block";

const mockWriteText = jest.fn().mockResolvedValue(undefined);
Object.defineProperty(navigator, "clipboard", {
  value: { writeText: mockWriteText },
  writable: true,
});

describe("CodeBlock", () => {
  beforeEach(() => mockWriteText.mockClear());

  it("renders code content", () => {
    render(<CodeBlock>const x = 1</CodeBlock>);
    expect(screen.getByText("const x = 1")).toBeInTheDocument();
  });

  it("shows title when provided via title prop", () => {
    render(<CodeBlock title="example.ts">code</CodeBlock>);
    expect(screen.getByText("example.ts")).toBeInTheDocument();
  });

  it("shows title from data-title prop", () => {
    render(<CodeBlock data-title="main.tsx">code</CodeBlock>);
    expect(screen.getByText("main.tsx")).toBeInTheDocument();
  });

  it("shows language from data-language when no title is set", () => {
    render(<CodeBlock data-language="typescript">code</CodeBlock>);
    expect(screen.getByText("typescript")).toBeInTheDocument();
  });

  it("shows no label when neither title nor language is provided", () => {
    const { container } = render(<CodeBlock>some content</CodeBlock>);
    // the inner label container should be empty
    const labelDiv = container.querySelector(".flex.items-center.gap-2");
    expect(labelDiv).toBeEmptyDOMElement();
  });

  it("title prop takes precedence over data-language", () => {
    render(
      <CodeBlock title="file.ts" data-language="typescript">
        code
      </CodeBlock>,
    );
    expect(screen.getByText("file.ts")).toBeInTheDocument();
    expect(screen.queryByText("typescript")).not.toBeInTheDocument();
  });

  it("shows Copy button", () => {
    render(<CodeBlock>const x = 1</CodeBlock>);
    expect(screen.getByRole("button", { name: /copy/i })).toBeInTheDocument();
  });

  it("invokes clipboard.writeText on copy click", async () => {
    render(<CodeBlock>const x = 1</CodeBlock>);
    await userEvent.click(screen.getByRole("button", { name: /copy code/i }));
    expect(mockWriteText).toHaveBeenCalledTimes(1);
  });

  it("shows copied state after clicking copy", async () => {
    render(<CodeBlock>const x = 1</CodeBlock>);
    await userEvent.click(screen.getByRole("button", { name: /copy code/i }));
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: /copied/i }),
      ).toBeInTheDocument(),
    );
  });

  it("applies custom className to pre element", () => {
    const { container } = render(
      <CodeBlock className="my-class">code</CodeBlock>,
    );
    expect(container.querySelector("pre")).toHaveClass("my-class");
  });
});
