# MDX Documentation System Guide

## ✅ What We Built

A complete MDX-based documentation system following the **react.dev** pattern with:

- **Contentlayer** for MDX processing
- **Auto-generated TOC** from headings
- **JSON frontmatter** for metadata
- **Left sidebar** navigation
- **Right sidebar** table of contents
- **Dynamic routes** for components

## 📁 File Structure

```
apps/www/
├── content/
│   ├── docs/
│   │   └── index.mdx              # Introduction page
│   └── components/
│       ├── blockquote.mdx         # Component documentation
│       ├── callout.mdx
│       └── steps.mdx
│
├── components/
│   ├── mdx/                       # Actual MDX components
│   │   ├── blockquote.tsx
│   │   ├── callout.tsx
│   │   └── steps.tsx
│   ├── mdx-components.tsx         # MDX provider with all components
│   ├── sidebar-nav.tsx            # Left sidebar navigation
│   └── toc.tsx                    # Right sidebar TOC
│
├── app/
│   ├── docs/
│   │   ├── layout.tsx             # Docs layout with left sidebar
│   │   ├── page.tsx               # Docs index (renders index.mdx)
│   │   └── components/
│   │       └── [...slug]/
│   │           └── page.tsx       # Dynamic component pages
│   └── page.tsx                   # Homepage
│
├── config/
│   └── docs.ts                    # Navigation configuration
│
├── lib/
│   ├── utils.ts                   # cn() utility
│   └── toc.ts                     # TOC extraction utility
│
└── contentlayer.config.ts         # Contentlayer configuration
```

## 🎯 How It Works

### 1. MDX Files with Frontmatter

Each component has an MDX file with JSON frontmatter:

```mdx
---
title: Blockquote
description: Styled quote blocks with optional citation
component: blockquote
published: true
---

import { Blockquote } from "@/components/mdx/blockquote";

## Installation

Install the component using the CLI:

\`\`\`bash
npx mdx-ui add blockquote
\`\`\`

## Examples

<div className="preview">
  <Blockquote>This is a blockquote</Blockquote>
</div>
```

### 2. Contentlayer Processing

**contentlayer.config.ts** defines two document types:

- **Component** - Component documentation (`content/components/**/*.mdx`)
- **Doc** - General docs (`content/docs/**/*.mdx`)

Contentlayer automatically:

- Parses frontmatter
- Compiles MDX to React components
- Generates TypeScript types
- Creates `allComponents` and `allDocs` arrays

### 3. Dynamic Routing

**app/docs/components/[...slug]/page.tsx**:

```tsx
export default async function ComponentPage({ params }) {
  const component = allComponents.find(
    (c) => c.slugAsParams === params.slug.join("/"),
  );

  const toc = getTableOfContents(component.body.raw);

  return (
    <div>
      <Mdx code={component.body.code} />
      <TableOfContents toc={toc} />
    </div>
  );
}
```

### 4. Auto-Generated TOC

**lib/toc.ts** extracts headings from MDX:

```ts
export function getTableOfContents(content: string): TocEntry[] {
  const headingLines = content.split("\n").filter((line) => {
    return line.match(/^#{2,3}\s/);
  });

  return headingLines.map((heading) => ({
    id: slugify(heading),
    text: heading.replace(/^#+\s/, ""),
    level: heading.match(/^#+/)?.[0].length || 0,
  }));
}
```

### 5. MDX Components Provider

**components/mdx-components.tsx** provides all components to MDX:

```tsx
const components = {
  Blockquote,
  Callout,
  Steps,
  // Also overrides default HTML elements
  h2: ({ ...props }) => <h2 className="..." {...props} />,
  code: ({ ...props }) => <code className="..." {...props} />,
  // Custom div handler for previews
  div: ({ className, ...props }) => {
    if (className === "preview") {
      return <div className="preview-card" {...props} />;
    }
    return <div className={className} {...props} />;
  },
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
```

## 🚀 How to Add New Components

### Step 1: Create MDX Documentation

Create `content/components/my-component.mdx`:

```mdx
---
title: My Component
description: A great new component
component: my-component
published: true
dependencies: ["some-package"]
registryDependencies: ["utils"]
---

import { MyComponent } from "@/components/mdx/my-component";

## Installation

\`\`\`bash
npx mdx-ui add my-component
\`\`\`

## Usage

<div className="preview">
  <MyComponent>Hello</MyComponent>
</div>
```

