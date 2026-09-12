import type { WineDetailPage } from "@/lib/wine-detail-pages/types";
import { getMerchantWineConfig } from "@/lib/wine-detail-pages/merchants";
import type { PlaCatalogItem } from "./types";

function shopHost(shopUrl: string, fallback: string): string {
  try {
    return new URL(shopUrl).hostname.replace(/^www\./, "");
  } catch {
    return fallback;
  }
}

function metaDescription(item: PlaCatalogItem): string {
  const cfg = getMerchantWineConfig(item.merchantId);
  const fromDesc = item.description.replace(/\s+/g, " ").trim();
  if (fromDesc.length >= 80) return fromDesc.slice(0, 155);
  return `${item.title} hos ${cfg.displayName}. Se pris og gå til butikken via Vinbot — du handler altid hos ${cfg.displayName}.`.slice(
    0,
    155,
  );
}

export function plaItemToWineDetail(item: PlaCatalogItem): WineDetailPage {
  const cfg = getMerchantWineConfig(item.merchantId);
  const host = shopHost(item.shopUrl, cfg.shopBaseUrl.replace(/^https?:\/\//, "").replace(/\/$/, ""));
  const desc = item.description.trim();
  const body: string[] = [];
  body.push(
    `${item.title} sælges hos ${cfg.displayName}. Vinbot viser flasken med vejledende pris, så du kan klikke «Gå til butik» og købe direkte hos forhandleren.`,
  );
  if (desc.length > 40) {
    body.push(desc.slice(0, 1200));
  } else {
    body.push(
      `Bekræft altid årgang, flaskestørrelse, lager og endelig pris på ${host}, inden du lægger i kurven. Priser i feedet kan være et øjebliksbillede.`,
    );
  }
  if (item.category) {
    body.push(`Kategori i butikkens feed: ${item.category}.`);
  }
  body.push(
    `Vinbot sælger ikke vin. Knappen «Gå til butik» åbner ${cfg.displayName} i et nyt vindue via affiliate-link — typisk uden merpris for dig.`,
  );

  const specs = [
    { label: "Forhandler", value: cfg.displayName },
    ...(item.brand ? [{ label: "Brand / producent", value: item.brand }] : []),
    ...(item.category ? [{ label: "Kategori", value: item.category.slice(0, 120) }] : []),
    { label: "Vejledende pris", value: `${Math.round(item.price)} kr.` },
    ...(item.referencePrice != null && item.referencePrice > item.price
      ? [{ label: "Før-pris", value: `${Math.round(item.referencePrice)} kr.` }]
      : []),
    ...(item.discountPercent != null ? [{ label: "Rabat", value: `${item.discountPercent} %` }] : []),
  ];

  return {
    merchantId: item.merchantId,
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
      heading: `Køb hos ${cfg.displayName}`,
      bullets: [
        `Klik «Gå til butik» for at åbne produktsiden hos ${cfg.displayName}.`,
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
