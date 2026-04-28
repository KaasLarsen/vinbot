"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import type { VineCatalogStyleFilter, VineWineStyleGuess } from "@/lib/vine/catalog-style";

const INITIAL_VISIBLE = 40;
const LOAD_MORE_STEP = 40;

const STYLE_CHIPS: { id: VineCatalogStyleFilter; label: string }[] = [
  { id: "alle", label: "Alle" },
  { id: "bobler", label: "Bobler" },
  { id: "rose", label: "Rosé" },
  { id: "hvid", label: "Hvid" },
  { id: "rod", label: "Rød" },
];

export type WineSummary = {
  slug: string;
  displayTitle: string;
  brand: string;
  merchantCount: number;
  lowestPrice: number | null;
  /** Produktbillede-URL fra feed (kan mangle). */
  image: string | null;
  /** Gættet stil til filter (null = kun under «Alle»). */
  catalogStyle: VineWineStyleGuess;
};

export function VineHubSearch({ wines }: { wines: WineSummary[] }) {
  const [q, setQ] = useState("");
  const [styleFilter, setStyleFilter] = useState<VineCatalogStyleFilter>("alle");
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    let list = wines;
    if (t) {
      list = wines.filter(
        (w) =>
          w.displayTitle.toLowerCase().includes(t) ||
          w.brand.toLowerCase().includes(t) ||
          w.slug.includes(t.replace(/\s+/g, "-")),
      );
    }
    if (styleFilter !== "alle") {
      list = list.filter((w) => w.catalogStyle === styleFilter);
    }
    return list;
  }, [q, wines, styleFilter]);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [q, styleFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visible.length;

  return (
    <div className="space-y-5">
      <div>
        <label htmlFor="vine-hub-q" className="block text-sm font-medium text-stone-700">
          Søg i vin-kataloget
        </label>
        <input
          id="vine-hub-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Fx drue, navn, producent…"
          className="mt-2 w-full max-w-xl rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none ring-rose-900/20 focus:border-rose-900 focus:ring-2"
        />
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-stone-700">Type</p>
        <div className="flex flex-wrap gap-2">
          {STYLE_CHIPS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setStyleFilter(c.id)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                styleFilter === c.id
                  ? "bg-rose-900 text-white shadow-sm"
                  : "border border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length > 0 ? (
        <p className="text-sm text-stone-600">
          {hasMore ? (
            <>
              Viser {visible.length.toLocaleString("da-DK")} af {filtered.length.toLocaleString("da-DK")} vine
            </>
          ) : q.trim() || styleFilter !== "alle" ? (
            <>{filtered.length.toLocaleString("da-DK")} vine matcher dit valg</>
          ) : (
            <>{filtered.length.toLocaleString("da-DK")} vine</>
          )}
        </p>
      ) : null}
      <ul className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
        {visible.map((w) => (
          <li key={w.slug}>
            <Link
              href={`/vine/${w.slug}`}
              className="flex flex-col gap-1 px-4 py-3 transition hover:bg-rose-50/80 sm:flex-row sm:items-center sm:justify-between"
            >
              <span>
                <span className="font-medium text-stone-900">{w.displayTitle}</span>
                {w.brand ? <span className="text-stone-600"> — {w.brand}</span> : null}
              </span>
              <span className="text-sm text-stone-600">
                {w.merchantCount} forhandler{w.merchantCount === 1 ? "" : "e"}
                {typeof w.lowestPrice === "number" ? ` · fra ca. ${w.lowestPrice} kr` : ""}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      {hasMore ? (
        <div>
          <button
            type="button"
            onClick={() => setVisibleCount((n) => n + LOAD_MORE_STEP)}
            className="rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm font-medium text-stone-800 shadow-sm transition hover:border-rose-300 hover:bg-rose-50/50"
          >
            Vis flere ({filtered.length - visible.length} tilbage)
          </button>
        </div>
      ) : null}
      {filtered.length === 0 && (
        <p className="text-sm text-stone-600">Ingen match — prøv et andet søgeord eller vælg «Alle» ved typen.</p>
      )}
    </div>
  );
}
