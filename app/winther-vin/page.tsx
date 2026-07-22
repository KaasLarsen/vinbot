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
import { PageShell } from "@/components/page-shell";

export const dynamic = "force-dynamic";

const MERCHANT_FEED = "Winther Vin";
const SHOP_HREF = partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.wintherVin, "https://winthervin.dk/");

export const metadata: Metadata = {
  title: "Winther Vin — shop og inspiration | Vinbot",
  description:
    "Winther Vin: dansk vinwebshop med fokus på kvalitet, kampagner og mulighed for at blande kassen. Link til shoppen fra Vinbot, nyhedsbrev og vine fra vores vinsøgning.",
  alternates: { canonical: `${siteUrl}/winther-vin` },
};

export default function WintherVinPage() {
  const featuredPicks = getFeaturedPicksForMerchant("winther-vin");
  const faq = [
    {
      question: "Hvorfor linker Vinbot til Winther Vin?",
      answer:
        "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Winther Vin matcher læsere, der vil browse kampagner, smagskasser og et bredt sortiment med jævnlige tilbud.",
    },
    {
      question: "Kan jeg få rabat?",
      answer:
        "Se rabatkoder — Winther Vin tilbyder ofte rabat via nyhedsbrev og kører kampagner på webshoppen. Vilkår og aktuelle tilbud findes på winthervin.dk.",
    },
    {
      question: "Er priserne på Vinbot altid aktuelle?",
      answer:
        "Nej. Brug altid winthervin.dk som kilde til endelig pris, lager, levering og kampagner.",
    },
  ];

  return (
    <PageShell className="py-10">
      <FaqJsonLd items={faq} />
      <MerchantFeaturedProductsJsonLd merchantId="winther-vin" picks={featuredPicks} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/winther-vin", label: "Winther Vin" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Winther Vin</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-700">
        Winther Vin er en dansk vinforhandler med både fysisk butik og webshop — kendt for et <strong>stort sortiment</strong>, <strong>kampagner</strong> og mulighed for at{" "}
        <strong>blande din egen kasse</strong> i stedet for kun at købe én vin i seks eksemplarer. Et naturligt næste skridt efter vores{" "}
        <Link href="/mad-og-vin" className="text-rose-900 hover:underline">
          mad- og vin-inspiration
        </Link>{" "}
        eller når du har fundet en drue i{" "}
        <Link href="/druesorter" className="text-rose-900 hover:underline">
          drueoversigten
        </Link>
        .
      </p>
      <p className="mt-4 leading-relaxed text-stone-700">
        Vinbot sælger ikke vin. Brug{" "}
        <Link href="/" className="font-medium text-rose-900 hover:underline">
          vinsøgningen
        </Link>{" "}
        til at sammenligne på tværs; denne side samler kontekst om Winther Vin.
      </p>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100">
        <h2 className="text-lg font-semibold text-stone-900">Hvornår er Winther Vin et godt match?</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-700">
          <li>Du vil shoppe kampagner, nyhedsbrev og smagskasser.</li>
          <li>Du vil samle en kasse med forskellige flasker til en samlet pris-logik.</li>
          <li>Du vil udforske både hverdags- og festvine fra kendte vinlande.</li>
        </ul>
        <p className="mt-4 text-sm text-stone-600">
          <Link href="/guides/bobler-champagne-cava-prosecco-og-cremant" className="font-medium text-rose-900 hover:underline">
            Bobler og mousserende
          </Link>
          {" · "}
          <Link href="/rabatkoder" className="font-medium text-rose-900 hover:underline">
            Rabatkoder
          </Link>
        </p>
      </section>

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>

      <section className="mt-10 space-y-4 text-stone-800">
        <h2 className="text-2xl font-semibold text-stone-900">Gå til butikken</h2>
        <p>Åbner Winther Vin i et nyt vindue — du handler og betaler altid hos dem.</p>
        <MerchantHubShopLink
          href={SHOP_HREF}
          merchant={MERCHANT_FEED}
          slug="winther-vin"
          className="inline-flex rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
        >
          Besøg Winther Vin
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

      <MerchantFeaturedPicks merchantId="winther-vin" picks={featuredPicks} />

      <section className="mt-14 space-y-10">
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">Udvalgte vine hos Winther Vin</h2>
          <p className="mt-2 max-w-3xl text-stone-700">
            Fra vores produktfeed — udvalget skifter. Vil du sammenligne med andre butikker, brug{" "}
            <Link href="/" className="font-medium text-rose-900 hover:underline">
              forsiden
            </Link>
            .
          </p>
        </div>
        <ProductFeedPreview
          queries={[
            "bourgogne bordeaux rioja pinot shiraz",
            "champagne cava prosecco crémant brut",
            "chardonnay sauvignon riesling",
          ]}
          title="Klassikere og fest"
          merchant={MERCHANT_FEED}
          placement="winther-vin-page-table"
        />
        <ProductFeedPreview
          queries={["champagne brut rosé mousserende", "prosecco cava crémant"]}
          title="Bobler og mousserende"
          merchant={MERCHANT_FEED}
          placement="winther-vin-page-bubbles"
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
        <Link href="/dh-wines" className="text-rose-900 hover:underline">
          DH Wines
        </Link>
        {" · "}
        <Link href="/johnsen-wine" className="text-rose-900 hover:underline">
          Johnsen Wine
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
    </PageShell>
  );
}
