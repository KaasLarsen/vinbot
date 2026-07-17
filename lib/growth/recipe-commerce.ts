import { listWineDetailPagesForGuide } from "@/lib/wine-detail-pages/registry";
import type { WineDetailPage } from "@/lib/wine-detail-pages/types";

/** Opskrift → guides der bruges til at finde kuraterede enkeltvin-sider. */
const RECIPE_GUIDE_SLUGS: Record<string, readonly string[]> = {
  "coq-au-vin": ["vin-til-gryderet", "vin-til-kylling", "vin-til-fransk-mad"],
  "boeuf-bourguignon": ["vin-til-gryderet", "vin-til-oksekoed", "vin-til-fransk-mad"],
  "braiseret-lammeskank-med-rodvin": ["vin-til-gryderet", "vin-til-lam"],
  "braiseret-oksekaebe-med-rodvin": ["vin-til-gryderet", "vin-til-oksekoed"],
  "svinekaebber-i-rodvinssky": ["vin-til-gryderet", "vin-til-svinekoed"],
  "chorizo-i-rodvin": ["vin-til-tapas", "vin-til-spansk-mad"],
  "champignons-al-ajillo-med-hvidvin": ["vin-til-tapas", "vin-til-spansk-mad"],
  "estofado-oksestuvning-i-rodvin": ["vin-til-gryderet", "vin-til-spansk-mad"],
  "spansk-koedboller-i-rodvinsauce": ["vin-til-tapas", "vin-til-spansk-mad"],
  "risotto-med-rodvin-barolo": ["vin-til-risotto", "vin-til-italiensk-mad"],
  "figner-og-dadler-i-rodvin": ["vin-til-tapas", "vin-til-dessert"],
  "roedvinsgele-til-charcuteri": ["vin-til-ost-og-ostebord", "vin-til-tapas"],
  "lasagne-med-rodvin": ["vin-til-lasagne", "vin-til-pizza-og-pasta", "vin-til-italiensk-mad"],
  "peberboef-med-rodvinsauce": ["vin-til-oksekoed", "vin-til-boeff", "vin-til-gryderet"],
  "roedkaal-med-rodvin": ["vin-til-julefrokost", "vin-til-flaesketesteg", "vin-til-and"],
  "bolognese-med-rodvin": ["sangiovese-til-pasta", "vin-til-lasagne", "vin-til-pizza-og-pasta"],
  "kyllingefilet-i-rodvin-med-svampe": ["vin-til-kylling-og-lyst-koed", "vin-til-gryderet"],
  "groenlangkaal-med-hvidvin": ["vin-til-julefrokost", "vin-til-flaesketesteg"],
  "oksesuppe-med-rodvin": ["vin-til-gryderet", "vin-til-oksekoed", "vin-til-suppe"],
  "tarteletter-i-hvidvin": ["vin-til-tarteletter", "vin-til-kylling-og-lyst-koed"],
  "tomatsauce-med-rodvin-til-pizza": ["vin-til-pizza-og-pasta", "rodvin-til-pizza", "sangiovese-til-pasta"],
  "kartoffelgratin-med-hvidvin": ["vin-til-kartoffelmad", "vin-til-julefrokost", "vin-til-vegetar-og-gront"],
  "porchetta-med-hvidvin": ["vin-til-italiensk-mad", "vin-til-grill-og-bbq", "vin-til-svinekoed"],
  "wok-kylling-med-hvidvin": ["vin-til-wok", "vin-til-kylling-og-lyst-koed", "vin-til-krydret-og-staerk-mad"],
  "fiskefrikadeller-i-hvidvinsauce": ["vin-til-fisk-og-skaldyr", "vin-til-julefrokost"],
  "cote-de-boeuf-med-rodvin": ["vin-til-boeff", "vin-til-oksekoed", "vin-til-grill-og-bbq"],
  "paella-med-rodvin": ["vin-til-spansk-mad", "vin-til-risotto", "vin-til-grill-og-bbq"],
  "svinekam-med-rodvin": ["vin-til-svinekoed", "vin-til-grill-og-bbq", "vin-til-julefrokost"],
  "gravad-laks-med-hvidvin": ["vin-til-fisk-og-skaldyr", "vin-til-julefrokost", "vin-til-nytaar-og-nytaarsmenu"],
  "kyllingesuppe-med-hvidvin": ["vin-til-suppe", "vin-til-kylling-og-lyst-koed"],
  "lammekoteletter-i-rodvin": ["vin-til-lam", "vin-til-grill-og-bbq"],
  "svinefilet-i-rodvinssauce": ["vin-til-svinekoed", "vin-til-oksekoed"],
  "stuvet-kylling-med-hvidvin": ["vin-til-kylling-og-lyst-koed", "vin-til-gryderet"],
  "pasta-puttanesca-med-rodvin": ["sangiovese-til-pasta", "vin-til-pizza-og-pasta", "vin-til-italiensk-mad"],
  "rodspette-med-hvidvin": ["vin-til-fisk-og-skaldyr"],
  "champignonsuppe-med-hvidvin": ["vin-til-suppe", "vin-til-vegetar-og-gront"],
  "braiseret-kylling-med-rodvin": ["vin-til-gryderet", "vin-til-kylling-og-lyst-koed", "vin-til-fransk-mad"],
  "entrecote-med-rodvinsmarinade": ["vin-til-boeff", "vin-til-grill-og-bbq", "vin-til-oksekoed"],
  "rodvinsmarinade-til-oksekod": ["vin-til-grill-og-bbq", "vin-til-boeff", "vin-til-oksekoed"],
  "kylling-piccata-med-hvidvin": ["vin-til-kylling-og-lyst-koed", "vin-til-italiensk-mad"],
  "pasta-amatriciana-med-rodvin": ["sangiovese-til-pasta", "vin-til-pizza-og-pasta", "vin-til-italiensk-mad"],
  "fennikelkylling-med-hvidvin": ["vin-til-kylling-og-lyst-koed", "vin-til-italiensk-mad"],
  "svineribs-med-rodvin": ["vin-til-grill-og-bbq", "vin-til-svinekoed"],
  "sellerisuppe-med-hvidvin": ["vin-til-suppe", "vin-til-vegetar-og-gront"],
  "oksesteg-med-rodvin": ["vin-til-oksekoed", "vin-til-boeff", "vin-til-julefrokost"],
  "poelser-i-rodvinsglace": ["vin-til-poelser-og-kartoffel", "vin-til-kartoffelmad"],
  "roedgroed-med-portvin": ["vin-til-roedgroed", "vin-til-dessert-og-kransekage"],
  "kalkunsteg-med-hvidvin": ["vin-til-kalkun", "vin-til-julemad-den-store-guide", "vin-til-kylling-og-lyst-koed"],
  "hummer-i-hvidvinsauce": ["vin-til-hummer", "vin-til-fisk-og-skaldyr"],
  "lammesteg-med-rodvin-rosmarin": ["vin-til-paaske-og-paaskefrokost", "vin-til-lam", "vin-til-gryderet"],
  "kartoffelmos-med-hvidvin": ["vin-til-kartoffelmad", "vin-til-poelser-og-kartoffel"],
  "kartoffelsalat-med-hvidvin": ["vin-til-salat", "vin-til-kartoffelmad", "vin-til-poelser-og-kartoffel", "vin-til-sommer"],
  "enchiladas-med-rodvin": ["vin-til-mexicansk-mad", "vin-til-tacos", "vin-til-nachos"],
  "thai-gron-karry-med-hvidvin": ["vin-til-thai-mad", "vin-til-krydret-og-staerk-mad", "vin-til-karryretter"],
  "shepherd-pie-med-rodvin": ["vin-til-brittisk-mad", "vin-til-lam", "vin-til-gryderet"],
  "bun-cha-med-hvidvin": ["vin-til-vietnamesisk-mad", "vin-til-asiatisk-mad", "vin-til-pho"],
  "kung-pao-kylling-med-hvidvin": ["vin-til-kinesisk-mad", "vin-til-krydret-og-staerk-mad", "vin-til-wok"],
  "pulled-pork-med-rodvin": ["vin-til-grill-og-bbq", "vin-til-spareribs", "vin-til-svinekoed"],
  "aebleskiver-med-hvidvin": ["vin-til-aebleskiver", "vin-til-fastelavn", "vin-til-julemad-den-store-guide"],
  "karbonader-i-hvidvinsauce": ["vin-til-frikadeller", "vin-til-smorrebrod"],
  "torsk-i-rodvinsauce": ["vin-til-torsk", "vin-til-fisk-og-skaldyr"],
  "persillesovs-med-hvidvin": ["vin-til-stegt-flaesk", "vin-til-kartoffelmad"],
  "brune-kartoffler-med-rodvin": ["vin-til-kartoffelmad", "vin-til-julefrokost", "vin-til-mortensaften"],
  "rejesalat-med-hvidvin": ["vin-til-rejer", "vin-til-smorrebrod", "vin-til-sommer", "vin-til-fisk-og-skaldyr"],
  "koldskal-med-hvidvin": ["vin-til-koldskaal", "vin-til-sommer", "vin-til-dessert-og-kransekage"],
  "morbradgryde-med-hvidvin": ["vin-til-svinekoed", "vin-til-gryderet"],
  "biksemad-med-rodvin": ["vin-til-oksekoed", "vin-til-gryderet"],
};

