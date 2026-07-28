"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import type { OlVinFacebookPost } from "@/lib/social/ol-vin-posts";
import { facebookOlVinUrl } from "@/lib/site";

const AVATAR_SRC = "/images/ol-vin/ol-vin-avatar.png";

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden fill="currentColor">
      <path d="M22 12.07C22 6.48 17.52 2 11.93 2S1.86 6.48 1.86 12.07c0 5.02 3.66 9.18 8.44 9.93v-7.03H7.9v-2.9h2.4V9.84c0-2.37 1.4-3.69 3.56-3.69 1.03 0 2.12.19 2.12.19v2.33h-1.2c-1.18 0-1.55.74-1.55 1.49v1.79h2.64l-.42 2.9h-2.22V22c4.78-.75 8.44-4.91 8.44-9.93z" />
    </svg>
  );
}

function formatDaDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("da-DK", { day: "numeric", month: "long", year: "numeric" });
}

export function OlVinFacebookCarousel({ posts }: { posts: OlVinFacebookPost[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const withImages = posts.filter((p) => Boolean(p.image));

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
  }, [withImages, updateArrows]);

  return (
    <section className="mt-12" aria-labelledby="ol-vin-facebook-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-2 text-sm font-medium text-[#1877F2]">
            <FacebookIcon className="size-4" />
            Øl &amp; Vin
          </p>
          <h2
            id="ol-vin-facebook-heading"
            className="mt-1 text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl"
          >
            Følg os på Facebook via Øl &amp; Vin
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-stone-600">
            Få vin-tilbud og tips direkte i dit Facebook-feed
            {withImages.length > 0 ? " — her er udvalgte opslag fra siden." : "."}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <a
            href={facebookOlVinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#166fe5]"
          >
            <FacebookIcon className="size-4" />
            Følg siden
          </a>
          {withImages.length > 1 ? (
            <div className="flex gap-1.5">
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
          ) : null}
        </div>
      </div>

      {withImages.length === 0 ? (
        <a
          href={facebookOlVinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 flex flex-col items-start gap-4 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-[#1877F2]/35 hover:shadow-md sm:flex-row sm:items-center sm:p-6"
        >
          <span className="relative size-14 shrink-0 overflow-hidden rounded-full border border-stone-200 bg-stone-100">
            <Image src={AVATAR_SRC} alt="" fill className="object-cover" sizes="56px" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-lg font-semibold text-stone-900">Se de seneste opslag på Øl &amp; Vin</span>
            <span className="mt-1 block text-sm leading-relaxed text-stone-600">
              Åbn Facebook-siden for tilbud, tips og udvalgte flasker — direkte i dit feed, når du følger med.
            </span>
          </span>
          <span className="inline-flex items-center gap-2 rounded-xl bg-[#1877F2] px-4 py-2.5 text-sm font-semibold text-white">
            Åbn Facebook
            <span aria-hidden>→</span>
          </span>
        </a>
      ) : (
        <div
          ref={trackRef}
          onScroll={updateArrows}
          className="mt-5 flex gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
        >
          {withImages.map((post) => (
            <article
              key={post.id}
              className="flex w-[min(100%,20rem)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm sm:w-[20rem]"
            >
              <div className="flex items-center gap-3 px-4 pt-4">
                <span className="relative size-10 shrink-0 overflow-hidden rounded-full border border-stone-200 bg-stone-100">
                  <Image src={AVATAR_SRC} alt="" fill className="object-cover" sizes="40px" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-stone-900">Øl &amp; Vin</p>
                  <p className="text-xs text-stone-500">{formatDaDate(post.date)} · Facebook</p>
                </div>
              </div>
              <div className="px-4 pt-3">
                <h3 className="text-[15px] font-semibold leading-snug text-stone-900">{post.title}</h3>
                <p className="mt-1.5 line-clamp-3 text-sm leading-relaxed text-stone-600">{post.excerpt}</p>
              </div>
              <a
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                className="relative mt-3 aspect-[4/5] bg-stone-100"
              >
                <Image src={post.image} alt="" fill className="object-cover" sizes="320px" />
              </a>
              <div className="flex items-center justify-between gap-3 border-t border-stone-100 px-4 py-3">
                <a
                  href={facebookOlVinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[#1877F2] hover:underline"
                >
                  Se på Facebook
                </a>
                <a
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-rose-900 px-3 py-1.5 text-sm font-semibold text-white hover:bg-rose-950"
                >
                  Bestil her
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
