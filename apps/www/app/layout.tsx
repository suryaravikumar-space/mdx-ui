import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "DocsUI — Copy-paste MDX components for documentation sites",
    template: "%s — DocsUI",
  },
  description: siteConfig.description,
  keywords: [
    "MDX",
    "React components",
    "documentation",
    "copy-paste components",
    "Tailwind CSS",
    "math components",
    "MCP server",
    "remark plugin",
    "shadcn",
    "docsui",
  ],
  authors: [{ name: "Surya Ravi Kumar", url: siteConfig.github }],
  creator: "Surya Ravi Kumar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "DocsUI — Copy-paste MDX components for documentation sites",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "DocsUI — Copy-paste MDX components for documentation sites",
    description: siteConfig.description,
    creator: "@ravikumarsurya",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          jetbrainsMono.variable,
          "min-h-screen font-sans antialiased",
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
