import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { DsfFeaturedProductsJsonLd, FaqJsonLd } from "@/components/json-ld";
import { DsfFeaturedPicks } from "@/components/dsf-featured-picks";
import { ProductFeedPreview } from "@/components/product-feed-preview";
import { dsfFeaturedPicks } from "@/lib/dsf-featured";
import { partnerAdsDsfClickUrl, siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Den Sidste Flaske — inspiration og gode køb | Vinbot",
  description:
    "Kurateret side om Den Sidste Flaske: idéer til flasker, link til butikken og inspiration fra andre anbefalede forhandlere.",
  alternates: { canonical: `${siteUrl}/den-sidste-flaske` },
};

const DSF_SEARCH = "https://densidsteflaske.dk/search?q={q}&form_type=product&utf8=%E2%9C%93";

export default function DenSidsteFlaskePage() {
  const exampleQ = "champagne";
  const dsfExampleSearchUrl = DSF_SEARCH.replace("{q}", encodeURIComponent(exampleQ));
  /** Samme Partner-Ads-klik som DSF-produktkort (banner 68720). */
  const dsfExampleSearchAffiliateHref = partnerAdsDsfClickUrl(dsfExampleSearchUrl);

  const faq = [
    {
      question: "Hvor finder jeg hele sortimentet fra Den Sidste Flaske?",
      answer:
        "Det bedste overblik får du direkte på deres egen webshop. Her på Vinbot samler vi inspiration, guider og forslag — og linker tydeligt videre, når du vil handle hos dem.",
    },
    {
      question: "Kan jeg sammenligne med andre butikker?",
      answer:
        "Ja. Brug vores vinsøgning på forsiden til at se forslag fra flere forhandlere med billede og pris — så kan du danne dig et indtryk, før du vælger, hvor du handler.",
    },
    {
      question: "Er priserne her altid 100 % aktuelle?",
      answer:
        "Priser og tilbud skifter hos butikkerne. Brug altid forhandlerens egen side som udgangspunkt for endelig pris, levering og årgang.",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <DsfFeaturedProductsJsonLd picks={dsfFeaturedPicks} />
      <FaqJsonLd items={faq} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/den-sidste-flaske", label: "Den Sidste Flaske" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Den Sidste Flaske</h1>
      <p className="mt-4 text-lg text-stone-700">
        Vi anbefaler Den Sidste Flaske som en af landets stærkeste destinationer for vin. Her på Vinbot får du inspiration, læsning og
        konkrete idéer — og du hopper nemt videre til deres butik, når du er klar til at købe.
      </p>

      <AffiliateDisclosure />

      <section className="mt-10 space-y-4 text-stone-800">
        <h2 className="text-2xl font-semibold text-stone-900">Gå direkte til butikken</h2>
        <p>
          Find kampagner, limited releases og hele deres sortiment på deres egen side. Linket åbner i et nyt vindue — du handler altid hos
          forhandleren.
        </p>
        <a
          href={dsfExampleSearchAffiliateHref}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
        >
          Søg hos Den Sidste Flaske (eksempel: champagne)
        </a>
        <p className="text-sm text-stone-600">
          Du kan frit vælge søgeord på deres site. Til stemning og mad, læs{" "}
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

      <DsfFeaturedPicks picks={dsfFeaturedPicks} />

      <section className="mt-14 space-y-6">
        <h2 className="text-2xl font-semibold text-stone-900">Måske finder du også…</h2>
        <p className="text-stone-700">
          Inspiration fra andre gode forhandlere — samme idé som ovenfor, med billeder og priser du kan klikke videre på.
        </p>
        <ProductFeedPreview query="champagne cava prosecco bobler" title="Bobler og festlige vine" />
        <div className="mt-10">
          <ProductFeedPreview query="pinot noir bourgogne" title="Elegante røde til gave og bord" />
        </div>
      </section>

      <section className="mt-14 rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Ofte stillede spørgsmål</h2>
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
        <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
          Mad & vin
        </Link>
        {" · "}
        <Link href="/regioner" className="text-rose-900 hover:underline">
          Regioner
        </Link>
        {" · "}
        <Link href="/" className="text-rose-900 hover:underline">
          Forsiden
        </Link>
      </p>
    </div>
  );
}
