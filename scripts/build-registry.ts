#!/usr/bin/env node

import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

function integrity(content: string): string {
  return `sha256-${crypto.createHash("sha256").update(content).digest("base64")}`;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Component metadata - describes each component
const componentsMetadata: Record<
  string,
  {
    description: string;
    whenToUse: string;
    whenNotToUse: string;
    example: string;
    dependencies?: string[];
    registryDependencies?: string[];
  }
> = {
  alert: {
    description:
      "Semantic alert boxes with role='alert' and info/warning/destructive/success variants",
    whenToUse:
      "Use for system-level feedback requiring immediate attention — form errors, operation results, destructive-action warnings.",
    whenNotToUse:
      "Do not use for general information or tips — use Callout instead. Alert implies the reader must act or be immediately aware.",
    example:
      '<Alert variant="destructive">\n  <AlertTitle>Error</AlertTitle>\n  <AlertDescription>Your session has expired. Please sign in again.</AlertDescription>\n</Alert>',
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  accordion: {
    description:
      "Collapsible accordion sections with single or multiple open items — animated via CSS grid-template-rows",
    whenToUse:
      "Use when presenting multiple related sections where the reader may expand one at a time. Good for FAQs, reference lists, and grouped details.",
    whenNotToUse:
      "Do not use for a single collapsible item — use Reveal or Spoiler instead. Do not use for navigation menus.",
    example:
      '<Accordion>\n  <AccordionItem value="q1">\n    <AccordionTrigger>What is an invariant?</AccordionTrigger>\n    <AccordionContent>A condition that holds true before and after every operation.</AccordionContent>\n  </AccordionItem>\n</Accordion>',
    dependencies: [],
    registryDependencies: ["utils"],
  },
  "certification-badge": {
    description:
      "Compliance certification display — renders ISO, TISAX, SOC 2, and similar certification chips with status indicators (active, pending, expired)",
    whenToUse:
      "Use at the top of a compliance, privacy, or security section to establish trust context at a glance. Good for ISO 27001, TISAX, SOC 2, GDPR, and other certifications.",
    whenNotToUse:
      "Do not use for generic labels or version tags — use Badge instead. Do not misrepresent certification status.",
    example:
      '<CertificationBadge\n  certs={[\n    { name: "ISO 27001:2022", scope: "Information Security Management", year: 2023, status: "active" },\n    { name: "TISAX", scope: "Automotive Information Security", status: "active" },\n  ]}\n/>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "data-type-table": {
    description:
      "AI/ML numeric data type and tensor specification table — documents hardware-supported types (INT8, FP16, BF16, FP32) with bits, range, shape, and quantization support",
    whenToUse:
      "Use when documenting AI runtime data types, hardware inference engines, or ML framework precision support. Ideal for QAIRT, TensorFlow Lite, or ONNX type compatibility tables.",
    whenNotToUse:
      "Do not use for general comparison tables — use DataTable instead. Not for algorithm complexity — use ComplexityTable.",
    example:
      '<DataTypeTable\n  rows={[\n    { type: "INT8",  bits: 8,  range: "-128 to 127", quantized: true,  description: "Inference optimised integer" },\n    { type: "FP16",  bits: 16, range: "±65504",       quantized: false, description: "Half-precision float" },\n    { type: "FP32",  bits: 32, range: "±3.4e38",      quantized: false, description: "Full-precision float" },\n  ]}\n  caption="Qualcomm AI Runtime (QAIRT) supported types"\n/>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "hardware-spec": {
    description:
      "Structured hardware interface specification card — displays interface parameters (type, version, speed, voltage, pins, protocol) as a compact key-value grid",
    whenToUse:
      "Use when documenting a single hardware interface such as USB, PCIe, I2C, UART, or SPI. Ideal for ICD (Interface Control Document) style reference pages.",
    whenNotToUse:
      "Do not use for comparing multiple interfaces — use a table instead. Not for software API documentation — use prose with CodeBlock.",
    example:
      '<HardwareSpec\n  name="USB 3.1 Gen 2"\n  type="Universal Serial Bus"\n  speed="10 Gbps"\n  voltage="3.3V / 1.8V"\n  pins={24}\n  description="High-speed USB for peripheral connectivity."\n/>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "privacy-table": {
    description:
      "Personal data collection documentation table — records data type, purpose, legal basis (GDPR), retention period, and third-party sharing status",
    whenToUse:
      "Use inside Privacy Policy pages or Records of Processing Activities (RoPA) to document what personal data is collected and why. Supports ISO 27001 and TISAX compliance documentation.",
    whenNotToUse:
      "Do not use for hardware or API specs — use RegisterMap or DataTable instead. Not for displaying non-privacy data.",
    example:
      '<PrivacyTable\n  rows={[\n    { dataType: "Email Address",       purpose: "Authentication",    legalBasis: "Consent",              retention: "Until deletion", shared: false },\n    { dataType: "Chipset Serial Number", purpose: "Device diagnostics", legalBasis: "Legitimate Interest",   retention: "5 years",        shared: true  },\n  ]}\n  caption="Per Qualcomm Privacy Policy"\n/>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "register-map": {
    description:
      "Hardware register or OTP fuse map table — documents memory-mapped registers with address, name, bit range, access type (RO/WO/RW/OTP/RC), reset value, and description",
    whenToUse:
      "Use for documenting MMIO registers, QFPROM fuse maps, CSR tables, or any bit-addressable hardware configuration in SDK or BSP documentation.",
    whenNotToUse:
      "Do not use for software API parameters — use prose or CodeBlock. Not for data privacy records — use PrivacyTable.",
    example:
      '<RegisterMap\n  title="QFPROM Fuse Map — Security Control"\n  rows={[\n    { address: "0x00780000", name: "QFPROM_CORR_RD_WR_PERM_LSB", bits: "31:0", access: "OTP", reset: "0x00000000", description: "Read/write permissions for fuse rows." },\n    { address: "0x00780008", name: "QFPROM_CORR_JTAG_ID",        bits: "31:0", access: "RO",  reset: "0x009600E1", description: "JTAG identification register." },\n  ]}\n/>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "security-note": {
    description:
      "Security-specific callout with severity levels (info, warning, critical) — uses a lock/shield icon and colour-coded treatment distinct from general Callout",
    whenToUse:
      "Use for security notices, OTP fuse burn caveats, key management constraints, or vulnerability disclosures. Choose severity: info for general notes, warning for important caveats, critical for irreversible or dangerous actions.",
    whenNotToUse:
      "Do not use for general tips or non-security content — use Callout instead. Do not use critical severity for minor warnings.",
    example:
      '<SecurityNote severity="warning" title="OTP Fuse Burn">\n  QFPROM fuse values are permanent once written. Ensure correct values before provisioning production devices.\n</SecurityNote>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  annotation: {
    description:
      "Inline text annotation — click an annotated phrase to reveal an explanation popover, with Escape/click-outside dismissal",
    whenToUse:
      "Use to explain a specific inline term, symbol, or phrase without interrupting prose flow. Ideal for technical notation like O(n²) or domain-specific terms appearing once.",
    whenNotToUse:
      "Do not use for long explanations — use Callout or Definition. Do not annotate every technical term on a page; annotate only where the reader is likely to be unfamiliar.",
    example:
      '<Annotation note="Quadratic time: for each element we scan all remaining elements.">O(n²)</Annotation>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  badge: {
    description:
      "Status badges with multiple variants (default, success, warning, info, destructive)",
    whenToUse:
      "Use for status labels, version tags, or category markers that appear inline or in lists.",
    whenNotToUse:
      "Do not use for interactive or clickable labels — use a button. Do not rely on badge alone for critical information.",
    example: '<Badge variant="success">Stable</Badge>',
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  blockquote: {
    description: "Styled quote blocks with optional citation",
    whenToUse:
      "Use for direct quotations from external sources, books, papers, or people.",
    whenNotToUse:
      "Do not use for callouts, tips, or notes — use Callout instead. Not for code output.",
    example:
      '<Blockquote cite="Dijkstra, EWD 1036">Simplicity is prerequisite for reliability.</Blockquote>',
    dependencies: [],
  },
  card: {
    description:
      "Card layout components (Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter) plus LinkCard for navigation grids",
    whenToUse:
      "Use Card for structured content blocks with a clear header, body, and optional footer. Use LinkCard for navigation grids — next steps, related topics.",
    whenNotToUse:
      "Do not use cards for flowing prose content. Do not use LinkCard without a meaningful title and description.",
    example:
      '<LinkCard title="Binary Search Tree" href="/docs/bst" description="Self-balancing search with O(log n) operations." />',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  callout: {
    description: "Alert boxes for important information with variants",
    whenToUse:
      "Use for tips, notes, warnings, and supplementary information. The reader can continue without acting on it immediately.",
    whenNotToUse:
      "Do not use for system feedback — use Alert. Do not nest callouts. Do not use for quotations — use Blockquote.",
    example:
      '<Callout variant="warning" title="Breaking change">\n  This API was removed in v2.0. Use the new `useCollapse` hook instead.\n</Callout>',
    dependencies: ["class-variance-authority", "clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "code-block": {
    description: "Syntax highlighted code blocks with title and line numbers",
    whenToUse:
      "Use for any code snippet needing syntax highlighting, a language label, a title, or a copy button. Prefer over raw fenced code blocks when context matters.",
    whenNotToUse:
      "Do not use for command-line sessions — use Terminal. Do not use for showing diffs — use DiffBlock.",
    example:
      '<CodeBlock title="binary-search.ts" data-language="typescript">\n  {`function binarySearch(arr: number[], target: number): number {\n    let lo = 0, hi = arr.length - 1\n    while (lo <= hi) {\n      const mid = (lo + hi) >> 1\n      if (arr[mid] === target) return mid\n      arr[mid] < target ? lo = mid + 1 : hi = mid - 1\n    }\n    return -1\n  }`}\n</CodeBlock>',
    dependencies: [],
    registryDependencies: ["utils"],
  },
  changelog: {
    description:
      "Changelog component — versioned entries with a timeline and typed change badges (added/fixed/changed/removed/security)",
    whenToUse:
      "Use for versioned release notes with typed change entries: added, fixed, changed, removed, security.",
    whenNotToUse:
      "Do not use for general timelines — use a Steps or list. Do not use for non-versioned content.",
    example:
      '<Changelog version="2.1.0" date="2026-01-15">\n  <ChangelogEntry type="added">Collapse animation on Accordion</ChangelogEntry>\n  <ChangelogEntry type="fixed">Focus ring on mobile Safari</ChangelogEntry>\n</Changelog>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "code-group": {
    description:
      "Tabbed code block group — show npm/pnpm/yarn or multi-language examples side by side",
    whenToUse:
      "Use to show the same content in multiple formats — npm/pnpm/yarn install commands, or the same snippet in TypeScript and JavaScript.",
    whenNotToUse:
      "Do not use for unrelated code blocks — use separate CodeBlocks. Do not use for non-code content.",
    example:
      '<CodeGroup>\n  <CodeBlock title="npm">npm install @mdx-ui/cli</CodeBlock>\n  <CodeBlock title="pnpm">pnpm add @mdx-ui/cli</CodeBlock>\n  <CodeBlock title="yarn">yarn add @mdx-ui/cli</CodeBlock>\n</CodeGroup>',
    dependencies: [],
    registryDependencies: ["utils"],
  },
  "complexity-table": {
    description:
      "Complexity table — structured display of time and space complexity for algorithm operations",
    whenToUse:
      "Use to document time and space complexity for algorithm operations in a structured, scannable format. Place after the algorithm description.",
    whenNotToUse:
      "Do not use for non-algorithmic content. When only one operation exists, use Invariant instead.",
    example:
      '<ComplexityTable\n  rows={[\n    { operation: "Search", best: "O(1)", average: "O(log n)", worst: "O(n)" },\n    { operation: "Insert", best: "O(log n)", average: "O(log n)", worst: "O(n)" },\n    { operation: "Delete", best: "O(log n)", average: "O(log n)", worst: "O(n)" }\n  ]}\n/>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "data-table": {
    description:
      "Dynamic data table — accepts columns and data as props so you can pass static arrays, imported JSON, or API responses",
    whenToUse:
      "Use for tabular data with more than 10 rows, or when sorting or filtering is needed, or when data comes from a dynamic source.",
    whenNotToUse:
      "Do not use for simple static reference tables with fewer than 10 rows — use Table instead.",
    example: "<DataTable columns={columns} data={rows} />",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  definition: {
    description:
      "Formal term definition component — displays a term with its definition in a structured format",
    whenToUse:
      "Use to formally define a term the reader may not know. Place at first use of a specialized term in the document.",
    whenNotToUse:
      "Do not use for general explanations — use Callout. Do not define terms the target reader already knows.",
    example:
      '<Definition term="Invariant">\n  A condition that holds true before and after every operation on a data structure.\n</Definition>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "diff-block": {
    description:
      "Code diff block — highlights + additions and - removals with green/red backgrounds",
    whenToUse:
      "Use to show what changed in code — before/after a refactor, migration steps, or patch explanations.",
    whenNotToUse:
      "Do not use to show two alternatives side by side — use CodeGroup. Not for prose changes.",
    example:
      "<DiffBlock>\n  {`- const result = items.filter(x => x.active)\n+ const result = items.filter(({ active }) => active)`}\n</DiffBlock>",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  emphasis: {
    description:
      "Text emphasis components for bold (strong) and italic (em) styling",
    whenToUse:
      "Use Strong for bold emphasis on critical words. Use Em for softer, tonal emphasis.",
    whenNotToUse:
      "Do not emphasize entire sentences. Do not use emphasis for headings or labels.",
    example:
      "This is <Strong>critically important</Strong> and <Em>subtly different</Em>.",
    dependencies: [],
    registryDependencies: ["utils"],
  },
  "file-tree": {
    description:
      "Simple string-based file/folder tree structure with minimal syntax",
    whenToUse:
      "Use to show project structure or directory layout using an indented string format.",
    whenNotToUse:
      "Do not use for navigation. Do not exceed 3 levels of nesting without strong reason.",
    example:
      "<FileTree>\n  src/\n    components/\n      accordion.tsx\n    lib/\n      utils.ts\n  package.json\n</FileTree>",
    dependencies: [],
    registryDependencies: ["utils"],
  },
  glossary: {
    description:
      "Context-based inline glossary — wrap content in GlossaryProvider with term definitions, then use <Term id> to link and display popovers",
    whenToUse:
      "Use when a document introduces multiple domain-specific terms. Wrap the page in GlossaryProvider and mark first occurrences with Term.",
    whenNotToUse:
      "Do not use for a single term — use Annotation instead. Do not use GlossaryProvider when fewer than three terms need defining.",
    example:
      "<GlossaryProvider terms={{ bfs: { label: 'BFS', definition: 'Breadth-First Search: explores nodes level by level.' } }}>\n  <Term id=\"bfs\" /> is optimal for shortest-path problems.\n</GlossaryProvider>",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  heading: {
    description: "Flexible and reusable heading component with variant support",
    whenToUse:
      "Use H1 for page title, H2 for major sections, H3 for subsections. Maintain strict heading hierarchy.",
    whenNotToUse:
      "Do not skip heading levels. Do not use headings for visual emphasis — use typography components.",
    example: "<H2>Algorithm Analysis</H2>\n<H3>Time Complexity</H3>",
    dependencies: ["class-variance-authority"],
    registryDependencies: ["utils"],
  },
  headings: {
    description:
      "Markdown headings (H1-H6) with auto-generated anchor links for navigation",
    whenToUse:
      "Use as the MDX mapping for standard markdown headings when auto-generated anchor links are needed.",
    whenNotToUse:
      "Do not use directly in MDX — configure as the h1–h6 override in your MDX components map.",
    example: "// In mdx-components.tsx\n{ h1: Headings.H1, h2: Headings.H2 }",
    dependencies: [],
    registryDependencies: ["utils"],
  },
  highlight: {
    description:
      "Marker-style inline text highlight — simulates a real highlighter pen with yellow, blue, green, pink, or purple colours",
    whenToUse:
      "Use to draw attention to a specific word or phrase in prose, simulating a physical highlighter pen.",
    whenNotToUse:
      "Do not use for code — use inline-code. Do not highlight entire sentences.",
    example:
      'The key insight is the <Highlight color="yellow">pivot selection strategy</Highlight>.',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "horizontal-rule": {
    description:
      "Divider lines with multiple styles (default, dashed, dotted, gradient)",
    whenToUse:
      "Use to visually separate major sections within a page when a heading would be too heavy.",
    whenNotToUse:
      "Do not use between every paragraph. Do not use as a substitute for proper heading structure.",
    example: '<HorizontalRule variant="gradient" />',
    dependencies: [],
  },
  image: {
    description:
      "Image with optional caption, plus ImageGlossary — responsive 1–3 column grid of images as seen in react.dev",
    whenToUse:
      "Use for screenshots, diagrams, and illustrations with an optional caption. Use ImageGlossary for a grid of related images.",
    whenNotToUse:
      "Do not use for decorative images with no informational value. Always provide meaningful alt text.",
    example:
      '<Image src="/diagrams/avl-rotation.png" alt="AVL tree left rotation" caption="Left rotation restores balance when right subtree is too tall." />',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "inline-code": {
    description:
      "Inline code component for displaying code snippets within text",
    whenToUse:
      "Use for inline code mentions — variable names, function names, short snippets within prose.",
    whenNotToUse:
      "Do not use for multi-line code — use CodeBlock. Do not use for keyboard shortcuts — use Kbd.",
    example:
      "Call <InlineCode>Array.prototype.reduce</InlineCode> with an initial accumulator.",
    dependencies: [],
    registryDependencies: ["utils"],
  },
  invariant: {
    description:
      "Formal invariant statement — highlights a condition that must always hold, with optional complexity annotation",
    whenToUse:
      "Use to state a formal invariant — a condition that must always hold. Particularly valuable in algorithm and data structure documentation.",
    whenNotToUse:
      "Do not use for general facts or notes — use Callout. Reserve for formal correctness claims with optional complexity annotation.",
    example:
      '<Invariant complexity="O(log n)">\n  An AVL tree remains height-balanced after every insertion and deletion.\n</Invariant>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "json-ld": {
    description:
      "JSON-LD structured data — renders a <script type='application/ld+json'> tag for SEO (Article, BreadcrumbList, FAQPage, etc.)",
    whenToUse:
      "Use to embed structured data for SEO — Article, BreadcrumbList, FAQPage schemas.",
    whenNotToUse:
      "Do not use for visible content. This component renders no visible output.",
    example:
      "<JsonLd schema={{ '@context': 'https://schema.org', '@type': 'Article', headline: 'Binary Search Trees' }} />",
    dependencies: [],
  },
  kbd: {
    description:
      "Keyboard shortcut display — styled <kbd> element for showing key combinations like Ctrl+K",
    whenToUse:
      "Use to show keyboard shortcuts and key combinations inline with instructional text.",
    whenNotToUse:
      "Do not use for code — use InlineCode. Do not use for mouse actions.",
    example: "Press <Kbd>Ctrl</Kbd>+<Kbd>K</Kbd> to open the command palette.",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  link: {
    description:
      "Styled anchor — auto-detects external URLs, adds open-in-new-tab icon and rel='noopener noreferrer'",
    whenToUse:
      "Use for all anchor links in MDX. It auto-detects external URLs and adds rel='noopener noreferrer' and an external icon automatically.",
    whenNotToUse:
      "Do not use for navigation buttons or actions — use a button element.",
    example:
      '<Link href="https://en.wikipedia.org/wiki/AVL_tree">AVL tree</Link>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  list: {
    description: "Styled ordered and unordered lists with list items",
    whenToUse:
      "Use UnorderedList for items with no required order. Use OrderedList when sequence matters.",
    whenNotToUse:
      "Do not use for step-by-step procedures — use Steps. Do not nest more than two levels.",
    example:
      "<UnorderedList>\n  <ListItem>O(1) average case lookup</ListItem>\n  <ListItem>O(n) worst case with hash collision</ListItem>\n</UnorderedList>",
    dependencies: [],
  },
  math: {
    description:
      "LaTeX math rendering via KaTeX — M (inline) and BM (block) for clean authoring with no JS string escaping, plus InlineMath/BlockMath longform aliases. Built-in macros: \\R \\N \\Z \\C \\Q \\E \\PP \\F \\d \\eps \\norm \\abs \\inner \\set \\floor \\ceil.",
    whenToUse:
      'Use <M expr="\\frac{a}{b}" /> for inline LaTeX and <BM expr="..." /> for block/display equations. The expr prop accepts literal backslashes — no JS string escaping needed. Use InlineMath/BlockMath when you need to embed a dynamic JS value.',
    whenNotToUse:
      "Do not use for code — use CodeBlock. Do not use for simple expressions that read clearly as plain text.",
    example:
      'The formula <M expr="\\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}" /> gives the roots. <BM expr="e^{i\\pi} + 1 = 0" />',
    dependencies: ["katex", "clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "mdx-components": {
    description:
      "Auto-discovering MDX component mapper - automatically uses all installed mdx-ui components",
    whenToUse:
      "Use as the central MDX component map for your docs site. Import and register all mdx-ui components here.",
    whenNotToUse:
      "Do not import this file directly in MDX — it is a configuration file for your MDX renderer.",
    example:
      "// mdx-components.tsx\nexport const components = { Callout, Steps, Reveal, ... }",
    dependencies: ["@types/mdx"],
    registryDependencies: ["utils"],
  },
  mermaid: {
    description:
      "Mermaid diagram renderer with auto type-detection, per-type label headers, and data structure components — MermaidBST, MermaidTree, MermaidBFS, MermaidDFS",
    whenToUse:
      "Use for flowcharts, sequence diagrams, state machines, and general diagrams where relationships and flow matter.",
    whenNotToUse:
      "Do not use for data structure visualization — use DS components. Do not use for complex graphs with many nodes — prefer DSGraph.",
    example:
      "<Mermaid chart={`graph TD\n  A[Start] --> B{Is balanced?}\n  B -->|Yes| C[Return]\n  B -->|No| D[Rotate]\n  D --> B`} />",
    dependencies: ["mermaid", "clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  paragraph: {
    description:
      "Standard text paragraph component with proper spacing and typography",
    whenToUse: "Use as the MDX mapping for standard prose paragraphs.",
    whenNotToUse:
      "Do not use directly in MDX — configure as the p override in your MDX components map.",
    example: "// In mdx-components.tsx\n{ p: Paragraph }",
    dependencies: [],
    registryDependencies: ["utils"],
  },
  preview: {
    description:
      "Tabbed component preview — shows rendered output and source code side by side with a copy button",
    whenToUse:
      "Use to show a rendered component alongside its source code. Best for component documentation pages.",
    whenNotToUse:
      "Do not use for non-visual components or when source code alone is sufficient. Do not use for interactive demos requiring live editing — that needs a sandbox.",
    example:
      '<Preview lang="tsx" code={`<Badge variant="success">Stable</Badge>`}>\n  <Badge variant="success">Stable</Badge>\n</Preview>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  reveal: {
    description:
      "Animated click-to-reveal panel for answers, hints, and spoilers — uses smooth Collapse animation",
    whenToUse:
      "Use to hide a single answer, solution, or hint the reader must actively choose to reveal. Common in tutorials and exercises.",
    whenNotToUse:
      "Do not use for navigation or multi-section disclosure — use Accordion. Do not use when content should always be visible.",
    example:
      '<Reveal label="Show solution">\n  Use a hash map keyed on the complement: `target - nums[i]`.\n</Reveal>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  spoiler: {
    description:
      "Collapsible <details>/<summary> disclosure — lightweight alternative to Accordion for single items",
    whenToUse:
      "Use for lightweight single-item disclosure using native HTML details/summary when animation is not needed.",
    whenNotToUse:
      "Use Reveal instead when animation matters. Do not use for multiple related items — use Accordion.",
    example:
      '<Spoiler summary="What is the time complexity?">\n  O(log n) for a balanced BST.\n</Spoiler>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  steps: {
    description: "Numbered step-by-step guides with visual indicators",
    whenToUse:
      "Use for sequential procedures where order matters — installation, configuration, tutorials.",
    whenNotToUse:
      "Do not use for unordered tips — use a list. Do not use when steps can be performed in any order.",
    example:
      '<Steps>\n  <Step title="Install">`pnpm add @mdx-ui/cli`</Step>\n  <Step title="Run">`npx mdx-ui add callout`</Step>\n</Steps>',
    dependencies: [],
    registryDependencies: ["utils"],
  },
  table: {
    description:
      "Styled table components with header, body, footer, and caption",
    whenToUse:
      "Use for static reference tables with fewer than 10 rows — prop reference, comparison tables, structured data.",
    whenNotToUse:
      "Use DataTable instead for dynamic data, sorting, or filtering.",
    example:
      "<Table>\n  <TableHeader><TableRow><TableHead>Operation</TableHead><TableHead>Complexity</TableHead></TableRow></TableHeader>\n  <TableBody><TableRow><TableCell>Search</TableCell><TableCell>O(log n)</TableCell></TableRow></TableBody>\n</Table>",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  tabs: {
    description:
      "Tabbed content sections with state management and keyboard navigation",
    whenToUse:
      "Use to show mutually exclusive content variants — framework-specific code, OS instructions, or alternative approaches.",
    whenNotToUse:
      "Do not use for sequential content — use Steps. Do not use more than five tabs.",
    example:
      '<Tabs>\n  <TabsList>\n    <TabsTrigger value="ts">TypeScript</TabsTrigger>\n    <TabsTrigger value="js">JavaScript</TabsTrigger>\n  </TabsList>\n  <TabsContent value="ts">const x: number = 1</TabsContent>\n  <TabsContent value="js">const x = 1</TabsContent>\n</Tabs>',
    dependencies: [],
    registryDependencies: ["utils"],
  },
  terminal: {
    description:
      "Terminal window component — macOS-style title bar with traffic lights, TerminalLine for input/output lines",
    whenToUse:
      "Use to show command-line sessions with a macOS-style title bar. Use TerminalLine for input/output lines.",
    whenNotToUse:
      "Do not use for code files — use CodeBlock. Use for interactive shell sessions only.",
    example:
      '<Terminal>\n  <TerminalLine type="input">pnpm add @mdx-ui/cli</TerminalLine>\n  <TerminalLine type="output">+ @mdx-ui/cli 0.0.33</TerminalLine>\n</Terminal>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  tree: {
    description:
      "Interactive file/folder tree structure for displaying project organization",
    whenToUse:
      "Use to show hierarchical structures — project layout, category trees, nested navigation.",
    whenNotToUse:
      "Do not use for navigation menus. Do not use for more than three levels of nesting without strong reason.",
    example:
      '<Tree>\n  <TreeItem label="src">\n    <TreeItem label="components" />\n    <TreeItem label="lib" />\n  </TreeItem>\n</Tree>',
    dependencies: [],
    registryDependencies: ["utils"],
  },
  video: {
    description:
      "Video embed — auto-detects YouTube, Vimeo, and HTML5 video sources with aspect-ratio container and optional caption",
    whenToUse:
      "Use to embed YouTube, Vimeo, or HTML5 video with an aspect-ratio container and optional caption.",
    whenNotToUse:
      "Do not use for audio-only content. Do not embed auto-playing videos.",
    example:
      '<Video src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" caption="Algorithm walkthrough" />',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "ds-tree": {
    description:
      "Production-grade SVG tree visualizer — Binary Tree, BST, AVL, Balanced, Full, Complete, Perfect, Min/Max Heap, N-ary Tree. Includes validation engine, layout engine, traversal animation (BFS/DFS/inorder/preorder/postorder), interactive playground, and valid/invalid state rendering.",
    whenToUse:
      "Use to visually render tree-structured data — Binary Tree, BST, AVL, Heap, N-ary Tree, Trie. Includes traversal animation.",
    whenNotToUse:
      "Do not use for abstract concept diagrams — use Mermaid. Use only when the visual structure of the tree data is the point.",
    example: "<MermaidBST data={[8, 3, 10, 1, 6, 14]} />",
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  ds: {
    description:
      "Data structure visualization components — Array, Matrix, LinkedList, DoublyLinkedList, CircularLinkedList, Stack, Queue, Deque, PriorityQueue, BinaryTree, BST, MinHeap, MaxHeap, Trie, Graph, Digraph, WeightedGraph, DAG, HashMap, HashSet, NaryTree, SegmentTree, BFS, DFS, AgentFlow",
    whenToUse:
      "Use to visually render linear and graph data structures — Array, LinkedList, Stack, Queue, Graph, HashMap, etc. Use the specific named export matching the structure.",
    whenNotToUse:
      "Do not use for tree structures — use ds-tree components. Do not use for flow diagrams — use Mermaid.",
    example:
      "<DSArray data={[1, 2, 3, 4, 5]} />\n<DSLinkedList data={[10, 20, 30]} />",
    dependencies: ["mermaid", "clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "math-primitives": {
    description:
      "150+ JSX math primitive components across 11 sections: Basic (Frac, Pow, Sub, Sqrt, Abs, Paren, Deg, Inf), Calculus (Integral, Sum, Prod, Lim, Limsup, Liminf, Deriv, PDeriv, Nabla, Laplacian), Trig (Sin–Csc, ArcSin–ArcTan, Sinh/Cosh/Tanh, Log/Ln/Exp), Algebra (Factorial, Choose, Perm, Mod, GCD, LCM), Set Theory (Floor, Ceil, SetOf, Cardinality, PowerSet, In, Subset, Union, Intersect…), Number Systems (NN ℕ, ZZ ℤ, QQ ℚ, RR ℝ, CC ℂ, PP ℙ, FF 𝔽, Complex, Conj), Logic (And, Or, Not, ForAll, Exists, Implies ⟹, Iff ⟺, Therefore, QED), Linear Algebra (Vec, Norm, Dot, Cross, Transpose, Det, Matrix, Rank, Dim, Trace), Statistics (Prob, CondProb, Expected, Variance, StdDev, Cov, Corr, Dist), Greek (full set), Relations/Arrows (Neq, Approx, Equiv, Cong, Leq, Geq, Ll, Gg, Propto, Sim, PlusMinus, MinusPlus, Divides, NotDivides, Arrow, MapsTo, Compose, OTimes).",
    whenToUse:
      'Use for structured math UI — numbered equations with layout, solution steps, inline symbols alongside prose. For raw LaTeX expressions, use <M expr="..." /> instead — it is simpler. Both approaches can be mixed freely.',
    whenNotToUse:
      'Do not use primitives to write raw math expressions — use <M expr="\\frac{a}{b}" /> for that. Primitives are for composing layout-level math components.',
    example:
      '<Equation label="1"><Frac num={<>-b <PlusMinus /> <Sqrt>b²-4ac</Sqrt></>} den="2a" /></Equation>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "math-equation": {
    description:
      "Display equation containers: Equation (centered block with optional equation number label) and EqSystem (system of simultaneous equations with SVG left brace). Relation symbols (Approx, Neq, Leq, Geq, Arrow, Implies, Iff, etc.) live in math-primitives.",
    whenToUse:
      'Use Equation to display a formula prominently with an optional reference number — pair with <M expr="..." /> for LaTeX content or math-primitives for JSX layout. Use EqSystem for systems of simultaneous equations.',
    whenNotToUse:
      "Do not use for prose paragraphs that mention variables — use M or InlineMath. Do not use for code listings.",
    example:
      '<Equation label="1"><M expr="E = mc^2" /></Equation>\n<EqSystem><div><M expr="x + y = 5" /></div><div><M expr="2x - y = 1" /></div></EqSystem>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "math-solution": {
    description:
      "Step-by-step mathematical solution blocks: Solution (wrapper with title), SolutionStep (one transformation step with reason), SolutionAnswer (final result with ∴ badge), SolutionNote (commentary annotation)",
    whenToUse:
      "Use to walk through algebraic derivations, equation solving, or proofs step by step. Each step shows the expression and an optional reason.",
    whenNotToUse:
      "Do not use for general procedure guides — use Steps/Step for non-math workflows. Do not use for code walkthroughs.",
    example:
      '<Solution title="Solve: 2x + 4 = 10">\n  <SolutionStep reason="Given">2x + 4 = 10</SolutionStep>\n  <SolutionStep reason="Subtract 4">2x = 6</SolutionStep>\n  <SolutionAnswer>x = 3</SolutionAnswer>\n</Solution>',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "math-easy": {
    description:
      "Human-readable math DSL compiled to KaTeX — write math without LaTeX backslashes. ME (inline) and BME (block) accept natural words: theta, sqrt(x), (a+b)/c, 90deg, sum(i=0,n), int(a,b), lim(x->0), forall, in, union, and more.",
    whenToUse:
      "Use <ME>theta in {90deg, 120deg}</ME> for inline math and <BME>x = (-b pm sqrt(b^2-4ac))/(2a)</BME> for block/display. Prefer over <M expr=\"...\"> when the author or LLM does not know LaTeX — the DSL maps directly to natural language.",
    whenNotToUse:
      "Do not use when you already know LaTeX — <M expr=\"...\"> is simpler for power users. Do not mix JSX inside <ME> children — it accepts a plain string only.",
    example:
      "<ME>theta in {90deg, 120deg, 210deg, 330deg}</ME>\n<BME>x = (-b pm sqrt(b^2 - 4ac)) / (2a)</BME>\n<ME>forall x in RR, x^2 >= 0</ME>",
    dependencies: ["katex", "clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  "pin-table": {
    description:
      "Hardware pinout table — documents connector pins with signal name, direction type (INPUT/OUTPUT/BIDIR/POWER/GND/NC), voltage, alternate function, and description. Color-coded type badges.",
    whenToUse:
      "Use when documenting a microcontroller, SoC, or connector pinout — USB, GPIO, UART, SPI, I2C headers. Ideal for hardware BSP and SDK documentation.",
    whenNotToUse:
      "Do not use for register maps — use RegisterMap. Do not use for general comparison tables — use DataTable.",
    example:
      '<PinTable title="40-pin GPIO Header" connector="J1" rows={[\n  { pin: 1, signal: "3.3V", type: "POWER", voltage: "3.3V", description: "Power supply" },\n  { pin: 2, signal: "5V",   type: "POWER", voltage: "5V",   description: "Power supply" },\n  { pin: 3, signal: "GPIO2", type: "BIDIR", voltage: "3.3V", altFunction: "I2C1_SDA" },\n]} />',
    dependencies: ["clsx", "tailwind-merge"],
    registryDependencies: ["utils"],
  },
  utils: {
    description: "Utility functions for className merging (cn)",
    whenToUse:
      "Install automatically as a dependency of any other component. Contains the cn() class merging utility.",
    whenNotToUse:
      "Do not import directly in MDX files. This is an internal utility.",
    example: "import { cn } from '@/lib/utils'",
    dependencies: ["clsx", "tailwind-merge"],
  },
};

// Components that bundle lib/* files alongside their own source.
// These lib files are internal — not shown in list, not directly addable.
const libDependencies: Record<string, string[]> = {
  accordion: ["lib/primitives.ts", "lib/motion.tsx"],
  annotation: ["lib/primitives.ts"],
  glossary: ["lib/primitives.ts"],
  preview: ["lib/primitives.ts"],
  reveal: ["lib/primitives.ts", "lib/motion.tsx"],
};

async function buildRegistry() {
  console.log("🔨 Building registry from packages/registry/src...\n");

  const srcDir = path.join(__dirname, "../packages/registry/src");
  const registryDir = path.join(__dirname, "../registry");
  const mdxDir = path.join(registryDir, "mdx");

  // Ensure directories exist
  await fs.ensureDir(mdxDir);

  // Get all .tsx files from src
  const files = await fs.readdir(srcDir);
  const tsxFiles = files.filter((f) => f.endsWith(".tsx"));

  const components: any[] = [];

  for (const file of tsxFiles) {
    const componentName = file.replace(".tsx", "");
    const filePath = path.join(srcDir, file);
    const content = await fs.readFile(filePath, "utf-8");

    const metadata = componentsMetadata[componentName];
    if (!metadata) {
      console.warn(`⚠️  No metadata found for ${componentName}, skipping...`);
      continue;
    }

    // Bundle any lib/* dependencies directly into this component's JSON
    const libFiles: Array<{
      path: string;
      content: string;
      integrity: string;
    }> = [];
    for (const libPath of libDependencies[componentName] ?? []) {
      const libFilePath = path.join(srcDir, libPath);
      if (await fs.pathExists(libFilePath)) {
        const libContent = await fs.readFile(libFilePath, "utf-8");
        libFiles.push({
          path: libPath,
          content: libContent,
          integrity: integrity(libContent),
        });
      }
    }

    // Create component JSON
    const componentJson = {
      name: componentName,
      type: componentName === "utils" ? "utility" : "component",
      description: metadata.description,
      whenToUse: metadata.whenToUse,
      whenNotToUse: metadata.whenNotToUse,
      example: metadata.example,
      dependencies: metadata.dependencies || [],
      registryDependencies: metadata.registryDependencies || [],
      files: [
        {
          path: file,
          content: content,
          integrity: integrity(content),
        },
        ...libFiles,
      ],
    };

    // Write individual component JSON
    const outputPath = path.join(mdxDir, `${componentName}.json`);
    await fs.writeJSON(outputPath, componentJson, { spaces: 2 });
    console.log(`✅ Generated ${componentName}.json`);

    // Add to registry
    components.push({
      name: componentName,
      type: componentName === "utils" ? "utility" : "mdx",
      description: metadata.description,
      whenToUse: metadata.whenToUse,
      whenNotToUse: metadata.whenNotToUse,
      example: metadata.example,
      files: [`mdx/${componentName}.json`],
      ...(metadata.registryDependencies &&
      metadata.registryDependencies.length > 0
        ? { registryDependencies: metadata.registryDependencies }
        : {}),
    });
  }

  // Check for lib/utils.ts
  const utilsPath = path.join(srcDir, "lib/utils.ts");
  if (await fs.pathExists(utilsPath)) {
    const content = await fs.readFile(utilsPath, "utf-8");
    const utilsMetadata = componentsMetadata["utils"];
    const componentJson = {
      name: "utils",
      type: "utility",
      description:
        utilsMetadata?.description ||
        "Utility functions for className merging (cn)",
      whenToUse: utilsMetadata?.whenToUse || "",
      whenNotToUse: utilsMetadata?.whenNotToUse || "",
      example: utilsMetadata?.example || "",
      dependencies: utilsMetadata?.dependencies || [],
      files: [
        {
          path: "lib/utils.ts",
          content: content,
          integrity: integrity(content),
        },
      ],
    };

    const outputPath = path.join(mdxDir, "utils.json");
    await fs.writeJSON(outputPath, componentJson, { spaces: 2 });
    console.log(`✅ Generated utils.json`);

    components.push({
      name: "utils",
      type: "utility",
      description:
        utilsMetadata?.description ||
        "Utility functions for className merging (cn)",
      whenToUse: utilsMetadata?.whenToUse || "",
      whenNotToUse: utilsMetadata?.whenNotToUse || "",
      example: utilsMetadata?.example || "",
      files: ["mdx/utils.json"],
    });
  }

  // Generate main registry.json
  const registryJson = {
    $schema: "./schema.json",
    components: components.sort((a, b) => a.name.localeCompare(b.name)),
  };

  await fs.writeJSON(path.join(registryDir, "registry.json"), registryJson, {
    spaces: 2,
  });
  console.log(`✅ Generated registry.json`);

  console.log(
    `\n🎉 Registry built successfully! Generated ${components.length} components.`,
  );
}

buildRegistry().catch(console.error);
