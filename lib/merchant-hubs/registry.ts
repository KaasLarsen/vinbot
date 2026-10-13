import { cpcGoHref } from "@/lib/cpc/helpers";
import {
  DECANTALO_SHOP_HREF,
  HAVNENS_VIN_SHOP_HREF,
  QUIEROVINOS_SHOP_HREF,
} from "@/lib/daisycon-links";
import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";
import type { MerchantHubConfig } from "@/lib/merchant-hubs/types";

const B = PARTNER_ADS_KLIK_BANNERS;

function pa(bannerId: string, shopUrl: string): MerchantHubConfig["affiliate"] {
  return { kind: "partner-ads", bannerId, shopUrl };
}

/** Resolve tracked (or direct) shop URL for hub CTA. Null = no shop button (feed-only). */
export function resolveMerchantHubShopHref(hub: MerchantHubConfig): string | null {
  const a = hub.affiliate;
  if (a.kind === "partner-ads") return partnerAdsKlikUrl(a.bannerId, a.shopUrl);
  if (a.kind === "daisycon") return a.shopHref;
  if (a.kind === "direct") {
    if (a.cpcPartnerSlug) {
      return cpcGoHref(a.cpcPartnerSlug, a.shopUrl, `hub-shop-${hub.slug}`);
    }
    return a.shopUrl;
  }
  return null;
}

