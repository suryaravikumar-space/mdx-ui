import { useMDXComponent } from "next-contentlayer2/hooks";
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
import { Preview } from "@/components/mdx/preview";
import { ComponentPreview } from "@/components/component-preview";
import { GlossaryProvider, Term } from "@/components/mdx/glossary";
import { Video } from "@/components/mdx/video";
import { Image, ImageGlossary } from "@/components/mdx/image";
import { DataTable } from "@/components/mdx/data-table";
import { Highlight } from "@/components/mdx/highlight";
import { DiffBlock } from "@/components/mdx/diff-block";
import { Terminal, TerminalLine } from "@/components/mdx/terminal";
import {
  Changelog,
  ChangelogEntry,
  ChangelogItem,
} from "@/components/mdx/changelog";
import { JsonLd } from "@/components/mdx/json-ld";
import { Definition } from "@/components/mdx/definition";
import { Invariant } from "@/components/mdx/invariant";
import { ComplexityTable } from "@/components/mdx/complexity-table";
import { HardwareSpec } from "@/components/mdx/hardware-spec";
import { DataTypeTable } from "@/components/mdx/data-type-table";
import { SecurityNote } from "@/components/mdx/security-note";
import { RegisterMap } from "@/components/mdx/register-map";
import { PrivacyTable } from "@/components/mdx/privacy-table";
import { CertificationBadge } from "@/components/mdx/certification-badge";
import {
  // Section 1 — Basic
  Frac,
  Pow,
  Sub,
  Sqrt,
  Abs,
  Paren,
  Deg,
  Inf,
  // Section 2 — Calculus
  Integral,
  Sum,
  Prod,
  Lim,
  Deriv,
  PDeriv,
  Nabla,
  Laplacian,
  // Section 3 — Trig
  Sin,
  Cos,
  Tan,
  Cot,
  Sec,
  Csc,
  ArcSin,
  ArcCos,
  ArcTan,
  Sinh,
  Cosh,
  Tanh,
  Log,
  Ln,
  Exp,
  // Section 4 — Algebra & Combinatorics
  Factorial,
  Choose,
  Perm,
  Mod,
  GCD,
  LCM,
  // Section 5 — Set Theory
  Floor,
  Ceil,
  SetOf,
  Cardinality,
  PowerSet,
  In,
  NotIn,
  Subset,
  SubsetEq,
  Supset,
  SupsetEq,
  Union,
  Intersect,
  Empty,
  SetMinus,
  // Section 6 — Number Systems
  NN,
  ZZ,
  QQ,
  RR,
  CC,
  PP,
  FF,
  Complex,
  Conj,
  // Section 7 — Logic
  And,
  Or,
  Not,
  Xor,
  Nand,
  Nor,
  ForAll,
  Exists,
  NotExists,
  Therefore,
  Because,
  Turnstile,
  QED,
  // Section 8 — Linear Algebra
  Vec,
  Norm,
  Dot,
  Cross,
  Transpose,
  Det,
  Matrix,
  SpanOp,
  Rank,
  Dim,
  NullOp,
  Img,
  Trace,
  // Section 9 — Statistics
  Prob,
  CondProb,
  Expected,
  Variance,
  StdDev,
  Cov,
  Corr,
  Dist,
  // Section 10 — Greek
  Greek,
  Alpha,
  Beta,
  Gamma,
  GDelta,
  Epsilon,
  Zeta,
  Eta,
  Theta,
  Iota,
  Kappa,
  Lambda,
  Mu,
  Nu,
  Xi,
  PiSym,
  Rho,
  SigmaSym,
  Tau,
  Upsilon,
  Phi,
  Chi,
  Psi,
  Omega,
  GammaU,
  DeltaU,
  ThetaU,
  LambdaU,
  XiU,
  PiU,
  SigmaU,
  PhiU,
  PsiU,
  OmegaU,
  // Section 2 additions
  Limsup,
  Liminf,
  // Section 7 additions
  Implies,
  Iff,
  // Section 11 — Relations, Arrows & Arithmetic
  Neq,
  Approx,
  Equiv,
  Cong,
  Leq,
  Geq,
  Ll,
  Gg,
  Propto,
  Sim,
  PlusMinus,
  MinusPlus,
  Divides,
  NotDivides,
  Arrow,
  MapsTo,
  Compose,
  OTimes,
  DegNum,
  Eq,
  NotEq,
} from "@/components/mdx/math-primitives";
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

