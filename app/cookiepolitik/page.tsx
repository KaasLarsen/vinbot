import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CookieConsentReset } from "@/components/cookie-consent-reset";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { contactEmail, contactPhoneDisplay, contactPhoneTelHref, legalPagesUpdatedDisplay, siteUrl } from "@/lib/site";

const PAGE_TITLE = "Cookiepolitik";
const PAGE_DESCRIPTION =
  "Sådan bruger Vinbot cookies: nødvendige, statistik (Google Analytics), annoncer (Google AdSense) og affiliate via Partner-Ads, Adtraction og Daisycon.";
const PAGE_URL = `${siteUrl}/cookiepolitik`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function CookiepolitikPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Cookiepolitik", url: PAGE_URL },
        ]}
      />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/cookiepolitik", label: "Cookiepolitik" }]} />
      <h1 className="mt-6 text-3xl font-semibold text-stone-900">Cookiepolitik</h1>
      <p className="mt-2 text-sm text-stone-500">Sidst opdateret: {legalPagesUpdatedDisplay}</p>

      <section className="mt-8 space-y-4 text-stone-700">
        <p>
          <strong>Kort:</strong> Vi bruger <strong>nødvendige cookies</strong> til drift og sprog/valg, og — hvis du trykker{" "}
          <strong>Accepter</strong> i banneret — cookies til <strong>statistik (Google Analytics 4)</strong>,{" "}
          <strong>annoncer (Google AdSense)</strong> og <strong>affiliate-sporing</strong> via netværkene{" "}
          <strong>Partner-Ads</strong>, <strong>Adtraction</strong> og <strong>Daisycon</strong>. Den fulde ramme for personoplysninger findes på{" "}
          <Link href="/privatliv" className="text-rose-900 hover:underline">
            Privatliv
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold text-stone-900">Nødvendige cookies</h2>
        <p>
          Teknik der gør sitet brugbart — fx sessions- og sikkerhedsrelevante cookies fra vores host (Vercel) og lokal lagring af dit{" "}
          <strong>cookievalg</strong> (så vi ikke spørger ved hvert sidevisning). De indlæses uanset bannervalg.
        </p>

        <h2 className="text-xl font-semibold text-stone-900">Valgfrie cookies — efter samtykke</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Google Analytics 4:</strong> forstå trafik og brug af sider. Indlæses kun efter <strong>Accepter</strong>.
          </li>
          <li>
            <strong>Google AdSense:</strong> annoncefelter vises kun efter <strong>Accepter</strong> og når annoncer er slået til i opsætningen. Googles annoncenetværk kan sætte cookies til målretning i overensstemmelse med dit valg.
          </li>
          <li>
            <strong>Affiliate:</strong> når du klikker videre til en forhandler, kan <strong>Partner-Ads</strong>, <strong>Adtraction</strong> eller{" "}
            <strong>Daisycon</strong> sætte cookies eller bruge tilsvarende teknologi for at tilskrive et eventuelt salg til Vinbot — uden merpris for dig.
          </li>
        </ul>

        <h2 className="text-xl font-semibold text-stone-900">Cookie-banner</h2>
        <p>
          Ved første besøg viser vi et banner i bunden. <strong>Accepter</strong> giver samtykke til statistik og markedsføringsrelevante cookies (annoncefelter og sporingsmekanismer som beskrevet på denne side).{" "}
          <strong>Kun nødvendige</strong> begrænser til det teknisk nødvendige — så indlæses ikke Google Analytics, og vi viser ikke AdSense-annoncer.
        </p>
        <p className="flex flex-wrap items-center gap-3">
          <CookieConsentReset />
          <span className="text-sm text-stone-500">Nulstil her for at vælge igen.</span>
        </p>

        <h2 className="text-xl font-semibold text-stone-900">Hosting</h2>
        <p>
          Sitet hostes hos <strong>Vercel</strong>. Drift og logning på serverniveau kan foregå uden for EU/EØS; vi henviser til Vercels gældende databehandlerdokumentation og til vores overordnede beskrivelse under{" "}
          <Link href="/privatliv" className="text-rose-900 hover:underline">
            Privatliv
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold text-stone-900">Kontakt</h2>
        <p>
          Spørgsmål om cookies:{" "}
          <a href={`mailto:${contactEmail}`} className="text-rose-900 hover:underline">
            {contactEmail}
          </a>
          {" · "}
          <a href={contactPhoneTelHref} className="text-rose-900 hover:underline">
            {contactPhoneDisplay}
          </a>
        </p>
        <p>
          <Link href="/betingelser" className="text-rose-900 hover:underline">
            Betingelser
          </Link>
        </p>
      </section>
    </div>
  );
}
