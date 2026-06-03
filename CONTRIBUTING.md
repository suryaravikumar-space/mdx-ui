# Contributing to DocsUI

Thank you for your interest in contributing! This guide covers everything you need to get started.

## Table of Contents

- [Project Structure](#project-structure)
- [Development Setup](#development-setup)
- [Running Tests](#running-tests)
- [Making Changes](#making-changes)
- [Submitting a PR](#submitting-a-pr)
- [Adding a New Component](#adding-a-new-component)
- [Commit Convention](#commit-convention)

---

## Project Structure

```
docsui/
├── packages/
│   ├── cli/           # docsui — CLI tool
│   ├── registry/      # Component source files (.tsx)
│   └── remark-plugin/ # @docsui-io/remark-plugin — remark plugin
├── apps/
│   └── www/           # Documentation site (Next.js)
├── scripts/
│   └── build-registry.ts  # Generates registry JSON from packages/registry/src/
└── registry/
    ├── registry.json  # Component index (generated)
    └── mdx/           # Per-component JSON (generated)
```

---

## Development Setup

**Requirements:** Node.js ≥ 18, pnpm ≥ 9

```bash
# 1. Fork and clone
git clone https://github.com/<your-username>/docsui.git
cd docsui

# 2. Install dependencies
pnpm install

# 3. Build all packages
pnpm build

# 4. Start the docs site
pnpm dev
```

---

## Running Tests

```bash
# Run all tests
pnpm test

# Run with coverage
pnpm test:coverage

# Run tests for a specific package
cd packages/cli && pnpm test
cd packages/remark-plugin && pnpm test

# Type-check everything
pnpm typecheck

# Lint everything
pnpm lint
```

---

## Making Changes

1. Create a branch from `main`:

   ```bash
   git checkout -b feat/my-feature
   ```

2. Make your changes. Run `pnpm typecheck` and `pnpm test` before committing.

3. The pre-commit hook runs Prettier and ESLint automatically.

---

## Submitting a PR

- Keep PRs focused — one feature or fix per PR
- Add or update tests for any changed behaviour
- Update documentation in `apps/www/content/docs/` if relevant
- Ensure CI passes before requesting review

---

## Adding a New Component

1. Create `packages/registry/src/<component-name>.tsx`
2. Add metadata to `scripts/build-registry.ts` under `componentsMetadata`
3. Run `pnpm build:registry` to regenerate `registry/registry.json` and `registry/mdx/<component>.json`
4. Install the component locally to test:
   ```bash
   npx docsui-cli@latest add <component-name>
   ```
5. Add a docs page at `apps/www/content/docs/components/<component-name>.mdx`
6. Add the component to `apps/www/config/sidebar-docs.json`

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new accordion variant
fix: correct callout border radius on mobile
docs: update Next.js integration guide
chore: bump dependencies
refactor: simplify registry fetch logic
test: add coverage for validate_mdx edge cases
```

Scopes are optional but encouraged: `feat(mcp):`, `fix(cli):`, `docs(www):`.
