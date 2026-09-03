import type { WineDetailPage } from "@/lib/wine-detail-pages/types";
import type { PlaCatalogItem } from "./types";

function metaDescription(item: PlaCatalogItem): string {
  const fromDesc = item.description.replace(/\s+/g, " ").trim();
  if (fromDesc.length >= 80) return fromDesc.slice(0, 155);
  return `${item.title} hos SPS Wine. Se pris og gå til butikken via Vinbot — du handler altid hos SPS Wine.`.slice(
    0,
    155,
  );
}

export function spsPlaItemToWineDetail(item: PlaCatalogItem): WineDetailPage {
  const desc = item.description.trim();
  const body: string[] = [];
  body.push(
    `${item.title} sælges hos SPS Wine. Vinbot viser flasken med vejledende pris, så du kan klikke «Gå til butik» og købe direkte hos forhandleren.`,
  );
  if (desc.length > 40) {
    body.push(desc.slice(0, 1200));
  } else {
    body.push(
      "Bekræft altid årgang, flaskestørrelse, lager og endelig pris på spswine.dk, inden du lægger i kurven. Priser i feedet kan være et øjebliksbillede.",
    );
  }
  if (item.category) {
    body.push(`Kategori i butikkens feed: ${item.category}.`);
  }
  body.push(
    "Vinbot sælger ikke vin. Knappen «Gå til butik» åbner SPS Wine i et nyt vindue via affiliate-link — typisk uden merpris for dig.",
  );

  const specs = [
    { label: "Forhandler", value: "SPS Wine" },
    ...(item.brand ? [{ label: "Brand / producent", value: item.brand }] : []),
    ...(item.category ? [{ label: "Kategori", value: item.category.slice(0, 120) }] : []),
    { label: "Vejledende pris", value: `${Math.round(item.price)} kr.` },
  ];

  return {
    merchantId: "sps-wine",
    slug: item.slug,
    displayTitle: item.title,
    metaDescription: metaDescription(item),
    productPageUrl: item.shopUrl,
    imageUrl: item.imageUrl,
    listPrice: item.price,
    priceCurrency: item.currency,
    structuredDescriptionSnippet: (desc || metaDescription(item)).slice(0, 240),
    primaryCtaLabel: "Gå til butik",
    imageAside: {
      heading: "Køb hos SPS Wine",
      bullets: [
        "Klik «Gå til butik» for at åbne produktsiden hos SPS Wine.",
        "Pris og lager tjekkes altid i butikken, før du betaler.",
        "Vinbot er et hobbyprojekt og sælger ikke selv vin.",
      ],
      footnote: "Affiliate-link: vi kan modtage provision ved køb — uden merpris for dig.",
    },
    bodyParagraphs: body,
    specs,
    guideRefs: [{ slug: "komplet-guide-til-vin-og-mad" }],
  };
}
