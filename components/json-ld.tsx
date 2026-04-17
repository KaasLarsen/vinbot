import type { DsfFeaturedPick } from "@/lib/dsf-featured";
import { buildDsfFeaturedProductsItemList } from "@/lib/schema/dsf-affiliate-product";
import { contactEmail, organizationLogoUrl, organizationSameAs, organizationSchemaId, siteName, siteUrl } from "@/lib/site";

type ArticleJsonLdProps = {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
};

export function ArticleJsonLd({ title, description, url, datePublished, dateModified }: ArticleJsonLdProps) {
  const orgRef = { "@id": organizationSchemaId };
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified,
    author: orgRef,
    publisher: orgRef,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

type BreadcrumbItem = { name: string; url: string };

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
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

export function OrganizationJsonLd() {
  const sameAs = organizationSameAs();
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": organizationSchemaId,
    name: siteName,
    url: siteUrl,
    logo: {
      "@type": "ImageObject",
      url: organizationLogoUrl,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: contactEmail,
      areaServed: "DK",
      availableLanguage: ["Danish", "da"],
    },
  };
  if (sameAs.length > 0) {
    data.sameAs = sameAs;
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function WebSiteJsonLd({ url }: { url: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url,
    publisher: { "@id": organizationSchemaId },
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
