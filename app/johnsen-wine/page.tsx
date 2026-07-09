import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { FaqJsonLd, MerchantFeaturedProductsJsonLd } from "@/components/json-ld";
import { MerchantFeaturedPicks } from "@/components/merchant-featured-picks";
import { MerchantHubShopLink } from "@/components/merchant-hub-shop-link";
import { ProductFeedPreview } from "@/components/product-feed-preview";
import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";
import { getFeaturedPicksForMerchant } from "@/lib/merchant-featured-picks";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

/** Partner-feed bruger «Johnsen Vine» som merchant-navn — skal matche præcist for produktkort. */
const MERCHANT_FEED = "Johnsen Vine";
const SHOP_HREF = partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.johnsenWine, "https://www.johnsenwine.dk/");

export const metadata: Metadata = {
  title: "Johnsen Wine — shop og inspiration | Vinbot",
  description:
    "Johnsen Wine: vinforhandler med fokus på kurateret sortiment og personlig service. Link til shoppen fra Vinbot (affiliate), nyhedsbrev-rabatter og produkter du også finder i vores vinsøgning.",
  alternates: { canonical: `${siteUrl}/johnsen-wine` },
};

export default function JohnsenWinePage() {
  const featuredPicks = getFeaturedPicksForMerchant("johnsen-wine");
  const faq = [
    {
      question: "Hvorfor linker Vinbot til Johnsen Wine?",
      answer:
        "Vi samarbejder via Partner-Ads: provision kan tilfalde Vinbot ved køb efter klik — typisk uden merpris for dig. Johnsen Wine passer til læsere, der vil dykke ned i et kurateret udvalg og handle hos en etableret forhandler med stærkt fokus på vinoplevelse.",
    },
    {
      question: "Kan jeg få rabat?",
      answer:
        "Se rabatkoder — Johnsen Wine tilbyder ofte rabat via nyhedsbrev. Aktuelle vilkår og koder ligger på johnsenwine.dk.",
    },
    {
      question: "Er priserne på Vinbot altid aktuelle?",
      answer:
        "Nej. Brug altid johnsenwine.dk som autoritativ kilde til pris, lager og levering.",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <FaqJsonLd items={faq} />
      <MerchantFeaturedProductsJsonLd merchantId="johnsen-wine" picks={featuredPicks} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/johnsen-wine", label: "Johnsen Wine" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Johnsen Wine</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-700">
        Johnsen Wine er en dansk vinforhandler med <strong>kurateret sortiment</strong> og stærkt fokus på kvalitet og vejledning — et oplagt sted at fortsætte, når du har fundet retning i en af vores{" "}
        <Link href="/druesorter" className="text-rose-900 hover:underline">
          drue- eller regionguides
        </Link>
        , og vil se konkrete flasker hos én shop.
      </p>
      <p className="mt-4 leading-relaxed text-stone-700">
        Vinbot sælger ikke vin. Brug{" "}
        <Link href="/" className="font-medium text-rose-900 hover:underline">
          vinsøgningen på forsiden
        </Link>{" "}
        til at sammenligne på tværs; her fokuserer vi på Johnsen Wine.
      </p>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100">
        <h2 className="text-lg font-semibold text-stone-900">Hvornår er Johnsen Wine et godt match?</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-700">
          <li>Du vil dykke ned i et udvalg, der er sammensat med vinoplevelse for øje.</li>
          <li>Du følger med i nyhedsbrev, smagninger og kampagner (se rabatkoder).</li>
          <li>Du vil gå fra Vinbots overblik til at handle hos én seriøs forhandler.</li>
        </ul>
        <p className="mt-4 text-sm text-stone-600">
          <Link href="/bedste-vine" className="font-medium text-rose-900 hover:underline">
            Bedste vine
          </Link>
          {" · "}
          <Link href="/regioner" className="font-medium text-rose-900 hover:underline">
            Regioner
          </Link>
        </p>
      </section>

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>

      <section className="mt-10 space-y-4 text-stone-800">
        <h2 className="text-2xl font-semibold text-stone-900">Gå til butikken</h2>
        <p>Åbner Johnsen Wine i et nyt vindue — du handler og betaler altid hos dem.</p>
        <MerchantHubShopLink
          href={SHOP_HREF}
          merchant={MERCHANT_FEED}
          slug="johnsen-wine"
          className="inline-flex rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
        >
          Besøg Johnsen Wine
        </MerchantHubShopLink>
        <p className="text-sm text-stone-600">
          <Link href="/rabatkoder" className="text-rose-900 hover:underline">
            Rabatkoder og nyhedsbrev
          </Link>
          {" · "}
          <Link href="/" className="text-rose-900 hover:underline">
            Tilbage til vinsøgning
          </Link>
        </p>
      </section>

      <MerchantFeaturedPicks merchantId="johnsen-wine" picks={featuredPicks} />

      <section className="mt-14 space-y-10">
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">Udvalgte vine hos Johnsen Wine</h2>
          <p className="mt-2 max-w-3xl text-stone-700">
            Fra vores produktfeed (vist som «Johnsen Vine» i data). Udvalget varierer — sammenlign gerne på{" "}
            <Link href="/" className="font-medium text-rose-900 hover:underline">
              forsiden
            </Link>
            .
          </p>
        </div>
        <ProductFeedPreview
          queries={[
            "bourgogne champagne pinot chardonnay",
            "italien barolo sangiovese",
            "riesling mosel alsace",
          ]}
          title="Smagsprøve på sortimentet"
          merchant={MERCHANT_FEED}
          placement="johnsen-wine-page-table"
        />
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
        <Link href="/lauridsen-vine" className="text-rose-900 hover:underline">
          Lauridsen Vine
        </Link>
        {" · "}
        <Link href="/winther-vin" className="text-rose-900 hover:underline">
          Winther Vin
        </Link>
        {" · "}
        <Link href="/dh-wines" className="text-rose-900 hover:underline">
          DH Wines
        </Link>
        {" · "}
        <Link href="/havnens-vin" className="text-rose-900 hover:underline">
          Havnens Vin
        </Link>
        {" · "}
        <Link href="/rabatkoder" className="text-rose-900 hover:underline">
          Rabatkoder
        </Link>
        {" · "}
        <Link href="/" className="text-rose-900 hover:underline">
          Forsiden
        </Link>
      </p>
    </div>
  );
}
