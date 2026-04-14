import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getGuide, getGuideSlugs, listGuides } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";
import { ArticleJsonLd, FaqJsonLd } from "@/components/json-ld";
import { guideFaqBySlug } from "@/lib/guide-faq";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RelatedGuides } from "@/components/related-guides";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const g = await getGuide(slug);
  if (!g) return {};
  return {
    title: g.frontmatter.title,
    description: g.frontmatter.description,
    alternates: { canonical: `${siteUrl}/guides/${slug}` },
    openGraph: { url: `${siteUrl}/guides/${slug}` },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const data = await getGuide(slug);
  if (!data) notFound();

  const { frontmatter, content, readingMinutes } = data;
  const url = `${siteUrl}/guides/${slug}`;
  const updated = frontmatter.updated || new Date().toISOString().slice(0, 10);

  const hub = frontmatter.hub;
  const crumbs = [
    { href: "/", label: "Forside" },
    ...(hub ? [{ href: `/${hub}`, label: hubLabel(hub) }] : []),
    { href: `/guides/${slug}`, label: frontmatter.title },
  ];

  const faqItems = guideFaqBySlug[slug];

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <ArticleJsonLd
        title={frontmatter.title}
        description={frontmatter.description}
        url={url}
        datePublished={updated}
        dateModified={updated}
      />
      {faqItems?.length ? <FaqJsonLd items={faqItems} /> : null}
      <Breadcrumbs items={crumbs} />
      <header className="mt-6 border-b border-stone-200 pb-8">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900">{frontmatter.title}</h1>
        <p className="mt-4 text-xl text-stone-600">{frontmatter.description}</p>
        <p className="mt-4 text-sm text-stone-500">
          Opdateret {updated} · ca. {readingMinutes} min læsetid ·{" "}
          <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-800 hover:underline">
            Se også hovedguiden om vin og mad
          </Link>
        </p>
      </header>
      <div className="prose prose-stone mt-10 max-w-none">
        <AffiliateDisclosure compact />
        {content}
      </div>
      <PartnerAdsLeaderboard className="mt-12" />
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
    saeson: "Sæson",
    druesorter: "Druesorter",
    regioner: "Regioner",
  };
  return m[hub] || hub;
}
