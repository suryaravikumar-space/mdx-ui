"use client"
import * as React from "react"
import { Preview } from "@/components/mdx/preview"
import { DEMO_SOURCES } from "@/components/demo-sources.generated"
import AccordionDefault from "@/components/demos/accordion-default"
import BadgeVariants from "@/components/demos/badge-variants"
import CalloutDefault from "@/components/demos/callout-default"
import AlertDefault from "@/components/demos/alert-default"
import TabsDefault from "@/components/demos/tabs-default"
import StepsDefault from "@/components/demos/steps-default"
import CardDefault from "@/components/demos/card-default"
import SpoilerDefault from "@/components/demos/spoiler-default"

const DEMOS: Record<string, React.ComponentType> = {
  "accordion-default": AccordionDefault,
  "badge-variants": BadgeVariants,
  "callout-default": CalloutDefault,
  "alert-default": AlertDefault,
  "tabs-default": TabsDefault,
  "steps-default": StepsDefault,
  "card-default": CardDefault,
  "spoiler-default": SpoilerDefault,
}

function ErrorMessage({ name }: { name: string }) {
  return (
    <div className="my-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
      Demo not found: <code>{name}</code>
    </div>
  )
}

export function ComponentPreview({ name }: { name: string }) {
  const Demo = DEMOS[name]
  const data = DEMO_SOURCES[name]

  if (!Demo || !data) {
    return <ErrorMessage name={name} />
  }

  return (
    <Preview code={data.source} highlightedCode={data.highlighted} lang="tsx">
      <Demo />
    </Preview>
  )
}
