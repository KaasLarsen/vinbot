import Link from "next/link";
import { FooterAffiliatePromos } from "@/components/footer-affiliate-promos";
import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl, RAREWINE_MEMBERS_CLUB_LANDING } from "@/lib/partner-ads-links";
import { siteName } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

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
      <PageShell className="py-10 text-sm text-stone-600">
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
            <FooterAffiliatePromos beerMeHref={PARTNER_ADS_BEER_ME_SUBSCRIPTION} rareWineHref={PARTNER_ADS_RAREWINE_MEMBERS} />
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10 lg:min-w-0 lg:max-w-xl lg:shrink-0">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Vin &amp; inspiration</p>
              <nav className="mt-3 flex flex-col gap-2" aria-label="Vin, guides og partnere">
                <Link href="/om-os" className="hover:text-rose-900">
                  Om os
                </Link>
                <Link href="/guides" className="hover:text-rose-900">
                  Alle guider
                </Link>
                <Link href="/opskrifter" className="hover:text-rose-900">
                  Opskrifter
                </Link>
                <Link href="/rabatkoder" className="hover:text-rose-900">
                  Rabatkoder
                </Link>
                <Link href="/tilbud" className="hover:text-rose-900">
                  Vin tilbud
                </Link>
            <Link href="/lauridsen-vine" className="hover:text-rose-900">
              Lauridsen Vine
            </Link>
            <Link href="/winther-vin" className="hover:text-rose-900">
              Winther Vin
            </Link>
            <Link href="/dh-wines" className="hover:text-rose-900">
              DH Wines
            </Link>
            <Link href="/johnsen-wine" className="hover:text-rose-900">
              Johnsen Wine
            </Link>
            <Link href="/havnens-vin" className="hover:text-rose-900">
              Havnens Vin
            </Link>
                <Link href="/den-sidste-flaske" className="hover:text-rose-900">
                  Den Sidste Flaske
                </Link>
                <Link href="/vine" className="hover:text-rose-900">
                  Vin-katalog
                </Link>
                <Link href="/vinkoleskabe" className="hover:text-rose-900">
                  Vinkøleskabe
                </Link>
                <Link href="/guides/komplet-guide-til-vin-og-mad" className="hover:text-rose-900">
                  Stor guide: vin og mad
                </Link>
              </nav>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">Vilkår &amp; kontakt</p>
              <nav className="mt-3 flex flex-col gap-2" aria-label="Privatliv, vilkår og kontakt">
                <Link href="/redaktionel-proces" className="hover:text-rose-900">
                  Redaktionel proces
                </Link>
                <Link href="/privatliv" className="hover:text-rose-900">
                  Privatliv
                </Link>
                <Link href="/cookiepolitik" className="hover:text-rose-900">
                  Cookiepolitik
                </Link>
                <Link href="/betingelser" className="hover:text-rose-900">
                  Betingelser
                </Link>
                <Link href="/kontakt" className="hover:text-rose-900">
                  Kontakt
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <p className="mt-8 text-xs text-stone-500">© {new Date().getFullYear()} {siteName}</p>
      </PageShell>
    </footer>
  );
}
