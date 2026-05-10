# mdx-ui — v0.1.0 · Foundation Release

> **Release name:** Foundation
> **Version:** v0.1.0
> **Date:** 2026-05-09
> **Scope:** Testing infrastructure, design system primitives, animation layer, MDX superpowers, CI/CD pipeline, repo tooling

---

## Overview

v0.1.0 is the first architecture release. Before this version the repository had components but no tests, no shared design language, no animation system, and no CI enforcement. This release establishes the structural foundation the project will build on going forward.

---

## 1. Testing Infrastructure

### Philosophy

The core decision was to match the test runner to the runtime — not force one tool across all packages.

| Package | Runner | Environment | Reason |
|---|---|---|---|
| `packages/registry` | Jest 30 + RTL | jsdom | React components need a DOM; `moduleNameMapper` handles CSS/asset mocking |
| `packages/remark-plugin` | Vitest | node | Pure ESM; `unist-util-visit` and remark are ESM-only — Jest's `--experimental-vm-modules` is fragile |
| `packages/cli` | Vitest | node | `execa`, `chalk`, `cosmiconfig` are ESM — same reason |
| `apps/www` | Playwright | chromium + firefox | Real browser needed for MDX rendering, clipboard, navigation |

### Registry — Jest + RTL (130 tests, 13 suites)

Every component tested through its public API. No snapshot tests, no class name assertions, no implementation details.

```
accordion    → aria-expanded state, Collapse aria-hidden, single/multiple/collapsible modes
alert        → role=alert, all variants, AlertTitle/AlertDescription composition
badge        → 7 variants, element type
blockquote   → cite footer conditional render
callout      → all 5 CVA variants
card         → all 6 sub-components, LinkCard href/hover
code-block   → data-language display, copy button aria-label state transition
code-group   → tab switching, ArrowRight/Left/Home/End keyboard nav, copy button
heading      → H1–H6, slug generation from text content, aria-hidden anchor
kbd          → kbd element, attribute forwarding
steps        → CSS counter rendering, title conditional
table        → columnheader roles, full composition
tabs         → keyboard navigation, ARIA panel roles
```

**Key decisions:**
- `jest-environment-jsdom` for DOM simulation
- `ts-jest` with `tsconfig.test.json` (`module: CommonJS`, `moduleResolution: node10`, `ignoreDeprecations: "5.0"`)
- `@jest/globals` explicit import in `__mocks__/` files — avoids "Cannot find name jest" TypeScript error
- `jest-junit` reporter — outputs `coverage/junit.xml` consumed by CI artifact upload
- Coverage thresholds: 80% lines/functions/statements, 70% branches

### Remark Plugin — Vitest (54 tests)

AST trees built manually — no remark-parse dependency — isolating tests to transform logic only.

```
extract.test.ts    → 18 tests: 7 LLM provider response shapes
preprocess.test.ts → 13 tests: numbered list → Steps, code block handling, edge cases
plugin.test.ts     → 23 tests: Callout, DataTable, Steps, Mermaid, Highlight AST transforms
```

### CLI — Vitest (43 tests)

Filesystem mocked entirely with `vi.mock("fs-extra")` — tests verify decision logic, not I/O.

```
detect-structure.test.ts    → 17 tests: detectFramework priority, detectProjectStructure layouts
get-config.test.ts          →  5 tests: null when missing, parse errors, boolean fields
write-component.test.ts     →  7 tests: "use client" preserved/stripped, file path, ensureDir
component-registry.test.ts  → 12 tests: shape invariants, FILE_TO_COMPONENT consistency
```

Coverage thresholds: 70% lines/functions/statements, 60% branches (CLI has more untestable I/O paths).

### Playwright E2E (`apps/www`)

```
home.spec.ts        → heading, CTAs, feature cards, navigation clicks, page title
docs.spec.ts        → docs/components pages load, sidebar, code blocks
navigation.spec.ts  → HTTP 200 checks, no console errors, header visibility
```

---

## 2. Design Primitives

**File:** `packages/registry/src/lib/primitives.ts`

