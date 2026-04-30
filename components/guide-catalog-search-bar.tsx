"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Sender brugeren til /guides?q=… hvor GuideHubBrowser filtrerer — adskilt fra forsidenavnets vin-feed-søgning.
 */
export function GuideCatalogSearchBar({ className = "" }: { className?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const v = q.trim();
    router.push(v ? `/guides?q=${encodeURIComponent(v)}` : "/guides");
  }

  return (
    <div className={`rounded-2xl border border-stone-200 bg-stone-50/90 px-4 py-4 shadow-sm ring-1 ring-stone-100 ${className}`}>
      <form
        role="search"
        aria-label="Søg i Vinbots guides"
        onSubmit={submit}
        className="flex flex-col gap-3 sm:flex-row sm:items-end"
      >
        <div className="min-w-0 flex-1">
          <label htmlFor="guide-catalog-q" className="block text-sm font-medium text-stone-700">
            Søg i guides
          </label>
          <p className="mt-0.5 text-xs text-stone-600">
            Artikler om mad og vin, druer og begreber — ikke flasker fra butikker (det er forsiden).
          </p>
          <input
            id="guide-catalog-q"
            type="search"
            autoComplete="off"
            placeholder="Fx lam, champagne, tanniner, Alsace…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="mt-2 w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 shadow-sm placeholder:text-stone-400 focus:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-200"
          />
        </div>
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-stone-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-stone-900 sm:mb-0.5"
        >
          Søg guides
        </button>
      </form>
      <p className="mt-3 text-xs text-stone-500">
        Vil du finde flasker hos forhandlere? Brug{" "}
        <Link href="/" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950">
          forsiden
        </Link>
        .
      </p>
    </div>
  );
}
