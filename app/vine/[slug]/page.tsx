import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { VivinoCommunityLink } from "@/components/vivino-community-link";
import { VineRelatedWines } from "@/components/vine-related";
import { BreadcrumbJsonLd, WineProductJsonLd } from "@/components/json-ld";
import { proxyImg } from "@/lib/search/helpers";
import { siteUrl } from "@/lib/site";
import { getCachedWineCatalog, getWineBySlug } from "@/lib/vine/catalog";
import { pickRelatedWines } from "@/lib/vine/related-wines";
import { vineMetaDescription, vinePageIntro, vinePagePairing } from "@/lib/vine/copy";
import { vivinoSearchUrl } from "@/lib/vine/vivino-link";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 21600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wine = await getWineBySlug(slug);
  if (!wine) return { title: "Vin ikke fundet" };
  const url = `${siteUrl}/vine/${wine.slug}`;
  const title = `${wine.displayTitle}${wine.brand ? ` · ${wine.brand}` : ""}`;
  const description = vineMetaDescription(wine, 158);
  const ogImages =
    wine.image != null ? [{ url: `${siteUrl}/api/img?src=${encodeURIComponent(wine.image)}`, alt: wine.displayTitle }] : undefined;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title: `${title} | Vinbot`, description, ...(ogImages ? { images: ogImages } : {}) },
  };
}

export default async function VineProductPage({ params }: Props) {
  const { slug } = await params;
  const catalog = await getCachedWineCatalog();
  const wine = catalog.wines.find((w) => w.slug === slug) ?? null;
  if (!wine) notFound();
  const relatedWines = pickRelatedWines(wine, catalog.wines, { limit: 8 });

  const url = `${siteUrl}/vine/${wine.slug}`;
  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Vin-katalog", url: `${siteUrl}/vine` },
    { name: wine.displayTitle, url },
  ];

  const imageAbsolute =
    wine.image != null ? `${siteUrl}/api/img?src=${encodeURIComponent(wine.image)}` : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <WineProductJsonLd wine={wine} pageUrl={url} imageAbsoluteUrl={imageAbsolute} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/vine", label: "Vin-katalog" },
          { href: `/vine/${wine.slug}`, label: wine.displayTitle },
        ]}
      />

      <article className="mt-8">
        <h1 className="text-4xl font-semibold tracking-tight text-stone-900">{wine.displayTitle}</h1>
        {wine.brand ? <p className="mt-2 text-lg text-stone-700">{wine.brand}</p> : null}
        {wine.category.trim() ? (
          <p className="mt-2 text-sm leading-snug text-stone-600">
            <span className="font-medium text-stone-700">Kategori:</span>{" "}
            {wine.category.replace(/\s*[>|]\s*/g, " · ")}
          </p>
        ) : null}
        {wine.gtin ? (
          <p className="mt-2 text-xs text-stone-500">
            Produkt-ID (GTIN/EAN): <span className="font-mono">{wine.gtin}</span>
          </p>
        ) : null}

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)] lg:items-start">
          <figure className="mx-auto w-full max-w-[280px] lg:mx-0">
            {wine.image ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={proxyImg(wine.image)}
                  alt={wine.displayTitle}
                  width={560}
                  height={560}
                  className="aspect-square w-full rounded-2xl border border-stone-200 bg-stone-50 object-contain p-4 shadow-sm"
                  loading="eager"
                  fetchPriority="high"
                />
                <figcaption className="sr-only">Produktbillede</figcaption>
              </>
            ) : (
              <div className="flex aspect-square w-full flex-col items-center justify-center rounded-2xl border border-dashed border-stone-300 bg-stone-50 px-6 text-center text-sm text-stone-500">
                Intet produktbillede — se tilbud fra butikkerne herunder.
              </div>
            )}
          </figure>

          <div className="min-w-0">
            <div className="prose prose-stone max-w-none">
              <p className="text-stone-800 leading-relaxed">{vinePageIntro(wine)}</p>

              {wine.description ? (
                <>
                  <h2 className="mt-8 text-xl font-semibold text-stone-900">Om produktet</h2>
                  <div className="whitespace-pre-wrap text-stone-800 leading-relaxed">{wine.description}</div>
                  <p className="text-sm text-stone-600">
                    Produktoplysninger kan variere fra butik til butik — se altid den aktuelle beskrivelse hos forhandleren.
                  </p>
                </>
              ) : null}

              {wine.alternateListingTitles.length > 0 ? (
                <div className="mt-6 rounded-xl border border-stone-200 bg-stone-50/90 px-4 py-3 text-sm text-stone-700">
                  <p className="font-medium text-stone-800">Også solgt som</p>
                  <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-stone-400">
                    {wine.alternateListingTitles.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <h2 className="mt-10 text-xl font-semibold text-stone-900">Mad og smag</h2>
              <p className="text-stone-800 leading-relaxed">{vinePagePairing(wine)}</p>
              <p className="text-sm text-stone-600">
                Vejledende forslag ud fra navn og type — ikke en smagsanmeldelse fra Vinbot.
              </p>
            </div>
          </div>
        </div>

        <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-stone-900">Hvor kan du købe den?</h2>
          <ul className="mt-4 divide-y divide-stone-100">
            {wine.offers.map((o) => (
              <li key={`${o.merchant}-${o.url}`} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="font-medium text-stone-900">{o.merchant}</span>
                  {typeof o.price === "number" ? (
                    <span className="ml-2 text-stone-700">
                      ca. {o.price} {o.currency === "DKK" ? "kr" : o.currency}
                    </span>
                  ) : (
                    <span className="ml-2 text-stone-500">Pris ikke angivet</span>
                  )}
                </div>
                <a
                  href={o.url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="inline-flex shrink-0 rounded-xl bg-rose-900 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-950"
                >
                  Til butikken
                </a>
              </li>
            ))}
          </ul>
        </section>

        <VineRelatedWines wines={relatedWines} />

        <section className="mt-10 bg-transparent p-0">
          <VivinoCommunityLink href={vivinoSearchUrl(wine.displayTitle)} />
        </section>

        <section className="mt-10">
          <AffiliateDisclosure />
        </section>

        <p className="mt-8 text-sm text-stone-500">
          <Link href="/vine" className="text-rose-900 underline decoration-rose-300 underline-offset-4">
            Tilbage til vin-kataloget
          </Link>
        </p>
      </article>
    </div>
  );
}
