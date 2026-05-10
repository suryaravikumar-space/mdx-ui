import { Definition } from "@/components/mdx/definition"

export default function DefinitionDefault() {
  return (
    <div className="w-full space-y-4">
      <Definition term="Invariant">
        A condition that holds true before and after every operation on a data structure or algorithm.
      </Definition>
      <Definition term="Big-O Notation">
        A mathematical notation describing the upper bound of an algorithm&apos;s time or space complexity as the input size grows.
      </Definition>
    </div>
  )
}
