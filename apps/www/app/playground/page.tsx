import type { Metadata } from "next";
import { PlaygroundWrapper } from "./playground-wrapper";

export const metadata: Metadata = {
  title: "Playground — DocsUI",
  description:
    "Try all 50+ DocsUI components live in the browser. Write MDX on the left, see it rendered on the right. No installation required.",
};

export default function PlaygroundPage() {
  return <PlaygroundWrapper />;
}
