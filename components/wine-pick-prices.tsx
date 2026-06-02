import { formatWinePriceDkk, type WinePickPriceInput } from "@/lib/wine-pick-prices";

export { lowestPricePerBottle, type WinePickPriceInput } from "@/lib/wine-pick-prices";

/** Enkeltflaske + evt. 6/12-fl. priser pr. flaske. */
export function WinePickPrices({ pick }: { pick: WinePickPriceInput }) {
  const currency = pick.priceCurrency ?? "DKK";
  const tiers: { bottles: number; price: number; label: string }[] = [];

  if (pick.listPrice != null) {
    tiers.push({ bottles: 1, price: pick.listPrice, label: "1 fl." });
  }
  for (const v of pick.volumePrices ?? []) {
    tiers.push({ bottles: v.bottles, price: v.pricePerBottle, label: `${v.bottles} fl.` });
  }

  if (tiers.length === 0) return null;

  tiers.sort((a, b) => a.bottles - b.bottles);
  const lowest = Math.min(...tiers.map((t) => t.price));
  const showHint = tiers.length > 1;

  return (
    <div className="text-sm text-stone-800">
      <ul className="space-y-0.5">
        {tiers.map((t) => (
          <li
            key={t.bottles}
            className={showHint && t.price === lowest ? "font-semibold text-rose-900" : undefined}
          >
            <span>{t.label}:</span> {formatWinePriceDkk(t.price, currency)}
            <span className="text-stone-600">/fl</span>
            {t.bottles === 1 && showHint ? (
              <span className="font-normal text-stone-500"> (enkelt)</span>
            ) : null}
            {showHint && t.price === lowest && t.bottles > 1 ? (
              <span className="ml-1 text-xs font-medium text-emerald-800">lavest pr. fl.</span>
            ) : null}
          </li>
        ))}
      </ul>
      {showHint ? (
        <p className="mt-1 text-xs text-stone-500">Volumenrabat hos butikken — bekræft pris i kurven.</p>
      ) : null}
    </div>
  );
}
