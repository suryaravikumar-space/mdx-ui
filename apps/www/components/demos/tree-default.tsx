"use client"
import { Tree, TreeItem } from "@/components/mdx/tree"

export default function TreeDefault() {
  return (
    <Tree>
      <TreeItem name="apps" isFolder defaultOpen>
        <TreeItem name="www" isFolder defaultOpen>
          <TreeItem name="components" isFolder defaultOpen>
            <TreeItem name="mdx-components.tsx" />
            <TreeItem name="component-preview.tsx" />
          </TreeItem>
          <TreeItem name="app" isFolder>
            <TreeItem name="page.tsx" />
            <TreeItem name="layout.tsx" />
          </TreeItem>
        </TreeItem>
      </TreeItem>
      <TreeItem name="packages" isFolder>
        <TreeItem name="cli" isFolder />
        <TreeItem name="registry" isFolder />
      </TreeItem>
    </Tree>
  )
}
