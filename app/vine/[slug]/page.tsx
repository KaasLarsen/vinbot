import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/site";
import { getWineBySlug } from "@/lib/vine/catalog";
import { vinePageIntro, vinePagePairing } from "@/lib/vine/copy";
import { vivinoSearchUrl } from "@/lib/vine/vivino-link";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 21600;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const wine = await getWineBySlug(slug);
  if (!wine) return { title: "Vin ikke fundet" };
  const url = `${siteUrl}/vine/${wine.slug}`;
  const title = `${wine.displayTitle}${wine.brand ? ` · ${wine.brand}` : ""}`;
  const description = vinePageIntro(wine).slice(0, 158);
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { url, title: `${title} | Vinbot`, description },
  };
}

export default async function VineProductPage({ params }: Props) {
  const { slug } = await params;
  const wine = await getWineBySlug(slug);
  if (!wine) notFound();

  const url = `${siteUrl}/vine/${wine.slug}`;
  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Vin-katalog", url: `${siteUrl}/vine` },
    { name: wine.displayTitle, url },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
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
        {wine.gtin ? (
          <p className="mt-2 text-xs text-stone-500">
            Produkt-ID (GTIN/EAN): <span className="font-mono">{wine.gtin}</span>
          </p>
        ) : null}

        <div className="prose prose-stone mt-8 max-w-none">
          <p className="text-stone-800 leading-relaxed">{vinePageIntro(wine)}</p>
          <h2 className="text-xl font-semibold text-stone-900">Mad og smag</h2>
          <p className="text-stone-800 leading-relaxed">{vinePagePairing(wine)}</p>
          <p className="text-sm text-stone-600">
            Teksten er et generelt udgangspunkt baseret på kategori og navn — ikke en individuel anmeldelse.
          </p>
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
                    <span className="ml-2 text-stone-500">Pris ikke angivet i feed</span>
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

        <section className="mt-10 rounded-2xl border border-stone-200 bg-stone-50/80 p-6">
          <h2 className="text-lg font-semibold text-stone-900">Vivino</h2>
          <p className="mt-2 text-sm text-stone-700 leading-relaxed">
            Vi viser ikke importerede Vivino-stjerner her — du kan åbne Vivinos egen søgning for flere brugerbedømmelser og flaskedeftaljer.
          </p>
          <a
            href={vivinoSearchUrl(wine.displayTitle)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-900 hover:border-rose-400"
          >
            Søg på Vivino (åbner nyt vindue)
          </a>
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
