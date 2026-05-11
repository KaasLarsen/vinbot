import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { FaqJsonLd } from "@/components/json-ld";
import { ProductFeedPreview } from "@/components/product-feed-preview";
import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const MERCHANT_FEED = "DH Wines";
const SHOP_HREF = partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.dhWines, "https://dhwines.dk/");

export const metadata: Metadata = {
  title: "DH Wines — shop og inspiration | Vinbot",
  description:
    "DH Wines: dansk vinwebshop med håndplukket udvalg til mad og hverdag. Link til shoppen fra Vinbot (affiliate), rabatter via nyhedsbrev og vine fra vores vinsøgning.",
  alternates: { canonical: `${siteUrl}/dh-wines` },
};

export default function DhWinesPage() {
  const faq = [
    {
      question: "Hvorfor linker Vinbot til DH Wines?",
      answer:
        "Vi samarbejder via Partner-Ads: provision kan tilfalde Vinbot efter klik — typisk uden merpris for dig. DH Wines passer til læsere, der vil have et kurateret udvalg med fokus på madvenlige og hverdagsvenlige flasker.",
    },
    {
      question: "Kan jeg få rabat?",
      answer:
        "Se rabatkoder — DH Wines tilbyder ofte rabat via nyhedsbrev. Følg dhwines.dk for aktuelle vilkår.",
    },
    {
      question: "Er priserne på Vinbot altid aktuelle?",
      answer:
        "Nej. Brug altid dhwines.dk som autoritativ kilde til pris, lager og levering.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <FaqJsonLd items={faq} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/dh-wines", label: "DH Wines" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">DH Wines</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-700">
        DH Wines er en dansk netbutik med et <strong>håndplukket sortiment</strong> — oplagt når du har læst en af vores{" "}
        <Link href="/guides/komplet-guide-til-vin-og-mad" className="text-rose-900 hover:underline">
          guider til vin og mad
        </Link>{" "}
        og vil finde konkrete flasker, der matcher bordet i hverdagen eller til weekendens menu.
      </p>
      <p className="mt-4 leading-relaxed text-stone-700">
        Vinbot sælger ikke vin. Brug{" "}
        <Link href="/" className="font-medium text-rose-900 hover:underline">
          vinsøgningen på forsiden
        </Link>{" "}
        til at sammenligne pris på tværs; her dykker vi ned i DH Wines.
      </p>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100">
        <h2 className="text-lg font-semibold text-stone-900">Hvornår er DH Wines et godt match?</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-700">
          <li>Du vil have et overskueligt, kurateret udvalg frem for uendelige hylder.</li>
          <li>Du leder efter vine til mad, gæster eller hverdag uden at starte forfra i hver kategori.</li>
          <li>Du vil kombinere Vinbots inspiration med én dedikeret dansk shop.</li>
        </ul>
        <p className="mt-4 text-sm text-stone-600">
          <Link href="/mad-og-vin" className="font-medium text-rose-900 hover:underline">
            Mad og vin
          </Link>
          {" · "}
          <Link href="/saeson" className="font-medium text-rose-900 hover:underline">
            Sæson
          </Link>
        </p>
      </section>

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>

      <section className="mt-10 space-y-4 text-stone-800">
        <h2 className="text-2xl font-semibold text-stone-900">Gå til butikken</h2>
        <p>Åbner DH Wines i et nyt vindue — du handler og betaler altid hos dem.</p>
        <a
          href={SHOP_HREF}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
        >
          Besøg DH Wines
        </a>
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

      <section className="mt-14 space-y-10">
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">Udvalgte vine hos DH Wines</h2>
          <p className="mt-2 max-w-3xl text-stone-700">
            Et udsnit fra vores produktfeed — udvalg og priser kan skifte dag til dag.
          </p>
        </div>
        <ProductFeedPreview
          queries={[
            "pinot noir gamay chianti",
            "chardonnay sauvignon riesling hvidvin",
            "italien frankrig spanien hverdag",
          ]}
          title="Smagsprøve på sortimentet"
          merchant={MERCHANT_FEED}
          placement="dh-wines-page-table"
        />
        <ProductFeedPreview
          queries={["champagne brut cava prosecco", "rosé provence"]}
          title="Bobler og rosé"
          merchant={MERCHANT_FEED}
          placement="dh-wines-page-bubbles"
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
    </div>
  );
}
