import type { Metadata } from "next";
import { allDocs } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { TableOfContents } from "@/components/toc";
import { getTableOfContents } from "@/lib/toc";
import { notFound } from "next/navigation";
import { siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  return {
    title: "Introduction",
    description:
      "Copy-paste MDX components for documentation sites. 50+ components built with React, TypeScript, and Tailwind CSS.",
    alternates: { canonical: `${siteConfig.url}/docs` },
    openGraph: {
      title: "Introduction — MDX UI",
      description:
        "Copy-paste MDX components for documentation sites. 50+ components built with React, TypeScript, and Tailwind CSS.",
      url: `${siteConfig.url}/docs`,
    },
  };
}

export default function DocsPage() {
  const doc = allDocs.find(
    (doc) => doc.slugAsParams === "" || doc.slugAsParams === "index",
  );

  if (!doc) {
    notFound();
  }

  const toc = getTableOfContents(doc.body.raw);

  return (
    <main className="relative py-8 lg:gap-10 lg:py-12 xl:grid xl:grid-cols-[1fr_300px] xl:gap-20">
      <div className="mx-auto w-full min-w-0 max-w-3xl">
        <div className="space-y-2">
          <h1 className="scroll-m-20 bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-green-400 dark:to-emerald-300">
            {doc.title}
          </h1>
          <p className="text-lg text-muted-foreground">{doc.description}</p>
        </div>
        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-y-auto pt-6">
          <TableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
