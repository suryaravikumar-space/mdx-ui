import { CodeBlock } from "@/components/mdx/code-block"

export default function CodeBlockDefault() {
  return (
    <CodeBlock title="components/mdx/badge.tsx" data-language="tsx">
      <code>{`import { Badge } from "@/components/mdx/badge"

export function StatusBadge({ status }: { status: string }) {
  return <Badge variant="success">{status}</Badge>
}`}</code>
    </CodeBlock>
  )
}
