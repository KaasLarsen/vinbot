import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privatliv",
  description: "Sådan behandler Vinbot personoplysninger, cookies, Google AdSense og affiliate-sporing.",
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
          <strong>Overblik:</strong> Vi bruger cookies og lignende teknologier til drift, statistik, annoncer (Google AdSense) og affiliate-sporing. Spørgsmål:{" "}
          <a href="mailto:hej@vinbot.dk" className="text-rose-900 hover:underline">
            hej@vinbot.dk
          </a>
          .
        </p>
        <h2 className="text-xl font-semibold text-stone-900">Dataansvarlig</h2>
        <p>
          Vinbot —{" "}
          <a href="mailto:hej@vinbot.dk" className="text-rose-900 hover:underline">
            hej@vinbot.dk
          </a>
        </p>
        <h2 className="text-xl font-semibold text-stone-900">Oplysninger vi behandler</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Tekniske data: IP, enhed, browser, besøgte sider, tidspunkter.</li>
          <li>Cookies: drift, statistik, annoncer, affiliate.</li>
          <li>Korrespondance: e-mails, hvis du skriver til os.</li>
        </ul>
        <h2 className="text-xl font-semibold text-stone-900">Formål og grundlag</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Drift og sikkerhed (legitim interesse).</li>
          <li>Statistik og forbedring (samtykke/legitim interesse).</li>
          <li>Annoncer (samtykke).</li>
          <li>Affiliate-sporing (samtykke/legitim interesse).</li>
        </ul>
        <h2 className="text-xl font-semibold text-stone-900">Google AdSense</h2>
        <p>Google kan bruge cookies til at vise personligt tilpassede annoncer, hvis du har givet samtykke.</p>
        <h2 className="text-xl font-semibold text-stone-900">Affiliate-links</h2>
        <p>Nogle links er affiliate. Når du klikker, kan forhandleren sætte en cookie for at tildele kommission. Det påvirker ikke din pris.</p>
        <p className="pt-6">
          <Link href="/betingelser" className="text-rose-900 hover:underline">
            Læs betingelser
          </Link>
        </p>
      </section>
    </div>
  );
}
