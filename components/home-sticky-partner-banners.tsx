"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { trackAffiliateClick } from "@/lib/affiliate-track";

/**
 * Partner-Ads skyscraper-bannere — kun forsiden, fixed i viewport.
 * Let scroll-parallakse: venstre/højre rykker modsat, så de følger scroll uden at føles “limet”.
 */
const PARTNER_ID = "50537";

const LEFT_BANNER_ID = "108308";
const RIGHT_BANNER_ID = "94900";

const linkRel = "nofollow sponsored noopener noreferrer";

const railStyle = { width: "min(11rem, calc((100vw - 72rem) / 2 - 1rem))" } as const;

/** px pr. scroll — hold lav for diskret effekt */
const PARALLAX_FACTOR = 0.068;
const PARALLAX_CAP = 42;

function bannerPair(bannerId: string) {
  return {
    href: `https://www.partner-ads.com/dk/klikbanner.php?partnerid=${PARTNER_ID}&bannerid=${bannerId}`,
    src: `https://www.partner-ads.com/dk/visbanner.php?partnerid=${PARTNER_ID}&bannerid=${bannerId}`,
  };
}

function useHomeSkyscraperParallax(enabled: boolean) {
  const [y, setY] = useState({ left: 0, right: 0 });

  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const tick = () => {
      const raw = window.scrollY * PARALLAX_FACTOR;
      const clamped = Math.max(-PARALLAX_CAP, Math.min(PARALLAX_CAP, raw));
      setY({ left: -clamped, right: clamped });
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(tick);
    };
    tick();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [enabled]);

  return y;
}

export function HomeStickyPartnerBanners() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const parallax = useHomeSkyscraperParallax(onHome);

  if (!onHome) return null;

  const left = bannerPair(LEFT_BANNER_ID);
  const right = bannerPair(RIGHT_BANNER_ID);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden 2xl:flex 2xl:items-center 2xl:justify-center 2xl:px-2"
        style={railStyle}
      >
        <div
          className="pointer-events-auto will-change-transform"
          style={{ transform: `translate3d(0, ${parallax.left}px, 0)` }}
        >
          <a
            href={left.href}
            target="_blank"
            rel={linkRel}
            onClick={() =>
              trackAffiliateClick({
                merchant: "Partner-Ads",
                placement: "home-skyscraper-left",
                url: left.href,
              })
            }
            className="block rounded-lg shadow-md ring-1 ring-stone-200/80 transition-opacity hover:opacity-95"
            aria-label="Sponsoreret partnerbanner"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- Partner-Ads leverer banner dynamisk */}
            <img
              src={left.src}
              alt=""
              className="h-auto max-h-[min(85vh,38rem)] w-full max-w-[10.5rem] object-contain"
              width={160}
              height={600}
            />
          </a>
        </div>
      </div>
      <div
        className="pointer-events-none fixed inset-y-0 right-0 z-30 hidden 2xl:flex 2xl:items-center 2xl:justify-center 2xl:px-2"
        style={railStyle}
      >
        <div
          className="pointer-events-auto will-change-transform"
          style={{ transform: `translate3d(0, ${parallax.right}px, 0)` }}
        >
          <a
            href={right.href}
            target="_blank"
            rel={linkRel}
            onClick={() =>
              trackAffiliateClick({
                merchant: "Partner-Ads",
                placement: "home-skyscraper-right",
                url: right.href,
              })
            }
            className="block rounded-lg shadow-md ring-1 ring-stone-200/80 transition-opacity hover:opacity-95"
            aria-label="Sponsoreret partnerbanner"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={right.src}
              alt=""
              className="h-auto max-h-[min(85vh,38rem)] w-full max-w-[10.5rem] object-contain"
              width={160}
              height={600}
            />
          </a>
        </div>
      </div>
    </>
  );
}
