"use client";

import { useEffect, useState } from "react";

/** Vis knappen når brugeren er inden for denne afstand fra dokumentets/footerens bund. */
const BOTTOM_THRESHOLD_PX = 280;

function isNearBottom(): boolean {
  const doc = document.documentElement;
  if (doc.scrollHeight <= window.innerHeight + BOTTOM_THRESHOLD_PX) return false;

  const footer = document.querySelector("footer");
  if (footer) {
    const rect = footer.getBoundingClientRect();
    // Footer er i viewport, og vi er tæt på dens bund (altså sidens slutning)
    const footerInView = rect.top < window.innerHeight && rect.bottom > 0;
    const nearFooterEnd = rect.bottom <= window.innerHeight + BOTTOM_THRESHOLD_PX;
    if (footerInView && nearFooterEnd) return true;
  }

  const remaining = doc.scrollHeight - (window.scrollY + window.innerHeight);
  return remaining <= BOTTOM_THRESHOLD_PX;
}

function cookieBannerOffsetPx(): number {
  const padding = Number.parseFloat(getComputedStyle(document.body).paddingBottom) || 0;
  return padding + 20;
}

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [bottomPx, setBottomPx] = useState(20);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      setVisible(isNearBottom());
      setBottomPx(cookieBannerOffsetPx());
    };
    const onScrollOrResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize, { passive: true });

    const ro = new ResizeObserver(onScrollOrResize);
    ro.observe(document.body);
    const footer = document.querySelector("footer");
    if (footer) ro.observe(footer);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      ro.disconnect();
    };
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollUp}
      aria-label="Scroll til toppen"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      style={{ bottom: bottomPx }}
      className={`fixed right-5 z-[110] flex h-11 w-11 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-800 shadow-md transition-[opacity,transform,box-shadow,bottom] duration-200 hover:border-rose-300 hover:text-rose-900 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-800 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
