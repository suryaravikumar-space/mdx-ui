import { Code } from "@/components/mdx/inline-code";

export default function InlineCodeDefault() {
  return (
    <div className="space-y-3 text-sm leading-7">
      <p>
        Import the component:{" "}
        <Code>
          import {"{"} Badge {"}"} from &quot;@/components/mdx/badge&quot;
        </Code>
      </p>
      <p>
        Run the CLI: <Code>npx docsui-cli@latest add accordion</Code>
      </p>
      <p>
        Use the <Code>variant</Code> prop to switch between{" "}
        <Code>&quot;success&quot;</Code>, <Code>&quot;warning&quot;</Code>, and{" "}
        <Code>&quot;destructive&quot;</Code> styles.
      </p>
    </div>
  );
}
