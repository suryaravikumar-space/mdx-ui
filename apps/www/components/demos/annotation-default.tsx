"use client"
import { Annotation } from "@/components/mdx/annotation"

export default function AnnotationDefault() {
  return (
    <p className="text-sm leading-7">
      This algorithm runs in{" "}
      <Annotation note="For each of n elements, we compare against all others — n × n operations.">
        O(n²) time
      </Annotation>{" "}
      and{" "}
      <Annotation note="We only use a fixed number of extra variables regardless of input size.">
        O(1) space
      </Annotation>
      . Click the underlined terms to learn more.
    </p>
  )
}