Before this release the same Tailwind strings were copy-pasted across every component:

```
// repeated in 16+ files:
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
```

After: named constants imported where needed.

```ts
focusRing        // full focus-visible chain for interactive elements
focusRingInset   // inset variant for buttons inside bordered containers
surface          // rounded-lg border border-border bg-muted
cardSurface      // rounded-lg border border-border bg-card shadow-sm
popoverSurface   // tooltip/popover surface with shadow
mutedText        // text-sm text-muted-foreground
transitions      // { colors, all, transform, opacity } at duration-200
```

**Maintenance impact:** changing the design token (e.g., focus ring radius, border colour, timing) is a one-line edit in one file. Without this, it would require a grep-and-replace across 36 component files.

---

## 3. Animation Layer

**File:** `packages/registry/src/lib/motion.tsx`

### `Collapse` Component

```
Before: AccordionContent returned null when closed
        → instant show/hide, content unmounted from DOM

After:  Collapse keeps content mounted with aria-hidden="true" when closed
        → smooth 220ms transition, content preserved for screen readers
```

**Technique:** CSS `grid-template-rows: 0fr → 1fr`

```tsx
<div style={{
  display: "grid",
  gridTemplateRows: open ? "1fr" : "0fr",
  transition: "grid-template-rows 220ms cubic-bezier(0.4, 0, 0.2, 1)",
}}>
  <div style={{ overflow: "hidden" }}>{children}</div>
</div>
```

**Why this technique over alternatives:**

| Technique | Problem |
|---|---|
| `max-height` hack | Requires hardcoded max value; easing is wrong at extremes |
| JS height measurement (`useLayoutEffect` + `ref`) | Breaks on content resize, adds layout thrash |
| `height: auto` transition | CSS cannot transition to `auto` |
| Framer Motion | External dependency; overkill for collapse |
| `grid-template-rows` | No JS, handles unknown height, single property, GPU-composited |

`Collapse` is used by `AccordionContent` and `Reveal`. Any future component needing animated show/hide imports from the same primitive.

---

## 4. MDX Superpowers

Four new components that give MDX authoring capabilities beyond styled HTML wrappers.

### `Annotation`

**File:** `packages/registry/src/annotation.tsx`

Inline text with a click-to-reveal explanation popover.

```mdx
Look at this <Annotation note="Quadratic: for each element we scan all others">
  O(n²)
</Annotation> growth rate.
```

- Annotated text renders with dotted underline (`decoration-dotted underline-offset-4`)
- Click opens a tooltip positioned above the text (`bottom-full`)
- Escape key and click-outside both dismiss it
- `aria-expanded` and `aria-describedby` wired for accessibility
- CSS border-trick arrow pointing down into the text
- Graceful: renders plain text if JavaScript is unavailable

### `Reveal`

**File:** `packages/registry/src/reveal.tsx`

Animated click-to-reveal panel for answers, hints, and spoilers.

```mdx
<Reveal label="Show solution">
  Use a hash map for O(1) lookups instead of scanning the array.
</Reveal>
```

- Uses `Collapse` for the open/close transition — smooth 220ms
- Chevron rotates 180° on open (using `transitions.transform` primitive)
- `aria-expanded` on the trigger button
- `defaultOpen` prop for pre-opened state
- Better than the native `<details>`-based `Spoiler` for educational UX because it animates

### `Preview`

**File:** `packages/registry/src/preview.tsx`

Tabbed component preview — rendered output and source code side by side.

```mdx
<Preview lang="tsx" code={`<Badge variant="success">Done</Badge>`}>
  <Badge variant="success">Done</Badge>
</Preview>
```

- "Preview" tab shows the rendered component centred in a clean container
- "Code" tab shows the raw source with language label and copy button
- Tab bar uses the same styling pattern as `CodeGroup`
- Copy button resets after 2 seconds
- Authors write both the rendered JSX (children) and the source string separately — no live code execution

### `GlossaryProvider` + `Term`

**File:** `packages/registry/src/glossary.tsx`

Context-based term linking system.

