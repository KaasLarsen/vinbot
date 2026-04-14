import type { DsfFeaturedPick } from "@/lib/dsf-featured";
import { buildDsfFeaturedProductsItemList } from "@/lib/schema/dsf-affiliate-product";

type ArticleJsonLdProps = {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
};

export function ArticleJsonLd({ title, description, url, datePublished, dateModified }: ArticleJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified,
    author: { "@type": "Organization", name: "Vinbot" },
    publisher: { "@type": "Organization", name: "Vinbot" },
    mainEntityOfPage: url,
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

type FaqItem = { question: string; answer: string };

export function FaqJsonLd({ items }: { items: FaqItem[] }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.question,
      acceptedAnswer: { "@type": "Answer", text: i.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function WebSiteJsonLd({ url }: { url: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Vinbot",
    url,
    potentialAction: {
      "@type": "SearchAction",
      target: `${url}/?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

/** Udvalgte DSF-produkter med shipping + retur (Google Merchant Listings). Review/rating udelades med vilje (ingen fabrikerede stjerner). */
export function DsfFeaturedProductsJsonLd({ picks }: { picks: DsfFeaturedPick[] }) {
  if (picks.length === 0) return null;
  const data = buildDsfFeaturedProductsItemList(picks);
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
