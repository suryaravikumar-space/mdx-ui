# Component Names Reference: react.dev → mdx-ui

Complete mapping of all react.dev MDX components to our mdx-ui equivalents.

---

## ✅ IMPLEMENTED COMPONENTS (4)

| react.dev   | mdx-ui                       | Status  | Notes                    |
| ----------- | ---------------------------- | ------- | ------------------------ |
| `<Pitfall>` | `<Callout variant="danger">` | ✅ Done | Variant approach         |
| -           | `<CodeBlock>`                | ✅ Done | Our own implementation   |
| -           | `<Tabs>`                     | ✅ Done | Pure React (no Radix UI) |
| -           | `<Steps>`                    | ✅ Done | Numbered guide steps     |

---

## 📋 SIMPLE TEXT COMPONENTS

### Priority 1 - Essential ⭐⭐⭐

| react.dev      | mdx-ui        | Priority | Purpose               |
| -------------- | ------------- | -------- | --------------------- |
| `<Intro>`      | `<Lead>`      | ⭐⭐⭐   | Large intro paragraph |
| `<Recap>`      | `<Summary>`   | ⭐⭐⭐   | Section summary       |
| `<InlineCode>` | `<Highlight>` | ⭐⭐     | Inline code spans     |
| `<Link>`       | `<Link>`      | ⭐⭐     | Enhanced doc links    |

### Heading Components

| react.dev        | mdx-ui              | Priority | Purpose           |
| ---------------- | ------------------- | -------- | ----------------- |
| `<H1>` to `<H5>` | Auto-handled by MDX | -        | Auto anchor links |

---

## 🎨 CALLOUT/ALERT COMPONENTS

### Single Component with Variants Approach

| react.dev        | mdx-ui                        | Priority | Purpose                 |
| ---------------- | ----------------------------- | -------- | ----------------------- |
| `<Note>`         | `<Callout variant="info">`    | ✅ Done  | Information callouts    |
| `<Pitfall>`      | `<Callout variant="danger">`  | ✅ Done  | Warnings/gotchas        |
| `<Deprecated>`   | `<Callout variant="warning">` | ⭐       | Deprecation notices     |
| `<Canary>`       | `<Callout variant="default">` | ⭐       | Experimental features   |
| `<Experimental>` | `<Callout variant="success">` | ⭐       | Experimental APIs       |
| `<RC>`           | `<Callout variant="info">`    | ⭐       | Release candidate info  |
| `<NextMajor>`    | `<Callout variant="info">`    | ⭐       | Next version features   |
| `<RSC>`          | `<Callout variant="info">`    | ⭐       | React Server Components |

### Standalone Components

| react.dev         | mdx-ui    | Priority | Purpose                 |
| ----------------- | --------- | -------- | ----------------------- |
| `<Note>`          | `<Note>`  | ⭐⭐⭐   | Simple highlighted note |
| `<DeepDive>`      | `<Aside>` | ⭐⭐⭐   | Expandable deep content |
| `<SimpleCallout>` | `<Note>`  | ⭐⭐⭐   | Same as Note            |

### Badges

| react.dev             | mdx-ui                           | Priority | Purpose       |
| --------------------- | -------------------------------- | -------- | ------------- |
| `<CanaryBadge>`       | `<Badge variant="canary">`       | ⭐       | Inline badges |
| `<ExperimentalBadge>` | `<Badge variant="experimental">` | ⭐       | Inline badges |
| `<NextMajorBadge>`    | `<Badge variant="major">`        | ⭐       | Inline badges |
| `<RSCBadge>`          | `<Badge variant="rsc">`          | ⭐       | Inline badges |

---

## 💻 CODE COMPONENTS

### Priority 2 - Code Display ⭐⭐

| react.dev         | mdx-ui              | Priority | Purpose                   |
| ----------------- | ------------------- | -------- | ------------------------- |
| `<CodeBlock>`     | `<CodeBlock>`       | ✅ Done  | Syntax highlighting       |
| `<ConsoleBlock>`  | `<Console>`         | ⭐⭐⭐   | Console output            |
| `<TerminalBlock>` | `<Terminal>`        | ⭐⭐⭐   | CLI commands              |
| `<PackageImport>` | `<PackageInstall>`  | ⭐⭐     | Package manager commands  |
| `<CodeDiagram>`   | `<CodeWithDiagram>` | ⭐       | Code + visual diagram     |
| `<CodeStep>`      | `<CodeStep>`        | ⭐       | Step-by-step highlighting |

