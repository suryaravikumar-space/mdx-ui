import { Changelog, ChangelogEntry, ChangelogItem } from "@/components/mdx/changelog"

export default function ChangelogDefault() {
  return (
    <Changelog>
      <ChangelogEntry version="v1.2.0" date="2025-04-10">
        <ChangelogItem type="added">New ComponentPreview with shiki dual-theme highlighting</ChangelogItem>
        <ChangelogItem type="added">Spoiler and Reveal components</ChangelogItem>
        <ChangelogItem type="fixed">Accordion keyboard navigation on Safari</ChangelogItem>
      </ChangelogEntry>
      <ChangelogEntry version="v1.1.0" date="2025-03-01">
        <ChangelogItem type="added">SecurityNote component with severity levels</ChangelogItem>
        <ChangelogItem type="changed">Badge now uses CVA for variant management</ChangelogItem>
        <ChangelogItem type="removed">Legacy ColorSwatch component</ChangelogItem>
      </ChangelogEntry>
    </Changelog>
  )
}
