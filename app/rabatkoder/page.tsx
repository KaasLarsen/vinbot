import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { BreadcrumbJsonLd, WebPageJsonLd } from "@/components/json-ld";
import { ADTRACTION_VINKOELSKABET_SHOP } from "@/lib/adtraction-links";
import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Rabatkoder til vin — partnertilbud";
const PAGE_DESCRIPTION =
  "Rabatkoder og nyhedsbreve: Lauridsen Vine, Beer Me, Johnsen Wine, Mere om Vin, Winther Vin, Winefriends, DH Wines, SPS Wine, Vinkøleskabet.dk m.fl. Affiliate-links markeres med *. Tjek vilkår hos butikken.";
const PAGE_URL = `${siteUrl}/rabatkoder`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
};

type RabatEntry = {
  title: string;
  body: string;
  /** Vises i monospace så koden er nem at kopiere */
  code?: string;
};

type RabatPartner = {
  name: string;
  /** Butikkens URL (vises ikke som link — brug affiliateHref til shop) */
  shopUrl: string;
  /** Affiliate-destination (Partner-Ads klikbanner eller Adtraction m.m.) */
  affiliateHref: string;
  /** Hvilket netværk der tracker klik (oplysningspligt / gennemsigtighed) */
  affiliateVia: "partner-ads" | "adtraction";
  entries: RabatEntry[];
  footnote?: string;
};

const PARTNERE: RabatPartner[] = [
  {
    name: "Lauridsen Vine",
    shopUrl: "https://lauridsenvine.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.lauridsenVine, "https://lauridsenvine.dk/"),
    entries: [
      {
        title: "Nyhedsbrev",
        body: "**10% rabat** når du tilmelder dig **nyhedsbrevet** hos Lauridsen Vine. Tilmelding og vilkår foregår på deres webshop.",
      },
    ],
  },
  {
    name: "Beer Me",
    shopUrl: "https://www.beer-me.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.beerMeShop, "https://www.beer-me.dk/"),
    entries: [
      {
        title: "Nyhedsbrev",
        body: "**10% rabat** når du tilmelder dig **nyhedsbrevet** hos Beer Me (vin, øl og mere på webshoppen). Tilmelding sker på deres site.",
      },
    ],
  },
  {
    name: "Johnsen Wine",
    shopUrl: "https://www.johnsenwine.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.johnsenWine, "https://www.johnsenwine.dk/"),
    entries: [
      {
        title: "Nyhedsbrev",
        body: "**10% rabat** når du tilmelder dig **nyhedsbrevet** hos Johnsen Wine. Tilmelding og vilkår på johnsenwine.dk.",
      },
    ],
  },
  {
    name: "Mere om Vin",
    shopUrl: "https://mereomvin.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.mereOmVin, "https://mereomvin.dk/"),
    entries: [
      {
        title: "Nyhedsbrev",
        body: "**10% rabat** når du tilmelder dig **nyhedsbrevet** hos Mere om Vin. Tilmelding og vilkår på mereomvin.dk.",
      },
    ],
  },
  {
    name: "Winther Vin",
    shopUrl: "https://winthervin.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.wintherVin, "https://winthervin.dk/"),
    entries: [
      {
        title: "Nyhedsbrev",
        body: "**10% rabat** når du tilmelder dig **nyhedsbrevet** hos Winther Vin. Tilmelding og vilkår på winthervin.dk.",
      },
    ],
  },
  {
    name: "Winefriends",
    shopUrl: "https://winefriends.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.winefriends, "https://winefriends.dk/"),
    entries: [
      {
        title: "Nyhedsbrev",
        body: "**10% rabat** når du tilmelder dig **nyhedsbrevet** hos Winefriends. Tilmelding og vilkår på winefriends.dk.",
      },
    ],
  },
  {
    name: "DH Wines",
    shopUrl: "https://dhwines.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.dhWines, "https://dhwines.dk/"),
    entries: [
      {
        title: "100 kr. rabat",
        code: "PA10024",
        body: "Angiv koden i kurven på **hele shoppen** — tjek eventuelle undtagelser på dhwines.dk.",
      },
      {
        title: "5% rabat",
        code: "PA524",
        body: "Angiv koden i kurven — **5% rabat** på hele shoppen.",
      },
    ],
  },
  {
    name: "SPS Wine",
    shopUrl: "https://www.spswine.dk/",
    affiliateVia: "partner-ads",
    affiliateHref: partnerAdsKlikUrl(PARTNER_ADS_KLIK_BANNERS.spsWine, "https://www.spswine.dk/"),
    entries: [
      {
        title: "12% rabat",
        code: "YTAK9M8B",
        body: "Gælder **produkterne** i shoppen. **Rabatkoden kan ikke kombineres** med andre rabatkoder — se fulde vilkår på spswine.dk.",
      },
    ],
  },
  {
    name: "Vinkøleskabet.dk",
    shopUrl: "https://www.vinkoleskabet.dk/",
    affiliateVia: "adtraction",
    affiliateHref: ADTRACTION_VINKOELSKABET_SHOP,
    entries: [
      {
        title: "Shop — vinkøleskabe",
        body:
          "**Vinkøleskabet.dk** sælger vinkøleskabe og tilbehør. Priser, levering og kundeservice er på deres webshop. Nedenfor går **“Gå til shop”** via **Adtraction** — et affiliate-link: Vinbot kan modtage provision, **uden merpris for dig**.",
      },
    ],
    footnote:
      "Linket er et affiliate-link formidlet via Adtraction (affiliatenetværk). Køb og vilkår er hos Vinkøleskabet.dk; klik kan spores til provision for Vinbot — se også under Affiliate-links på siden Privatliv.",
  },
];

