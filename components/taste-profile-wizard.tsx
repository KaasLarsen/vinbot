"use client";

import { useCallback, useEffect, useState } from "react";
import { proxyImg } from "@/lib/search/helpers";
import { MIN_LIKES_FOR_PROFILE } from "@/lib/taste/storage";
import { useTasteProfile } from "@/lib/taste/use-taste-profile";
import type { TasteCandidate, TasteRatedWine } from "@/lib/taste/types";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function TasteProfileWizard({ open, onClose }: Props) {
  const { profile, save, clear } = useTasteProfile();
  const [candidates, setCandidates] = useState<TasteCandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState<Record<string, boolean>>({});
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!open) return;
    setDone(false);
    setError(null);
    const initial: Record<string, boolean> = {};
    for (const r of profile?.ratings ?? []) {
      initial[r.slug] = r.liked;
    }
    setRatings(initial);

    let cancelled = false;
    setLoading(true);
    void (async () => {
      try {
        const res = await fetch("/api/taste/candidates");
        const json = (await res.json()) as { candidates: TasteCandidate[] };
        if (!cancelled) setCandidates(json.candidates || []);
      } catch {
        if (!cancelled) setError("Kunne ikke hente vine. Prøv igen.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [open, profile]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const likes = Object.values(ratings).filter(Boolean).length;

  const rate = useCallback((slug: string, liked: boolean) => {
    setRatings((prev) => {
      const next = { ...prev };
      if (prev[slug] === liked) delete next[slug];
      else next[slug] = liked;
      return next;
    });
  }, []);

  const finish = useCallback(() => {
    if (likes < MIN_LIKES_FOR_PROFILE) {
      setError(`Vælg mindst ${MIN_LIKES_FOR_PROFILE} vine, du godt kan lide.`);
      return;
    }
    const rated: TasteRatedWine[] = candidates
      .filter((c) => ratings[c.slug] !== undefined)
      .map((c) => ({
        slug: c.slug,
        title: c.title,
        brand: c.brand,
        image: c.image,
        liked: ratings[c.slug],
      }));
    save(rated);
    setDone(true);
  }, [candidates, likes, ratings, save]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-stone-950/60 p-0 sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="taste-wizard-title"
    >
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-2xl border border-stone-200 bg-white shadow-xl sm:rounded-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-stone-100 bg-white px-4 py-3 sm:px-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/90">Smagsprofil</p>
            <h2 id="taste-wizard-title" className="mt-0.5 text-lg font-semibold text-stone-900">
              {done ? "Din profil er klar" : "Hvad kan du lide? (30 sek)"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-stone-200 px-3 py-1.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
          >
            Luk
          </button>
        </div>

        <div className="px-4 py-4 sm:px-5">
          {done ? (
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-stone-700">
                Forsidens tilbud tilpasser sig nu dine favoritter — gemt på denne enhed.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-xl bg-rose-900 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-800"
              >
                Se personaliserede tilbud
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm leading-relaxed text-stone-600">
                Tryk <strong>Elsker</strong> på mindst {MIN_LIKES_FOR_PROFILE} vine. Vi tilpasser tilbud og anbefalinger
                — kun i din browser.
              </p>
              <p className="mt-2 text-xs text-stone-500">
                Valgt: {likes}/{MIN_LIKES_FOR_PROFILE}+
              </p>

              {loading ? (
                <p className="mt-6 text-center text-sm text-stone-500">Henter vine…</p>
              ) : (
                <ul className="mt-4 grid gap-3">
                  {candidates.map((c) => {
                    const choice = ratings[c.slug];
                    return (
                      <li
                        key={c.slug}
                        className="flex gap-3 rounded-xl border border-stone-200 bg-stone-50/80 p-3"
                      >
                        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white">
                          {c.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={c.image.startsWith("/api/") || c.image.startsWith("http") ? c.image : proxyImg(c.image)}
                              alt=""
                              className="max-h-full max-w-full object-contain p-1"
                            />
                          ) : (
                            <span className="text-[10px] text-stone-400">Ingen</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-1.5">
                            {c.styleHint ? (
                              <span className="rounded-md bg-stone-200/80 px-1.5 py-0.5 text-[10px] font-medium text-stone-700">
                                {c.styleHint}
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-0.5 line-clamp-2 text-sm font-semibold leading-snug text-stone-900">
                            {c.title}
                          </p>
                          {c.brand ? <p className="truncate text-xs text-stone-500">{c.brand}</p> : null}
                          <div className="mt-2 flex gap-2">
                            <button
                              type="button"
                              onClick={() => rate(c.slug, true)}
                              className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${
                                choice === true
                                  ? "bg-rose-900 text-white"
                                  : "border border-stone-300 bg-white text-stone-800 hover:border-rose-300"
                              }`}
                            >
                              Elsker
                            </button>
                            <button
                              type="button"
                              onClick={() => rate(c.slug, false)}
                              className={`rounded-lg px-2.5 py-1 text-xs font-medium ${
                                choice === false
                                  ? "bg-stone-800 text-white"
                                  : "border border-stone-300 bg-white text-stone-600 hover:border-stone-400"
                              }`}
                            >
                              Nej tak
                            </button>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}

              {error ? <p className="mt-3 text-sm text-rose-800">{error}</p> : null}

              <div className="mt-5 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={finish}
                  disabled={likes < MIN_LIKES_FOR_PROFILE || loading}
                  className="w-full rounded-xl bg-rose-900 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Gem smagsprofil
                </button>
                {profile ? (
                  <button
                    type="button"
                    onClick={() => {
                      clear();
                      setRatings({});
                      setError(null);
                    }}
                    className="text-center text-xs text-stone-500 underline hover:text-stone-700"
                  >
                    Slet profil
                  </button>
                ) : null}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
