"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type WineSummary = {
  slug: string;
  displayTitle: string;
  brand: string;
  merchantCount: number;
  lowestPrice: number | null;
};

export function VineHubSearch({ wines }: { wines: WineSummary[] }) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return wines;
    return wines.filter(
      (w) =>
        w.displayTitle.toLowerCase().includes(t) ||
        w.brand.toLowerCase().includes(t) ||
        w.slug.includes(t.replace(/\s+/g, "-")),
    );
  }, [q, wines]);

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="vine-hub-q" className="block text-sm font-medium text-stone-700">
          Søg i vin-kataloget
        </label>
        <p className="mt-1 text-xs text-stone-500">
          Søger kun på Vinbots sammenlægning — ikke på forsøgningen på forsiden.
        </p>
        <input
          id="vine-hub-q"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Fx drue, navn, producent…"
          className="mt-2 w-full max-w-xl rounded-xl border border-stone-300 bg-white px-4 py-3 text-stone-900 shadow-sm outline-none ring-rose-900/20 focus:border-rose-900 focus:ring-2"
        />
      </div>
      <p className="text-sm text-stone-600">
        Viser {filtered.length} af {wines.length} vine
        {q.trim() ? " (filtreret)" : ""}.
      </p>
      <ul className="divide-y divide-stone-200 rounded-2xl border border-stone-200 bg-white">
        {filtered.map((w) => (
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
      {filtered.length === 0 && <p className="text-sm text-stone-600">Ingen match — prøv færre ord.</p>}
    </div>
  );
}
