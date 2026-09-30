import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, FaqJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Vininvestering i Danmark — guide til flasker, managed og vin-aktier";
const PAGE_DESCRIPTION =
  "Uafhængig guide til vininvestering: hvorfor under 0,1 % af al vin egner sig, DIY vs. investeringshuse vs. vin-aktier, samt skat, toldoplag og OWC i Danmark. Ingen købsanbefalinger.";
const PAGE_URL = `${siteUrl}/investering`;

const FAQ = [
  {
    question: "Er vininvestering en god idé for begyndere?",
    answer:
      "Kun hvis du har en tidshorisont på typisk 10–15 år, forstår omkostninger til opbevaring og handel, og kan tåle at tabe penge. Under 0,1 % af verdens vin er egnet som investering. Start med at lære mekanismerne — ikke med at købe dyre kasser.",
  },
  {
    question: "Hvor længe skal man typisk holde investeringsvin?",
    answer:
      "Som udgangspunkt 10–15 år. Kort tidshorisont passer dårligt til fysisk vin, fordi handelsomkostninger, opbevaring og gebyrer æder hurtige handler. Markedet kan svinge i årevis uden at følge aktieindeks.",
  },
  {
    question: "Skal investeringsvin ligge i original trækasse?",
    answer:
      "Ja. Professionel handel forventer næsten altid OWC — Original Wooden Case — uåbnet og i god stand. Løse flasker falder drastisk i investeringsværdi. Provenance (dokumenteret opbevaringshistorik) betyder mindst lige så meget som etiketten.",
  },
  {
    question: "Hvorfor er toldoplag vigtigt?",
    answer:
      "Professionel investeringsvin handles og opbevares typisk i toldoplag uden dansk moms. Køber du vin med 25 % dansk moms i en almindelig butik, starter du med et moms-lag, der er svært at hente hjem via værdistigning alene.",
  },
  {
    question: "Er gevinster på vin skattepligtige i Danmark?",
    answer:
      "Gevinster ved målrettet investering og spekulation i vin er skattepligtige. Grænsen mellem privat forbrug og spekulation afgøres af faktiske forhold. Hold dokumentation, og søg uvildig skatterådgivning ved væsentlige beløb. Vinbot giver ikke skatteråd.",
  },
  {
    question: "Hvad er forskellen på fysisk vin og vin-aktier?",
    answer:
      "Fysisk vin giver dig ejerskab af flasker — men kræver opbevaring, forsikring og en salgskanal. Vin-aktier (fx i vinkonglomerater via en børsmægler) er ekstremt likvide, men du ejer ikke flaskerne, og kurserne følger ofte det generelle aktiemarked.",
  },
];

const JUMP_CARDS = [
  {
    title: "Hvorfor stiger vin?",
    body: "Faldende udbud, stigende kvalitet i flasken og en tidshorisont på 10–15 år.",
    href: "#mekanismer",
  },
  {
    title: "3 veje ind",
    body: "DIY-flasker, managed investeringshuse eller vin-aktier via børsmægler.",
    href: "#veje",
  },
  {
    title: "Fælder & regler",
    body: "Skat i DK, toldoplag vs. moms og kravet om OWC-emballage.",
    href: "#faelder",
  },
] as const;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    type: "article",
  },
};

