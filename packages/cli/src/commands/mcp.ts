import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";
import fs from "fs-extra";
import path from "path";
import { readFileSync } from "fs";
import {
  SYMBOL_MAP,
  searchSymbols,
  symbolsByCategory,
  buildMathStandard,
  formatEntry,
  CATEGORIES_LIST,
} from "../symbol-map.js";
import {
  latexToPrimitives,
  convertMarkdownMath,
  hasLatex,
  parseSolution,
} from "../latex-to-primitives.js";
import { fileURLToPath } from "url";

// ─── Version ─────────────────────────────────────────────────────────────────

function getCliVersion(): string {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const pkg = JSON.parse(
      readFileSync(path.join(__dirname, "../../package.json"), "utf-8"),
    );
    return typeof pkg.version === "string" ? pkg.version : "0.0.0";
  } catch {
    return "0.0.0";
  }
}

// ─── Registry ─────────────────────────────────────────────────────────────────

const REGISTRY_URL =
  "https://raw.githubusercontent.com/suryaravikumar-space/mdx-ui/main/registry/registry.json";

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

interface RegistryComponent {
  name: string;
  type: string;
  description: string;
  whenToUse?: string;
  whenNotToUse?: string;
  example?: string;
  dependencies?: string[];
  registryDependencies?: string[];
}

interface Registry {
  components: RegistryComponent[];
}

interface CacheEntry {
  data: Registry;
  fetchedAt: number;
}

let cache: CacheEntry | null = null;

async function loadLocalRegistry(): Promise<Registry | null> {
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const candidates = [
      path.join(__dirname, "../../../../registry/registry.json"),
      path.join(__dirname, "../../../registry/registry.json"),
      path.join(__dirname, "../../registry/registry.json"),
    ];
    for (const p of candidates) {
      if (await fs.pathExists(p)) {
        return await fs.readJSON(p);
      }
    }
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    process.stderr.write(
      `[mdx-ui mcp] Failed to load local registry: ${msg}\n`,
    );
  }
  return null;
}

