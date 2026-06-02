import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { FaqJsonLd } from "@/components/json-ld";
import { MerchantHubShopLink } from "@/components/merchant-hub-shop-link";
import { ProductFeedPreview } from "@/components/product-feed-preview";
import { HAVNENS_VIN_SHOP_HREF } from "@/lib/daisycon-links";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

/** Daisycon-feed — merchant-navn skal matche præcist i produktkort. */
const MERCHANT_FEED = "Havnens Vin";
const SHOP_HREF = HAVNENS_VIN_SHOP_HREF;

export const metadata: Metadata = {
  title: "Havnens Vin — shop og inspiration | Vinbot",
  description:
    "Havnens Vin: dansk vin- og spiritusforhandler med bredt sortiment. Link til shoppen fra Vinbot (affiliate via Daisycon), og vine du finder i vores søgning og vin-katalog.",
  alternates: { canonical: `${siteUrl}/havnens-vin` },
};

export default function HavnensVinPage() {
  const faq = [
    {
      question: "Hvorfor linker Vinbot til Havnens Vin?",
      answer:
        "Vi samarbejder via Daisycon: provision kan tilfalde Vinbot ved køb efter klik — typisk uden merpris for dig. Havnens Vin passer til læsere, der vil handle hos en etableret dansk forhandler med både hverdagsvine og mere sjældne flasker.",
    },
    {
      question: "Kan jeg se Havnens Vin i Vinbots vin-katalog?",
      answer:
        "Ja. Flasker fra feedet indgår i vinsøgningen og under /vine, når de matcher vores vinfiltre — sammenlign pris og forhandler der.",
    },
    {
      question: "Er priserne på Vinbot altid aktuelle?",
      answer:
        "Nej. Brug altid havnens-vin.dk som autoritativ kilde til pris, lager og levering.",
    },
  ];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <FaqJsonLd items={faq} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/havnens-vin", label: "Havnens Vin" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Havnens Vin</h1>
      <p className="mt-4 text-lg leading-relaxed text-stone-700">
        Havnens Vin er en dansk forhandler med <strong>vin, bobler og spiritus</strong> — oplagt når du har fundet retning i vores{" "}
        <Link href="/guides" className="text-rose-900 hover:underline">
          guider
        </Link>{" "}
        og vil se konkrete flasker hos én shop.
      </p>
      <p className="mt-4 leading-relaxed text-stone-700">
        Vinbot sælger ikke vin. Brug{" "}
        <Link href="/" className="font-medium text-rose-900 hover:underline">
          vinsøgningen på forsiden
        </Link>{" "}
        eller{" "}
        <Link href="/vine" className="font-medium text-rose-900 hover:underline">
          vin-kataloget
        </Link>{" "}
        til at sammenligne på tværs; her fokuserer vi på Havnens Vin.
      </p>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100">
        <h2 className="text-lg font-semibold text-stone-900">Hvornår er Havnens Vin et godt match?</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-700">
          <li>Du vil handle hos en dansk webshop med bred vifte af flasker og bobler.</li>
          <li>Du har set en flaske i Vinbots katalog og vil købe den hos dem.</li>
          <li>Du vil udforske sortimentet direkte på havnens-vin.dk.</li>
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
        <p>Åbner Havnens Vin i et nyt vindue — du handler og betaler altid hos dem.</p>
        <MerchantHubShopLink
          href={SHOP_HREF}
          merchant={MERCHANT_FEED}
          slug="havnens-vin"
          className="inline-flex rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
        >
          Besøg Havnens Vin
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

      <section className="mt-14 space-y-10">
        <div>
          <h2 className="text-2xl font-semibold text-stone-900">Udvalgte vine hos Havnens Vin</h2>
          <p className="mt-2 max-w-3xl text-stone-700">
            Fra vores Daisycon-feed (vist som «Havnens Vin» i data). Udvalget varierer — sammenlign gerne i{" "}
            <Link href="/vine" className="font-medium text-rose-900 hover:underline">
              vin-kataloget
            </Link>
            .
          </p>
        </div>
        <ProductFeedPreview
          queries={["bourgogne pinot noir", "champagne brut prosecco", "riesling alsace"]}
          title="Smagsprøve på sortimentet"
          merchant={MERCHANT_FEED}
          placement="havnens-vin-page-table"
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
        <Link href="/vine" className="text-rose-900 hover:underline">
          Vin-katalog
        </Link>
        {" · "}
        <Link href="/" className="text-rose-900 hover:underline">
          Forsiden
        </Link>
      </p>
    </div>
  );
}
