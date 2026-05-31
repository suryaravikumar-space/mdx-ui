import * as React from "react";

export interface JsonLdProps {
  /** JSON-LD structured data object */
  data: Record<string, unknown>;
}

/**
 * Renders a <script type="application/ld+json"> tag for structured data (SEO).
 *
 * Usage:
 *   <JsonLd data={{ "@context": "https://schema.org", "@type": "Article", "headline": "..." }} />
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
