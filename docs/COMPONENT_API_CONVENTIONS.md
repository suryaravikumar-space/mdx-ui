# Component API Conventions

> This document is a binding decision record. Every component in DocsUI must follow these conventions. New components that violate these rules require an explicit justification and a docs update.
>
> **Why this exists:** AI agents generate MDX using these components. Inconsistent APIs cause generation errors. Consistent APIs mean an AI that learns one component can correctly infer the API of any other.

---

## 1. Prop Naming

### Variant system

Always `variant`. Never `tone`, `kind`, `type`, `mode`, `intent`, `appearance`, or `color` as the primary visual differentiator.

```tsx
// correct
<Callout variant="warning" />
<Alert variant="destructive" />
<Badge variant="success" />

// wrong
<Callout tone="warning" />
<Alert kind="error" />
<Badge appearance="green" />
```

### Size system

Always `size` with string literal values `"sm" | "md" | "lg"`. Default is always `"md"` when a size prop exists.

```tsx
<Badge size="sm" />
<Button size="lg" />
```

### Boolean props

Use bare boolean props (no explicit `={true}`). Name them as adjectives or past participles.

```tsx
// correct
<Accordion collapsible />
<Reveal defaultOpen />
<CodeBlock showLineNumbers />

// wrong
<Accordion isCollapsible={true} />
<Reveal startOpen />
<CodeBlock lineNumbers />
```

### Event handlers

Always `on{Event}` at the prop level. Never `handle{Event}`.

```tsx
// correct
<Tabs onValueChange={fn} />
<DataTable onRowClick={fn} />

// wrong
<Tabs handleChange={fn} />
<DataTable rowClickHandler={fn} />
```

### Content slots

Primary content is always `children`. Named content slots use descriptive noun props.

```tsx
// correct — primary content via children
<Callout>This is the message.</Callout>

// correct — named slot as prop
<Callout title="Warning" icon={<WarningIcon />}>
  This is the message.
</Callout>

// wrong — named slot for primary content
<Callout content="This is the message." />
```

### Labels and display text

Always `label` for the visible text on an interactive trigger. Always `title` for a heading-level display string above content.

```tsx
<Reveal label="Show solution" />        // trigger button text
<Callout title="Important" />           // heading above content
<Definition term="Invariant" />         // the defined word (domain-specific: term)
```

---

## 2. Component Structure

### Always use `React.forwardRef`

Every component that renders a DOM element must use `React.forwardRef`. The ref type matches the root element.

```tsx
export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
    </div>
  ),
);
Callout.displayName = "Callout";
```

### Always set `displayName`

Every component and sub-component sets `displayName`. This makes React DevTools readable and error messages clear.

```tsx
Accordion.displayName = "Accordion";
AccordionItem.displayName = "AccordionItem";
AccordionTrigger.displayName = "AccordionTrigger";
```

### Spread remaining props

Always spread `...props` onto the root element after explicit prop destructuring. This allows `data-*`, `aria-*`, and `className` to pass through.

```tsx
export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ variant, title, children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(calloutVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  ),
);
```

### `className` is always the last merge

Use `cn()` from `@/lib/utils`. The consumer's `className` always wins — it is the last argument to `cn()`.

```tsx
className={cn("base-classes", variantClasses, className)}
```

---

## 3. Composition Patterns

### Compound components

Multi-part components use a compound pattern with a shared Context. The parent component provides state; children consume it via `useContext`.

Naming convention: `ComponentName` + `ComponentNamePart`.

```
Accordion / AccordionItem / AccordionTrigger / AccordionContent
Tabs / TabsList / TabsTrigger / TabsContent
Changelog / ChangelogEntry / ChangelogItem
```

### Simple components

Single-element components do not use compound patterns. Props carry all configuration.

```tsx
<Callout variant="warning" title="Note" icon={<Icon />}>content</Callout>
<Definition term="Invariant">content</Definition>
<Invariant complexity="O(log n)">content</Invariant>
```

### When to use compound vs simple

Use compound when the user needs to control the internal structure — reordering parts, inserting custom elements between parts, or conditionally rendering sub-components.

Use simple when the component has one primary content area and a fixed internal layout.

---

## 4. Styling Conventions

### Use design primitives from `@/lib/primitives`

Do not copy-paste Tailwind strings that exist in `primitives.ts`. Import and use them.

```tsx
import { focusRing, surface, transitions } from "@/lib/primitives"

// correct
className={cn(surface, focusRing, className)}

// wrong
className="rounded-lg border border-border bg-muted focus-visible:outline-none focus-visible:ring-2 ..."
```

