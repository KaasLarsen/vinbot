import type { Metadata } from "next";
import Link from "next/link";
import { PriceRunnerProductWidget } from "@/components/pricerunner-product-widget";
import { ProductFeedPreview } from "@/components/product-feed-preview";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, FaqJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { ADTRACTION_JORGSHOLM_SHOP } from "@/lib/adtraction-links";
import { partnerAdsKlikUrl, PARTNER_ADS_KLIK_BANNERS } from "@/lib/partner-ads-links";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

const PAGE_TITLE = "Vinglas — vælg form, stil og mærke";
const PAGE_DESCRIPTION =
  "Find de rigtige vinglas: rød, hvid, champagne, universalglas og mærker som Spiegelau, Riedel, Zalto og Holmegaard. Købsguides, prissammenligning og produkter fra danske butikker.";
const PAGE_URL = `${siteUrl}/vinglas`;

const LFOR_LIVING_SHOP = partnerAdsKlikUrl(
  PARTNER_ADS_KLIK_BANNERS.lforLiving,
  "https://lforliving.dk/shop/",
);

const FAQ = [
  {
    question: "Skal man have forskellige glas til rød og hvid?",
    answer:
      "Det giver mening, hvis du drikker meget af begge dele: hvidvin holder temperaturen bedre i mindre volumen; kraftig rødvin åbner mere i en bred skål. Til hverdag rækker et godt universalglas til det meste — opgrader først, når du ved hvad du drikker oftest.",
  },
  {
    question: "Er dyre krystalglas (Riedel, Zalto) værd pengene?",
    answer:
      "Tynd læbe, klarhed og form betyder mere end logoet. Spiegelau og Luigi Bormioli dækker 90 % af hverdagsbehovet. Riedel giver drue-specifikke former; Zalto er ekstremt let og tyndt — luksus, ikke nødvendighed. Start midt i feltet og udvid, hvis du mærker forskellen.",
  },
  {
    question: "Flute eller tulip til champagne?",
    answer:
      "Flute bevarer brus og ser festlig ud. Tulip (bredere midte) giver mere aroma — mange foretrækker det til kvalitets-champagne og crémant. Coupé er mest æstetik; boblerne forsvinder hurtigere. Et godt hvidvinsglas virker også fint til bobler i hverdagen.",
  },
  {
    question: "Kan vinglas tåle opvaskemaskine?",
    answer:
      "Mange moderne krystalserier (fx Spiegelau) er designet til maskine — typisk øverste kurv, uden aggressive tabs der gør glassene matte. Håndvask og polering forlænger levetiden, især på meget tynde luksusglas som Zalto. Undgå parfumeret sæbe: residual duft dræber aroma.",
  },
  {
    question: "Er stilkeløse vinglas okay?",
    answer:
      "Ja til grill, picnic og casual servering. Til kølig hvidvin og bobler ved bordet er stilk stadig det bedre default — hånden varmer ellers skålen. Til rødvin omkring 14–16 °C er forskellen mindre kritisk.",
  },
  {
    question: "Hvor mange vinglas skal man have til middag?",
    answer:
      "Regn ét glas pr. gæst af den type I drikker, plus to ekstra til spild og genopfyldning. Til en middag for seks: typisk 6–8 ens rød- eller universalglas. Drikker I både rød og hvid, er 4 af hver ofte nok — eller ét sæt universalglas til begge.",
  },
  {
    question: "Hvor køber man vinglas med pris og billede?",
    answer:
      "På denne side viser vi glas fra LforLiving.dk, Likehome.dk og Jørgsholm, plus prissammenligning på konkrete modeller via PriceRunner. Klik videre til forhandleren for lager, fragt og aktuel pris.",
  },
];

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: { url: PAGE_URL },
};

/** Feed-preview under SSG overstiger ofte Vercels page-timeout. */
export const dynamic = "force-dynamic";

