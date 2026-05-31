import type { MetadataRoute } from "next";
import { allComponents, allDocs } from "contentlayer/generated";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const componentEntries = allComponents
    .filter((c) => c.published)
    .map((c) => ({
      url: `${siteConfig.url}${c.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const docEntries = allDocs
    .filter(
      (d) => d.published && d.slugAsParams !== "index" && d.slugAsParams !== "",
    )
    .map((d) => ({
      url: `${siteConfig.url}${d.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    }));

  return [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/docs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/docs/components`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...docEntries,
    ...componentEntries,
  ];
}
