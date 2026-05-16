import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

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
  } catch {
    // fall through
  }
  return null;
}

async function fetchRegistry(): Promise<Registry> {
  // Return cached data if still fresh
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) {
    return cache.data;
  }

  // Try local registry first (monorepo / development)
  const local = await loadLocalRegistry();
  if (local) {
    cache = { data: local, fetchedAt: Date.now() };
    return local;
  }

  // Fetch from remote
  try {
    const res = await axios.get<Registry>(REGISTRY_URL, { timeout: 8000 });
    cache = { data: res.data, fetchedAt: Date.now() };
    return res.data;
  } catch (err: any) {
    // If we have stale cache, serve it rather than crashing
    if (cache) return cache.data;
    const reason =
      err.code === "ECONNABORTED"
        ? "request timed out"
        : err.message ?? "network error";
    throw new Error(`Could not load component registry — ${reason}`);
  }
}

function registryError(msg: string) {
  return {
    content: [{ type: "text" as const, text: `⚠️ ${msg}` }],
    isError: true,
  };
}

export async function startMcpServer() {
  const server = new McpServer({
    name: "mdx-ui",
    version: "1.0.0",
  });

  // Tool 1: list all components
  server.registerTool(
    "list_components",
    { description: "List all available mdx-ui components with descriptions" },
    async () => {
      let registry: Registry;
      try {
        registry = await fetchRegistry();
      } catch (err: any) {
        return registryError(err.message);
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
          .describe("Component name, e.g. accordion, complexity-table, dsbst"),
      },
    },
    async ({ name }) => {
      let registry: Registry;
      try {
        registry = await fetchRegistry();
      } catch (err: any) {
        return registryError(err.message);
      }

      const normalize = (s: string) => s.toLowerCase().replace(/[-_\s]+/g, "");
      const normalizedInput = normalize(name);

      const component =
        registry.components.find((c) => c.name === name.toLowerCase()) ??
        registry.components.find((c) => normalize(c.name) === normalizedInput);

      if (!component) {
        const names = registry.components.map((c) => c.name).join(", ");
        return {
          content: [
            {
              type: "text",
              text: `Component "${name}" not found.\n\nAvailable: ${names}`,
            },
          ],
        };
      }

      const lines = [
        `## ${component.name}`,
        `**Type:** ${component.type}`,
        `**Description:** ${component.description}`,
      ];

      if (component.whenToUse) {
        lines.push(`\n**When to use:** ${component.whenToUse}`);
      }
      if (component.whenNotToUse) {
        lines.push(`**When NOT to use:** ${component.whenNotToUse}`);
      }
      if (component.dependencies?.length) {
        lines.push(
          `\n**npm dependencies:** ${component.dependencies.join(", ")}`,
        );
      }
      if (component.registryDependencies?.length) {
        lines.push(
          `**Requires:** ${component.registryDependencies.join(", ")}`,
        );
      }
      if (component.example) {
        lines.push(`\n**Example:**\n\`\`\`mdx\n${component.example}\n\`\`\``);
      }

      return {
        content: [{ type: "text", text: lines.join("\n") }],
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
        query: z.string().describe("Search keyword or use case description"),
      },
    },
    async ({ query }) => {
      let registry: Registry;
      try {
        registry = await fetchRegistry();
      } catch (err: any) {
        return registryError(err.message);
      }

      // Split into words so "step by step" matches Steps, "code block" matches code-block
      const words = query
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 1);

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
        return words.every((w) => haystack.includes(w));
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

  // Tool 4: get the AI Output Standard system prompt
  server.registerTool(
    "get_output_standard",
    {
      description:
        "Get the MDX AI Output Standard — the system prompt block to inject so an LLM generates valid MDX that renders correctly with mdx-ui components",
    },
    async () => {
      const standard = `You generate content as MDX — Markdown with a small set of JSX components.

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

      return {
        content: [{ type: "text", text: standard }],
      };
    },
  );

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
