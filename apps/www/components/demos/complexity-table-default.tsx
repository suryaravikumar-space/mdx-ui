import { ComplexityTable } from "@/components/mdx/complexity-table";

export default function ComplexityTableDefault() {
  return (
    <ComplexityTable
      caption="Binary Search Tree — time and space complexity"
      rows={[
        {
          operation: "Search",
          best: "O(1)",
          average: "O(log n)",
          worst: "O(n)",
          space: "O(1)",
        },
        {
          operation: "Insert",
          best: "O(1)",
          average: "O(log n)",
          worst: "O(n)",
          space: "O(1)",
        },
        {
          operation: "Delete",
          best: "O(1)",
          average: "O(log n)",
          worst: "O(n)",
          space: "O(1)",
        },
        {
          operation: "Traverse",
          best: "O(n)",
          average: "O(n)",
          worst: "O(n)",
          space: "O(n)",
        },
      ]}
    />
  );
}
