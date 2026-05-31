import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/mdx/accordion";
import { Badge } from "@/components/mdx/badge";
import { Blockquote } from "@/components/mdx/blockquote";
import { Callout } from "@/components/mdx/callout";
import { Steps, Step } from "@/components/mdx/steps";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/mdx/tabs";
import { Tree, TreeItem } from "@/components/mdx/tree";
import { FileTree } from "@/components/mdx/file-tree";
import { Headings } from "@/components/mdx/headings";
import { H1, H2, H3, H4, H5, H6 } from "@/components/mdx/heading";
import {
  Paragraph,
  Lead,
  Intro,
  Large,
  Small,
  Muted,
} from "@/components/mdx/paragraph";
import { Math, BlockMath, InlineMath, M, BM } from "@/components/mdx/math";
import {
  Mermaid,
  MermaidBST,
  MermaidTree,
  MermaidBFS,
  MermaidDFS,
} from "@/components/mdx/mermaid";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "@/components/mdx/table";
import { CodeGroup } from "@/components/mdx/code-group";
import { Alert, AlertTitle, AlertDescription } from "@/components/mdx/alert";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  LinkCard,
} from "@/components/mdx/card";
import { Kbd } from "@/components/mdx/kbd";
import { Link } from "@/components/mdx/link";
import { Spoiler } from "@/components/mdx/spoiler";
import { Annotation } from "@/components/mdx/annotation";
import { Reveal } from "@/components/mdx/reveal";
import { GlossaryProvider, Term } from "@/components/mdx/glossary";
import { DataTable } from "@/components/mdx/data-table";
import { Highlight } from "@/components/mdx/highlight";
import { DiffBlock } from "@/components/mdx/diff-block";
import { Terminal, TerminalLine } from "@/components/mdx/terminal";
import {
  Changelog,
  ChangelogEntry,
  ChangelogItem,
} from "@/components/mdx/changelog";
import { Definition } from "@/components/mdx/definition";
import { Invariant } from "@/components/mdx/invariant";
import { ComplexityTable } from "@/components/mdx/complexity-table";
import { HardwareSpec } from "@/components/mdx/hardware-spec";
import { DataTypeTable } from "@/components/mdx/data-type-table";
import { SecurityNote } from "@/components/mdx/security-note";
import { RegisterMap } from "@/components/mdx/register-map";
import { PrivacyTable } from "@/components/mdx/privacy-table";
import { CertificationBadge } from "@/components/mdx/certification-badge";
import * as MathPrimitives from "@/components/mdx/math-primitives";
import { Equation, EqSystem } from "@/components/mdx/math-equation";
import {
  Solution,
  SolutionStep,
  SolutionAnswer,
  SolutionNote,
} from "@/components/mdx/math-solution";
import { ME, BME } from "@/components/mdx/math-easy";
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
  DSBinaryTree,
  DSBST,
  DSMinHeap,
  DSMaxHeap,
  DSTrie,
  DSGraph,
  DSDigraph,
  DSWeightedGraph,
  DSDAG,
  DSHashMap,
  DSHashSet,
  DSNaryTree,
  DSSegmentTree,
  DSBFS,
  DSDFS,
  DSAgentFlow,
} from "@/components/mdx/ds";

export const PLAYGROUND_COMPONENTS: Record<string, React.ComponentType<any>> = {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  Badge,
  Blockquote,
  Callout,
  Steps,
  Step,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Tree,
  TreeItem,
  FileTree,
  Headings,
  Paragraph,
  Lead,
  Intro,
  Large,
  Small,
  Muted,
  Math,
  BlockMath,
  InlineMath,
  M,
  BM,
  Mermaid,
  MermaidBST,
  MermaidTree,
  MermaidBFS,
  MermaidDFS,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  CodeGroup,
  Alert,
  AlertTitle,
  AlertDescription,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  LinkCard,
  Kbd,
  Link,
  Spoiler,
  Annotation,
  Reveal,
  GlossaryProvider,
  Term,
  DataTable,
  Highlight,
  DiffBlock,
  Terminal,
  TerminalLine,
  Changelog,
  ChangelogEntry,
  ChangelogItem,
  Definition,
  Invariant,
  ComplexityTable,
  HardwareSpec,
  DataTypeTable,
  SecurityNote,
  RegisterMap,
  PrivacyTable,
  CertificationBadge,
  ...MathPrimitives,
  Equation,
  EqSystem,
  Solution,
  SolutionStep,
  SolutionAnswer,
  SolutionNote,
  ME,
  BME,
  DSArray,
  DSMatrix,
  DSLinkedList,
  DSDoublyLinkedList,
  DSCircularLinkedList,
  DSStack,
  DSQueue,
  DSDeque,
  DSPriorityQueue,
  DSBinaryTree,
  DSBST,
  DSMinHeap,
  DSMaxHeap,
  DSTrie,
  DSGraph,
  DSDigraph,
  DSWeightedGraph,
  DSDAG,
  DSHashMap,
  DSHashSet,
  DSNaryTree,
  DSSegmentTree,
  DSBFS,
  DSDFS,
  DSAgentFlow,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link {...props} />
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc space-y-2 [&>li]:mt-2" {...props} />
  ),
  ol: (props: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 ml-6 list-decimal space-y-2 [&>li]:mt-2" {...props} />
  ),
  li: (props: React.HTMLAttributes<HTMLElement>) => (
    <li className="mt-2" {...props} />
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4"
      {...props}
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
      {...props}
    />
  ),
};
