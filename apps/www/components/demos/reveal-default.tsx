"use client"
import { Reveal } from "@/components/mdx/reveal"

export default function RevealDefault() {
  return (
    <div className="w-full space-y-2">
      <Reveal label="Show solution">
        The optimal solution uses a hash map for O(1) lookups, reducing time complexity from O(n²) to O(n).
      </Reveal>
      <Reveal label="Show hint" defaultOpen>
        Think about what data structure gives you O(1) average-case lookup.
      </Reveal>
    </div>
  )
}
