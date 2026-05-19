import type { NextConfig } from "next";

/** 301/308 fra det gamle statiske site (/pages/...) til App Router. Første match vinder. */
const legacyRedirects: { source: string; destination: string }[] = [
  // Hub-lignende forsider
  { source: "/pages/vin-til", destination: "/guides/komplet-guide-til-vin-og-mad" },
  { source: "/pages/vin-til/", destination: "/guides/komplet-guide-til-vin-og-mad" },
  { source: "/pages/blog", destination: "/mad-og-vin" },
  { source: "/pages/blog/", destination: "/mad-og-vin" },
  { source: "/pages/druer", destination: "/druesorter" },
  { source: "/pages/druer/", destination: "/druesorter" },
  { source: "/pages/anbefalinger", destination: "/den-sidste-flaske" },
  { source: "/pages/anbefalinger/", destination: "/den-sidste-flaske" },

  // Statiske sider
  { source: "/pages/om-os.html", destination: "/om-os" },
  { source: "/pages/kontakt.html", destination: "/kontakt" },

  // Blog → nærmeste guide (prioriteret ift. Search Console)
  {
    source: "/pages/blog/guide-til-vintemperaturer.html",
    destination: "/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske",
  },
  {
    source: "/guides/serveringstemperatur-vin",
    destination: "/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske",
  },
  {
    source: "/guides/guide-til-vintemperaturer",
    destination: "/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske",
  },
  {
    source: "/pages/blog/hvor-laenge-kan-vin-holde-sig-aabnet.html",
    destination: "/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske",
  },
  {
    source: "/pages/blog/serveringstemperatur-vin.html",
    destination: "/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske",
  },
  {
    source: "/pages/blog/hvordan-opbevarer-du-vin-korrekt.html",
    destination: "/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske",
  },
  {
    source: "/pages/blog/champagne-vs-cava-vs-prosecco.html",
    destination: "/guides/bobler-champagne-cava-prosecco-og-cremant",
  },
  {
    source: "/pages/blog/vin-til-ost.html",
    destination: "/guides/vin-til-ost-og-ostebord",
  },
  {
    source: "/pages/blog/hvad-er-tanniner.html",
    destination: "/guides/vin-begreber-i-praksis",
  },
  {
    source: "/pages/blog/hvad-er-fadlagring-i-vin.html",
    destination: "/guides/vin-begreber-i-praksis",
  },
  {
    source: "/pages/blog/hvad-betyder-reserva-og-riserva.html",
    destination: "/guides/vin-begreber-i-praksis",
  },
  {
    source: "/pages/blog/toer-halvtoer-soed-hvad-betyder-det.html",
    destination: "/guides/vin-begreber-i-praksis",
  },
  {
    source: "/pages/blog/hvad-er-syre-i-vin.html",
    destination: "/guides/vin-begreber-i-praksis",
  },
  {
    source: "/pages/blog/saadan-laeser-du-en-vinetiket.html",
    destination: "/guides/vin-begreber-i-praksis",
  },
  {
    source: "/pages/blog/laes-en-vinetiket.html",
    destination: "/guides/vin-begreber-i-praksis",
  },
  {
    source: "/pages/blog/hvad-er-pet-nat.html",
    destination: "/guides/vin-begreber-i-praksis",
  },
  {
    source: "/pages/blog/hvad-betyder-naturvin.html",
    destination: "/guides/naturvin-hvad-er-det",
  },
  {
    source: "/pages/blog/alkoholsvag-og-alkoholfri-vin.html",
    destination: "/guides/alkoholsvag-og-alkoholfri-vin",
  },
  {
    source: "/pages/blog/vin-til-dessert.html",
    destination: "/guides/vin-til-dessert-og-kransekage",
  },
  {
    source: "/pages/blog/smag-vin-som-en-pro.html",
    destination: "/guides/vin-begreber-i-praksis",
  },
  {
    source: "/pages/blog/oekologisk-vs-konventionel-vin.html",
    destination: "/guides/naturvin-hvad-er-det",
  },
  {
    source: "/pages/blog/hvordan-dekanterer-man-vin.html",
    destination: "/guides/sadan-dekanterer-du-vin",
  },
  {
    source: "/pages/blog/hvad-er-orangevin.html",
    destination: "/guides/hvad-er-orange-vin",
  },
  {
    source: "/pages/blog/guide-til-rosevin.html",
    destination: "/guides/rosevin-til-mad-og-sommer",
  },
  {
    source: "/pages/blog/vin-til-grill.html",
    destination: "/guides/vin-til-grill-og-bbq",
  },
  {
    source: "/pages/blog/guide-til-vin-til-hverdagsmad.html",
    destination: "/guides/komplet-guide-til-vin-og-mad",
  },
  {
    source: "/pages/blog/vinapps-og-vinbot.html",
    destination: "/om-os",
  },
  {
    source: "/pages/blog/index.html",
    destination: "/mad-og-vin",
  },

  // Vin til jul / påske / nytår / fest
  {
    source: "/pages/vin-til/juleaften.html",
    destination: "/guides/vin-til-julemad-den-store-guide",
  },
  {
    source: "/pages/vin-til/julefrokost.html",
    destination: "/guides/vin-til-julemad-den-store-guide",
  },
  {
    source: "/pages/vin-til/flaeskesteg.html",
    destination: "/guides/vin-til-julemad-den-store-guide",
  },
  {
    source: "/pages/vin-til/paaskefrokost.html",
    destination: "/guides/vin-til-paaske-og-paaskefrokost",
  },
  {
    source: "/pages/vin-til/nytarsaften.html",
    destination: "/guides/vin-til-nytaar-og-nytaarsmenu",
  },

  // Vin til tapas, ost, fisk, kylling (Search Console-prioriteret)
  { source: "/pages/vin-til/tapas.html", destination: "/guides/vin-til-tapas" },
  {
    source: "/pages/vin-til/ostebord.html",
    destination: "/guides/vin-til-ost-og-ostebord",
  },
  {
    source: "/pages/vin-til/ostebord-blaaskimmel.html",
    destination: "/guides/vin-til-ost-og-ostebord",
  },
  {
    source: "/pages/vin-til/ostebord-hvidskimmel.html",
    destination: "/guides/vin-til-ost-og-ostebord",
  },
  {
    source: "/pages/vin-til/ostebord-faste-oste.html",
    destination: "/guides/vin-til-ost-og-ostebord",
  },
  {
    source: "/pages/vin-til/hvide-oste.html",
    destination: "/guides/vin-til-ost-og-ostebord",
  },
  {
    source: "/pages/vin-til/fisk.html",
    destination: "/guides/vin-til-fisk-og-skaldyr",
  },
  {
    source: "/pages/vin-til/hummer.html",
    destination: "/guides/vin-til-fisk-og-skaldyr",
  },
  {
    source: "/pages/vin-til/sushi.html",
    destination: "/guides/vin-til-fisk-og-skaldyr",
  },
  {
    source: "/pages/vin-til/kylling.html",
    destination: "/guides/vin-til-kylling-og-lyst-koed",
  },
  {
    source: "/pages/vin-til/grillmad.html",
    destination: "/guides/vin-til-grill-og-bbq",
  },
  {
    source: "/pages/vin-til/pizza.html",
    destination: "/guides/vin-til-pizza-og-pasta",
  },
  {
    source: "/pages/vin-til/bolognese.html",
    destination: "/guides/vin-til-pizza-og-pasta",
  },
  {
    source: "/pages/vin-til/brunch.html",
    destination: "/guides/vin-til-brunch",
  },
  {
    source: "/pages/vin-til/vegetarretter.html",
    destination: "/guides/vin-til-vegetar-og-gront",
  },
  {
    source: "/pages/vin-til/burger.html",
    destination: "/guides/vin-til-burger",
  },
  {
    source: "/pages/vin-til/italiensk.html",
    destination: "/guides/vin-til-italiensk-mad",
  },
  {
    source: "/pages/vin-til/spansk.html",
    destination: "/guides/vin-til-spansk-mad",
  },

  // Krydret / asiatisk (samme guide)
  {
    source: "/pages/vin-til/indisk.html",
    destination: "/guides/vin-til-krydret-og-staerk-mad",
  },
  {
    source: "/pages/vin-til/thai.html",
    destination: "/guides/vin-til-krydret-og-staerk-mad",
  },
  {
    source: "/pages/vin-til/mexicansk.html",
    destination: "/guides/vin-til-krydret-og-staerk-mad",
  },
  {
    source: "/pages/vin-til/asiatisk.html",
    destination: "/guides/vin-til-krydret-og-staerk-mad",
  },

  // Gaver / stemning
  {
    source: "/pages/vin-til/bryllup.html",
    destination: "/guides/gavevin-sadan-vaelger-du-den-rigtige-flaske",
  },
  {
    source: "/pages/vin-til/konfirmation.html",
    destination: "/guides/gavevin-sadan-vaelger-du-den-rigtige-flaske",
  },
  {
    source: "/pages/vin-til/romantisk-middag.html",
    destination: "/guides/humoer-stemning-og-vin",
  },

  /** Legacy vin-til der ellers rammer catch-all → mad-pillar (SEO-konsolidering). */
  {
    source: "/pages/vin-til/julemad.html",
    destination: "/guides/vin-til-julemad-den-store-guide",
  },
  {
    source: "/pages/vin-til/pasta-tomat.html",
    destination: "/guides/vin-til-pizza-og-pasta",
  },
  {
    source: "/pages/vin-til/and.html",
    destination: "/guides/vin-til-and",
  },
  {
    source: "/pages/vin-til/picnic.html",
    destination: "/guides/komplet-guide-til-vin-og-mad",
  },
  {
    source: "/pages/vin-til/ostebord-hvide-oste.html",
    destination: "/guides/vin-til-ost-og-ostebord",
  },
  {
    source: "/pages/vin-til/okseboef.html",
    destination: "/guides/vin-til-boeff",
  },
  {
    source: "/pages/vin-til/index.html",
    destination: "/guides/komplet-guide-til-vin-og-mad",
  },

  /**
   * Forkerte `/guides/`-slugs (interne links eller gamle URL’er → 404 i Search Console).
   * Hold destinations til eksisterende guides med samme tema.
   */
  { source: "/guides/vin-til-flaeskesteg", destination: "/guides/vin-til-flaesketesteg" },
  { source: "/guides/vin-til-risalamande", destination: "/guides/vin-til-julemad-den-store-guide" },
  {
    source: "/guides/chenin-blanc-til-flaeskesteg",
    destination: "/guides/vin-til-flaesketesteg",
  },
  { source: "/guides/vin-til-asiatisk-mad", destination: "/guides/riesling-til-asiatisk-mad" },
  { source: "/guides/vin-til-oest", destination: "/guides/vin-til-ost-og-ostebord" },
  { source: "/guides/orange-wine-guide", destination: "/guides/hvad-er-orange-vin" },
  { source: "/guides/grenache-rose", destination: "/guides/rosevin-til-mad-og-sommer" },
  { source: "/guides/sangiovese-til-pizza", destination: "/guides/vin-til-pizza-og-pasta" },
  {
    source: "/guides/bedste-shiraz-under-100-kr",
    destination: "/guides/bedste-rodvin-under-100-kr",
  },
  {
    source: "/guides/bedste-shiraz-under-150-kr",
    destination: "/guides/bedste-rodvin-under-150-kr",
  },
  {
    source: "/guides/bedste-chianti-under-100-kr",
    destination: "/guides/bedste-italiensk-rodvin",
  },
  {
    source: "/guides/bedste-chianti-under-150-kr",
    destination: "/guides/bedste-italiensk-rodvin",
  },
  { source: "/guides/bedste-cava", destination: "/guides/bedste-cava-under-150-kr" },
  {
    source: "/guides/bedste-provence-rose",
    destination: "/guides/rosevin-til-mad-og-sommer",
  },
  { source: "/guides/hvad-er-sherry", destination: "/guides/hvad-er-sherry-vin" },
  { source: "/guides/vin-til-jamon-og-skinke", destination: "/guides/vin-til-tapas" },
  {
    source: "/guides/vin-til-pasta-ragu",
    destination: "/guides/vin-til-pizza-og-pasta",
  },
  { source: "/guides/dessertvin-typer-og-stil", destination: "/guides/bedste-dessertvin" },
  {
    source: "/guides/prosecco-til-aperitif",
    destination: "/guides/bobler-champagne-cava-prosecco-og-cremant",
  },
  { source: "/guides/mourvedre-druen", destination: "/guides/grenache-druen" },
  {
    source: "/guides/shiraz-fra-barossa-valley",
    destination: "/guides/syrah-fra-barossa-valley",
  },
  {
    source: "/guides/syrah-fra-rhone-nord",
    destination: "/guides/syrah-fra-nord-rhone",
  },
  { source: "/guides/syrah-til-grill", destination: "/guides/vin-til-grill-og-bbq" },
  { source: "/guides/grenache-til-lam", destination: "/guides/vin-til-lam" },
  {
    source: "/guides/bedste-chenin-blanc-under-100-kr",
    destination: "/guides/bedste-chenin-blanc-under-150-kr",
  },

  // SEO: bred forespørgsel «alkoholfri vin» → kanonisk hub (undgår kun sporadisk traffik på blandede sider)
  { source: "/alkoholfri-vin", destination: "/guides/bedste-alkoholfri-vin" },
  { source: "/alkoholfri-vin/", destination: "/guides/bedste-alkoholfri-vin" },
  { source: "/guides/alkoholfri-vin", destination: "/guides/bedste-alkoholfri-vin" },
  { source: "/guides/alkoholfri-vin/", destination: "/guides/bedste-alkoholfri-vin" },

  // Øvrigt: produktanbefalinger og partiale (ikke meningsfulde landingsider)
  {
    source: "/pages/anbefalinger/:slug.html",
    destination: "/den-sidste-flaske",
  },
  {
    source: "/partials/partner-ads.html",
    destination: "/",
  },

  // Druer: dedikerede guides (før catch-all til oversigt)
  { source: "/pages/druer/merlot.html", destination: "/guides/merlot-druen" },
  { source: "/pages/druer/syrah.html", destination: "/guides/syrah-druen" },
  {
    source: "/pages/druer/cabernet-sauvignon.html",
    destination: "/guides/cabernet-sauvignon-druen",
  },
  {
    source: "/pages/druer/cabernet-franc.html",
    destination: "/guides/cabernet-sauvignon-druen",
  },
  { source: "/pages/druer/malbec.html", destination: "/guides/malbec-druen" },
  { source: "/pages/druer/mourvedre.html", destination: "/guides/syrah-druen" },
  { source: "/pages/druer/pinot-blanc.html", destination: "/guides/pinot-blanc-druen" },
  { source: "/pages/druer/barbera.html", destination: "/guides/barbera-druen" },
  { source: "/pages/druer/gamay.html", destination: "/guides/gamay-druen" },
  { source: "/pages/druer/garnacha.html", destination: "/guides/grenache-druen" },
  { source: "/pages/druer/grenache.html", destination: "/guides/grenache-druen" },
  { source: "/pages/druer/tempranillo.html", destination: "/guides/tempranillo-druen" },
  { source: "/pages/druer/sangiovese.html", destination: "/guides/sangiovese-druen" },
  { source: "/pages/druer/nebbiolo.html", destination: "/guides/nebbiolo-druen" },
  { source: "/pages/druer/albarino.html", destination: "/guides/albarino-druen" },
  { source: "/pages/druer/chenin-blanc.html", destination: "/guides/chenin-blanc-druen" },
  { source: "/pages/druer/pinot-gris.html", destination: "/guides/pinot-gris-druen" },
  { source: "/pages/druer/pinot-grigio.html", destination: "/guides/pinot-gris-druen" },
  {
    source: "/pages/druer/gruener-veltliner.html",
    destination: "/guides/gruener-veltliner-druen",
  },
  {
    source: "/pages/druer/gruner-veltliner.html",
    destination: "/guides/gruener-veltliner-druen",
  },
  { source: "/pages/druer/garganega.html", destination: "/guides/vin-til-italiensk-mad" },
  { source: "/pages/druer/verdejo.html", destination: "/guides/sauvignon-blanc-druen" },
  { source: "/pages/druer/semillon.html", destination: "/guides/sauvignon-blanc-druen" },
  { source: "/pages/druer/assyrtiko.html", destination: "/guides/vin-til-fisk-og-skaldyr" },
  { source: "/pages/druer/txakoli.html", destination: "/guides/vin-til-fisk-og-skaldyr" },

  // Druer: øvrige → oversigt
  {
    source: "/pages/druer/:slug.html",
    destination: "/druesorter",
  },

  // Resterende blog → mad-pillar
  {
    source: "/pages/blog/:slug.html",
    destination: "/guides/komplet-guide-til-vin-og-mad",
  },

  // Resterende vin-til → mad-pillar
  {
    source: "/pages/vin-til/:slug.html",
    destination: "/guides/komplet-guide-til-vin-og-mad",
  },
];

const nextConfig: NextConfig = {
  async redirects() {
    /**
     * Undlad www→apex redirect her: på Vercel er apex→www ofte aktiveret som standard,
     * og begge kombineret giver redirect-loop (browser/curl ERR_TOO_MANY_REDIRECTS).
     * Canonical og JSON-LD bruger `siteUrl`; sæt NEXT_PUBLIC_SITE_URL til samme host som
     * Vercel primary domain (typisk https://www.vinbot.dk), så sitemap/canonical ikke peger på apex,
     * som alligevel 307’er til www.
     */
    return legacyRedirects.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
