/** Horisontalt Partner-Ads banner (fx Winther Vin — mix for rabat). */
const PARTNER_ID = "50537";

export const WINTHER_VIN_LEADERBOARD_BANNER_ID = "76692";

const linkRel = "nofollow sponsored noopener noreferrer";

type PartnerAdsLeaderboardProps = {
  /** Standard: Winther Vin leaderboard */
  bannerId?: string;
  className?: string;
};

export function PartnerAdsLeaderboard({
  bannerId = WINTHER_VIN_LEADERBOARD_BANNER_ID,
  className = "",
}: PartnerAdsLeaderboardProps) {
  const href = `https://www.partner-ads.com/dk/klikbanner.php?partnerid=${PARTNER_ID}&bannerid=${bannerId}`;
  const src = `https://www.partner-ads.com/dk/visbanner.php?partnerid=${PARTNER_ID}&bannerid=${bannerId}`;

  return (
    <aside className={className} aria-label="Sponsoreret reklame">
      <div className="flex justify-center">
        <a
          href={href}
          target="_blank"
          rel={linkRel}
          className="inline-block max-w-full rounded-xl shadow-sm ring-1 ring-stone-200/90 transition hover:opacity-95"
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- Partner-Ads banner */}
          <img
            src={src}
            alt=""
            className="h-auto w-full max-w-4xl object-contain"
            width={728}
            height={90}
          />
        </a>
      </div>
    </aside>
  );
}
