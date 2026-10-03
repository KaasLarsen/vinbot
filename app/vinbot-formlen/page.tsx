import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { WineQuantityCalculator } from "@/components/wine-quantity-calculator";
import { calculateWineQuantity } from "@/lib/wine-quantity/formula";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Vinbot-formlen — hvor mange flasker til festen?";
const PAGE_DESCRIPTION =
  "Beregn hvor meget vin til fest, middag og bryllup. Vinbot-formlen: flasker pr. gæst efter festtype + 15 % buffer. Find festvine hos danske forhandlere.";
const PAGE_URL = `${siteUrl}/vinbot-formlen`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    locale: "da_DK",
    type: "website",
  },
};

const EXAMPLE_GUESTS = [20, 40, 80] as const;

const FAQ = [
  {
    question: "Hvorfor +15 % buffer?",
    answer:
      "Folk hælder ofte mere end et «standardglas», nogen kommer sent, og du vil undgå at løbe tør midt i desserten. Femten procent er Vinbots standard — afrundet op til hele flasker.",
  },
  {
    question: "Skal jeg tælle alle gæster eller kun dem der drikker vin?",
    answer:
      "Kun voksne der drikker vin. Børn, chauffører og gæster på alkoholfri tæller ikke med i gæsteantallet — ellers køber du for meget.",
  },
  {
    question: "Er bobler til skål medregnet?",
    answer:
      "Ved middag og bryllup med fasefordeling er velkomstbobler med. Til bryllup anbefaler vi stadig at tænke ekstra skål-cava/champagne, hvis I har mange taler — se guiden om vin til bryllup.",
  },
  {
    question: "Kan jeg bruge formlen til papvin / box-vin?",
    answer:
      "Ja. Omregn: én 3 L bag-in-box ≈ fire almindelige flasker. Se også guiden om hvor meget papvin til fest.",
  },
  {
    question: "Hvad er forskellen på Vinbot-formlen og julevin-beregneren?",
    answer:
      "Vinbot-formlen er generel: gæster + festtype → flasker (og valgfrit fordeling). Julevin-beregneren er sæson: jul/nytår med budget og konkrete flaskeforslag pr. rolle.",
  },
] as const;

export default function VinbotFormlenPage() {
  const examples = EXAMPLE_GUESTS.map((guests) => {
    const result = calculateWineQuantity({
      guests,
      partyType: "middag",
      withPhases: false,
    });
    return { guests, totalBottles: result.totalBottles, casesOf6: result.casesOf6 };
  });

  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Vinbot-formlen", url: PAGE_URL },
  ];

  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FaqJsonLd items={[...FAQ]} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/vinbot-formlen", label: "Vinbot-formlen" },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wide text-amber-900/80">Vinbot-formlen</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Hvor mange flasker til festen?
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">
          Angiv drikkende gæster og festtype — få flasker med 15 % buffer, og find festvine til indkøbet. Dybden ligger i{" "}
          <Link href="/guides/hvor-meget-vin-til-fest" className="font-medium text-rose-900 hover:underline">
            hvor meget vin til fest
          </Link>{" "}
          og{" "}
          <Link href="/guides/hvor-meget-vin-til-bryllup" className="font-medium text-rose-900 hover:underline">
            vin til bryllup
          </Link>
          .
        </p>
      </header>

      <WineQuantityCalculator
        variant="full"
        className="mt-10"
        defaultPartyType="middag"
        defaultGuests={40}
        heading="Beregn flasker til festen"
        intro="Antal drikkende gæster + festtype — finjustér med timer, faser og dessertvin. Resultatet følger Vinbot-formlen med 15 % buffer."
        secondaryCta={null}
      />

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold text-stone-900">Sådan virker formlen</h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-700">
          Tre festtyper, én buffer. Tallene er tommelfingre — finjustér med faser (bobler/hvid/rød) i beregneren ovenfor.
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl border border-stone-200 bg-white">
          <table className="w-full min-w-[28rem] text-left text-sm text-stone-700">
            <thead className="border-b border-stone-200 bg-stone-50 text-xs font-semibold uppercase tracking-wide text-stone-500">
              <tr>
                <th className="px-4 py-3">Festtype</th>
                <th className="px-4 py-3">Pr. gæst</th>
                <th className="px-4 py-3">Buffer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              <tr>
                <td className="px-4 py-3 font-medium text-stone-900">Middag</td>
                <td className="px-4 py-3">½ flaske (ca. 3 glas)</td>
                <td className="px-4 py-3">+15 %</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-stone-900">Cocktail</td>
                <td className="px-4 py-3">Ca. 2–3 glas (skalerer med timer)</td>
                <td className="px-4 py-3">+15 %</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-stone-900">Bryllup / lang fest</td>
                <td className="px-4 py-3">1 flaske (+ bobler til skål i fasefordeling)</td>
                <td className="px-4 py-3">+15 %</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold text-stone-900">Eksempler: middag</h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-700">
          Enkel middag uden fasefordeling — samme tal som beregneren med standardindstillinger.
        </p>
        <ul className="mt-4 grid gap-3 sm:grid-cols-3">
          {examples.map((ex) => (
            <li
              key={ex.guests}
              className="rounded-xl border border-stone-200 bg-white px-4 py-4 shadow-sm"
            >
              <p className="text-xs font-medium uppercase tracking-wide text-stone-500">
                {ex.guests} drikkende
              </p>
              <p className="mt-1.5 text-2xl font-semibold tracking-tight text-stone-900">
                {ex.totalBottles}{" "}
                <span className="text-base font-medium text-stone-600">flasker</span>
              </p>
              <p className="mt-1 text-xs text-stone-500">Ca. {ex.casesOf6} kasser à 6</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold text-stone-900">Ofte stillede spørgsmål</h2>
        <dl className="mt-4 space-y-5">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-stone-900">{item.question}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-stone-700">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-12 max-w-3xl">
        <h2 className="text-xl font-semibold text-stone-900">Videre</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-stone-700">
          <li>
            <Link href="/fest-og-vin" className="font-medium text-rose-900 hover:underline">
              Fest og selskab
            </Link>{" "}
            — guides til konfirmation, studenterfest og gaver
          </li>
          <li>
            <Link href="/guides/hvor-meget-vin-til-fest" className="text-rose-900 hover:underline">
              Hvor meget vin til fest
            </Link>
          </li>
          <li>
            <Link href="/guides/hvor-meget-vin-til-bryllup" className="text-rose-900 hover:underline">
              Hvor meget vin til bryllup
            </Link>
          </li>
          <li>
            <Link href="/guides/hvor-meget-papvin-til-fest" className="text-rose-900 hover:underline">
              Hvor meget papvin til fest
            </Link>
          </li>
          <li>
            <Link href="/julevin-beregner" className="text-rose-900 hover:underline">
              Julevin- og nytårsvins-beregner
            </Link>
          </li>
        </ul>
      </section>

      <PartnerAdsLeaderboard className="mt-12" hub="fest-og-vin" slug="vinbot-formlen" />
    </PageShell>
  );
}
