import Link from "next/link";
import { Github, Twitter, Package, Mail, Heart } from "lucide-react";
import { Logo } from "@/components/logo";
import { siteConfig, authors } from "@/lib/site";

const footerLinks = [
  {
    title: "Documentation",
    links: [
      { label: "Introduction", href: "/docs" },
      { label: "Installation", href: "/docs/installation" },
      { label: "Components", href: "/docs/components/symbol-browser" },
      { label: "Integration", href: "/docs/integration" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Playground", href: "/playground" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Project",
    links: [
      { label: "About", href: "/about" },
      { label: "Community", href: "/community" },
      { label: "GitHub", href: siteConfig.github, external: true },
      { label: "npm", href: siteConfig.npm, external: true },
    ],
  },
];

const socialLinks = [
  { label: "GitHub", href: siteConfig.github, icon: Github },
  {
    label: "Twitter",
    href: "https://twitter.com/suryaravi_kumar",
    icon: Twitter,
  },
  { label: "npm", href: siteConfig.npm, icon: Package },
  {
    label: "Email",
    href: "mailto:suryaravikumar@docsui.io",
    icon: Mail,
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="container py-10 md:py-14">
        <div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center">
              <Logo height={24} />
            </Link>
            {/* <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p> */}
            <div className="flex items-center gap-1.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((group) => (
            <div key={group.title} className="flex flex-col gap-3">
              <h3 className="font-mono text-sm font-semibold tracking-tight">
                {group.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-center md:flex-row md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {siteConfig.name}. Released under
            the{" "}
            <Link
              href={siteConfig.license.url}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-foreground"
            >
              {siteConfig.license.name} License
            </Link>
            .
          </p>
          <p className="flex flex-wrap items-center justify-center gap-1 text-sm text-muted-foreground md:justify-end">
            Built with <Heart className="h-3.5 w-3.5 fill-current" /> by{" "}
            {authors.map((author, i) => (
              <span key={author.name}>
                <Link
                  href={author.github}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium underline underline-offset-4 hover:text-foreground"
                >
                  {author.name}
                </Link>
                {i < authors.length - 1 ? " & " : ""}
              </span>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
