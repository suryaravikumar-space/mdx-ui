import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { allComponents } from "contentlayer/generated";
import { Mdx } from "@/components/mdx-components";
import { TableOfContents } from "@/components/toc";
import { getTableOfContents } from "@/lib/toc";
import { getBreadcrumbs } from "@/lib/docs-nav";
import { PageNavigation } from "@/components/page-navigation";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

interface ComponentPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

async function getComponentFromParams(params: { slug: string[] }) {
  const slug = params?.slug?.join("/");
  // The route is at /docs/components/[...slug], so we need to prepend "components/"
  // to match against slugAsParams which is "components/blockquote"
  const fullSlug = `components/${slug}`;
  const component = allComponents.find(
    (component) => component.slugAsParams === fullSlug,
  );

  if (!component) {
    return null;
  }

  return component;
}

export async function generateMetadata({
  params,
}: ComponentPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const component = await getComponentFromParams(resolvedParams);

  if (!component) return {};

  return {
    title: component.title,
    description: component.description,
    alternates: { canonical: `${siteConfig.url}${component.slug}` },
    openGraph: {
      title: `${component.title} — DocsUI`,
      description: component.description,
      url: `${siteConfig.url}${component.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${component.title} — DocsUI`,
      description: component.description,
    },
  };
}

export async function generateStaticParams(): Promise<
  ComponentPageProps["params"] extends Promise<infer T> ? T[] : never
> {
  return allComponents.map((component) => ({
    // slugAsParams is "components/blockquote", we need to remove "components/" prefix
    // since the route already includes /docs/components/
    slug: component.slugAsParams.replace(/^components\//, "").split("/"),
  }));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const resolvedParams = await params;
  const component = await getComponentFromParams(resolvedParams);

  if (!component) {
    notFound();
  }

  const toc = getTableOfContents(component.body.raw);
  const breadcrumbs = getBreadcrumbs(component.slug);

  return (
    <main className="relative py-8 lg:gap-10 lg:py-12 xl:grid xl:grid-cols-[1fr_300px] xl:gap-20">
      <div className="mx-auto w-full min-w-0 max-w-3xl">
        {/* Breadcrumbs */}
        <div className="mb-4 flex items-center space-x-1 text-sm text-muted-foreground">
          {breadcrumbs.map((crumb, index) => (
            <div
              key={crumb.path || index}
              className="flex items-center space-x-1"
            >
              {index > 0 && <ChevronRight className="h-4 w-4" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="font-medium text-foreground">
                  {crumb.title}
                </span>
              ) : (
                <Link
                  href={crumb.path || "#"}
                  className="overflow-hidden text-ellipsis whitespace-nowrap hover:text-foreground"
                >
                  {crumb.title}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Page header */}
        <div className="space-y-4">
          <h1 className="scroll-m-20 bg-gradient-to-r from-green-600 to-emerald-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-green-400 dark:to-emerald-300">
            {component.title}
          </h1>
          <p className="text-lg leading-7 text-muted-foreground">
            {component.description}
          </p>
        </div>

        {/* Content */}
        <div className="pb-12 pt-8">
          <Mdx code={component.body.code} />
        </div>

        {/* Prev/Next Navigation */}
        <PageNavigation currentPath={component.slug} />
      </div>
      <div className="hidden text-sm xl:block">
        <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] overflow-y-auto pt-6">
          <TableOfContents toc={toc} />
        </div>
      </div>
    </main>
  );
}
