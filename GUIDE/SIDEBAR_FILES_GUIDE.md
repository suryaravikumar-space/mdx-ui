# Sidebar JSON Files Guide

## 📁 File Structure (react.dev Pattern)

Following react.dev's multi-sidebar approach:

```
apps/www/config/
├── sidebar-docs.json       → Documentation (/docs)
├── sidebar-learn.json      → Learn section (/learn)
├── sidebar-reference.json  → API Reference (/reference)
├── sidebar-blog.json       → Blog (/blog)
├── sidebar-community.json  → Community (/community)
└── sidebars.ts            → Central exports & utilities
```

## 🎯 Purpose of Each File

### 1. sidebar-docs.json

**Current Status:** ✅ Active (controls /docs sidebar)
**Purpose:** Main documentation navigation
**Sections:**

- Getting Started
- Components

**Used by:** `/docs` routes

### 2. sidebar-learn.json

**Current Status:** ⏳ Template created
**Purpose:** Tutorial and learning content
**Sections:**

- Get Started
- Learn DocsUI
- Building Your Docs
- Advanced

**Future routes:** `/learn/*`

### 3. sidebar-reference.json

**Current Status:** ⏳ Template created
**Purpose:** API reference documentation
**Sections:**

- DocsUI CLI
- Typography Components
- Code Components
- Interactive Components
- Media & Layout
- Utilities

**Future routes:** `/reference/*`

### 4. sidebar-blog.json

**Current Status:** ⏳ Template created
**Purpose:** Blog post navigation
**Sections:**

- 2025
- 2024

**Features:** Includes `date` and `author` metadata

**Future routes:** `/blog/*`

### 5. sidebar-community.json

**Current Status:** ⏳ Template created
**Purpose:** Community resources
**Sections:**

- Get Involved
- Community Resources (external links)
- Acknowledgements

**Features:** Supports `external: true` for external links

**Future routes:** `/community/*`

## 📊 Comparison with react.dev

| File                  | react.dev             | Your Project           | Status                            |
| --------------------- | --------------------- | ---------------------- | --------------------------------- |
| **Home sidebar**      | sidebarHome.json      | -                      | Not needed (use homepage instead) |
| **Learn sidebar**     | sidebarLearn.json     | sidebar-learn.json     | ✅ Created                        |
| **Reference sidebar** | sidebarReference.json | sidebar-reference.json | ✅ Created                        |
| **Community sidebar** | sidebarCommunity.json | sidebar-community.json | ✅ Created                        |
| **Blog sidebar**      | sidebarBlog.json      | sidebar-blog.json      | ✅ Created                        |
| **Docs sidebar**      | -                     | sidebar-docs.json      | ✅ Active                         |

## 🔧 How to Use

### Option 1: Import specific sidebar

```typescript
import { sidebarLearn } from "@/config/sidebars";

// Use in component
<Sidebar routes={sidebarLearn.routes} />
```

### Option 2: Auto-select by pathname

```typescript
import { getSidebarByPath } from "@/config/sidebars";

// In component
const pathname = usePathname();
const sidebar = getSidebarByPath(pathname);
```

## 📝 JSON Schema

### Basic Structure

```json
{
  "title": "Section Title",
  "path": "/base-path",
  "routes": [
    // Routes array
  ]
}
```

### Route Types

#### 1. Section Header

```json
{
  "hasSectionHeader": true,
  "sectionHeader": "SECTION NAME"
}
```

#### 2. Simple Page

```json
{
  "title": "Page Title",
  "path": "/page-path"
}
```

#### 3. Page with Nested Routes

```json
{
  "title": "Parent Page",
  "path": "/parent",
  "routes": [
    {
      "title": "Child Page",
      "path": "/parent/child"
    }
  ]
}
```

#### 4. External Link

```json
{
  "title": "GitHub",
  "path": "https://github.com/...",
  "external": true
}
```

#### 5. Blog Post (with metadata)

```json
{
  "title": "Blog Post Title",
  "path": "/blog/2025/01/post-slug",
  "date": "January 31, 2025",
  "author": "Author Name"
}
```

## 🎨 Example: sidebar-learn.json

```json
{
  "title": "Learn",
  "path": "/learn",
  "routes": [
    {
      "hasSectionHeader": true,
      "sectionHeader": "Get Started"
    },
    {
      "title": "Quick Start",
      "path": "/learn"
    },
    {
      "title": "Installation",
      "path": "/learn/installation",
      "routes": [
        {
          "title": "Next.js",
          "path": "/learn/installation/next-js"
        },
        {
          "title": "Vite",
          "path": "/learn/installation/vite"
        }
      ]
    }
  ]
}
```

