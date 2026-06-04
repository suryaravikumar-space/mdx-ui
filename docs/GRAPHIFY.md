# Graphify — Knowledge Graph for DocsUI

Graphify builds a knowledge graph of the codebase so AI assistants (Claude Code, Cursor, etc.) navigate by structure instead of scanning raw files. This reduces token usage by ~20× per query.

## How it works automatically

A **PreToolUse hook** fires before every `Glob`/`Grep` operation and tells Claude to consult `graphify-out/GRAPH_REPORT.md` first. A **post-commit git hook** rebuilds the graph after every commit. You don't have to do anything — it's always-on.

## Query the graph

Instead of asking Claude to search files, query the graph directly:

```
/graphify query "how does the CLI add command work"
/graphify query "what components depend on lib/primitives"
/graphify path "CLI" "registry"
/graphify explain "startMcpServer"
```

## Update after changes

**Code changes** (.ts/.tsx) — handled automatically by the post-commit hook.

**Doc/MDX changes** — run manually after editing `.md`/`.mdx` files:

```
/graphify . --update
```

This only re-extracts changed files, not the full codebase.

## Full rebuild from scratch

If you delete `graphify-out/` or need a clean rebuild:

```bash
pip install graphifyy   # or: pipx install graphifyy
graphify install
```

Then in Claude Code:

```
/graphify .
```

After the build completes, re-install the Claude Code integration:

```bash
graphify claude install
graphify hook install
```

## Key output files

| File                           | Purpose                                                          |
| ------------------------------ | ---------------------------------------------------------------- |
| `graphify-out/GRAPH_REPORT.md` | One-page summary — god nodes, community map, suggested questions |
| `graphify-out/graph.json`      | Full graph data (2002 nodes, 3030 edges)                         |
| `graphify-out/graph.html`      | Interactive visualization — open in any browser                  |
| `graphify-out/cache/`          | AST cache — makes incremental updates fast                       |

## Current graph stats

- **2,002 nodes** · **3,030 edges** · **195 communities**
- **19.6× token reduction** vs naive full-corpus scanning
- **God nodes** (most connected): `cn()` (106 edges), `DocsUI CLI` (22), `clsx`/`tailwind-merge` (19 each)

## Key communities detected

| Community                 | What it covers                                                      |
| ------------------------- | ------------------------------------------------------------------- |
| Docs Site MDX Wrappers    | `apps/www/components/mdx/` — all component wrappers                 |
| Math Primitives           | `packages/registry/src/math-primitives.tsx`                         |
| Data Structures           | `ds.tsx`, `ds-tree.tsx` source and docs                             |
| Mermaid Diagrams          | `mermaid.tsx` source and docs                                       |
| Remark MDX Plugin         | `packages/remark-plugin/`                                           |
| CLI Commands              | `add`, `init`, `update`, `doctor`, `mcp`, `new`                     |
| Project Design Principles | API conventions, naming philosophy, rationale docs                  |
| AI Content Pipeline       | `preprocessMarkdown`, `@docsui-cli/remark-plugin`, LLM system prompt |
