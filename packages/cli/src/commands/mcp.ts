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

const OUTPUT_STANDARD = `You generate content as MDX — Markdown with a small set of JSX components.

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

MATH — always use components, never $ signs:
Inline: <InlineMath math="\\frac{a}{b}" />
Block:  <BlockMath math="\\int_0^1 x\\,dx = \\frac{1}{2}" />

STRICT RULES
- NEVER use $...$ or $$...$$ for math
- NEVER use raw HTML tags
- NEVER invent component names not listed above
- NEVER use # (h1) headings
- NEVER go deeper than ### headings
- Props take plain strings only`;

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
  Math: [
    "math",
    "math-easy",
    "math-equation",
    "math-primitives",
    "math-solution",
  ],
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

// All valid mdx-ui component exports — keep in sync with packages/registry/src/
const ALLOWED_COMPONENTS = new Set([
  // callout
  "Callout",
  // steps
  "Steps",
  "Step",
  // accordion
  "Accordion",
  "AccordionItem",
  "AccordionTrigger",
  "AccordionContent",
  // tabs
  "Tabs",
  "TabsList",
  "TabsTrigger",
  "TabsContent",
  // code-group
  "CodeGroup",
  // math (math.tsx)
  "Math",
  "InlineMath",
  "BlockMath",
  "M",
  "BM",
  // math-easy
  "ME",
  "BME",
  // math-solution
  "Solution",
  "SolutionStep",
  "SolutionAnswer",
  "SolutionNote",
  // math-equation
  "Equation",
  "EqSystem",
  // math-primitives — arithmetic & calculus
  "Frac",
  "Pow",
  "Sub",
  "Sqrt",
  "Abs",
  "Paren",
  "Deg",
  "Inf",
  "Integral",
  "Sum",
  "Prod",
  "Lim",
  "Limsup",
  "Liminf",
  "Deriv",
  "PDeriv",
  "Nabla",
  "Laplacian",
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
  // math-primitives — combinatorics & number theory
  "Factorial",
  "Choose",
  "Perm",
  "Mod",
  "GCD",
  "LCM",
  "Floor",
  "Ceil",
  // math-primitives — sets
  "SetOf",
  "Cardinality",
  "PowerSet",
  "In",
  "NotIn",
  "Subset",
  "SubsetEq",
  "Supset",
  "SupsetEq",
  "Union",
  "Intersect",
  "Empty",
  "SetMinus",
  "NN",
  "ZZ",
  "QQ",
  "RR",
  "CC",
  "PP",
  "FF",
  // math-primitives — logic
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
  "Implies",
  "Iff",
  "QED",
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
  // math-primitives — Greek letters
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
  // math-primitives — relations & operators
  "Neq",
  "Approx",
  "Equiv",
  "Cong",
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
  "Eq",
  "NotEq",
]);

const BANNED_HTML =
  /^<(div|span|p\b|b\b|i\b|strong|em|br|hr|section|article|main|aside|header|footer|nav)\s*[\s/>]/i;
const INVENTED_JSX = /^<([A-Z][a-zA-Z0-9]*)/;
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
        text: `Dollar-sign math detected — use <InlineMath> or <BlockMath> instead`,
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
              "math",
              "math-easy",
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

Output only the MDX content — no explanation, no code fences wrapping the whole thing.`,
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

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