### When to add a new primitive

A new primitive is justified only when:

1. The exact same Tailwind string appears in **five or more** components, AND
2. It represents a stable, named semantic concept

If a string appears in fewer than five places, inline it. Do not abstract for a single use case.

### Dark mode

Use Tailwind CSS variables (`text-foreground`, `bg-muted`, `border-border`) instead of hardcoded colours. These resolve correctly in both light and dark themes automatically.

```tsx
// correct — theme-aware
className = "text-foreground bg-muted border-border";

// wrong — hardcoded
className =
  "text-gray-900 bg-gray-100 border-gray-200 dark:text-white dark:bg-gray-800";
```

### `data-*` attributes on root elements

Every component adds a `data-{component-name}` attribute to its root element. This enables CSS targeting, testing hooks, and AI-readable structure.

```tsx
<div data-callout ...>
<div data-definition ...>
<div data-complexity-table ...>
```

---

## 5. Animation

Use `Collapse` from `@/lib/motion` for all show/hide transitions. Do not implement custom height animations.

```tsx
import { Collapse } from "@/lib/motion";

<Collapse open={isOpen}>
  <div className="py-4">{children}</div>
</Collapse>;
```

`Collapse` uses `aria-hidden={!open}`. When closed, content stays in the DOM but is hidden from assistive technology and not visible. Tests should check `aria-hidden` state, not DOM presence.

---

## 6. Accessibility

### Required on every interactive component

- `aria-expanded` on trigger buttons that show/hide content
- `aria-describedby` linking trigger to its controlled content when open
- `role="tooltip"` on popover content (Annotation, Term)
- Keyboard dismissal: Escape closes all popover-style components
- Click-outside dismissal: `mousedown` listener on `document` when popover is open

### Focus management

- All interactive elements use `focusRing` from primitives
- Tab order must be logical — follow DOM order
- Popovers do not steal focus on open (they are supplementary, not modal)

### No ARIA anti-patterns

- Do not use `aria-label` on elements that have visible text children
- Do not use `role="button"` on `<div>` — use `<button>` elements
- Do not use `aria-hidden` on interactive elements

---

## 7. Framework Neutrality

### No `"use client"` in source files

The `"use client"` directive is a Next.js App Router concern. It does not belong in the registry source. Consumers add it in their own `mdx-components.tsx` if needed.

### No framework imports

Components import only from React, `@/lib/utils`, `@/lib/primitives`, `@/lib/motion`, and `class-variance-authority`. No Next.js, Remix, Astro, or other framework APIs.

### No global CSS assumptions

Components do not rely on global styles. All styling is self-contained via Tailwind classes and CSS variables.

---

## 8. AI Authoring Compatibility

These conventions exist partly because AI agents generate MDX using these components. The rules below ensure AI-generated output is valid with no post-processing.

### Minimal required props

Every component must work with only `children` (and `term` for Definition). All other props are optional with sensible defaults. An AI agent must be able to produce a valid component with one prop.

```tsx
// must always work
<Callout>content</Callout>
<Reveal>content</Reveal>
<Definition term="BST">content</Definition>
<Invariant>content</Invariant>
```

### No ambiguous prop names

If two props could be confused, rename one. An AI agent has no context to resolve ambiguity — it will pick the wrong one.

### `whenToUse` and `whenNotToUse` in registry

Every component entry in `scripts/build-registry.ts` must have:

- `whenToUse` — one to three sentences on when this component is the right choice
- `whenNotToUse` — one to two sentences on when to use something else
- `example` — a minimal, copy-pasteable MDX snippet

These fields are output to `registry/mdx/*.json` and serve as the AI agent's reference when deciding which component to use.

---

## 9. Checklist for New Components

Before a component is merged:

- [ ] Uses `React.forwardRef` with correct ref type
- [ ] Sets `displayName`
- [ ] Spreads `...props` on root element
- [ ] Uses `cn()` with consumer `className` last
- [ ] Has `data-{name}` attribute on root
- [ ] Uses `focusRing` from primitives on interactive elements
- [ ] Has `aria-expanded` if it shows/hides content
- [ ] Closes on Escape if it has a popover
- [ ] No `"use client"` directive
- [ ] No framework imports
- [ ] Works with only required props (AI-minimal)
- [ ] Has a test file in `src/__tests__/`
- [ ] Has metadata in `scripts/build-registry.ts` with `whenToUse`, `whenNotToUse`, `example`
- [ ] Copied to `apps/www/components/mdx/`
- [ ] Imported in `apps/www/components/mdx-components.tsx`
- [ ] Registry rebuilt with `pnpm build:registry`
