"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * Kompakt guidesøgning — sender til /guides?q=… (GuideHubBrowser).
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
    <form
      role="search"
      aria-label="Søg i Vinbots guides"
      onSubmit={submit}
      className={`flex max-w-xs items-center gap-2 ${className}`}
    >
      <label htmlFor="guide-catalog-q" className="sr-only">
        Søg i guides
      </label>
      <input
        id="guide-catalog-q"
        type="search"
        autoComplete="off"
        placeholder="Søg i guides…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        className="min-w-0 flex-1 rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm text-stone-900 placeholder:text-stone-400 focus:border-rose-900 focus:outline-none focus:ring-2 focus:ring-rose-200"
      />
      <button
        type="submit"
        className="shrink-0 rounded-lg border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-800 hover:border-stone-300 hover:bg-stone-50"
      >
        Søg
      </button>
    </form>
  );
}