### Advanced Interactive

| react.dev                  | mdx-ui                     | Priority | Purpose                    |
| -------------------------- | -------------------------- | -------- | -------------------------- |
| `<Sandpack>`               | `<Sandbox>`                | ⭐       | Live code editor (complex) |
| `<SandpackWithHTMLOutput>` | `<Sandbox variant="html">` | ⭐       | HTML output preview        |

---

## 🎓 INTERACTIVE/LEARNING COMPONENTS

### Priority 4 - Advanced ⭐

| react.dev      | mdx-ui                 | Priority | Purpose                  |
| -------------- | ---------------------- | -------- | ------------------------ |
| `<Challenges>` | `<Challenge>`          | ⭐       | Exercise container       |
| `<Challenge>`  | `<Challenge.Problem>`  | ⭐       | Individual challenge     |
| `<Hint>`       | `<Challenge.Hint>`     | ⭐       | Challenge hints          |
| `<Solution>`   | `<Challenge.Solution>` | ⭐       | Challenge solutions      |
| `<Recipes>`    | `<Examples>`           | ⭐       | Code examples collection |

---

## 🖼️ VISUAL COMPONENTS

### Priority 3 - Visual ⭐⭐

| react.dev             | mdx-ui            | Priority | Purpose              |
| --------------------- | ----------------- | -------- | -------------------- |
| `<Diagram>`           | `<Diagram>`       | ⭐⭐     | Visual diagrams      |
| `<DiagramGroup>`      | `<Diagram.Group>` | ⭐⭐     | Grouped diagrams     |
| `<Illustration>`      | `<Image>`         | ⭐⭐     | Images with captions |
| `<IllustrationBlock>` | `<Image.Gallery>` | ⭐       | Image galleries      |
| `<Image>`             | `<Image>`         | ⭐⭐     | Enhanced images      |
| `<VideoPlayer>`       | `<Video>`         | ⭐       | Video embeds         |
| `<YouTubeIframe>`     | `<Video.YouTube>` | ⭐       | YouTube embeds       |

---

## 📐 LAYOUT COMPONENTS

| react.dev     | mdx-ui     | Priority | Purpose            |
| ------------- | ---------- | -------- | ------------------ |
| `<FullWidth>` | Not needed | -        | MDX handles layout |
| `<MaxWidth>`  | Not needed | -        | MDX handles layout |

---

## 🔗 NAVIGATION COMPONENTS

### Priority 2 - Navigation ⭐⭐

| react.dev            | mdx-ui                       | Priority | Purpose                 |
| -------------------- | ---------------------------- | -------- | ----------------------- |
| `<YouWillLearn>`     | `<LearnCard>`                | ⭐⭐⭐   | Learning objectives     |
| `<YouWillLearnCard>` | `<LearnCard>`                | ⭐⭐⭐   | Link cards with preview |
| `<LearnMore>`        | `<LearnCard variant="more">` | ⭐⭐     | Related resources       |
| `<InlineToc>`        | Auto-generated               | -        | Table of contents       |
| `<ReadBlogPost>`     | `<Link.Blog>`                | ⭐       | Blog post links         |

---

## 🎯 SPECIALTY COMPONENTS

### Content Cards

| react.dev      | mdx-ui                     | Priority | Purpose            |
| -------------- | -------------------------- | -------- | ------------------ |
| `<BlogCard>`   | `<Card variant="blog">`    | ⭐       | Blog post previews |
| `<TeamMember>` | `<Card variant="profile">` | ⭐       | Team profiles      |

### Utility Components

| react.dev            | mdx-ui     | Priority | Purpose        |
| -------------------- | ---------- | -------- | -------------- |
| `<ErrorDecoder>`     | Not needed | -        | React-specific |
| `<LanguageList>`     | Not needed | -        | React-specific |
| `<Math>` / `<MathI>` | `<Math>`   | ⭐       | Math notation  |

---

