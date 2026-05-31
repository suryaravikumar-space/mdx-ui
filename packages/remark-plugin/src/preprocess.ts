/**
 * preprocessMarkdown
 *
 * A raw-string pre-processor that runs BEFORE the MDX parser.
 *
 * Problem: AI chatbots (GPT, Claude, Gemini, etc.) generate numbered lists
 * where code fences are not correctly indented under their list items.
 * CommonMark breaks the list at the first unindented code fence, causing
 * everything from item 2 onward to render as raw monospace text.
 *
 * Solution: Walk the raw markdown string line-by-line with a state machine.
 * When a sequence of numbered list items is found (even broken by unindented
 * code blocks), collect each item + its content, then emit the whole sequence
 * as <Steps><Step>...</Step></Steps> MDX — which renders correctly every time.
 *
 * Usage:
 *   import { preprocessMarkdown } from "@ravikumarsurya/remark-mdx-ui"
 *
 *   const processed = preprocessMarkdown(aiGeneratedContent)
 *   // pass `processed` to MDXRemote, compileMDX, etc.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

interface StepData {
  /** Content lines for this step (list-item prefix already stripped) */
  lines: string[];
}

interface StepsBlock {
  steps: StepData[];
  /** Line index in the original array where this block ends (exclusive) */
  end: number;
}

// ─── Regex ───────────────────────────────────────────────────────────────────

/** Matches lines that start a numbered list item: "1. " or "1) " */
const NUMBERED_ITEM_RE = /^(\d+)[.)]\s+(.*)$/;

/** Matches the opening of a code fence at any indentation */
const FENCE_OPEN_RE = /^[ \t]*(`{3,}|~{3,})/;

// ─── Core ─────────────────────────────────────────────────────────────────────

/**
 * Collect a contiguous "steps block" starting at `start`.
 *
 * A block is a sequence where:
 *   - Numbered items (`N. ` / `N) `) mark step boundaries
 *   - Code blocks between items (at any indentation) belong to the preceding step
 *   - A blank line followed by another numbered item keeps the block open
 *   - A blank line followed by non-numbered, non-code content ends the block
 */
function collectStepsBlock(lines: string[], start: number): StepsBlock | null {
  // First line must be a numbered item
  const firstMatch = NUMBERED_ITEM_RE.exec(lines[start]);
  if (!firstMatch) return null;

  const steps: StepData[] = [];
  let currentLines: string[] = [];
  let i = start;
  let inCodeBlock = false;
  let openFence = "";

  function flushStep() {
    // Trim trailing blank lines from the step body
    while (
      currentLines.length &&
      currentLines[currentLines.length - 1].trim() === ""
    ) {
      currentLines.pop();
    }
    steps.push({ lines: [...currentLines] });
    currentLines = [];
  }

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // ── Inside a code block ──────────────────────────────────────────────────
    if (inCodeBlock) {
      currentLines.push(line);
      // Closing fence: starts with the same fence chars (3+ of same type)
      if (
        trimmed.startsWith(openFence[0]) &&
        trimmed.replace(/\s/g, "").startsWith(openFence)
      ) {
        inCodeBlock = false;
        openFence = "";
      }
      i++;
      continue;
    }

    // ── Opening a code fence ─────────────────────────────────────────────────
    const fenceMatch = FENCE_OPEN_RE.exec(line);
    if (fenceMatch) {
      // Only treat as step content if we already started a step
      if (steps.length > 0 || currentLines.length > 0) {
        inCodeBlock = true;
        // Normalise fence identifier: first 3 chars of the fence sequence
        openFence = fenceMatch[1].slice(0, 3);
        currentLines.push(line);
        i++;
        continue;
      }
      // Code block before any numbered item — not a steps block
      break;
    }

    // ── New numbered item ────────────────────────────────────────────────────
    const itemMatch = NUMBERED_ITEM_RE.exec(line);
    if (itemMatch) {
      if (currentLines.length > 0 || steps.length > 0) {
        flushStep();
      }
      // The rest of the "1. " line becomes the first content of the new step
      const rest = itemMatch[2].trim();
      if (rest) currentLines.push(rest);
      i++;
      continue;
    }

    // ── Blank line ───────────────────────────────────────────────────────────
    if (trimmed === "") {
      // Peek ahead past consecutive blank lines
      let j = i + 1;
      while (j < lines.length && lines[j].trim() === "") j++;

      const nextLine = j < lines.length ? lines[j] : "";

      if (NUMBERED_ITEM_RE.test(nextLine)) {
        // Another step follows — skip blanks, don't add to step content
        i = j;
        continue;
      }

      if (
        FENCE_OPEN_RE.test(nextLine) &&
        (steps.length > 0 || currentLines.length > 0)
      ) {
        // A code block follows immediately — it belongs to the current step
        // Preserve one blank line for MDX paragraph separation, then continue
        currentLines.push("");
        i = j;
        continue;
      }

      // Nothing list-related follows — end of steps block
      break;
    }

    // ── Regular content line (part of current step) ──────────────────────────
    currentLines.push(line);
    i++;
  }

  // Flush whatever is in the buffer
  if (currentLines.length > 0) flushStep();

  // Only treat it as a steps block if we have at least 2 steps
  if (steps.length < 2) return null;

  return { steps, end: i };
}

/**
 * Emit a collected steps block as MDX.
 *
 * Each <Step> wraps its content in blank lines so MDX treats the body as
 * block-level markdown (paragraphs, headings, code blocks, etc.).
 */
function emitSteps(block: StepsBlock): string {
  const parts: string[] = ["<Steps>"];
  for (const step of block.steps) {
    parts.push("<Step>");
    parts.push(""); // blank line → MDX parses children as blocks
    parts.push(...step.lines);
    parts.push(""); // blank line
    parts.push("</Step>");
  }
  parts.push("</Steps>");
  return parts.join("\n");
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Pre-process a raw markdown/MDX string before passing it to MDXRemote,
 * compileMDX, or any other MDX pipeline.
 *
 * Converts broken numbered-list + code-block sequences produced by AI
 * chatbots into properly structured `<Steps><Step>` MDX components.
 *
 * @example
 * ```ts
 * import { preprocessMarkdown } from "@ravikumarsurya/remark-mdx-ui"
 *
 * // AI chatbot output — numbered list + code blocks (breaks standard parser)
 * const raw = aiResponse.content
 *
 * // Fix it before compilation
 * const mdx = preprocessMarkdown(raw)
 *
 * // Now safe to render
 * return <MDXRemote source={mdx} components={mdxComponents} />
 * ```
 */
export function preprocessMarkdown(content: string): string {
  const lines = content.split("\n");
  const out: string[] = [];
  let i = 0;

  while (i < lines.length) {
    const block = collectStepsBlock(lines, i);
    if (block) {
      out.push(emitSteps(block));
      i = block.end;
    } else {
      out.push(lines[i]);
      i++;
    }
  }

  return out.join("\n");
}
