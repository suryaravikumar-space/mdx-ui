"use client";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/mdx/tabs";

export default function TabsDefault() {
  return (
    <Tabs defaultValue="npm">
      <TabsList>
        <TabsTrigger value="npm">npm</TabsTrigger>
        <TabsTrigger value="pnpm">pnpm</TabsTrigger>
        <TabsTrigger value="yarn">yarn</TabsTrigger>
      </TabsList>
      <TabsContent value="npm">
        <code className="block rounded bg-muted px-4 py-2 font-mono text-sm">
          npm install @mdx-ui/components
        </code>
      </TabsContent>
      <TabsContent value="pnpm">
        <code className="block rounded bg-muted px-4 py-2 font-mono text-sm">
          pnpm add @mdx-ui/components
        </code>
      </TabsContent>
      <TabsContent value="yarn">
        <code className="block rounded bg-muted px-4 py-2 font-mono text-sm">
          yarn add @mdx-ui/components
        </code>
      </TabsContent>
    </Tabs>
  );
}
