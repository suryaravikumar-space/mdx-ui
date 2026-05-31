# Scripts

This directory contains build scripts that automate code generation for mdx-ui.

## Scripts Overview

| Script | Location | Command |
| ------ | -------- | ------- |
| `build-registry.ts` | `scripts/` | `pnpm build:registry` |
| `build-previews.ts` | `apps/www/scripts/` | runs automatically before `dev` and `build` |

---

## `build-registry.ts`

Generates the `/registry/` folder from `/packages/registry/src/`, eliminating manual duplication.

### How It Works

1. Reads all `.tsx` files from `/packages/registry/src/` (52 components)
2. Generates individual JSON files in `/registry/mdx/*.json`
3. Generates the master index `/registry/registry.json`
4. Computes a `sha256` integrity hash per component file

### Usage

```bash
pnpm build:registry
```

### Component Metadata

Each component entry in `build-registry.ts` has:

```typescript
"component-name": {
  description: "What it renders",
  whenToUse: "Guidance on appropriate use",
  whenNotToUse: "What to avoid",
  example: "<Component ... />",
  dependencies: ["npm-package"],        // optional
  registryDependencies: ["utils"],      // other mdx-ui components needed
}
```

### Adding a New Component

1. Create the source file in `/packages/registry/src/new-component.tsx`
2. Add its metadata entry in `scripts/build-registry.ts`
3. Run `pnpm build:registry`
4. Commit both the source file and the generated JSON

---

## `apps/www/scripts/build-previews.ts`

Generates `apps/www/components/demo-sources.generated.ts` — the syntax-highlighted source map used by the `<Demo>` widget in the docs.

### How It Works

1. Reads all `*.tsx` files from `apps/www/components/demos/`
2. Highlights each file with Shiki (dual theme: `github-dark` / `github-light`)
3. Writes `DEMO_SOURCES` map to `demo-sources.generated.ts`

### When It Runs

Automatically before `dev` and `build` via `predev` / `prebuild` hooks in `apps/www/package.json`. Run manually if you add a new demo file mid-session:

```bash
cd apps/www && pnpm tsx scripts/build-previews.ts
```

### Adding a Demo

1. Create `apps/www/components/demos/my-component-default.tsx`
2. Add `<Demo name="my-component-default" />` to the component's `.mdx` docs page
3. Run `build-previews` — or just restart `dev` (it runs automatically)

---

## File Structure

```
mdx-ui/
├── scripts/
│   ├── build-registry.ts      ← Generates registry JSON from source
│   └── README.md
│
├── packages/registry/src/     ← Source of truth (52 components) — edit here
│   ├── math-primitives.tsx
│   ├── callout.tsx
│   └── ...
│
├── registry/                  ← Auto-generated — do not edit manually
│   ├── mdx/
│   │   ├── math-primitives.json
│   │   ├── callout.json
│   │   └── ...  (52 files)
│   └── registry.json
│
└── apps/www/
    ├── scripts/
    │   └── build-previews.ts  ← Generates demo source map
    ├── components/demos/      ← Demo files for <Demo> widget
    │   ├── callout-default.tsx
    │   └── ...  (46 demos)
    └── components/
        └── demo-sources.generated.ts  ← Auto-generated — do not edit
```

## Troubleshooting

### Component not appearing in CLI

1. Check the source file exists in `/packages/registry/src/`
2. Check metadata entry exists in `scripts/build-registry.ts`
3. Run `pnpm build:registry`

### Demo not showing in docs

1. Check demo file exists in `apps/www/components/demos/`
2. Check `<Demo name="...">` is in the `.mdx` file
3. Run `cd apps/www && pnpm tsx scripts/build-previews.ts`

### JSON parse error in registry

Never edit files in `/registry/mdx/` directly — always edit the source in `/packages/registry/src/` and regenerate with `pnpm build:registry`.