export default function InvesteringHubPage() {
  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Investering", url: PAGE_URL },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/investering", label: "Investering" },
        ]}
      />

      <aside
        className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-stone-800 sm:p-6"
        role="note"
        aria-label="Vigtig information og ansvarsfraskrivelse"
      >
        <p>
          <strong className="font-semibold text-stone-900">
            VIGTIG INFORMATION &amp; ANSVARSFRASKRIVELSE:
          </strong>{" "}
          Indholdet på Vinbot.dk er udelukkende tænkt som generel information og oplysning om
          vinmarkedet. Vinbot.dk yder ikke finansiel rådgivning, købsanbefalinger eller
          investeringsrådgivning. Investering i vin – ligesom investering i aktier, krypto og andre
          aktiver – er forbundet med risiko. Historiske afkast er ingen garanti for fremtidige
          gevinster. Værdien af din vininvestering kan både stige og falde, og du risikerer i værste
          fald at tabe hele eller dele af det investerede beløb. Vinbot.dk fraskriver sig ethvert
          ansvar for direkte eller indirekte økonomiske tab, som måtte opstå på baggrund af brug af
          informationen på denne side. Søg altid uvildig, professionel rådgivning før du foretager
          større økonomiske dispositioner.
        </p>
      </aside>

      <header className="mt-8 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-rose-900/85">
          Investor-Hub
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900 sm:text-[2.65rem] sm:leading-tight">
          Vinbot Investor-Hub: Din uafhængige guide til vininvestering
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">
          Under <strong className="font-medium text-stone-800">0,1 %</strong> af alverdens vin er
          egnet som investering. Resten er lavet til at blive drukket. Den forskel er afgørende, før
          du binder penge i flasker.
        </p>
        <p className="mt-3 leading-relaxed text-stone-700">
          Vin som investering er et{" "}
          <strong className="font-medium text-stone-800">alternativt aktiv</strong>. Markedet er
          mindre likvidt end aktier. Priserne styres af udbud, årgangskvalitet og efterspørgsel —
          ikke af kvartalsregnskaber. Her får du mekanismerne, de praktiske veje ind og de
          faldgruber, mange overser. Uden købsanbefalinger. Uden løfter om afkast.
        </p>
        <p className="mt-3 text-sm text-stone-600">
          Relateret:{" "}
          <Link href="/vinkoleskabe" className="text-rose-900 hover:underline">
            vinkøleskabe til lagring
          </Link>
          ,{" "}
          <Link
            href="/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske"
            className="text-rose-900 hover:underline"
          >
            vintemperatur og opbevaring
          </Link>
          ,{" "}
          <Link href="/regioner" className="text-rose-900 hover:underline">
            vinregioner
          </Link>{" "}
          og{" "}
          <Link href="/guides" className="text-rose-900 hover:underline">
            alle guides
          </Link>
          .
        </p>
      </header>

      <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Nøgletal">
        {[
          { label: "Egnet som investering", value: "Under 0,1 %" },
          { label: "Typisk tidshorisont", value: "10–15 år" },
          { label: "Managed-gebyr (typisk)", value: "1–2 % / år" },
          { label: "Dansk moms i butik", value: "25 %" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-stone-200 bg-white px-5 py-4 shadow-sm ring-1 ring-stone-100"
          >
            <p className="text-2xl font-semibold tracking-tight text-stone-900">{stat.value}</p>
            <p className="mt-1 text-sm text-stone-600">{stat.label}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {JUMP_CARDS.map((card) => (
          <a
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm ring-1 ring-stone-100 transition hover:border-rose-200 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-stone-900">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{card.body}</p>
            <span className="mt-3 inline-block text-sm font-medium text-rose-900">Læs mere ↓</span>
          </a>
        ))}
      </section>

      <section id="mekanismer" className="mt-16 scroll-mt-24">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-stone-900">
            Mekanismerne – hvorfor stiger vin i værdi?
          </h2>
          <p className="mt-3 leading-relaxed text-stone-700">
            Tre kræfter driver typisk prisudviklingen på investeringsvin: færre flasker, bedre vin i
            flasken over tid — og tålmodighed.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/80">01</p>
            <h3 className="mt-2 text-lg font-semibold text-stone-900">Det faldende udbud</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              Når en årgang frigives, er der et fast antal flasker. Ingen flere. Flaskerne drikkes
              løbende. Hver gang en flaske åbnes, falder det tilbageværende udbud.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              Over år bliver de bedste årgange sjældnere. Færre flasker i perfekt stand skærper
              konkurrencen blandt købere.
            </p>
          </article>

          <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/80">02</p>
            <h3 className="mt-2 text-lg font-semibold text-stone-900">Den stigende kvalitet</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              God investeringsvin udvikler sig i flasken i 10, 20 eller 30 år. Aroma, struktur og
              kompleksitet kan forbedres.
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-stone-700">
              <li>Samlere vil have flasker i topstand.</li>
              <li>Restauranter og auktioner søger modne flasker.</li>
              <li>Begrænset udbud møder mere købekraft.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/80">03</p>
            <h3 className="mt-2 text-lg font-semibold text-stone-900">Tidshorisont</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              Vin er et <strong className="font-medium text-stone-800">langsigtet aktiv</strong>.
              Pengene bør som udgangspunkt bindes i{" "}
              <strong className="font-medium text-stone-800">10–15 år</strong>.
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-stone-700">
              <li>Kort tidshorisont passer dårligt til fysisk vin.</li>
              <li>Omkostninger æder hurtige handler.</li>
              <li>Markedet følger ikke aktieindeks slavisk.</li>
            </ul>
          </article>
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-stone-600">
          Kombinationen — bedre vin + færre flasker — er kernen i værdipotentialet. Den gælder kun
          for vine med dokumenteret lagringsevne og efterspørgsel. Ikke for almindelig hverdagsvin.
          Hvis du kan få brug for pengene snart, er fysisk vininvestering sjældent det rigtige
          værktøj.
        </p>
      </section>

      <section id="veje" className="mt-16 scroll-mt-24">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-stone-900">De 3 veje til markedet</h2>
          <p className="mt-3 leading-relaxed text-stone-700">
            Privatpersoner bruger typisk én af tre tilgange. De løser forskellige behov — og har
            forskellige omkostninger.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <article className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Vej 1</p>
            <h3 className="mt-2 text-lg font-semibold text-stone-900">
              Gør-det-selv (fysiske flasker)
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              Du køber selv vinen og ejer flaskerne direkte.
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="font-medium text-emerald-800">Fordel</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-700">
                  <li>Fuld kontrol over valg, timing og salg.</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-rose-900">Ulemper</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-700">
                  <li>Professionel, temperaturstyret opbevaring.</li>
                  <li>Forsikring.</li>
                  <li>Adgang til handelskanaler (fx Liv-ex eller auktioner) ved salg.</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              Uden korrekt opbevaring mister flaskerne hurtigt både drikkekvalitet og handelsværdi.
              Se{" "}
              <Link href="/vinkoleskabe" className="font-medium text-rose-900 hover:underline">
                vinkøleskab-guiden
              </Link>
              .
            </p>
          </article>

          <article className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Vej 2</p>
            <h3 className="mt-2 text-lg font-semibold text-stone-900">
              Investeringshuse (managed)
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              Du skyder penge ind hos specialiserede huse, der køber, opbevarer og håndterer det
              praktiske.
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="font-medium text-emerald-800">Fordele</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-700">
                  <li>Bekvemt: ingen køleskab, toldpapir eller logistik.</li>
                  <li>Vin typisk på professionelle toldoplag.</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-rose-900">Ulemper</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-700">
                  <li>
                    Årlige administrationsgebyrer — typisk{" "}
                    <strong className="font-medium text-stone-800">1–2 %</strong>.
                  </li>
                  <li>Kommission ved salg.</li>
                  <li>Afhængighed af husets due diligence og likviditet.</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              Sammenlign den samlede omkostning over 10–15 år — ikke kun startgebyret. Læs vilkår og
              exit-muligheder, før du binder kapital.
            </p>
          </article>

          <article className="flex flex-col rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100">
            <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Vej 3</p>
            <h3 className="mt-2 text-lg font-semibold text-stone-900">Vin-aktier og fonde</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              Du investerer i vinkonglomerater (fx LVMH) eller spiritusproducenter via en almindelig
              børsmægler som Nordnet.
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <div>
                <p className="font-medium text-emerald-800">Fordele</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-700">
                  <li>Ekstremt høj likviditet — kan sælges på sekunder.</li>
                  <li>Ingen fysisk opbevaring eller toldoplag.</li>
                  <li>Let at holde i en almindelig portefølje.</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-rose-900">Ulemper</p>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-stone-700">
                  <li>Du ejer ikke fysisk vin.</li>
                  <li>Kurserne følger det generelle aktiemarked tæt.</li>
                  <li>Eksponering mod virksomhed — ikke flaskepris på Liv-ex.</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-stone-600">
              Den mest likvide vej til “vin-eksponering”. Den er ikke det samme som at eje en kasse
              Bordeaux.
            </p>
          </article>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl border border-stone-200 bg-white shadow-sm ring-1 ring-stone-100">
          <table className="min-w-full text-left text-sm">
            <caption className="sr-only">Sammenligning af de tre veje til vininvestering</caption>
            <thead className="border-b border-stone-200 bg-stone-50 text-stone-600">
              <tr>
                <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                  Parameter
                </th>
                <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                  DIY
                </th>
                <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                  Managed
                </th>
                <th scope="col" className="px-4 py-3 font-medium sm:px-5">
                  Aktier/fonde
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 text-stone-700">
              <tr>
                <th scope="row" className="px-4 py-3 font-medium text-stone-900 sm:px-5">
                  Kontrol
                </th>
                <td className="px-4 py-3 sm:px-5">Højest</td>
                <td className="px-4 py-3 sm:px-5">Middel</td>
                <td className="px-4 py-3 sm:px-5">Lavest (ingen flaskeejerskab)</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-medium text-stone-900 sm:px-5">
                  Praktik
                </th>
                <td className="px-4 py-3 sm:px-5">Mest krævende</td>
                <td className="px-4 py-3 sm:px-5">Midt</td>
                <td className="px-4 py-3 sm:px-5">Nemmest</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-medium text-stone-900 sm:px-5">
                  Likviditet
                </th>
                <td className="px-4 py-3 sm:px-5">Ofte lavest</td>
                <td className="px-4 py-3 sm:px-5">Varierer</td>
                <td className="px-4 py-3 sm:px-5">Højest</td>
              </tr>
              <tr>
                <th scope="row" className="px-4 py-3 font-medium text-stone-900 sm:px-5">
                  Omkostninger
                </th>
                <td className="px-4 py-3 sm:px-5">Opbevaring, forsikring, handel</td>
                <td className="px-4 py-3 sm:px-5">1–2 % + kommission</td>
                <td className="px-4 py-3 sm:px-5">Kurtage / fondsomkostninger</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section id="faelder" className="mt-16 scroll-mt-24">
        <div className="max-w-3xl">
          <h2 className="text-2xl font-semibold text-stone-900">
            De skjulte fælder og regler
          </h2>
          <p className="mt-3 leading-relaxed text-stone-700">
            Tre punkter, der ofte overrasker danske privatpersoner — og som er vigtigere end
            “hvilken årgang er hot”.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-6">
            <h3 className="text-lg font-semibold text-stone-900">Skat i Danmark</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              Gevinster ved målrettet investering og spekulation i vin er skattepligtige.
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-stone-700">
              <li>Privat forbrug ≠ systematisk spekulation — grænsen er faktuel.</li>
              <li>Hold købspris, salgspris, omkostninger og dokumentation.</li>
              <li>Søg uvildig skatterådgivning ved væsentlige beløb.</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-6">
            <h3 className="text-lg font-semibold text-stone-900">Toldoplag vs. moms</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              Professionel investeringsvin handles og opbevares typisk i{" "}
              <strong className="font-medium text-stone-800">toldoplag</strong> — uden dansk moms.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              Køber du vin med{" "}
              <strong className="font-medium text-stone-800">dansk moms (25 %)</strong> i en almindelig
              butik, starter du med et moms-lag, der er svært at hente hjem via værdistigning alene.
            </p>
          </article>

          <article className="rounded-2xl border border-amber-200/80 bg-amber-50/60 p-6">
            <h3 className="text-lg font-semibold text-stone-900">Krav til emballage</h3>
            <p className="mt-3 text-sm leading-relaxed text-stone-700">
              Investeringsvin skal næsten altid ligge i originale, uåbnede trækasser —{" "}
              <strong className="font-medium text-stone-800">OWC (Original Wooden Case)</strong>.
            </p>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-stone-700">
              <li>Løse flasker falder drastisk i værdi.</li>
              <li>Skadet eller genpakket emballage svækker prisen.</li>
              <li>Provenance betyder mindst lige så meget som etiketten.</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-stone-200 bg-stone-50/80 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-stone-900">Tjekliste før du binder penge</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            "Kan pengene ligge i 10–15 år uden at du får brug for dem?",
            "Er vinen blandt den smalle del af markedet med reel efterspørgsel?",
            "Har du styr på opbevaring, forsikring og salgskanal — eller gebyrerne ved managed?",
            "Køber du uden unødig dansk moms (toldoplag), hvis det er fysisk vin?",
            "Ligger flaskerne i OWC med dokumenteret provenance?",
            "Har du talt med en uvildig rådgiver om skat og risiko?",
          ].map((item) => (
            <li
              key={item}
              className="flex gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm leading-relaxed text-stone-700"
            >
              <span className="mt-0.5 text-rose-900" aria-hidden>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-14 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100 sm:p-8">
        <h2 className="text-xl font-semibold text-stone-900">Ofte stillede spørgsmål</h2>
        <dl className="mt-5 space-y-5">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-stone-900">{item.question}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-stone-700 sm:text-base">
                {item.answer}
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-14 rounded-2xl border border-stone-200 bg-stone-50 p-6 text-stone-700 sm:p-8">
        <h2 className="text-lg font-semibold text-stone-900">Kort sagt</h2>
        <p className="mt-3 leading-relaxed">
          Vin er et alternativt, langsigtet aktiv for dem, der forstår udbud, tid og omkostninger.
          Under 0,1 % af verdens vin hører til den kategori. Brug denne hub som orientering — ikke
          som rådgivning. Vend tilbage til ansvarsfraskrivelsen øverst, før du træffer økonomiske
          beslutninger.
        </p>
        <p className="mt-3 text-sm text-stone-600">
          Lagrer du selv? Start med{" "}
          <Link href="/vinkoleskabe" className="font-medium text-rose-900 hover:underline">
            vinkøleskabe
          </Link>{" "}
          og{" "}
          <Link
            href="/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske"
            className="font-medium text-rose-900 hover:underline"
          >
            opbevaring og temperatur
          </Link>
          .
        </p>
      </section>

      <PartnerAdsLeaderboard className="mt-14" hub="investering" slug="investering-hub" />
    </PageShell>
  );
}