export default function VinglasPage() {
  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Vinglas", url: PAGE_URL },
        ]}
      />
      <FaqJsonLd items={FAQ} />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/vinglas", label: "Vinglas" }]} />

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-wider text-rose-900/85">Udstyr &amp; servering</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900 sm:text-[2.65rem] sm:leading-tight">
          Vinglas — form, aroma og det rigtige sæt
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">
          Glasset styrer, hvor koncentreret aromaen bliver, hvor hurtigt vinen iltes, og hvor længe{" "}
          <strong className="font-medium text-stone-800">hvidvin og bobler</strong> holder temperaturen. Her samler vi{" "}
          <strong className="font-medium text-stone-800">købsguides, produkter og prissammenligning</strong> — fra
          hverdags-Spiegelau til Riedel og Zalto.
        </p>
        <p className="mt-3 text-sm text-stone-700">
          Flasker søger du på forsiden; øvrigt gear ligger under{" "}
          <Link href="/vintilbehor" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4">
            vintilbehør
          </Link>
          . Sortimentet kommer især fra{" "}
          <a
            href={LFOR_LIVING_SHOP}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
          >
            LforLiving.dk
          </a>{" "}
          og{" "}
          <a
            href={ADTRACTION_JORGSHOLM_SHOP}
            target="_blank"
            rel="nofollow sponsored noopener noreferrer"
            className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
          >
            Jørgsholm →
          </a>
        </p>
      </header>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "Rødvinsglas",
            body: "Bourgogne vs Bordeaux — bred skål til pinot, højere tulip til cabernet.",
            href: "/guides/sadan-vaelger-du-roedvinsglas",
          },
          {
            title: "Hvidvinsglas",
            body: "Mindre volumen holder kulden — aromaer uden at varmen fra hånden ødelægger det.",
            href: "/guides/sadan-vaelger-du-hvidvinsglas",
          },
          {
            title: "Champagneglas",
            body: "Flute, tulip eller hvidvinsglas — brus vs. aroma til bobler.",
            href: "/guides/sadan-vaelger-du-champagneglas",
          },
          {
            title: "Mærker",
            body: "Spiegelau, Riedel, Zalto og Holmegaard — hvad forskellen egentlig koster.",
            href: "/guides/riedel-vs-zalto-vs-spiegelau-vinglas",
          },
        ].map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm ring-1 ring-stone-100 transition hover:border-rose-200 hover:shadow-md"
          >
            <h2 className="text-lg font-semibold text-stone-900">{card.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{card.body}</p>
            <span className="mt-3 inline-block text-sm font-medium text-rose-900">Læs guide →</span>
          </Link>
        ))}
      </section>

      <section className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { href: "/guides/sadan-vaelger-du-vinglas", title: "Start her", body: "Universal vs specialglas, stilk og kant." },
          { href: "/guides/glas-guiden", title: "Myter & snobberi", body: "Hvad glasset gør — og hvad der er grej." },
          { href: "/guides/vintilbehor-til-begyndere", title: "Startkit", body: "Glas + proptrækker først." },
          { href: "/guides/sadan-serverer-du-vin", title: "Servering", body: "Temperatur, skænkning og glas." },
          { href: "/guides/sadan-vaelger-du-vinkaraffel", title: "Karaffel", body: "Når glasset ikke er nok luft." },
          { href: "/guides/hvor-mange-glas-i-en-flaske-vin", title: "Glas pr. flaske", body: "Praktisk mængde til gæster." },
          { href: "/vintilbehor", title: "Alt vintilbehør", body: "Prop, køler, reol og mere." },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-xl border border-stone-200 bg-white p-4 text-stone-800 shadow-sm transition hover:border-rose-200 hover:shadow"
          >
            <p className="font-semibold text-stone-900">{c.title}</p>
            <p className="mt-1 text-sm text-stone-600">{c.body}</p>
          </Link>
        ))}
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-semibold text-stone-900">Hvad glasset egentlig gør</h2>
        <p className="mt-3 text-stone-700 leading-relaxed">
          Et vinglas er ikke magi — det er{" "}
          <strong className="font-medium text-stone-800">overflade, åbning og volumen</strong>. En bred skål giver mere
          luft: aroma stiger, og unge tanniner kan blødgøre lidt, mens vinen står i glasset. En smallere tulip samler
          duften tættere til næsen, så citrus, blomst eller peber ikke spredes tyndt i rummet.
        </p>
        <p className="mt-3 text-stone-700 leading-relaxed">
          <strong className="font-medium text-stone-800">Temperatur</strong> er den anden halvdel. Hvidvin og bobler
          serveres kølige; i et stort rødvinsglas stiger temperaturen hurtigere, og du fristes til at skænke for meget.
          Derfor er mindre volumen ofte bedre til hvid — ikke fordi rødvinsglas er &quot;forkert&quot;, men fordi kulden
          er en del af oplevelsen. Stilk holder hånden væk fra skålen; stilkeløst er fint til grill, men dårligere default
          til en kølig flaske ved middagsbordet.
        </p>
        <p className="mt-3 text-stone-700 leading-relaxed">
          Tynd læbe og klarhed påvirker mundfølelse mere end logoet. Et rent, tyndt Spiegelau-glas slår et snavset
          luksusglas hver gang. Er du i tvivl om, hvor meget specialglas betyder, så læs den ærlige myte-guide:{" "}
          <Link
            href="/guides/glas-guiden"
            className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
          >
            Glas-guiden
          </Link>
          .
        </p>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-semibold text-stone-900">Sådan bygger du et sæt</h2>
        <ol className="mt-4 list-decimal space-y-4 pl-5 text-stone-700 leading-relaxed">
          <li>
            <strong className="font-medium text-stone-900">Start med 4–6 ens universalglas</strong> (eller én rød-serie,
            hvis du næsten kun drikker rød). Det dækker hverdag, gæster og det meste af butikkens flasker. Se{" "}
            <Link
              href="/guides/sadan-vaelger-du-vinglas"
              className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
            >
              sådan vælger du vinglas
            </Link>
            .
          </li>
          <li>
            <strong className="font-medium text-stone-900">Tilføj rød eller hvid, når du kender mønsteret.</strong> Drikker
            du ofte pinot og cabernet, kan Bourgogne- vs. Bordeaux-form give mening — men først efter du har et
            hverdagssæt. Guiden til{" "}
            <Link
              href="/guides/sadan-vaelger-du-roedvinsglas"
              className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
            >
              rødvinsglas
            </Link>{" "}
            og{" "}
            <Link
              href="/guides/sadan-vaelger-du-hvidvinsglas"
              className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
            >
              hvidvinsglas
            </Link>{" "}
            går i dybden.
          </li>
          <li>
            <strong className="font-medium text-stone-900">Bobler og mærke til sidst.</strong> Flute eller tulip til fest;{" "}
            <Link
              href="/guides/sadan-vaelger-du-champagneglas"
              className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
            >
              champagneglas-guiden
            </Link>{" "}
            hjælper dig med valget. Opgrader til Riedel eller Zalto først, når du mærker forskellen — sammenligningen af{" "}
            <Link
              href="/guides/riedel-vs-zalto-vs-spiegelau-vinglas"
              className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4"
            >
              mærker
            </Link>{" "}
            viser, hvad forskellen egentlig koster.
          </li>
        </ol>
      </section>

      <section className="mt-14 space-y-10">
        <div id="roedvinsglas">
          <ProductFeedPreview
            searchScope="wine-glass"
            emptyLabel="rødvinsglas"
            queries={["rødvinsglas", "bordeauxglas", "bourgogneglas"]}
            title="Rødvinsglas"
            placement="vinglas-roed"
          />
        </div>
        <div id="hvidvinsglas">
          <ProductFeedPreview
            searchScope="wine-glass"
            emptyLabel="hvidvinsglas"
            query="hvidvinsglas"
            title="Hvidvinsglas"
            placement="vinglas-hvid"
          />
        </div>
        <div id="champagneglas">
          <ProductFeedPreview
            searchScope="wine-glass"
            emptyLabel="champagneglas"
            queries={["champagneglas", "flute"]}
            title="Champagneglas og flute"
            placement="vinglas-champagne"
          />
        </div>
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-semibold text-stone-900">Populære modeller — sammenlign priser</h2>
        <p className="mt-2 text-stone-700 leading-relaxed">
          Udvalgte glas med lager hos flere danske butikker via{" "}
          <strong className="font-medium text-stone-800">PriceRunner</strong> — det er{" "}
          <strong className="font-medium text-stone-800">annoncer</strong>. Tjek altid pakkestørrelse og fragt.
        </p>
        <PriceRunnerProductWidget
          productKey="spiegelau-definition-roedvinsglas"
          heading="Rødvinsglas — Spiegelau Definition"
          className="mt-6"
        />
        <PriceRunnerProductWidget
          productKey="spiegelau-authentis-roedvinsglas"
          heading="Rødvinsglas — Spiegelau Authentis (4 stk)"
          className="mt-8"
        />
        <PriceRunnerProductWidget
          productKey="spiegelau-definition-hvidvinsglas"
          heading="Hvidvinsglas — Spiegelau Definition"
          className="mt-8"
        />
        <PriceRunnerProductWidget
          productKey="spiegelau-lifestyle-hvidvinsglas"
          heading="Hvidvinsglas — Spiegelau LifeStyle (4 stk)"
          className="mt-8"
        />
        <PriceRunnerProductWidget
          productKey="spiegelau-authentis-champagneglas"
          heading="Champagneglas — Spiegelau Authentis (4 stk)"
          className="mt-8"
        />
        <PriceRunnerProductWidget
          productKey="riedel-vinum-bordeaux"
          heading="Riedel Vinum Bordeaux"
          className="mt-8"
        />
        <PriceRunnerProductWidget
          productKey="zalto-universal-denk-art"
          heading="Zalto Universal Denk'Art"
          className="mt-8"
        />
        <PriceRunnerProductWidget
          productKey="holmegaard-cabernet-roedvinsglas-6stk"
          heading="Holmegaard Cabernet (6 stk)"
          className="mt-8"
        />
      </section>

      <section className="mt-14 max-w-3xl">
        <h2 className="text-2xl font-semibold text-stone-900">Sådan vælger du — kort</h2>
        <ul className="mt-4 list-disc space-y-3 pl-5 text-stone-700 leading-relaxed">
          <li>
            <strong className="font-medium text-stone-900">Start med 4–6 ens glas.</strong> Universal eller én rød + én
            hvid-serie er nok, før du køber drue-specifikke modeller.
          </li>
          <li>
            <strong className="font-medium text-stone-900">Prioritér tynd læbe og klarhed</strong> frem for brand. Det
            påvirker mundfølelse mere end logoet.
          </li>
          <li>
            <strong className="font-medium text-stone-900">Stilk til kølig vin.</strong> Hvidvin og bobler mister friskhed
            hurtigere, når hånden varmer skålen.
          </li>
          <li>
            <strong className="font-medium text-stone-900">Vask uden parfume.</strong> Sæberester ødelægger aroma — skyl og
            polér, når det er vigtigt.
          </li>
        </ul>
      </section>

      <section className="mt-14 rounded-2xl border border-stone-200 bg-stone-50/80 p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-stone-900">Ofte stillede spørgsmål</h2>
        <dl className="mt-5 space-y-5">
          {FAQ.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-stone-900">{item.question}</dt>
              <dd className="mt-1 text-sm leading-relaxed text-stone-700 sm:text-base">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </PageShell>
  );
}
