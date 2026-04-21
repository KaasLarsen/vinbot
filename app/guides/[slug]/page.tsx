import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, getGuideSlugs, listGuides } from "@/lib/content/guides";
import { guidePublicationAndModified } from "@/lib/guide-dates";
import { siteUrl } from "@/lib/site";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { guideFaqBySlug } from "@/lib/guide-faq";
import { getVinTilFallbackFaq } from "@/lib/guide-faq-vin-til-fallback";
import { getBedsteFallbackFaq } from "@/lib/guide-faq-bedste-fallback";
import { getVidenFallbackFaq } from "@/lib/guide-faq-viden-fallback";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RelatedGuides } from "@/components/related-guides";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { GuideSearchCta } from "@/components/guide-search-cta";
import { GuideProductPicks } from "@/components/guide-product-picks";
import { GuideFaqAccordion } from "@/components/guide-faq-accordion";
import { deriveGuideIntent } from "@/lib/guide-intent";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = await getGuide(slug);
  if (!g) return {};
  const canonical = `${siteUrl}/guides/${slug}`;
  return {
    title: g.frontmatter.title,
    description: g.frontmatter.description,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

function absoluteUrl(pathname: string): string {
  if (pathname === "/") return `${siteUrl}/`;
  return `${siteUrl}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const data = await getGuide(slug);
  if (!data) notFound();

  const { frontmatter, content, readingMinutes } = data;
  const url = `${siteUrl}/guides/${slug}`;
  const fallbackDate = new Date().toISOString().slice(0, 10);
  const { datePublished, dateModified } = guidePublicationAndModified(frontmatter, fallbackDate);
  const showBothDates = datePublished !== dateModified;

  const hub = frontmatter.hub;
  const crumbs = [
    { href: "/", label: "Forside" },
    ...(hub ? [{ href: `/${hub}`, label: hubLabel(hub) }] : []),
    { href: `/guides/${slug}`, label: frontmatter.title },
  ];

  const breadcrumbLdItems = crumbs.map((c) => ({
    name: c.label,
    url: absoluteUrl(c.href),
  }));

  const manualFaq = guideFaqBySlug[slug];
  const faqItems =
    manualFaq && manualFaq.length > 0
      ? manualFaq
      : getBedsteFallbackFaq(slug, frontmatter.title) ??
        getVidenFallbackFaq(slug, frontmatter.title) ??
        getVinTilFallbackFaq(slug, frontmatter.title) ??
        undefined;

  const intent = deriveGuideIntent(slug);
  const searchHref = intent
    ? `/?q=${encodeURIComponent(intent.q)}${intent.max != null ? `&max=${intent.max}` : ""}`
    : "/";

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <ArticleJsonLd
        title={frontmatter.title}
        description={frontmatter.description}
        url={url}
        datePublished={datePublished}
        dateModified={dateModified}
      />
      <BreadcrumbJsonLd items={breadcrumbLdItems} />
      {faqItems?.length ? <FaqJsonLd items={faqItems} /> : null}
      <Breadcrumbs items={crumbs} />
      <header className="mt-6 border-b border-stone-200 pb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900">{frontmatter.title}</h1>
        <p className="mt-4 text-xl text-stone-600">{frontmatter.description}</p>
        <p className="mt-3 text-sm text-stone-600">
          Af{" "}
          <Link href="/om-os" className="font-medium text-rose-900 hover:underline">
            Vinbot
          </Link>
        </p>
        <p className="mt-2 text-sm text-stone-500">
          {showBothDates ? (
            <>
              Publiceret {datePublished} · Opdateret {dateModified} · ca. {readingMinutes} min læsetid ·{" "}
            </>
          ) : (
            <>
              Opdateret {dateModified} · ca. {readingMinutes} min læsetid ·{" "}
            </>
          )}
          <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-800 hover:underline">
            Se også hovedguiden om vin og mad
          </Link>
        </p>
      </header>
      {intent ? <GuideSearchCta label={intent.label} searchHref={searchHref} /> : null}
      <div className="prose prose-stone mt-10 max-w-none">
        <AffiliateDisclosure compact />
        {content}
      </div>
      {intent ? (
        <GuideProductPicks
          q={intent.q}
          max={intent.max}
          slug={slug}
          hub={hub}
          label={intent.label}
          searchHref={searchHref}
        />
      ) : null}
      {faqItems?.length ? <GuideFaqAccordion items={faqItems} /> : null}
      <PartnerAdsLeaderboard className="mt-12" hub={hub} slug={slug} />
      <div className="mt-12">
        <RelatedGuides tags={frontmatter.tags || []} excludeSlug={slug} />
      </div>
      <section className="mt-10 rounded-2xl border border-stone-200 bg-stone-50 p-6 text-sm text-stone-700">
        <p className="font-semibold text-stone-900">Læs også</p>
        <p className="mt-2">
          Udforsk{" "}
          <a href="/mad-og-vin" className="text-rose-900 hover:underline">
            mad og vin
          </a>
          ,{" "}
          <a href="/humoer-og-vin" className="text-rose-900 hover:underline">
            humør og stemning
          </a>{" "}
          og{" "}
          <a href="/saeson" className="text-rose-900 hover:underline">
            sæson
          </a>
          — eller spring direkte til en af de andre guides herunder.
        </p>
        <ul className="mt-3 list-disc pl-5">
          {listGuides()
            .filter((x) => x.slug !== slug)
            .slice(0, 6)
            .map((g) => (
              <li key={g.slug}>
                <Link href={`/guides/${g.slug}`} className="text-rose-900 hover:underline">
                  {g.title}
                </Link>
              </li>
            ))}
        </ul>
      </section>
    </article>
  );
}

function hubLabel(hub: string): string {
  const m: Record<string, string> = {
    "mad-og-vin": "Mad & vin",
    "humoer-og-vin": "Humør & vin",
    "bedste-vine": "Bedste vine",
    "vin-viden": "Vin-viden",
    saeson: "Sæson",
    druesorter: "Druesorter",
    regioner: "Regioner",
  };
  return m[hub] || hub;
}
