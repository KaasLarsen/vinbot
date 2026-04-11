import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { FaqJsonLd } from "@/components/json-ld";
import { ProductFeedPreview } from "@/components/product-feed-preview";
import { AdSlot } from "@/components/ad-slot";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Den Sidste Flaske — guide, affiliate og lignende vine fra feeds",
  description:
    "Sådan arbejder Vinbot med Den Sidste Flaske uden produktfeed: redaktionel guide, FAQ og produktforslag fra andre Partner-Ads-forhandlere.",
  alternates: { canonical: `${siteUrl}/den-sidste-flaske` },
};

const DSF_SEARCH = "https://densidsteflaske.dk/search?q={q}&form_type=product&utf8=%E2%9C%93";

export default function DenSidsteFlaskePage() {
  const faq = [
    {
      question: "Hvorfor er der ikke Den Sidste Flaske-produkter i Vinbots søgning?",
      answer:
        "Vi henter produkter fra leverandør-feeds (Partner-Ads og udvalgte Daisycon-programmer). Den Sidste Flaske har ikke et tilsvarende feed koblet på løsningen endnu, så vi kan ikke vise live pris og lager som hos andre partnere.",
    },
    {
      question: "Hvordan støtter jeg alligevel samarbejdet?",
      answer:
        "Brug vores redaktionelle links til Den Sidste Flaske når du vil handle der. Samtidig viser vi 'lignende fund' fra feeds, så du kan sammenligne pris og udvalg hos andre forhandlere.",
    },
    {
      question: "Er priserne på Vinbot altid aktuelle?",
      answer:
        "Nej. Feeds opdateres med mellemrum og caches hos os i op til flere timer. Tjek altid slutpris, levering og årgang hos forhandleren.",
    },
  ];

  const exampleQ = "champagne";

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <FaqJsonLd items={faq} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/den-sidste-flaske", label: "Den Sidste Flaske" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Den Sidste Flaske og Vinbot</h1>
      <p className="mt-4 text-lg text-stone-700">
        Den Sidste Flaske er en vigtig kunde i vores økosystem — men uden produktfeed kan vi ikke automatisk vise deres sortiment side om side med øvrige forhandlere. Denne side er vores løsning: tydelig disclosure, dybdegående tekst for SEO, og konkrete alternativer fra feeds der ligner det, danskere ofte køber hos dem.
      </p>

      <AffiliateDisclosure />

      <section className="mt-10 space-y-4 text-stone-800">
        <h2 className="text-2xl font-semibold text-stone-900">Handel direkte hos Den Sidste Flaske</h2>
        <p>
          Brug deres egen søgning til at finde flasker, kampagner og limited releases. Vi linker med tydelig markering, så du ved, at du forlader Vinbot til fordel for forhandlerens site.
        </p>
        <a
          href={DSF_SEARCH.replace("{q}", encodeURIComponent(exampleQ))}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
        >
          Åbn søgning hos Den Sidste Flaske (eksempel: champagne)
        </a>
        <p className="text-sm text-stone-600">
          Udskift selv søgeordet på deres site — linket er kun et eksempel til bobler og fest. For generel inspiration, læs{" "}
          <Link href="/guides/humoer-stemning-og-vin" className="text-rose-900 hover:underline">
            humør og stemning
          </Link>{" "}
          og{" "}
          <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 hover:underline">
            vin og mad-guiden
          </Link>
          .
        </p>
      </section>

      <div className="mt-12">
        <AdSlot slot="placeholder-dsf-mid" />
      </div>

      <section className="mt-14 space-y-6">
        <h2 className="text-2xl font-semibold text-stone-900">Lignende fund i vores feeds</h2>
        <p className="text-stone-700">
          Mens vi venter på et muligt feed fra Den Sidste Flaske, kan du sammenligne udvalg og pris hos andre partnere. Visningen nedenfor er genereret live fra cachede feeds og opdateres løbende.
        </p>
        <ProductFeedPreview query="champagne cava prosecco bobler" title="Bobler og festlige vine" />
        <div className="mt-10">
          <ProductFeedPreview query="pinot noir bourgogne" title="Elegante røde — ofte populære til gave og bord" />
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">FAQ</h2>
        <dl className="mt-4 space-y-4">
          {faq.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-stone-900">{item.question}</dt>
              <dd className="mt-1 text-stone-700">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="mt-10 text-sm text-stone-600">
        Flere links:{" "}
        <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
          mad & vin
        </Link>
        ,{" "}
        <Link href="/regioner" className="text-rose-900 hover:underline">
          regioner
        </Link>
        ,{" "}
        <Link href="/" className="text-rose-900 hover:underline">
          forsiden med søgning
        </Link>
        .
      </p>
    </div>
  );
}