```mdx
<GlossaryProvider terms={{
  bfs: { label: "BFS", definition: "Breadth-First Search: explores nodes level by level using a queue." },
  dfs: { label: "DFS", definition: "Depth-First Search: explores as far as possible along each branch." },
}}>
  <Term id="bfs" /> is used for shortest-path problems.
  <Term id="dfs" /> is used for topological sort.
</GlossaryProvider>
```

- `GlossaryProvider` wraps content and makes definitions available via React context
- `Term` renders with dotted underline; click opens a popover with label + definition
- Escape and click-outside dismiss the popover
- `aria-expanded` and `aria-describedby` for accessibility
- Degrades gracefully: `<Term id="unknown" />` renders plain text — no error

---

## 5. Framework-Agnostic Components

`"use client"` removed from all 16 components:

```
accordion, annotation, code-block, code-group, data-table,
ds, ds-tree, file-tree, glossary, math, mermaid, preview,
reveal, tabs, tree, lib/motion
```

`"use client"` is a Next.js App Router directive, not a React primitive. The library ships pure React. Consumers decide where the client boundary sits in their own app. This makes every component usable in Remix, Astro, Vite, and plain React without modification.

---

## 6. CI/CD Pipeline

### `ci.yml` — Unit + Integration Tests

```
trigger: push to main, pull_request

matrix: node 18, node 20

steps:
  pnpm install (frozen lockfile)
  turbo run build          ← all packages built before any test runs
  turbo run test:coverage  ← Jest (registry) + Vitest (cli, remark-plugin)
  upload JUnit XML artifacts per node version
  upload Codecov lcov (node 20 only — avoids duplicate reports)

concurrency: cancel in-progress runs on same branch
```

### `e2e.yml` — Playwright Browser Tests

```
trigger: push to main, workflow_dispatch

steps:
  build all packages
  playwright install --with-deps chromium firefox
  next build
  playwright test
  upload playwright-report artifact on failure
```

### `publish.yml`

Fixed pnpm version alignment to match `packageManager` field in root `package.json`.

---

## 7. Repo Tooling

### Dependabot (`.github/dependabot.yml`)

Weekly PRs for:
- GitHub Actions versions
- Root workspace deps — grouped into `typescript-ecosystem`, `testing`, `turbo`
- Each package independently: `registry`, `cli`, `remark-plugin`, `apps/www`

Grouping prevents 20 individual PRs when TypeScript or Vitest releases a minor version.

### CODEOWNERS (`.github/CODEOWNERS`)

Every path mapped to `@suryaravikumar-space`. Per-package ownership can be split by adding lines as the team grows.

### Pre-commit Hooks (husky + lint-staged)

```
*.{ts,tsx}               → eslint --max-warnings=0 --fix + prettier --write
*.{js,json,md,mdx,yml}  → prettier --write
```

Installed via `"prepare": "husky"` — runs automatically on `pnpm install` for all contributors.

### `vitest.workspace.ts` (repo root)

```ts
export default defineWorkspace([
  "packages/cli/vitest.config.ts",
  "packages/remark-plugin/vitest.config.ts",
])
```

Unifies both Vitest packages. `pnpm vitest` from root runs both. Turbo handles the same for CI via `turbo run test`.

### `.vscode/settings.json`

- Vitest extension → `vitest.workspace.ts`
- Jest extension → `packages/registry` (the jsdom package)
- ESLint working directories per package
- Prettier as default formatter for TS/TSX
- `dist/`, `.next/`, `coverage/`, `.turbo/` excluded from search and file watcher

New contributors get working test runner integration and correct linting on first `code .` with no manual configuration.

### Turbo Pipeline

```json
"test":          { "dependsOn": ["^build"], "outputs": ["coverage/**"] }
"test:coverage": { "dependsOn": ["^build"], "outputs": ["coverage/**"] }
```

`^build` ensures all upstream package builds complete before any downstream test suite starts. Coverage output is cached — reruns on unchanged code skip the work.

---

## 8. TypeScript Fixes

