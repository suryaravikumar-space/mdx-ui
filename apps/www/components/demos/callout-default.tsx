import { Callout } from "@/components/mdx/callout";

export default function CalloutDefault() {
  return (
    <div className="w-full space-y-0">
      <Callout variant="info">
        This is an informational message to help guide users.
      </Callout>
      <Callout variant="warning">
        Warning: This action cannot be undone. Please proceed with caution.
      </Callout>
      <Callout variant="danger">
        Error: This is a critical error that needs immediate attention.
      </Callout>
      <Callout variant="success">
        Success! Your changes have been saved.
      </Callout>
    </div>
  );
}
