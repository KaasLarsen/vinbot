import { ProductCard } from "@/components/product-card";
import { runSearch } from "@/lib/search/engine";
import type { ProductHit } from "@/lib/search/types";

function merchantMatches(product: ProductHit, merchant?: string | null) {
  if (!merchant?.trim()) return true;
  return product.merchant.trim().toLowerCase() === merchant.trim().toLowerCase();
}

/** Kør flere søgninger og slå unikke produkter sammen (samme URL kun én gang) — godt når én query giver få hits for én forhandler. */
async function mergeSearchQueries(
  queries: string[],
  maxPrice: number | null,
  merchant: string | null | undefined,
  maxItems: number,
): Promise<ProductHit[]> {
  const seen = new Set<string>();
  const out: ProductHit[] = [];
  for (const q of queries) {
    if (out.length >= maxItems) break;
    const { products } = await runSearch(q.trim(), maxPrice);
    const filtered = products.filter((p) => merchantMatches(p, merchant));
    for (const p of filtered) {
      const key = p.url.trim().toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(p);
      if (out.length >= maxItems) break;
    }
  }
  return out;
}

export async function ProductFeedPreview({
  query,
  queries,
  maxPrice,
  title,
  merchant,
  maxItems = 9,
  placement = "product-feed-preview",
  gridClassName = "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
}: {
  /** Én søgestreng (klassisk brug). */
  query?: string;
  /** Flere søgestrenge slås sammen indtil `maxItems`. Hvis mindst én streng findes her, ignoreres `query`. */
  queries?: string[];
  maxPrice?: number | null;
  title?: string;
  /** Filtrér til én forhandler (eksakt match på feed-navn, fx "Lauridsen Vine"). */
  merchant?: string | null;
  /** Max antal kort (standard 9). */
  maxItems?: number;
  /** GA4 affiliate_click placement på produktlinks. */
  placement?: string;
  /** CSS grid-klasser (fx 4 kolonner på forsiden). */
  gridClassName?: string;
}) {
  const nonEmptyQueries = queries?.map((s) => s.trim()).filter(Boolean);
  const mergedQueries =
    nonEmptyQueries?.length ? nonEmptyQueries : query?.trim().length ? [query.trim()] : [];

  if (!mergedQueries.length) {
    return (
      <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-stone-600">
        <p className="font-medium text-stone-800">{title || "Forslag til vine"}</p>
        <p className="mt-2 text-sm">Der er ikke konfigureret en søgning til denne sektion endnu.</p>
      </section>
    );
  }

  const filtered =
    mergedQueries.length === 1 ?
      (await runSearch(mergedQueries[0], maxPrice ?? null)).products.filter((p) => merchantMatches(p, merchant))
    : await mergeSearchQueries(mergedQueries, maxPrice ?? null, merchant, maxItems);

  const sliced = filtered.slice(0, maxItems);

  if (!sliced.length) {
    return (
      <section className="rounded-2xl border border-stone-200 bg-stone-50 p-6 text-stone-600">
        <p className="font-medium text-stone-800">{title || "Forslag til vine"}</p>
        <p className="mt-2 text-sm">
          Ingen matchende vine lige nu
          {merchant?.trim() ? ` hos ${merchant.trim()}` : ""} — prøv et andet søgeord eller kig forbi igen lidt senere.
        </p>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {title && <h2 className="text-xl font-semibold text-stone-900">{title}</h2>}
      <div className={gridClassName}>
        {sliced.map((p, i) => (
          <ProductCard key={`${p.url}-${i}`} product={p} placement={placement} />
        ))}
      </div>
    </section>
  );
}
