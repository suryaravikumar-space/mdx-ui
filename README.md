# mdx-ui

[![npm](https://img.shields.io/npm/v/@ravikumarsurya/mdx-ui)](https://www.npmjs.com/package/@ravikumarsurya/mdx-ui)
[![Socket](https://socket.dev/api/badge/npm/package/@ravikumarsurya/mdx-ui)](https://socket.dev/npm/package/@ravikumarsurya/mdx-ui)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/suryaravikumar-space/mdx-ui/badge)](https://scorecard.dev/viewer/?uri=github.com/suryaravikumar-space/mdx-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Copy-paste MDX components for documentation sites. Built with React, TypeScript, and Tailwind CSS. Follows the [shadcn/ui](https://ui.shadcn.com) philosophy — components live in your project, not in `node_modules`.

## Quick Start

```bash
# 1. Initialize your project
npx @ravikumarsurya/mdx-ui init

# 2. Add components
npx @ravikumarsurya/mdx-ui add callout tabs code-block

# 3. Or pick from an interactive menu
npx @ravikumarsurya/mdx-ui
```

## CLI Commands

| Command                  | Description                                                         |
| ------------------------ | ------------------------------------------------------------------- |
| `init`                   | Set up `mdx-ui.json`, inject CSS variables, patch `tailwind.config` |
| `add [components...]`    | Add components (interactive picker if no args)                      |
| `update [components...]` | Re-fetch and overwrite with latest versions                         |
| `list`                   | Show all available components                                       |
| `list --installed`       | Show only installed components                                      |

## Components (51)

### Layout & Typography

| Component         | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `heading`         | H1–H6 with anchor links on hover                         |
| `headings`        | Markdown heading overrides (h1–h6 → styled components)   |
| `paragraph`       | Paragraph with Lead, Intro, Large, Small, Muted variants |
| `emphasis`        | Bold (`<strong>`) and italic (`<em>`)                    |
| `list`            | Ordered and unordered lists                              |
| `blockquote`      | Styled blockquote with optional citation                 |
| `horizontal-rule` | Divider with default, dashed, dotted, gradient styles    |
| `image`           | Image with optional caption and glossary overlay         |
| `link`            | Styled links with external URL indicator                 |
| `highlight`       | Inline text highlight marker (yellow, blue, green)       |

### Interactive

| Component   | Description                                              |
| ----------- | -------------------------------------------------------- |
| `accordion` | Collapsible sections, single or multiple open            |
| `tabs`      | Tabbed content with keyboard navigation (Arrow/Home/End) |
| `steps`     | Numbered step-by-step guide                              |
| `tree`      | Interactive file/folder tree with expand/collapse        |
| `file-tree` | Simple string-based file/folder tree                     |
| `spoiler`   | Collapsible spoiler using native `<details>`/`<summary>` |
| `reveal`    | Animated click-to-reveal expandable section              |

### Feedback & Callouts

| Component       | Description                                                                 |
| --------------- | --------------------------------------------------------------------------- |
| `callout`       | Callout boxes — note, warning, tip, error variants                          |
| `alert`         | Semantic `role="alert"` boxes — info, warning, destructive, success         |
| `security-note` | Security warnings with severity levels (critical, warning, info)            |
| `card`          | Card + CardHeader/Title/Description/Content/Footer + LinkCard for nav grids |
| `badge`         | Status and label badges with multiple variants                              |
| `kbd`           | Keyboard shortcut display (`Ctrl+K`, `⌘+S`)                                 |

### Code & Diagrams

| Component     | Description                                                                                  |
| ------------- | -------------------------------------------------------------------------------------------- |
| `code-block`  | Syntax-highlighted code blocks via `rehype-pretty-code` + Shiki                              |
| `code-group`  | Tabbed code blocks — npm/pnpm/yarn or multi-language examples                                |
| `inline-code` | Styled inline code snippets                                                                  |
| `diff-block`  | Git-style diff viewer with added/removed line highlighting                                   |
| `terminal`    | Terminal/shell output block with `$` prompt styling                                          |
| `preview`     | Live component preview with tabbed source code view                                          |
| `mermaid`     | Mermaid diagrams with BST/BFS/DFS variants                                                   |
| `ds`          | Full data structures visualization suite (arrays, graphs, trees, linked lists, heaps, tries) |
| `ds-tree`     | Visual tree diagrams (BST, AVL, heap, n-ary, min/max heap)                                   |

### Math

| Component         | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| `math`            | LaTeX math rendering via KaTeX (block and inline)                    |
| `math-primitives` | Semantic math atoms: Frac, Pow, Sqrt, Abs, Deg, Greek letters        |
| `math-equation`   | Equation display blocks with relation symbols (≈, ≠, ≤, ≥, →, ⟹, ⟺)  |
| `math-solution`   | Step-by-step solution blocks: Solution, SolutionStep, SolutionAnswer |

### Reference & Documentation

| Component          | Description                                                          |
| ------------------ | -------------------------------------------------------------------- |
| `table`            | Styled markdown table with full semantic elements                    |
| `data-table`       | Searchable and sortable data table                                   |
| `changelog`        | Versioned changelog with Added/Fixed/Changed/Removed/Security badges |
| `definition`       | Formal definition block with term label                              |
| `glossary`         | Inline glossary terms with hover-to-reveal definitions               |
| `annotation`       | Inline text with click-to-reveal explanation popover                 |
| `invariant`        | Algorithm invariant callout with optional complexity badge           |
| `complexity-table` | Algorithm time/space complexity table with Big-O notation            |
| `data-type-table`  | ML/hardware data type reference (INT8, FP16, BF16, etc.)             |

### Domain Specific

| Component             | Description                                          |
| --------------------- | ---------------------------------------------------- |
| `certification-badge` | Compliance certification badges (ISO, SOC 2, GDPR)   |
| `hardware-spec`       | Hardware interface specification comparison table    |
| `privacy-table`       | GDPR/privacy policy data collection table            |
| `register-map`        | Hardware/firmware register address map table         |
| `json-ld`             | JSON-LD structured data script tag for SEO           |
| `video`               | Responsive video embed (YouTube/native) with caption |

### Utilities

| Component        | Description                            |
| ---------------- | -------------------------------------- |
| `mdx-components` | Auto-wired MDX component mapper        |
| `utils`          | `cn()` utility (clsx + tailwind-merge) |

## How It Works

`init` creates `mdx-ui.json`, injects shadcn-compatible CSS variables into your `globals.css`, and patches your `tailwind.config` if needed.

`add` fetches component JSON from the registry on GitHub, writes the `.tsx` files into your `componentsDir`, installs npm dependencies, and patches your `mdx-components.tsx` with static imports.

Components use only CSS variable-based Tailwind classes (`bg-muted`, `border-border`, `text-foreground`) so they respect your theme automatically.

## Syntax Highlighting

Install `rehype-pretty-code` and add it to your MDX pipeline:

```bash
npm install rehype-pretty-code shiki
```

```ts
// next.config.ts
import rehypePrettyCode from "rehype-pretty-code";

const withMDX = createMDX({
  options: {
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: { light: "github-light-default", dark: "github-dark-default" },
          defaultColor: false,
        },
      ],
    ],
  },
});
```

Map `pre` to `CodeBlock` in your MDX components:

```tsx
import { CodeBlock } from "@/components/mdx/code-block";
const components = { pre: CodeBlock };
```

Shiki CSS variables are automatically injected by `mdx-ui init`.

## Supported Frameworks

`init` auto-detects and handles:

- **Next.js** (App Router, Pages Router)
- **Vite React** — creates `src/index.css` and injects the import into `main.tsx`
- **Astro**
- **Any other** — writes CSS to the first globals file found

Supports both **Tailwind v3** (`@layer base`) and **Tailwind v4** (`@theme inline`).

## Project Structure

```
mdx-ui/
├── apps/
│   └── www/                  # Documentation site (Next.js 15)
├── packages/
│   ├── cli/                  # npm package (@ravikumarsurya/mdx-ui)
│   └── registry/
│       └── src/              # Component source files (.tsx) — source of truth
├── registry/
│   ├── mdx/                  # Generated JSON registry (fetched by CLI)
│   └── registry.json
└── scripts/
    └── build-registry.ts     # Generates registry/mdx/*.json from packages/registry/src/
```

### Registry Workflow

Edit components in `packages/registry/src/`, then regenerate the JSON:

```bash
npm run build:registry
```

Commit both the `.tsx` source and the generated `registry/mdx/*.json`.

## Development

**Prerequisites:** Node.js 20.12+, pnpm 9+

```bash
git clone https://github.com/suryaravikumar-space/mdx-ui.git
cd mdx-ui
pnpm install

pnpm www:dev        # docs site at localhost:3000
pnpm cli:dev        # CLI in watch mode
npm run build:registry   # regenerate registry JSON from src
```

## Contributing

Pull requests welcome. For new components:

1. Add the `.tsx` source to `packages/registry/src/`
2. Add metadata to `scripts/build-registry.ts`
3. Run `npm run build:registry`
4. Add a doc page to `apps/www/content/docs/components/`
5. Register the component in `apps/www/components/mdx-components.tsx`
6. Add to `sidebar-docs.json`

## License

MIT © [suryaravikumar-space](https://github.com/suryaravikumar-space)
