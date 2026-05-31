# @ravikumarsurya/mdx-ui

Copy-paste MDX components for documentation sites. 52+ components including 150+ math primitives, data structures, tables, diagrams, and more — built with React, TypeScript, and Tailwind CSS. CLI, MCP server, and remark plugin included.

Follows the [shadcn/ui](https://ui.shadcn.com) philosophy — components are added directly to your project, not installed as a dependency. You own the code.

## Quick Start

```bash
# Initialize your project
npx @ravikumarsurya/mdx-ui init

# Add components
npx @ravikumarsurya/mdx-ui add callout tabs code-block

# Or use the interactive menu
npx @ravikumarsurya/mdx-ui
```

## Commands

### `init`

Sets up mdx-ui in your project:

- Creates `mdx-ui.json` config
- Injects shadcn-compatible CSS variables into your `globals.css`
- Patches `tailwind.config` with color tokens (Tailwind v3) or adds `@theme inline` block (Tailwind v4)
- Injects Shiki dual-theme CSS for syntax highlighting
- Works with Next.js, Vite React, Astro, and any other framework

```bash
npx @ravikumarsurya/mdx-ui init
```

### `add`

Adds one or more components to your project:

```bash
# Add specific components
npx @ravikumarsurya/mdx-ui add callout

# Add multiple at once
npx @ravikumarsurya/mdx-ui add tabs steps accordion

# Interactive picker (no args)
npx @ravikumarsurya/mdx-ui add
```

Each component is written to your `componentsDir`, its npm dependencies are installed, and your `mdx-components.tsx` is patched with the correct static imports.

### `update`

Re-fetches and overwrites installed components with the latest versions:

```bash
# Update all installed components
npx @ravikumarsurya/mdx-ui update

# Update specific components
npx @ravikumarsurya/mdx-ui update callout tabs
```

### `list`

```bash
# Show all available components
npx @ravikumarsurya/mdx-ui list

# Show only installed components
npx @ravikumarsurya/mdx-ui list --installed
```

## Available Components (52)

### Content & Layout

| Component         | Description                                                         |
| ----------------- | ------------------------------------------------------------------- |
| `alert`           | Semantic `role="alert"` boxes — info, warning, destructive, success |
| `accordion`       | Collapsible sections — single or multiple open                      |
| `annotation`      | Inline text annotation — click to reveal explanation popover        |
| `badge`           | Status labels with 7 variants                                       |
| `blockquote`      | Styled blockquote                                                   |
| `callout`         | Alert boxes — info, warning, danger, success                        |
| `card`            | Card + header/title/description/content/footer + LinkCard           |
| `changelog`       | Versioned entries with timeline and typed change badges             |
| `definition`      | Formal term definition in structured format                         |
| `emphasis`        | Bold (`<strong>`) and italic (`<em>`)                               |
| `glossary`        | Context-based inline glossary with popovers via `<Term>`            |
| `heading`         | H1–H6 with auto-generated anchor links                              |
| `headings`        | Markdown h1–h6 overrides with anchor links                          |
| `highlight`       | Marker-style inline highlight — yellow, blue, green, pink, purple   |
| `horizontal-rule` | Divider — default, dashed, dotted, gradient                         |
| `illustration`    | Single diagram or responsive 1–3 column image grid                  |
| `image`           | Image with optional caption                                         |
| `inline-code`     | Inline code snippets                                                |
| `invariant`       | Formal invariant statement with optional complexity annotation      |
| `kbd`             | Keyboard shortcut display (`Ctrl+K`, `⌘+S`)                         |
| `link`            | Styled anchor — auto-detects external URLs, adds open-in-new-tab   |
| `list`            | Ordered and unordered lists                                         |
| `paragraph`       | Paragraph with Lead, Intro, Large, Small, Muted variants            |
| `preview`         | Tabbed component preview — rendered output + source with copy       |
| `reveal`          | Animated click-to-reveal panel for answers, hints, and spoilers     |
| `security-note`   | Security callout with severity levels — info, warning, critical     |
| `spoiler`         | Collapsible `<details>`/`<summary>` disclosure                      |
| `steps`           | Numbered step-by-step guide                                         |
| `tabs`            | Tabbed content with keyboard navigation                             |

### Code & Terminal

| Component    | Description                                                         |
| ------------ | ------------------------------------------------------------------- |
| `code-block` | Syntax-highlighted code blocks via rehype-pretty-code               |
| `code-group` | Tabbed code blocks — npm/pnpm/yarn or multi-language examples       |
| `diff-block` | Code diff block — highlights `+` additions and `-` removals        |
| `terminal`   | macOS-style terminal window with traffic lights and typed lines     |

### Math

| Component         | Description                                                                     |
| ----------------- | ------------------------------------------------------------------------------- |
| `math`            | LaTeX math via KaTeX — block and inline                                         |
| `math-primitives` | 150+ JSX math primitives — Frac, Pow, Integral, Sum, Greek, trig, logic and more. No LaTeX engine required. |
| `math-equation`   | Display equation containers — centered block with optional equation number      |
| `math-solution`   | Step-by-step solution blocks — SolutionStep, SolutionAnswer, SolutionNote       |

### Data & Tables

| Component          | Description                                                          |
| ------------------ | -------------------------------------------------------------------- |
| `complexity-table` | Time and space complexity table for algorithm operations             |
| `data-table`       | Dynamic table — accepts columns and data as props                    |
| `data-type-table`  | AI/ML numeric data type and tensor specification table               |
| `hardware-spec`    | Hardware interface spec card — type, version, speed, voltage, pins   |
| `pin-table`        | Hardware pinout table — signal name, direction, voltage, alt function|
| `privacy-table`    | Personal data documentation — purpose, legal basis, retention        |
| `register-map`     | Hardware register/OTP fuse map — address, bits, access type, reset   |
| `table`            | Table with header, body, footer, caption                             |

### Diagrams & Visualization

| Component  | Description                                                                        |
| ---------- | ---------------------------------------------------------------------------------- |
| `ds`       | Data structure visualizations — Array, LinkedList, Stack, Queue, Tree, Graph, etc. |
| `ds-tree`  | SVG tree visualizer — BST, AVL, Heap, N-ary with traversal animations              |
| `mermaid`  | Mermaid diagrams — flowcharts, sequences, etc.                                     |

### SEO & Metadata

| Component | Description                                                   |
| --------- | ------------------------------------------------------------- |
| `json-ld` | JSON-LD structured data — Article, BreadcrumbList, FAQPage    |

### Navigation

| Component      | Description                                         |
| -------------- | --------------------------------------------------- |
| `file-tree`    | Simple string-based file/folder tree                |
| `tree`         | Interactive file/folder tree                        |

### Certification & Compliance

| Component             | Description                                                        |
| --------------------- | ------------------------------------------------------------------ |
| `certification-badge` | ISO, TISAX, SOC 2 certification chips with status indicators       |

### Media

| Component | Description                                                              |
| --------- | ------------------------------------------------------------------------ |
| `video`   | Video embed — auto-detects YouTube, Vimeo, and HTML5 with caption        |

### Utilities

| Component        | Description                                    |
| ---------------- | ---------------------------------------------- |
| `mdx-components` | Auto-wired MDX component mapper                |
| `utils`          | `cn()` utility (clsx + tailwind-merge)         |

## Math Primitives

`math-primitives` is the single math system in mdx-ui — 150+ JSX components with no LaTeX engine required:

```bash
npx @ravikumarsurya/mdx-ui add math-primitives
```

```mdx
{/* Fraction */}
<Frac num="a" den="b" />

{/* Integral with bounds */}
<Integral from="a" to="b">f(x) dx</Integral>

{/* Compose multiple elements */}
<Frac
  num={<Expr>x <Pow exp="2">dx</Pow></Expr>}
  den={<Pow exp="2">dy</Pow>}
/>
```

Key components: `Expr` (composition), `Frac`, `Pow`, `Sub`, `Sqrt`, `Integral`, `Sum`, `Prod`, `Lim`, `Deriv`, `PDeriv`, `Brace`, `Paren`, full Greek alphabet, trig functions, logic symbols, and more.

## Syntax Highlighting

`code-block` integrates with `rehype-pretty-code` and Shiki for accurate, dual-theme syntax highlighting.

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

The required CSS is automatically injected by `npx @ravikumarsurya/mdx-ui init`.

## Framework Support

| Framework              | Status |
| ---------------------- | ------ |
| Next.js (App Router)   | ✓      |
| Next.js (Pages Router) | ✓      |
| Vite React             | ✓      |
| Astro                  | ✓      |
| Tailwind v3            | ✓      |
| Tailwind v4            | ✓      |

## Example `mdx-ui.json`

```json
{
  "componentsDir": "src/components/mdx",
  "framework": "nextjs"
}
```

## Links

- **Documentation**: [GitHub](https://github.com/suryaravikumar-space/mdx-ui)
- **Issues**: [GitHub Issues](https://github.com/suryaravikumar-space/mdx-ui/issues)
- **npm**: [@ravikumarsurya/mdx-ui](https://www.npmjs.com/package/@ravikumarsurya/mdx-ui)

## License

MIT
