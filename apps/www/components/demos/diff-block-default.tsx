import { DiffBlock } from "@/components/mdx/diff-block";

export default function DiffBlockDefault() {
  return (
    <DiffBlock title="preview.tsx">
      {` export interface PreviewProps {
   code: string
   lang?: string
   children: React.ReactNode
+  highlightedCode?: string
 }

-<pre className="overflow-x-auto p-4 text-sm">
-  <code>{code}</code>
-</pre>
+{highlightedCode ? (
+  <div dangerouslySetInnerHTML={{ __html: highlightedCode }} />
+) : (
+  <pre className="overflow-x-auto p-4 text-sm">
+    <code>{code}</code>
+  </pre>
+)}`}
    </DiffBlock>
  );
}
