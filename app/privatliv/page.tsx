import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CookieConsentReset } from "@/components/cookie-consent-reset";
import { contactEmail, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privatliv",
  description: "Sådan behandler Vinbot personoplysninger, cookies, Google Analytics, Google AdSense og affiliate-sporing.",
  alternates: { canonical: `${siteUrl}/privatliv` },
};

export default function PrivatlivPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/privatliv", label: "Privatliv" }]} />
      <h1 className="mt-6 text-3xl font-semibold text-stone-900">Privatliv</h1>
      <p className="mt-2 text-sm text-stone-500">Sidst opdateret: 11. april 2026</p>

      <section className="mt-8 space-y-4 text-stone-700">
        <p>
          <strong>Overblik:</strong> Vi bruger cookies og lignende teknologier til drift, statistik (Google Analytics), annoncer (Google AdSense) og affiliate-sporing. Spørgsmål:{" "}
          <a href={`mailto:${contactEmail}`} className="text-rose-900 hover:underline">
            {contactEmail}
          </a>
          .
        </p>
        <h2 className="text-xl font-semibold text-stone-900">Dataansvarlig</h2>
        <p>
          Vinbot —{" "}
          <a href={`mailto:${contactEmail}`} className="text-rose-900 hover:underline">
            {contactEmail}
          </a>
        </p>
        <h2 className="text-xl font-semibold text-stone-900">Oplysninger vi behandler</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Tekniske data: IP, enhed, browser, besøgte sider, tidspunkter.</li>
          <li>Cookies: drift, statistik (Analytics), annoncer, affiliate.</li>
          <li>Korrespondance: e-mails, hvis du skriver til os.</li>
        </ul>
        <h2 className="text-xl font-semibold text-stone-900">Formål og grundlag</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Drift og sikkerhed (legitim interesse).</li>
          <li>Statistik og forbedring (samtykke/legitim interesse).</li>
          <li>Annoncer (samtykke).</li>
          <li>Affiliate-sporing (samtykke/legitim interesse).</li>
        </ul>
        <h2 className="text-xl font-semibold text-stone-900">Cookie-banner</h2>
        <p>
          Ved første besøg viser vi en besked i bunden af skærmen. <strong>Accepter</strong> giver samtykke til statistik (Google Analytics) og til annoncer (Google AdSense), når AdSense er aktiveret på sitet.{" "}
          <strong>Kun nødvendige</strong> begrænser til det teknisk nødvendige; så indlæses hverken Analytics eller AdSense.
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
          Når AdSense er aktiveret, kan Google bruge cookies til at vise annoncer — herunder personligt tilpassede, hvis du har givet samtykke. AdSense-scriptet indlæses kun, hvis du har trykket <strong>Accepter</strong> i cookie-banneret.
        </p>
        <h2 className="text-xl font-semibold text-stone-900">Affiliate-links</h2>
        <p>
          Nogle links er affiliate. Afhængigt af forhandler kan de formidles via netværk som <strong>Partner-Ads</strong> eller{" "}
          <strong>Adtraction</strong>. Når du klikker, kan forhandleren eller netværket sætte en cookie eller bruge anden teknisk sporingsmekanisme
          for at tildele kommission til Vinbot. Det påvirker ikke din pris hos butikken.
        </p>
        <p className="pt-6">
          <Link href="/betingelser" className="text-rose-900 hover:underline">
            Læs betingelser
          </Link>
        </p>
      </section>
    </div>
  );
}