## 📦 FILE STRUCTURE COMPONENTS (NEW!)

| react.dev | mdx-ui              | Priority | Purpose             |
| --------- | ------------------- | -------- | ------------------- |
| -         | `<FileTree>`        | ⭐⭐⭐   | Directory structure |
| -         | `<FileTree.Folder>` | ⭐⭐⭐   | Folder in tree      |
| -         | `<FileTree.File>`   | ⭐⭐⭐   | File in tree        |

---

## 🎭 EXPANDABLE COMPONENTS

| react.dev             | mdx-ui                | Priority | Purpose             |
| --------------------- | --------------------- | -------- | ------------------- |
| `<ExpandableCallout>` | `<Aside>`             | ⭐⭐⭐   | Expandable sections |
| `<ExpandableExample>` | `<ExpandableSection>` | ⭐⭐     | Collapsible content |

---

## 📊 IMPLEMENTATION PHASES

### ✅ Phase 0: Done (4 components)

- Callout
- CodeBlock
- Tabs
- Steps

### ⭐⭐⭐ Phase 1: Essential (8 total - Add 4)

- Lead (Intro)
- Note (SimpleCallout)
- Summary (Recap)
- Aside (DeepDive)

### ⭐⭐ Phase 2: Code & Terminal (12 total - Add 4)

- LearnCard (YouWillLearn)
- Console (ConsoleBlock)
- Terminal (TerminalBlock)
- PackageInstall (PackageImport)

### ⭐⭐ Phase 3: Visual & Layout (16 total - Add 4)

- FileTree (NEW)
- ExpandableSection (ExpandableExample)
- Diagram
- Image

### ⭐ Phase 4: Advanced (20+ total - Add 4+)

- Sandbox (Sandpack)
- Challenge (Challenges)
- Video (VideoPlayer)
- Badge (various badge components)

---

## 🎨 NAMING PHILOSOPHY

### Why We Changed Names

| react.dev     | mdx-ui             | Reason                           |
| ------------- | ------------------ | -------------------------------- |
| Intro         | **Lead**           | More universal term (journalism) |
| DeepDive      | **Aside**          | Semantic HTML term               |
| Recap         | **Summary**        | Clearer, more universal          |
| YouWillLearn  | **LearnCard**      | Shorter, less prescriptive       |
| SimpleCallout | **Note**           | Simpler name                     |
| ConsoleBlock  | **Console**        | Remove redundant "Block"         |
| TerminalBlock | **Terminal**       | Remove redundant "Block"         |
| PackageImport | **PackageInstall** | More accurate                    |

### Why We Kept Names

| Component | Reason               |
| --------- | -------------------- |
| Callout   | Clear and common     |
| CodeBlock | Standard terminology |
| Tabs      | Universal UI pattern |
| Steps     | Self-explanatory     |
| Diagram   | Universal term       |
| Image     | Standard HTML        |
| Video     | Standard HTML        |

---

## 🔄 VARIANT STRATEGY

Instead of separate components, we use **variants** for related purposes:

### Callout Variants

```typescript
variant: "default" | "info" | "warning" | "danger" | "success";
```

**Replaces**:

- Note → info variant
- Pitfall → danger variant
- Deprecated → warning variant
- Experimental → success variant
- Canary → default variant

### Badge Variants

```typescript
variant: "default" | "canary" | "experimental" | "major" | "rsc";
```

**Replaces**:

- CanaryBadge
- ExperimentalBadge
- NextMajorBadge
- RSCBadge

### LearnCard Variants

```typescript
variant: "learn" | "more";
```

**Replaces**:

- YouWillLearn → learn variant
- LearnMore → more variant

---

## 📝 QUICK REFERENCE TABLE

### Complete Alphabetical List

