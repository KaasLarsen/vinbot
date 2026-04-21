"use client";

import { useState } from "react";
import { trackAffiliateClick } from "@/lib/affiliate-track";

/** Horisontalt Partner-Ads banner — kan vælge banner pr. hub for bedre relevans. */
const PARTNER_ID = "50537";

export const WINTHER_VIN_LEADERBOARD_BANNER_ID = "76692";
/** Johnsen Wine leaderboard. */
const JOHNSEN_LEADERBOARD_BANNER_ID = "114732";
/** DH Wines / Den Sidste Flaske-lignende leaderboard — fallback shop-klik. */
const DH_WINES_LEADERBOARD_BANNER_ID = "108173";
/** Lauridsen Vine leaderboard (regionsfokus — stort sortiment fra Europa). */
const LAURIDSEN_VINE_LEADERBOARD_BANNER_ID = "116085";

const linkRel = "nofollow sponsored noopener noreferrer";

/** Map fra guide-hub → banner-id + merchant-label (til GA4). */
const HUB_BANNER_MAP: Record<string, { bannerId: string; merchant: string; copy: string }> = {
  "bedste-vine": {
    bannerId: WINTHER_VIN_LEADERBOARD_BANNER_ID,
    merchant: "Winther Vin",
    copy: "Winther Vin: bland fra hele webshoppen og få rabat — shop her (affiliate)",
  },
  "mad-og-vin": {
    bannerId: DH_WINES_LEADERBOARD_BANNER_ID,
    merchant: "DH Wines",
    copy: "DH Wines: håndplukket sortiment til mad og hverdag — se udvalget (affiliate)",
  },
  "vin-viden": {
    bannerId: JOHNSEN_LEADERBOARD_BANNER_ID,
    merchant: "Johnsen Wine",
    copy: "Johnsen Wine: kurateret sortiment til vin-interesserede — se her (affiliate)",
  },
  regioner: {
    bannerId: LAURIDSEN_VINE_LEADERBOARD_BANNER_ID,
    merchant: "Lauridsen Vine",
    copy: "Lauridsen Vine: stort europæisk sortiment — udforsk regionerne (affiliate)",
  },
  saeson: {
    bannerId: WINTHER_VIN_LEADERBOARD_BANNER_ID,
    merchant: "Winther Vin",
    copy: "Winther Vin: bland selv til fest og sæson — få rabat (affiliate)",
  },
  "humoer-og-vin": {
    bannerId: WINTHER_VIN_LEADERBOARD_BANNER_ID,
    merchant: "Winther Vin",
    copy: "Winther Vin: bland selv og få rabat — shop her (affiliate)",
  },
  druesorter: {
    bannerId: JOHNSEN_LEADERBOARD_BANNER_ID,
    merchant: "Johnsen Wine",
    copy: "Johnsen Wine: prøv druen hos en kurateret forhandler (affiliate)",
  },
};

type PartnerAdsLeaderboardProps = {
  /** Overstyr banner-id (bruges sjældent — hub er sædvanligvis nok). */
  bannerId?: string;
  /** Guide-hub fx "bedste-vine", "mad-og-vin" — vælger banner automatisk. */
  hub?: string;
  /** Slug til tracking. */
  slug?: string;
  /** Placering-label til GA4 event. */
  placement?: string;
  className?: string;
};

export function PartnerAdsLeaderboard({
  bannerId,
  hub,
  slug,
  placement = "partner-leaderboard",
  className = "",
}: PartnerAdsLeaderboardProps) {
  const [imgFailed, setImgFailed] = useState(false);

  const mapped = (hub && HUB_BANNER_MAP[hub]) || HUB_BANNER_MAP["bedste-vine"];
  const finalBannerId = bannerId ?? mapped.bannerId;
  const merchant = mapped.merchant;
  const copy = mapped.copy;

  const href = `https://www.partner-ads.com/dk/klikbanner.php?partnerid=${PARTNER_ID}&bannerid=${finalBannerId}`;
  const src = `https://www.partner-ads.com/dk/visbanner.php?partnerid=${PARTNER_ID}&bannerid=${finalBannerId}`;

  return (
    <aside className={className} aria-label="Sponsoreret reklame">
      <div className="flex justify-center">
        <a
          href={href}
          target="_blank"
          rel={linkRel}
          onClick={() =>
            trackAffiliateClick({ merchant, placement, slug, hub, url: href })
          }
          className="inline-block max-w-full rounded-xl shadow-sm ring-1 ring-stone-200/90 transition hover:opacity-95"
        >
          {!imgFailed ? (
            // eslint-disable-next-line @next/next/no-img-element -- Partner-Ads banner (ofte blokeret af adblock → fallback nedenfor)
            <img
              src={src}
              alt=""
              className="h-auto w-full max-w-4xl object-contain"
              width={728}
              height={90}
              onError={() => setImgFailed(true)}
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
