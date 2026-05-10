import { HorizontalRule } from "@/components/mdx/horizontal-rule"

export default function HorizontalRuleDefault() {
  return (
    <div className="w-full space-y-2">
      <p className="text-xs text-muted-foreground">default</p>
      <HorizontalRule />
      <p className="text-xs text-muted-foreground">dashed</p>
      <HorizontalRule variant="dashed" />
      <p className="text-xs text-muted-foreground">dotted</p>
      <HorizontalRule variant="dotted" />
      <p className="text-xs text-muted-foreground">gradient</p>
      <HorizontalRule variant="gradient" />
    </div>
  )
}