| Issue | Root Cause | Fix |
|---|---|---|
| `Cannot find name 'jest'` in `__mocks__/` | `jest` used as implicit global; workspace root lacks `@types/jest` | `import { jest } from "@jest/globals"` |
| `Invalid value for '--ignoreDeprecations'` | TS 5.9 error message says use `"6.0"` but doesn't accept it yet | Use `"5.0"` which suppresses the `node10` deprecation warning in TS 5.x |
| `coverageThresholds` unknown property | Typo — Jest config key is `coverageThreshold` (no `s`) | Renamed |
| `@/lib/motion` not resolved in tests | `jest.config.ts` `moduleNameMapper` only mapped `@/lib/utils` | Added mappers for `@/lib/primitives` and `@/lib/motion` |
| Same paths missing from TypeScript | `tsconfig.json` `paths` only had `@/lib/utils` | Added entries for all lib files |

---

## Files Added or Modified

### New Files

```
packages/registry/src/lib/primitives.ts
packages/registry/src/lib/motion.tsx
packages/registry/src/annotation.tsx
packages/registry/src/reveal.tsx
packages/registry/src/preview.tsx
packages/registry/src/glossary.tsx
packages/registry/src/__tests__/accordion.test.tsx   (new — replaces old)
packages/registry/src/__tests__/alert.test.tsx
packages/registry/src/__tests__/badge.test.tsx
packages/registry/src/__tests__/blockquote.test.tsx
packages/registry/src/__tests__/callout.test.tsx
packages/registry/src/__tests__/card.test.tsx
packages/registry/src/__tests__/code-group.test.tsx
packages/registry/src/__tests__/heading.test.tsx
packages/registry/src/__tests__/kbd.test.tsx
packages/registry/src/__tests__/steps.test.tsx
packages/registry/src/__tests__/table.test.tsx
packages/registry/src/__mocks__/tsconfig.json
packages/remark-plugin/src/__tests__/extract.test.ts
packages/remark-plugin/src/__tests__/preprocess.test.ts
packages/remark-plugin/src/__tests__/plugin.test.ts
packages/remark-plugin/vitest.config.ts
packages/cli/src/__tests__/detect-structure.test.ts
packages/cli/src/__tests__/get-config.test.ts
packages/cli/src/__tests__/write-component.test.ts
packages/cli/src/__tests__/component-registry.test.ts
packages/cli/vitest.config.ts
apps/www/lib/primitives.ts
apps/www/lib/motion.tsx
apps/www/components/mdx/annotation.tsx
apps/www/components/mdx/reveal.tsx
apps/www/components/mdx/preview.tsx
apps/www/components/mdx/glossary.tsx
apps/www/e2e/home.spec.ts
apps/www/e2e/docs.spec.ts
apps/www/e2e/navigation.spec.ts
apps/www/playwright.config.ts
.github/workflows/ci.yml        (replaced)
.github/workflows/e2e.yml       (new)
.github/dependabot.yml
.github/CODEOWNERS
.husky/pre-commit
.vscode/settings.json
vitest.workspace.ts
```

### Modified Files

```
packages/registry/accordion.tsx              ← Collapse animation + primitives
packages/registry/tsconfig.json             ← added @/lib/primitives, @/lib/motion paths
packages/registry/tsconfig.test.json        ← ignoreDeprecations "5.0"
packages/registry/jest.config.ts            ← moduleNameMapper, coverageThreshold fix
packages/registry/src/__tests__/code-block.test.tsx  ← fixed stale assertions
packages/remark-plugin/package.json         ← added test, test:coverage scripts
packages/cli/package.json                   ← added test, test:coverage scripts, vitest devDeps
apps/www/components/mdx-components.tsx      ← imported 4 new components
scripts/build-registry.ts                   ← registered annotation, reveal, preview, glossary
package.json (root)                         ← test scripts, lint-staged config, husky, vitest
turbo.json                                  ← test:coverage task
.github/workflows/publish.yml               ← pnpm version fix
```

---

## What This Enables Going Forward

