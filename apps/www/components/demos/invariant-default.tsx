import { Invariant } from "@/components/mdx/invariant"

export default function InvariantDefault() {
  return (
    <div className="w-full space-y-4">
      <Invariant complexity="O(log n)">
        An AVL tree remains height-balanced after every insertion and deletion — the height difference between left and right subtrees is at most 1.
      </Invariant>
      <Invariant>
        A max-heap always satisfies the heap property: every parent node is greater than or equal to its children.
      </Invariant>
    </div>
  )
}
