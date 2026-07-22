import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { FaqJsonLd, MerchantFeaturedProductsJsonLd } from "@/components/json-ld";
import { MerchantFeaturedPicks } from "@/components/merchant-featured-picks";
import { MerchantHubShopLink } from "@/components/merchant-hub-shop-link";
import { ProductFeedPreview } from "@/components/product-feed-preview";
import { getFeaturedPicksForMerchant } from "@/lib/merchant-featured-picks";
import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";
import { siteUrl } from "@/lib/site";
import { PageShell } from "@/components/page-shell";

export const dynamic = "force-dynamic";

const LAURIDSEN_MERCHANT = "Lauridsen Vine";
const SHOP_HREF = partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.lauridsenVine, "https://lauridsenvine.dk/");

export const metadata: Metadata = {
  title: "Lauridsen Vine — shop og inspiration | Vinbot",
  description:
    "Lauridsen Vine er en dansk vinwebshop med stærkt europæisk udvalg. Inspiration fra Vinbot: link til shoppen, rabat via nyhedsbrev og flasker du også kan finde via vores vinsøgning.",
  alternates: { canonical: `${siteUrl}/lauridsen-vine` },
};

export default function LauridsenVinePage() {
  const featuredPicks = getFeaturedPicksForMerchant("lauridsen-vine");
  const faq = [
    {
      question: "Hvorfor linker Vinbot til Lauridsen Vine?",
      answer:
        "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Vi linker, fordi sortimentet supplerer det, vores læsere søger efter: klassiske regioner, brede prislejer og et godt sted at browse videre efter en guide.",
    },
    {
      question: "Kan jeg få rabat?",
      answer:
        "Lauridsen Vine tilbyder ofte rabat via nyhedsbrev — se vores samlede oversigt under rabatkoder med opdaterede vilkår.",
    },
    {
      question: "Er priserne på Vinbot altid aktuelle?",
      answer:
        "Nej. Priser og årgange kan skifte hurtigt hos forhandleren. Brug altid lauridsenvine.dk som kilde til endelig pris, lager og levering — også for produkterne vi viser her.",
    },
  ];

  return (
    <PageShell className="py-10">
      <FaqJsonLd items={faq} />
      <MerchantFeaturedProductsJsonLd merchantId="lauridsen-vine" picks={featuredPicks} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/lauridsen-vine", label: "Lauridsen Vine" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Lauridsen Vine</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-700">
        Lauridsen Vine er en dansk vinhandler med et bredt europæisk sortiment — fra hverdagsvine til flasker du gemmer til weekend eller gæster. Mange læsere bruger dem som et naturligt næste skridt efter en af vores{" "}
        <Link href="/regioner" className="text-rose-900 hover:underline">
          regionguides
        </Link>
        , eller når de vil dykke ned i Bourgogne, Italien, Tyskland og de øvrige klassikere uden at starte fra nul.
      </p>
      <p className="mt-4 text-stone-700 leading-relaxed">
        Her på Vinbot sælger vi ikke vin selv — vi hjælper dig med at orientere dig og sammenligne idéer. Brug{" "}
        <Link href="/" className="font-medium text-rose-900 hover:underline">
          vinsøgningen på forsiden
        </Link>{" "}
        på tværs af flere forhandlere; på denne side er fokus kun på udvalg hos Lauridsen.
      </p>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100">
        <h2 className="text-lg font-semibold text-stone-900">Hvornår er Lauridsen et godt match?</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-700">
          <li>Du vil browse bredt i europæiske regioner og druer — ikke kun ét tema.</li>
          <li>Du vil kombinere inspiration fra Vinbot med en shop, der har mange flasker på hylden.</li>
          <li>Du vil holde øje med nyhedsbrev og kampagner (se også vores side med rabatkoder).</li>
        </ul>
        <p className="mt-4 text-sm text-stone-600">
          Til mad og stemning:{" "}
          <Link href="/guides/komplet-guide-til-vin-og-mad" className="font-medium text-rose-900 hover:underline">
            vin og mad-guiden
          </Link>
          ,{" "}
          <Link href="/guides/bobler-champagne-cava-prosecco-og-cremant" className="font-medium text-rose-900 hover:underline">
            bobler
          </Link>{" "}
          og{" "}
          <Link href="/mad-og-vin" className="font-medium text-rose-900 hover:underline">
            mad og vin
          </Link>
          .
        </p>
      </section>

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>

      <section className="mt-10 space-y-4 text-stone-800">
        <h2 className="text-2xl font-semibold text-stone-900">Gå til butikken</h2>
        <p>Åbner Lauridsen Vine i et nyt vindue — du handler og betaler altid hos dem.</p>
        <MerchantHubShopLink
          href={SHOP_HREF}
          merchant={LAURIDSEN_MERCHANT}
          slug="lauridsen-vine"
          className="inline-flex rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
        >
          Besøg Lauridsen Vine
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

      <MerchantFeaturedPicks merchantId="lauridsen-vine" picks={featuredPicks} />

      <section className="mt-14 space-y-10">
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">Udvalgte flasker hos Lauridsen</h2>
          <p className="mt-2 max-w-3xl text-stone-700">
            Et smagsprøve på udvalget med billede og pris — udvalget kan variere fra dag til dag. Vil du sammenligne på tværs af butikker, brug{" "}
            <Link href="/" className="font-medium text-rose-900 hover:underline">
              vinsøgningen på forsiden
            </Link>
            .
          </p>
        </div>
        <ProductFeedPreview
          queries={[
            "bourgogne bordeaux champagne pinot chardonnay riesling",
            "rioja barolo chianti tempranillo sangiovese",
            "sauvignon mosel alsace sancerre chenin",
          ]}
          title="Klassikere og vine til bordet"
          merchant={LAURIDSEN_MERCHANT}
          placement="lauridsen-page-table"
        />
        <ProductFeedPreview
          queries={["champagne cava crémant prosecco brut bobler", "sparkling franciacorta"]}
          title="Bobler og mousserende"
          merchant={LAURIDSEN_MERCHANT}
          placement="lauridsen-page-bubbles"
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
        <Link href="/winther-vin" className="text-rose-900 hover:underline">
          Winther Vin
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
        <Link href="/regioner" className="text-rose-900 hover:underline">
          Vinregioner
        </Link>
        {" · "}
        <Link href="/den-sidste-flaske" className="text-rose-900 hover:underline">
          Den Sidste Flaske
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