- **Any new component** gets a test file following the established RTL pattern
- **Design changes** (new border style, updated focus ring) propagate from primitives.ts to all components automatically
- **New animated components** import `Collapse` from `lib/motion` — no reimplementation
- **New MDX authors** have `Annotation`, `Reveal`, `Preview`, and `Glossary` for rich educational content
- **CI catches regressions** on every PR before merge — coverage cannot silently drop
- **Dependabot** keeps dependencies current with zero manual effort

---

## Architecture Review — Honest Assessment of v0.1.0

> This section is a critical review of what was built, what is genuinely strong, what is risky, and what is still missing. It exists so future decisions are made with clear eyes rather than premature confidence.

---

### What Is Genuinely Strong

**1. Different test runners per runtime**

Optimising for runtime correctness over conceptual simplicity is the mature decision. Forcing one tool everywhere is tempting but wrong. Jest for DOM, Vitest for ESM/node, Playwright for real browser behaviour — this is how large monorepos actually evolve. The decision to not fight ESM-only dependencies with `--experimental-vm-modules` hacks was correct.

**2. Behavioural testing over snapshot obsession**

The test suite avoids brittle snapshots, implementation detail assertions, and CSS internals. It focuses on public behaviour, accessibility attributes, and state transitions. Keyboard navigation tests and ARIA validation are present from the start. Many OSS libraries never reach this discipline even at v2.0.

**3. Removing `"use client"`**

Consumer owns the boundary. This is the correct architecture. It makes every component portable across Next.js App Router, Remix, Astro, and plain React without modification. Coupling a library to a framework directive at the source level is a trap that becomes very expensive to undo later.

**4. The `Collapse` animation technique**

`grid-template-rows: 0fr → 1fr` instead of JS height measurement or `max-height` hacks. This is modern CSS engineering — no layout thrash, handles unknown content height, works inside nested MDX. The right call.

**5. Thinking in architecture layers**

The shift from "build components" to "build layers" — Primitives, Motion, Registry, Build pipeline, Test orchestration — is the correct evolution. This is where the project stopped being a component collection and started being infrastructure.

**6. The MDX-native components are the most valuable part**

`Annotation`, `Reveal`, `Preview`, and `GlossaryProvider` are knowledge primitives, not generic UI. This is the actual product. `Alert`, `Card`, and `Accordion` are ecosystem requirements — necessary but not differentiating. The MDX-native layer is where the real moat begins.

---

### What Is Risky

**1. Primitive systems metastasize**

Design primitives are useful today:

```
focusRing
surface
mutedText
transitions
```

Six months from now without discipline:

```
surfaceInteractiveSecondaryCompactGhostInsetDanger
```

Primitive systems have a well-documented failure mode: they grow to match every edge case until they become a second design system more complex than the original problem.

**Rule to enforce going forward:** a primitive is only justified if it is reused in five or more components AND represents stable, named semantics. If neither condition is met, inline the class string. Do not abstract for a single use case.

**2. The label "production-grade" is premature**

What was built is genuinely promising pre-1.0 architecture. It is not yet production-grade. True production-grade requires:

- Version migration strategy
- API evolution guarantees with documented breaking-change policy
- SSR and edge runtime compatibility verification
- React version compatibility matrix (18, 19)
- Formal accessibility audits against WCAG 2.1 AA
- Bundle budget enforcement with automated checks
- Tree-shaking verification per component
- Release governance and semver discipline
- Codemods for breaking changes
- Performance instrumentation

None of these exist yet. That is acceptable at this stage. But the label matters — over-claiming maturity leads to API decisions that are hard to undo.

**3. API governance has not started**

Components are evolving fast. Without governance, the following will appear across the codebase within months:

```
variant / tone / kind / type / mode / intent / appearance
```

All meaning roughly the same thing. This destroys ecosystems. The decision of which naming system wins must be made before the third variant of anything is built.

Decide now:
- Variants → `variant` prop using CVA
- Sizes → `size` prop (`sm`, `md`, `lg`)
- Semantic intent → `intent` or `variant` (pick one, never both)
- Event handlers → always `on{Event}` (never `handle{Event}` as a prop name)
- Slot content → always `children` or named render props, never magic string props

