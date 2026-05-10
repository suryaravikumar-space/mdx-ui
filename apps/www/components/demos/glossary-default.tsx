"use client";
import { GlossaryProvider, Term } from "@/components/mdx/glossary";

const terms = {
  bfs: {
    label: "BFS",
    definition:
      "Breadth-First Search — explores all nodes at the current depth level before moving to the next. Uses a queue internally. Time: O(V + E).",
  },
  dfs: {
    label: "DFS",
    definition:
      "Depth-First Search — explores as far as possible along each branch before backtracking. Uses a stack (or recursion). Time: O(V + E).",
  },
};

export default function GlossaryDefault() {
  return (
    <GlossaryProvider terms={terms}>
      <p className="text-sm leading-7">
        Graph traversal can be performed using either <Term id="bfs" /> or{" "}
        <Term id="dfs" />. Click either term to view its definition.
      </p>
    </GlossaryProvider>
  );
}
