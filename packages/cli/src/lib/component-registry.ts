// ─── Single source of truth for all component metadata ───────────────────────
// add.ts, remove.ts, update.ts and doctor.ts all derive their maps from here.

export interface ComponentEntry {
  /** Import path relative to componentsDir (e.g. "./alert") */
  importFile: string;
  /** Named exports to import (e.g. ["Alert", "AlertTitle"]) */
  imports: string[];
  /** HTML element → component overrides for mdx-components.tsx (e.g. { h1: "H1" }) */
  elementMappings: Record<string, string>;
  /** Files that make up this component (relative to componentsDir) */
  files: string[];
  /** npm packages required at runtime */
  deps: string[];
}

export const REGISTRY: Record<string, ComponentEntry> = {
  "ds-tree": {
    importFile: "./ds-tree",
    imports: [
      "DSTree",
      "DSBinaryTree",
      "DSBST",
      "DSAVLTree",
      "DSBalancedTree",
      "DSFullTree",
      "DSCompleteTree",
      "DSPerfectTree",
      "DSMinHeap",
      "DSMaxHeap",
      "DSNaryTree",
      "DSBSTPlayground",
    ],
    elementMappings: {},
    files: ["ds-tree.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  ds: {
    importFile: "./ds",
    imports: [
      "DSArray",
      "DSMatrix",
      "DSLinkedList",
      "DSDoublyLinkedList",
      "DSCircularLinkedList",
      "DSStack",
      "DSQueue",
      "DSDeque",
      "DSPriorityQueue",
      "DSBinaryTree",
      "DSBST",
      "DSMinHeap",
      "DSMaxHeap",
      "DSTrie",
      "DSGraph",
      "DSDigraph",
      "DSWeightedGraph",
      "DSDAG",
      "DSHashMap",
      "DSHashSet",
      "DSNaryTree",
      "DSSegmentTree",
      "DSBFS",
      "DSDFS",
      "DSAgentFlow",
    ],
    elementMappings: {},
    files: ["ds.tsx"],
    deps: ["mermaid", "clsx", "tailwind-merge"],
  },
  annotation: {
    importFile: "./annotation",
    imports: ["Annotation"],
    elementMappings: {},
    files: ["annotation.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  "certification-badge": {
    importFile: "./certification-badge",
    imports: ["CertificationBadge"],
    elementMappings: {},
    files: ["certification-badge.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  "data-type-table": {
    importFile: "./data-type-table",
    imports: ["DataTypeTable"],
    elementMappings: {},
    files: ["data-type-table.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  "hardware-spec": {
    importFile: "./hardware-spec",
    imports: ["HardwareSpec"],
    elementMappings: {},
    files: ["hardware-spec.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  "privacy-table": {
    importFile: "./privacy-table",
    imports: ["PrivacyTable"],
    elementMappings: {},
    files: ["privacy-table.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  "register-map": {
    importFile: "./register-map",
    imports: ["RegisterMap"],
    elementMappings: {},
    files: ["register-map.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  "security-note": {
    importFile: "./security-note",
    imports: ["SecurityNote"],
    elementMappings: {},
    files: ["security-note.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  "complexity-table": {
    importFile: "./complexity-table",
    imports: ["ComplexityTable"],
    elementMappings: {},
    files: ["complexity-table.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  definition: {
    importFile: "./definition",
    imports: ["Definition"],
    elementMappings: {},
    files: ["definition.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  glossary: {
    importFile: "./glossary",
    imports: ["GlossaryProvider", "Term"],
    elementMappings: {},
    files: ["glossary.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  invariant: {
    importFile: "./invariant",
    imports: ["Invariant"],
    elementMappings: {},
    files: ["invariant.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  preview: {
    importFile: "./preview",
    imports: ["Preview"],
    elementMappings: {},
    files: ["preview.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  reveal: {
    importFile: "./reveal",
    imports: ["Reveal"],
    elementMappings: {},
    files: ["reveal.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  accordion: {
    importFile: "./accordion",
    imports: [
      "Accordion",
      "AccordionItem",
      "AccordionTrigger",
      "AccordionContent",
    ],
    elementMappings: {},
    files: ["accordion.tsx"],
    deps: [],
  },
  alert: {
    importFile: "./alert",
    imports: ["Alert", "AlertTitle", "AlertDescription"],
    elementMappings: {},
    files: ["alert.tsx"],
    deps: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  badge: {
    importFile: "./badge",
    imports: ["Badge"],
    elementMappings: {},
    files: ["badge.tsx"],
    deps: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  blockquote: {
    importFile: "./blockquote",
    imports: ["Blockquote"],
    elementMappings: { blockquote: "Blockquote" },
    files: ["blockquote.tsx"],
    deps: [],
  },
  callout: {
    importFile: "./callout",
    imports: ["Callout"],
    elementMappings: {},
    files: ["callout.tsx"],
    deps: ["class-variance-authority", "clsx", "tailwind-merge"],
  },
  card: {
    importFile: "./card",
    imports: [
      "Card",
      "CardHeader",
      "CardTitle",
      "CardDescription",
      "CardContent",
      "CardFooter",
      "LinkCard",
    ],
    elementMappings: {},
    files: ["card.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  changelog: {
    importFile: "./changelog",
    imports: ["Changelog", "ChangelogEntry", "ChangelogItem"],
    elementMappings: {},
    files: ["changelog.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  "code-block": {
    importFile: "./code-block",
    imports: ["CodeBlock"],
    elementMappings: { pre: "CodeBlock" },
    files: ["code-block.tsx"],
    deps: [],
  },
  "code-group": {
    importFile: "./code-group",
    imports: ["CodeGroup"],
    elementMappings: {},
    files: ["code-group.tsx"],
    deps: [],
  },
  "data-table": {
    importFile: "./data-table",
    imports: ["DataTable"],
    elementMappings: {},
    files: ["data-table.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  "diff-block": {
    importFile: "./diff-block",
    imports: ["DiffBlock"],
    elementMappings: {},
    files: ["diff-block.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  emphasis: {
    importFile: "./emphasis",
    imports: ["Strong", "Em"],
    elementMappings: { strong: "Strong", em: "Em" },
    files: ["emphasis.tsx"],
    deps: [],
  },
  "file-tree": {
    importFile: "./file-tree",
    imports: ["FileTree"],
    elementMappings: {},
    files: ["file-tree.tsx"],
    deps: [],
  },
  heading: {
    importFile: "./heading",
    imports: ["H1", "H2", "H3", "H4", "H5", "H6"],
    elementMappings: {
      h1: "H1",
      h2: "H2",
      h3: "H3",
      h4: "H4",
      h5: "H5",
      h6: "H6",
    },
    files: ["heading.tsx"],
    deps: ["class-variance-authority"],
  },
  headings: {
    importFile: "./headings",
    imports: ["Headings"],
    elementMappings: {},
    files: ["headings.tsx"],
    deps: [],
  },
  highlight: {
    importFile: "./highlight",
    imports: ["Highlight"],
    elementMappings: {},
    files: ["highlight.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  "horizontal-rule": {
    importFile: "./horizontal-rule",
    imports: ["HorizontalRule"],
    elementMappings: { hr: "HorizontalRule" },
    files: ["horizontal-rule.tsx"],
    deps: [],
  },
  image: {
    importFile: "./image",
    imports: ["Image", "ImageGlossary"],
    elementMappings: { img: "Image" },
    files: ["image.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  "inline-code": {
    importFile: "./inline-code",
    imports: ["Code"],
    elementMappings: { code: "Code" },
    files: ["inline-code.tsx"],
    deps: [],
  },
  "json-ld": {
    importFile: "./json-ld",
    imports: ["JsonLd"],
    elementMappings: {},
    files: ["json-ld.tsx"],
    deps: [],
  },
  kbd: {
    importFile: "./kbd",
    imports: ["Kbd"],
    elementMappings: {},
    files: ["kbd.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  link: {
    importFile: "./link",
    imports: ["Link"],
    elementMappings: { a: "Link" },
    files: ["link.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  list: {
    importFile: "./list",
    imports: ["UnorderedList", "OrderedList", "ListItem"],
    elementMappings: { ul: "UnorderedList", ol: "OrderedList", li: "ListItem" },
    files: ["list.tsx"],
    deps: [],
  },
  math: {
    importFile: "./math",
    imports: ["Math", "BlockMath", "InlineMath"],
    elementMappings: {},
    files: ["math.tsx"],
    deps: ["katex", "clsx", "tailwind-merge"],
  },
  mermaid: {
    importFile: "./mermaid",
    imports: [
      "Mermaid",
      "MermaidBST",
      "MermaidTree",
      "MermaidBFS",
      "MermaidDFS",
    ],
    elementMappings: {},
    files: ["mermaid.tsx"],
    deps: ["mermaid", "clsx", "tailwind-merge"],
  },
  paragraph: {
    importFile: "./paragraph",
    imports: ["Paragraph"],
    elementMappings: { p: "Paragraph" },
    files: ["paragraph.tsx"],
    deps: [],
  },
  spoiler: {
    importFile: "./spoiler",
    imports: ["Spoiler"],
    elementMappings: {},
    files: ["spoiler.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  steps: {
    importFile: "./steps",
    imports: ["Steps", "Step"],
    elementMappings: {},
    files: ["steps.tsx"],
    deps: [],
  },
  table: {
    importFile: "./table",
    imports: [
      "Table",
      "TableHeader",
      "TableBody",
      "TableFooter",
      "TableRow",
      "TableHead",
      "TableCell",
      "TableCaption",
    ],
    elementMappings: {
      table: "Table",
      thead: "TableHeader",
      tbody: "TableBody",
      tfoot: "TableFooter",
      tr: "TableRow",
      th: "TableHead",
      td: "TableCell",
    },
    files: ["table.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  tabs: {
    importFile: "./tabs",
    imports: ["Tabs", "TabsList", "TabsTrigger", "TabsContent"],
    elementMappings: {},
    files: ["tabs.tsx"],
    deps: [],
  },
  terminal: {
    importFile: "./terminal",
    imports: ["Terminal", "TerminalLine"],
    elementMappings: {},
    files: ["terminal.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
  tree: {
    importFile: "./tree",
    imports: ["Tree", "TreeItem"],
    elementMappings: {},
    files: ["tree.tsx"],
    deps: [],
  },
  video: {
    importFile: "./video",
    imports: ["Video"],
    elementMappings: {},
    files: ["video.tsx"],
    deps: ["clsx", "tailwind-merge"],
  },
};

// ─── Derived maps (consumed by add / remove / update / doctor) ────────────────

export const COMPONENT_MDX_MAP = Object.fromEntries(
  Object.entries(REGISTRY).map(([name, e]) => [
    name,
    {
      importFile: e.importFile,
      imports: e.imports,
      elementMappings: e.elementMappings,
    },
  ]),
);

export const COMPONENT_FILES = Object.fromEntries(
  Object.entries(REGISTRY).map(([name, e]) => [name, e.files]),
);

// Inverse of COMPONENT_FILES — used by update.ts to map filename → component name
export const FILE_TO_COMPONENT: Record<string, string> = Object.fromEntries(
  Object.entries(REGISTRY).flatMap(([name, e]) =>
    e.files.map((f) => [f, name]),
  ),
);

export const COMPONENT_DEPS = Object.fromEntries(
  Object.entries(REGISTRY).map(([name, e]) => [name, e.deps]),
);
