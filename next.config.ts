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
    source: "/pages/blog/hvor-laenge-kan-vin-holde-sig-aabnet.html",
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

  // Øvrigt: produktanbefalinger og partiale
  {
    source: "/pages/anbefalinger/:slug.html",
    destination: "/den-sidste-flaske",
  },
  {
    source: "/partials/partner-ads.html",
    destination: "/den-sidste-flaske",
  },

  // Druer (ingen enkeltsider på nyt site)
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
    return legacyRedirects.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: true,
    }));
  },
};

export default nextConfig;
