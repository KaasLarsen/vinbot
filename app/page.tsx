import type { Metadata } from "next";
import Link from "next/link";
import { HomeHeroSearchSection } from "@/components/home-hero-search-section";
import { HomeQuickTopicsSection } from "@/components/home-quick-topics-section";
import { WineSearch } from "@/components/wine-search";
import { AffiliateDisclosure } from "@/components/affiliate-disclosure";
import { CampaignBanner } from "@/components/campaign-banner";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { FeaturedAffiliateStores } from "@/components/featured-affiliate-stores";
import { LauridsenHomeFeedHighlight } from "@/components/lauridsen-home-feed-highlight";
import { DsfFeaturedPicks } from "@/components/dsf-featured-picks";
import { HomeDealsStrip } from "@/components/home-deals-strip";
import { dsfFeaturedPicks } from "@/lib/dsf-featured";
import { DsfFeaturedProductsJsonLd } from "@/components/json-ld";
import { editorialTeamName, siteName, siteUrl } from "@/lib/site";

const homeMetadata: Metadata = {
  title: `${siteName} – vinguides til mad, druer og sæson`,
  description:
    "Hundredvis af redaktionelle vinguides på dansk — madparring, druer, regioner og praktisk vin-viden. Plus vinsøgning på tværs af danske forhandlere.",
};

type HomeProps = { searchParams?: Promise<{ q?: string }> };

export async function generateMetadata({ searchParams }: HomeProps): Promise<Metadata> {
  const q = ((await searchParams)?.q ?? "").trim();
  if (!q) return homeMetadata;

  return {
    ...homeMetadata,
    alternates: { canonical: siteUrl },
    robots: {
      index: false,
      follow: true,
      googleBot: { index: false, follow: true },
    },
  };
}

/** Redaktionelle indgange under søgning. */
const heroEditorialLinks: { href: string; label: string }[] = [
  { href: "/mad-og-vin", label: "Mad & vin" },
  { href: "/opskrifter", label: "Opskrifter" },
  { href: "/vin-viden", label: "Vin-viden" },
  { href: "/bedste-vine", label: "Bedste vine" },
  { href: "/tilbud", label: "Vin tilbud" },
  { href: "/guides/komplet-guide-til-vin-og-mad", label: "Den store mad-guide" },
  { href: "/guides/bedste-alkoholfri-vin", label: "Alkoholfri vin" },
  { href: "/guides/vin-brevkassen", label: "Vin-brevkassen" },
];

