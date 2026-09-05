import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, getGuideSlugs } from "@/lib/content/guides";
import { MIN_WORDS_FOR_FALLBACK_FAQ } from "@/lib/content/thresholds";
import { guidePublicationAndModified } from "@/lib/guide-dates";
import { siteUrl } from "@/lib/site";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { classifyGuide } from "@/lib/sitemap-categories";
import { guideFaqBySlug } from "@/lib/guide-faq";
import { getVinTilFallbackFaq } from "@/lib/guide-faq-vin-til-fallback";
import { getBedsteFallbackFaq } from "@/lib/guide-faq-bedste-fallback";
import { getVidenFallbackFaq } from "@/lib/guide-faq-viden-fallback";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RelatedGuides } from "@/components/related-guides";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { GuideCatalogSearchBar } from "@/components/guide-catalog-search-bar";
import { GuideProductPicks } from "@/components/guide-product-picks";
import { GuideLauridsenRegionCta } from "@/components/guide-lauridsen-region-cta";
import { GuideWineDetailLinks } from "@/components/guide-wine-detail-links";
import { GuideRecipeCrosslinks } from "@/components/guide-recipe-crosslinks";
import { GuideClusterCrosslinks } from "@/components/guide-cluster-crosslinks";
import { GuideInlineSearch } from "@/components/guide-inline-search";
import { guideHasInlineSearch } from "@/lib/growth/guide-inline-search-slugs";
import { GuideFaqAccordion } from "@/components/guide-faq-accordion";
import { deriveGuideIntent } from "@/lib/guide-intent";
import { editorialTeamName } from "@/lib/site";
import { buildGuideSerpDescription, buildGuideSerpTitle } from "@/lib/seo/serp-meta";
import { PageShell } from "@/components/page-shell";
import { FoodWinePicker } from "@/components/food-wine-picker";
import { WineQuantityCalculator } from "@/components/wine-quantity-calculator";
import { dishIdForGuideSlug } from "@/lib/food-picker/dishes";
import { GuideToc } from "@/components/guide-toc";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = await getGuide(slug);
  if (!g) return {};
  const canonical = `${siteUrl}/guides/${slug}`;
  const serpTitle = buildGuideSerpTitle(g.frontmatter.title, slug);
  const serpDescription = buildGuideSerpDescription(g.frontmatter.description, slug, g.frontmatter.title);
  const ogImageUrl = `${canonical}/opengraph-image`;
  return {
    title: serpTitle,
    description: serpDescription,
    alternates: { canonical },
    openGraph: {
      url: canonical,
      type: "article",
      title: serpTitle,
      description: serpDescription,
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: serpTitle }],
    },
    twitter: {
      card: "summary_large_image",
      images: [ogImageUrl],
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

  const { frontmatter, content, toc, readingMinutes, wordCount } = data;
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
      : wordCount >= MIN_WORDS_FOR_FALLBACK_FAQ
        ? getBedsteFallbackFaq(slug, frontmatter.title) ??
          getVidenFallbackFaq(slug, frontmatter.title) ??
          getVinTilFallbackFaq(slug, frontmatter.title) ??
          undefined
        : undefined;

  const intent = deriveGuideIntent(slug);
  const searchHref = intent
    ? `/?q=${encodeURIComponent(intent.q)}${intent.max != null ? `&max=${intent.max}` : ""}`
    : "/";

  const category = classifyGuide(slug);
  const articleSection: Record<typeof category, string> = {
    mad: "Mad og vin",
    druer: "Druesorter",
    regioner: "Vinregioner",
    bedste: "Bedste vine",
    viden: "Vin-viden",
    andre: "Guides",
  };
  const articleImage = `${url}/opengraph-image`;

  return (
    <PageShell as="article" variant="article" className="py-10">
      <ArticleJsonLd
        title={frontmatter.title}
        description={frontmatter.description}
        url={url}
        datePublished={datePublished}
        dateModified={dateModified}
        image={articleImage}
        keywords={frontmatter.tags}
        articleSection={articleSection[category]}
      />
      <BreadcrumbJsonLd items={breadcrumbLdItems} />
      {faqItems?.length ? <FaqJsonLd items={faqItems} /> : null}
      <Breadcrumbs items={crumbs} />
      <GuideCatalogSearchBar className="mt-3" />
      <header className="mt-6 border-b border-stone-200 pb-6">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          {frontmatter.title}
        </h1>
        <p className="mt-3 text-lg leading-relaxed text-stone-600">{frontmatter.description}</p>
        <p className="mt-3 text-sm text-stone-600">
          Af{" "}
          <Link href="/om-os" className="font-medium text-rose-900 hover:underline">
            {editorialTeamName}
          </Link>
          {" "}·{" "}
          <Link href="/redaktionel-proces" className="text-rose-900 hover:underline">
            Sådan laver vi guides
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
      <GuideToc items={toc} />
      {slug === "hvor-meget-vin-til-fest" || slug === "hvor-meget-vin-til-bryllup" ? (
        <WineQuantityCalculator
          className="mt-8"
          defaultPartyType={slug === "hvor-meget-vin-til-bryllup" ? "bryllup" : "middag"}
          defaultGuests={slug === "hvor-meget-vin-til-bryllup" ? 80 : 40}
        />
      ) : null}
      <div className="prose prose-stone mt-8 max-w-none">
        {content}
      </div>
      {slug.startsWith("vin-til-") ? (
        <FoodWinePicker
          className="mt-10 border-t border-stone-200 pt-8"
          heading="Tre flasker til retten"
          intro="Vælg budget — eller en anden ret — så viser vi vine, der er til salg hos forhandlerne nu."
          initialDishId={dishIdForGuideSlug(slug)}
        />
      ) : null}
      {intent ? (
        <GuideProductPicks
          q={intent.q}
          max={intent.max}
          slug={slug}
          hub={hub}
          label={intent.label}
          searchHref={searchHref}
          heading={slug === "bedste-box-vin" ? "Flere boxvine fra forhandlere" : "Se 3 forslag fra danske forhandlere"}
        />
      ) : null}
      {intent && guideHasInlineSearch(slug) ? <GuideInlineSearch slug={slug} intent={intent} /> : null}
      {intent && hub === "regioner" ? <GuideLauridsenRegionCta slug={slug} /> : null}
      <GuideWineDetailLinks guideSlug={slug} />
      <GuideClusterCrosslinks guideSlug={slug} />
      <GuideRecipeCrosslinks guideSlug={slug} />
      {faqItems?.length ? <GuideFaqAccordion items={faqItems} /> : null}
      <PartnerAdsLeaderboard className="mt-12" hub={hub} slug={slug} />
      <div className="mt-12">
        <RelatedGuides tags={frontmatter.tags || []} excludeSlug={slug} />
      </div>
    </PageShell>
  );
}

function hubLabel(hub: string): string {
  const m: Record<string, string> = {
    "mad-og-vin": "Mad & vin",
    "humoer-og-vin": "Humør & vin",
    "bedste-vine": "Bedste vine",
    "vin-viden": "Vin-viden",
    saeson: "Sæson",
    "fest-og-vin": "Fest og selskab",
    "alkoholfri-vin": "Alkoholfri vin",
    druesorter: "Druesorter",
    regioner: "Regioner",
  };
  return m[hub] || hub;
}
