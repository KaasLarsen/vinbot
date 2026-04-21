import Link from "next/link";
import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl, RAREWINE_MEMBERS_CLUB_LANDING } from "@/lib/partner-ads-links";
import { siteName } from "@/lib/site";

const FACEBOOK_OL_VIN = "https://www.facebook.com/profile.php?id=61554449533252";

/** Partner-Ads tekstlink — Beer Me ølabonnement (intet visbanner i programmet). */
const PARTNER_ADS_BEER_ME_SUBSCRIPTION = partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.beerMe);

const PARTNER_ADS_RAREWINE_MEMBERS = partnerAdsKlikUrl(
  PARTNER_ADS_KLIK_BANNERS.rareWineMembersClub,
  RAREWINE_MEMBERS_CLUB_LANDING,
);

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-stone-200 bg-stone-50">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-stone-600">
        <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
          <div>
            <p className="font-semibold text-stone-900">{siteName}</p>
            <p className="mt-2 max-w-md leading-relaxed">
              Uafhængig inspiration og produktsøgning. Affiliate og annoncer finansierer driften — du betaler ikke ekstra hos forhandlerne.
            </p>
            <p className="mt-3">
              <a
                href={FACEBOOK_OL_VIN}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-stone-700 underline decoration-stone-300 underline-offset-4 transition hover:text-rose-900 hover:decoration-rose-300"
              >
                Øl &amp; Vin på Facebook
              </a>
            </p>
            <div className="mt-4 max-w-md space-y-3">
              <div className="rounded-xl border border-stone-200/90 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Anbefaling · affiliate</p>
                <p className="mt-2 leading-relaxed text-stone-700">
                  <a
                    href={PARTNER_ADS_BEER_ME_SUBSCRIPTION}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
                  >
                    Specialøl på abonnement hos Beer Me
                  </a>{" "}
                  — kuraterede månedskasser fra danske og udenlandske mikrobryggerier, når du vil udforske øl uden for Vinbots vinunivers.
                </p>
              </div>
              <div className="rounded-xl border border-stone-200/90 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Anbefaling · affiliate</p>
                <p className="mt-2 leading-relaxed text-stone-700">
                  <a
                    href={PARTNER_ADS_RAREWINE_MEMBERS}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="font-semibold text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
                  >
                    RareWine Members Club
                  </a>{" "}
                  — medlemsklub med adgang til sjældnere vine og allocation; du tilmelder dig hos RareWine. Linket er et affiliate-spor — læs mere under{" "}
                  <Link href="/betingelser" className="font-medium text-rose-900 underline decoration-rose-200 underline-offset-4 hover:text-rose-950">
                    betingelser
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Link href="/om-os" className="hover:text-rose-900">
              Om os
            </Link>
            <Link href="/redaktionel-proces" className="hover:text-rose-900">
              Redaktionel proces
            </Link>
            <Link href="/rabatkoder" className="hover:text-rose-900">
              Rabatkoder
            </Link>
            <Link href="/vinkoleskabe" className="hover:text-rose-900">
              Vinkøleskabe
            </Link>
            <Link href="/guides/komplet-guide-til-vin-og-mad" className="hover:text-rose-900">
              Stor guide: vin og mad
            </Link>
            <Link href="/privatliv" className="hover:text-rose-900">
              Privatliv
            </Link>
            <Link href="/betingelser" className="hover:text-rose-900">
              Betingelser
            </Link>
            <Link href="/kontakt" className="hover:text-rose-900">
              Kontakt
            </Link>
          </div>
        </div>
        <p className="mt-8 text-xs text-stone-500">© {new Date().getFullYear()} {siteName}</p>
      </div>
    </footer>
  );
}
