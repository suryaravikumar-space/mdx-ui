import { Callout } from "@/components/mdx/callout";

export default function CalloutDefault() {
  return (
    <div className="w-full space-y-0">
      <Callout variant="info" title="Info">
        Use for general information or helpful insights.
      </Callout>
      <Callout variant="note" title="Note">
        Perfect for adding additional context or side notes.
      </Callout>
      <Callout variant="tip" title="Tip">
        Great for quick tips, best practices, or suggestions.
      </Callout>
      <Callout variant="warning" title="Warning">
        Use to caution users about potential issues.
      </Callout>
      <Callout variant="danger" title="Danger">
        Highlight critical errors or serious warnings.
      </Callout>
    </div>
  );
}
