"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { GuideBrowseKind, GuideCardData } from "@/lib/guide-browse";
import { classifyGuideSlug, guideMatchesSearch, kindFilterLabel, topTagsForGuides } from "@/lib/guide-browse";

type Props = {
  guides: GuideCardData[];
  /** Vis Vin til / Druer / Baggrund — nyttigt når listen er blandet (mad-hub, /guides). */
  showKindTabs?: boolean;
  /** Vis populære tags som chips (min. antal forekomster i datasættet). */
  showTagChips?: boolean;
  tagMinCount?: number;
};

export function GuideHubBrowser({
  guides,
  showKindTabs = true,
  showTagChips = true,
  tagMinCount = 2,
}: Props) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<GuideBrowseKind | "alle">("alle");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tagOptions = useMemo(() => topTagsForGuides(guides, tagMinCount), [guides, tagMinCount]);

  const filtered = useMemo(() => {
    return guides.filter((g) => {
      if (kind !== "alle" && classifyGuideSlug(g.slug) !== kind) return false;
      if (activeTag && !(g.tags || []).some((t) => t.toLowerCase() === activeTag)) return false;
      return guideMatchesSearch(g, query);
    });
  }, [guides, kind, activeTag, query]);

  const counts = useMemo(() => {
    const c = { alle: guides.length, "vin-til": 0, druer: 0, baggrund: 0 } as Record<GuideBrowseKind | "alle", number>;
    for (const g of guides) {
      c[classifyGuideSlug(g.slug)]++;
    }
    return c;
  }, [guides]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0 flex-1">
          <label htmlFor="guide-hub-search" className="sr-only">
            Søg i guides
          </label>
          <input
            id="guide-hub-search"
            type="search"
            autoComplete="off"
            placeholder="Søg efter ret, land, drue, begreb…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-stone-200 bg-white px-4 py-3 text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>
        <p className="shrink-0 text-sm text-stone-600">
          Viser <span className="font-medium text-stone-800">{filtered.length}</span> af {guides.length}
        </p>
      </div>

      {showKindTabs ? (
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Kategori">
          {(["alle", "vin-til", "druer", "baggrund"] as const).map((k) => (
            <button
              key={k}
              type="button"
              role="tab"
              aria-selected={kind === k}
              onClick={() => setKind(k)}
              className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
                kind === k
                  ? "border-rose-800 bg-rose-900 text-white"
                  : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50"
              }`}
            >
              {kindFilterLabel(k)}
              <span className={`ml-1 tabular-nums ${kind === k ? "text-rose-200" : "text-stone-400"}`}>({counts[k]})</span>
            </button>
          ))}
        </div>
      ) : null}

      {showTagChips && tagOptions.length > 0 ? (
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-stone-500">Populære emner</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`rounded-full border px-2.5 py-1 text-xs font-medium transition ${
                activeTag === null
                  ? "border-stone-600 bg-stone-800 text-white"
                  : "border-stone-200 bg-stone-50 text-stone-600 hover:bg-stone-100"
              }`}
            >
              Alle emner
            </button>
            {tagOptions.map(({ tag, count }) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium capitalize transition ${
                  activeTag === tag
                    ? "border-rose-700 bg-rose-50 text-rose-950"
                    : "border-stone-200 bg-white text-stone-600 hover:border-stone-300"
                }`}
              >
                {tag}
                <span className="ml-0.5 text-stone-400">({count})</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-dashed border-stone-200 bg-stone-50 px-4 py-8 text-center text-stone-600">
          Ingen guides matcher filtrene. Prøv at fjerne et emne eller søg på noget andet.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {filtered.map((g) => (
            <li key={g.slug} className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-stone-300">
              <Link href={`/guides/${g.slug}`} className="text-base font-semibold text-rose-900 hover:underline">
                {g.title}
              </Link>
              <p className="mt-2 line-clamp-3 text-sm text-stone-600">{g.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-stone-500">
                <span className="rounded-md bg-stone-100 px-2 py-0.5 text-stone-700">{kindFilterLabel(classifyGuideSlug(g.slug))}</span>
                {g.updated ? <time dateTime={g.updated}>Opdateret {g.updated}</time> : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
