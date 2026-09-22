"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { CONTENT_MAX_REM } from "@/components/page-shell";
import { trackAffiliateClick } from "@/lib/affiliate-track";
import { PARTNER_ADS_PARTNER_ID, partnerAdsKlikUrl } from "@/lib/partner-ads-links";
import { usePartnerAdsHref } from "@/lib/use-partner-ads-href";

const LEFT_BANNER_ID = "108308";
const RIGHT_BANNER_ID = "94900";

const linkRel = "nofollow sponsored noopener noreferrer";

/** Bannerbredde + lidt luft — bruges til at lægge rails op ad indholdskanten. */
const BANNER_SLOT_REM = 10.75;
/**
 * Hvor meget bannerne skubbes ind mod indholdet (overlapper PageShell-padding).
 * Positiv = tættere på midten / mere «en del af layoutet».
 */
const INWARD_NUDGE_REM = 2.5;

/** px pr. scroll — hold lav for diskret effekt */
const PARALLAX_FACTOR = 0.068;
const PARALLAX_CAP = 42;

function bannerSrc(bannerId: string) {
  return `https://www.partner-ads.com/dk/visbanner.php?partnerid=${PARTNER_ADS_PARTNER_ID}&bannerid=${bannerId}`;
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

/**
 * Sticky skyscrapere i gutteren — placeret tæt på indholdskanten (skubbet indad)
 * i stedet for midt i den yderste margin.
 */
export function HomeStickyPartnerBanners() {
  const pathname = usePathname() || "/";
  const parallax = useHomeSkyscraperParallax(true);

  const leftHref = usePartnerAdsHref(partnerAdsKlikUrl(LEFT_BANNER_ID));
  const rightHref = usePartnerAdsHref(partnerAdsKlikUrl(RIGHT_BANNER_ID));
  const leftSrc = bannerSrc(LEFT_BANNER_ID);
  const rightSrc = bannerSrc(RIGHT_BANNER_ID);

  const leftStyle = {
    width: `${BANNER_SLOT_REM}rem`,
    left: `max(0.25rem, calc((100vw - ${CONTENT_MAX_REM}rem) / 2 - ${BANNER_SLOT_REM}rem + ${INWARD_NUDGE_REM}rem))`,
  } as const;

  const rightStyle = {
    width: `${BANNER_SLOT_REM}rem`,
    right: `max(0.25rem, calc((100vw - ${CONTENT_MAX_REM}rem) / 2 - ${BANNER_SLOT_REM}rem + ${INWARD_NUDGE_REM}rem))`,
  } as const;

  return (
    <>
      <div
        className="pointer-events-none fixed inset-y-0 z-30 hidden overflow-hidden min-[114rem]:flex min-[114rem]:items-center min-[114rem]:justify-end"
        style={leftStyle}
      >
        <div
          className="pointer-events-auto will-change-transform"
          style={{ transform: `translate3d(0, ${parallax.left}px, 0)` }}
        >
          <a
            href={leftHref}
            target="_blank"
            rel={linkRel}
            onClick={() =>
              trackAffiliateClick({
                merchant: "Partner-Ads",
                placement: "skyscraper-left",
                slug: pathname,
                url: leftHref,
              })
            }
            className="block rounded-lg shadow-md ring-1 ring-stone-200/80 transition-opacity hover:opacity-95"
            aria-label="Sponsoreret partnerbanner"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- Partner-Ads leverer banner dynamisk */}
            <img
              src={leftSrc}
              alt=""
              className="h-auto max-h-[min(85vh,38rem)] w-full max-w-[10.5rem] object-contain"
              width={160}
              height={600}
            />
          </a>
        </div>
      </div>
      <div
        className="pointer-events-none fixed inset-y-0 z-30 hidden overflow-hidden min-[114rem]:flex min-[114rem]:items-center min-[114rem]:justify-start"
        style={rightStyle}
      >
        <div
          className="pointer-events-auto will-change-transform"
          style={{ transform: `translate3d(0, ${parallax.right}px, 0)` }}
        >
          <a
            href={rightHref}
            target="_blank"
            rel={linkRel}
            onClick={() =>
              trackAffiliateClick({
                merchant: "Partner-Ads",
                placement: "skyscraper-right",
                slug: pathname,
                url: rightHref,
              })
            }
            className="block rounded-lg shadow-md ring-1 ring-stone-200/80 transition-opacity hover:opacity-95"
            aria-label="Sponsoreret partnerbanner"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={rightSrc}
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
