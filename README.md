# mdx-ui

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

| Command | Description |
| --- | --- |
| `init` | Set up `mdx-ui.json`, inject CSS variables, patch `tailwind.config` |
| `add [components...]` | Add components (interactive picker if no args) |
| `update [components...]` | Re-fetch and overwrite with latest versions |
| `list` | Show all available components |
| `list --installed` | Show only installed components |

## Components (23)

### Layout & Typography
| Component | Description |
| --- | --- |
| `heading` | H1–H6 with auto-generated anchor links on hover |
| `headings` | Markdown heading overrides (h1–h6 → styled components) |
| `paragraph` | Paragraph with Lead, Intro, Large, Small, Muted variants |
| `emphasis` | Bold (`<strong>`) and italic (`<em>`) |
| `list` | Ordered and unordered lists |
| `blockquote` | Styled blockquote |
| `horizontal-rule` | Divider with default, dashed, dotted, gradient styles |
| `image` | Image with optional caption |

### Interactive
| Component | Description |
| --- | --- |
| `accordion` | Collapsible sections, single or multiple open |
| `tabs` | Tabbed content with keyboard navigation (Arrow/Home/End) |
| `steps` | Numbered step-by-step guide |
| `tree` | Interactive file/folder tree |
| `file-tree` | Simple string-based file tree |

### Code
| Component | Description |
| --- | --- |
| `code-block` | Syntax-highlighted code blocks via `rehype-pretty-code` + Shiki |
| `code-group` | Tabbed code blocks — npm/pnpm/yarn or multi-language examples |
| `inline-code` | Inline code snippets |
| `math` | LaTeX math via KaTeX (block and inline) |
| `mermaid` | Mermaid diagrams (flowcharts, sequences, etc.) |

### Callouts & Labels
| Component | Description |
| --- | --- |
| `callout` | Alert boxes with info, warning, danger, success variants |
| `badge` | Status labels with 7 variants |
| `table` | Styled table with header, body, footer, caption |

### Utilities
| Component | Description |
| --- | --- |
| `mdx-components` | Auto-wired MDX component mapper |
| `utils` | `cn()` utility (clsx + tailwind-merge) |

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

**Prerequisites:** Node.js 18+, pnpm 9+

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
