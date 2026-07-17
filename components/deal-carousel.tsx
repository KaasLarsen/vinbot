"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { DealCard } from "@/components/deal-card";
import type { TilbudCardItem } from "@/lib/deals/types";

type DealCarouselProps = {
  id: string;
  title: string;
  description?: string;
  deals: TilbudCardItem[];
  placement?: string;
  /** Kort i karusellen (standard) vs. kompakt. */
  cardVariant?: "compact" | "default";
};

export function DealCarousel({
  id,
  title,
  description,
  deals,
  placement = "tilbud-carousel",
  cardVariant = "compact",
}: DealCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 8);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 8);
  }, []);

  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const step = Math.max(el.clientWidth * 0.85, 280);
    el.scrollBy({ left: dir * step, behavior: "smooth" });
    window.setTimeout(updateArrows, 320);
  };

  useEffect(() => {
    updateArrows();
  }, [deals, updateArrows]);

  if (deals.length === 0) return null;

  return (
    <section className="relative" aria-labelledby={id}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 id={id} className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
            {title}
          </h2>
          {description ? <p className="mt-1 max-w-2xl text-sm leading-relaxed text-stone-600">{description}</p> : null}
        </div>
        <div className="flex shrink-0 gap-1.5">
          <button
            type="button"
            onClick={() => scroll(-1)}
            disabled={!canPrev}
            aria-label="Scroll tilbage"
            className="inline-flex size-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:border-stone-300 hover:bg-stone-50 disabled:pointer-events-none disabled:opacity-35"
          >
            <svg aria-hidden className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            disabled={!canNext}
            aria-label="Scroll frem"
            className="inline-flex size-9 items-center justify-center rounded-full border border-stone-200 bg-white text-stone-700 shadow-sm transition hover:border-stone-300 hover:bg-stone-50 disabled:pointer-events-none disabled:opacity-35"
          >
            <svg aria-hidden className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={updateArrows}
        className="mt-5 flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
      >
        {deals.map((deal) => (
          <div
            key={deal.id}
            className={`w-[min(100%,17.5rem)] shrink-0 snap-start sm:w-[17.5rem] ${cardVariant === "compact" ? "" : "sm:w-[19rem]"}`}
          >
            <DealCard deal={deal} placement={placement} variant={cardVariant} />
          </div>
        ))}
      </div>
    </section>
  );
}
