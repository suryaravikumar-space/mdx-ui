import { Preview } from "@/components/mdx/preview"
import { Badge } from "@/components/mdx/badge"

export default function PreviewDefault() {
  return (
    <Preview lang="tsx" code={`<Badge variant="success">Stable</Badge>`}>
      <Badge variant="success">Stable</Badge>
    </Preview>
  )
}