Write this down as a `COMPONENT_API_CONVENTIONS.md` before building the next five components.

**4. Headless logic separation has not started**

Currently every component owns its state, keyboard navigation, rendering, styles, and animation in one file. This is fine at this scale. It becomes a problem when:

- A consumer needs the accordion logic without the styling
- A consumer needs to control state from outside
- Tests need to verify logic independently of rendering

The path forward is extracting `useAccordion()`, `useTabs()`, `useCollapse()` as separate hooks. Not Radix-level abstraction — but the hooks should be separable from the JSX.

This is not urgent for v0.1.0. It is urgent before v1.0.

---

### What Is Missing

**Semantic educational components**

The current MDX-native layer (`Annotation`, `Reveal`, `Preview`, `Glossary`) is the right direction but only the beginning. The library needs:

```
<Definition />          — formal definition block with term + body
<Invariant />           — mathematical or logical invariant statement
<CounterExample />      — explicit counterexample to a claim
<ComplexityTable />     — time/space complexity breakdown
<AlgorithmStep />       — single step in an algorithm with label
<ExecutionTrace />      — step-by-step execution with state snapshots
<StateDiagram />        — state machine visualisation
<TraversalAnimation />  — interactive graph/tree traversal
```

These are what separate an educational MDX library from a generic documentation library.

**AI-readable metadata**

The component structure is very close to being machine-readable. One step further:

```mdx
<Invariant complexity="O(log n)" provenBy="rotation-lemma">
  An AVL tree remains height-balanced after every insertion and deletion.
</Invariant>
```

This renders well for humans and can be extracted by AI systems as structured claims. This is a significant long-term opportunity that no other MDX library is pursuing.

**Bundle governance**

Not present at all. Needed before v1.0:

- `size-limit` configuration with per-component budgets
- `sideEffects: false` verification in package.json
- ESM/CJS dual output verification
- Tree-shaking smoke test (import one component, verify only it is bundled)
- Bundlephobia badge on README

MDX ecosystems are unusually sensitive to bundle bloat because documentation sites often run on edge runtimes.

**Release infrastructure**

Before calling anything production-grade:

- Changesets for changelog automation
- Semver enforcement — no undocumented breaking changes in patch versions
- Migration guides for any prop rename or removal
- Deprecation strategy — deprecated props warn for one major version before removal
- `CHANGELOG.md` generated from changesets, not written by hand

**Registry intelligence**

The current registry maps component name to file content. It should eventually understand:

```json
{
  "name": "accordion",
  "semanticCategory": "disclosure",
  "accessibilityPattern": "APG accordion",
  "ssrCompatible": true,
  "hydrationRequired": true,
  "interactivityLevel": "controlled",
  "aiCompatible": false
}
```

This metadata enables smarter CLI suggestions, accessibility linting, and eventually AI-assisted documentation authoring.

---

### Strategic Risk — "shadcn but educational"

The most important strategic danger is that the library reads as another Tailwind component collection with educational theming, rather than educational infrastructure that happens to look good.

The MDX-native components (`Annotation`, `Reveal`, `Glossary`, `Preview`) are what makes this different. `Alert`, `Card`, `Badge`, and `Accordion` are table stakes — necessary for completeness but not differentiation.

The library needs to push harder and faster into:

- Semantic learning blocks (not just disclosure UI)
- Progressive disclosure with educational state — not just show/hide
- Interactive reasoning components
- Explainability primitives
- Structures that AI systems can parse and reason about

That is the actual moat. The generic UI layer enables it but is not the product.

---

### Honest Positioning

**Relative to random OSS component libraries:** already ahead — particularly in testing discipline, architecture thinking, framework neutrality, and MDX direction.

**Relative to mature ecosystems (Radix, Ark, Park):** still early — missing API governance, headless separation, ecosystem conventions, release maturity, and semantic differentiation.

**The actual transition that happened in this release:** from building a collection of components to building a platform foundation. That transition is real and it is the right one. The work now is to not squander it by drifting back toward generic UI territory.
