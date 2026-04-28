"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ProductHit, SearchMeta } from "@/lib/search/types";
import {
  productMatchesWineStyle,
  wineStyleOfProduct,
  type WineStyleFilter,
} from "@/lib/search/wine-style";
import { ProductCard } from "@/components/product-card";

type Chip = { label: string; q: string; max?: number };

const ALL_CHIPS: Chip[] = [
  { label: "Julemad", q: "julemad rødvin" },
  { label: "Nytår", q: "nytår champagne bobler" },
  { label: "Fisk", q: "fisk hvidvin" },
  { label: "Tapas", q: "tapas rioja" },
  { label: "Hygge", q: "hygge rødvin" },
  { label: "Romantisk", q: "romantisk middag pinot" },
  { label: "Grill", q: "grill malbec" },
  { label: "Sommer", q: "rosé sommer" },
  { label: "Påske", q: "påske hvidvin riesling" },
  { label: "Forår", q: "forår rosé sauvignon blanc" },
  { label: "Efterår", q: "efterår rødvin" },
  { label: "Under 150 kr", q: "vin", max: 150 },
];

/** Vælg chips ud fra måned (0-indexed). Rækkefølgen afgør hvad brugeren ser først. */
function seasonalChips(monthIndex: number): Chip[] {
  const pick = (...labels: string[]) =>
    labels
      .map((l) => ALL_CHIPS.find((c) => c.label === l))
      .filter((c): c is Chip => Boolean(c));

  switch (monthIndex) {
    case 0:
    case 1:
      return pick("Hygge", "Romantisk", "Fisk", "Tapas", "Under 150 kr");
    case 2:
      return pick("Forår", "Påske", "Fisk", "Romantisk", "Under 150 kr");
    case 3:
      return pick("Forår", "Påske", "Sommer", "Romantisk", "Fisk", "Under 150 kr");
    case 4:
    case 5:
      return pick("Sommer", "Grill", "Fisk", "Romantisk", "Under 150 kr");
    case 6:
    case 7:
      return pick("Sommer", "Grill", "Fisk", "Tapas", "Under 150 kr");
    case 8:
      return pick("Efterår", "Grill", "Hygge", "Tapas", "Under 150 kr");
    case 9:
      return pick("Efterår", "Hygge", "Romantisk", "Tapas", "Under 150 kr");
    case 10:
      return pick("Hygge", "Efterår", "Romantisk", "Julemad", "Under 150 kr");
    case 11:
      return pick("Julemad", "Nytår", "Hygge", "Romantisk", "Under 150 kr");
    default:
      return pick("Hygge", "Fisk", "Tapas", "Romantisk", "Under 150 kr");
  }
}

function seasonalPlaceholder(monthIndex: number): string {
  switch (monthIndex) {
    case 2:
    case 3:
      return "Fx påskefrokost, rosé, lam, hvidvin…";
    case 4:
    case 5:
    case 6:
    case 7:
      return "Fx grill, rosé, sommer, fisk, tapas…";
    case 8:
    case 9:
      return "Fx vildt, rødvin, svamperet, hygge…";
    case 10:
    case 11:
      return "Fx julemad, rødvin, nytår, champagne…";
    default:
      return "Fx hygge, sushi, julemad, champagne…";
  }
}

type ApiResponse = { source: string; products: ProductHit[]; meta: SearchMeta };

const PAGE_MORE = 10;

/** Når feed ikke rammer brugerens ord (fx “morsdag”), vis stadig relevant guide. */
const GUIDE_FALLBACKS: { pattern: RegExp; href: string; title: string }[] = [
  { pattern: /mors\s*dag|morsdag|mors-dag/i, href: "/guides/vin-til-mors-dag", title: "Vin til Mors dag" },
  { pattern: /fars\s*dag|farsdag|fars-dag/i, href: "/guides/vin-til-fars-dag", title: "Vin til Fars dag" },
];

function wineStyleLabel(s: WineStyleFilter): string {
  switch (s) {
    case "all":
      return "alle stilarter";
    case "red":
      return "rødvin";
    case "white":
      return "hvidvin";
    case "rose":
      return "rosé";
    case "sparkling":
      return "bobler";
    case "champagne":
      return "champagne";
    default:
      return s;
  }
}

