import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CookieConsentReset } from "@/components/cookie-consent-reset";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/json-ld";
import {
  contactEmail,
  contactPhoneDisplay,
  contactPhoneTelHref,
  legalPagesUpdatedDisplay,
  siteUrl,
} from "@/lib/site";

const PAGE_TITLE = "Privatliv";
const PAGE_DESCRIPTION =
  "Sådan behandler Vinbot personoplysninger: hobbyprojekt uden CVR, Vercel-hosting, cookies, Google Analytics, Google AdSense og affiliate (Partner-Ads, Adtraction, Daisycon).";
const PAGE_URL = `${siteUrl}/privatliv`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function PrivatlivPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Privatliv", url: PAGE_URL },
        ]}
      />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/privatliv", label: "Privatliv" }]} />
      <h1 className="mt-6 text-3xl font-semibold text-stone-900">Privatliv</h1>
      <p className="mt-2 text-sm text-stone-500">Sidst opdateret: {legalPagesUpdatedDisplay}</p>

      <section className="mt-8 space-y-4 text-stone-700">
        <p>
          <strong>Overblik:</strong> Vinbot drives som <strong>hobbyprojekt uden CVR-nummer</strong>. Vi bruger cookies og lignende teknologier til drift, statistik (Google Analytics 4), annoncer (Google AdSense) og affiliate-sporing. Den praktiske opdeling af cookie-typer og banneret er samlet på siden{" "}
          <Link href="/cookiepolitik" className="text-rose-900 hover:underline">
            Cookiepolitik
          </Link>
          . Spørgsmål:{" "}
          <a href={`mailto:${contactEmail}`} className="text-rose-900 hover:underline">
            {contactEmail}
          </a>{" "}
          eller{" "}
          <a href={contactPhoneTelHref} className="text-rose-900 hover:underline">
            {contactPhoneDisplay}
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-stone-900">Dataansvarlig</h2>
        <p>
          Vinbot (hobbyprojekt) — kontakt:{" "}
          <a href={`mailto:${contactEmail}`} className="text-rose-900 hover:underline">
            {contactEmail}
          </a>
          , mobil{" "}
          <a href={contactPhoneTelHref} className="text-rose-900 hover:underline">
            {contactPhoneDisplay}
          </a>
          .
        </p>

        <h2 className="text-xl font-semibold text-stone-900">Hosting og behandlere</h2>
        <p>
          Websitet hostes hos <strong>Vercel</strong>. Ved besøg kan tekniske oplysninger (herunder IP-adresse, browser og forespørgselsmetadata) behandles af Vercel og af os til drift og sikkerhed. Google (Analytics, AdSense) og affiliate-netværk behandler data efter deres vilkår, når de respektive tjenester er aktiveret efter dit samtykke.
        </p>

        <h2 className="text-xl font-semibold text-stone-900">Oplysninger vi behandler</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Tekniske data i forbindelse med besøg: IP, enhed, browser, tidspunkt, besøgte sider (i det omfang drift og statistik kræver det).</li>
          <li>Cookies og tilsvarende teknologier som beskrevet under Cookiepolitik.</li>
          <li>Korrespondance: e-mails, hvis du skriver til os.</li>
        </ul>
        <p className="text-sm text-stone-600">
          Vi kører ikke login, nyhedsbrev eller andre tjenester, der kræver en separat konto på Vinbot.
        </p>

        <h2 className="text-xl font-semibold text-stone-900">Formål og grundlag</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Drift og sikkerhed (berettiget interesse / nødvendighed for tjenesten).</li>
          <li>Statistik og forbedring af sitet (samtykke, når du har trykket Accepter).</li>
          <li>Annoncer via Google AdSense (samtykke, når du har trykket Accepter).</li>
          <li>Affiliate-sporing via Partner-Ads, Adtraction og Daisycon (samtykke, når du har trykket Accepter).</li>
        </ul>

        <h2 className="text-xl font-semibold text-stone-900">Cookie-banner</h2>
        <p>
          Ved første besøg viser vi en besked i bunden af skærmen. <strong>Accepter</strong> giver samtykke til statistik (Google Analytics) og til cookie-baseret annoncering via Google AdSense, når vi har aktiveret annoncefelter på sitet.{" "}
          <strong>Kun nødvendige</strong> begrænser til det teknisk nødvendige; så indlæses ikke Google Analytics, og vi viser ikke AdSense-annoncer (felter).
        </p>
        <p className="flex flex-wrap items-center gap-3">
          <CookieConsentReset />
          <span className="text-sm text-stone-500">Brug knappen, hvis du vil vælge igen.</span>
        </p>

        <h2 className="text-xl font-semibold text-stone-900">Google Analytics</h2>
        <p>
          Vi bruger Google Analytics 4 til at forstå, hvordan sitet bruges (fx besøgte sider og brugsmønstre). Oplysninger behandles af Google efter deres gældende vilkår. Analytics indlæses kun, hvis du har trykket <strong>Accepter</strong> i cookie-banneret. Du kan begrænse eller blokere cookies i din browser; se også Googles egne værktøjer til annoncetilpasning.
        </p>

        <h2 className="text-xl font-semibold text-stone-900">Google AdSense</h2>
        <p>
          Vi kan indlæse Googles AdSense <strong>publisher-script</strong> på siderne, når sitet er konfigureret til det — det kan være nødvendigt, så Google kan kontrollere og godkende sitet.{" "}
          <strong>Selve annoncefelterne</strong> vises kun, hvis du har trykket <strong>Accepter</strong> i cookie-banneret, og vi har slået annoncer til i opsætningen. Når annoncer vises, kan Google bruge cookies til at levere annoncer — herunder personligt tilpassede, når du har givet samtykke.
        </p>

        <h2 className="text-xl font-semibold text-stone-900">Affiliate-links</h2>
        <p>
          Nogle links er affiliate. Afhængigt af forhandler kan de formidles via netværk som <strong>Partner-Ads</strong>, <strong>Adtraction</strong> eller{" "}
          <strong>Daisycon</strong>. Når du klikker, kan forhandleren eller netværket sætte en cookie eller bruge anden teknisk sporingsmekanisme for at tildele kommission til Vinbot. Det påvirker ikke din pris hos butikken.
        </p>

        <p className="flex flex-wrap gap-x-3 gap-y-1 pt-4">
          <Link href="/cookiepolitik" className="text-rose-900 hover:underline">
            Cookiepolitik
          </Link>
          <span className="text-stone-400">·</span>
          <Link href="/betingelser" className="text-rose-900 hover:underline">
            Betingelser
          </Link>
        </p>
      </section>
    </div>
  );
}