### Step 2: Copy Component File

```bash
cp packages/registry/src/my-component.tsx apps/www/components/mdx/
```

### Step 3: Add to MDX Provider

Edit `components/mdx-components.tsx`:

```tsx
import { MyComponent } from "@/components/mdx/my-component";

const components = {
  // ... existing
  MyComponent,
};
```

### Step 4: Update Navigation

Edit `config/docs.ts`:

```ts
{
  title: "My Component",
  href: "/docs/components/my-component",
}
```

**That's it!** Contentlayer will:

- Automatically detect the new MDX file
- Generate types for it
- Make it available at `/docs/components/my-component`
- Auto-generate the TOC

## 🎨 Preview Styling

Use `<div className="preview">` for component previews:

```mdx
<div className="preview">
  <Blockquote>This will be styled in a card</Blockquote>
</div>
```

The MDX provider renders this as:

```tsx
<div className="my-6 rounded-lg border bg-card p-6">
  <Blockquote>This will be styled in a card</Blockquote>
</div>
```

## 📊 Data Flow

```
MDX File (content/components/blockquote.mdx)
  ↓
Contentlayer (contentlayer.config.ts)
  ↓
Generated Types (.contentlayer/generated)
  ↓
allComponents array
  ↓
Dynamic Page (app/docs/components/[...slug]/page.tsx)
  ↓
Mdx Component (components/mdx-components.tsx)
  ↓
Rendered with TOC
```

## 🔄 Development Workflow

1. **Edit MDX file** - Make changes to `content/components/*.mdx`
2. **Contentlayer watches** - Automatically regenerates on save
3. **Hot reload** - Next.js dev server updates instantly
4. **TOC updates** - Table of contents regenerated automatically

## 📝 Frontmatter Schema

### Component Documents

```yaml
---
title: string # Component name
description: string # Short description
component: string # Component identifier
published: boolean # Whether to show in docs
dependencies: string[] # npm packages (optional)
registryDependencies: string[] # Other components (optional)
---
```

### Doc Documents

```yaml
---
title: string # Page title
description: string # Page description
published: boolean # Whether to show
---
```

## 🎯 URLs

The URL structure is automatically generated:

- `content/docs/index.mdx` → `/docs`
- `content/docs/installation.mdx` → `/docs/installation`
- `content/components/blockquote.mdx` → `/docs/components/blockquote`
- `content/components/code-block.mdx` → `/docs/components/code-block`

## 🔧 Configuration

### Contentlayer

**contentlayer.config.ts** configures:

- MDX plugins (rehype-pretty-code, rehype-slug, etc.)
- Syntax highlighting theme
- Document type definitions
- Computed fields (slug, slugAsParams)

### Navigation

**config/docs.ts** manages:

- Main navigation
- Sidebar structure
- Component grouping

## ✅ Benefits

1. **Easy Maintenance** - Just edit MDX files
2. **Type Safety** - Contentlayer generates TypeScript types
3. **Auto TOC** - No manual TOC management
4. **Hot Reload** - Instant preview of changes
5. **Searchable** - Can easily add search using allComponents data
6. **Portable** - MDX files can be used elsewhere
7. **Version Control** - Git-friendly markdown format

## 🚀 Testing

The dev server is running at **http://localhost:3000**

Test URLs:

- http://localhost:3000/docs
- http://localhost:3000/docs/components/blockquote
- http://localhost:3000/docs/components/callout
- http://localhost:3000/docs/components/steps

## 📦 What's Generated

Contentlayer creates `.contentlayer/generated/` with:

- **Component.json** - All component documents
- **Doc.json** - All doc documents
- **types.ts** - TypeScript types
- **index.mjs** - JavaScript exports with `allComponents`, `allDocs`

## 🎉 Success!

You now have a fully functional MDX-based documentation system that:

- ✅ Renders MDX files
- ✅ Auto-generates TOC
- ✅ Has left and right sidebars
- ✅ Supports live component previews
- ✅ Is easy to maintain
- ✅ Follows industry best practices (react.dev pattern)

To add all remaining components, just create MDX files for them following the same pattern!
