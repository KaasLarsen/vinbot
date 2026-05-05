import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { runSearch } from "@/lib/search/engine";

const LAURIDSEN_MERCHANT = "Lauridsen Vine";

/**
 * Dynamiske feed-forslag fra Lauridsen på forsiden (Partner Ads-feed indekseret på Vinbot).
 * Vises ikke hvis query+feed ikke giver hits — undgår tom “fejl”-boks.
 */
export async function LauridsenHomeFeedHighlight() {
  const { products } = await runSearch("bourgogne bordeaux champagne pinot chardonnay riesling", null);
  const filtered = products
    .filter((p) => p.merchant.trim().toLowerCase() === LAURIDSEN_MERCHANT.toLowerCase())
    .slice(0, 4);

  if (!filtered.length) return null;

  return (
    <section className="mt-14 space-y-6" aria-labelledby="home-lauridsen-feed-heading">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-amber-900/80">Affiliate · Lauridsen-feed</p>
        <h2 id="home-lauridsen-feed-heading" className="mt-2 text-2xl font-semibold tracking-tight text-stone-900">
          Udvalgte flasker fra Lauridsen Vine
        </h2>
        <p className="mt-2 max-w-3xl text-stone-700">
          Forslag med billede og pris fra det samme feed som vores søgning — du klikker videre til{" "}
          <strong className="font-semibold text-stone-800">Lauridsen Vine</strong>. Se også{" "}
          <Link href="/lauridsen-vine" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
            siden om Lauridsen
          </Link>{" "}
          og{" "}
          <Link href="/rabatkoder" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
            rabatkoder
          </Link>
          .
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((p, i) => (
          <ProductCard key={`${p.url}-${i}`} product={p} placement="home-lauridsen-feed" />
        ))}
      </div>
    </section>
  );
}