/** Kompakt udvalg — den fulde liste ligger i <details> nedenunder. */
const featuredPopularLinks: { href: string; label: string }[] = [
  { href: "/mad-og-vin", label: "Mad & vin" },
  { href: "/bedste-vine", label: "Bedste vine" },
  { href: "/tilbud", label: "Vin tilbud" },
  { href: "/vin-viden", label: "Vin-viden" },
  { href: "/fest-og-vin", label: "Fest & selskab" },
  { href: "/saeson", label: "Sæson & højtider" },
  { href: "/guides", label: "Alle guides — søg og filtrér" },
  { href: "/guides/vin-til-konfirmation", label: "Konfirmation" },
  { href: "/guides/vin-til-studenterfest", label: "Studenterfest" },
  { href: "/guides/komplet-guide-til-vin-og-mad", label: "Den store mad-guide" },
  { href: "/guides/bobler-champagne-cava-prosecco-og-cremant", label: "Bobler" },
  { href: "/guides/vin-til-grill-og-bbq", label: "Grill" },
  { href: "/guides/vin-til-sommer", label: "Sommer" },
  { href: "/guides/rosevin-til-mad-og-sommer", label: "Rosé" },
  { href: "/guides/vin-i-cocktails-spritz-og-drikke", label: "Vin i drinks" },
  { href: "/vinkoleskabe", label: "Vinkøleskabe" },
  { href: "/guides/afkoelt-roedvin", label: "Afkølet rødvin" },
  { href: "/?q=gamay%20beaujolais%20pinot%20noir", label: "Søg: ind i køleskabet" },
  { href: "/?q=gamay%20pinot%20noir%20frappato&max=150", label: "Søg: terrasse-rød" },
  { href: "/guides/vin-gode-koeb-regioner", label: "Gode køb — regioner" },
  { href: "/guides/vin-swap-underdog-regioner", label: "Vin-swap — underdog" },
  { href: "/guides/etna-vin-vulkanvin-sicilien", label: "Etna / vulkanvin" },
  { href: "/?q=etna%20nerello%20mascalese", label: "Søg: Etna" },
  { href: "/?q=dao%20vinho%20tinto", label: "Søg: Dão" },
  { href: "/guides/orangevin-for-begyndere", label: "Orangevin for begyndere" },
  { href: "/guides/vin-til-asiatisk-takeaway-dumplings-sushi-ramen", label: "Vin til asiatisk takeaway" },
  { href: "/guides/hurtig-koeling-vin-is-salt-10-minutter", label: "Hurtig-køling af vin" },
  { href: "/guides/vin-brevkassen", label: "Vin-brevkassen" },
  { href: "/guides/hovedpine-af-roedvin", label: "Hovedpine af rødvin" },
  { href: "/guides/bedste-vin-i-netto-under-70-kr", label: "Netto-vin under 70 kr" },
  { href: "/guides/vin-marketing-tricks-forbruger-guide", label: "Vin-marketing afsløret" },
  { href: "/guides/vin-tiktok-trends-spicy-sauvy-og-vineddike", label: "Spicy Sauvy B & vineddike" },
  { href: "/?q=sauvignon%20blanc%20marlborough&max=100", label: "Søg: Spicy Sauvy B" },
  { href: "/guides/sauvignon-blanc-til-salat", label: "Salat-vin (eller eddike bagefter)" },
  { href: "/guides/mindful-drikke-low-no-alkohol", label: "Mindful drinking" },
  { href: "/guides/bedste-lavalkohol-vin", label: "Lav alkohol" },
  { href: "/?q=riesling%20kabinett%20vinho%20verde", label: "Søg: frisk i morgen" },
  { href: "/?q=alkoholfri%20bobler%20leitz", label: "Søg: kørsel-vin" },
  { href: "/?q=lavalkohol%20halvtør%20hvidvin", label: "Søg: mindful tirsdag" },
  { href: "/guides/hverdags-bobler", label: "Hverdags-bobler" },
  { href: "/guides/bobler-til-fredag", label: "Bobler til fredag" },
  { href: "/?q=champagne%20cremant%20brut", label: "Søg: fejrer livet" },
  { href: "/?q=prosecco%20cava%20brut&max=100", label: "Søg: bare tirsdag" },
  { href: "/?q=prosecco%20cava%20takeaway", label: "Søg: bobler + takeaway" },
  { href: "/guides/bobler-til-takeaway-og-fastfood", label: "Bobler & takeaway" },
  { href: "/guides/vin-til-pakkeleg", label: "Vin til pakkeleg" },
  { href: "/guides/bedste-gamay-under-100-kr", label: "Gamay under 100 kr" },
  { href: "/?q=gamay", label: "Søg: gamay" },
  { href: "/?q=beaujolais", label: "Søg: beaujolais" },
  { href: "/?q=vinho%20verde", label: "Søg: vinho verde" },
  { href: "/?q=cremant", label: "Søg: crémant" },
];

