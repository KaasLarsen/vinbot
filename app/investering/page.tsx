import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Vinbot Investor-Hub: Din uafhængige guide til vininvestering";
const PAGE_DESCRIPTION =
  "Uafhængig guide til vininvestering: hvorfor vin kan stige i værdi, DIY vs. investeringshuse vs. vin-aktier, samt skat, toldoplag og OWC-emballage i Danmark.";
const PAGE_URL = `${siteUrl}/investering`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

export default function InvesteringHubPage() {
  return (
    <PageShell variant="article" className="py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Investering", url: PAGE_URL },
        ]}
      />
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

      <h1 className="mt-8 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
        Vinbot Investor-Hub: Din uafhængige guide til vininvestering
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-700">
        Under 0,1 % af alverdens vin er egnet som investering. Resten er lavet til at blive drukket.
        Den forskel er afgørende, før du binder penge i flasker.
      </p>
      <p className="mt-3 leading-relaxed text-stone-700">
        Vin som investering er et <strong className="font-medium text-stone-800">alternativt aktiv</strong>.
        Det opfører sig anderledes end aktier og obligationer:
      </p>
      <ul className="mt-3 ml-5 list-disc space-y-2 text-stone-700 leading-relaxed">
        <li>Markedet er mindre likvidt.</li>
        <li>Priserne styres af udbud, årgangskvalitet og efterspørgsel blandt samlere.</li>
        <li>
          Afkastet afhænger ofte af tid, opbevaring og handelskanal — ikke af kvartalsregnskaber.
        </li>
      </ul>
      <p className="mt-3 leading-relaxed text-stone-700">
        Denne hub forklarer mekanismerne, de praktiske veje ind på markedet og de faldgruber, mange
        overser. Uden købsanbefalinger. Uden løfter om afkast.
      </p>

      <section className="mt-12 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">
          Mekanismerne – hvorfor stiger vin i værdi?
        </h2>

        <h3 className="pt-2 text-lg font-semibold text-stone-900">Det faldende udbud</h3>
        <p className="leading-relaxed">
          Når en årgang frigives, er der et fast antal flasker. Ingen flere. Flaskerne drikkes
          løbende. Hver gang en flaske åbnes, falder det tilbageværende udbud.
        </p>
        <p className="leading-relaxed">
          Over år bliver de bedste årgange sjældnere. Færre flasker i perfekt stand skærper
          konkurrencen blandt købere. Det er den grundlæggende udbudsmekanisme bag mange
          prisstigninger på investeringsvin.
        </p>

        <h3 className="pt-2 text-lg font-semibold text-stone-900">Den stigende kvalitet</h3>
        <p className="leading-relaxed">
          God investeringsvin er bygget til at udvikle sig i flasken. I 10, 20 eller 30 år kan aroma,
          struktur og kompleksitet forbedres.
        </p>
        <p className="leading-relaxed">
          Når vinen nærmer sig sit drikkevindue, stiger efterspørgslen typisk:
        </p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>Samlere vil have flasker i topstand.</li>
          <li>Restauranter og auktioner søger modne flasker.</li>
          <li>Det begrænsede udbud møder mere købekraft.</li>
        </ul>
        <p className="leading-relaxed">
          Kombinationen — bedre vin + færre flasker — er kernen i værdipotentialet. Den gælder kun
          for vine med dokumenteret lagringsevne og efterspørgsel. Ikke for almindelig hverdagsvin.
        </p>

        <h3 className="pt-2 text-lg font-semibold text-stone-900">Tidshorisont</h3>
        <p className="leading-relaxed">
          Vin er et <strong className="font-medium text-stone-800">langsigtet aktiv</strong>. Pengene
          bør som udgangspunkt bindes i{" "}
          <strong className="font-medium text-stone-800">10–15 år</strong>.
        </p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>Kort tidshorisont passer dårligt til fysisk vin.</li>
          <li>Handelsomkostninger, opbevaring og gebyrer æder hurtige handler.</li>
          <li>Markedet kan svinge i årevis uden at følge aktieindeks.</li>
        </ul>
        <p className="leading-relaxed">
          Hvis du kan få brug for pengene snart, er fysisk vininvestering sjældent det rigtige
          værktøj.
        </p>
      </section>

      <section className="mt-12 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">
          De 3 veje til markedet
        </h2>
        <p className="leading-relaxed">
          Privatpersoner bruger typisk én af tre tilgange. De løser forskellige behov — og har
          forskellige omkostninger.
        </p>

        <h3 className="pt-2 text-lg font-semibold text-stone-900">
          1. Gør-det-selv (fysiske flasker)
        </h3>
        <p className="leading-relaxed">Du køber selv vinen og ejer flaskerne direkte.</p>
        <p className="font-medium text-stone-800">Fordel</p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>Fuld kontrol over valg, timing og salg.</li>
        </ul>
        <p className="font-medium text-stone-800">Ulemper</p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>Kræver professionel, temperaturstyret opbevaring.</li>
          <li>Kræver forsikring.</li>
          <li>
            Kræver adgang til handelskanaler (fx Liv-ex eller auktioner), hvis du vil sælge
            professionelt igen.
          </li>
        </ul>
        <p className="leading-relaxed">
          Gør-det-selv passer dig, der allerede forstår markedet — og har styr på logistikken. Uden
          korrekt opbevaring mister flaskerne hurtigt både drikkekvalitet og handelsværdi.
        </p>

        <h3 className="pt-2 text-lg font-semibold text-stone-900">
          2. Investeringshuse (managed)
        </h3>
        <p className="leading-relaxed">
          Du skyder penge ind hos specialiserede huse, der køber, opbevarer og håndterer det
          praktiske.
        </p>
        <p className="font-medium text-stone-800">Fordele</p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>Bekvemt: du slipper for køleskab, toldpapir og logistik.</li>
          <li>Vinen ligger typisk på professionelle toldoplag.</li>
        </ul>
        <p className="font-medium text-stone-800">Ulemper</p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>
            Årlige administrationsgebyrer — typisk omkring{" "}
            <strong className="font-medium text-stone-800">1–2 %</strong>.
          </li>
          <li>Kommission ved salg.</li>
          <li>Du er afhængig af husets due diligence, gennemsigtighed og likviditet.</li>
        </ul>
        <p className="leading-relaxed">
          Læs altid vilkår, gebyrstruktur og exit-muligheder, før du binder kapital. Sammenlign den
          samlede omkostning over 10–15 år — ikke kun startgebyret.
        </p>

        <h3 className="pt-2 text-lg font-semibold text-stone-900">3. Vin-aktier og fonde</h3>
        <p className="leading-relaxed">
          Du investerer i vinkonglomerater (fx LVMH) eller spiritusproducenter via en almindelig
          børsmægler som Nordnet.
        </p>
        <p className="font-medium text-stone-800">Fordele</p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>Ekstremt høj likviditet — kan sælges på sekunder.</li>
          <li>Ingen fysisk opbevaring, forsikring eller toldoplag.</li>
          <li>Let at holde i en almindelig portefølje.</li>
        </ul>
        <p className="font-medium text-stone-800">Ulemper</p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>Du ejer ikke fysisk vin.</li>
          <li>Kurserne følger det generelle aktiemarked tæt.</li>
          <li>
            Du får eksponering mod virksomhedens indtjening — ikke direkte mod en flaskes
            markedspris på Liv-ex.
          </li>
        </ul>
        <p className="leading-relaxed">
          Denne vej er ofte den mest likvide måde at få “vin-eksponering” på. Den er ikke det samme
          som at eje en kasse Bordeaux.
        </p>

        <h3 className="pt-2 text-lg font-semibold text-stone-900">Hurtig sammenligning</h3>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>
            <strong className="font-medium text-stone-800">Kontrol:</strong> DIY højest → managed
            middel → aktier/fonde lavest (ingen flaskeejerskab).
          </li>
          <li>
            <strong className="font-medium text-stone-800">Praktik:</strong> Aktier/fonde nemmest →
            managed midt → DIY mest krævende.
          </li>
          <li>
            <strong className="font-medium text-stone-800">Likviditet:</strong> Aktier/fonde højest →
            managed varierer → DIY ofte lavest.
          </li>
          <li>
            <strong className="font-medium text-stone-800">Omkostninger:</strong> DIY
            (opbevaring/forsikring/handel) vs. managed (1–2 % + kommission) vs. aktier
            (kurtage/fondsomkostninger).
          </li>
        </ul>
      </section>

      <section className="mt-12 space-y-4 text-stone-700">
        <h2 className="text-xl font-semibold text-stone-900 sm:text-2xl">
          De skjulte fælder og regler
        </h2>

        <h3 className="pt-2 text-lg font-semibold text-stone-900">Skat i Danmark</h3>
        <p className="leading-relaxed">
          Gevinster ved målrettet investering og spekulation i vin er skattepligtige.
        </p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>
            Køb til eget forbrug og senere salg af overskud er ikke det samme som systematisk
            spekulation — men grænsen afgøres af faktiske forhold.
          </li>
          <li>Hold styr på købspris, salgspris, omkostninger og dokumentation.</li>
          <li>
            Søg uvildig skatterådgivning, hvis beløbene er væsentlige. Vinbot giver ikke skatteråd.
          </li>
        </ul>

        <h3 className="pt-2 text-lg font-semibold text-stone-900">
          Toldoplag vs. dansk moms
        </h3>
        <p className="leading-relaxed">
          Professionel investeringsvin handles og opbevares typisk i{" "}
          <strong className="font-medium text-stone-800">toldoplag</strong> — uden dansk moms.
        </p>
        <p className="leading-relaxed">
          Hvis du køber vin med{" "}
          <strong className="font-medium text-stone-800">dansk moms (25 %)</strong> i en almindelig
          butik, starter du med et moms-lag, der er svært at hente hjem via værdistigning alene. For
          investeringsformål er momsbelagt hyldevin derfor ofte op ad bakke sammenlignet med
          toldoplagsvin.
        </p>

        <h3 className="pt-2 text-lg font-semibold text-stone-900">Krav til emballage</h3>
        <p className="leading-relaxed">
          Investeringsvin skal næsten altid ligge i sine originale, uåbnede trækasser —{" "}
          <strong className="font-medium text-stone-800">OWC (Original Wooden Case)</strong>.
        </p>
        <ul className="ml-5 list-disc space-y-2 leading-relaxed">
          <li>Løse flasker falder drastisk i investeringsværdi.</li>
          <li>Skadet, mangelfuld eller genpakket emballage svækker handelsprisen.</li>
          <li>
            Provenance (dokumenteret opbevaringshistorik) betyder mindst lige så meget som
            etiketten.
          </li>
        </ul>
        <p className="leading-relaxed">
          Kort sagt: en flot flaske uden korrekt kasse og historik er ofte drikkeken — ikke
          investeringsvare.
        </p>
      </section>

      <section className="mt-12 rounded-2xl border border-stone-200 bg-stone-50 p-6 text-stone-700">
        <h2 className="text-lg font-semibold text-stone-900">Kort sagt</h2>
        <p className="mt-3 leading-relaxed">
          Vin er et alternativt, langsigtet aktiv for dem, der forstår udbud, tid og omkostninger.
          Under 0,1 % af verdens vin hører til den kategori. Brug denne hub som orientering — ikke
          som rådgivning. Vend tilbage til ansvarsfraskrivelsen øverst, før du træffer økonomiske
          beslutninger.
        </p>
      </section>
    </PageShell>
  );
}