function RichLine({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <p className="mt-2 text-stone-700 leading-relaxed">
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-stone-900">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </p>
  );
}

export default function RabatkoderPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <BreadcrumbJsonLd
        items={[
          { name: "Forside", url: `${siteUrl}/` },
          { name: "Rabatkoder", url: PAGE_URL },
        ]}
      />
      <WebPageJsonLd name={PAGE_TITLE} description={PAGE_DESCRIPTION} url={PAGE_URL} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/rabatkoder", label: "Rabatkoder" }]} />
      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">Rabatkoder og partnertilbud</h1>
      <p className="mt-4 text-lg text-stone-700">
        Her samler vi <strong className="font-semibold text-stone-900">rabatkoder</strong>,{" "}
        <strong className="font-semibold text-stone-900">kampagnekoder</strong> og{" "}
        <strong className="font-semibold text-stone-900">nyhedsbreve med rabat</strong> fra vinforhandlere, vi samarbejder med. Listen
        udvides løbende — kom tilbage eller bookmark siden.
      </p>
      <p className="mt-3 text-sm text-stone-600">
        <strong className="font-medium text-stone-800">Vigtigt:</strong> Tilbud og koder kan ændre sig eller udløbe. Læs altid de aktuelle betingelser på forhandlerens egen side før du betaler.
      </p>

      <div className="mt-8">
        <AffiliateDisclosure />
      </div>

      <p className="mt-4 text-xs text-stone-500">
        * Shop-links markeret med stjerne er <strong className="font-medium text-stone-700">affiliate-links</strong>. De går via{" "}
        <strong className="font-medium text-stone-700">Partner-Ads</strong> eller <strong className="font-medium text-stone-700">Adtraction</strong>{" "}
        (angivet under hver butik) og kan udløse provision til Vinbot <strong className="font-medium text-stone-700">uden merpris for dig</strong>.
      </p>

      <ul className="mt-10 space-y-6">
        {PARTNERE.map((p) => (
          <li key={p.name} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <h2 className="text-xl font-semibold text-stone-900">{p.name}</h2>
              <div className="flex shrink-0 flex-col items-end gap-1 text-right">
                <a
                  href={p.affiliateHref}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  className="text-rose-900 underline decoration-rose-300 underline-offset-4 hover:text-rose-950"
                >
                  Gå til shop * →
                </a>
                <span className="text-xs text-stone-500">
                  Via {p.affiliateVia === "adtraction" ? "Adtraction" : "Partner-Ads"}
                </span>
              </div>
            </div>
            <div className="mt-4 space-y-5 border-t border-stone-100 pt-4">
              {p.entries.map((e, idx) => (
                <div key={`${p.name}-${e.title}-${e.code ?? idx}`}>
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-stone-500">{e.title}</h3>
                  {e.code ? (
                    <p className="mt-2">
                      <code className="rounded-lg border border-stone-200 bg-stone-50 px-3 py-1.5 font-mono text-base font-semibold tracking-wide text-stone-900">
                        {e.code}
                      </code>
                    </p>
                  ) : null}
                  <RichLine text={e.body} />
                </div>
              ))}
            </div>
            {p.footnote ? <p className="mt-3 text-sm text-stone-500">{p.footnote}</p> : null}
          </li>
        ))}
      </ul>

      <section className="mt-12 rounded-2xl border border-stone-200 bg-stone-50/80 p-6">
        <h2 className="text-lg font-semibold text-stone-900">Sådan får du mest ud af koderne</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-stone-700">
          <li>Kopier koden præcis — store og små bogstaver kan betyde noget.</li>
          <li>Tjek om koden gælder hele shoppen eller undtagelser (fx allerede nedsatte varer).</li>
          <li>Sammenlign med fri fragt: nogle gange er en anden kode + fragt billigere.</li>
        </ul>
        <p className="mt-4 text-sm text-stone-600">
          Flere tips til netkøb:{" "}
          <Link href="/guides/koeb-vin-online-sadan-holder-du-styr-paa-det" className="font-medium text-rose-900 hover:underline">
            køb vin online
          </Link>
          . Søg priser på tværs på{" "}
          <Link href="/" className="font-medium text-rose-900 hover:underline">
            forsiden
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
