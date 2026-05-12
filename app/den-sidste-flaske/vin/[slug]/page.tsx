import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DsfAffiliateOutboundLink } from "@/components/dsf-affiliate-outbound-link";
import {
  BreadcrumbJsonLd,
  DsfPopularWineDetailProductJsonLd,
  FaqJsonLd,
} from "@/components/json-ld";
import { dsfFeaturedPicks } from "@/lib/dsf-featured";
import { listGuides } from "@/lib/content/guides";
import {
  dsfPopularWineDetailSlugForProductUrl,
  getDsfPopularWineBySlug,
  listDsfPopularWineSlugs,
  popularWineToFeaturedPick,
} from "@/lib/dsf-popular-wines";
import { sanitizeDsfProductUrl } from "@/lib/dsf-product-url";
import { siteUrl } from "@/lib/site";

export const revalidate = 21600;

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listDsfPopularWineSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wine = getDsfPopularWineBySlug(slug);
  if (!wine) return { title: "Vin ikke fundet | Vinbot" };
  const url = `${siteUrl}/den-sidste-flaske/vin/${wine.slug}`;
  const title = `${wine.displayTitle} | Den Sidste Flaske · Vinbot`;
  const ogImages =
    wine.imageUrl != null ? [{ url: wine.imageUrl, alt: wine.displayTitle }] : undefined;
  return {
    title,
    description: wine.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      url,
      title,
      description: wine.metaDescription,
      ...(ogImages ? { images: ogImages } : {}),
    },
  };
}

