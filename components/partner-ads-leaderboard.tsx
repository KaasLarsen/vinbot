"use client";

import { useState } from "react";
import { trackAffiliateClick } from "@/lib/affiliate-track";
import { PARTNER_ADS_PARTNER_ID, partnerAdsKlikUrl } from "@/lib/partner-ads-links";

export const WINTHER_VIN_LEADERBOARD_BANNER_ID = "76692";
const JOHNSEN_LEADERBOARD_BANNER_ID = "114732";
const DH_WINES_LEADERBOARD_BANNER_ID = "108173";
const LAURIDSEN_VINE_LEADERBOARD_BANNER_ID = "116085";
export const DEN_SIDSTE_FLASKE_LEADERBOARD_BANNER_ID = "94856";

/** visbanner.php returnerer `ugyldig.gif` for mange feed-banner-id'er — vis tekst-fallback i stedet. */
const LEADERBOARD_VISBANNER_OK = new Set([
  WINTHER_VIN_LEADERBOARD_BANNER_ID,
  DEN_SIDSTE_FLASKE_LEADERBOARD_BANNER_ID,
]);

const linkRel = "nofollow sponsored noopener noreferrer";

type BannerChoice = { bannerId: string; merchant: string; copy: string };

const WINTHER: BannerChoice = {
  bannerId: WINTHER_VIN_LEADERBOARD_BANNER_ID,
  merchant: "Winther Vin",
  copy: "Winther Vin: bland fra hele webshoppen og få rabat — shop her",
};
const JOHNSEN: BannerChoice = {
  bannerId: JOHNSEN_LEADERBOARD_BANNER_ID,
  merchant: "Johnsen Wine",
  copy: "Johnsen Wine: kurateret sortiment til vin-interesserede — se her",
};
const DH: BannerChoice = {
  bannerId: DH_WINES_LEADERBOARD_BANNER_ID,
  merchant: "DH Wines",
  copy: "DH Wines: håndplukket sortiment til mad og hverdag — se udvalget",
};
const LAURIDSEN: BannerChoice = {
  bannerId: LAURIDSEN_VINE_LEADERBOARD_BANNER_ID,
  merchant: "Lauridsen Vine",
  copy: "Lauridsen Vine: stort europæisk sortiment — udforsk regionerne",
};
const DSF: BannerChoice = {
  bannerId: DEN_SIDSTE_FLASKE_LEADERBOARD_BANNER_ID,
  merchant: "Den Sidste Flaske",
  copy: "Den Sidste Flaske: online vinhandel — se udvalget",
};

/**
 * Hub → rotationsliste (Lauridsen indgår på alle relevante hubs undtagen ren DSF-katalog,
 * hvor DSF stadig dominerer men deles med Lauridsen).
 */
const HUB_ROTATIONS: Record<string, BannerChoice[]> = {
  "bedste-vine": [WINTHER, LAURIDSEN, JOHNSEN],
  "mad-og-vin": [DH, LAURIDSEN, WINTHER],
  "vin-viden": [JOHNSEN, LAURIDSEN, DH],
  regioner: [LAURIDSEN, DH, JOHNSEN],
  saeson: [WINTHER, LAURIDSEN, DH],
  "fest-og-vin": [WINTHER, LAURIDSEN, JOHNSEN],
  "humoer-og-vin": [WINTHER, LAURIDSEN],
  druesorter: [JOHNSEN, LAURIDSEN, WINTHER],
  "vine-katalog": [DSF, WINTHER],
};

/** Deterministisk indeks ud fra slug (samme guide → samme banner ved reload). */
function rotationIndex(slug: string, modulo: number): number {
  if (modulo <= 1) return 0;
  let h = 0;
  for (let i = 0; i < slug.length; i++) {
    h = (h + slug.charCodeAt(i) * (i + 1)) % 10007;
  }
  return h % modulo;
}

function pickBanner(hub: string | undefined, slug: string): BannerChoice {
  const key = hub && HUB_ROTATIONS[hub] ? hub : "bedste-vine";
  const pool = HUB_ROTATIONS[key] ?? HUB_ROTATIONS["bedste-vine"];
  const idx = rotationIndex(slug || "vinbot", pool.length);
  return pool[idx]!;
}

type PartnerAdsLeaderboardProps = {
  bannerId?: string;
  hub?: string;
  slug?: string;
  placement?: string;
  className?: string;
};

export function PartnerAdsLeaderboard({
  bannerId,
  hub,
  slug = "",
  placement,
  className = "",
}: PartnerAdsLeaderboardProps) {
  const [imgFailed, setImgFailed] = useState(false);

  const mapped = pickBanner(hub, slug);
  const finalBannerId = bannerId ?? mapped.bannerId;
  const merchant = mapped.merchant;
  const copy = mapped.copy;
  const placementLabel = placement ?? `partner-leaderboard-${hub || "default"}`;

  const href = partnerAdsKlikUrl(finalBannerId);
  const src = `https://www.partner-ads.com/dk/visbanner.php?partnerid=${PARTNER_ADS_PARTNER_ID}&bannerid=${finalBannerId}`;
  const showBannerImage = LEADERBOARD_VISBANNER_OK.has(finalBannerId) && !imgFailed;

  return (
    <aside className={className} aria-label="Sponsoreret reklame">
      <div className="flex justify-center">
        <a
          href={href}
          target="_blank"
          rel={linkRel}
          onClick={() =>
            trackAffiliateClick({ merchant, placement: placementLabel, slug, hub, url: href })
          }
          className="inline-block max-w-full rounded-xl shadow-sm ring-1 ring-stone-200/90 transition hover:opacity-95"
        >
          {showBannerImage ? (
            // eslint-disable-next-line @next/next/no-img-element -- Partner-Ads banner (ofte blokeret af adblock → fallback nedenfor)
            <img
              src={src}
              alt=""
              className="h-auto w-full max-w-4xl object-contain"
              width={728}
              height={90}
              onError={() => setImgFailed(true)}
              onLoad={(e) => {
                const img = e.currentTarget;
                if (img.naturalWidth < 120 || img.naturalHeight < 40) setImgFailed(true);
              }}
            />
          ) : (
            <span className="flex min-h-[4.5rem] max-w-4xl items-center justify-center bg-rose-950 px-6 py-4 text-center text-sm font-semibold text-white sm:text-base">
              {copy}
            </span>
          )}
        </a>
      </div>
    </aside>
  );
}
