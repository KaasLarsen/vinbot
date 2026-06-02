import Link from "next/link";

import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { MerchantAffiliateOutboundLink } from "@/components/merchant-affiliate-outbound-link";
import { BreadcrumbJsonLd, FaqJsonLd, WineDetailProductJsonLd } from "@/components/json-ld";
import { listGuides } from "@/lib/content/guides";
import { getMerchantWineConfig } from "@/lib/wine-detail-pages/merchants";
import {
  listWineDetailPagesForMerchant,
  wineDetailPageToFeaturedPick,
  wineDetailPageUrl,
  wineDetailSlugForProductUrl,
} from "@/lib/wine-detail-pages/registry";
import type { WineDetailPage } from "@/lib/wine-detail-pages/types";
import { getFeaturedPicksForMerchant } from "@/lib/merchant-featured-picks";
import { WinePickPrices } from "@/components/wine-pick-prices";
import { siteUrl } from "@/lib/site";

export function WineDetailPageView({ wine }: { wine: WineDetailPage }) {
  const cfg = getMerchantWineConfig(wine.merchantId);
  const pagePath = wineDetailPageUrl(wine);
  const pageUrl = `${siteUrl}${pagePath}`;
  const productUrlNorm = cfg.sanitizeProductUrl(wine.productPageUrl);
  const featuredPick = wineDetailPageToFeaturedPick(wine);

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: cfg.displayName, url: `${siteUrl}${cfg.hubPath}` },
    { name: wine.displayTitle, url: pageUrl },
  ];

  const guideBySlug = new Map(listGuides().map((g) => [g.slug, g]));

  const asideLdParts = wine.imageAside
    ? [wine.imageAside.heading, ...(wine.imageAside.bullets ?? []), wine.imageAside.footnote ?? ""]
    : [];

  const foodLdParts = wine.foodPairing
    ? [
        wine.foodPairing.heading,
        wine.foodPairing.lead ?? "",
        ...(wine.foodPairing.dishes ?? []),
        wine.foodPairing.lessIdeal ?? "",
      ]
    : [];

  const descriptionForLd = [
    ...wine.bodyParagraphs,
    ...asideLdParts,
    ...foodLdParts,
    ...(wine.specs?.map((s) => `${s.label}: ${s.value}`) ?? []),
  ]
    .join(" ")
    .slice(0, 5000);

  const faqItems = [
    {
      question: `Hvor køber jeg ${wine.displayTitle.split("—")[0]?.trim() ?? "vinen"}?`,
      answer: `Du handler hos ${cfg.displayName}. Knappen «Se vinen hos ${cfg.displayName}» åbner butikken i et nyt vindue via vores Partner-Ads-affiliatelink.`,
    },
    {
      question: "Er prisen på Vinbot altid den samme som hos forhandleren?",
      answer:
        "Nej — priser, rabatter og lager kan ændre sig på forhandlerens side. Bekræft altid årgang, pris og levering dér, hvor du lægger i kurven.",
    },
    {
      question: "Hvorfor nævner I både flere årgange i teksten?",
      answer:
        "Webshop-url’er og produktstitler opdateres ikke altid samtidig med flaskens aktuelle årgang. Tjek etiket og produktside hos forhandleren før du bestiller.",
    },
    {
      question: "Til hvilken slags mad passer vinen?",
      answer:
        wine.foodPairing?.heading != null
          ? `Se sektionen «${wine.foodPairing.heading}» på denne side — og de linkede vin-og-mad-guider nederst.`
          : "Vi har samlet guider nederst på siden, der matcher drue, region og mad.",
    },
  ];

  const hubFeatured = getFeaturedPicksForMerchant(wine.merchantId);
  const relatedFromFeatured = hubFeatured.filter((p) => cfg.sanitizeProductUrl(p.productUrl) !== productUrlNorm);
  const relatedFromRegistry = listWineDetailPagesForMerchant(wine.merchantId).filter(
    (p) => p.slug !== wine.slug && cfg.sanitizeProductUrl(p.productPageUrl) !== productUrlNorm,
  );

  const relatedCards =
    relatedFromFeatured.length > 0
      ? relatedFromFeatured.slice(0, 4)
      : relatedFromRegistry.slice(0, 4).map((p) => wineDetailPageToFeaturedPick(p));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <WineDetailProductJsonLd
        merchantId={wine.merchantId}
        pick={featuredPick}
        vinbotPageUrl={pageUrl}
        description={descriptionForLd.trim() || wine.metaDescription}
        additionalGalleryImageUrls={wine.additionalGalleryImageUrls}
      />
      <FaqJsonLd items={faqItems} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: cfg.hubPath, label: cfg.displayName },
          { href: pagePath, label: wine.displayTitle },
        ]}
      />

      <article className="mt-8">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900">{wine.displayTitle}</h1>
        <p className="mt-3 text-lg text-stone-700">{wine.metaDescription}</p>

        <AffiliateDisclosure />

        {wine.listPrice != null || (wine.volumePrices?.length ?? 0) > 0 ? (
          <div className="mt-6 rounded-2xl border border-stone-200/90 bg-stone-50/80 p-4">
            <p className="text-sm font-medium text-stone-900">Vejledende priser hos {cfg.displayName}</p>
            <div className="mt-2">
              <WinePickPrices pick={wine} />
            </div>
          </div>
        ) : null}

        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
          <div className="mx-auto flex w-full max-w-[21rem] shrink-0 flex-col gap-6 lg:mx-0">
            {wine.imageUrl ? (
              <MerchantAffiliateOutboundLink
                merchantId={wine.merchantId}
                productUrl={wine.productPageUrl}
                placement={`${wine.merchantId}-vin-detail-hero`}
                slug={wine.slug}
                className={`block rounded-2xl border border-stone-200/90 bg-white p-4 shadow-sm transition hover:shadow-md ${"flex size-72 items-center justify-center overflow-hidden bg-stone-50 sm:size-80"}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={wine.imageUrl} alt="" className="max-h-full max-w-full object-contain p-2" loading="lazy" />
              </MerchantAffiliateOutboundLink>
            ) : null}
            {(wine.additionalGalleryImageUrls ?? []).length > 0 ? (
              <div className="space-y-2">
                <p className="text-center text-xs font-medium text-stone-600 lg:text-left">
                  Flere vinkler ({cfg.displayName})
                </p>
                <div className="grid grid-cols-2 gap-2" aria-label="Yderligere produktfotos">
                  {(wine.additionalGalleryImageUrls ?? []).map((src, i) => (
                    <MerchantAffiliateOutboundLink
                      key={src}
                      merchantId={wine.merchantId}
                      productUrl={wine.productPageUrl}
                      placement={`${wine.merchantId}-vin-detail-gallery-${i}`}
                      slug={wine.slug}
                      className="flex aspect-square items-center justify-center overflow-hidden rounded-xl border border-stone-200/90 bg-white p-2 shadow-sm transition hover:shadow-md"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={src} alt="" className="max-h-[7.75rem] max-w-full object-contain" loading="lazy" sizes="140px" />
                    </MerchantAffiliateOutboundLink>
                  ))}
                </div>
                <p className="text-center text-[11px] leading-snug text-stone-500 lg:text-left">
                  Klik fører til butik via affiliate-link — billeder leveres af forhandleren.
                </p>
              </div>
            ) : null}
            {wine.imageAside ? (
              <section aria-labelledby="wine-aside-heading" className="rounded-2xl border border-stone-200/90 bg-stone-50/90 p-4 shadow-sm">
                <h2 id="wine-aside-heading" className="text-base font-semibold text-stone-900">
                  {wine.imageAside.heading}
                </h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-stone-800 marker:text-stone-400">
                  {wine.imageAside.bullets.map((line, i) => (
                    <li key={i}>{line}</li>
                  ))}
                </ul>
                {wine.imageAside.footnote ? (
                  <p className="mt-3 border-t border-stone-200/80 pt-3 text-xs leading-snug text-stone-600">
                    {wine.imageAside.footnote}
                  </p>
                ) : null}
              </section>
            ) : null}
            {wine.imageUrl || wine.imageAside ? (
              <div className="rounded-2xl border border-stone-200/90 bg-white p-4 shadow-sm">
                <p className="text-sm font-medium text-stone-900">Videre på Vinbot eller i butikken</p>
                <ul className="mt-3 space-y-2 text-sm text-stone-700">
                  <li>
                    <MerchantAffiliateOutboundLink
                      merchantId={wine.merchantId}
                      productUrl={wine.productPageUrl}
                      placement={`${wine.merchantId}-vin-detail-aside-buy`}
                      slug={wine.slug}
                      className="text-rose-900 underline decoration-rose-200 underline-offset-4 hover:text-rose-950"
                    >
                      Gå til produktet hos {cfg.displayName} (affiliate) →
                    </MerchantAffiliateOutboundLink>
                  </li>
                  <li>
                    <Link
                      href={cfg.hubPath}
                      className="text-stone-800 underline decoration-stone-300 underline-offset-4 hover:text-stone-950"
                    >
                      Se flere flasker på {cfg.displayName}-hubben →
                    </Link>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
          <div className="min-w-0 flex-1 space-y-6">
            <p className="text-sm leading-relaxed text-stone-700">
              Redaktionel anbefaling: du køber hos {cfg.displayName} — og støtter Vinbot gratis for dig selv via affiliatelinket.
            </p>
            <MerchantAffiliateOutboundLink
              merchantId={wine.merchantId}
              productUrl={wine.productPageUrl}
              placement={`${wine.merchantId}-vin-detail-primary`}
              slug={wine.slug}
              className="inline-flex rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
            >
              Se vinen hos {cfg.displayName}
            </MerchantAffiliateOutboundLink>

            <div className="space-y-4 text-base leading-relaxed text-stone-800">
              {wine.bodyParagraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {wine.foodPairing ? (
              <section aria-labelledby="wine-food-heading" className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                <h2 id="wine-food-heading" className="text-lg font-semibold text-stone-900">
                  {wine.foodPairing.heading}
                </h2>
                {wine.foodPairing.lead ? (
                  <p className="mt-3 text-base leading-relaxed text-stone-800">{wine.foodPairing.lead}</p>
                ) : null}
                <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-800 marker:text-stone-400">
                  {wine.foodPairing.dishes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                {wine.foodPairing.lessIdeal ? (
                  <p className="mt-5 text-sm leading-relaxed text-stone-600">{wine.foodPairing.lessIdeal}</p>
                ) : null}
              </section>
            ) : null}

            <section aria-labelledby="wine-spec-heading" className="rounded-2xl border border-stone-200 bg-stone-50/80 p-5">
              <h2 id="wine-spec-heading" className="text-lg font-semibold text-stone-900">
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

        {relatedCards.length > 0 ? (
          <section className="mt-14 border-t border-stone-200 pt-10" aria-labelledby="related-wine-heading">
            <h2 id="related-wine-heading" className="text-2xl font-semibold text-stone-900">
              Andre vine hos {cfg.displayName}
            </h2>
            <p className="mt-2 text-stone-700">
              Flasker fra vores øvrige udpluk — også med affiliate-links til samme shop.
            </p>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {relatedCards.map((pick) => {
                const detailSlug = pick.directLink
                  ? undefined
                  : wineDetailSlugForProductUrl(wine.merchantId, pick.productUrl);
                return (
                  <li key={pick.productUrl}>
                    <article className="flex flex-col rounded-2xl border border-stone-200/90 bg-white p-4 shadow-sm">
                      <h3 className="font-semibold text-stone-900">
                        <MerchantAffiliateOutboundLink
                          merchantId={wine.merchantId}
                          productUrl={pick.productUrl}
                          placement={`${wine.merchantId}-vin-detail-related-title`}
                          className="hover:underline"
                        >
                          {pick.title}
                        </MerchantAffiliateOutboundLink>
                      </h3>
                      {pick.blurb ? <p className="mt-2 line-clamp-3 text-sm text-stone-600">{pick.blurb}</p> : null}
                      <div className="mt-3 flex flex-wrap gap-3">
                        <MerchantAffiliateOutboundLink
                          merchantId={wine.merchantId}
                          productUrl={pick.productUrl}
                          placement={`${wine.merchantId}-vin-detail-related-cta`}
                          className="text-sm font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
                        >
                          Købside hos {cfg.displayName} →
                        </MerchantAffiliateOutboundLink>
                        {detailSlug ? (
                          <Link
                            href={`${cfg.hubPath}/vin/${detailSlug}`}
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
              <Link href={cfg.hubPath} className="text-rose-900 underline decoration-rose-200 underline-offset-4 hover:text-rose-950">
                Til hubben {cfg.displayName}
              </Link>
            </p>
          </section>
        ) : null}

        <section className="mt-14 border-t border-stone-200 pt-10" aria-labelledby="guide-links-heading">
          <h2 id="guide-links-heading" className="text-2xl font-semibold text-stone-900">
            Guider der matcher
          </h2>
          <p className="mt-2 text-stone-700">Mad, druer og region — internt på Vinbot, uden affiliate.</p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-800 marker:text-stone-400">
            {wine.guideRefs.map((ref) => {
              const fm = guideBySlug.get(ref.slug);
              const label = ref.anchorText ?? fm?.title ?? `[Guide: ${ref.slug}]`;
              return (
                <li key={ref.slug}>
                  <Link
                    href={`/guides/${ref.slug}`}
                    className="text-rose-900 underline decoration-rose-200 underline-offset-4 hover:text-rose-950"
                  >
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
