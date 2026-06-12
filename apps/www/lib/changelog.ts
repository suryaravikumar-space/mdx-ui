import type { ChangeType } from "@/components/mdx/changelog";

export interface ChangelogItem {
  type: ChangeType;
  text: string;
}

export interface ChangelogRelease {
  version: string;
  date: string;
  href: string;
  items: ChangelogItem[];
}

const REPO = "https://github.com/suryaravikumar-space/docsui";

export const changelog: ChangelogRelease[] = [
  {
    version: "Unreleased",
    date: "June 2026",
    href: `${REPO}/compare/v0.0.43...main`,
    items: [
      {
        type: "changed",
        text: "Rebrand the project from MDX UI to DocsUI across the CLI, packages, and docs",
      },
      {
        type: "added",
        text: "Add geometry-2d and electronics component libraries",
      },
      {
        type: "added",
        text: "Add a Math II (Advanced) category to the symbol browser with 43 new entries",
      },
      {
        type: "added",
        text: "Add a playground with a live remark auto-transform demo",
      },
      {
        type: "added",
        text: "Harden the MCP server with caching, local fallback, list_categories, and validate_mdx",
      },
      {
        type: "security",
        text: "Fix 76 vulnerable dependencies via pnpm overrides and pin GitHub Actions to commit SHAs",
      },
      {
        type: "security",
        text: "Prevent ReDoS in markdown parsing and scope workflow permissions to least privilege",
      },
      {
        type: "added",
        text: "Show the live preview demo at the top of every component doc page",
      },
      {
        type: "added",
        text: "Add a responsive mobile navigation for the docs, blog, community, and learn sidebars",
      },
      {
        type: "added",
        text: "Add a full site footer and About page with maintainer profiles and social links",
      },
    ],
  },
  {
    version: "v0.0.43",
    date: "May 12, 2026",
    href: `${REPO}/releases/tag/v0.0.43`,
    items: [
      {
        type: "added",
        text: "Add an MCP server exposing list_components, get_component, and search_components",
      },
      {
        type: "added",
        text: "Roll out the live ComponentPreview demo to all 41 component doc pages",
      },
      {
        type: "added",
        text: "Add a semantic math syntax system with primitives, equations, and solutions",
      },
      {
        type: "added",
        text: "Add the math-easy DSL with nabla, grad, partial, cdot, times, and hbar shorthands",
      },
      {
        type: "changed",
        text: "Update the homepage and package description to reflect the LLM-to-MDX vision",
      },
    ],
  },
  {
    version: "v0.0.35",
    date: "May 10, 2026",
    href: `${REPO}/releases/tag/v0.0.35`,
    items: [
      {
        type: "added",
        text: "Add the remark-mdx-ui plugin that upgrades AI-generated markdown to MDX components",
      },
      {
        type: "added",
        text: "Add Mermaid-based data structure components: BST, Tree, BFS, and DFS visualizers",
      },
      {
        type: "added",
        text: "Add 6 technical, security, and privacy components for engineering docs",
      },
      {
        type: "added",
        text: "Add ComponentPreview — live tabbed demos with syntax-highlighted source",
      },
      {
        type: "fixed",
        text: "Restore client components and fix MDX parse errors in interactive demos",
      },
    ],
  },
  {
    version: "v0.0.31",
    date: "May 8, 2026",
    href: `${REPO}/releases/tag/v0.0.31`,
    items: [
      {
        type: "added",
        text: "Add the DataTable component with a dynamic columns + data API and custom cell renderers",
      },
      {
        type: "added",
        text: "Add client-side sorting and filtering, plus an MDX-native headers/rows API to DataTable",
      },
      {
        type: "added",
        text: "Add the Highlight component — react.dev-style marker highlight in 5 colors",
      },
    ],
  },
  {
    version: "v0.0.26",
    date: "May 8, 2026",
    href: `${REPO}/releases/tag/v0.0.26`,
    items: [
      {
        type: "added",
        text: "Add a diff preview to the update command and a new remove command",
      },
      {
        type: "added",
        text: "Add versioned registry fetches pinned to a git tag",
      },
      {
        type: "added",
        text: "Add Link and Spoiler components, a doctor command, and lazy-loaded video",
      },
      {
        type: "added",
        text: "Add ImageRendererProvider for framework-agnostic image optimization",
      },
      {
        type: "changed",
        text: "Architecture refactor with integrity verification and Mermaid dark mode support",
      },
    ],
  },
  {
    version: "v0.0.20",
    date: "May 8, 2026",
    href: `${REPO}/releases/tag/v0.0.20`,
    items: [
      {
        type: "added",
        text: "Add the CodeGroup component for tabbed code blocks",
      },
      { type: "added", text: "Add syntax highlighting via rehype-pretty-code" },
      { type: "changed", text: "Improve npm package metadata" },
    ],
  },
  {
    version: "v0.0.16",
    date: "May 8, 2026",
    href: `${REPO}/releases/tag/v0.0.16`,
    items: [
      {
        type: "added",
        text: "Add the update command, accordion, list --installed, and tabs keyboard navigation",
      },
      {
        type: "added",
        text: "Add an interactive component picker menu to the CLI",
      },
      {
        type: "added",
        text: "Add math, table, mermaid, and code-copy components",
      },
      {
        type: "added",
        text: "Add framework detection for Next.js, Astro, and React in the CLI",
      },
      {
        type: "fixed",
        text: "Fix Vercel deploys and CI to build the docs site correctly",
      },
      {
        type: "security",
        text: "Update next-mdx-remote to v6 to fix CVE-2026-0969",
      },
    ],
  },
  {
    version: "v0.0.6",
    date: "January 3, 2026",
    href: `${REPO}/releases/tag/v0.0.6`,
    items: [
      {
        type: "added",
        text: "Initial release of the MDX component library and CLI",
      },
      {
        type: "added",
        text: "Add auto-discovering mdx-components for React.dev-style docs",
      },
      {
        type: "fixed",
        text: "Auto-generate registry JSONs with the correct structure",
      },
    ],
  },
];
