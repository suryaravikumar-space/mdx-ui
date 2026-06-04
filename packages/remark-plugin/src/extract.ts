/**
 * extractContent
 *
 * Extracts the plain text/markdown content string from any LLM API response
 * object. Handles all major provider response shapes without requiring the
 * caller to know which provider was used.
 *
 * Supported providers:
 *   - OpenAI          choices[0].message.content
 *   - Groq            choices[0].message.content  (OpenAI-compatible)
 *   - Anthropic       content[].text              (filters type="text" blocks)
 *   - Google Gemini   candidates[0].content.parts[].text
 *   - Ollama          message.content
 *   - Cohere          text
 *   - Generic         content (string fallback)
 *
 * @example
 * ```ts
 * import { extractContent, preprocessMarkdown } from "@docsui-cli/remark-plugin"
 *
 * const raw = extractContent(apiResponse)   // works with any provider
 * const mdx = preprocessMarkdown(raw)        // fix numbered lists + code blocks
 * ```
 */

type AnyObject = Record<string, unknown>;

function isObject(val: unknown): val is AnyObject {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}

/**
 * Join an array of content blocks that have a `text` or `content` string field.
 * Only blocks with type="text" (or no type field) are included.
 */
function joinBlocks(blocks: unknown[]): string {
  return blocks
    .filter((b): b is AnyObject => isObject(b))
    .filter((b) => !b.type || b.type === "text")
    .map((b) => {
      if (typeof b.text === "string") return b.text;
      if (typeof b.content === "string") return b.content;
      return "";
    })
    .filter(Boolean)
    .join("\n\n");
}

/**
 * Extract the markdown/text content from any LLM API response.
 *
 * Returns an empty string if the content cannot be determined.
 */
export function extractContent(response: unknown): string {
  // Already a string
  if (typeof response === "string") return response;

  if (!isObject(response)) return "";

  // ── OpenAI / Groq / any OpenAI-compatible API ────────────────────────────
  // { choices: [{ message: { content: string | ContentBlock[] } }] }
  if (Array.isArray(response.choices) && response.choices.length > 0) {
    const choice = response.choices[0];
    if (isObject(choice)) {
      const message = choice.message;
      if (isObject(message)) {
        if (typeof message.content === "string") return message.content;
        if (Array.isArray(message.content)) return joinBlocks(message.content);
      }
      // Some streaming formats put delta instead of message
      const delta = choice.delta;
      if (isObject(delta) && typeof delta.content === "string")
        return delta.content;
    }
  }

  // ── Anthropic Claude ─────────────────────────────────────────────────────
  // { content: [{ type: "text", text: string }, { type: "tool_use", ... }] }
  if (Array.isArray(response.content)) {
    const text = joinBlocks(response.content);
    if (text) return text;
  }

  // ── Google Gemini ────────────────────────────────────────────────────────
  // { candidates: [{ content: { parts: [{ text: string }] } }] }
  if (Array.isArray(response.candidates) && response.candidates.length > 0) {
    const candidate = response.candidates[0];
    if (isObject(candidate)) {
      const content = candidate.content;
      if (isObject(content) && Array.isArray(content.parts)) {
        const text = (content.parts as unknown[])
          .filter((p): p is AnyObject => isObject(p))
          .map((p) => (typeof p.text === "string" ? p.text : ""))
          .filter(Boolean)
          .join("\n\n");
        if (text) return text;
      }
    }
  }

  // ── Ollama ───────────────────────────────────────────────────────────────
  // { message: { content: string } }
  if (isObject(response.message)) {
    const msg = response.message as AnyObject;
    if (typeof msg.content === "string") return msg.content;
  }

  // ── Cohere ───────────────────────────────────────────────────────────────
  // { text: string }
  if (typeof response.text === "string") return response.text;

  // ── Generic content string ───────────────────────────────────────────────
  if (typeof response.content === "string") return response.content;

  return "";
}