const popularTopicGroups: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Drue × region — klassiske long-tail-parringer",
    links: [
      { href: "/guides/chardonnay-fra-chablis", label: "Chardonnay fra Chablis" },
      { href: "/guides/chardonnay-fra-maconnais", label: "Chardonnay fra Mâconnais" },
      { href: "/guides/chardonnay-fra-margaret-river", label: "Chardonnay fra Margaret River" },
      { href: "/guides/sauvignon-blanc-fra-sancerre", label: "Sauvignon blanc fra Sancerre" },
      { href: "/guides/sauvignon-blanc-fra-marlborough", label: "Sauvignon blanc fra Marlborough" },
      { href: "/guides/riesling-fra-mosel", label: "Riesling fra Mosel" },
      { href: "/guides/riesling-fra-alsace", label: "Riesling fra Alsace" },
      { href: "/guides/riesling-fra-clare-valley", label: "Riesling fra Clare Valley" },
      { href: "/guides/chenin-blanc-fra-vouvray", label: "Chenin blanc fra Vouvray" },
      { href: "/guides/chenin-blanc-fra-swartland", label: "Chenin blanc fra Swartland" },
      { href: "/guides/albarino-fra-rias-baixas", label: "Albariño fra Rías Baixas" },
      { href: "/guides/pinot-noir-fra-bourgogne", label: "Pinot noir fra Bourgogne" },
      { href: "/guides/pinot-noir-fra-willamette-valley", label: "Pinot noir fra Willamette Valley" },
      { href: "/guides/pinot-noir-fra-central-otago", label: "Pinot noir fra Central Otago" },
      { href: "/guides/cabernet-sauvignon-fra-bordeaux", label: "Cabernet sauvignon fra Bordeaux" },
      { href: "/guides/cabernet-sauvignon-fra-napa-valley", label: "Cabernet sauvignon fra Napa Valley" },
      { href: "/guides/cabernet-sauvignon-fra-maipo-valley", label: "Cabernet sauvignon fra Maipo Valley" },
      { href: "/guides/merlot-fra-pomerol", label: "Merlot fra Pomerol" },
      { href: "/guides/syrah-fra-nord-rhone", label: "Syrah fra Nord-Rhône" },
      { href: "/guides/syrah-fra-barossa-valley", label: "Shiraz fra Barossa Valley" },
      { href: "/guides/malbec-fra-mendoza", label: "Malbec fra Mendoza" },
      { href: "/guides/tempranillo-fra-rioja", label: "Tempranillo fra Rioja" },
      { href: "/guides/tempranillo-fra-ribera-del-duero", label: "Tempranillo fra Ribera del Duero" },
      { href: "/guides/sangiovese-fra-chianti-classico", label: "Sangiovese fra Chianti Classico" },
      { href: "/guides/sangiovese-fra-montalcino", label: "Sangiovese fra Montalcino (Brunello)" },
      { href: "/guides/nebbiolo-fra-barolo", label: "Nebbiolo fra Barolo" },
      { href: "/guides/nebbiolo-fra-barbaresco", label: "Nebbiolo fra Barbaresco" },
      { href: "/guides/grenache-fra-chateauneuf-du-pape", label: "Grenache fra Châteauneuf-du-Pape" },
      { href: "/guides/grenache-fra-priorat", label: "Garnacha fra Priorat" },
    ],
  },
  {
    title: "Bedste drue × prisklasse — find bedste pris pr. druesort",
    links: [
      { href: "/guides/bedste-chardonnay-under-100-kr", label: "Chardonnay under 100 kr" },
      { href: "/guides/bedste-chardonnay-under-150-kr", label: "Chardonnay under 150 kr" },
      { href: "/guides/bedste-sauvignon-blanc-under-100-kr", label: "Sauvignon blanc under 100 kr" },
      { href: "/guides/bedste-sauvignon-blanc-under-150-kr", label: "Sauvignon blanc under 150 kr" },
      { href: "/guides/bedste-riesling-under-100-kr", label: "Riesling under 100 kr" },
      { href: "/guides/bedste-riesling-under-150-kr", label: "Riesling under 150 kr" },
      { href: "/guides/bedste-pinot-grigio-under-100-kr", label: "Pinot grigio under 100 kr" },
      { href: "/guides/bedste-pinot-grigio-under-150-kr", label: "Pinot grigio under 150 kr" },
      { href: "/guides/bedste-albarino-under-150-kr", label: "Albariño under 150 kr" },
      { href: "/guides/bedste-chenin-blanc-under-150-kr", label: "Chenin blanc under 150 kr" },
      { href: "/guides/bedste-cabernet-sauvignon-under-100-kr", label: "Cabernet sauvignon under 100 kr" },
      { href: "/guides/bedste-cabernet-sauvignon-under-150-kr", label: "Cabernet sauvignon under 150 kr" },
      { href: "/guides/bedste-cabernet-sauvignon-under-200-kr", label: "Cabernet sauvignon under 200 kr" },
      { href: "/guides/bedste-merlot-under-100-kr", label: "Merlot under 100 kr" },
      { href: "/guides/bedste-merlot-under-150-kr", label: "Merlot under 150 kr" },
      { href: "/guides/bedste-syrah-under-100-kr", label: "Syrah / shiraz under 100 kr" },
      { href: "/guides/bedste-syrah-under-150-kr", label: "Syrah / shiraz under 150 kr" },
      { href: "/guides/bedste-malbec-under-100-kr", label: "Malbec under 100 kr" },
      { href: "/guides/bedste-malbec-under-150-kr", label: "Malbec under 150 kr" },
      { href: "/guides/bedste-tempranillo-under-100-kr", label: "Tempranillo under 100 kr" },
      { href: "/guides/bedste-tempranillo-under-150-kr", label: "Tempranillo under 150 kr" },
      { href: "/guides/bedste-sangiovese-under-100-kr", label: "Sangiovese under 100 kr" },
      { href: "/guides/bedste-sangiovese-under-150-kr", label: "Sangiovese under 150 kr" },
      { href: "/guides/bedste-pinot-noir-under-150-kr", label: "Pinot noir under 150 kr" },
      { href: "/guides/bedste-pinot-noir-under-250-kr", label: "Pinot noir under 250 kr" },
      { href: "/guides/bedste-grenache-under-100-kr", label: "Grenache under 100 kr" },
  { href: "/guides/bedste-gamay-under-100-kr", label: "Gamay under 100 kr" },
  { href: "/guides/bedste-gamay-under-150-kr", label: "Gamay under 150 kr" },
  { href: "/guides/bedste-grenache-under-150-kr", label: "Grenache under 150 kr" },
    ],
  },
  {
    title: "Regionalt køkken × vin — dyk ned i gastronomien",
    links: [
      { href: "/guides/vin-til-toscansk-mad", label: "Toscansk mad (sangiovese)" },
      { href: "/guides/vin-til-sicilianske-retter", label: "Sicilianske retter (nero d'avola)" },
      { href: "/guides/vin-til-piemonte-mad", label: "Piemonte-mad (barolo, barbera)" },
      { href: "/guides/vin-til-venetiansk-mad", label: "Venetiansk mad (soave, prosecco)" },
      { href: "/guides/vin-til-baskisk-mad", label: "Baskisk mad (txakoli, rioja)" },
      { href: "/guides/vin-til-catalansk-mad", label: "Catalansk mad (cava, priorat)" },
      { href: "/guides/vin-til-andalusisk-mad", label: "Andalusisk mad (sherry)" },
      { href: "/guides/vin-til-provencalsk-mad", label: "Provencalsk mad (bandol, rosé)" },
      { href: "/guides/vin-til-bourgogne-mad", label: "Bourgogne-mad (pinot, chablis)" },
      { href: "/guides/vin-til-alsace-mad", label: "Alsace-mad (riesling, gewürz)" },
      { href: "/guides/vin-til-marokkansk-mad", label: "Marokkansk mad (syrah, grenache)" },
      { href: "/guides/vin-til-georgisk-mad", label: "Georgisk mad (saperavi, qvevri)" },
    ],
  },
  {
    title: "Alkoholfri & lavalkohol — voksent valg uden tømmermænd",
    links: [
      { href: "/guides/mindful-drikke-low-no-alkohol", label: "Mindful drinking — low & no (overblik)" },
      { href: "/guides/bedste-alkoholfri-vin", label: "Bedste alkoholfri vin (hub)" },
      { href: "/guides/bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" },
      { href: "/guides/bedste-alkoholfri-champagne", label: "Bedste alkoholfri champagne" },
      { href: "/guides/bedste-alkoholfri-rodvin", label: "Bedste alkoholfri rødvin" },
      { href: "/guides/bedste-alkoholfri-hvidvin", label: "Bedste alkoholfri hvidvin" },
      { href: "/guides/bedste-alkoholfri-rose", label: "Bedste alkoholfri rosé" },
      { href: "/guides/bedste-lavalkohol-vin", label: "Bedste lavalkohol-vin" },
      { href: "/guides/alkoholfri-vin-til-jul", label: "Alkoholfri vin til jul" },
      { href: "/guides/alkoholfri-vin-til-fest", label: "Alkoholfri vin til fest" },
      { href: "/guides/alkoholfri-vin-til-brunch", label: "Alkoholfri vin til brunch" },
      { href: "/guides/alkoholfri-vin-til-dry-january", label: "Alkoholfri vin til Dry January" },
      { href: "/guides/alkoholfri-vin-til-graviditet", label: "Alkoholfri vin under graviditet" },
      { href: "/guides/hvordan-fremstilles-alkoholfri-vin", label: "Hvordan fremstilles alkoholfri vin" },
      { href: "/guides/hvad-er-forskellen-paa-alkoholfri-og-alkoholsvag-vin", label: "Alkoholfri vs alkoholsvag" },
    ],
  },
  {
    title: "Forår & sommer-fester — maj/juni",
    links: [
      { href: "/fest-og-vin", label: "Fest & selskab (hub)" },
      { href: "/saeson", label: "Hub: sæson & højtider" },
      { href: "/guides/vin-til-konfirmation", label: "Vin til konfirmation" },
      { href: "/guides/vin-til-studenterfest", label: "Vin til studenterfest" },
      { href: "/guides/vin-til-mors-dag", label: "Vin til mors dag" },
      { href: "/guides/vin-til-fars-dag", label: "Vin til fars dag" },
      { href: "/guides/vin-til-haveselskab", label: "Vin til haveselskab" },
      { href: "/guides/vin-til-sommerbryllup", label: "Vin til sommerbryllup" },
      { href: "/guides/bedste-sommervin", label: "Bedste sommervin" },
    ],
  },
  {
    title: "Ost-specialiseret — dyk ned i oste-parring",
    links: [
      { href: "/guides/vin-til-ost-og-ostebord", label: "Ost og ostebord (generel)" },
      { href: "/guides/vin-til-blaaskimmelost", label: "Blåskimmelost" },
      { href: "/guides/vin-til-brie-og-camembert", label: "Brie og camembert" },
      { href: "/guides/vin-til-hard-ost", label: "Hård ost (comté, gruyère)" },
      { href: "/guides/vin-til-parmesan", label: "Parmesan" },
      { href: "/guides/vin-til-gedeost", label: "Gedeost (chèvre)" },
      { href: "/guides/vin-til-feta", label: "Feta" },
      { href: "/guides/vin-til-cheddar", label: "Cheddar" },
      { href: "/guides/vin-til-mozzarella-og-burrata", label: "Mozzarella og burrata" },
    ],
  },
  {
    title: "Drue/stil × mad — klassiske match",
    links: [
      { href: "/mad-og-vin", label: "Hub: mad og vin" },
      { href: "/guides/rosevin-til-grill", label: "Rosévin til grill" },
      { href: "/guides/champagne-til-mad", label: "Champagne til mad" },
      { href: "/guides/bobler-til-brunch", label: "Bobler til brunch" },
      { href: "/guides/hverdags-bobler", label: "Hverdags-bobler (overblik)" },
      { href: "/guides/bobler-til-fredag", label: "Bobler til fredag" },
      { href: "/guides/rodvin-til-pizza", label: "Rødvin til pizza" },
      { href: "/guides/hvidvin-til-sushi", label: "Hvidvin til sushi" },
      { href: "/guides/pinot-noir-til-and", label: "Pinot noir til and" },
      { href: "/guides/chardonnay-til-fisk", label: "Chardonnay til fisk" },
      { href: "/guides/riesling-til-asiatisk-mad", label: "Riesling til asiatisk mad" },
      { href: "/guides/malbec-til-boef", label: "Malbec til bøf" },
      { href: "/guides/sangiovese-til-pasta", label: "Sangiovese til pasta" },
    ],
  },
  {
    title: "Pris-kategorier — find din prisklasse",
    links: [
      { href: "/bedste-vine", label: "Hub: bedste vine" },
      { href: "/guides/bedste-vin-under-100-kr", label: "Al vin under 100 kr" },
      { href: "/guides/bedste-vin-under-150-kr", label: "Al vin under 150 kr" },
      { href: "/guides/bedste-rodvin-under-75-kr", label: "Rødvin under 75 kr" },
      { href: "/guides/bedste-rodvin-under-200-kr", label: "Rødvin under 200 kr" },
      { href: "/guides/bedste-rodvin-under-300-kr", label: "Rødvin under 300 kr" },
      { href: "/guides/bedste-hvidvin-under-75-kr", label: "Hvidvin under 75 kr" },
      { href: "/guides/bedste-hvidvin-under-200-kr", label: "Hvidvin under 200 kr" },
      { href: "/guides/bedste-rosevin-under-100-kr", label: "Rosévin under 100 kr" },
      { href: "/guides/bedste-bobler-under-100-kr", label: "Bobler under 100 kr" },
      { href: "/guides/bedste-champagne-under-300-kr", label: "Champagne under 300 kr" },
      { href: "/guides/bedste-champagne-under-500-kr", label: "Champagne under 500 kr" },
    ],
  },
  {
    title: "Vin-viden — nye long-tail svar",
    links: [
      { href: "/vin-viden", label: "Hub: vin-viden" },
      { href: "/guides/hvor-laenge-holder-uaabnet-vin", label: "Hvor længe holder uåbnet vin" },
      { href: "/guides/hvor-laenge-kan-vin-lagres", label: "Hvor længe kan vin lagres" },
      { href: "/guides/hvor-meget-alkohol-i-vin", label: "Hvor meget alkohol i vin" },
      { href: "/guides/hvor-mange-enheder-alkohol-i-et-glas-vin", label: "Genstande pr. glas vin" },
      { href: "/guides/hvor-meget-fylder-en-flaske-vin", label: "Flaskestørrelser" },
      { href: "/guides/hvad-er-sulfit-i-vin", label: "Sulfit i vin" },
      { href: "/guides/hvad-er-fadlagring", label: "Fadlagring" },
      { href: "/guides/hvordan-aabner-du-champagne", label: "Hvordan åbner du champagne" },
      { href: "/guides/hvordan-aabner-du-vin-uden-proptreakker", label: "Vin uden proptrækker" },
      { href: "/guides/kan-roedvin-blive-for-gammel", label: "Kan rødvin blive for gammel?" },
      { href: "/guides/hovedpine-af-roedvin", label: "Hovedpine af rødvin" },
      { href: "/guides/sadan-vaelger-du-vinglas", label: "Sådan vælger du vinglas" },
    ],
  },
  {
    title: "Vinregioner — dybdeguider",
    links: [
      { href: "/regioner", label: "Hub: vinregioner" },
      { href: "/guides/vinregion-bourgogne", label: "Bourgogne" },
      { href: "/guides/vinregion-bordeaux", label: "Bordeaux" },
      { href: "/guides/vinregion-champagne", label: "Champagne" },
      { href: "/guides/vinregion-rhone", label: "Rhône" },
      { href: "/guides/vinregion-loire", label: "Loire" },
      { href: "/guides/vinregion-alsace", label: "Alsace" },
      { href: "/guides/vinregion-toscana", label: "Toscana" },
      { href: "/guides/vinregion-piemonte", label: "Piemonte" },
      { href: "/guides/vinregion-veneto", label: "Veneto" },
      { href: "/guides/vinregion-rioja", label: "Rioja" },
      { href: "/guides/vinregion-ribera-del-duero", label: "Ribera del Duero" },
      { href: "/guides/vinregion-napa-valley", label: "Napa Valley" },
      { href: "/guides/vinregion-mosel", label: "Mosel" },
    ],
  },
  {
    title: "Bedste vine — top-lister",
    links: [
      { href: "/bedste-vine", label: "Hub: bedste vine" },
      { href: "/guides/bedste-rodvin", label: "Bedste rødvin" },
      { href: "/guides/bedste-hvidvin", label: "Bedste hvidvin" },
      { href: "/guides/bedste-bobler", label: "Bedste bobler" },
      { href: "/guides/bedste-rodvin-under-100-kr", label: "Rødvin under 100 kr" },
      { href: "/guides/bedste-vin-til-gave", label: "Gavevin" },
      { href: "/guides/bedste-vin-til-begynder", label: "Begyndervin" },
      { href: "/guides/bedste-okologiske-vin", label: "Økologisk vin" },
      { href: "/guides/bedste-alkoholfri-vin", label: "Alkoholfri vin" },
    ],
  },
  {
    title: "Vin-viden — hvor længe, hvor mange, hvad er",
    links: [
      { href: "/vin-viden", label: "Hub: vin-viden" },
      { href: "/guides/vin-brevkassen", label: "Vin-brevkassen" },
      { href: "/guides/hovedpine-af-roedvin", label: "Hovedpine af rødvin" },
      { href: "/guides/vin-og-overgangsalder-histamin", label: "Vin og overgangsalder" },
      { href: "/guides/bedste-vin-i-netto-under-70-kr", label: "Netto under 70 kr" },
      { href: "/guides/hvor-laenge-holder-rodvin", label: "Hvor længe holder rødvin" },
      { href: "/guides/hvor-laenge-holder-aabnet-vin", label: "Hvor længe holder åbnet vin" },
      { href: "/guides/kan-roedvin-blive-for-gammel", label: "Kan rødvin blive for gammel?" },
      { href: "/guides/hvor-laenge-holder-hvidvin", label: "Hvor længe holder hvidvin" },
      { href: "/guides/hvor-laenge-holder-bobler-og-champagne", label: "Hvor længe holder champagne" },
      { href: "/guides/hvor-mange-glas-i-en-flaske-vin", label: "Glas i en flaske" },
      { href: "/guides/hvor-mange-kalorier-i-vin", label: "Kalorier i vin" },
      { href: "/guides/hvad-er-tanniner", label: "Hvad er tanniner" },
      { href: "/guides/sadan-dekanterer-du-vin", label: "Sådan dekanterer du" },
      { href: "/guides/sadan-serverer-du-vin", label: "Sådan serverer du" },
    ],
  },
  {
    title: "Regioner, køb & begreber",
    links: [
      { href: "/rabatkoder", label: "Rabatkoder til vin" },
      { href: "/regioner", label: "Vinregioner og vinlande" },
      { href: "/guides/vinregion-frankrig", label: "Guide: vin i Frankrig" },
      { href: "/guides/opbevaring-af-vin-temperatur-og-aabnet-flaske", label: "Vintemperatur og opbevaring" },
      { href: "/vinkoleskabe", label: "Vinkøleskabe — søg og guide" },
      { href: "/guides/naturvin-hvad-er-det", label: "Naturvin" },
      { href: "/guides/vin-begreber-i-praksis", label: "Vinbegreber" },
      { href: "/guides/koeb-vin-online-sadan-holder-du-styr-paa-det", label: "Køb vin online" },
      { href: "/druesorter", label: "Druesorter" },
    ],
  },
  {
    title: "Fest, bobler & dessert",
    links: [
      { href: "/guides/bobler-champagne-cava-prosecco-og-cremant", label: "Bobler og champagne" },
      { href: "/guides/vin-til-nytaar-og-nytaarsmenu", label: "Nytår og nytårsmenu" },
      { href: "/guides/vin-til-dessert-og-kransekage", label: "Dessert og kransekage" },
    ],
  },
  {
    title: "Sommer, rosé & drinks",
    links: [
      { href: "/guides/vin-til-sommer", label: "Vin til sommer" },
      { href: "/guides/rosevin-til-mad-og-sommer", label: "Rosévin til mad" },
      { href: "/guides/vin-i-cocktails-spritz-og-drikke", label: "Vin i cocktails og spritz" },
      { href: "/guides/saesonvin-i-danmark", label: "Sæsonvin året rundt" },
    ],
  },
  {
    title: "Dansk køkken",
    links: [
      { href: "/guides/vin-til-smorrebrod", label: "Vin til smørrebrød" },
      { href: "/guides/vin-til-julefrokost", label: "Vin til julefrokost" },
      { href: "/guides/vin-til-tarteletter", label: "Vin til tarteletter" },
      { href: "/guides/vin-til-sild", label: "Vin til sild" },
      { href: "/guides/vin-til-frikadeller", label: "Vin til frikadeller" },
      { href: "/guides/vin-til-medister", label: "Vin til medister" },
      { href: "/guides/vin-til-flaesketesteg", label: "Vin til flæskesteg" },
      { href: "/guides/vin-til-stegt-flaesk", label: "Vin til stegt flæsk" },
    ],
  },
  {
    title: "Fisk & skaldyr",
    links: [
      { href: "/guides/vin-til-laks", label: "Vin til laks" },
      { href: "/guides/vin-til-torsk", label: "Vin til torsk" },
      { href: "/guides/vin-til-ceviche", label: "Vin til ceviche" },
      { href: "/guides/vin-til-krebse", label: "Vin til krebse" },
      { href: "/guides/vin-til-rejer", label: "Vin til rejer" },
      { href: "/guides/vin-til-sushi", label: "Vin til sushi" },
    ],
  },
  {
    title: "Kød & grill",
    links: [
      { href: "/guides/vin-til-grill-og-bbq", label: "Grill og BBQ" },
      { href: "/guides/vin-til-boeff", label: "Vin til bøf" },
      { href: "/guides/vin-til-vildt", label: "Vin til vildt" },
      { href: "/guides/vin-til-tatar-og-carpaccio", label: "Vin til tatar" },
      { href: "/guides/vin-til-lam", label: "Vin til lam" },
      { href: "/guides/vin-til-and", label: "Vin til and" },
      { href: "/guides/vin-til-svinekoed", label: "Vin til svinekød" },
    ],
  },
  {
    title: "Internationalt",
    links: [
      { href: "/guides/vin-til-thai-mad", label: "Vin til thai" },
      { href: "/guides/vin-til-vietnamesisk-mad", label: "Vin til vietnamesisk" },
      { href: "/guides/vin-til-indisk-mad", label: "Vin til indisk" },
      { href: "/guides/vin-til-graesk-mad", label: "Vin til græsk" },
      { href: "/guides/vin-til-wok", label: "Vin til wok" },
      { href: "/guides/vin-til-tacos", label: "Vin til tacos" },
      { href: "/guides/vin-til-kebab-og-shawarma", label: "Vin til kebab" },
      { href: "/guides/vin-til-couscous", label: "Vin til couscous" },
      { href: "/guides/vin-til-vegetar", label: "Vin til vegetar" },
    ],
  },
  {
    title: "Gryde, pasta & ris",
    links: [
      { href: "/guides/vin-til-pizza", label: "Vin til pizza" },
      { href: "/guides/vin-til-lasagne", label: "Vin til lasagne" },
      { href: "/guides/vin-til-risotto", label: "Vin til risotto" },
      { href: "/guides/vin-til-gryderet", label: "Vin til gryderet" },
      { href: "/guides/vin-til-suppe", label: "Vin til suppe" },
    ],
  },
];

