import Link from "next/link";
import type { Metadata } from "next";
import {
  Changelog,
  ChangelogEntry,
  ChangelogItem,
} from "@/components/mdx/changelog";
import { changelog } from "@/lib/changelog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Changelog",
  description: `Release notes and updates for ${siteConfig.name}.`,
};

function ReleaseLink({ href }: { href: string }) {
  return (
    <li className="pt-1">
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className="text-sm font-medium underline underline-offset-4 hover:text-foreground"
      >
        View on GitHub
      </Link>
    </li>
  );
}

export default function BlogPage() {
  return (
    <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="space-y-2">
          <h1 className="scroll-m-20 text-4xl font-bold tracking-tight">
            Changelog
          </h1>
          <p className="text-lg text-muted-foreground">
            Release notes and updates for {siteConfig.name}, from the first
            release to today.
          </p>
        </div>

        <Changelog className="mt-8">
          {changelog.map((release) => (
            <ChangelogEntry
              key={release.version}
              version={release.version}
              date={release.date}
            >
              {release.items.map((item, i) => (
                <ChangelogItem key={i} type={item.type}>
                  {item.text}
                </ChangelogItem>
              ))}
              <ReleaseLink href={release.href} />
            </ChangelogEntry>
          ))}
        </Changelog>
      </div>
    </main>
  );
}