export const MERCHANT_HUBS: MerchantHubConfig[] = [
  {
    slug: "den-sidste-flaske",
    displayName: "Den Sidste Flaske",
    feedMerchant: null,
    blurb: "Restpartier, daglige tilbud og sjældne flasker — redaktionel inspiration på Vinbot.",
    title: "Den Sidste Flaske (densidsteflaske) — vin tilbud",
    description:
      "Den Sidste Flaske / densidsteflaske.dk: daglige tilbud, restpartier og sjældne flasker. Redaktionel inspiration på Vinbot — uden link videre til shoppen.",
    introParagraphs: [
      "Den Sidste Flaske — også søgt som densidsteflaske — er en af landets stærkeste vin-shops med restpartier, limited releases og daglige tilbud. Her på Vinbot får du inspiration, læsning og konkrete idéer om flaskerne.",
      "Du kan læse om flaskerne her — Vinbot linker ikke videre til densidsteflaske.dk.",
      "Sortimentet skifter ofte: restpartier, kampagner og limited editions betyder, at dagens tilbud kan være væk i morgen. Brug derfor altid forhandlerens egen side som kilde til pris, lager og årgang, hvis du selv vælger at handle der.",
    ],
    matchHeading: "Hvornår er Den Sidste Flaske et godt match?",
    matchBullets: [
      "Du jagter restpartier, limited releases og daglige tilbud.",
      "Du vil have konkrete flaskeforslag og redaktionel vejledning.",
      "Du sammenligner gerne med andre forhandlere via Vinbots søgning, før du vælger butik.",
    ],
    guideLinks: [
      { href: "/den-sidste-flaske/vin/the-guvnor-tinto", label: "The Guv'nor rødvin" },
      { href: "/den-sidste-flaske/vin/weinhof-519-alte-reben-rheingau-riesling-trocken", label: "Alte Reben Riesling" },
      { href: "/den-sidste-flaske/vin/weinhof-519-alte-reben-rose", label: "Alte Reben rosé" },
      { href: "/guides/humoer-stemning-og-vin", label: "Humør og stemning" },
      { href: "/guides/komplet-guide-til-vin-og-mad", label: "Vin og mad" },
      { href: "/tilbud", label: "Vin tilbud" },
    ],
    shopCtaLabel: "Besøg Den Sidste Flaske",
    shopIntro:
      "Vi linker ikke videre til shoppen herfra — find inspiration her, eller besøg forhandleren selv.",
    showDsfFeatured: true,
    productIntro:
      "Inspiration fra andre gode forhandlere — samme idé som ovenfor, med billeder og priser du kan klikke videre på.",
    productSections: [
      {
        title: "Bobler og festlige vine",
        queries: ["champagne cava prosecco bobler"],
        placement: "dsf-page-bubbles",
      },
      {
        title: "Elegante røde til gave og bord",
        queries: ["pinot noir bourgogne"],
        placement: "dsf-page-red",
      },
    ],
    faq: [
      {
        question: "Er densidsteflaske det samme som Den Sidste Flaske?",
        answer:
          "Ja. Densidsteflaske er shoppens domæne (densidsteflaske.dk) og den stavemåde mange søger. Den Sidste Flaske er det officielle navn. Vinbot beskriver flaskerne redaktionelt — vi linker ikke videre til shoppen.",
      },
      {
        question: "Hvad er Den Sidste Flaske?",
        answer:
          "Den Sidste Flaske (densidsteflaske.dk) er en dansk vinwebshop med restpartier, limited releases og daglige tilbud. På Vinbot kan du læse om udvalgte flasker — vi sælger ikke selv vin.",
      },
      {
        question: "Hvorfor linker Vinbot ikke til Den Sidste Flaske?",
        answer:
          "Vi har ikke et aktivt samarbejde med Den Sidste Flaske. Du kan læse om flaskerne her — uden link videre til shoppen.",
      },
      {
        question: "Kan jeg sammenligne med andre butikker?",
        answer:
          "Ja. Brug vores vinsøgning på forsiden til at se forslag fra flere forhandlere med billede og pris — så kan du danne dig et indtryk, før du vælger, hvor du handler.",
      },
      {
        question: "Er priserne her altid 100 % aktuelle?",
        answer:
          "Priser og tilbud skifter hos butikkerne. Brug altid forhandlerens egen side som udgangspunkt for endelig pris, levering og årgang.",
      },
    ],
    affiliate: { kind: "feed-only" },
  },
  {
    slug: "lauridsen-vine",
    displayName: "Lauridsen Vine",
    feedMerchant: "Lauridsen Vine",
    blurb: "Bredt europæisk sortiment — klassiske regioner, bobler og hverdagsvine.",
    title: "Lauridsen Vine — shop og inspiration | Vinbot",
    description:
      "Lauridsen Vine er en dansk vinwebshop med stærkt europæisk udvalg. Inspiration fra Vinbot: link til shoppen, rabat via nyhedsbrev og flasker du også kan finde via vores vinsøgning.",
    introParagraphs: [
      "Lauridsen Vine er en dansk vinhandler med et bredt europæisk sortiment — fra hverdagsvine til flasker du gemmer til weekend eller gæster. Mange læsere bruger dem som et naturligt næste skridt efter en regionguide, eller når de vil dykke ned i Bourgogne, Italien, Tyskland og de øvrige klassikere uden at starte fra nul.",
      "Her på Vinbot sælger vi ikke vin selv — vi hjælper dig med at orientere dig og sammenligne idéer. Brug vinsøgningen på forsiden på tværs af flere forhandlere; på denne side er fokus kun på udvalg hos Lauridsen.",
      "Sortimentet dækker både rød, hvid, rosé og bobler i flere prislejer. Det gør Lauridsen til et godt sted, når du vil browse bredt i europæiske druer og appellationer — og så hoppe direkte videre til shoppen, når en flaske fanger dig.",
    ],
    matchHeading: "Hvornår er Lauridsen et godt match?",
    matchBullets: [
      "Du vil browse bredt i europæiske regioner og druer — ikke kun ét tema.",
      "Du vil kombinere inspiration fra Vinbot med en shop, der har mange flasker på hylden.",
      "Du vil holde øje med nyhedsbrev og kampagner (se også vores side med rabatkoder).",
    ],
    guideLinks: [
      { href: "/regioner", label: "Vinregioner" },
      { href: "/guides/komplet-guide-til-vin-og-mad", label: "Vin og mad" },
      { href: "/guides/bobler-champagne-cava-prosecco-og-cremant", label: "Bobler" },
      { href: "/mad-og-vin", label: "Mad og vin" },
    ],
    shopCtaLabel: "Besøg Lauridsen Vine",
    shopIntro: "Åbner Lauridsen Vine i et nyt vindue — du handler og betaler altid hos dem.",
    showRabatkoderLink: true,
    featuredWineId: "lauridsen-vine",
    productIntro:
      "Et smagsprøve på udvalget med billede og pris — udvalget kan variere fra dag til dag. Vil du sammenligne på tværs af butikker, brug vinsøgningen på forsiden.",
    productSections: [
      {
        title: "Klassikere og vine til bordet",
        queries: [
          "bourgogne bordeaux champagne pinot chardonnay riesling",
          "rioja barolo chianti tempranillo sangiovese",
          "sauvignon mosel alsace sancerre chenin",
        ],
        placement: "lauridsen-page-table",
      },
      {
        title: "Bobler og mousserende",
        queries: ["champagne cava crémant prosecco brut bobler", "sparkling franciacorta"],
        placement: "lauridsen-page-bubbles",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Lauridsen Vine?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Vi linker, fordi sortimentet supplerer det, vores læsere søger efter: klassiske regioner, brede prislejer og et godt sted at browse videre efter en guide.",
      },
      {
        question: "Kan jeg få rabat?",
        answer:
          "Lauridsen Vine tilbyder ofte rabat via nyhedsbrev — se vores samlede oversigt under rabatkoder med opdaterede vilkår.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer:
          "Nej. Priser og årgange kan skifte hurtigt hos forhandleren. Brug altid lauridsenvine.dk som kilde til endelig pris, lager og levering — også for produkterne vi viser her.",
      },
    ],
    affiliate: pa(B.lauridsenVine, "https://lauridsenvine.dk/"),
  },
  {
    slug: "winther-vin",
    displayName: "Winther Vin",
    feedMerchant: "Winther Vin",
    blurb: "Stort sortiment, kampagner og mulighed for at blande din egen kasse.",
    title: "Winther Vin — shop og inspiration | Vinbot",
    description:
      "Winther Vin: dansk vinwebshop med fokus på kvalitet, kampagner og mulighed for at blande kassen. Link til shoppen fra Vinbot, nyhedsbrev og vine fra vores vinsøgning.",
    introParagraphs: [
      "Winther Vin er en dansk vinforhandler med både fysisk butik og webshop — kendt for et stort sortiment, kampagner og mulighed for at blande din egen kasse i stedet for kun at købe én vin i seks eksemplarer. Et naturligt næste skridt efter mad- og vin-inspiration eller når du har fundet en drue i drueoversigten.",
      "Vinbot sælger ikke vin. Brug vinsøgningen til at sammenligne på tværs; denne side samler kontekst om Winther Vin og viser flasker fra dem, du kan klikke videre på.",
      "Mange læsere bruger Winther, når de vil shoppe til fest, gave eller en blandet kasse til aftenen — og samtidig holde øje med nyhedsbrev og aktuelle kampagner.",
    ],
    matchHeading: "Hvornår er Winther Vin et godt match?",
    matchBullets: [
      "Du vil shoppe kampagner, nyhedsbrev og smagskasser.",
      "Du vil samle en kasse med forskellige flasker til en samlet pris-logik.",
      "Du vil udforske både hverdags- og festvine fra kendte vinlande.",
    ],
    guideLinks: [
      { href: "/mad-og-vin", label: "Mad og vin" },
      { href: "/druesorter", label: "Druesorter" },
      { href: "/guides/bobler-champagne-cava-prosecco-og-cremant", label: "Bobler" },
      { href: "/rabatkoder", label: "Rabatkoder" },
    ],
    shopCtaLabel: "Besøg Winther Vin",
    shopIntro: "Åbner Winther Vin i et nyt vindue — du handler og betaler altid hos dem.",
    showRabatkoderLink: true,
    featuredWineId: "winther-vin",
    productIntro:
      "Udvalget skifter — Vil du sammenligne med andre butikker, brug forsiden.",
    productSections: [
      {
        title: "Klassikere og fest",
        queries: [
          "bourgogne bordeaux rioja pinot shiraz",
          "champagne cava prosecco crémant brut",
          "chardonnay sauvignon riesling",
        ],
        placement: "winther-vin-page-table",
      },
      {
        title: "Bobler og mousserende",
        queries: ["champagne brut rosé mousserende", "prosecco cava crémant"],
        placement: "winther-vin-page-bubbles",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Winther Vin?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Winther Vin matcher læsere, der vil browse kampagner, smagskasser og et bredt sortiment med jævnlige tilbud.",
      },
      {
        question: "Kan jeg få rabat?",
        answer:
          "Se rabatkoder — Winther Vin tilbyder ofte rabat via nyhedsbrev og kører kampagner på webshoppen. Vilkår og aktuelle tilbud findes på winthervin.dk.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid winthervin.dk som kilde til endelig pris, lager, levering og kampagner.",
      },
    ],
    affiliate: pa(B.wintherVin, "https://winthervin.dk/"),
  },
  {
    slug: "dh-wines",
    displayName: "DH Wines",
    feedMerchant: "DH Wines",
    blurb: "Håndplukket udvalg til mad, hverdag og gæster.",
    title: "DH Wines — shop og inspiration | Vinbot",
    description:
      "DH Wines: dansk vinwebshop med håndplukket udvalg til mad og hverdag. Link til shoppen fra Vinbot, rabatter via nyhedsbrev og vine fra vores vinsøgning.",
    introParagraphs: [
      "DH Wines er en dansk netbutik med et håndplukket sortiment — oplagt når du har læst en guide til vin og mad og vil finde konkrete flasker, der matcher bordet i hverdagen eller til weekendens menu.",
      "Vinbot sælger ikke vin. Brug vinsøgningen på forsiden til at sammenligne pris på tværs; her dykker vi ned i DH Wines og viser udvalgte flasker fra dem.",
      "Hvis du foretrækker et overskueligt, kurateret udvalg frem for uendelige hylder, er DH Wines ofte et godt næste skridt efter Vinbots inspiration.",
    ],
    matchHeading: "Hvornår er DH Wines et godt match?",
    matchBullets: [
      "Du vil have et overskueligt, kurateret udvalg frem for uendelige hylder.",
      "Du leder efter vine til mad, gæster eller hverdag uden at starte forfra i hver kategori.",
      "Du vil kombinere Vinbots inspiration med én dedikeret dansk shop.",
    ],
    guideLinks: [
      { href: "/guides/komplet-guide-til-vin-og-mad", label: "Vin og mad-guiden" },
      { href: "/mad-og-vin", label: "Mad og vin" },
      { href: "/saeson", label: "Sæson" },
    ],
    shopCtaLabel: "Besøg DH Wines",
    shopIntro: "Åbner DH Wines i et nyt vindue — du handler og betaler altid hos dem.",
    showRabatkoderLink: true,
    featuredWineId: "dh-wines",
    productIntro: "Et udsnit af udvalget — priser kan skifte dag til dag.",
    productSections: [
      {
        title: "Smagsprøve på sortimentet",
        queries: [
          "pinot noir gamay chianti",
          "chardonnay sauvignon riesling hvidvin",
          "italien frankrig spanien hverdag",
        ],
        placement: "dh-wines-page-table",
      },
      {
        title: "Bobler og rosé",
        queries: ["champagne brut cava prosecco", "rosé provence"],
        placement: "dh-wines-page-bubbles",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til DH Wines?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. DH Wines passer til læsere, der vil have et kurateret udvalg med fokus på madvenlige og hverdagsvenlige flasker.",
      },
      {
        question: "Kan jeg få rabat?",
        answer:
          "Se rabatkoder — DH Wines tilbyder ofte rabat via nyhedsbrev. Følg dhwines.dk for aktuelle vilkår.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid dhwines.dk som autoritativ kilde til pris, lager og levering.",
      },
    ],
    affiliate: pa(B.dhWines, "https://dhwines.dk/"),
  },
  {
    slug: "johnsen-wine",
    displayName: "Johnsen Wine",
    feedMerchant: "Johnsen Vine",
    blurb: "Kurateret sortiment når du vil dykke dybere i vinoplevelsen.",
    title: "Johnsen Wine — shop og inspiration | Vinbot",
    description:
      "Johnsen Wine: vinforhandler med fokus på kurateret sortiment og personlig service. Link til shoppen fra Vinbot, nyhedsbrev-rabatter og produkter du også finder i vores vinsøgning.",
    introParagraphs: [
      "Johnsen Wine er en dansk vinforhandler med kurateret sortiment og stærkt fokus på kvalitet og vejledning — et oplagt sted at fortsætte, når du har fundet retning i en drue- eller regionguide, og vil se konkrete flasker hos én shop.",
      "Vinbot sælger ikke vin. Brug vinsøgningen på forsiden til at sammenligne på tværs; her fokuserer vi på Johnsen Wine (i søgningen vist som «Johnsen Vine»).",
      "Shoppen egner sig godt, når du vil gå fra overblik til handling hos en etableret forhandler med fokus på vinoplevelse — ikke kun den billigste flaske.",
    ],
    matchHeading: "Hvornår er Johnsen Wine et godt match?",
    matchBullets: [
      "Du vil dykke ned i et udvalg, der er sammensat med vinoplevelse for øje.",
      "Du følger med i nyhedsbrev, smagninger og kampagner (se rabatkoder).",
      "Du vil gå fra Vinbots overblik til at handle hos én seriøs forhandler.",
    ],
    guideLinks: [
      { href: "/druesorter", label: "Druesorter" },
      { href: "/bedste-vine", label: "Bedste vine" },
      { href: "/regioner", label: "Regioner" },
    ],
    shopCtaLabel: "Besøg Johnsen Wine",
    shopIntro: "Åbner Johnsen Wine i et nyt vindue — du handler og betaler altid hos dem.",
    showRabatkoderLink: true,
    featuredWineId: "johnsen-wine",
    productIntro:
      "Fra søgningen (vist som «Johnsen Vine»). Udvalget varierer — sammenlign gerne på forsiden.",
    productSections: [
      {
        title: "Smagsprøve på sortimentet",
        queries: [
          "bourgogne champagne pinot chardonnay",
          "italien barolo sangiovese",
          "riesling mosel alsace",
        ],
        placement: "johnsen-wine-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Johnsen Wine?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Johnsen Wine passer til læsere, der vil dykke ned i et kurateret udvalg og handle hos en etableret forhandler med stærkt fokus på vinoplevelse.",
      },
      {
        question: "Kan jeg få rabat?",
        answer:
          "Se rabatkoder — Johnsen Wine tilbyder ofte rabat via nyhedsbrev. Aktuelle vilkår og koder ligger på johnsenwine.dk.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid johnsenwine.dk som autoritativ kilde til pris, lager og levering.",
      },
    ],
    affiliate: pa(B.johnsenWine, "https://www.johnsenwine.dk/"),
  },
  {
    slug: "havnens-vin",
    displayName: "Havnens Vin",
    feedMerchant: "Havnens Vin",
    blurb: "Dansk vin- og spiritusforhandler med bredt sortiment.",
    title: "Havnens Vin — shop og inspiration | Vinbot",
    description:
      "Havnens Vin: dansk vin- og spiritusforhandler med bredt sortiment. Link til shoppen fra Vinbot, og vine du finder i vores søgning og vin-katalog.",
    introParagraphs: [
      "Havnens Vin er en dansk forhandler med vin, bobler og spiritus — oplagt når du har fundet retning i vores guider og vil se konkrete flasker hos én shop.",
      "Vinbot sælger ikke vin. Brug vinsøgningen på forsiden eller vin-kataloget til at sammenligne på tværs; her fokuserer vi på Havnens Vin.",
      "Flasker fra Havnens Vin indgår i vores søgning, når de matcher vinfiltrene — så kan du både browse her og klikke videre til køb.",
    ],
    matchHeading: "Hvornår er Havnens Vin et godt match?",
    matchBullets: [
      "Du vil handle hos en dansk webshop med bred vifte af flasker og bobler.",
      "Du har set en flaske i Vinbots katalog og vil købe den hos dem.",
      "Du vil udforske sortimentet direkte på havnens-vin.dk.",
    ],
    guideLinks: [
      { href: "/guides", label: "Guider" },
      { href: "/bedste-vine", label: "Bedste vine" },
      { href: "/regioner", label: "Regioner" },
      { href: "/vine", label: "Vin-katalog" },
    ],
    shopCtaLabel: "Besøg Havnens Vin",
    shopIntro: "Åbner Havnens Vin i et nyt vindue — du handler og betaler altid hos dem.",
    showRabatkoderLink: true,
    productIntro:
      "Udvalgte flasker fra Havnens Vin i vores søgning. Udvalget varierer — sammenlign gerne i vin-kataloget.",
    productSections: [
      {
        title: "Smagsprøve på sortimentet",
        queries: ["bourgogne pinot noir", "champagne brut prosecco", "riesling alsace"],
        placement: "havnens-vin-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Havnens Vin?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Havnens Vin passer til læsere, der vil handle hos en etableret dansk forhandler med både hverdagsvine og mere sjældne flasker.",
      },
      {
        question: "Kan jeg se Havnens Vin i Vinbots vin-katalog?",
        answer:
          "Ja. Flasker indgår i vinsøgningen og under vin-kataloget, når de matcher vores filtre — sammenlign pris og forhandler der.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid havnens-vin.dk som autoritativ kilde til pris, lager og levering.",
      },
    ],
    affiliate: { kind: "daisycon", shopHref: HAVNENS_VIN_SHOP_HREF },
  },
  {
    slug: "sps-wine",
    displayName: "SPS Wine",
    feedMerchant: "SPS Wine",
    blurb: "Dansk vinwebshop med fokus på kvalitet og et bredt, spændende sortiment.",
    title: "SPS Wine — shop og inspiration | Vinbot",
    description:
      "SPS Wine er en dansk vinforhandler i Vinbots søgning. Læs om shoppen, se flasker med pris og gå videre til shoppen — uden merpris for dig.",
    introParagraphs: [
      "SPS Wine er en dansk vinwebshop, så du kan finde deres flasker i vores søgning og katalog, når de matcher vinfiltrene.",
      "Her på siden får du en kort introduktion til forhandleren, FAQ og konkrete flasker. Vinbot sælger ikke vin; du handler altid hos SPS Wine.",
      "Brug siden, når du vil gå fra inspiration til køb hos én specifik shop — eller sammenlign først på forsiden på tværs af flere forhandlere.",
    ],
    matchHeading: "Hvornår er SPS Wine et godt match?",
    matchBullets: [
      "Du har set SPS Wine i Vinbots søgeresultater og vil dykke ned i deres udvalg.",
      "Du vil have direkte flaske-links med billede og pris fra dem.",
      "Du følger gerne med i rabatter og kampagner (se rabatkoder).",
    ],
    guideLinks: [
      { href: "/naturvin", label: "Naturvin-guider" },
      { href: "/rabatkoder", label: "Rabatkoder" },
      { href: "/regioner", label: "Regioner" },
      { href: "/vine", label: "Vin-katalog" },
    ],
    shopCtaLabel: "Besøg SPS Wine",
    shopIntro: "Åbner SPS Wine i et nyt vindue — du handler og betaler altid hos dem.",
    showRabatkoderLink: true,
    productIntro: "Udvalgte flasker fra SPS Wine — klik videre for at købe hos dem.",
    productSections: [
      {
        title: "Naturvin og orangevin",
        queries: ["sps naturvin orangevin"],
        placement: "sps-wine-page-naturvin",
      },
      {
        title: "Udvalgte vine hos SPS Wine",
        queries: ["pinot chardonnay riesling", "rioja chianti bordeaux", "champagne prosecco"],
        placement: "sps-wine-page-table",
      },
      {
        title: "Bobler og rosé",
        queries: ["champagne brut cava", "rosé provence"],
        placement: "sps-wine-page-bubbles",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til SPS Wine?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. SPS Wine dukker ofte op, når læsere søger efter lignende vine.",
      },
      {
        question: "Kan jeg få rabat?",
        answer: "Se vores side med rabatkoder for aktuelle tilbud og vilkår hos SPS Wine og andre partnere.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid spswine.dk som kilde til endelig pris, lager og levering.",
      },
    ],
    affiliate: pa(B.spsWine, "https://www.spswine.dk/"),
  },
  {
    slug: "winefriends",
    displayName: "Winefriends",
    feedMerchant: "Winefriends",
    blurb: "Vinwebshop med fokusvenlige flasker og jævnlige kampagner.",
    title: "Winefriends — shop og inspiration | Vinbot",
    description:
      "Winefriends er en dansk vinforhandler i Vinbots søgning. Læs om shoppen, se flasker og gå videre til shoppen.",
    introParagraphs: [
      "Winefriends er en dansk vinwebshop, Her får du intro, FAQ og flasker du kan klikke videre på.",
      "Vinbot sælger ikke vin. Brug forsiden til at sammenligne på tværs; denne side er dedikeret til Winefriends.",
      "Shoppen passer godt, når du vil finde vine til aftenen, gæster eller en gave — og samtidig holde øje med kampagner via rabatkoder.",
    ],
    matchHeading: "Hvornår er Winefriends et godt match?",
    matchBullets: [
      "Du har set Winefriends i søgeresultaterne og vil se mere fra dem.",
      "Du vil have direkte flaske-links med billede og pris.",
      "Du følger gerne nyhedsbrev og rabatter.",
    ],
    guideLinks: [
      { href: "/rabatkoder", label: "Rabatkoder" },
      { href: "/fest-og-vin", label: "Fest og vin" },
      { href: "/vine", label: "Vin-katalog" },
    ],
    shopCtaLabel: "Besøg Winefriends",
    shopIntro: "Åbner Winefriends i et nyt vindue — du handler og betaler altid hos dem.",
    showRabatkoderLink: true,
    productIntro: "Udvalgte flasker fra Winefriends.",
    productSections: [
      {
        title: "Udvalgte vine",
        queries: ["pinot noir merlot", "sauvignon blanc chardonnay", "prosecco champagne"],
        placement: "winefriends-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Winefriends?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Winefriends indgår i vores søgning.",
      },
      {
        question: "Kan jeg få rabat?",
        answer: "Se vores oversigt under rabatkoder for aktuelle tilbud hos Winefriends.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid winefriends.dk som kilde til endelig pris, lager og levering.",
      },
    ],
    affiliate: pa(B.winefriends, "https://winefriends.dk/"),
  },
  {
    slug: "buus-vine",
    displayName: "Buus Vine",
    feedMerchant: "Buus Vine",
    blurb: "Dansk vinwebshop med fokus på italienske klassikere, smagekasser og gode hverdagsvine.",
    title: "Buus Vine — shop og inspiration | Vinbot",
    description:
      "Buus Vine er en dansk vinforhandler i Vinbots søgning. Læs om shoppen, se flasker med pris og gå videre til shoppen.",
    introParagraphs: [
      "Buus Vine er en dansk vinwebshop, Du kan finde deres flasker i vores søgning og katalog, når de matcher vinfiltrene.",
      "Her på siden får du en kort introduktion til forhandleren, FAQ og konkrete flasker. Vinbot sælger ikke vin; du handler altid hos Buus Vine.",
      "Shoppen passer godt, når du jagter italienske klassikere som Barolo og Amarone, smagekasser eller vine til hverdag og selskab.",
    ],
    matchHeading: "Hvornår er Buus Vine et godt match?",
    matchBullets: [
      "Du har set Buus Vine i Vinbots søgeresultater og vil dykke ned i deres udvalg.",
      "Du vil have direkte flaske-links med billede og pris fra dem.",
      "Du leder efter italienske vine, smagekasser eller kampagneflasker.",
    ],
    guideLinks: [
      { href: "/rabatkoder", label: "Rabatkoder" },
      { href: "/regioner", label: "Regioner" },
      { href: "/vine", label: "Vin-katalog" },
    ],
    shopCtaLabel: "Besøg Buus Vine",
    shopIntro: "Åbner Buus Vine i et nyt vindue — du handler og betaler altid hos dem.",
    showRabatkoderLink: true,
    productIntro: "Udvalgte flasker fra Buus Vine — klik videre for at købe hos dem.",
    productSections: [
      {
        title: "Udvalgte vine hos Buus Vine",
        queries: ["barolo amarone chianti", "rosso veneto", "chardonnay limoux"],
        placement: "buus-vine-page-table",
      },
      {
        title: "Smagekasser og pakker",
        queries: ["smagekasse amarone", "vinmanden deluxe"],
        placement: "buus-vine-page-boxes",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Buus Vine?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Buus Vine dukker ofte op, når læsere søger efter lignende vine.",
      },
      {
        question: "Kan jeg få rabat?",
        answer: "Se vores side med rabatkoder for aktuelle tilbud og vilkår hos Buus Vine og andre partnere.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid buusvine.dk som kilde til endelig pris, lager og levering.",
      },
    ],
    affiliate: pa(B.buusVine, "https://buusvine.dk/"),
  },
  {
    slug: "otto-suenson",
    displayName: "Otto Suenson",
    feedMerchant: "Otto Suenson",
    blurb: "Klassisk dansk vinimportør med fokus på Champagne, Bourgogne og europæiske kvalitetsvine.",
    title: "Otto Suenson — shop og inspiration | Vinbot",
    description:
      "Otto Suenson er en dansk vinforhandler i Vinbots søgning. Læs om shoppen, se flasker med pris og gå videre til shoppen.",
    introParagraphs: [
      "Otto Suenson er en dansk vinwebshop og importør, Du kan finde deres flasker i vores søgning og katalog, når de matcher vinfiltrene.",
      "Her på siden får du en kort introduktion til forhandleren, FAQ og konkrete flasker. Vinbot sælger ikke vin; du handler altid hos Otto Suenson.",
      "Shoppen passer godt, når du jagter Champagne, Bourgogne, Riesling eller andre europæiske kvalitetsvine — inkl. magnum og mere eksklusive årgange.",
    ],
    matchHeading: "Hvornår er Otto Suenson et godt match?",
    matchBullets: [
      "Du har set Otto Suenson i Vinbots søgeresultater og vil dykke ned i deres udvalg.",
      "Du vil have direkte flaske-links med billede og pris fra dem.",
      "Du leder efter Champagne, Bourgogne eller klassiske europæiske vine.",
    ],
    guideLinks: [
      { href: "/rabatkoder", label: "Rabatkoder" },
      { href: "/regioner", label: "Regioner" },
      { href: "/vine", label: "Vin-katalog" },
    ],
    shopCtaLabel: "Besøg Otto Suenson",
    shopIntro: "Åbner Otto Suenson i et nyt vindue — du handler og betaler altid hos dem.",
    showRabatkoderLink: true,
    productIntro: "Udvalgte flasker fra Otto Suenson — klik videre for at købe hos dem.",
    productSections: [
      {
        title: "Udvalgte vine hos Otto Suenson",
        queries: ["champagne brut", "beaune bourgogne", "riesling mosel"],
        placement: "otto-suenson-page-table",
      },
      {
        title: "Champagne og magnum",
        queries: ["champagne magnum", "brut 1 cru"],
        placement: "otto-suenson-page-bubbles",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Otto Suenson?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Otto Suenson dukker ofte op, når læsere søger efter lignende vine.",
      },
      {
        question: "Kan jeg få rabat?",
        answer: "Se vores side med rabatkoder for aktuelle tilbud og vilkår hos Otto Suenson og andre partnere.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid ottosuenson.dk som kilde til endelig pris, lager og levering.",
      },
    ],
    affiliate: pa(B.ottoSuenson, "https://ottosuenson.dk/"),
  },
  {
    slug: "barlife",
    displayName: "Barlife",
    feedMerchant: "Barlife",
    blurb: "Vin, spiritus og bar — til aftenen, cocktails og hygge.",
    title: "Barlife — shop og inspiration | Vinbot",
    description:
      "Barlife er en dansk forhandler i Vinbots søgning med vin og spiritus. Se flasker, læs FAQ og gå videre til shoppen.",
    introParagraphs: [
      "Barlife er en dansk webshop med vin og spiritus — relevant når du både kigger efter flasker til bordet og til baren. Du kan finde deres produkter i Vinbots søgning.",
      "Vinbot sælger ikke vin. Denne side giver dig kontekst og flasker; du handler hos Barlife.",
      "Kombiner gerne med vores guider om fest, humør og mad, før du klikker videre til shoppen.",
    ],
    matchHeading: "Hvornår er Barlife et godt match?",
    matchBullets: [
      "Du leder efter både vin og spiritus hos samme forhandler.",
      "Du planlægger aftener, cocktails eller fest.",
      "Du har set Barlife i Vinbots søgeresultater.",
    ],
    guideLinks: [
      { href: "/fest-og-vin", label: "Fest og vin" },
      { href: "/humoer-og-vin", label: "Humør og vin" },
      { href: "/guides", label: "Guider" },
    ],
    shopCtaLabel: "Besøg Barlife",
    shopIntro: "Åbner Barlife i et nyt vindue — du handler og betaler altid hos dem.",
    productIntro: "Udvalgte produkter fra Barlife.",
    productSections: [
      {
        title: "Vin og bobler",
        queries: ["vin rødvin hvidvin", "prosecco champagne", "rosé"],
        placement: "barlife-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Barlife?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Barlife indgår i vores søgning.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid barlife.dk som kilde til endelig pris, lager og levering.",
      },
    ],
    affiliate: pa(B.barlife, "https://www.barlife.dk/"),
  },
  {
    slug: "d-wine",
    displayName: "D’Wine",
    feedMerchant: null,
    blurb: "Dansk vinwebshop — inspiration på Vinbot.",
    title: "D’Wine — shop og inspiration | Vinbot",
    description:
      "D’Wine er en dansk vinforhandler. Inspiration og kontekst på Vinbot — uden link videre til shoppen.",
    introParagraphs: [
      "D’Wine er en dansk vinwebshop med et overskueligt sortiment til hverdag og weekend.",
      "Du kan læse om forhandleren her — Vinbot linker ikke videre til d-wine.dk.",
      "Brug vinsøgningen på forsiden til at sammenligne andre forhandlere.",
    ],
    matchHeading: "Hvornår er D’Wine et godt match?",
    matchBullets: [
      "Du leder efter en mindre, overskuelig dansk vinwebshop.",
      "Du vil orientere dig om forhandleren, før du selv opsøger shoppen.",
      "Du sammenligner gerne med andre butikker via Vinbots søgning.",
    ],
    guideLinks: [
      { href: "/vine", label: "Vin-katalog" },
      { href: "/regioner", label: "Regioner" },
      { href: "/mad-og-vin", label: "Mad og vin" },
    ],
    shopCtaLabel: "Besøg D’Wine",
    shopIntro: "Vi linker ikke videre til shoppen herfra — find inspiration her, eller besøg forhandleren selv.",
    productIntro:
      "Inspiration fra andre gode forhandlere i Vinbots søgning — med billede og pris du kan klikke videre på.",
    productSections: [
      {
        title: "Bobler og festlige vine",
        queries: ["champagne cava prosecco bobler"],
        placement: "d-wine-page-bubbles",
      },
      {
        title: "Klassiske røde og hvide",
        queries: ["pinot noir", "chardonnay sauvignon"],
        placement: "d-wine-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot ikke til D’Wine?",
        answer:
          "Vi har ikke et aktivt samarbejde med D’Wine. Du kan læse om forhandleren her — uden link videre til shoppen.",
      },
      {
        question: "Kan jeg finde D’Wine-flasker i søgningen?",
        answer:
          "Nej — deres sortiment synkroniseres ikke lige nu. Brug forsiden til at sammenligne andre forhandlere.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid forhandlerens egen side som kilde til endelig pris, lager og levering.",
      },
    ],
    affiliate: { kind: "feed-only" },
  },
  {
    slug: "mere-om-vin",
    displayName: "Mere om Vin",
    feedMerchant: null,
    blurb: "Stor dansk vinwebshop — inspiration på Vinbot.",
    title: "Mere om Vin — shop og inspiration | Vinbot",
    description:
      "Mere om Vin er en dansk vinforhandler. Inspiration og kontekst på Vinbot — uden link videre til shoppen.",
    introParagraphs: [
      "Mere om Vin er en etableret dansk vinwebshop med et bredt sortiment — fra hverdagsvine til flasker til weekend, gave og fest.",
      "Du kan læse om forhandleren her — Vinbot linker ikke videre til mereomvin.dk.",
      "Brug vinsøgningen på forsiden til at sammenligne andre forhandlere.",
    ],
    matchHeading: "Hvornår er Mere om Vin et godt match?",
    matchBullets: [
      "Du vil orientere dig om en stor, dansk online-vinshop.",
      "Du sammenligner gerne med andre forhandlere via Vinbots søgning.",
      "Du læser guider på Vinbot og vil kende butikkerne bag resultaterne.",
    ],
    guideLinks: [
      { href: "/guides", label: "Guider" },
      { href: "/mad-og-vin", label: "Mad og vin" },
      { href: "/vine", label: "Vin-katalog" },
    ],
    shopCtaLabel: "Besøg Mere om Vin",
    shopIntro: "Vi linker ikke videre til shoppen herfra — find inspiration her, eller besøg forhandleren selv.",
    productIntro:
      "Inspiration fra andre gode forhandlere i Vinbots søgning — med billede og pris du kan klikke videre på.",
    productSections: [
      {
        title: "Klassikere fra andre shops",
        queries: ["bourgogne pinot noir", "rioja tempranillo", "chardonnay sauvignon"],
        placement: "mere-om-vin-page-table",
      },
      {
        title: "Bobler",
        queries: ["champagne prosecco cava brut"],
        placement: "mere-om-vin-page-bubbles",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot ikke til Mere om Vin?",
        answer:
          "Vi har ikke et aktivt samarbejde med Mere om Vin. Du kan læse om forhandleren her — uden link videre til shoppen.",
      },
      {
        question: "Kan jeg finde Mere om Vin-flasker i søgningen?",
        answer:
          "Nej — deres sortiment synkroniseres ikke lige nu. Brug forsiden til at sammenligne andre forhandlere.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid forhandlerens egen side som kilde til endelig pris, lager og levering.",
      },
    ],
    affiliate: { kind: "feed-only" },
  },
  {
    slug: "vinea",
    displayName: "Vinea",
    feedMerchant: null,
    blurb: "Dansk vinshop — inspiration på Vinbot.",
    title: "Vinea — shop og inspiration | Vinbot",
    description:
      "Vinea er en dansk vinforhandler. Inspiration og kontekst på Vinbot — uden link videre til shoppen.",
    introParagraphs: [
      "Vinea er en dansk vinwebshop med sortiment til både hverdag og særlige anledninger.",
      "Du kan læse om forhandleren her — Vinbot linker ikke videre til vinea.dk.",
      "Brug vinsøgningen på forsiden til at sammenligne andre forhandlere.",
    ],
    matchHeading: "Hvornår er Vinea et godt match?",
    matchBullets: [
      "Du vil orientere dig om Vinea som dansk vinwebshop.",
      "Du sammenligner gerne med andre forhandlere via Vinbots søgning.",
      "Du læser region- og drueguider og vil kende butikkerne bag resultaterne.",
    ],
    guideLinks: [
      { href: "/regioner", label: "Regioner" },
      { href: "/druesorter", label: "Druesorter" },
      { href: "/vine", label: "Vin-katalog" },
    ],
    shopCtaLabel: "Besøg Vinea",
    shopIntro: "Vi linker ikke videre til shoppen herfra — find inspiration her, eller besøg forhandleren selv.",
    productIntro:
      "Inspiration fra andre gode forhandlere i Vinbots søgning — med billede og pris du kan klikke videre på.",
    productSections: [
      {
        title: "Udvalgte vine fra andre shops",
        queries: ["pinot noir bourgogne", "riesling alsace", "champagne brut"],
        placement: "vinea-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot ikke til Vinea?",
        answer:
          "Vi har ikke et aktivt samarbejde med Vinea. Du kan læse om forhandleren her — uden link videre til shoppen.",
      },
      {
        question: "Kan jeg finde Vinea-flasker i søgningen?",
        answer:
          "Nej — deres sortiment synkroniseres ikke lige nu. Brug forsiden til at sammenligne andre forhandlere.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid forhandlerens egen side som kilde til endelig pris, lager og levering.",
      },
    ],
    affiliate: { kind: "feed-only" },
  },
  {
    slug: "gourmetshoppen",
    displayName: "Gourmetshoppen",
    feedMerchant: "Gourmetshoppen",
    blurb: "Gourmet og vin — flasker til madbordet og særlige anledninger.",
    title: "Gourmetshoppen — shop og inspiration | Vinbot",
    description:
      "Gourmetshoppen er en vinforhandler i Vinbots søgning. Se vin og gå videre til shoppen.",
    introParagraphs: [
      "Gourmetshoppen har vine og relaterede produkter i Vinbots søgning. Her får du intro, FAQ og flasker du kan klikke videre på.",
      "Vinbot sælger ikke vin. Du handler altid hos Gourmetshoppen, når du klikker videre.",
      "Kombiner gerne med vores mad-og-vin-guider, før du vælger flaske.",
    ],
    matchHeading: "Hvornår er Gourmetshoppen et godt match?",
    matchBullets: [
      "Du leder efter vin i en gourmet-kontekst.",
      "Du har set Gourmetshoppen i Vinbots søgning.",
      "Du vil klikke direkte fra flaskekort til shop.",
    ],
    guideLinks: [
      { href: "/mad-og-vin", label: "Mad og vin" },
      { href: "/guides/komplet-guide-til-vin-og-mad", label: "Vin og mad-guiden" },
      { href: "/opskrifter", label: "Opskrifter" },
    ],
    shopCtaLabel: "Besøg Gourmetshoppen",
    shopIntro: "Åbner Gourmetshoppen i et nyt vindue — du handler og betaler altid hos dem.",
    productIntro: "Udvalgte vine fra Gourmetshoppen.",
    productSections: [
      {
        title: "Vin hos Gourmetshoppen",
        queries: ["vin rødvin hvidvin", "champagne", "rosé"],
        placement: "gourmetshoppen-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Gourmetshoppen?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Gourmetshoppen indgår i vores søgning.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid forhandlerens egen side som kilde til pris, lager og levering.",
      },
    ],
    affiliate: pa(B.gourmetshoppen, "https://www.gourmetshoppen.dk/"),
  },
  {
    slug: "westjysk-smag",
    displayName: "Westjysk Smag",
    feedMerchant: "Westjysk Smag",
    blurb: "Vestjysk smag — lokale produkter og vin i Vinbots søgning.",
    title: "Westjysk Smag — shop og inspiration | Vinbot",
    description:
      "Westjysk Smag er en forhandler i Vinbots søgning. Læs om shoppen og se flasker med links til køb.",
    introParagraphs: [
      "Westjysk Smag indgår i Vinbots søgning. Her samler vi intro, FAQ og flasker, så du nemt kan gå videre til køb.",
      "Vinbot sælger ikke vin. Sammenlign gerne på forsiden; denne side handler kun om Westjysk Smag.",
      "Brug flaskekortene nedenfor som klare næste skridt, når en vare matcher det, du leder efter.",
    ],
    matchHeading: "Hvornår er Westjysk Smag et godt match?",
    matchBullets: [
      "Du har set Westjysk Smag i Vinbots resultater.",
      "Du vil støtte en vestjysk forhandler i vores søgning.",
      "Du vil gå direkte fra Vinbot til shoppen.",
    ],
    guideLinks: [
      { href: "/vine", label: "Vin-katalog" },
      { href: "/guides", label: "Guider" },
    ],
    shopCtaLabel: "Besøg Westjysk Smag",
    shopIntro: "Åbner Westjysk Smag i et nyt vindue — du handler og betaler altid hos dem.",
    productIntro: "Produkter fra Westjysk Smag.",
    productSections: [
      {
        title: "Udvalgte produkter",
        queries: ["vin", "rødvin hvidvin", "likør"],
        placement: "westjysk-smag-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Westjysk Smag?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid forhandlerens egen side som kilde til pris, lager og levering.",
      },
    ],
    affiliate: pa(B.westjyskSmag, "https://www.westjysk-smag.dk/"),
  },
  {
    slug: "winesommelier",
    displayName: "Winesommelier",
    feedMerchant: "Winesommelier",
    blurb: "Vin med fokus på smag og vejledning — i Vinbots søgning.",
    title: "Winesommelier — shop og inspiration | Vinbot",
    description:
      "Winesommelier er en dansk vinforhandler i Vinbots søgning. Inspiration, flasker og link til shoppen.",
    introParagraphs: [
      "Winesommelier er en dansk vinwebshop i Vinbots søgning. Her får du baggrund, FAQ og flasker du kan klikke videre på.",
      "Vinbot sælger ikke vin. Brug vinsøgningen til at sammenligne; her er fokus Winesommelier.",
      "Shoppen passer godt, når du vil gå fra guide-læsning til konkrete flasker hos én forhandler.",
    ],
    matchHeading: "Hvornår er Winesommelier et godt match?",
    matchBullets: [
      "Du har set Winesommelier i søgeresultaterne.",
      "Du vil have sommelier-agtig inspiration kombineret med køb online.",
      "Du vil bruge flaskekortene som næste skridt til køb.",
    ],
    guideLinks: [
      { href: "/druesorter", label: "Druesorter" },
      { href: "/regioner", label: "Regioner" },
      { href: "/bedste-vine", label: "Bedste vine" },
    ],
    shopCtaLabel: "Besøg Winesommelier",
    shopIntro: "Åbner Winesommelier i et nyt vindue — du handler og betaler altid hos dem.",
    productIntro: "Flasker fra Winesommelier.",
    productSections: [
      {
        title: "Udvalgte vine",
        queries: ["pinot noir", "chardonnay", "champagne riesling"],
        placement: "winesommelier-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Winesommelier?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid winesommelier.dk som kilde til endelig pris, lager og levering.",
      },
    ],
    affiliate: pa(B.winesommelier, "https://winesommelier.dk/"),
  },
  {
    slug: "bottles-with-history",
    displayName: "Bottles With History",
    feedMerchant: "Bottles With History",
    blurb: "Vintage og ældre vine — flasker med historie.",
    title: "Bottles With History — vintage vin",
    description:
      "Bottles With History: vintage og ældre vine. Se flasker med pris på Vinbot og klik videre til shoppen.",
    introParagraphs: [
      "Bottles With History specialiserer sig i vintage og ældre vine — flasker der har ligget i årtier og fortæller en historie. Du kan finde deres flasker i Vinbots søgning.",
      "Vinbot sælger ikke vin. På denne side får du intro og flasker; det nemmeste er at klikke videre fra flaskekortene nedenfor.",
      "Oplagt til gaver, jubilæer og særlige anledninger, hvor årgang og historie betyder mere end hverdagspris.",
    ],
    matchHeading: "Hvornår er Bottles With History et godt match?",
    matchBullets: [
      "Du leder efter vintage eller ældre vine.",
      "Du vil give en flaske med historie til jubilæum eller gave.",
      "Du har set Bottles With History i Vinbots søgning.",
    ],
    guideLinks: [
      { href: "/bedste-vine", label: "Bedste vine" },
      { href: "/regioner", label: "Regioner" },
      { href: "/guides", label: "Guider" },
    ],
    shopCtaLabel: "Se flasker nedenfor",
    shopIntro:
      "Brug flaskekortene nedenfor — de linker videre til shoppen. Åbn bottleswithhistory.dk, når du vil browse hele sortimentet.",
    productIntro: "Vintage og ældre vine fra Bottles With History.",
    productSections: [
      {
        title: "Udvalgte flasker",
        queries: ["vin vintage", "rødvin", "bordeaux"],
        placement: "bwh-page-table",
      },
    ],
    faq: [
      {
        question: "Hvad er Bottles With History?",
        answer:
          "Bottles With History er en vinforhandler med vintage og ældre vine. På Vinbot kan du se flasker og klikke videre til shoppen.",
      },
      {
        question: "Hvorfor linker Vinbot til Bottles With History?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid bottleswithhistory.dk som kilde til pris, lager og levering.",
      },
    ],
    affiliate: { kind: "feed-only" },
  },
  {
    slug: "8wines",
    displayName: "8wines",
    feedMerchant: "8wines",
    blurb: "International vinwebshop med stort udvalg — i Vinbots søgning.",
    title: "8wines — shop og inspiration | Vinbot",
    description:
      "8wines er en vinforhandler i Vinbots søgning. Se flasker med pris og klik videre til køb.",
    introParagraphs: [
      "8wines er en international vinwebshop i Vinbots søgning. Her får du kontekst og flasker du kan klikke videre på.",
      "Vinbot sælger ikke vin. Det nemmeste er at klikke videre fra flaskekortene nedenfor.",
      "Brug forsiden til at sammenligne med danske forhandlere, hvis du vil se flere shops side om side.",
    ],
    matchHeading: "Hvornår er 8wines et godt match?",
    matchBullets: [
      "Du har set 8wines i Vinbots søgeresultater.",
      "Du vil browse et stort, internationalt sortiment.",
      "Du vil bruge flaskekort som næste skridt til køb.",
    ],
    guideLinks: [
      { href: "/vine", label: "Vin-katalog" },
      { href: "/regioner", label: "Regioner" },
    ],
    shopCtaLabel: "Se flasker nedenfor",
    shopIntro: "Brug flaskekortene nedenfor — klik videre for at købe.",
    productIntro: "Flasker fra 8wines.",
    productSections: [
      {
        title: "Udvalgte vine hos 8wines",
        queries: ["pinot noir", "chardonnay", "champagne"],
        placement: "8wines-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til 8wines?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid 8wines’ egen side som kilde til pris, lager og levering.",
      },
    ],
    affiliate: { kind: "feed-only" },
  },
  {
    slug: "wine-store",
    displayName: "Wine Store",
    feedMerchant: "Wine Store",
    blurb: "Vinwebshop i Vinbots søgning — flasker med direkte købs-links.",
    title: "Wine Store — shop og inspiration | Vinbot",
    description:
      "Wine Store er en forhandler i Vinbots søgning. Se flasker, læs FAQ og klik videre til køb.",
    introParagraphs: [
      "Wine Store indgår i Vinbots søgning. Her får du intro, FAQ og flasker du kan klikke videre på.",
      "Vinbot sælger ikke vin. Det nemmeste er at klikke videre fra flaskekortene nedenfor.",
      "Sammenlign gerne med andre forhandlere på forsiden, før du vælger, hvor du handler.",
    ],
    matchHeading: "Hvornår er Wine Store et godt match?",
    matchBullets: [
      "Du har set Wine Store i Vinbots søgning.",
      "Du vil klikke direkte fra flaskekort til shop.",
      "Du browser flere internationale vine i kataloget.",
    ],
    guideLinks: [
      { href: "/vine", label: "Vin-katalog" },
      { href: "/guides", label: "Guider" },
    ],
    shopCtaLabel: "Se flasker nedenfor",
    shopIntro: "Brug flaskekortene nedenfor — de linker videre til shoppen.",
    productIntro: "Flasker fra Wine Store.",
    productSections: [
      {
        title: "Udvalgte vine",
        queries: ["rødvin", "hvidvin", "prosecco"],
        placement: "wine-store-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Wine Store?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid forhandlerens egen side som kilde til pris, lager og levering.",
      },
    ],
    affiliate: { kind: "feed-only" },
  },
  {
    slug: "decantalo",
    displayName: "Decantalo",
    feedMerchant: "Decantalo",
    blurb: "International vinwebshop med spanske og europæiske flasker — i Vinbots søgning.",
    title: "Decantalo — shop og inspiration | Vinbot",
    description:
      "Decantalo er en international vinforhandler i Vinbots søgning. Se flasker med pris og klik videre til køb.",
    introParagraphs: [
      "Decantalo er en international vinwebshop med stærkt fokus på spanske og europæiske vine. Du kan finde flasker i søgningen og klikke videre til shoppen.",
      "Vinbot sælger ikke vin. Du handler og betaler altid hos Decantalo — via shop-link eller flaskekortene nedenfor.",
      "Brug forsiden til at sammenligne med danske forhandlere, hvis du vil se flere shops side om side — og husk fragt og told, når du handler internationalt.",
    ],
    matchHeading: "Hvornår er Decantalo et godt match?",
    matchBullets: [
      "Du har set Decantalo i Vinbots søgeresultater.",
      "Du vil browse spanske eller internationale vine hos én shop.",
      "Du vil bruge flaskekort eller shop-link som næste skridt til køb.",
    ],
    guideLinks: [
      { href: "/vine", label: "Vin-katalog" },
      { href: "/regioner", label: "Regioner" },
      { href: "/guides", label: "Guider" },
    ],
    shopCtaLabel: "Besøg Decantalo",
    shopIntro: "Åbner Decantalo i et nyt vindue — du handler og betaler altid hos dem.",
    productIntro: "Flasker fra Decantalo.",
    productSections: [
      {
        title: "Udvalgte vine hos Decantalo",
        queries: ["rioja", "ribera del duero", "albariño"],
        placement: "decantalo-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Decantalo?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig.",
      },
      {
        question: "Kan jeg se Decantalo i Vinbots vin-katalog?",
        answer:
          "Ja. Flasker indgår i vinsøgningen og under vin-kataloget, når de matcher vores filtre — sammenlign pris og forhandler der.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid Decantalos egen side som kilde til pris, lager og levering.",
      },
    ],
    affiliate: { kind: "daisycon", shopHref: DECANTALO_SHOP_HREF },
  },
  {
    slug: "quierovinos",
    displayName: "QuieroVinos",
    feedMerchant: null,
    blurb: "International vinwebshop — link til shoppen (sortiment i søgningen kommer senere).",
    title: "QuieroVinos — shop og inspiration | Vinbot",
    description:
      "QuieroVinos er en international vinforhandler. Inspiration og direkte shop-link — sortiment i søgningen kommer senere.",
    introParagraphs: [
      "QuieroVinos er en international vinwebshop. Sortimentet er endnu ikke i vores søgning — her får du kontekst og et link videre til shoppen.",
      "Vinbot sælger ikke vin. Du handler og betaler altid hos QuieroVinos, når du klikker videre.",
      "Brug vinsøgningen på forsiden til at sammenligne flasker fra andre forhandlere, før du vælger, hvor du handler.",
    ],
    matchHeading: "Hvornår er QuieroVinos et godt match?",
    matchBullets: [
      "Du vil browse en international vinshop direkte.",
      "Du har hørt om QuieroVinos og vil hoppe videre fra Vinbot.",
      "Du sammenligner gerne med andre shops i Vinbots søgning først.",
    ],
    guideLinks: [
      { href: "/vine", label: "Vin-katalog" },
      { href: "/regioner", label: "Regioner" },
      { href: "/guides", label: "Guider" },
    ],
    shopCtaLabel: "Besøg QuieroVinos",
    shopIntro: "Åbner QuieroVinos i et nyt vindue — du handler og betaler altid hos dem.",
    showRabatkoderLink: true,
    productIntro:
      "Inspiration fra andre forhandlere i Vinbots søgning — QuieroVinos er endnu ikke i kataloget.",
    productSections: [
      {
        title: "Spanske og internationale vine (andre shops)",
        queries: ["rioja", "priorat", "tempranillo"],
        placement: "quierovinos-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til QuieroVinos?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig.",
      },
      {
        question: "Kan jeg se QuieroVinos-flasker i Vinbots søgning?",
        answer:
          "Ikke endnu. Brug shop-linket ovenfor, eller sammenlign andre forhandlere i vinsøgningen.",
      },
      {
        question: "Kan jeg få rabat hos QuieroVinos?",
        answer:
          "Ja — nye kunder kan ofte få 5% på første køb med koden WELCOME. Se aktuelle vilkår under rabatkoder, og tjek altid quierovinos.com før du betaler.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid QuieroVinos’ egen side som kilde til pris, lager og levering.",
      },
    ],
    affiliate: { kind: "daisycon", shopHref: QUIEROVINOS_SHOP_HREF },
  },
  {
    slug: "vinpalle",
    displayName: "Vinpalle",
    feedMerchant: "Vinpalle",
    blurb: "Dansk vinshop med flasker i Vinbots søgning.",
    title: "Vinpalle — shop og inspiration | Vinbot",
    description:
      "Vinpalle er en vinforhandler hos Vinbot. Se flasker og priser — uden link videre til shoppen.",
    introParagraphs: [
      "Vinpalle er en dansk vinwebshop. Du kan se udvalgte flasker og priser her på Vinbot.",
      "Vinbot linker ikke videre til vinpalle.dk — brug siden til at danne dig et indtryk, før du selv opsøger shoppen.",
      "Brug vinsøgningen på forsiden, når du vil sammenligne på tværs af flere forhandlere.",
    ],
    matchHeading: "Hvornår er Vinpalle et godt match?",
    matchBullets: [
      "Du har set Vinpalle i Vinbots søgeresultater.",
      "Du vil se deres flasker i vinsøgningen.",
      "Du bruger AI-søgningen til at finde vin på tværs af flere butikker.",
    ],
    guideLinks: [
      { href: "/vine", label: "Vin-katalog" },
      { href: "/tilbud", label: "Vin tilbud" },
    ],
    shopCtaLabel: "Besøg Vinpalle",
    shopIntro: "Vi linker ikke videre til shoppen herfra — find inspiration her, eller besøg forhandleren selv.",
    productIntro: "Udvalgte flasker fra Vinpalle — uden link videre til shoppen.",
    productSections: [
      {
        title: "Udvalgte vine hos Vinpalle",
        queries: ["vin rødvin", "hvidvin", "prosecco"],
        placement: "vinpalle-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot ikke til Vinpalle?",
        answer:
          "Vi har ikke et aktivt samarbejde med Vinpalle. Du kan se flasker og priser her — uden link videre til shoppen.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Priser kan skifte — tjek altid hos forhandleren selv, hvis du vil handle.",
      },
    ],
    affiliate: { kind: "feed-only" },
  },
  {
    slug: "villa-bianca",
    displayName: "Villa Bianca",
    feedMerchant: "Villa Bianca",
    blurb: "Italiensk vin og Bulichella — flasker i Vinbots søgning.",
    title: "Villa Bianca — shop og inspiration | Vinbot",
    description:
      "Villa Bianca er en vinforhandler hos Vinbot. Se flasker og priser — uden link videre til shoppen.",
    introParagraphs: [
      "Villa Bianca sælger italiensk vin — blandt andet Bulichella og smagekasser. Du kan se udvalgte flasker og priser her på Vinbot.",
      "Vinbot linker ikke videre til villabianca.eu — brug siden til at danne dig et indtryk, før du selv opsøger shoppen.",
      "Brug vinsøgningen på forsiden, når du vil sammenligne på tværs af flere forhandlere.",
    ],
    matchHeading: "Hvornår er Villa Bianca et godt match?",
    matchBullets: [
      "Du leder efter italiensk vin, Bulichella eller en smagekasse.",
      "Du har set Villa Bianca i Vinbots søgeresultater.",
      "Du vil se deres flasker i vinsøgningen.",
    ],
    guideLinks: [
      { href: "/vine", label: "Vin-katalog" },
      { href: "/tilbud", label: "Vin tilbud" },
    ],
    shopCtaLabel: "Besøg Villa Bianca",
    shopIntro: "Vi linker ikke videre til shoppen herfra — find inspiration her, eller besøg forhandleren selv.",
    productIntro: "Udvalgte flasker fra Villa Bianca — uden link videre til shoppen.",
    productSections: [
      {
        title: "Udvalgte vine hos Villa Bianca",
        queries: ["bulichella", "rødvin", "smagekasse"],
        placement: "villa-bianca-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot ikke til Villa Bianca?",
        answer:
          "Vi har ikke et aktivt samarbejde med Villa Bianca. Du kan se flasker og priser her — uden link videre til shoppen.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Priser kan skifte — tjek altid hos forhandleren selv, hvis du vil handle.",
      },
    ],
    affiliate: { kind: "feed-only" },
  },
  {
    slug: "vindien",
    displayName: "Vindien",
    feedMerchant: "Vindien",
    blurb: "Indisk og georgisk vin — flasker i Vinbots søgning.",
    title: "Vindien — indisk vin og inspiration | Vinbot",
    description:
      "Vindien er en vinforhandler hos Vinbot. Fokus på indisk og georgisk vin. Se flasker og priser — uden link videre til shoppen.",
    introParagraphs: [
      "Vindien sælger indisk vin (Sula, Grover Zampa, Fratelli m.fl.) og udvalgt georgisk vin. Du kan se udvalgte flasker og priser her på Vinbot.",
      "Vinbot linker ikke videre til vindien.dk — brug siden til at danne dig et indtryk, før du selv opsøger shoppen.",
      "Brug vinsøgningen på forsiden, når du vil sammenligne på tværs af flere forhandlere.",
    ],
    matchHeading: "Hvornår er Vindien et godt match?",
    matchBullets: [
      "Du leder efter indisk vin, Sula, Grover Zampa eller Fratelli.",
      "Du har set Vindien i Vinbots søgeresultater.",
      "Du vil se deres flasker i vinsøgningen.",
    ],
    guideLinks: [
      { href: "/vine", label: "Vin-katalog" },
      { href: "/tilbud", label: "Vin tilbud" },
    ],
    shopCtaLabel: "Besøg Vindien",
    shopIntro: "Vi linker ikke videre til shoppen herfra — find inspiration her, eller besøg forhandleren selv.",
    productIntro: "Udvalgte flasker fra Vindien — uden link videre til shoppen.",
    productSections: [
      {
        title: "Udvalgte vine hos Vindien",
        queries: ["sula", "grover", "fratelli", "hvidvin"],
        placement: "vindien-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot ikke til Vindien?",
        answer:
          "Vi har ikke et aktivt samarbejde med Vindien. Du kan se flasker og priser her — uden link videre til shoppen.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Priser kan skifte — tjek altid hos forhandleren selv, hvis du vil handle.",
      },
    ],
    affiliate: { kind: "feed-only" },
  },
  {
    slug: "whiskystack",
    displayName: "Whiskystack",
    feedMerchant: "Whiskystack",
    blurb: "Whisky, rom og vin — kurateret spiritusshop i Vinbots søgning.",
    title: "Whiskystack — whisky, rom og vin | Vinbot",
    description:
      "Whiskystack er en dansk spiritus- og vinforhandler i Vinbots søgning. Se produkter og gå videre til shoppen.",
    introParagraphs: [
      "Whiskystack er en dansk webshop med fokus på whisky, rom og udvalgt vin. Du kan finde deres produkter i Vinbots søgning.",
      "Vinbot er primært vin — men Whiskystack dukker op, når søgningen matcher. Her får du intro, FAQ og produkter du kan klikke videre på.",
      "Du handler altid hos Whiskystack; Vinbot sælger ikke spiritus eller vin.",
    ],
    matchHeading: "Hvornår er Whiskystack et godt match?",
    matchBullets: [
      "Du leder efter whisky, rom eller begrænset vinudvalg.",
      "Du har set Whiskystack i Vinbots resultater.",
      "Du vil gå direkte fra Vinbot til shoppen.",
    ],
    guideLinks: [
      { href: "/fest-og-vin", label: "Fest og vin" },
      { href: "/guides", label: "Guider" },
    ],
    shopCtaLabel: "Besøg Whiskystack",
    shopIntro: "Åbner Whiskystack i et nyt vindue — du handler og betaler altid hos dem.",
    productIntro: "Produkter fra Whiskystack.",
    productSections: [
      {
        title: "Udvalgte produkter",
        queries: ["whisky", "rom", "vin"],
        placement: "whiskystack-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Whiskystack?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid whiskystack.com som kilde til pris, lager og levering.",
      },
    ],
    affiliate: pa(B.whiskystack, "https://whiskystack.com/"),
  },
  {
    slug: "spitus",
    displayName: "Spitus",
    feedMerchant: "Spitus",
    blurb: "Spiritus, champagne og portvin — dansk shop i Vinbots søgning.",
    title: "Spitus — spiritus, champagne og vin | Vinbot",
    description:
      "Spitus er en dansk spiritus- og vinforhandler i Vinbots søgning. Se champagne, portvin og mere — og gå videre til spitus.dk.",
    introParagraphs: [
      "Spitus er en dansk webshop med fokus på spiritus (whisky, gin, vodka m.m.) samt champagne, portvin og udvalgt vin. Du kan finde deres vin- og bobler-produkter i Vinbots søgning.",
      "Vinbot er primært vin — men Spitus dukker op, når søgningen matcher. Her får du intro, FAQ og produkter du kan klikke videre på.",
      "Du handler altid hos Spitus; Vinbot sælger ikke spiritus eller vin.",
    ],
    matchHeading: "Hvornår er Spitus et godt match?",
    matchBullets: [
      "Du leder efter champagne, portvin eller begrænset vinudvalg.",
      "Du har set Spitus i Vinbots resultater.",
      "Du vil gå direkte fra Vinbot til spitus.dk.",
    ],
    guideLinks: [
      { href: "/fest-og-vin", label: "Fest og vin" },
      { href: "/guides", label: "Guider" },
    ],
    shopCtaLabel: "Besøg Spitus",
    shopIntro: "Åbner Spitus i et nyt vindue — du handler og betaler altid hos dem.",
    productIntro: "Produkter fra Spitus.",
    productSections: [
      {
        title: "Udvalgte produkter",
        queries: ["champagne", "portvin", "bobler"],
        placement: "spitus-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Spitus?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid spitus.dk som kilde til pris, lager og levering.",
      },
    ],
    affiliate: pa(B.spitus, "https://spitus.dk/"),
  },
  {
    slug: "lovegaarden",
    displayName: "Løvegården",
    feedMerchant: "Løvegården",
    blurb: "Alkoholfri cider, mocktails og 0 % vin — glutenfri gourmetshop i Vinbots søgning.",
    title: "Løvegården — alkoholfri cider og 0 % vin | Vinbot",
    description:
      "Løvegården er en dansk glutenfri webshop med alkoholfri cider, mocktails og alkoholfri vin. Se udvalget på Vinbot og gå videre til loevegaarden.dk.",
    introParagraphs: [
      "Løvegården er en dansk glutenfri gourmetshop med et stærkt udvalg af alkoholfri drikke — cider, mocktails, spritz og udvalgt 0 % vin. På Vinbot viser vi de drikke, der giver mening i en vin- og alkoholfri kontekst.",
      "Du finder blandt andet Himmelstund-cider, Sir James mocktails, alkoholfri spumante og gløgg. Delikatesser og nonfood fra shoppen er filtreret fra Vinbots søgning.",
      "Du handler altid hos Løvegården; Vinbot sælger ikke vin eller cider.",
    ],
    matchHeading: "Hvornår er Løvegården et godt match?",
    matchBullets: [
      "Du leder efter alkoholfri cider, mocktails eller 0 % vin.",
      "Du vil have glutenfri valg til fest, jul eller Dry January.",
      "Du har set Løvegården i Vinbots alkoholfri-søgning.",
    ],
    guideLinks: [
      { href: "/alkoholfri-vin", label: "Alkoholfri vin" },
      { href: "/guides/bedste-alkoholfri-bobler", label: "Bedste alkoholfri bobler" },
      { href: "/guides/alkoholfri-gin-tonic-og-aperitif", label: "Alkoholfri gin & aperitif" },
      { href: "/guides/alkoholfri-vin-til-dry-january", label: "Dry January" },
    ],
    shopCtaLabel: "Besøg Løvegården",
    shopIntro: "Åbner Løvegården i et nyt vindue — du handler og betaler altid hos dem.",
    productsHeading: "Udvalgte alkoholfri drikke hos Løvegården",
    productIntro:
      "Alkoholfri cider, mocktails og 0 % vin fra Løvegårdens feed — filtreret til drikke, ikke delikatesser.",
    displayBanners: [
      {
        bannerId: B.lovegaardenDisplay,
        alt: "Løvegården — alkoholfri cider og drikke",
        variant: "box",
      },
      {
        bannerId: B.lovegaardenSkyscraper,
        alt: "Løvegården — shop alkoholfri",
        variant: "skyscraper",
      },
    ],
    productSections: [
      {
        title: "Alkoholfri cider",
        queries: ["alkoholfri cider", "himmelstund cider", "æblecider"],
        placement: "lovegaarden-page-cider",
      },
      {
        title: "Mocktails og spritz",
        queries: ["sir james", "himmelstund spritz", "mocktail alkoholfri"],
        placement: "lovegaarden-page-mocktail",
      },
      {
        title: "Alkoholfri vin og bobler",
        queries: ["alkoholfri spumante", "anna spinato", "alkoholfri vin"],
        placement: "lovegaarden-page-vin",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Løvegården?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Løvegården er relevant for alkoholfri cider, mocktails og 0 % vin.",
      },
      {
        question: "Kommer hele Løvegårdens sortiment i Vinbots søgning?",
        answer:
          "Nej. Vi viser alkoholfri drikke, cider, mocktails og udvalgt 0 % vin — ikke ost, krydderier og øvrige delikatesser.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid loevegaarden.dk som kilde til pris, lager og levering.",
      },
    ],
    affiliate: pa(B.lovegaarden, "https://www.loevegaarden.dk/"),
  },
  {
    slug: "beer-me",
    displayName: "Beer Me",
    feedMerchant: "Beer Me",
    blurb: "Øl og abonnement — dansk shop i Vinbots søgning.",
    title: "Beer Me — øl og shop | Vinbot",
    description:
      "Beer Me er en dansk ølforhandler i Vinbots søgning. Se produkter og gå videre til beer-me.dk.",
    introParagraphs: [
      "Beer Me er en dansk webshop og ølabonnement. Vinbot er vin-first, men Beer Me er relevant for læsere, der også søger øl.",
      "I footeren finder du også et dedikeret abonnements-promo. Denne side dækker shoppen bredere med produkter fra søgningen.",
      "Vinbot sælger ikke øl — du handler altid hos Beer Me.",
    ],
    matchHeading: "Hvornår er Beer Me et godt match?",
    matchBullets: [
      "Du leder efter øl eller ølabonnement.",
      "Du har set Beer Me i Vinbots søgning eller footer-promo.",
      "Du vil gå direkte fra Vinbot til beer-me.dk.",
    ],
    guideLinks: [
      { href: "/fest-og-vin", label: "Fest og vin" },
      { href: "/rabatkoder", label: "Rabatkoder" },
    ],
    shopCtaLabel: "Besøg Beer Me",
    shopIntro: "Åbner Beer Me i et nyt vindue — du handler og betaler altid hos dem.",
    showRabatkoderLink: true,
    productIntro: "Produkter fra Beer Me.",
    productSections: [
      {
        title: "Udvalgte produkter",
        queries: ["øl", "ipa", "stout"],
        placement: "beer-me-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Beer Me?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Beer Me har både shop og abonnement.",
      },
      {
        question: "Kan jeg få rabat?",
        answer: "Se rabatkoder for aktuelle tilbud hos Beer Me.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid beer-me.dk som kilde til pris, lager og levering.",
      },
    ],
    affiliate: pa(B.beerMeShop, "https://www.beer-me.dk/"),
  },
];

const bySlug = new Map(MERCHANT_HUBS.map((h) => [h.slug, h]));

export function getMerchantHub(slug: string): MerchantHubConfig | undefined {
  return bySlug.get(slug);
}

export function getAllMerchantHubs(): MerchantHubConfig[] {
  return MERCHANT_HUBS;
}

/** Cross-links: andre hubs (ekskl. nuværende), max `limit`. */
export function getRelatedMerchantHubs(slug: string, limit = 6): MerchantHubConfig[] {
  return MERCHANT_HUBS.filter((h) => h.slug !== slug).slice(0, limit);
}

/** @deprecated DSF er gratis butik uden shop-CTA — returnerer null. */
export function dsfHubShopHref(): string | null {
  return null;
}
