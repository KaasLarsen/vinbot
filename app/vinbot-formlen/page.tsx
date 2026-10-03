import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { PriceRunnerProductWidget } from "@/components/pricerunner-product-widget";
import { WineQuantityCalculator } from "@/components/wine-quantity-calculator";
import { calculateWineQuantity } from "@/lib/wine-quantity/formula";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Vinbot-formlen — hvor mange flasker til festen?";
const PAGE_DESCRIPTION =
  "Hvor meget vin til fest? Beregn flasker pr. gæst med Vinbot-formlen: middag ½ flaske, cocktail efter timer, bryllup 1 flaske — plus 15 % buffer. Fordeling, eksempler og festvine.";
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
    question: "Hvor meget vin skal man købe til fest?",
    answer:
      "Til middag: ca. ½ flaske pr. voksen der drikker vin, plus 15 % buffer. Cocktail: 2–3 glas over et par timer. Bryllup og lang fest: tættere på 1 flaske pr. gæst. Brug beregneren øverst.",
  },
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
    question: "Hvordan fordeler jeg flaskerne på rød, hvid og bobler?",
    answer:
      "Til middag med faser: typisk 1 glas bobler, 1 glas hvid til forret og 2 glas rød til hovedret pr. gæst — plus evt. dessertvin. Slå «Fordel på bobler / hvid / rød» til i beregneren for et konkret split.",
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

const FEST_PICKS = [
  {
    productKey: "guigal-cotes-du-rhone-rouge" as const,
    heading: "Fest-rødvin — Guigal Côtes du Rhône Rouge",
  },
  {
    productKey: "chablis-la-pierrelee" as const,
    heading: "Fest-hvidvin — Chablis La Pierrelée",
  },
  {
    productKey: "grahams-10-tawny" as const,
    heading: "Dessertvin — Graham's 10 Year Tawny Port",
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

      <section className="mt-12 max-w-3xl space-y-4 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Hvor meget vin pr. person — i praksis</h2>
        <p>
          Spørgsmålet «hvor meget vin til fest» handler sjældent kun om ét tal. En stående reception med snacks
          drikker anderledes end en siddende 3-retters, og øl eller drinks på bordet skærer i vinforbruget. Start
          med festtypen i beregneren, og træk 10–20 % fra, hvis I også har fadøl eller cocktails.
        </p>
        <p>
          <strong className="font-medium text-stone-800">Middag:</strong> ½ flaske pr. drikkende gæst dækker typisk
          velkomst + mad. Skru op, hvis der er lange taler, dans efter kaffen, eller hvis I åbner ekstra flasker til
          «bare lige et glas mere». Til konfirmation og lignende eftermiddagsfester er ½ flaske ofte nok — se{" "}
          <Link href="/guides/vin-til-konfirmation" className="text-rose-900 hover:underline">
            vin til konfirmation
          </Link>
          .
        </p>
        <p>
          <strong className="font-medium text-stone-800">Bryllup og lang fest:</strong> regn nærmere 1 flaske pr.
          voksen, fordi dagen strækker sig over velkomst, middag, skål og aften. Dybden ligger i{" "}
          <Link href="/guides/hvor-meget-vin-til-bryllup" className="text-rose-900 hover:underline">
            hvor meget vin til bryllup
          </Link>
          .
        </p>
        <p>
          <strong className="font-medium text-stone-800">Cocktail og buffet:</strong> færre siddende glas, men flere
          «små hælder» over tid. Brug timer-feltet i beregneren — 3 timer er et godt default; 5+ timer nærmer sig
          bryllups-niveau.
        </p>
      </section>

      <section className="mt-12 max-w-3xl space-y-4 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Fordeling: bobler, hvid, rød og dessert</h2>
        <p>
          Når du har totalen, skal den fordeles. En simpel tommelfinger til middag med faser: ca.{" "}
          <strong className="font-medium text-stone-800">1 glas bobler</strong>,{" "}
          <strong className="font-medium text-stone-800">1 glas hvid</strong> til forret og{" "}
          <strong className="font-medium text-stone-800">2 glas rød</strong> til hovedret — det er det, beregneren
          bruger, når du slår fasefordeling til. Dessertvin er ekstra (typisk få flasker til hele bordet).
        </p>
        <p>
          Til blandet selskab uden fast menu: mere 50/50 hvid+bobler og rød, så vegetarer, fiskespisere og
          kødspisere alle har noget i glasset. Crowdpleasere og budgetvalg finder du under{" "}
          <Link href="/guides/crowdpleaser-vin-til-gaester" className="text-rose-900 hover:underline">
            crowdpleaser til gæster
          </Link>{" "}
          og{" "}
          <Link href="/fest-og-vin" className="text-rose-900 hover:underline">
            fest og selskab
          </Link>
          .
        </p>
        <p>
          Tip: køb i kasser à 6 — det er nemmere at returnere uåbnede flasker hos mange forhandlere, og du undgår
          at stå med 17 forskellige etiketter. Omregn til papvin via{" "}
          <Link href="/guides/hvor-meget-papvin-til-fest" className="text-rose-900 hover:underline">
            papvin til fest
          </Link>
          , hvis I er mange og vil spare plads.
        </p>
      </section>

      <section className="mt-12" aria-labelledby="formlen-pricerunner-heading">
        <h2 id="formlen-pricerunner-heading" className="text-2xl font-semibold text-stone-900">
          Tre festflasker at starte med
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-stone-600">
          Én rød, én hvid og én dessertvin — prissammenligning via PriceRunner (annonce). Brug dem som konkrete
          indkøbsforslag, når totalen er på plads. Tjek altid lager, årgang og fragt hos forhandleren.
        </p>
        {FEST_PICKS.map((p) => (
          <PriceRunnerProductWidget
            key={p.productKey}
            productKey={p.productKey}
            heading={p.heading}
            className="mt-8"
          />
        ))}
      </section>

      <section className="mt-12 max-w-3xl space-y-4 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">Typiske fejl (og hvordan du undgår dem)</h2>
        <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed">
          <li>
            <strong className="font-medium text-stone-800">Tælle alle gæster</strong> — inklusive børn og dem der
            kun drikker øl. Formlen gælder drikkende voksne.
          </li>
          <li>
            <strong className="font-medium text-stone-800">Glemme buffer</strong> — 15 % lyder småt, men det er
            forskellen på «lige nok» og «åh nej, kælderen er tom».
          </li>
          <li>
            <strong className="font-medium text-stone-800">Kun rødvin</strong> — uden hvid og bobler står halvdelen
            af bordet uden match til forretten.
          </li>
          <li>
            <strong className="font-medium text-stone-800">Ingen 0 %-plan</strong> — hav altid alkoholfri til
            chauffører og dem der springer over. Se{" "}
            <Link href="/alkoholfri-vin" className="text-rose-900 hover:underline">
              alkoholfri vin
            </Link>
            .
          </li>
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
            <Link href="/guides/hvor-mange-glas-i-en-flaske-vin" className="text-rose-900 hover:underline">
              Hvor mange glas i en flaske
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
