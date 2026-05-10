import { describe, it, expect } from "vitest"
import { extractContent } from "../extract"

describe("extractContent", () => {
  it("returns a plain string unchanged", () => {
    expect(extractContent("hello world")).toBe("hello world")
  })

  it("returns empty string for null", () => {
    expect(extractContent(null)).toBe("")
  })

  it("returns empty string for undefined", () => {
    expect(extractContent(undefined)).toBe("")
  })

  it("returns empty string for a number", () => {
    expect(extractContent(42)).toBe("")
  })

  it("returns empty string for an empty object", () => {
    expect(extractContent({})).toBe("")
  })

  describe("OpenAI / Groq format", () => {
    it("extracts choices[0].message.content string", () => {
      const response = {
        choices: [{ message: { content: "Hello from OpenAI" } }],
      }
      expect(extractContent(response)).toBe("Hello from OpenAI")
    })

    it("extracts content from streaming delta format", () => {
      const response = {
        choices: [{ delta: { content: "streamed chunk" } }],
      }
      expect(extractContent(response)).toBe("streamed chunk")
    })

    it("joins multiple content blocks in message.content array", () => {
      const response = {
        choices: [
          {
            message: {
              content: [
                { type: "text", text: "Part one" },
                { type: "text", text: "Part two" },
              ],
            },
          },
        ],
      }
      expect(extractContent(response)).toBe("Part one\n\nPart two")
    })

    it("filters out non-text blocks in message.content array", () => {
      const response = {
        choices: [
          {
            message: {
              content: [
                { type: "text", text: "Text part" },
                { type: "tool_use", id: "call_123", name: "search" },
              ],
            },
          },
        ],
      }
      expect(extractContent(response)).toBe("Text part")
    })
  })

  describe("Anthropic Claude format", () => {
    it("extracts text from content array", () => {
      const response = {
        content: [{ type: "text", text: "Hello from Claude" }],
      }
      expect(extractContent(response)).toBe("Hello from Claude")
    })

    it("filters out tool_use blocks", () => {
      const response = {
        content: [
          { type: "text", text: "Answer here" },
          { type: "tool_use", id: "toolu_01", name: "calculator", input: {} },
        ],
      }
      expect(extractContent(response)).toBe("Answer here")
    })

    it("joins multiple text blocks", () => {
      const response = {
        content: [
          { type: "text", text: "Block A" },
          { type: "text", text: "Block B" },
        ],
      }
      expect(extractContent(response)).toBe("Block A\n\nBlock B")
    })
  })

  describe("Google Gemini format", () => {
    it("extracts candidates[0].content.parts[].text", () => {
      const response = {
        candidates: [
          {
            content: {
              parts: [{ text: "Hello from Gemini" }],
            },
          },
        ],
      }
      expect(extractContent(response)).toBe("Hello from Gemini")
    })

    it("joins multiple parts", () => {
      const response = {
        candidates: [
          {
            content: {
              parts: [{ text: "Part 1" }, { text: "Part 2" }],
            },
          },
        ],
      }
      expect(extractContent(response)).toBe("Part 1\n\nPart 2")
    })
  })

  describe("Ollama format", () => {
    it("extracts message.content", () => {
      const response = {
        message: { content: "Hello from Ollama" },
      }
      expect(extractContent(response)).toBe("Hello from Ollama")
    })
  })

  describe("Cohere format", () => {
    it("extracts text field", () => {
      const response = { text: "Hello from Cohere" }
      expect(extractContent(response)).toBe("Hello from Cohere")
    })
  })

  describe("Generic content string fallback", () => {
    it("extracts content string field", () => {
      const response = { content: "Generic response" }
      expect(extractContent(response)).toBe("Generic response")
    })
  })
})
