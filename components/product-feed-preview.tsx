import { runSearch } from "@/lib/search/engine";
import { ProductCard } from "@/components/product-card";

export async function ProductFeedPreview({
  query,
  maxPrice,
  title,
  merchant,
}: {
  query: string;
  maxPrice?: number | null;
  title?: string;
  /** Filtrér til én forhandler (eksakt match på feed-navn, fx "Lauridsen Vine"). */
  merchant?: string | null;
}) {
  const { products } = await runSearch(query, maxPrice ?? null);

  const filtered =
    merchant?.trim().length ?
      products.filter((p) => p.merchant.trim().toLowerCase() === merchant.trim().toLowerCase())
    : products;

  if (!filtered.length) {
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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, 9).map((p, i) => (
          <ProductCard key={`${p.url}-${i}`} product={p} placement="product-feed-preview" />
        ))}
      </div>
    </section>
  );
}