const components = {
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
  Preview,
  ComponentPreview,
  GlossaryProvider,
  Term,
  Video,
  Image,
  ImageGlossary,
  DataTable,
  Highlight,
  DiffBlock,
  Terminal,
  TerminalLine,
  Changelog,
  ChangelogEntry,
  ChangelogItem,
  JsonLd,
  Definition,
  Invariant,
  ComplexityTable,
  HardwareSpec,
  DataTypeTable,
  SecurityNote,
  RegisterMap,
  PrivacyTable,
  CertificationBadge,
  // math-primitives
  Frac,
  Pow,
  Sub,
  Sqrt,
  Abs,
  Paren,
  Deg,
  Inf,
  Integral,
  Sum,
  Prod,
  Lim,
  Deriv,
  PDeriv,
  Nabla,
  Laplacian,
  Sin,
  Cos,
  Tan,
  Cot,
  Sec,
  Csc,
  ArcSin,
  ArcCos,
  ArcTan,
  Sinh,
  Cosh,
  Tanh,
  Log,
  Ln,
  Exp,
  Factorial,
  Choose,
  Perm,
  Mod,
  GCD,
  LCM,
  Floor,
  Ceil,
  SetOf,
  Cardinality,
  PowerSet,
  In,
  NotIn,
  Subset,
  SubsetEq,
  Supset,
  SupsetEq,
  Union,
  Intersect,
  Empty,
  SetMinus,
  NN,
  ZZ,
  QQ,
  RR,
  CC,
  PP,
  FF,
  Complex,
  Conj,
  And,
  Or,
  Not,
  Xor,
  Nand,
  Nor,
  ForAll,
  Exists,
  NotExists,
  Therefore,
  Because,
  Turnstile,
  QED,
  Vec,
  Norm,
  Dot,
  Cross,
  Transpose,
  Det,
  Matrix,
  SpanOp,
  Rank,
  Dim,
  NullOp,
  Img,
  Trace,
  Prob,
  CondProb,
  Expected,
  Variance,
  StdDev,
  Cov,
  Corr,
  Dist,
  Greek,
  Alpha,
  Beta,
  Gamma,
  GDelta,
  Epsilon,
  Zeta,
  Eta,
  Theta,
  Iota,
  Kappa,
  Lambda,
  Mu,
  Nu,
  Xi,
  PiSym,
  Rho,
  SigmaSym,
  Tau,
  Upsilon,
  Phi,
  Chi,
  Psi,
  Omega,
  GammaU,
  DeltaU,
  ThetaU,
  LambdaU,
  XiU,
  PiU,
  SigmaU,
  PhiU,
  PsiU,
  OmegaU,
  // Section 2 additions
  Limsup,
  Liminf,
  // Section 7 additions
  Implies,
  Iff,
  // Section 11 — Relations, Arrows & Arithmetic
  Neq,
  Approx,
  Equiv,
  Cong,
  Leq,
  Geq,
  Ll,
  Gg,
  Propto,
  Sim,
  PlusMinus,
  MinusPlus,
  Divides,
  NotDivides,
  Arrow,
  MapsTo,
  Compose,
  OTimes,
  // Convenience shorthands
  DegNum,
  Eq,
  NotEq,
  // math-easy
  ME,
  BME,
  // math-equation
  Equation,
  EqSystem,
  Solution,
  SolutionStep,
  SolutionAnswer,
  SolutionNote,
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
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link {...props} />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-base leading-7 [&:not(:first-child)]:mt-6" {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc space-y-2 [&>li]:mt-2" {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 ml-6 list-decimal space-y-2 [&>li]:mt-2" {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className="mt-2" {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote className="mt-6 border-l-2 pl-6 italic" {...props} />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="rounded-md" alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="m-0 border-t p-0 even:bg-muted" {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      {...props}
    />
  ),
  pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      className="mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4"
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm"
      {...props}
    />
  ),
  div: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    if (className === "preview") {
      return <div className="my-6 rounded-lg border bg-card p-6" {...props} />;
    }
    return <div className={className} {...props} />;
  },
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