export default async function HomePage({ searchParams }: HomeProps) {
  const q = (await searchParams)?.q;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <DsfFeaturedProductsJsonLd picks={dsfFeaturedPicks} />
      <HomeHeroSearchSection>
        <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/90 sm:text-sm">
          Vinsøgning · sammenlign priser
        </p>
        <h1 className="mt-2 max-w-xl text-3xl font-semibold tracking-tight text-stone-900 sm:mt-3 sm:max-w-2xl sm:text-4xl">
          Find vin på sekunder
        </h1>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-stone-700 sm:max-w-xl">
          Skriv ret, drue, stemning eller budget — vi finder flasker og priser hos danske forhandlere.
        </p>

        <div className="mt-5 rounded-2xl border border-white/80 bg-white/95 p-4 shadow-lg ring-1 ring-rose-200/50 backdrop-blur-sm sm:mt-6 sm:p-6">
          <WineSearch initialQuery={q} />
          <div className="mt-4 border-t border-stone-100 pt-3">
            <AffiliateDisclosure compact />
          </div>
        </div>
      </HomeHeroSearchSection>

      <HomeQuickTopicsSection
        editorialLinks={heroEditorialLinks}
        featuredLinks={featuredPopularLinks}
        topicGroups={popularTopicGroups}
        editorialTeamName={editorialTeamName}
      />

      {!q?.trim() ? <DsfFeaturedPicks picks={dsfFeaturedPicks} variant="home" /> : null}
      {!q?.trim() ? <HomeDealsStrip /> : null}

      <section className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Link
          href="/mad-og-vin"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Mad & vin</h3>
          <p className="mt-2 text-stone-600">Parring til kød, fisk, ost, pasta og meget mere — med dybe guides og masser af videre læsning.</p>
        </Link>
        <Link
          href="/bedste-vine"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Bedste vine</h3>
          <p className="mt-2 text-stone-600">Top-lister efter pris, lejlighed og stil — rødvin, hvidvin, bobler, gavevin og budget-guides.</p>
        </Link>
        <Link
          href="/tilbud"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Vin tilbud</h3>
          <p className="mt-2 text-stone-600">Nedsatte vine og prisforskelle på tværs af forhandlere — opdateres automatisk fra feeds.</p>
        </Link>
        <Link
          href="/humoer-og-vin"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Humør & stemning</h3>
          <p className="mt-2 text-stone-600">Hygge, fest, romantik og hverdag — sådan vælger du stil, bobler og stemning.</p>
        </Link>
        <Link
          href="/fest-og-vin"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Fest &amp; selskab</h3>
          <p className="mt-2 text-stone-600">
            Hvor meget vin per gæst, konfirmation og bryllup, bobler til velkomst, gaver og alkoholfri til blandet selskab.
          </p>
        </Link>
        <Link
          href="/saeson"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Sæson &amp; højtider</h3>
          <p className="mt-2 text-stone-600">
            Jul, påske, nytår, grill, sommer og klassisk dansk mad — vin til årets gang og vejr.
          </p>
        </Link>
        <Link
          href="/vin-viden"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Vin-viden</h3>
          <p className="mt-2 text-stone-600">Korte svar: hvor længe holder vin, hvor mange glas i en flaske, hvad er tanniner — og sådan dekanterer, serverer og smager du.</p>
        </Link>
        <Link
          href="/vinkoleskabe"
          className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-rose-200 hover:shadow-md"
        >
          <h3 className="text-lg font-semibold text-stone-900">Vinkøleskabe</h3>
          <p className="mt-2 text-stone-600">Søg vinkøleskabe hos Vinkøleskabet.dk med billede og pris — plus købsguide til størrelse, zoner og placering.</p>
        </Link>
      </section>

      <CampaignBanner />

      <FeaturedAffiliateStores />

      <LauridsenHomeFeedHighlight />

      <PartnerAdsLeaderboard className="mt-16" hub="bedste-vine" slug="home" />
    </div>
  );
}
