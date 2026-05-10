"use client"
import { DataTable } from "@/components/mdx/data-table"

export default function DataTableDefault() {
  return (
    <DataTable
      searchable
      sortable
      headers={["Component", "Type", "Version"]}
      rows={[
        ["Accordion",   "Interactive",  "0.0.35"],
        ["Badge",       "Display",      "0.0.35"],
        ["Callout",     "Display",      "0.0.35"],
        ["Code Block",  "Display",      "0.0.35"],
        ["Data Table",  "Interactive",  "0.0.35"],
        ["Steps",       "Display",      "0.0.35"],
        ["Tabs",        "Interactive",  "0.0.35"],
      ]}
      caption="mdx-ui component registry"
    />
  )
}
