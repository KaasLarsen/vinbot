/**
 * Partner-Ads skyscraper-bannere — kun forsiden, faste sider på store viewport.
 * Tracking: klik via klikbanner.php, billede via visbanner.php.
 */
const PARTNER_ID = "50537";

const LEFT_BANNER_ID = "108308";
const RIGHT_BANNER_ID = "94900";

const linkRel = "nofollow sponsored noopener noreferrer";

function bannerPair(bannerId: string) {
  return {
    href: `https://www.partner-ads.com/dk/klikbanner.php?partnerid=${PARTNER_ID}&bannerid=${bannerId}`,
    src: `https://www.partner-ads.com/dk/visbanner.php?partnerid=${PARTNER_ID}&bannerid=${bannerId}`,
  };
}

export function HomeStickyPartnerBanners() {
  const left = bannerPair(LEFT_BANNER_ID);
  const right = bannerPair(RIGHT_BANNER_ID);

  return (
    <>
      <div className="pointer-events-none fixed left-0 top-1/2 z-30 hidden -translate-y-1/2 2xl:block 2xl:w-[min(11rem,calc((100vw-72rem)/2-1rem)))]">
        <div className="pointer-events-auto px-2">
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
      <div className="pointer-events-none fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 2xl:block 2xl:w-[min(11rem,calc((100vw-72rem)/2-1rem)))]">
        <div className="pointer-events-auto px-2">
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