## 🚀 Adding a New Section

### Step 1: Create sidebar JSON

Create `apps/www/config/sidebar-examples.json`:

```json
{
  "title": "Examples",
  "path": "/examples",
  "routes": [
    {
      "hasSectionHeader": true,
      "sectionHeader": "Templates"
    },
    {
      "title": "Documentation Site",
      "path": "/examples/docs-site"
    }
  ]
}
```

### Step 2: Export from sidebars.ts

```typescript
import sidebarExamples from "./sidebar-examples.json";

export { sidebarExamples };

// Add to getSidebarByPath
export function getSidebarByPath(pathname: string): SidebarConfig {
  if (pathname.startsWith("/examples")) {
    return sidebarExamples as SidebarConfig;
  }
  // ... existing code
}
```

### Step 3: Create layout (if needed)

Create `apps/www/app/examples/layout.tsx`:

```tsx
import { ExamplesSidebar } from "@/components/examples-sidebar";

export default function ExamplesLayout({ children }) {
  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)]">
      <aside>
        <ExamplesSidebar />
      </aside>
      {children}
    </div>
  );
}
```

## 📐 Current File Status

### ✅ Active (In Use)

- **sidebar-docs.json** - Controls `/docs` navigation
  - Loaded by: `lib/docs-nav.ts`
  - Used by: `components/docs-sidebar.tsx`
  - Routes: /docs, /docs/components/\*

### ⏳ Templates (Ready to Use)

- **sidebar-learn.json** - Ready for `/learn` section
- **sidebar-reference.json** - Ready for `/reference` section
- **sidebar-blog.json** - Ready for `/blog` section
- **sidebar-community.json** - Ready for `/community` section

To activate these:

1. Create corresponding MDX files
2. Create layout pages
3. Update navigation links

## 🔗 Integration Points

### In Components

```tsx
// components/docs-sidebar.tsx
import { docsNav } from "@/lib/docs-nav";

export function DocsSidebar() {
  return <SidebarNav routes={docsNav.routes} />;
}
```

### In Utilities

```typescript
// lib/docs-nav.ts
import { sidebarDocs } from "@/config/sidebars";

export const docsNav = sidebarDocs;
export function getAllRoutes() {
  /* ... */
}
export function getBreadcrumbs() {
  /* ... */
}
```

### Dynamic Sidebar Selection

```tsx
// Future: components/dynamic-sidebar.tsx
import { getSidebarByPath } from "@/config/sidebars";
import { usePathname } from "next/navigation";

export function DynamicSidebar() {
  const pathname = usePathname();
  const sidebar = getSidebarByPath(pathname);

  return <SidebarNav routes={sidebar.routes} />;
}
```

## 🎯 Benefits

1. **Separation of Concerns** - Each section has its own navigation
2. **Scalability** - Easy to add new sections
3. **Maintainability** - JSON is easy to edit
4. **Type Safety** - TypeScript interfaces ensure correctness
5. **Git Friendly** - Clear diffs when navigation changes
6. **React.dev Pattern** - Industry-proven approach

## 📚 Related Files

- **sidebars.ts** - Central exports and utilities
- **lib/docs-nav.ts** - Navigation utilities for docs
- **components/docs-sidebar.tsx** - Sidebar renderer
- **NAVIGATION_SYSTEM.md** - Overall navigation guide

## 🔜 Next Steps

To activate other sections:

1. **Learn Section**
   - Create `/apps/www/content/learn/*.mdx` files
   - Create `/apps/www/app/learn/layout.tsx`
   - Add navigation link in header

2. **Reference Section**
   - Mirror component docs structure
   - Create API reference pages
   - Add to header navigation

3. **Blog Section**
   - Create blog post MDX files
   - Add blog layout with date/author
   - Create blog index page

4. **Community Section**
   - Create community pages
   - Add contributing guide
   - Link to external resources

## 💡 Tips

- Keep sidebar files flat (don't nest too deeply)
- Use descriptive section headers
- Order pages logically (basics → advanced)
- Include external links where appropriate
- Add metadata (dates, authors) for blog posts
- Test navigation after changes

---

**Current Status:** All sidebar JSON files created following react.dev pattern. Ready to expand beyond `/docs` section! 🚀