export default async function DsfPopularWineDetailPage({ params }: Props) {
  const { slug } = await params;
  const wine = getDsfPopularWineBySlug(slug);
  if (!wine) notFound();

  const pageUrl = `${siteUrl}/den-sidste-flaske/vin/${wine.slug}`;
  const productUrlNorm = sanitizeDsfProductUrl(wine.productPageUrl);
  const featuredPick = popularWineToFeaturedPick(wine);

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Den Sidste Flaske", url: `${siteUrl}/den-sidste-flaske` },
    { name: wine.displayTitle, url: pageUrl },
  ];

  const guideBySlug = new Map(listGuides().map((g) => [g.slug, g]));
  const descriptionForLd = [...wine.bodyParagraphs, ...(wine.specs?.map((s) => `${s.label}: ${s.value}`) ?? [])]
    .join(" ")
    .slice(0, 5000);

  const faqItems = [
    {
      question: "Hvor køber jeg den her vin?",
      answer:
        "Du handler på Den Sidste Flaskes webshop. Knappen «Se vinen hos Den Sidste Flaske» åbner butikken i et nyt vindue og går automatisk videre via vores Partner-Ads-affiliatelink, så købet registreres korrekt hos Vinbot.",
    },
    {
      question: "Er prisen på Vinbot altid den samme som hos Den Sidste Flaske?",
      answer:
        "Nej — priser, rabatter og lager kan ændre sig på forhandlerens side fra dag til dag. Bekræft altid årgang, pris og levering på den side, hvor du lægger i kurven.",
    },
    {
      question: "Hvorfor passer der både 2024 og 2025 i beskrivelser om den samme vin?",
      answer:
        "Webshop-url’er erstatter ikke altid automatisk vinens aktuelle årgang på forsiden eller i titler. Årgangen på flasken finder du på produktsiden hos Den Sidste Flaske; bestiller du derefter ved du præcis, hvad du får leveret.",
    },
  ];

  const relatedPicks = dsfFeaturedPicks.filter((p) => sanitizeDsfProductUrl(p.productUrl) !== productUrlNorm);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <DsfPopularWineDetailProductJsonLd
        pick={featuredPick}
        vinbotPageUrl={pageUrl}
        description={descriptionForLd.trim() || wine.metaDescription}
      />
      <FaqJsonLd items={faqItems} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/den-sidste-flaske", label: "Den Sidste Flaske" },
          { href: `/den-sidste-flaske/vin/${wine.slug}`, label: wine.displayTitle },
        ]}
      />

      <article className="mt-8">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900">{wine.displayTitle}</h1>
        <p className="mt-3 text-lg text-stone-700">{wine.metaDescription}</p>

        <AffiliateDisclosure />

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="mx-auto shrink-0 lg:mx-0">
            {wine.imageUrl ? (
              <DsfAffiliateOutboundLink
                productUrl={wine.productPageUrl}
                placement="dsf-vin-detail-hero"
                slug={wine.slug}
                className={`block rounded-2xl border border-stone-200/90 bg-white p-4 shadow-sm transition hover:shadow-md ${"mx-auto flex size-72 items-center justify-center overflow-hidden bg-stone-50 sm:size-80"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={wine.imageUrl} alt="" className="max-h-full max-w-full object-contain p-2" loading="lazy" />
              </DsfAffiliateOutboundLink>
            ) : null}
          </div>
          <div className="min-w-0 flex-1 space-y-6">
            <p className="text-sm leading-relaxed text-stone-700">
              Redaktionel anbefaling: du køber hos Den Sidste Flaske — og støtter Vinbot gratis for dig selv via affiliatelinket.
            </p>
            <DsfAffiliateOutboundLink
              productUrl={wine.productPageUrl}
              placement="dsf-vin-detail-primary"
              slug={wine.slug}
              className="inline-flex rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
            >
              Se vinen hos Den Sidste Flaske
            </DsfAffiliateOutboundLink>

            <div className="space-y-4 text-base leading-relaxed text-stone-800">
              {wine.bodyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            <section aria-labelledby="dsf-pop-spec-heading" className="rounded-2xl border border-stone-200 bg-stone-50/80 p-5">
              <h2 id="dsf-pop-spec-heading" className="text-lg font-semibold text-stone-900">
                Flasken i korte træk
              </h2>
              <dl className="mt-3 divide-y divide-stone-200/90 text-sm">
                {wine.specs.map((s) => (
                  <div key={s.label} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:gap-4">
                    <dt className="shrink-0 font-medium text-stone-700 sm:w-40">{s.label}</dt>
                    <dd className="text-stone-800">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>
        </div>

        <section className="mt-14 border-t border-stone-200 pt-10" aria-labelledby="related-dsf-heading">
          <h2 id="related-dsf-heading" className="text-2xl font-semibold text-stone-900">
            Andre vine på Den Sidste Flaske
          </h2>
          <p className="mt-2 text-stone-700">
            Nogle flasker fra vores øvrige udpluk på hubben — også med affiliate-links til samme shop.
          </p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {relatedPicks.map((pick) => {
              const detailSlug = dsfPopularWineDetailSlugForProductUrl(pick.productUrl);
              return (
                <li key={pick.productUrl}>
                  <article className="flex flex-col rounded-2xl border border-stone-200/90 bg-white p-4 shadow-sm">
                    <h3 className="font-semibold text-stone-900">
                      <DsfAffiliateOutboundLink productUrl={pick.productUrl} placement="dsf-vin-detail-related-title" className="hover:underline">
                        {pick.title}
                      </DsfAffiliateOutboundLink>
                    </h3>
                    {pick.blurb ? <p className="mt-2 text-sm text-stone-600 line-clamp-3">{pick.blurb}</p> : null}
                    <div className="mt-3 flex flex-wrap gap-3">
                      <DsfAffiliateOutboundLink
                        productUrl={pick.productUrl}
                        placement="dsf-vin-detail-related-cta"
                        className="text-sm font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
                      >
                        Købside hos Den Sidste Flaske →
                      </DsfAffiliateOutboundLink>
                      {detailSlug ? (
                        <Link
                          href={`/den-sidste-flaske/vin/${detailSlug}`}
                          className="text-sm font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 hover:text-stone-900"
                        >
                          Læs på Vinbot →
                        </Link>
                      ) : null}
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
          <p className="mt-6 text-sm text-stone-600">
            <Link href="/den-sidste-flaske" className="text-rose-900 underline decoration-rose-200 underline-offset-4 hover:text-rose-950">
              Til hubben Den Sidste Flaske
            </Link>
          </p>
        </section>

        <section className="mt-14 border-t border-stone-200 pt-10" aria-labelledby="guide-links-heading">
          <h2 id="guide-links-heading" className="text-2xl font-semibold text-stone-900">
            Guider der matcher
          </h2>
          <p className="mt-2 text-stone-700">
            Mad, druer og region — internt på Vinbot, uden affiliate.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-800 marker:text-stone-400">
            {wine.guideRefs.map((ref) => {
              const fm = guideBySlug.get(ref.slug);
              const label =
                ref.anchorText ?? fm?.title ?? `[Guide: ${ref.slug}]`;
              return (
                <li key={ref.slug}>
                  <Link href={`/guides/${ref.slug}`} className="text-rose-900 underline decoration-rose-200 underline-offset-4 hover:text-rose-950">
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </article>
    </div>
  );
}
