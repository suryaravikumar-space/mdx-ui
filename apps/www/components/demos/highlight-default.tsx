import { Highlight } from "@/components/mdx/highlight";

export default function HighlightDefault() {
  return (
    <p className="text-base leading-8">
      Use <Highlight color="yellow">yellow</Highlight> for general emphasis,{" "}
      <Highlight color="blue">blue</Highlight> for technical terms,{" "}
      <Highlight color="green">green</Highlight> for positive outcomes,{" "}
      <Highlight color="pink">pink</Highlight> for warnings, and{" "}
      <Highlight color="purple">purple</Highlight> for special concepts.
    </p>
  );
}
