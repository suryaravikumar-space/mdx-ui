// ─── Named component imports ───────────────────────────────────────────────────

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";
import { Alert, AlertTitle, AlertDescription } from "./alert";
import { Annotation } from "./annotation";
import { Badge } from "./badge";
import { Blockquote } from "./blockquote";
import { Callout } from "./callout";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  LinkCard,
} from "./card";
import { CertificationBadge } from "./certification-badge";
import { Changelog, ChangelogEntry, ChangelogItem } from "./changelog";
import { CodeBlock } from "./code-block";
import { CodeGroup } from "./code-group";
import { ComplexityTable } from "./complexity-table";
import { DataTable } from "./data-table";
import { DataTypeTable } from "./data-type-table";
import { Definition } from "./definition";
import { DiffBlock } from "./diff-block";

// ds.tsx (mermaid-based data structures) — duplicate names aliased with Ds suffix
import {
  DSArray,
  DSMatrix,
  DSLinkedList,
  DSDoublyLinkedList,
  DSCircularLinkedList,
  DSStack,
  DSQueue,
  DSDeque,
  DSPriorityQueue,
  DSBinaryTree as DSBinaryTreeMermaid,
  DSBST as DSBSTMermaid,
  DSMinHeap as DSMinHeapMermaid,
  DSMaxHeap as DSMaxHeapMermaid,
  DSTrie,
  DSGraph,
  DSDigraph,
  DSWeightedGraph,
  DSDAG,
  DSHashMap,
  DSHashSet,
  DSNaryTree as DSNaryTreeMermaid,
  DSSegmentTree,
  DSBFS,
  DSDFS,
  DSAgentFlow,
} from "./ds";

// ds-tree.tsx (React-rendered tree structures)
import {
  DSTree,
  DSBinaryTree,
  DSBST,
  DSAVLTree,
  DSBalancedTree,
  DSFullTree,
  DSCompleteTree,
  DSPerfectTree,
  DSMinHeap,
  DSMaxHeap,
  DSNaryTree,
  DSBSTPlayground,
} from "./ds-tree";

import { Strong, Em } from "./emphasis";
import { FileTree } from "./file-tree";
import { GlossaryProvider, Term } from "./glossary";
import { HardwareSpec } from "./hardware-spec";
import { H1, H2, H3, H4, H5, H6 } from "./heading";
import { Headings } from "./headings";
import { Highlight } from "./highlight";
import { HorizontalRule } from "./horizontal-rule";
import { Image, ImageGlossary } from "./image";
import { Code } from "./inline-code";
import { Invariant } from "./invariant";
import { JsonLd } from "./json-ld";
import { Kbd } from "./kbd";
import { Link } from "./link";
import { UnorderedList, OrderedList, ListItem } from "./list";
import { Equation, EqSystem } from "./math-equation";
import {
  Frac,
  Pow,
  Sub,
  Sqrt,
  Abs,
  Deg,
  Inf,
  Greek,
  Alpha,
  Beta,
  Gamma,
  GDelta,
  Epsilon,
  Theta,
  Lambda,
  Mu,
  PiSym,
  Rho,
  SigmaSym,
  Tau,
  Phi,
  Omega,
  GammaU,
  DeltaU,
  ThetaU,
  LambdaU,
  SigmaU,
  PhiU,
  OmegaU,
  Approx,
  Neq,
  Leq,
  Geq,
  Arrow,
  Implies,
  Iff,
} from "./math-primitives";
import {
  Solution,
  SolutionStep,
  SolutionAnswer,
  SolutionNote,
} from "./math-solution";
import {
  Mermaid,
  MermaidBST,
  MermaidTree,
  MermaidBFS,
  MermaidDFS,
} from "./mermaid";
import { Paragraph } from "./paragraph";
import { PrivacyTable } from "./privacy-table";
import { RegisterMap } from "./register-map";
import { Reveal } from "./reveal";
import { SecurityNote } from "./security-note";
import { Spoiler } from "./spoiler";
import { Steps, Step } from "./steps";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs";
import { Terminal, TerminalLine } from "./terminal";
import { Tree, TreeItem } from "./tree";
import { Video } from "./video";

// ─── Component map ─────────────────────────────────────────────────────────────

