"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

import { trackAffiliateClick } from "@/lib/affiliate-track";
import type { OlVinFacebookPost } from "@/lib/social/ol-vin-posts";
import { facebookOlVinUrl } from "@/lib/site";

const AVATAR_SRC = "/images/ol-vin/ol-vin-avatar.png";
const IMAGE_FRAME = "mx-auto mt-2 flex size-32 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-stone-100 sm:size-36";

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

function FacebookPostCard({ post }: { post: OlVinFacebookPost }) {
  const onOrderClick = () =>
    trackAffiliateClick({
      merchant: post.merchant ?? "Øl & Vin",
      placement: "tilbud-ol-vin-facebook",
      slug: post.id,
      url: post.orderHref,
    });

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm transition hover:border-stone-300 hover:shadow-md">
      <div className="relative">
        <span className="absolute left-3 top-3 z-10 inline-flex items-center gap-1 rounded-full bg-[#1877F2] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
          <FacebookIcon className="size-2.5" />
          Opslag
        </span>
        <a
          href={post.orderHref}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          onClick={onOrderClick}
          className={`${IMAGE_FRAME}${post.imageFit === "cover" ? " relative" : ""}`}
        >
          {post.imageFit === "cover" ? (
            <Image src={post.image} alt="" fill className="object-cover" sizes="144px" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={post.image} alt="" className="max-h-full max-w-full object-contain p-2" loading="lazy" />
          )}
        </a>
      </div>
      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <p className="text-xs font-medium uppercase tracking-wide text-rose-800/90">Øl &amp; Vin</p>
        <p className="text-xs text-stone-500">{formatDaDate(post.date)}</p>
        <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-stone-900">
          <a
            href={post.orderHref}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            onClick={onOrderClick}
            className="hover:underline"
          >
            {post.title}
          </a>
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-stone-600">{post.excerpt}</p>
        <div className="mt-auto flex flex-col gap-2 pt-1 sm:flex-row">
          <a
            href={post.orderHref}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            onClick={onOrderClick}
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-rose-900 px-3 py-2 text-xs font-medium text-white hover:bg-rose-950"
          >
            {post.ctaLabel ?? "Bestil her"}
          </a>
          <a
            href={facebookOlVinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-800 hover:border-stone-300 hover:bg-stone-50"
          >
            Se på Facebook
          </a>
        </div>
      </div>
    </article>
  );
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
    <section className="relative mt-12" aria-labelledby="ol-vin-facebook-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h2 id="ol-vin-facebook-heading" className="text-xl font-semibold tracking-tight text-stone-900 sm:text-2xl">
            Følg os på Facebook via Øl &amp; Vin
          </h2>
          <p className="mt-1 max-w-2xl text-sm leading-relaxed text-stone-600">
            Få vin-tilbud og tips direkte i dit Facebook-feed
            {withImages.length > 0 ? " — her er udvalgte opslag fra siden." : "."}
          </p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-3">
          <a
            href={facebookOlVinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-stone-500 transition hover:text-[#1877F2]"
          >
            <FacebookIcon className="size-3.5 opacity-70" />
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
            <div key={post.id} className="w-[min(100%,17.5rem)] shrink-0 snap-start sm:w-[17.5rem]">
              <FacebookPostCard post={post} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
