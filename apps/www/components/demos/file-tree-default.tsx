import { FileTree } from "@/components/mdx/file-tree"

export default function FileTreeDefault() {
  return (
    <FileTree>{`app*/
  layout.tsx
  page.tsx
  globals.css
components*/
  mdx/
    accordion.tsx
    badge.tsx
    callout.tsx
  mdx-components.tsx
public/
  favicon.ico`}</FileTree>
  )
}
