import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { FaqJsonLd } from "@/components/json-ld";
import { ProductFeedPreview } from "@/components/product-feed-preview";
import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

const LAURIDSEN_MERCHANT = "Lauridsen Vine";
const SHOP_HREF = partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.lauridsenVine, "https://lauridsenvine.dk/");

export const metadata: Metadata = {
  title: "Lauridsen Vine — shop og inspiration | Vinbot",
  description:
    "Lauridsen Vine hos Vinbot: link til webshoppen (affiliate), nyhedsbrevs-rabat og udvalgte flasker fra feedet — før du handler, sammenlign gerne på forsøg.",
  alternates: { canonical: `${siteUrl}/lauridsen-vine` },
};

export default function LauridsenVinePage() {
  const faq = [
    {
      question: "Hvorfor linker Vinbot til Lauridsen Vine?",
      answer:
        "Vi samarbejder via Partner Ads: når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Vi linker kun, fordi sortimentet er relevant for læsere der søger vin fra mange europæiske regioner.",
    },
    {
      question: "Kan jeg få rabat?",
      answer:
        "Lauridsen Vine tilbyder ofte rabat via nyhedsbrev — se vores samlede oversigt under rabatkoder med opdaterede vilkår.",
    },
    {
      question: "Er priserne på Vinbot altid aktuelle?",
      answer:
        "Nej. Forslagene nedenfor kommer fra vores produktfeed og kan være forsinkede. Tjek altid pris, årgang og lager på lauridsenvine.dk.",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <FaqJsonLd items={faq} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/lauridsen-vine", label: "Lauridsen Vine" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Lauridsen Vine</h1>
      <p className="mt-4 text-lg text-stone-700">
        Stort sortiment med fokus på europæiske vine — et godt sted at browse, når du har læst en af vores{" "}
        <Link href="/regioner" className="text-rose-900 hover:underline">
          regionguides
        </Link>{" "}
        eller sammenligner priser i søgefeltet på forsiden.
      </p>

      <AffiliateDisclosure />

      <section className="mt-10 space-y-4 text-stone-800">
        <h2 className="text-2xl font-semibold text-stone-900">Gå til butikken</h2>
        <p>Åbner Lauridsen Vine i et nyt vindue med korrekt affiliate-sporing.</p>
        <a
          href={SHOP_HREF}
          target="_blank"
          rel="nofollow sponsored noopener noreferrer"
          className="inline-flex rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
        >
          Besøg Lauridsen Vine
        </a>
        <p className="text-sm text-stone-600">
          <Link href="/rabatkoder" className="text-rose-900 hover:underline">
            Rabatkoder og nyhedsbrev
          </Link>
          {" · "}
          <Link href="/" className="text-rose-900 hover:underline">
            Tilbage til søgning
          </Link>
        </p>
      </section>

      <section className="mt-14 space-y-8">
        <h2 className="text-2xl font-semibold text-stone-900">Eksempler fra feedet (kun Lauridsen)</h2>
        <p className="text-stone-700">
          Udvalgte flasker der matcher vores indeksering — brug søgning på forsiden for at sammenligne på tværs af forhandlere.
        </p>
        <ProductFeedPreview query="bourgogne bordeaux riesling" title="Regionklassikere hos Lauridsen" merchant={LAURIDSEN_MERCHANT} />
        <ProductFeedPreview query="champagne cava crémant" title="Bobler hos Lauridsen" merchant={LAURIDSEN_MERCHANT} />
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
        <Link href="/regioner" className="text-rose-900 hover:underline">
          Vinregioner
        </Link>
        {" · "}
        <Link href="/den-sidste-flaske" className="text-rose-900 hover:underline">
          Den Sidste Flaske
        </Link>
        {" · "}
        <Link href="/" className="text-rose-900 hover:underline">
          Forsiden
        </Link>
      </p>
    </div>
  );
}
