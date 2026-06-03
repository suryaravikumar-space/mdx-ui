"use client";
import { CodeGroup } from "@/components/mdx/code-group";

export default function CodeGroupDefault() {
  return (
    <div className="w-full">
      <CodeGroup>
        <pre data-language="npm" data-title="npm">
          <code>npm install docsui-cli</code>
        </pre>
        <pre data-language="pnpm" data-title="pnpm">
          <code>pnpm add docsui-cli</code>
        </pre>
        <pre data-language="yarn" data-title="yarn">
          <code>yarn add docsui-cli</code>
        </pre>
      </CodeGroup>
    </div>
  );
}
