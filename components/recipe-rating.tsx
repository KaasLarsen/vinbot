"use client";

import { useEffect, useRef, useState } from "react";

import { formatRatingLabel, type RecipeRatingKind, type RecipeRatingSummary } from "@/lib/recipe-ratings/format";

type Props = {
  kind: RecipeRatingKind;
  slug: string;
  initialAverage: number | null;
  initialCount: number;
};

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className={`h-6 w-6 ${filled ? "fill-amber-400" : "fill-stone-300"}`}>
      <path d="M10 1.6 12.4 6.5l5.4.8-3.9 3.8.9 5.4L10 14.1l-4.8 2.4.9-5.4L2.2 7.3l5.4-.8L10 1.6z" />
    </svg>
  );
}

export function RecipeRating({ kind, slug, initialAverage, initialCount }: Props) {
  const [summary, setSummary] = useState<RecipeRatingSummary>({
    average: initialAverage,
    count: initialCount,
  });
  const [mine, setMine] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const voted = useRef(false);

  const shown = hover ?? mine ?? 0;
  const label = formatRatingLabel(summary);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/recipe-ratings?kind=${kind}&slug=${encodeURIComponent(slug)}`)
      .then(async (res) => {
        if (!res.ok) return null;
        return (await res.json()) as { average: number | null; count: number; myRating: number | null };
      })
      .then((data) => {
        if (cancelled || !data || voted.current) return;
        setSummary({ average: data.average, count: data.count });
        setMine(data.myRating);
      })
      .catch(() => {
        /* Behold det server-renderede tal. */
      });
    return () => {
      cancelled = true;
    };
  }, [kind, slug]);

  async function choose(rating: number) {
    if (pending) return;
    const previousMine = mine;
    const previousSummary = summary;
    voted.current = true;
    setPending(true);
    setError(null);
    setMine(rating);
    try {
      const res = await fetch("/api/recipe-ratings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind, slug, rating }),
      });
      const data = (await res.json()) as {
        average?: number | null;
        count?: number;
        myRating?: number | null;
        error?: string;
      };
      if (!res.ok || data.count == null) {
        setMine(previousMine);
        setSummary(previousSummary);
        voted.current = previousMine != null;
        setError(data.error || "Kunne ikke gemme din stemme. Prøv igen.");
        return;
      }
      setSummary({ average: data.average ?? null, count: data.count });
      setMine(data.myRating ?? rating);
    } catch {
      setMine(previousMine);
      setSummary(previousSummary);
      voted.current = previousMine != null;
      setError("Kunne ikke gemme din stemme. Prøv igen.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mt-4">
      <div
        className="flex flex-wrap items-center gap-3"
        onMouseLeave={() => setHover(null)}
      >
        <div
          role="radiogroup"
          aria-label="Giv opskriften stjerner"
          className="flex items-center"
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={mine === value}
              aria-label={`${value} ${value === 1 ? "stjerne" : "stjerner"}`}
              disabled={pending}
              className="cursor-pointer rounded-sm p-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700 disabled:cursor-default disabled:opacity-60"
              onMouseEnter={() => setHover(value)}
              onFocus={() => setHover(value)}
              onBlur={() => setHover(null)}
              onClick={() => choose(value)}
            >
              <StarIcon filled={value <= shown} />
            </button>
          ))}
        </div>
        <p className="text-sm text-stone-600">{label}</p>
      </div>
      {error ? <p className="mt-1 text-sm text-rose-800">{error}</p> : null}
    </div>
  );
}
