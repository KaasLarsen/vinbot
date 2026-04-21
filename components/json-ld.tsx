import type { DsfFeaturedPick } from "@/lib/dsf-featured";
import { buildDsfFeaturedProductsItemList } from "@/lib/schema/dsf-affiliate-product";
import { contactEmail, organizationLogoUrl, organizationSameAs, organizationSchemaId, siteName, siteUrl } from "@/lib/site";

type ArticleJsonLdProps = {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  keywords?: string[];
  articleSection?: string;
  wordCount?: number;
  inLanguage?: string;
};

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
  keywords,
  articleSection,
  wordCount,
  inLanguage = "da-DK",
}: ArticleJsonLdProps) {
  const orgRef = { "@id": organizationSchemaId };
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished,
    dateModified,
    author: orgRef,
    publisher: orgRef,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage,
  };
  if (image) data.image = image;
  if (keywords && keywords.length > 0) data.keywords = keywords.join(", ");
  if (articleSection) data.articleSection = articleSection;
  if (wordCount && wordCount > 0) data.wordCount = wordCount;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

type CollectionPageJsonLdProps = {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string }[];
  inLanguage?: string;
};

export function CollectionPageJsonLd({
  name,
  description,
  url,
  items,
  inLanguage = "da-DK",
}: CollectionPageJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    description,
    url,
    inLanguage,
    isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website` },
    publisher: { "@id": organizationSchemaId },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: item.url,
        name: item.name,
      })),
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

type WebPageJsonLdProps = {
  name: string;
  description: string;
  url: string;
  inLanguage?: string;
};

export function WebPageJsonLd({ name, description, url, inLanguage = "da-DK" }: WebPageJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url,
    inLanguage,
    isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website` },
    publisher: { "@id": organizationSchemaId },
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
    "@id": `${url}/#website`,
    name: siteName,
    url,
    inLanguage: "da-DK",
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
  const list = data.itemListElement as unknown[];
  if (!list.length) return null;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
