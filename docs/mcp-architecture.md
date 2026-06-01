# MCP Architecture in mdx-ui

## How MCP Works in mdx-ui

### 1. The Server (`mdx-ui mcp` command)

When you run `mdx-ui mcp`, it starts an MCP server over **stdio** using `@modelcontextprotocol/sdk`. Any MCP-compatible client (Claude Desktop, Cursor, etc.) connects to it.

The server registers three types of things:

| Type | Examples |
|------|---------|
| **Resources** | `registry://components`, `registry://standard`, `registry://symbol-map` |
| **Prompts** | `generate_mdx`, `review_mdx` |
| **Tools** | `list_components`, `get_component`, `validate_mdx`, `convert_latex`, `parse_solution`, `search_symbols` |

---

### 2. The Output Standard — The Bridge

The key is `OUTPUT_STANDARD` in `packages/cli/src/commands/mcp.ts`. It's a system prompt injected into LLMs that says:

> "Write MDX. Use `<Callout>`, `<Steps>`, `<Frac>`, `<Integral>` — never `$...$` LaTeX."

This is returned by:
- The `get_output_standard` tool
- The `generate_mdx` prompt (prepended automatically)
- The `review_mdx` prompt

So the LLM is **taught the component vocabulary** before generating anything.

---

### 3. Component Registry

The registry (`registry/registry.json`) has metadata for every component:

```json
{
  "name": "callout",
  "description": "...",
  "whenToUse": "...",
  "example": "<Callout variant=\"info\">...</Callout>"
}
```

`fetchRegistry()` loads it — from local file in dev, from GitHub in prod (5-min cache).

Tools like `get_component("callout")` and `search_components("math")` let the LLM self-serve the right component before writing MDX.

---

### 4. Validation Loop

`validate_mdx` runs static checks on LLM output against `ALLOWED_COMPONENTS` — a hardcoded Set of all 250+ valid names. Checks:
- No `$...$` or `$$...$$` dollar math
- No raw HTML like `<div>`, `<span>`
- No H1 headings
- No invented JSX names not in the allowed set

The `generate_mdx` prompt mandates the LLM **call `validate_mdx` on its own output** before returning, creating a self-correction loop.

---

### 5. How MDX → React Component (rendering side)

Once the LLM writes `<Callout variant="info">Note</Callout>`, rendering happens via:

**In Next.js apps** — `mdx-components.tsx` (installed by `mdx-ui add`):
```ts
import { Callout } from "@/components/mdx/callout"
export const components = { Callout, Frac, ... }
```
Next.js passes this map to the MDX renderer which resolves `<Callout>` → the React component.

**In VSCode extension** — `webview-bundle.js` (dist artifact):
```ts
export const mdxComponents = { Callout, Frac, Integral, ... }
```
The webview imports this bundle and passes `mdxComponents` to its MDX renderer.

---

### The Full Data Flow

```
User asks LLM a question
    │
    ▼
LLM calls get_output_standard → learns component vocabulary
LLM calls get_component("steps") → gets example MDX
    │
    ▼
LLM generates MDX:
  <Steps>
    ### Step 1: Install
    Run `npm install @ravikumarsurya/mdx-ui`
  </Steps>
    │
    ▼
LLM calls validate_mdx → ✅ passes (Steps is in ALLOWED_COMPONENTS)
    │
    ▼
MDX saved/rendered → Next.js / VSCode webview resolves
  <Steps> → import { Steps } from "./steps"  (React component)
    │
    ▼
User sees styled, interactive UI
```

The MCP server is essentially a **guardrailed code generator** — it teaches LLMs what components exist, validates their output, and auto-fixes math syntax. The actual rendering is standard MDX with a component map.
