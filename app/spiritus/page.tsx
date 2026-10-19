import type { Metadata } from "next";
import Link from "next/link";
import { SpiritsSearch } from "@/components/spirits-search";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, FaqJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Spiritus — søg rom, gin, whisky og likør | Vinbot";
const PAGE_DESCRIPTION =
  "Søg dansk spiritus hos Whiskystack, Spitus, Skotlander Spirits og Barlife: rom, gin, whisky, likør og vodka. Sammenlign priser og gå videre til shoppen.";
const PAGE_URL = `${siteUrl}/spiritus`;

const FAQ = [
  {
    question: "Hvorfor har Vinbot en spiritus-søgning?",
    answer:
      "Vinbot er vin-first, men flere af vores affiliate-partnere sælger også spiritus. Her samler vi rom, gin, whisky og likør i én søgning, så du kan finde flaskerne uden at blande dem ind i vinsøgningen på forsiden.",
  },
  {
    question: "Hvilke forhandlere indgår?",
    answer:
      "Whiskystack, Spitus, Skotlander Spirits og Barlife. Du handler og betaler altid hos forhandleren — Vinbot sælger ikke spiritus.",
  },
  {
    question: "Er priserne på Vinbot altid aktuelle?",
    answer:
      "Nej. Priser og lager kan skifte. Brug altid forhandlerens egen side som kilde til slutpris, fragt og levering.",
  },
  {
    question: "Hvor finder jeg cocktail-opskrifter?",
    answer:
      "Under Drinks samler vi opskrifter hvor vin er hovedrollen (spritz, sangria, Port & Tonic m.m.). Spiritus-hubben er til flaskesøgning.",
  },
];

const MERCHANT_LINKS = [
  { href: "/skotlander-spirits", label: "Skotlander Spirits", body: "Dansk rom, gin og likør fra Jammerbugten." },
  { href: "/whiskystack", label: "Whiskystack", body: "Whisky, rom og udvalgt vin." },
  { href: "/spitus", label: "Spitus", body: "Spiritus, champagne og portvin." },
  { href: "/barlife", label: "Barlife", body: "Vin, spiritus og bar til hjemmet." },
] as const;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL, title: PAGE_TITLE, description: PAGE_DESCRIPTION },
};

/** Feed-søgning under SSG overstiger ofte Vercels page-timeout. */
export const dynamic = "force-dynamic";

export default function SpiritusPage() {
  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Spiritus", url: PAGE_URL },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/spiritus", label: "Spiritus" }]} />

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-rose-900/85">Spiritus &amp; bar</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900 sm:text-[2.65rem] sm:leading-tight">
          Spiritus — søg rom, gin og whisky
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">
          Find <strong className="font-medium text-stone-800">rom, gin, whisky, likør og vodka</strong> hos danske
          forhandlere i Vinbots netværk. Søgningen her er adskilt fra vinsøgningen på forsiden — så flaskerne lander
          dér, hvor de hører hjemme.
        </p>
        <p className="mt-3 text-stone-700">
          Sortimentet kommer fra <strong className="font-medium text-stone-800">Skotlander Spirits</strong>,{" "}
          <strong className="font-medium text-stone-800">Whiskystack</strong>,{" "}
          <strong className="font-medium text-stone-800">Spitus</strong> og{" "}
          <strong className="font-medium text-stone-800">Barlife</strong>. Du klikker videre til shoppen for pris, lager
          og levering.
        </p>
      </header>

      <div className="mt-8">
        <PartnerAdsLeaderboard placement="spiritus-hub" />
      </div>

      <section className="mt-10" aria-labelledby="spiritus-search-heading">
        <h2 id="spiritus-search-heading" className="sr-only">
          Søg spiritus
        </h2>
        <SpiritsSearch initialQuery="" />
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-semibold text-stone-900">Forhandlere</h2>
        <p className="mt-2 max-w-2xl text-stone-700">
          Gå direkte til butikkens hub for intro, FAQ og shop-link — eller bliv her og søg på tværs.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {MERCHANT_LINKS.map((m) => (
            <li key={m.href}>
              <Link
                href={m.href}
                className="block rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition hover:border-rose-300 hover:bg-rose-50/40"
              >
                <span className="text-lg font-semibold text-stone-900">{m.label}</span>
                <span className="mt-1 block text-sm text-stone-600">{m.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-semibold text-stone-900">Drinks og cocktails</h2>
        <p className="mt-3 text-stone-700">
          Leder du efter opskrifter?{" "}
          <Link href="/drinks" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4">
            Drinks-hubben
          </Link>{" "}
          samler spritz, sangria og vinbaserede cocktails. Spiritus-hubben er til at finde flasken.
        </p>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-semibold text-stone-900">Ofte stillede spørgsmål</h2>
        <dl className="mt-6 space-y-6">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-semibold text-stone-900">{item.question}</dt>
              <dd className="mt-2 text-stone-700">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </PageShell>
  );
}