async function fetchRegistry(): Promise<Registry> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data;
  }

  const local = await loadLocalRegistry();
  if (local) {
    if (!Array.isArray(local.components)) {
      throw new Error(
        "Local registry.json is malformed — missing components array",
      );
    }
    cache = { data: local, fetchedAt: Date.now() };
    return local;
  }

  try {
    const res = await axios.get<Registry>(REGISTRY_URL, { timeout: 8000 });
    const data = res.data;
    if (!data || !Array.isArray(data.components)) {
      throw new Error("Remote registry returned malformed data");
    }
    cache = { data, fetchedAt: Date.now() };
    return data;
  } catch (err: unknown) {
    if (cache) return cache.data;
    const reason = err instanceof Error ? err.message : "network error";
    throw new Error(`Could not load component registry — ${reason}`);
  }
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function levenshtein(a: string, b: string): number {
  const m = a.length;
  const n = b.length;
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

const normalize = (s: string) => s.toLowerCase().replace(/[-_\s]+/g, "");

function registryError(msg: string) {
  return {
    content: [{ type: "text" as const, text: `⚠️ ${msg}` }],
    isError: true,
  };
}

function formatComponent(c: RegistryComponent): string {
  const lines = [
    `## ${c.name}`,
    `**Type:** ${c.type}`,
    `**Description:** ${c.description}`,
  ];
  if (c.whenToUse) lines.push(`\n**When to use:** ${c.whenToUse}`);
  if (c.whenNotToUse) lines.push(`**When NOT to use:** ${c.whenNotToUse}`);
  if (c.dependencies?.length)
    lines.push(`\n**npm dependencies:** ${c.dependencies.join(", ")}`);
  if (c.registryDependencies?.length)
    lines.push(`**Requires:** ${c.registryDependencies.join(", ")}`);
  if (c.example) lines.push(`\n**Example:**\n\`\`\`mdx\n${c.example}\n\`\`\``);
  return lines.join("\n");
}

// ─── AI Output Standard ───────────────────────────────────────────────────────
// Built dynamically from symbol-map.ts — never hardcode math symbols here.

const STRUCTURE_STANDARD = `You generate content as MDX — Markdown with a small set of JSX components.

STRUCTURE
- Start sections with ## headings, subsections with ###, never go deeper
- Separate major sections with ---
- One blank line between block elements

STANDARD MARKDOWN (write these normally — they map to styled components automatically)
- Headings: ## and ###
- Bold: **text**, Italic: *text*
- Inline code: \`code\`
- Code blocks with language tag: \`\`\`lang
- Lists: - for unordered, 1. for ordered
- Tables: standard markdown | col | syntax
- Blockquotes: > text
- Horizontal rule: ---

CUSTOM COMPONENTS (use JSX for these only)

CALLOUT — notes, warnings, tips:
<Callout variant="info" title="Title">Content here.</Callout>
<Callout variant="warning" title="Title">Content here.</Callout>
<Callout variant="success" title="Title">Content here.</Callout>
<Callout variant="error" title="Title">Content here.</Callout>

STEPS — sequential procedures:
<Steps>
### Step 1: Title
Step content here.
### Step 2: Title
Step content here.
</Steps>

ACCORDION — optional depth, proofs, extra examples:
<Accordion>
  <AccordionItem value="unique-id">
    <AccordionTrigger>Label</AccordionTrigger>
    <AccordionContent>Content here.</AccordionContent>
  </AccordionItem>
</Accordion>

TABS — alternative explanations:
<Tabs>
  <TabsList>
    <TabsTrigger value="a">Label A</TabsTrigger>
    <TabsTrigger value="b">Label B</TabsTrigger>
  </TabsList>
  <TabsContent value="a">Content A</TabsContent>
  <TabsContent value="b">Content B</TabsContent>
</Tabs>

TOOLS — call these before writing math or solutions:

convert_latex(latex, block?)
  → converts any LaTeX expression to primitive JSX deterministically
  → USE THIS for any complex expression — do not guess the primitives yourself
  → example: convert_latex("\\int_{-\\infty}^{\\infty} f(x) e^{-2\\pi i x t}\\,dx")

parse_solution(text)
  → converts a plain-text step-by-step solution (with ⇒ steps, parenthetical reasons)
    into <Solution><SolutionStep>...</SolutionStep><SolutionAnswer/></Solution> MDX
  → USE THIS whenever you write a worked example or derivation

convert_mdx_math(content)
  → fixes an entire MDX string — replaces all $...$ and $$...$$ with primitives
  → USE THIS if you accidentally produced dollar-sign math

search_symbols(query)
  → find the right primitive component for any symbol or concept
  → example: search_symbols("fourier") → ScriptF, Integral usage

MATH — use primitive components only, never $ signs or LaTeX strings.
Each primitive maps directly to readable English: <Frac num="a" den="b" /> means "a over b".

── BUILDING BLOCKS ──────────────────────────────────────────────────────────────

Fraction            → <Frac num="1" den="2" />                        (1/2)
Power / exponent    → <Pow exp="2">x</Pow>                            (x²)
Subscript           → <Sub sub="n">a</Sub>                            (aₙ)
Square root         → <Sqrt>b² − 4ac</Sqrt>                          (√(b²−4ac))
Nth root            → <Sqrt n="3">x</Sqrt>                           (∛x)
Absolute value      → <Abs>x − y</Abs>                               (|x−y|)
Parentheses         → <Paren>a + b</Paren>                           ((a+b))
Infinity            → <Inf />                                         (∞)
Degree symbol       → <Deg>90</Deg>                                   (90°)

── CALCULUS ─────────────────────────────────────────────────────────────────────

Indefinite integral → <Integral>f(x) dx</Integral>
Definite integral   → <Integral from="a" to="b">f(x) dx</Integral>
To infinity         → <Integral from="0" to={<Inf />}>f(x) dx</Integral>
Summation           → <Sum from="i=1" to="n"><Pow exp="2">i</Pow></Sum>
Product             → <Prod from="i=1" to="n">i</Prod>
Limit               → <Lim sub="x → 0"><Frac num="sin x" den="x" /></Lim>

── GREEK LETTERS ────────────────────────────────────────────────────────────────

Lowercase: <Alpha /> <Beta /> <Gamma /> <Epsilon /> <Theta /> <Lambda />
           <Mu /> <PiSym /> <Rho /> <SigmaSym /> <Tau /> <Phi /> <Omega />
Uppercase: <GammaU /> <DeltaU /> <ThetaU /> <LambdaU /> <SigmaU /> <PhiU /> <OmegaU />

── REAL EXAMPLES ────────────────────────────────────────────────────────────────

Quadratic formula:
x = <Frac num={<span>−b ± <Sqrt>b² − 4ac</Sqrt></span>} den="2a" />

sin²θ + cos²θ = 1  (Pythagorean identity — write in plain text, use Greek inline):
sin²<Theta /> + cos²<Theta /> = 1

Euler's formula:
<Pow exp={<span>i<Theta /></span>}>e</Pow> = cos<Theta /> + i sin<Theta />

Derivative definition:
f′(x) = <Lim sub="h → 0"><Frac num={<span>f(x + h) − f(x)</span>} den="h" /></Lim>

Geometric series:
<Sum from="k=0" to={<Inf />}><Pow exp="k">r</Pow></Sum> = <Frac num="1" den="1 − r" /> when |r| < 1

Gaussian integral:
<Integral from={<span>−<Inf /></span>} to={<Inf />}><Pow exp={<span>−<Pow exp="2">x</Pow></span>}>e</Pow> dx</Integral> = <Sqrt><PiSym /></Sqrt>

Trig table cell (use in markdown table columns):
| <Theta /> | sin <Theta /> | cos <Theta /> | tan <Theta /> |
| 0° | 0 | 1 | 0 |
| 30° | <Frac num="1" den="2" /> | <Frac num={<Sqrt>3</Sqrt>} den="2" /> | <Frac num="1" den={<Sqrt>3</Sqrt>} /> |
| 45° | <Frac num={<Sqrt>2</Sqrt>} den="2" /> | <Frac num={<Sqrt>2</Sqrt>} den="2" /> | 1 |
| 60° | <Frac num={<Sqrt>3</Sqrt>} den="2" /> | <Frac num="1" den="2" /> | <Sqrt>3</Sqrt> |
| 90° | 1 | 0 | undefined |

Binomial coefficient (n choose k):
<Frac num={<span>n!</span>} den={<span>k!(n − k)!</span>} />

Integration by parts:
<Integral>u dv</Integral> = uv − <Integral>v du</Integral>

── COMPOSING NESTED EXPRESSIONS ─────────────────────────────────────────────────

For complex numerators/denominators, wrap in {<span>...</span>}:
<Frac num={<span><Pow exp="2">x</Pow> + 2x + 1</span>} den={<span>x − 1</span>} />

For exponents containing expressions:
<Pow exp={<span>−<Frac num="x" den="2" /></span>}>e</Pow>

── SOLUTION BLOCKS — step-by-step worked math ───────────────────────────────────

<Solution title="Problem statement in plain English">
  <SolutionStep reason="What this step does">expression with primitives</SolutionStep>
  <SolutionStep reason="Key insight" highlight>key transformation</SolutionStep>
  <SolutionAnswer>final result with primitives</SolutionAnswer>
  <SolutionNote>Optional caveat or note.</SolutionNote>
</Solution>

`;

// Composed at runtime — math section is always current with the symbol map
const OUTPUT_STANDARD = STRUCTURE_STANDARD + "\n\n" + buildMathStandard();

// ─── Category map ─────────────────────────────────────────────────────────────

const CATEGORIES: Record<string, string[]> = {
  "Layout & Structure": [
    "accordion",
    "callout",
    "card",
    "steps",
    "tabs",
    "reveal",
    "spoiler",
  ],
  "Typography & Text": [
    "blockquote",
    "emphasis",
    "heading",
    "headings",
    "highlight",
    "horizontal-rule",
    "inline-code",
    "kbd",
    "link",
    "list",
    "paragraph",
  ],
  Code: ["code-block", "code-group", "diff-block", "terminal"],
  Math: ["math-equation", "math-primitives", "math-solution"],
  "Data & Tables": [
    "complexity-table",
    "data-table",
    "data-type-table",
    "hardware-spec",
    "pin-table",
    "privacy-table",
    "register-map",
    "table",
  ],
  "Diagrams & Visualization": ["ds", "ds-tree", "file-tree", "mermaid", "tree"],
  Media: ["image", "video"],
  "Annotation & Reference": ["annotation", "glossary"],
  "Metadata & Utility": [
    "alert",
    "badge",
    "certification-badge",
    "changelog",
    "definition",
    "invariant",
    "json-ld",
    "security-note",
  ],
};

// ─── MDX validation rules ─────────────────────────────────────────────────────

interface ValidationIssue {
  line: number;
  rule: string;
  text: string;
}

// All valid mdx-ui component exports — generated from packages/registry/src/math-primitives.tsx
const ALLOWED_COMPONENTS = new Set([
  // layout & structure
  "Callout",
  "Steps",
  "Step",
  "Accordion",
  "AccordionItem",
  "AccordionTrigger",
  "AccordionContent",
  "Tabs",
  "TabsList",
  "TabsTrigger",
  "TabsContent",
  "CodeGroup",
  "Solution",
  "SolutionStep",
  "SolutionAnswer",
  "SolutionNote",
  "Equation",
  "EqSystem",
  // math-primitives — structural
  "Frac",
  "Pow",
  "Sub",
  "Sqrt",
  "Abs",
  "Paren",
  "Deg",
  "Inf",
  // math-primitives — calculus
  "Integral",
  "ContourIntegral",
  "DoubleInt",
  "TripleInt",
  "SurfaceInt",
  "VolumeInt",
  "Sum",
  "Prod",
  "Lim",
  "Limsup",
  "Liminf",
  "Deriv",
  "PDeriv",
  "Nabla",
  "Laplacian",
  "Overbrace",
  "Underbrace",
  // math-primitives — trig & functions
  "Sin",
  "Cos",
  "Tan",
  "Cot",
  "Sec",
  "Csc",
  "ArcSin",
  "ArcCos",
  "ArcTan",
  "Sinh",
  "Cosh",
  "Tanh",
  "Log",
  "Ln",
  "Exp",
  // math-primitives — algebra & combinatorics
  "Factorial",
  "Choose",
  "Perm",
  "Mod",
  "GCD",
  "LCM",
  "Floor",
  "Ceil",
  // math-primitives — set theory
  "SetOf",
  "Cardinality",
  "PowerSet",
  "In",
  "NotIn",
  "Subset",
  "SubsetEq",
  "Supset",
  "SupsetEq",
  "ProperSubset",
  "ProperSupset",
  "NotSubset",
  "NotSupset",
  "Union",
  "Intersect",
  "Empty",
  "SetMinus",
  "BigUnion",
  "BigIntersect",
  "BigAnd",
  "BigOr",
  "NN",
  "ZZ",
  "QQ",
  "RR",
  "CC",
  "PP",
  "FF",
  // math-primitives — logic & proof
  "And",
  "Or",
  "Not",
  "Xor",
  "Nand",
  "Nor",
  "ForAll",
  "Exists",
  "NotExists",
  "Therefore",
  "Because",
  "Turnstile",
  "QED",
  "Implies",
  "Iff",
  "Models",
  "NotTurnstile",
  "NotModels",
  "Top",
  "Bot",
  "Contradiction",
  "Tombstone",
  // math-primitives — linear algebra
  "Vec",
  "Norm",
  "Dot",
  "Cross",
  "Transpose",
  "Det",
  "Matrix",
  "SpanOp",
  "Rank",
  "Dim",
  "NullOp",
  "Img",
  "Trace",
  // math-primitives — probability & statistics
  "Prob",
  "CondProb",
  "Expected",
  "Variance",
  "StdDev",
  "Cov",
  "Corr",
  "Dist",
  // math-primitives — complex numbers
  "Complex",
  "Conj",
  // math-primitives — Greek lowercase
  "Greek",
  "Alpha",
  "Beta",
  "Gamma",
  "GDelta",
  "Epsilon",
  "Zeta",
  "Eta",
  "Theta",
  "Iota",
  "Kappa",
  "Lambda",
  "Mu",
  "Nu",
  "Xi",
  "PiSym",
  "Rho",
  "SigmaSym",
  "Tau",
  "Upsilon",
  "Phi",
  "Chi",
  "Psi",
  "Omega",
  // math-primitives — Greek uppercase
  "GammaU",
  "DeltaU",
  "ThetaU",
  "LambdaU",
  "XiU",
  "PiU",
  "SigmaU",
  "PhiU",
  "PsiU",
  "OmegaU",
  // math-primitives — Greek variants
  "Varsigma",
  "Varepsilon",
  "Varphi",
  "Vartheta",
  "Varpi",
  "Varrho",
  "Digamma",
  // math-primitives — relations & operators
  "Eq",
  "Neq",
  "NotEq",
  "Approx",
  "Equiv",
  "Cong",
  "NotCong",
  "NotSim",
  "Leq",
  "Geq",
  "Ll",
  "Gg",
  "Propto",
  "Sim",
  "PlusMinus",
  "MinusPlus",
  "Divides",
  "NotDivides",
  "Arrow",
  "MapsTo",
  "Compose",
  "OTimes",
  "DegNum",
  "Prec",
  "Succ",
  "PrecEq",
  "SuccEq",
  "LessGreater",
  "GreaterLess",
  // math-primitives — equality & definition
  "Approaches",
  "DefinedAs",
  "EqDef",
  "Corresponds",
  "Equiangular",
  "AsympEq",
  "NotAsympEq",
  "DefEq",
  // math-primitives — accents
  "Bar",
  "Hat",
  "Tilde",
  "DotAccent",
  "DDot",
  // math-primitives — prime notation
  "Prime",
  "DoublePrime",
  "TriplePrime",
  "PrimeOf",
  // math-primitives — arrows
  "LeftArrow",
  "UpArrow",
  "DownArrow",
  "LeftRightArrow",
  "UpDownArrow",
  "NearArrow",
  "SeArrow",
  "SwArrow",
  "NwArrow",
  "HookRightArrow",
  "HookLeftArrow",
  "TwoHeadRight",
  "TwoHeadLeft",
  "DoubleLeftArrow",
  "DoubleRightArrow",
  "DoubleLeftRightArrow",
  "DoubleUpArrow",
  "DoubleDownArrow",
  "DoubleUpDownArrow",
  "LongRightArrow",
  "LongLeftArrow",
  "LongLeftRightArrow",
  "LongMapsTo",
  "RightHarpoonUp",
  "RightHarpoonDown",
  "LeftHarpoonUp",
  "LeftHarpoonDown",
  "EquilibriumArrow",
  "DoubleHarpoon",
  "CircleArrow",
  "CircleArrowLeft",
  // math-primitives — dots & ellipsis
  "CDots",
  "VDots",
  "DDots",
  "LDots",
  "UpDots",
  // math-primitives — brackets & intervals
  "AngleBracket",
  "DoubleBracket",
  "Interval",
  "Brace",
  "Expr",
  // math-primitives — piecewise
  "Case",
  "Cases",
  // math-primitives — script letters
  "ScriptA",
  "ScriptB",
  "ScriptC",
  "ScriptD",
  "ScriptE",
  "ScriptF",
  "ScriptG",
  "ScriptH",
  "ScriptI",
  "ScriptJ",
  "ScriptK",
  "ScriptL",
  "ScriptM",
  "ScriptN",
  "ScriptO",
  "ScriptP",
  "ScriptQ",
  "ScriptR",
  "ScriptS",
  "ScriptT",
  "ScriptU",
  "ScriptV",
  "ScriptW",
  "ScriptX",
  "ScriptY",
  "ScriptZ",
  "ScriptEll",
  // math-primitives — physics
  "HBar",
  "Angstrom",
  "Bra",
  "Ket",
  "BraKet",
  "FrakR",
  "FrakI",
  "Weierstrass",
  // math-primitives — extra operators
  "DirectSum",
  "Hadamard",
  "CircledDiv",
  "CircledStar",
  "CircledPlus",
  "CircledMinus",
  "CircledTimes",
  "WreathProduct",
  "Star",
  "Bullet",
  "Dagger",
  "DoubleDagger",
  "Diamond",
  "Bowtie",
  "Amalg",
  "SmallInt",
  "Convo",
  // math-primitives — school arithmetic
  "Division",
  "Times",
  "Percent",
  "Permille",
  "Proportion",
  "Ratio",
  // math-primitives — geometry
  "Angle",
  "Triangle",
  "Segment",
  "Ray",
  "Arc",
  "Parallel",
  "NotParallel",
  "Perpendicular",
  "RightAngle",
  "RightAngleCorner",
  "RightTriangle",
  "Diameter",
  "MeasuredAngle",
  "SphericalAngle",
  "GeoCong",
  "GeoSim",
  // geometry-2d (Fig* visual SVG components)
  "FigScene", "FigPoint", "FigVector", "FigLine", "FigSegment",
  "FigCircle", "FigArc", "FigAngle", "FigPolygon", "FigLabel",
  "FigVisibleLine", "FigHiddenLine", "FigCenterLine", "FigDimensionLine",
  "FigExtensionLine", "FigLeaderLine", "FigSectionHatch", "FigCuttingPlane",
  "FigBreakLine", "FigPhantomLine",
  "FigEllipse", "FigSemicircle", "FigOval", "FigCrescent", "FigLens", "FigLune",
  "FigParabola", "FigHyperbola", "FigCardioid", "FigLimacon", "FigLemniscate",
  "FigRightAngleMarker", "FigEquilateralTriangle", "FigIsoscelesTriangle",
  "FigScaleneTriangle", "FigRightTriangle",
  "FigRect", "FigSquare", "FigRhombus", "FigParallelogram", "FigTrapezoid", "FigKite",
  "FigDart", "FigCrossQuad", "FigAntiparallelogram", "FigCyclicQuad", "FigTangentialQuad",
  "FigRegularPolygon", "FigPentagon", "FigHexagon", "FigHeptagon", "FigOctagon",
  "FigNonagon", "FigDecagon", "FigHendecagon", "FigDodecagon",
  "FigStarPolygon", "FigPentagram", "FigHexagram", "FigOctagram",
  "FigKochSnowflake", "FigSierpinskiTriangle",
  "FigMeasure", "FigCirclePi", "FigContour", "FigFunnel", "FigCuboid",
  "FigFunction", "FigDraggablePoint",
  "FigParabolaExplorer", "FigLineExplorer", "FigTangentExplorer", "FigSineExplorer", "FigCircleExplorer", "FigHyperbolicTangentExplorer",
  "ElecWire", "ElecNode", "ElecGround", "ElecResistor", "ElecCapacitor", "ElecInductor",
  "ElecFuse", "ElecBattery", "ElecVoltageSource", "ElecACSource", "ElecCurrentSource",
  "ElecSwitch", "ElecDiode", "ElecLED", "ElecLamp", "ElecVoltmeter", "ElecAmmeter", "ElecLabel",
  // math-primitives — shapes
  "Circle",
  "FilledCircle",
  "Square",
  "FilledSquare",
  "Rhombus",
  "FilledRhombus",
  "Pentagon",
  "Hexagon",
  "Ellipse",
  // math-primitives — number theory operators
  "Lcm",
  "Gcd",
  "Ord",
  "Sgn",
  "Arg",
  "Re",
  "Im",
  "Res",
  "Sup",
  "Inf2",
  "Max",
  "Min",
  "Ker",
  "Hom",
  "End",
  "Aut",
  "Der",
  // math-primitives — chemistry
  "ReactionArrow",
  "GasMarker",
  "PrecipitateMarker",
  "ChemEquilibrium",
  "SingleBond",
  "DoubleBond",
  "TripleBond",
  // math-primitives — misc symbols
  "Aleph",
  "Beth",
  "Gimel",
  "Daleth",
  "PartialDiff",
  "FlatSymbol",
  "SharpSymbol",
  "NaturalSymbol",
  "Differential",
  // math-primitives — shorthands
  "Squared",
  "Cubed",
  "Inverse",
  "SubZero",
  "SubOne",
  "SubTwo",
  // math-primitives — CS asymptotic notation
  "BigO",
  "BigTheta",
  "BigOmega",
  "LittleO",
  "LittleOmega",
  // math-primitives — basic arithmetic
  "Plus",
  "Minus",
  "Mul",
  "Div",
  "Modulus",
]);

const BANNED_HTML =
  /^<(div|span|p\b|b\b|i\b|strong|em|br|hr|section|article|main|aside|header|footer|nav)\s*[\s/>]/i;
const INVENTED_JSX = /^<([A-Z][a-zA-Z0-9]*)/;
const BANNED_MATH_COMPONENTS =
  /^<(InlineMath|BlockMath|Math\b|ME\b|BME\b|BM\b)\s/;
// Match $...$ only in non-digit context to avoid flagging currency like $10
const INLINE_MATH_DOLLAR = /(?<!\d)\$(?!\$|\d)[^$\n]{2,}\$/;
const BLOCK_MATH_DOLLAR = /\$\$/;

function validateMdxContent(content: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const lines = content.split("\n");

  let insideCodeFence = false;
  let codeFenceMarker = "";

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNo = i + 1;
    const trimmed = line.trim();

    // Track code fence open/close — skip checks inside fences
    const fenceMatch = trimmed.match(/^(`{3,}|~{3,})/);
    if (fenceMatch) {
      if (!insideCodeFence) {
        insideCodeFence = true;
        codeFenceMarker = fenceMatch[1];
      } else if (trimmed.startsWith(codeFenceMarker)) {
        insideCodeFence = false;
        codeFenceMarker = "";
      }
      continue;
    }
    if (insideCodeFence) continue;

    // Dollar-sign math (skip lines that look like plain currency)
    if (BLOCK_MATH_DOLLAR.test(line) || INLINE_MATH_DOLLAR.test(line)) {
      issues.push({
        line: lineNo,
        rule: "no-dollar-math",
        text: `Dollar-sign math detected — use math primitive components instead (Frac, Pow, Integral, etc.)`,
      });
    }

    // KaTeX components — use primitives instead
    if (BANNED_MATH_COMPONENTS.test(trimmed)) {
      issues.push({
        line: lineNo,
        rule: "no-katex-components",
        text: `KaTeX component not allowed — use math primitives: <Frac>, <Pow>, <Integral>, <Sum>, Greek letters, etc.`,
      });
    }

    // H1 heading
    if (/^# [^#]/.test(line)) {
      issues.push({
        line: lineNo,
        rule: "no-h1",
        text: `H1 heading not allowed — start sections with ## minimum`,
      });
    }

    // Heading deeper than H3
    if (/^#{4,} /.test(line)) {
      issues.push({
        line: lineNo,
        rule: "max-heading-depth",
        text: `Heading depth exceeds ### — maximum allowed is ###`,
      });
    }

    // Raw HTML tags
    if (BANNED_HTML.test(trimmed)) {
      issues.push({
        line: lineNo,
        rule: "no-raw-html",
        text: `Raw HTML tag not allowed — use Markdown or mdx-ui components`,
      });
    }

    // Invented JSX component names
    const jsxMatch = trimmed.match(INVENTED_JSX);
    if (jsxMatch) {
      const componentName = jsxMatch[1];
      if (!ALLOWED_COMPONENTS.has(componentName)) {
        issues.push({
          line: lineNo,
          rule: "no-invented-components",
          text: `Unknown component <${componentName}> — only use components listed in the output standard`,
        });
      }
    }
  }

  return issues;
}

