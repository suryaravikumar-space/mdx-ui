import { Blockquote } from "@/components/mdx/blockquote"

export default function BlockquoteDefault() {
  return (
    <div className="w-full space-y-4">
      <Blockquote>
        Make it work, make it right, make it fast.
      </Blockquote>
      <Blockquote cite="Donald Knuth">
        Premature optimization is the root of all evil.
      </Blockquote>
    </div>
  )
}
