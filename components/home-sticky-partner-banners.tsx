"use client";

import { usePathname } from "next/navigation";

/**
 * Partner-Ads skyscraper-bannere — kun forsiden, fast i viewport ved scroll.
 * Monteres i root layout (direkte under body) så position: fixed altid er mod viewport.
 */
const PARTNER_ID = "50537";

const LEFT_BANNER_ID = "108308";
const RIGHT_BANNER_ID = "94900";

const linkRel = "nofollow sponsored noopener noreferrer";

const railStyle = { width: "min(11rem, calc((100vw - 72rem) / 2 - 1rem))" } as const;

function bannerPair(bannerId: string) {
  return {
    href: `https://www.partner-ads.com/dk/klikbanner.php?partnerid=${PARTNER_ID}&bannerid=${bannerId}`,
    src: `https://www.partner-ads.com/dk/visbanner.php?partnerid=${PARTNER_ID}&bannerid=${bannerId}`,
  };
}

export function HomeStickyPartnerBanners() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  const left = bannerPair(LEFT_BANNER_ID);
  const right = bannerPair(RIGHT_BANNER_ID);

  return (
    <>
      <div
        className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden 2xl:flex 2xl:items-center 2xl:justify-center 2xl:px-2"
        style={railStyle}
      >
        <div className="pointer-events-auto">
          <a
            href={left.href}
            target="_blank"
            rel={linkRel}
            className="block rounded-lg shadow-md ring-1 ring-stone-200/80 transition hover:opacity-95"
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
        <div className="pointer-events-auto">
          <a
            href={right.href}
            target="_blank"
            rel={linkRel}
            className="block rounded-lg shadow-md ring-1 ring-stone-200/80 transition hover:opacity-95"
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