// ─── Server ───────────────────────────────────────────────────────────────────

export async function startMcpServer() {
  const server = new McpServer({
    name: "mdx-ui",
    version: getCliVersion(),
  });

  // ── Resources ──────────────────────────────────────────────────────────────

  // Resource: full registry as JSON
  server.registerResource(
    "component-registry",
    "registry://components",
    {
      title: "mdx-ui Component Registry",
      description:
        "Full list of all mdx-ui components with metadata — name, description, whenToUse, whenNotToUse, example",
      mimeType: "application/json",
    },
    async () => {
      let registry: Registry;
      try {
        registry = await fetchRegistry();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return {
          contents: [
            {
              uri: "registry://components",
              mimeType: "application/json",
              text: JSON.stringify({ error: msg }),
            },
          ],
        };
      }
      return {
        contents: [
          {
            uri: "registry://components",
            mimeType: "application/json",
            text: JSON.stringify(registry, null, 2),
          },
        ],
      };
    },
  );

  // Resource: individual component by name (URI template)
  server.registerResource(
    "component",
    new ResourceTemplate("registry://component/{name}", {
      list: async () => {
        try {
          const registry = await fetchRegistry();
          return {
            resources: registry.components.map((c) => ({
              uri: `registry://component/${c.name}`,
              name: c.name,
              description: c.description,
              mimeType: "text/plain",
            })),
          };
        } catch {
          return { resources: [] };
        }
      },
    }),
    {
      title: "mdx-ui Component",
      description: "Full schema for a single mdx-ui component",
      mimeType: "text/plain",
    },
    async (uri, { name }) => {
      let registry: Registry;
      try {
        registry = await fetchRegistry();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        return {
          contents: [
            {
              uri: uri.href,
              mimeType: "text/plain",
              text: `Error: ${msg}`,
            },
          ],
        };
      }

      const componentName = Array.isArray(name) ? name[0] : name;
      const component =
        registry.components.find((c) => c.name === componentName) ??
        registry.components.find(
          (c) => normalize(c.name) === normalize(componentName ?? ""),
        );

      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "text/plain",
            text: component
              ? formatComponent(component)
              : `Component "${componentName}" not found.`,
          },
        ],
      };
    },
  );

  // Resource: AI Output Standard
  server.registerResource(
    "output-standard",
    "registry://standard",
    {
      title: "MDX AI Output Standard",
      description:
        "The standard MDX output format for LLMs — inject this into your system prompt",
      mimeType: "text/plain",
    },
    async () => ({
      contents: [
        {
          uri: "registry://standard",
          mimeType: "text/plain",
          text: OUTPUT_STANDARD,
        },
      ],
    }),
  );

  // ── Prompts ────────────────────────────────────────────────────────────────

  // Prompt: generate MDX content for a topic
  server.registerPrompt(
    "generate_mdx",
    {
      title: "Generate MDX Content",
      description:
        "Generate valid mdx-ui MDX content for a topic — injects the output standard and relevant components automatically",
      argsSchema: {
        topic: z
          .string()
          .min(3, "Topic must be at least 3 characters")
          .max(300, "Topic must be 300 characters or fewer")
          .describe("The subject to generate content about"),
        level: z
          .enum(["beginner", "intermediate", "advanced"])
          .optional()
          .describe("Audience level (default: intermediate)"),
        type: z
          .enum(["lesson", "reference", "exercise", "explanation"])
          .optional()
          .describe("Content type (default: lesson)"),
      },
    },
    async ({ topic, level = "intermediate", type = "lesson" }) => {
      let componentHint = "";
      try {
        const registry = await fetchRegistry();
        // Surface components most relevant to content generation
        const contentComponents = registry.components
          .filter((c) =>
            [
              "callout",
              "steps",
              "accordion",
              "tabs",
              "math-primitives",
              "math-solution",
              "code-block",
              "code-group",
            ].includes(c.name),
          )
          .map((c) => `- **${c.name}**: ${c.description}`)
          .join("\n");
        if (contentComponents) {
          componentHint = `\n\nKEY COMPONENTS FOR THIS CONTENT:\n${contentComponents}`;
        }
      } catch {
        // Proceed without component hints
      }

      const typeInstructions: Record<string, string> = {
        lesson:
          "Structure as a complete lesson: introduction, core concept, examples, key points to remember.",
        reference:
          "Structure as a reference: concise definitions, syntax, parameters, and quick examples.",
        exercise:
          "Structure as a guided exercise: goal statement, steps to follow, expected outcome.",
        explanation:
          "Structure as a focused explanation: one concept, multiple perspectives, concrete analogies.",
      };

      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `${OUTPUT_STANDARD}${componentHint}

---

Generate a ${level} ${type} about: **${topic}**

${typeInstructions[type]}

BEFORE WRITING MATH:
- Call convert_latex(latex) for any complex expression — never guess the primitives
- Call parse_solution(text) for any worked example or step-by-step derivation
- Call search_symbols(query) if unsure which component to use for a symbol

Output only the MDX content — no explanation, no code fences wrapping the whole thing.

MANDATORY SELF-CHECK BEFORE RESPONDING:
1. Call validate_mdx on your output.
2. If validate_mdx reports any dollar-math issues → call convert_mdx_math to fix them.
3. If validate_mdx reports unknown components → replace them with allowed primitives.
4. Return the corrected MDX — never return content that fails validate_mdx.`,
            },
          },
        ],
      };
    },
  );

  // Prompt: review MDX content against the output standard
  server.registerPrompt(
    "review_mdx",
    {
      title: "Review MDX Content",
      description:
        "Review MDX content against the AI Output Standard and suggest fixes",
      argsSchema: {
        content: z
          .string()
          .min(1, "Content cannot be empty")
          .max(50000, "Content must be 50,000 characters or fewer")
          .describe("The MDX content to review"),
      },
    },
    async ({ content }) => {
      // Run programmatic validation first so the AI has concrete issues to address
      const issues = validateMdxContent(content);
      const issueBlock =
        issues.length > 0
          ? `\n\nPRE-DETECTED ISSUES (${issues.length}):\n${issues
              .map((i) => `- Line ${i.line}: [${i.rule}] ${i.text}`)
              .join("\n")}`
          : "\n\nNo structural issues auto-detected — check for semantic and style problems.";

      return {
        messages: [
          {
            role: "user" as const,
            content: {
              type: "text" as const,
              text: `You are reviewing MDX content against the mdx-ui AI Output Standard.

OUTPUT STANDARD:
${OUTPUT_STANDARD}
${issueBlock}

---

CONTENT TO REVIEW:
${content}

---

Review the content above. For each problem found:
1. Quote the problematic line
2. State which rule it breaks
3. Provide the corrected version

If the content contains $...$ or $$...$$ math, call convert_mdx_math(content) to fix it automatically.
If the content has step-by-step solutions in plain text, call parse_solution(text) to convert them.
If any LaTeX expression needs converting, call convert_latex(latex) first.

Then provide the fully corrected MDX at the end.`,
            },
          },
        ],
      };
    },
  );

  // ── Tools ──────────────────────────────────────────────────────────────────

  // Tool 1: list all components
  server.registerTool(
    "list_components",
    {
      description:
        "List all available mdx-ui components with descriptions. For a grouped view by category, use list_categories instead.",
    },
    async () => {
      let registry: Registry;
      try {
        registry = await fetchRegistry();
      } catch (err: unknown) {
        return registryError(err instanceof Error ? err.message : String(err));
      }
      const lines = registry.components.map(
        (c) => `- **${c.name}** (${c.type}): ${c.description}`,
      );
      return {
        content: [{ type: "text", text: lines.join("\n") }],
      };
    },
  );

  // Tool 2: get full schema for a component
  server.registerTool(
    "get_component",
    {
      description:
        "Get the full schema for a component — props, when to use, when not to use, and an MDX usage example",
      inputSchema: {
        name: z
          .string()
          .min(1, "Component name cannot be empty")
          .describe("Component name, e.g. accordion, complexity-table, dsbst"),
      },
    },
    async ({ name }) => {
      let registry: Registry;
      try {
        registry = await fetchRegistry();
      } catch (err: unknown) {
        return registryError(err instanceof Error ? err.message : String(err));
      }

      const normalizedInput = normalize(name);

      const component =
        registry.components.find((c) => c.name === name.toLowerCase()) ??
        registry.components.find((c) => normalize(c.name) === normalizedInput);

      if (!component) {
        const scored = registry.components
          .map((c) => ({
            name: c.name,
            dist: levenshtein(normalizedInput, normalize(c.name)),
          }))
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 3);

        const suggestions =
          scored[0].dist <= 4
            ? `\n\nDid you mean: ${scored.map((s) => `**${s.name}**`).join(", ")}?`
            : `\n\nUse list_categories to browse all available components.`;

        return {
          content: [
            {
              type: "text",
              text: `Component "${name}" not found.${suggestions}`,
            },
          ],
        };
      }

      return {
        content: [{ type: "text", text: formatComponent(component) }],
      };
    },
  );

  // Tool 3: search components by keyword
  server.registerTool(
    "search_components",
    {
      description:
        "Search components by keyword or use case — e.g. 'math', 'tree', 'security', 'table'",
      inputSchema: {
        query: z
          .string()
          .min(2, "Query must be at least 2 characters")
          .max(200, "Query must be 200 characters or fewer")
          .describe("Search keyword or use case description"),
      },
    },
    async ({ query }) => {
      let registry: Registry;
      try {
        registry = await fetchRegistry();
      } catch (err: unknown) {
        return registryError(err instanceof Error ? err.message : String(err));
      }

      const words = query
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 1);

      // Guard: if all words are single characters, treat query as a single token
      const effectiveWords =
        words.length > 0 ? words : [query.toLowerCase().trim()];

      const matches = registry.components.filter((c) => {
        const haystack = [
          c.name,
          c.description,
          c.whenToUse ?? "",
          c.whenNotToUse ?? "",
          c.type,
        ]
          .join(" ")
          .toLowerCase();
        return effectiveWords.every((w) => haystack.includes(w));
      });

      if (matches.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No components found matching "${query}".`,
            },
          ],
        };
      }

      const lines = [
        `Found ${matches.length} component${matches.length !== 1 ? "s" : ""} matching "${query}":\n`,
        ...matches.map((c) => `- **${c.name}**: ${c.description}`),
        `\nUse get_component(<name>) for full schema and examples.`,
      ];

      return {
        content: [{ type: "text", text: lines.join("\n") }],
      };
    },
  );

  // Tool 4: get the AI Output Standard
  server.registerTool(
    "get_output_standard",
    {
      description:
        "Get the MDX AI Output Standard — the system prompt block to inject so an LLM generates valid MDX that renders correctly with mdx-ui components",
    },
    async () => ({
      content: [{ type: "text", text: OUTPUT_STANDARD }],
    }),
  );

  // Tool 5: list components grouped by category
  server.registerTool(
    "list_categories",
    {
      description:
        "List mdx-ui components grouped by category — use this to discover components before calling get_component",
    },
    async () => {
      let registry: Registry;
      try {
        registry = await fetchRegistry();
      } catch (err: unknown) {
        return registryError(err instanceof Error ? err.message : String(err));
      }

      const byName = new Map(registry.components.map((c) => [c.name, c]));
      const lines: string[] = [];

      for (const [category, names] of Object.entries(CATEGORIES)) {
        lines.push(`\n### ${category}`);
        for (const name of names) {
          const comp = byName.get(name);
          if (comp) lines.push(`- **${comp.name}**: ${comp.description}`);
        }
      }

      lines.push(
        "\nUse get_component(<name>) for full schema, or search_components(<query>) to find by use case.",
      );

      return {
        content: [{ type: "text", text: lines.join("\n") }],
      };
    },
  );

  // Tool 6: validate MDX content against the output standard
  server.registerTool(
    "validate_mdx",
    {
      description:
        "Validate MDX content against the AI Output Standard — checks for dollar-sign math, raw HTML, H1 headings, heading depth, and unknown components",
      inputSchema: {
        content: z
          .string()
          .min(1, "Content cannot be empty")
          .max(50000, "Content must be 50,000 characters or fewer")
          .describe("The MDX content to validate"),
      },
    },
    async ({ content }) => {
      const issues = validateMdxContent(content);

      if (issues.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: "✅ No issues found — content follows the MDX AI Output Standard.",
            },
          ],
        };
      }

      const lines = [
        `❌ Found ${issues.length} issue${issues.length !== 1 ? "s" : ""}:\n`,
        ...issues.map((i) => `- **Line ${i.line}** [${i.rule}]: ${i.text}`),
        `\nUse the review_mdx prompt to get a corrected version.`,
      ];

      return {
        content: [{ type: "text", text: lines.join("\n") }],
      };
    },
  );

  // Resource: full symbol map as JSON
  server.registerResource(
    "symbol-map",
    "registry://symbol-map",
    {
      title: "mdx-ui Symbol Map",
      description:
        "Complete mapping of mathematical symbols / LaTeX names to mdx-ui primitive components — use this to find the right component for any symbol",
      mimeType: "application/json",
    },
    async () => ({
      contents: [
        {
          uri: "registry://symbol-map",
          mimeType: "application/json",
          text: JSON.stringify(SYMBOL_MAP, null, 2),
        },
      ],
    }),
  );

  // Tool: search symbols by concept name, LaTeX, or Unicode symbol
  server.registerTool(
    "search_symbols",
    {
      description:
        "Search the symbol map by concept name, LaTeX command, Unicode symbol, or category — returns the mdx-ui primitive component and MDX usage example",
      inputSchema: {
        query: z
          .string()
          .min(1, "Query cannot be empty")
          .max(200)
          .describe(
            "What to search for — e.g. 'integral', '\\\\frac', '∑', 'greek', 'geometry'",
          ),
      },
    },
    async ({ query }) => {
      const results = searchSymbols(query);
      if (results.length === 0) {
        return {
          content: [
            {
              type: "text",
              text: `No symbols found for "${query}".\n\nTry: 'integral', 'fraction', 'greek', 'geometry', 'arrow', 'logic', 'set', 'probability', 'physics', 'chemistry'`,
            },
          ],
        };
      }
      const lines = [
        `Found ${results.length} symbol${results.length !== 1 ? "s" : ""} for "${query}":\n`,
        ...results.map(
          (e) =>
            `**${e.name}** [${e.category}]\n  Symbols: ${e.symbols.join(", ")}\n  LaTeX: ${e.latex.slice(0, 2).join(" or ")}\n  → \`${e.usage}\`\n`,
        ),
      ];
      return { content: [{ type: "text", text: lines.join("\n") }] };
    },
  );

  // Tool: list all symbol categories
  server.registerTool(
    "list_symbol_categories",
    {
      description:
        "List all symbol categories in the symbol map — use with search_symbols to explore by category",
    },
    async () => {
      const lines = CATEGORIES_LIST.map((cat) => {
        const count = symbolsByCategory(cat).length;
        return `- **${cat}** (${count} symbols)`;
      });
      return {
        content: [
          {
            type: "text",
            text: `Symbol map categories:\n\n${lines.join("\n")}\n\nUse search_symbols with a category name to list all symbols in it.`,
          },
        ],
      };
    },
  );

  // Tool: get the complete symbol map as a formatted cheat sheet
  server.registerTool(
    "get_symbol_cheatsheet",
    {
      description:
        "Get the complete symbol map as a formatted cheat sheet — every symbol with its component and usage, grouped by category",
      inputSchema: {
        category: z
          .string()
          .optional()
          .describe("Filter to a single category (e.g. 'calculus', 'greek')"),
      },
    },
    async ({ category }) => {
      const entries = category
        ? symbolsByCategory(category as Parameters<typeof symbolsByCategory>[0])
        : SYMBOL_MAP;

      if (entries.length === 0) {
        return {
          content: [
            { type: "text", text: `No entries for category "${category}".` },
          ],
        };
      }

      const lines: string[] = [];
      let lastCat = "";
      for (const e of entries) {
        if (e.category !== lastCat) {
          lines.push(`\n### ${e.category.toUpperCase().replace(/-/g, " ")}`);
          lastCat = e.category;
        }
        lines.push(`  ${formatEntry(e)}`);
      }

      return {
        content: [{ type: "text", text: lines.join("\n") }],
      };
    },
  );

  // Tool: convert LaTeX to primitives — deterministic, no guessing
  server.registerTool(
    "convert_latex",
    {
      description:
        "Convert a LaTeX math expression to mdx-ui primitive components deterministically. Use this whenever you need to write a complex math expression — pass the LaTeX and get back ready-to-paste MDX primitives.",
      inputSchema: {
        latex: z
          .string()
          .min(1)
          .max(2000)
          .describe(
            "LaTeX expression WITHOUT $ delimiters — e.g. \\\\int_{-\\\\infty}^{\\\\infty} f(x)\\\\,dx",
          ),
        block: z
          .boolean()
          .optional()
          .describe(
            "Wrap in <Equation> for display/block mode (default: false = inline)",
          ),
      },
    },
    async ({ latex, block = false }) => {
      const result = latexToPrimitives(latex, block);
      return {
        content: [
          {
            type: "text",
            text: `**Input LaTeX:** \`${latex}\`\n\n**MDX Primitives:**\n\`\`\`mdx\n${result}\n\`\`\``,
          },
        ],
      };
    },
  );

  // Tool: convert a full MDX string — replaces all $...$ and $$...$$ with primitives
  server.registerTool(
    "convert_mdx_math",
    {
      description:
        "Convert all $...$ and $$...$$ LaTeX math in an MDX string to mdx-ui primitives. Use this to fix AI-generated content that used dollar-sign math instead of components.",
      inputSchema: {
        content: z
          .string()
          .min(1)
          .max(50000)
          .describe("MDX content that may contain $...$ or $$...$$ math"),
      },
    },
    async ({ content }) => {
      if (!hasLatex(content)) {
        return {
          content: [
            {
              type: "text",
              text: "✅ No LaTeX found — content already uses primitives.",
            },
          ],
        };
      }
      const converted = convertMarkdownMath(content);
      return {
        content: [
          {
            type: "text",
            text: `**Converted MDX:**\n\`\`\`mdx\n${converted}\n\`\`\``,
          },
        ],
      };
    },
  );

  // Tool: parse plain-text step-by-step solution → Solution component MDX
  server.registerTool(
    "parse_solution",
    {
      description:
        "Convert a plain-text step-by-step math solution (with ⇒ steps, parenthetical reasons, fractions like 3/2) into <Solution><SolutionStep>...</SolutionStep></Solution> MDX components automatically.",
      inputSchema: {
        text: z
          .string()
          .min(10)
          .max(10000)
          .describe(
            "The plain-text solution — include the problem statement and all ⇒ steps with parenthetical reasons",
          ),
      },
    },
    async ({ text }) => {
      const mdx = parseSolution(text);
      return {
        content: [
          {
            type: "text",
            text: `**Converted to MDX:**\n\`\`\`mdx\n${mdx}\n\`\`\``,
          },
        ],
      };
    },
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
