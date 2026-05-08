# @ravikumarsurya/mdx-ui

Copy-paste MDX components for documentation sites. Built with React, TypeScript, and Tailwind CSS.

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

## Available Components (23)

| Component | Description |
| --- | --- |
| `accordion` | Collapsible sections — single or multiple open |
| `badge` | Status labels with 7 variants |
| `blockquote` | Styled blockquote |
| `callout` | Alert boxes — info, warning, danger, success |
| `code-block` | Syntax-highlighted code blocks via rehype-pretty-code |
| `code-group` | Tabbed code blocks — npm/pnpm/yarn or multi-language examples |
| `emphasis` | Bold (`<strong>`) and italic (`<em>`) |
| `file-tree` | Simple string-based file/folder tree |
| `heading` | H1–H6 with auto-generated anchor links |
| `headings` | Markdown h1–h6 overrides with anchor links |
| `horizontal-rule` | Divider — default, dashed, dotted, gradient |
| `image` | Image with optional caption |
| `inline-code` | Inline code snippets |
| `list` | Ordered and unordered lists |
| `math` | LaTeX math via KaTeX (block and inline) |
| `mdx-components` | Auto-wired MDX component mapper |
| `mermaid` | Mermaid diagrams (flowcharts, sequences, etc.) |
| `paragraph` | Paragraph with Lead, Intro, Large, Small, Muted variants |
| `steps` | Numbered step-by-step guide |
| `table` | Table with header, body, footer, caption |
| `tabs` | Tabbed content with keyboard navigation |
| `tree` | Interactive file/folder tree |
| `utils` | `cn()` utility (clsx + tailwind-merge) |

## Syntax Highlighting

`code-block` integrates with `rehype-pretty-code` and Shiki for accurate, dual-theme syntax highlighting.

```bash
npm install rehype-pretty-code shiki
```

```ts
// next.config.ts
import rehypePrettyCode from "rehype-pretty-code"

const withMDX = createMDX({
  options: {
    rehypePlugins: [[rehypePrettyCode, {
      theme: { light: "github-light-default", dark: "github-dark-default" },
      defaultColor: false,
    }]],
  },
})
```

Map `pre` to `CodeBlock` in your MDX components:

```tsx
import { CodeBlock } from "@/components/mdx/code-block"
const components = { pre: CodeBlock }
```

The required CSS is automatically injected by `npx @ravikumarsurya/mdx-ui init`.

## Framework Support

| Framework | Status |
| --- | --- |
| Next.js (App Router) | ✓ |
| Next.js (Pages Router) | ✓ |
| Vite React | ✓ |
| Astro | ✓ |
| Tailwind v3 | ✓ |
| Tailwind v4 | ✓ |

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