export const mdxComponents = {
  // Accordion
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,

  // Alert
  Alert,
  AlertTitle,
  AlertDescription,

  // Annotation
  Annotation,

  // Badge
  Badge,

  // Blockquote
  Blockquote,

  // Callout
  Callout,

  // Card
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  LinkCard,

  // CertificationBadge
  CertificationBadge,

  // Changelog
  Changelog,
  ChangelogEntry,
  ChangelogItem,

  // Code
  CodeBlock,
  CodeGroup,

  // Tables
  ComplexityTable,
  DataTable,
  DataTypeTable,

  // Definition
  Definition,

  // DiffBlock
  DiffBlock,

  // Data structures — mermaid-based (aliased)
  DSArray,
  DSMatrix,
  DSLinkedList,
  DSDoublyLinkedList,
  DSCircularLinkedList,
  DSStack,
  DSQueue,
  DSDeque,
  DSPriorityQueue,
  DSBinaryTreeMermaid,
  DSBSTMermaid,
  DSMinHeapMermaid,
  DSMaxHeapMermaid,
  DSTrie,
  DSGraph,
  DSDigraph,
  DSWeightedGraph,
  DSDAG,
  DSHashMap,
  DSHashSet,
  DSNaryTreeMermaid,
  DSSegmentTree,
  DSBFS,
  DSDFS,
  DSAgentFlow,

  // Data structures — React-rendered trees
  DSTree,
  DSBinaryTree,
  DSBST,
  DSAVLTree,
  DSBalancedTree,
  DSFullTree,
  DSCompleteTree,
  DSPerfectTree,
  DSMinHeap,
  DSMaxHeap,
  DSNaryTree,
  DSBSTPlayground,

  // Emphasis
  Strong,
  Em,

  // FileTree
  FileTree,

  // Glossary
  GlossaryProvider,
  Term,

  // HardwareSpec
  HardwareSpec,

  // Heading
  Headings,

  // Highlight
  Highlight,

  // HorizontalRule
  HorizontalRule,

  // Image
  Image,
  ImageGlossary,

  // Inline code
  Code,

  // Invariant
  Invariant,

  // JsonLd
  JsonLd,

  // Kbd
  Kbd,

  // Link
  Link,

  // List
  UnorderedList,
  OrderedList,
  ListItem,

  // Math equation
  Equation,
  EqSystem,

  // Math primitives
  Frac,
  Pow,
  Sub,
  Sqrt,
  Abs,
  Deg,
  Inf,
  Greek,
  Alpha,
  Beta,
  Gamma,
  GDelta,
  Epsilon,
  Theta,
  Lambda,
  Mu,
  PiSym,
  Rho,
  SigmaSym,
  Tau,
  Phi,
  Omega,
  GammaU,
  DeltaU,
  ThetaU,
  LambdaU,
  SigmaU,
  PhiU,
  OmegaU,
  Approx,
  Neq,
  Leq,
  Geq,
  Arrow,
  Implies,
  Iff,

  // Math solution
  Solution,
  SolutionStep,
  SolutionAnswer,
  SolutionNote,

  // Mermaid
  Mermaid,
  MermaidBST,
  MermaidTree,
  MermaidBFS,
  MermaidDFS,

  // Paragraph
  Paragraph,

  // Privacy / Register
  PrivacyTable,
  RegisterMap,

  // Reveal / Spoiler
  Reveal,
  Spoiler,

  // SecurityNote
  SecurityNote,

  // Steps
  Steps,
  Step,

  // Table
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,

  // Tabs
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,

  // Terminal
  Terminal,
  TerminalLine,

  // Tree
  Tree,
  TreeItem,

  // Video
  Video,

  // ─── HTML element overrides ──────────────────────────────────────────────────
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  p: Paragraph,
  a: Link,
  ul: UnorderedList,
  ol: OrderedList,
  li: ListItem,
  blockquote: Blockquote,
  img: Image,
  hr: HorizontalRule,
  code: Code,
  pre: CodeBlock,
  strong: Strong,
  em: Em,
  table: Table,
  thead: TableHeader,
  tbody: TableBody,
  tfoot: TableFooter,
  tr: TableRow,
  th: TableHead,
  td: TableCell,
} as const;

export type MDXComponentMap = typeof mdxComponents;
