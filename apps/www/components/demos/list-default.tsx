import { UnorderedList, OrderedList, ListItem } from "@/components/mdx/list";

export default function ListDefault() {
  return (
    <div className="w-full space-y-4">
      <UnorderedList>
        <ListItem>
          Install the CLI with <code>npx @ravikumarsurya/mdx-ui init</code>
        </ListItem>
        <ListItem>
          Add components with{" "}
          <code>npx @ravikumarsurya/mdx-ui add accordion</code>
        </ListItem>
        <ListItem>Import and use in your MDX files</ListItem>
      </UnorderedList>
      <OrderedList>
        <ListItem>Clone the repository</ListItem>
        <ListItem>
          Install dependencies with <code>pnpm install</code>
        </ListItem>
        <ListItem>
          Start the dev server with <code>pnpm dev</code>
        </ListItem>
      </OrderedList>
    </div>
  );
}
