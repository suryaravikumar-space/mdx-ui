import { describe, it, expect } from "vitest";
import { preprocessMarkdown } from "../preprocess";

describe("preprocessMarkdown", () => {
  it("passes through plain text unchanged", () => {
    const input = "Hello world";
    expect(preprocessMarkdown(input)).toBe("Hello world");
  });

  it("passes through a single numbered item unchanged (needs 2+ steps)", () => {
    const input = "1. Only one step";
    expect(preprocessMarkdown(input)).toBe("1. Only one step");
  });

  it("converts a simple 2-item numbered list to Steps/Step", () => {
    const input = "1. First step\n2. Second step";
    const output = preprocessMarkdown(input);
    expect(output).toContain("<Steps>");
    expect(output).toContain("<Step>");
    expect(output).toContain("First step");
    expect(output).toContain("Second step");
    expect(output).toContain("</Steps>");
  });

  it("converts a 3-item numbered list", () => {
    const input = "1. Install\n2. Configure\n3. Deploy";
    const output = preprocessMarkdown(input);
    expect(output).toContain("<Steps>");
    expect(output.match(/<Step>/g)?.length).toBe(3);
    expect(output.match(/<\/Step>/g)?.length).toBe(3);
  });

  it("handles numbered list with period separator", () => {
    const input = "1. Step one\n2. Step two";
    expect(preprocessMarkdown(input)).toContain("<Steps>");
  });

  it("handles numbered list with parenthesis separator", () => {
    const input = "1) First\n2) Second";
    const output = preprocessMarkdown(input);
    expect(output).toContain("<Steps>");
    expect(output).toContain("First");
    expect(output).toContain("Second");
  });

  it("preserves non-list content before the steps block", () => {
    const input = "# Title\n\n1. Step A\n2. Step B";
    const output = preprocessMarkdown(input);
    expect(output).toContain("# Title");
    expect(output).toContain("<Steps>");
  });

  it("preserves non-list content after the steps block", () => {
    const input = "1. Step A\n2. Step B\n\nSome paragraph after";
    const output = preprocessMarkdown(input);
    expect(output).toContain("<Steps>");
    expect(output).toContain("Some paragraph after");
  });

  it("includes code blocks between list items in the preceding step", () => {
    const input = [
      "1. Install the package",
      "",
      "```bash",
      "npm install foo",
      "```",
      "",
      "2. Import it",
    ].join("\n");
    const output = preprocessMarkdown(input);
    expect(output).toContain("<Steps>");
    expect(output).toContain("npm install foo");
  });

  it("converts a numbered list that follows a standalone code block", () => {
    // The preprocessor processes line-by-line; once past the code block it
    // detects the numbered list and converts it normally.
    const input = "```bash\necho hi\n```\n1. Step one\n2. Step two";
    const output = preprocessMarkdown(input);
    expect(output).toContain("```bash"); // code block preserved
    expect(output).toContain("<Steps>"); // numbered list converted
  });

  it("handles multiple disjoint steps blocks in the same input", () => {
    const input = [
      "1. First block A",
      "2. First block B",
      "",
      "Middle paragraph",
      "",
      "1. Second block A",
      "2. Second block B",
    ].join("\n");
    const output = preprocessMarkdown(input);
    expect(output.match(/<Steps>/g)?.length).toBe(2);
  });

  it("passes through an empty string", () => {
    expect(preprocessMarkdown("")).toBe("");
  });

  it("returns the same string when there are no numbered lists", () => {
    const input = "- bullet A\n- bullet B\n\nSome text";
    expect(preprocessMarkdown(input)).toBe(input);
  });
});