| A-E | react.dev         | mdx-ui                       |
| --- | ----------------- | ---------------------------- |
| ✓   | Canary            | Callout variant="default"    |
| ✓   | CanaryBadge       | Badge variant="canary"       |
| ✓   | Challenge         | Challenge.Problem            |
| ✓   | Challenges        | Challenge                    |
| ✓   | CodeBlock         | CodeBlock ✅                 |
| ✓   | CodeDiagram       | CodeWithDiagram              |
| ✓   | CodeStep          | CodeStep                     |
| ✓   | ConsoleBlock      | Console                      |
| ✓   | DeepDive          | Aside                        |
| ✓   | Deprecated        | Callout variant="warning"    |
| ✓   | Diagram           | Diagram                      |
| ✓   | DiagramGroup      | Diagram.Group                |
| ✓   | ErrorDecoder      | Not needed                   |
| ✓   | Experimental      | Callout variant="success"    |
| ✓   | ExperimentalBadge | Badge variant="experimental" |

| F-N | react.dev         | mdx-ui                         |
| --- | ----------------- | ------------------------------ |
| -   | -                 | FileTree (NEW)                 |
| ✓   | FullWidth         | Not needed                     |
| ✓   | Hint              | Challenge.Hint                 |
| ✓   | Illustration      | Image                          |
| ✓   | IllustrationBlock | Image.Gallery                  |
| ✓   | Image             | Image                          |
| ✓   | InlineCode        | Highlight                      |
| ✓   | InlineToc         | Auto-generated                 |
| ✓   | Intro             | Lead                           |
| ✓   | LanguageList      | Not needed                     |
| ✓   | LearnMore         | LearnCard variant="more"       |
| ✓   | Link              | Link                           |
| ✓   | Math / MathI      | Math                           |
| ✓   | MaxWidth          | Not needed                     |
| ✓   | NextMajor         | Callout variant="info"         |
| ✓   | NextMajorBadge    | Badge variant="major"          |
| ✓   | Note              | Note or Callout variant="info" |

| P-Z | react.dev        | mdx-ui                      |
| --- | ---------------- | --------------------------- |
| ✓   | PackageImport    | PackageInstall              |
| ✓   | Pitfall          | Callout variant="danger" ✅ |
| ✓   | RC               | Callout variant="info"      |
| ✓   | ReadBlogPost     | Link.Blog                   |
| ✓   | Recap            | Summary                     |
| ✓   | Recipes          | Examples                    |
| ✓   | RSC              | Callout variant="info"      |
| ✓   | RSCBadge         | Badge variant="rsc"         |
| ✓   | Sandpack         | Sandbox                     |
| ✓   | SimpleCallout    | Note                        |
| ✓   | Solution         | Challenge.Solution          |
| -   | -                | Steps ✅ (NEW)              |
| -   | -                | Tabs ✅ (NEW)               |
| ✓   | TerminalBlock    | Terminal                    |
| ✓   | VideoPlayer      | Video                       |
| ✓   | YouWillLearn     | LearnCard                   |
| ✓   | YouWillLearnCard | LearnCard                   |
| ✓   | YouTubeIframe    | Video.YouTube               |

---

## 🎯 TOTAL COMPONENT COUNT

| Category        | react.dev | mdx-ui | Strategy                             |
| --------------- | --------- | ------ | ------------------------------------ |
| **Text**        | 7         | 4      | Simpler                              |
| **Callouts**    | 12        | 3      | Variants                             |
| **Code**        | 8         | 6      | Similar                              |
| **Interactive** | 7         | 1      | Simplified                           |
| **Visual**      | 6         | 4      | Similar                              |
| **Navigation**  | 5         | 1      | Variants                             |
| **Specialty**   | 7         | 2      | Selective                            |
| **Layout**      | 2         | 0      | Not needed                           |
| **NEW**         | -         | 3      | FileTree, etc                        |
| **TOTAL**       | ~54       | ~24    | **Half the components, same power!** |

---

## 📌 NOTES

1. **Variant Strategy**: We reduce component count by using variants where react.dev has separate components
2. **Simpler API**: Fewer components = easier to learn and maintain
3. **Universal Names**: Our names work for any documentation, not just React
4. **No Framework Lock-in**: All components work with any MDX setup
5. **Pure Implementation**: No dependencies like Radix UI
6. **Dark Theme First**: Built-in theme support from day one

---

## 🚀 NEXT STEPS

**Immediate Priority** (Phase 1):

1. Lead
2. Note
3. Summary
4. Aside

**After that** (Phase 2): 5. LearnCard 6. Console 7. Terminal 8. PackageInstall

This gets us to **12 components** total - ready for v0.2.0 launch! 🎉
