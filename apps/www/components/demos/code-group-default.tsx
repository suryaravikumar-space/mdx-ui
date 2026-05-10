"use client"
import { CodeGroup } from "@/components/mdx/code-group"

export default function CodeGroupDefault() {
  return (
    <div className="w-full">
      <CodeGroup>
        <pre data-language="npm" data-title="npm">
          <code>npm install @ravikumarsurya/mdx-ui</code>
        </pre>
        <pre data-language="pnpm" data-title="pnpm">
          <code>pnpm add @ravikumarsurya/mdx-ui</code>
        </pre>
        <pre data-language="yarn" data-title="yarn">
          <code>yarn add @ravikumarsurya/mdx-ui</code>
        </pre>
      </CodeGroup>
    </div>
  )
}
