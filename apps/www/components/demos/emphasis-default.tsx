import { Strong, Em } from "@/components/mdx/emphasis"

export default function EmphasisDefault() {
  return (
    <p className="text-base leading-7">
      Use <Strong>bold text</Strong> for key terms and critical warnings.
      Use <Em>italic text</Em> for titles, foreign words, or gentle stress.
      Combine them for <Strong><Em>maximum emphasis</Em></Strong> when needed.
    </p>
  )
}
