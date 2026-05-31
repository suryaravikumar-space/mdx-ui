# Component Registry Package

This package contains the **source TypeScript components** for mdx-ui.

## Purpose

This directory is the **source of truth** for all component development:

- Component TypeScript source files (`.tsx`) in `src/`
- Component tests in `src/__tests__/`
- Not published directly — components are distributed as JSON via the registry

## Structure

```
packages/registry/
├── src/
│   ├── Components (52 total)
│   │
│   ├── Content & Layout
│   │   ├── accordion.tsx
│   │   ├── alert.tsx
│   │   ├── annotation.tsx
│   │   ├── badge.tsx
│   │   ├── blockquote.tsx
│   │   ├── callout.tsx
│   │   ├── card.tsx
│   │   ├── changelog.tsx
│   │   ├── definition.tsx
│   │   ├── emphasis.tsx
│   │   ├── glossary.tsx
│   │   ├── heading.tsx
│   │   ├── headings.tsx
│   │   ├── highlight.tsx
│   │   ├── horizontal-rule.tsx
│   │   ├── illustration.tsx  (in www)
│   │   ├── image.tsx
│   │   ├── inline-code.tsx
│   │   ├── invariant.tsx
│   │   ├── kbd.tsx
│   │   ├── link.tsx
│   │   ├── list.tsx
│   │   ├── paragraph.tsx
│   │   ├── preview.tsx
│   │   ├── reveal.tsx
│   │   ├── security-note.tsx
│   │   ├── spoiler.tsx
│   │   ├── steps.tsx
│   │   └── tabs.tsx
│   │
│   ├── Code & Terminal
│   │   ├── code-block.tsx
│   │   ├── code-group.tsx
│   │   ├── diff-block.tsx
│   │   └── terminal.tsx
│   │
│   ├── Math
│   │   ├── math-primitives.tsx   ← 150+ JSX math primitives
│   │   ├── math-equation.tsx
│   │   └── math-solution.tsx
│   │
│   ├── Data & Tables
│   │   ├── complexity-table.tsx
│   │   ├── data-table.tsx
│   │   ├── data-type-table.tsx
│   │   ├── hardware-spec.tsx
│   │   ├── pin-table.tsx
│   │   ├── privacy-table.tsx
│   │   ├── register-map.tsx
│   │   └── table.tsx
│   │
│   ├── Diagrams & Visualization
│   │   ├── ds.tsx
│   │   ├── ds-tree.tsx
│   │   └── mermaid.tsx
│   │
│   ├── Navigation
│   │   ├── file-tree.tsx
│   │   └── tree.tsx
│   │
│   ├── SEO & Media
│   │   ├── json-ld.tsx
│   │   └── video.tsx
│   │
│   ├── Certification
│   │   └── certification-badge.tsx
│   │
│   ├── Utilities
│   │   └── mdx-components.tsx
│   │
│   └── __tests__/              ← 26 Jest + React Testing Library test files
│       ├── accordion.test.tsx
│       ├── alert.test.tsx
│       └── ...
│
└── jest.config.ts
```

## Workflow

1. **Develop** components in `src/`
2. **Test** with `pnpm --filter=@mdx-ui/registry test`
3. **Build registry** from repo root — `pnpm build:registry`
4. **Distribute** — CLI fetches from `/registry/mdx/*.json`

## Build Registry

Running `pnpm build:registry` from the repo root reads every `.tsx` in `src/`, converts it to a JSON registry file in `/registry/mdx/`, and regenerates `/registry/registry.json` (the component index).

```bash
pnpm build:registry
```

## Testing

Tests use Jest + React Testing Library + jsdom:

```bash
# Run all registry tests
pnpm --filter=@mdx-ui/registry test

# Watch mode
pnpm --filter=@mdx-ui/registry test --watch
```

26 components have test coverage. Tests verify rendering, prop variants, accessibility attributes, and interactive behavior.

## Math Primitives

`math-primitives.tsx` is the largest source file — 150+ exported JSX components covering:

- **Basic** — `Expr`, `Frac`, `Pow`, `Sub`, `Sqrt`, `Abs`, `Paren`, `Brace`, `Deg`, `Inf`
- **Calculus** — `Integral`, `Sum`, `Prod`, `Lim`, `Deriv`, `PDeriv`, `Nabla`, `Differential`
- **Trig** — `Sin`–`Csc`, `ArcSin`–`ArcTan`, `Sinh`/`Cosh`/`Tanh`, `Log`/`Ln`/`Exp`
- **Algebra** — `Factorial`, `Choose`, `Perm`, `Mod`, `GCD`, `LCM`
- **Set Theory** — `Floor`, `Ceil`, `SetOf`, `Cardinality`, `PowerSet`, `Union`, `Intersect`
- **Number Systems** — `NN`, `ZZ`, `QQ`, `RR`, `CC`, `FF`, `Complex`, `Conj`
- **Logic** — `And`, `Or`, `Not`, `ForAll`, `Exists`, `Implies`, `Iff`, `Therefore`, `QED`
- **Linear Algebra** — `Vec`, `Norm`, `Dot`, `Cross`, `Transpose`, `Det`, `Matrix`
- **Statistics** — `Prob`, `Expected`, `Variance`, `StdDev`, `Cov`, `Corr`
- **Greek** — full alphabet (`Alpha`–`Omega`, upper and lower)
- **Relations/Arrows** — `Neq`, `Approx`, `Leq`, `Geq`, `PlusMinus`, `Arrow`, `MapsTo`

## Relationship to Root Registry

| Path | Purpose |
| ---- | ------- |
| `packages/registry/src/` | Source components — edit here |
| `registry/mdx/` | Generated JSON — do not edit manually |
| `registry/registry.json` | Component index — generated |

The CLI fetches from `/registry/mdx/` when users run `npx @ravikumarsurya/mdx-ui add <component>`.
