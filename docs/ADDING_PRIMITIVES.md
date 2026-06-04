# Adding a New Math Primitive

When you add a new primitive component (e.g. `<Plus />`), update these 6 files in order, then run the registry build:

---

## 1. `packages/registry/src/math-primitives.tsx`

The source of truth. Add the export using `mkSym`:

```tsx
/** + — addition / unary plus. */
export const Plus = mkSym("+", "plus", "mx-1");
```

---

## 2. `apps/www/components/mdx/math-primitives.tsx`

Local copy used by the www app. Mirror the exact same export here.

```tsx
export const Plus = mkSym("+", "plus", "mx-1");
```

---

## 3. `apps/www/components/mdx-components.tsx`

Two places in this file — both the import block and the component map:

```tsx
// import block (alphabetical)
import {
  Plus,
  ...
} from "@/components/mdx/math-primitives"

// component map (alphabetical)
export const components = {
  Plus,
  ...
}
```

---

## 4. `apps/www/lib/playground-components.tsx`

Same pattern as mdx-components — add to the import block and the `PLAYGROUND_COMPONENTS` map so the live playground can render it:

```tsx
import { Plus, ... } from "@/components/mdx/math-primitives";

export const PLAYGROUND_COMPONENTS = {
  Plus,
  ...
};
```

---

## 5. `apps/www/components/symbol-browser.tsx`

Add an entry with a live preview:

```tsx
{
  component: "Plus",
  category: "school",        // pick the right category
  usage: "<Plus />",
  description: "Plus sign +",
  preview: <P.Plus />,
},
```

---

## 6. `packages/cli/src/commands/mcp.ts`

Add to the `ALLOWED_COMPONENTS` Set so `validate_mdx` accepts it:

```ts
const ALLOWED_COMPONENTS = new Set([
  ...
  "Plus",
  ...
]);
```

---

## 7. `packages/cli/src/symbol-map.ts`

Add an entry to `SYMBOL_MAP` so it appears in `search_symbols`, `get_symbol_cheatsheet`, and the AI output standard:

```ts
{
  name: "plus / addition / unary plus",
  category: "arithmetic",
  symbols: ["+"],
  latex: ["+"],
  component: "Plus",
  usage: "<Plus />",
  description: "Plus sign +",
},
```

---

## 8. Rebuild the registry

Run this from the repo root after all changes:

```bash
pnpm build:registry
```

This regenerates `registry/mdx/math-primitives.json` (and `registry.json`) from the source in `packages/registry/src/math-primitives.tsx`. Without this step the CLI installer and remote consumers will serve stale code.

---

## Checklist

- [ ] `packages/registry/src/math-primitives.tsx` — add `mkSym` export
- [ ] `apps/www/components/mdx/math-primitives.tsx` — mirror export
- [ ] `apps/www/components/mdx-components.tsx` — import + component map
- [ ] `apps/www/lib/playground-components.tsx` — import + PLAYGROUND_COMPONENTS map
- [ ] `apps/www/components/symbol-browser.tsx` — browser entry with preview
- [ ] `packages/cli/src/commands/mcp.ts` — `ALLOWED_COMPONENTS`
- [ ] `packages/cli/src/symbol-map.ts` — `SYMBOL_MAP` entry
- [ ] `pnpm build:registry` — regenerate registry JSON
