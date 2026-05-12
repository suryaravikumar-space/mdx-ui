import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import axios from "axios";

const REGISTRY_URL =
  "https://raw.githubusercontent.com/suryaravikumar-space/mdx-ui/main/registry/registry.json";

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

let cached: Registry | null = null;

async function fetchRegistry(): Promise<Registry> {
  if (cached) return cached;
  const res = await axios.get<Registry>(REGISTRY_URL);
  cached = res.data;
  return cached;
}

export async function startMcpServer() {
  const server = new McpServer({
    name: "mdx-ui",
    version: "1.0.0",
  });

  // Tool 1: list all components
  server.tool(
    "list_components",
    "List all available mdx-ui components with descriptions",
    {},
    async () => {
      const registry = await fetchRegistry();
      const lines = registry.components.map(
        (c) => `- **${c.name}** (${c.type}): ${c.description}`,
      );
      return {
        content: [{ type: "text", text: lines.join("\n") }],
      };
    },
  );

  // Tool 2: get full schema for a component
  server.tool(
    "get_component",
    "Get the full schema for a component — props, when to use, when not to use, and an MDX usage example",
    {
      name: z
        .string()
        .describe("Component name, e.g. accordion, complexity-table, dsbst"),
    },
    async ({ name }) => {
      const registry = await fetchRegistry();
      const component = registry.components.find(
        (c) => c.name === name.toLowerCase(),
      );

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
  server.tool(
    "search_components",
    "Search components by keyword or use case — e.g. 'math', 'tree', 'security', 'table'",
    { query: z.string().describe("Search keyword or use case description") },
    async ({ query }) => {
      const registry = await fetchRegistry();
      const q = query.toLowerCase();

      const matches = registry.components.filter((c) => {
        const haystack = [c.name, c.description, c.whenToUse ?? "", c.type]
          .join(" ")
          .toLowerCase();
        return haystack.includes(q);
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

  const transport = new StdioServerTransport();
  await server.connect(transport);
}
