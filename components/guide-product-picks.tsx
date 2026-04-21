"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ProductHit, SearchMeta } from "@/lib/search/types";
import { trackAffiliateClick } from "@/lib/affiliate-track";

type ApiResponse = { source: string; products: ProductHit[]; meta: SearchMeta };

/**
 * Inline produkt-picks: kalder /api/search klient-side og viser op til 3 matches.
 * Bruges øverst/midt i hver guide så brugeren kan shoppe uden at forlade siden.
 * Hvis intet matcher, vises et kompakt link til forsidens søgning (fallback).
 */
export function GuideProductPicks({
  q,
  max,
  slug,
  hub,
  label,
  searchHref,
  heading = "Se 3 forslag fra danske forhandlere",
  max_items = 3,
}: {
  q: string;
  max: number | null;
  slug: string;
  hub?: string;
  label: string;
  searchHref: string;
  heading?: string;
  max_items?: number;
}) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductHit[]>([]);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setFailed(false);
      try {
        const params = new URLSearchParams({ q });
        if (max != null && Number.isFinite(max)) params.set("max", String(max));
        const r = await fetch(`/api/search?${params.toString()}`);
        const json = (await r.json()) as ApiResponse;
        if (cancelled) return;
        setProducts((json.products || []).slice(0, max_items));
      } catch {
        if (!cancelled) setFailed(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void run();
    return () => {
      cancelled = true;
    };
  }, [q, max, max_items]);

  return (
    <section
      aria-label="Anbefalede vine"
      className="not-prose mt-8 rounded-2xl border border-stone-200 bg-gradient-to-br from-rose-50/70 via-white to-amber-50/40 p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/80">Shop nu</p>
          <h2 className="text-lg font-semibold text-stone-900 sm:text-xl">{heading}</h2>
          <p className="mt-1 text-sm text-stone-600">
            {label.charAt(0).toUpperCase() + label.slice(1)} — priser og lager varierer hos forhandleren.
          </p>
        </div>
        <Link
          href={searchHref}
          className="hidden shrink-0 rounded-xl border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-stone-800 shadow-sm hover:border-rose-300 sm:inline-block"
        >
          Se alle forslag →
        </Link>
      </div>

      {loading ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-3" aria-busy="true">
          {Array.from({ length: max_items }).map((_, i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded-2xl border border-stone-200 bg-white/60"
            />
          ))}
        </div>
      ) : failed || products.length === 0 ? (
        <div className="mt-4 rounded-xl border border-stone-200 bg-white/80 p-4 text-sm text-stone-700">
          Vi kunne ikke hente konkrete forslag lige nu.{" "}
          <Link href={searchHref} className="font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
            Prøv den fulde søgning
          </Link>{" "}
          — vi søger på tværs af 10+ danske forhandlere.
        </div>
      ) : (
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {products.map((p, i) => (
            <li key={`${p.url}-${i}`}>
              <GuideProductCard product={p} slug={slug} hub={hub} />
            </li>
          ))}
        </ul>
      )}

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-stone-200/70 pt-3 text-xs text-stone-500">
        <span>Annoncelinks: vi kan modtage provision — det koster dig ikke ekstra.</span>
        <Link href={searchHref} className="font-semibold text-rose-900 hover:underline sm:hidden">
          Se alle forslag →
        </Link>
      </div>
    </section>
  );
}

function GuideProductCard({
  product,
  slug,
  hub,
}: {
  product: ProductHit;
  slug: string;
  hub?: string;
}) {
  const price =
    product.price != null
      ? new Intl.NumberFormat("da-DK", {
          style: "currency",
          currency: product.currency || "DKK",
        }).format(product.price)
      : null;

  const onClick = () => {
    trackAffiliateClick({
      merchant: product.merchant,
      placement: "guide-picks",
      slug,
      hub,
      url: product.url,
    });
  };

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition hover:shadow-md">
      <a
        href={product.url}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        onClick={onClick}
        className="mx-auto mt-3 flex size-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-stone-100 sm:size-32"
      >
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={product.image} alt="" className="max-h-full max-w-full object-contain p-2" loading="lazy" />
        ) : (
          <span className="px-2 text-center text-[11px] text-stone-400">Intet billede</span>
        )}
      </a>
      <div className="flex flex-1 flex-col gap-1.5 p-3">
        <p className="text-[10px] font-medium uppercase tracking-wide text-rose-800/90">{product.merchant}</p>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-stone-900">
          <a
            href={product.url}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            onClick={onClick}
            className="hover:underline"
          >
            {product.title}
          </a>
        </h3>
        {price && <p className="text-sm font-semibold text-stone-800">{price}</p>}
        <a
          href={product.url}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          onClick={onClick}
          className="mt-auto inline-flex items-center justify-center rounded-xl bg-rose-900 px-3 py-2 text-xs font-medium text-white hover:bg-rose-950"
        >
          Se hos forhandler
        </a>
      </div>
    </article>
  );
}
