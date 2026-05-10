import {
  Lead,
  Intro,
  Large,
  Small,
  Muted,
  Paragraph,
} from "@/components/mdx/paragraph";

export default function ParagraphDefault() {
  return (
    <div className="w-full space-y-4">
      <Lead>Lead — large introductory text used below a page title.</Lead>
      <Intro>
        Intro — slightly smaller lead, ideal for section introductions.
      </Intro>
      <Paragraph>
        Default — body copy at base size with comfortable line height.
      </Paragraph>
      <Large>Large — semibold text for emphasis without a heading.</Large>
      <Small>Small — compact label or metadata text.</Small>
      <Muted>Muted — de-emphasised helper text or captions.</Muted>
    </div>
  );
}