function guidesFromTags(tags: string[]): string[] {
  const t = new Set(tags.map((x) => x.toLowerCase()));
  const out: string[] = [];
  if (t.has("tapas") || t.has("spansk")) out.push("vin-til-tapas");
  if (t.has("fransk") || t.has("gryderet")) out.push("vin-til-gryderet");
  if (t.has("italiensk")) out.push("vin-til-italiensk-mad", "vin-til-risotto");
  if (t.has("rødvin") || t.has("rodvin")) out.push("vin-til-gryderet");
  if (t.has("hvidvin")) out.push("vin-til-fisk-og-skaldyr");
  if (t.has("dessert")) out.push("vin-til-dessert");
  if (t.has("julemad")) out.push("vin-til-julefrokost");
  if (t.has("pasta")) out.push("vin-til-lasagne", "vin-til-pizza-og-pasta");
  if (t.has("hverdag") || t.has("dansk")) out.push("vin-til-oksekoed");
  if (out.length === 0) out.push("komplet-guide-til-vin-og-mad");
  return out;
}

export function guideSlugsForRecipe(slug: string, tags: string[], relatedGuides: string[] = []): string[] {
  const set = new Set<string>([...(RECIPE_GUIDE_SLUGS[slug] ?? []), ...relatedGuides, ...guidesFromTags(tags)]);
  return [...set];
}

/** Kuraterede enkeltvin-sider til opskrift — DSF først, derefter øvrige forhandlere. */
export function listWineDetailPagesForRecipe(
  slug: string,
  tags: string[],
  relatedGuides: string[] = [],
  limit = 3,
): readonly WineDetailPage[] {
  const guideSlugs = guideSlugsForRecipe(slug, tags, relatedGuides);
  const seen = new Set<string>();
  const pages: WineDetailPage[] = [];

  for (const guideSlug of guideSlugs) {
    for (const p of listWineDetailPagesForGuide(guideSlug, limit)) {
      const key = `${p.merchantId}:${p.slug}`;
      if (seen.has(key)) continue;
      seen.add(key);
      pages.push(p);
    }
  }

  pages.sort((a, b) => {
    if (a.merchantId === "den-sidste-flaske" && b.merchantId !== "den-sidste-flaske") return -1;
    if (b.merchantId === "den-sidste-flaske" && a.merchantId !== "den-sidste-flaske") return 1;
    return 0;
  });

  return pages.slice(0, limit);
}