function StyleChip({
  label,
  count,
  active,
  onClick,
  disabled,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
        disabled
          ? "cursor-not-allowed border-stone-100 bg-stone-50 text-stone-400"
          : active
            ? "border-rose-900 bg-rose-900 text-white"
            : "border-stone-200 bg-white text-stone-800 hover:border-rose-300"
      }`}
    >
      {label}
      {count > 0 ? ` (${count})` : ""}
    </button>
  );
}

export function WineSearch({ initialQuery }: { initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery?.trim() || "");
  const [max, setMax] = useState<string>("");
  const monthIndex = useMemo(() => new Date().getMonth(), []);
  const chips = useMemo(() => seasonalChips(monthIndex), [monthIndex]);
  const placeholder = useMemo(() => seasonalPlaceholder(monthIndex), [monthIndex]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  /** Antal bedste match der vises først: 3 eller 5 */
  const [firstCount, setFirstCount] = useState<3 | 5>(3);
  /** Hvor mange gange brugeren har trykket "Se flere" (+PAGE_MORE pr. gang) */
  const [moreSteps, setMoreSteps] = useState(0);
  /** Den aktuelle søgetekst og budget brugt i seneste søgning (ikke inputfelternes state). */
  const [lastQuery, setLastQuery] = useState<string>("");
  const guideFallback = useMemo(() => {
    const t = lastQuery.trim();
    if (!t) return null;
    return GUIDE_FALLBACKS.find((g) => g.pattern.test(t)) ?? null;
  }, [lastQuery]);
  const [lastBudget, setLastBudget] = useState<number | null>(null);
  /** Billigste vin for `lastQuery` uden budget — bruges som fallback når pris­filteret udelukker alt. */
  const [fallbackCheapest, setFallbackCheapest] = useState<ProductHit | null>(null);

  const maxNum = useMemo(() => {
    const n = parseInt(max, 10);
    return Number.isFinite(n) ? n : null;
  }, [max]);

  const search = useCallback(
    async (query: string, budget?: number | null) => {
      setLoading(true);
      setError(null);
      setFallbackCheapest(null);
      setLastQuery(query);
      setLastBudget(budget ?? null);
      try {
        const params = new URLSearchParams({ q: query });
        if (budget != null && Number.isFinite(budget)) params.set("max", String(budget));
        const r = await fetch(`/api/search?${params.toString()}`);
        const json = (await r.json()) as ApiResponse;
        setData(json);
      } catch {
        setError("Kunne ikke hente resultater. Prøv igen.");
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const iq = initialQuery?.trim();
    if (iq) void search(iq, null);
  }, [initialQuery, search]);

  /* Når prisfilter har udelukket alt, henter vi billigste match uden budget
     og tilbyder brugeren at "vis alligevel". */
  useEffect(() => {
    if (!data) return;
    if (data.products.length > 0) return;
    if (lastBudget == null) return;
    if (!lastQuery.trim()) return;

    let cancelled = false;
    (async () => {
      try {
        const params = new URLSearchParams({ q: lastQuery });
        const r = await fetch(`/api/search?${params.toString()}`);
        const json = (await r.json()) as ApiResponse;
        if (cancelled) return;
        const cheapest = [...(json.products || [])]
          .filter((p) => typeof p.price === "number")
          .sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))[0];
        setFallbackCheapest(cheapest ?? null);
      } catch {
        /* stilhed er OK — fallback er bare en UX-forbedring */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [data, lastQuery, lastBudget]);

  const allProducts = data?.products ?? [];
  /** Forhandler-filter: sæt af valgte merchant-navne. Tom = vis alle. */
  const [selectedMerchants, setSelectedMerchants] = useState<Set<string>>(new Set());
  /** Stil-filter (rød/hvid/…) — kun efter der er kommet søgeresultater. */
  const [wineStyle, setWineStyle] = useState<WineStyleFilter>("all");

  useEffect(() => {
    setMoreSteps(0);
    setSelectedMerchants(new Set());
    setWineStyle("all");
  }, [data]);

  useEffect(() => {
    setMoreSteps(0);
  }, [wineStyle]);

  const merchantCounts = useMemo(() => {
    const m = new Map<string, number>();
    for (const p of allProducts) {
      m.set(p.merchant, (m.get(p.merchant) ?? 0) + 1);
    }
    return Array.from(m.entries()).sort((a, b) => b[1] - a[1]);
  }, [allProducts]);

  /** Efter søgning: forhandler-filter, derefter stil. */
  const merchantFiltered = useMemo(() => {
    if (selectedMerchants.size === 0) return allProducts;
    return allProducts.filter((p) => selectedMerchants.has(p.merchant));
  }, [allProducts, selectedMerchants]);

  const styleCounts = useMemo(() => {
    const counts = { red: 0, white: 0, rose: 0, sparkling: 0, champagne: 0 };
    for (const p of merchantFiltered) {
      const w = wineStyleOfProduct(p);
      if (w === "champagne") counts.champagne += 1;
      else if (w === "sparkling") counts.sparkling += 1;
      else if (w === "rose") counts.rose += 1;
      else if (w === "white") counts.white += 1;
      else if (w === "red") counts.red += 1;
    }
    return counts;
  }, [merchantFiltered]);

  const products = useMemo(() => {
    if (wineStyle === "all") return merchantFiltered;
    return merchantFiltered.filter((p) => productMatchesWineStyle(p, wineStyle));
  }, [merchantFiltered, wineStyle]);

  useEffect(() => {
    if (wineStyle === "all") return;
    if (styleCounts[wineStyle] === 0) setWineStyle("all");
  }, [styleCounts, wineStyle]);

  const total = products.length;
  const allTotal = allProducts.length;

  const visibleCount = useMemo(() => {
    if (!total) return 0;
    const cap = firstCount + moreSteps * PAGE_MORE;
    return Math.min(cap, total);
  }, [total, firstCount, moreSteps]);

  const visibleProducts = useMemo(() => products.slice(0, visibleCount), [products, visibleCount]);
  const canLoadMore = total > 0 && visibleCount < total;

  const toggleMerchant = (merchant: string) => {
    setMoreSteps(0);
    setSelectedMerchants((prev) => {
      const next = new Set(prev);
      if (next.has(merchant)) {
        next.delete(merchant);
      } else {
        next.add(merchant);
      }
      if (typeof window !== "undefined" && typeof window.gtag === "function") {
        try {
          window.gtag("event", "merchant_filter_toggle", {
            merchant,
            active: next.has(merchant) ? 1 : 0,
            selected_count: next.size,
          });
        } catch {
          // no-op
        }
      }
      return next;
    });
  };

  const clearMerchants = () => {
    setMoreSteps(0);
    setSelectedMerchants(new Set());
  };

  const setWineStyleAndTrack = (next: WineStyleFilter) => {
    setWineStyle(next);
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      try {
        window.gtag("event", "wine_style_filter", { style: next });
      } catch {
        // no-op
      }
    }
  };

  return (
    <div className="space-y-6">
      <form
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          void search(q, maxNum);
        }}
      >
        <div className="flex-1">
          <label htmlFor="wine-q" className="block text-sm font-medium text-stone-700">
            Hvad leder du efter?
          </label>
          <input
            id="wine-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none ring-rose-900/20 focus:border-rose-900 focus:ring-2"
          />
        </div>
        <div className="w-full sm:w-40">
          <label htmlFor="wine-max" className="block text-sm font-medium text-stone-700">
            Max pris (valgfri)
          </label>
          <input
            id="wine-max"
            inputMode="numeric"
            value={max}
            onChange={(e) => setMax(e.target.value.replace(/[^\d]/g, ""))}
            placeholder="Fx150"
            className="mt-1 w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none focus:border-rose-900 focus:ring-2"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-rose-900 px-6 py-3 font-semibold text-white shadow-sm hover:bg-rose-950 disabled:opacity-60"
        >
          {loading ? "Søger…" : "Søg vin"}
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {chips.map((c) => (
          <button
            key={c.label}
            type="button"
            onClick={() => {
              setQ(c.q);
              if (c.max) setMax(String(c.max));
              else setMax("");
              void search(c.q, c.max ?? null);
            }}
            className="rounded-full border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-800 shadow-sm hover:border-rose-300 hover:bg-rose-50"
          >
            {c.label}
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-red-700">{error}</p>}

      {data && (
        <div className="space-y-4">
          {allTotal === 0 && lastBudget != null && fallbackCheapest ? (
            <div className="rounded-2xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
              <p className="font-semibold">
                Ingen {lastQuery ? `match på “${lastQuery}”` : "vine"} under {lastBudget} kr lige nu.
              </p>
              <p className="mt-1">
                Den billigste vi har fundet uden prisfilter er{" "}
                <span className="font-semibold">{fallbackCheapest.title}</span>
                {typeof fallbackCheapest.price === "number" && (
                  <> til <span className="font-semibold">{fallbackCheapest.price} kr</span></>
                )}
                {fallbackCheapest.merchant ? <> hos {fallbackCheapest.merchant}</> : null}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setMax("");
                  void search(lastQuery, null);
                }}
                className="mt-3 rounded-xl border border-amber-400 bg-white px-4 py-2 text-sm font-semibold text-amber-900 shadow-sm hover:border-amber-500 hover:bg-amber-100"
              >
                Vis alligevel alle uden prisfilter
              </button>
            </div>
          ) : allTotal === 0 ? (
            <div className="space-y-2 text-sm text-stone-600">
              <p>
                Ingen vine matchede lige nu — forhandlernes tekster indeholder sjældent fx “morsdag”. Prøv en drue, et land eller ord som “rosé”, “champagne” eller “pinot”.
              </p>
              {guideFallback ? (
                <p>
                  Relateret:{" "}
                  <Link
                    href={guideFallback.href}
                    className="font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4 hover:decoration-rose-900"
                  >
                    {guideFallback.title}
                  </Link>
                  . Eller se{" "}
                  <Link
                    href="/guides"
                    className="font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4 hover:decoration-rose-900"
                  >
                    alle guider
                  </Link>
                  .
                </p>
              ) : (
                <p>
                  <Link
                    href="/guides"
                    className="font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4 hover:decoration-rose-900"
                  >
                    Guider om vin og mad
                  </Link>{" "}
                  kan hjælpe med lejlighed og menu — uden at matche direkte mod flaskerne her.
                </p>
              )}
            </div>
          ) : (
            <p className="text-sm text-stone-600">
              {selectedMerchants.size > 0 || wineStyle !== "all"
                ? `Filtreret: ${total} af ${merchantFiltered.length} foreslåede vine${
                    selectedMerchants.size > 0
                      ? ` fra ${selectedMerchants.size} forhandler${selectedMerchants.size === 1 ? "" : "e"}`
                      : ""
                  }${wineStyle !== "all" ? ` · stil: ${wineStyleLabel(wineStyle)}` : ""}. Tjek altid pris og levering hos butikken.`
                : `Vi har fundet ${allTotal} foreslåede vine på tværs af forhandlere — vist efter bedste match. Tjek altid pris og levering hos butikken.`}
            </p>
          )}

          {allTotal > 0 && merchantFiltered.length > 0 && (
            <div
              className="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-white p-3 shadow-sm sm:flex-row sm:flex-wrap sm:items-center sm:gap-2"
              role="group"
              aria-label="Filtrer efter vinstil efter søgning"
            >
              <span className="text-sm font-medium text-stone-700 sm:mr-1">Stil:</span>
              <div className="flex flex-wrap gap-2">
                <StyleChip
                  label="Alle"
                  count={merchantFiltered.length}
                  active={wineStyle === "all"}
                  onClick={() => setWineStyleAndTrack("all")}
                />
                <StyleChip
                  label="Rødvin"
                  count={styleCounts.red}
                  active={wineStyle === "red"}
                  onClick={() => setWineStyleAndTrack("red")}
                  disabled={styleCounts.red === 0}
                />
                <StyleChip
                  label="Hvidvin"
                  count={styleCounts.white}
                  active={wineStyle === "white"}
                  onClick={() => setWineStyleAndTrack("white")}
                  disabled={styleCounts.white === 0}
                />
                <StyleChip
                  label="Rosé"
                  count={styleCounts.rose}
                  active={wineStyle === "rose"}
                  onClick={() => setWineStyleAndTrack("rose")}
                  disabled={styleCounts.rose === 0}
                />
                <StyleChip
                  label="Bobler"
                  count={styleCounts.sparkling}
                  active={wineStyle === "sparkling"}
                  onClick={() => setWineStyleAndTrack("sparkling")}
                  disabled={styleCounts.sparkling === 0}
                />
                <StyleChip
                  label="Champagne"
                  count={styleCounts.champagne}
                  active={wineStyle === "champagne"}
                  onClick={() => setWineStyleAndTrack("champagne")}
                  disabled={styleCounts.champagne === 0}
                />
              </div>
            </div>
          )}

          {merchantCounts.length > 1 && (
            <div className="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-stone-50/70 p-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-2 sm:p-3">
              <span className="text-sm font-medium text-stone-700 sm:mr-1">Vis kun:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={clearMerchants}
                  aria-pressed={selectedMerchants.size === 0}
                  className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                    selectedMerchants.size === 0
                      ? "border-rose-900 bg-rose-900 text-white"
                      : "border-stone-200 bg-white text-stone-800 hover:border-rose-300"
                  }`}
                >
                  Alle ({allTotal})
                </button>
                {merchantCounts.map(([merchant, count]) => {
                  const active = selectedMerchants.has(merchant);
                  return (
                    <button
                      key={merchant}
                      type="button"
                      onClick={() => toggleMerchant(merchant)}
                      aria-pressed={active}
                      className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                        active
                          ? "border-rose-900 bg-rose-900 text-white"
                          : "border-stone-200 bg-white text-stone-800 hover:border-rose-300"
                      }`}
                    >
                      {merchant} ({count})
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {total > 0 && (
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
              <span className="text-sm font-medium text-stone-700">Start med</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFirstCount(3)}
                  aria-pressed={firstCount === 3}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    firstCount === 3
                      ? "border-rose-900 bg-rose-900 text-white"
                      : "border-stone-200 bg-white text-stone-800 hover:border-rose-300"
                  }`}
                >
                  3 bedste match
                </button>
                <button
                  type="button"
                  onClick={() => setFirstCount(5)}
                  aria-pressed={firstCount === 5}
                  className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                    firstCount === 5
                      ? "border-rose-900 bg-rose-900 text-white"
                      : "border-stone-200 bg-white text-stone-800 hover:border-rose-300"
                  }`}
                >
                  5 bedste match
                </button>
              </div>
            </div>
          )}

          {total > 0 && (
            <p className="text-sm text-stone-500">
              Viser {visibleCount} af {total}
              {visibleCount < total ? " — der er flere at udforske." : "."}
            </p>
          )}

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((p, i) => (
              <ProductCard key={`${p.url}-${i}`} product={p} />
            ))}
          </div>

          {total === 0 && allTotal > 0 && selectedMerchants.size > 0 && (
            <p className="text-sm text-stone-500">
              Ingen vine fra de valgte forhandlere matchede —{" "}
              <button type="button" onClick={clearMerchants} className="font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4">
                vis alle forhandlere
              </button>
              .
            </p>
          )}

          {total === 0 && merchantFiltered.length > 0 && wineStyle !== "all" && (
            <p className="text-sm text-stone-500">
              Ingen vine i denne stil i de viste forslag — prøv{" "}
              <button
                type="button"
                onClick={() => setWineStyleAndTrack("all")}
                className="font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4"
              >
                Alle stilarter
              </button>
              .
            </p>
          )}

          {canLoadMore && (
            <div className="flex flex-col items-center gap-1 pt-2">
              <button
                type="button"
                onClick={() => setMoreSteps((s) => s + 1)}
                className="rounded-xl border border-stone-300 bg-white px-5 py-2.5 text-sm font-semibold text-stone-800 shadow-sm hover:border-rose-400 hover:bg-rose-50"
              >
                Se flere muligheder
              </button>
              <p className="text-xs text-stone-500">
                +{Math.min(PAGE_MORE, total - visibleCount)} næste
                {total - visibleCount > PAGE_MORE ? ` · ${total - visibleCount} i alt tilbage` : ""}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
