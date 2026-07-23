import { HAVNENS_VIN_SHOP_HREF } from "@/lib/daisycon-links";
import { PARTNER_ADS_KLIK_BANNERS, partnerAdsKlikUrl } from "@/lib/partner-ads-links";
import { partnerAdsDsfClickUrl } from "@/lib/site";
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
  if (a.kind === "direct") return a.shopUrl;
  return null;
}

export const MERCHANT_HUBS: MerchantHubConfig[] = [
  {
    slug: "den-sidste-flaske",
    displayName: "Den Sidste Flaske",
    feedMerchant: null,
    blurb: "Restpartier, daglige tilbud og sjældne flasker hos en af Danmarks stærkeste vinshops.",
    title: "Den Sidste Flaske — vin tilbud og shop online",
    description:
      "Gå til Den Sidste Flaske (densidsteflaske.dk): restpartier, daglige tilbud og sjældne flasker. Vinbot guider dig med kuraterede anbefalinger — klik videre til shoppen.",
    introParagraphs: [
      "Den Sidste Flaske (densidsteflaske.dk) er en af landets stærkeste vin-shops med restpartier, limited releases og daglige tilbud. Her på Vinbot får du inspiration, læsning og konkrete idéer — og du hopper nemt videre til shoppen, når du er klar til at købe.",
      "Vinbot sælger ikke vin selv. Vi samler kuraterede forslag og guider, så du hurtigere finder den rigtige flaske — og linker tydeligt videre, når du vil handle hos Den Sidste Flaske.",
      "Sortimentet skifter ofte: restpartier, kampagner og limited editions betyder, at dagens tilbud kan være væk i morgen. Brug derfor altid densidsteflaske.dk som kilde til pris, lager og årgang.",
    ],
    matchHeading: "Hvornår er Den Sidste Flaske et godt match?",
    matchBullets: [
      "Du jagter restpartier, limited releases og daglige tilbud.",
      "Du vil have konkrete flaskeforslag og så købe direkte i shoppen.",
      "Du sammenligner gerne med andre forhandlere via Vinbots søgning, men handler ofte hos DSF.",
    ],
    guideLinks: [
      { href: "/guides/humoer-stemning-og-vin", label: "Humør og stemning" },
      { href: "/guides/komplet-guide-til-vin-og-mad", label: "Vin og mad" },
      { href: "/tilbud", label: "Vin tilbud" },
    ],
    shopCtaLabel: "Søg hos Den Sidste Flaske (eksempel: champagne)",
    shopIntro:
      "Find kampagner, limited releases og hele deres sortiment på deres egen side. Linket åbner i et nyt vindue — du handler altid hos forhandleren.",
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
        question: "Hvad er Den Sidste Flaske?",
        answer:
          "Den Sidste Flaske (densidsteflaske.dk) er en dansk vinwebshop med restpartier, limited releases og daglige tilbud. Vinbot linker videre til deres shop, når du vil købe — vi sælger ikke selv vin.",
      },
      {
        question: "Hvor finder jeg hele sortimentet fra Den Sidste Flaske?",
        answer:
          "Det bedste overblik får du direkte på deres egen webshop. Her på Vinbot samler vi inspiration, guider og forslag — og linker tydeligt videre, når du vil handle hos dem.",
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
    affiliate: {
      kind: "partner-ads",
      bannerId: B.denSidsteFlaske,
      shopUrl:
        "https://densidsteflaske.dk/search?q=champagne&form_type=product&utf8=%E2%9C%93",
    },
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
      "Vinbot sælger ikke vin. Brug vinsøgningen til at sammenligne på tværs; denne side samler kontekst om Winther Vin og viser flasker fra deres feed, du kan klikke videre på.",
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
      "Fra vores produktfeed — udvalget skifter. Vil du sammenligne med andre butikker, brug forsiden.",
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
      "Vinbot sælger ikke vin. Brug vinsøgningen på forsiden til at sammenligne pris på tværs; her dykker vi ned i DH Wines og viser udvalgte flasker fra deres feed.",
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
    productIntro: "Et udsnit fra vores produktfeed — udvalg og priser kan skifte dag til dag.",
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
      "Vinbot sælger ikke vin. Brug vinsøgningen på forsiden til at sammenligne på tværs; her fokuserer vi på Johnsen Wine (i produktfeedet vist som «Johnsen Vine»).",
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
      "Fra vores produktfeed (vist som «Johnsen Vine» i data). Udvalget varierer — sammenlign gerne på forsiden.",
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
      "Flasker fra deres Daisycon-feed indgår i vores søgning, når de matcher vinfiltrene — så kan du både browse her og købe via tracked links.",
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
          "Ja. Flasker fra feedet indgår i vinsøgningen og under /vine, når de matcher vores vinfiltre — sammenlign pris og forhandler der.",
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
      "SPS Wine er en dansk vinforhandler i Vinbots søgning. Læs om shoppen, se flasker med pris og gå videre via affiliate-link — uden merpris for dig.",
    introParagraphs: [
      "SPS Wine er en dansk vinwebshop, der indgår i Vinbots produktfeed — så du kan finde deres flasker i vores søgning og katalog, når de matcher vinfiltrene.",
      "Her på siden får du en kort introduktion til forhandleren, FAQ om affiliate, og konkrete flaske-CTA’er fra feedet. Vinbot sælger ikke vin; du handler altid hos SPS Wine.",
      "Brug siden, når du vil gå fra inspiration til køb hos én specifik shop — eller sammenlign først på forsiden på tværs af flere forhandlere.",
    ],
    matchHeading: "Hvornår er SPS Wine et godt match?",
    matchBullets: [
      "Du har set SPS Wine i Vinbots søgeresultater og vil dykke ned i deres udvalg.",
      "Du vil have direkte flaske-links med billede og pris fra deres feed.",
      "Du følger gerne med i rabatter og kampagner (se rabatkoder).",
    ],
    guideLinks: [
      { href: "/rabatkoder", label: "Rabatkoder" },
      { href: "/regioner", label: "Regioner" },
      { href: "/vine", label: "Vin-katalog" },
    ],
    shopCtaLabel: "Besøg SPS Wine",
    shopIntro: "Åbner SPS Wine i et nyt vindue — du handler og betaler altid hos dem.",
    showRabatkoderLink: true,
    productIntro: "Udvalgte flasker fra SPS Wine i vores feed — klik videre for at købe hos dem.",
    productSections: [
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
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. SPS Wine indgår i vores Partner-Ads-feed og sorterer godt ind i vores læseres søgninger.",
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
    slug: "mere-om-vin",
    displayName: "Mere om Vin",
    feedMerchant: "Mere om Vin",
    blurb: "Stor dansk vinwebshop med bredt sortiment til hverdag og fest.",
    title: "Mere om Vin — shop og inspiration | Vinbot",
    description:
      "Mere om Vin er en dansk vinforhandler i Vinbots søgning. Inspiration, flasker med pris og direkte link til shoppen via Partner-Ads.",
    introParagraphs: [
      "Mere om Vin er en etableret dansk vinwebshop med et bredt sortiment — fra hverdagsvine til flasker til weekend, gave og fest. Deres produkter indgår i Vinbots Partner-Ads-feed.",
      "På denne side finder du kontekst om forhandleren, FAQ og flaske-CTA’er fra feedet. Vinbot sælger ikke vin; du køber og betaler altid hos Mere om Vin.",
      "Mange læsere lander her efter en søgning på forsiden, eller når de vil tjekke rabatkoder og nyhedsbrev hos netop denne shop.",
    ],
    matchHeading: "Hvornår er Mere om Vin et godt match?",
    matchBullets: [
      "Du vil browse et stort, dansk online-sortiment.",
      "Du har fundet Mere om Vin i søgeresultaterne og vil se flere flasker.",
      "Du vil kombinere Vinbot-guider med én konkret webshop.",
    ],
    guideLinks: [
      { href: "/rabatkoder", label: "Rabatkoder" },
      { href: "/guides", label: "Guider" },
      { href: "/mad-og-vin", label: "Mad og vin" },
    ],
    shopCtaLabel: "Besøg Mere om Vin",
    shopIntro: "Åbner Mere om Vin i et nyt vindue — du handler og betaler altid hos dem.",
    showRabatkoderLink: true,
    productIntro: "Flasker fra Mere om Vin i vores feed — udvalget skifter.",
    productSections: [
      {
        title: "Klassikere hos Mere om Vin",
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
        question: "Hvorfor linker Vinbot til Mere om Vin?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Mere om Vin er en af vores Partner-Ads-partnere med aktivt produktfeed.",
      },
      {
        question: "Kan jeg få rabat?",
        answer: "Se rabatkoder — Mere om Vin optræder ofte med nyhedsbrev eller kampagner. Tjek aktuelle vilkår på mereomvin.dk.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid mereomvin.dk som autoritativ kilde til pris, lager og levering.",
      },
    ],
    affiliate: pa(B.mereOmVin, "https://mereomvin.dk/"),
  },
  {
    slug: "winefriends",
    displayName: "Winefriends",
    feedMerchant: "Winefriends",
    blurb: "Vinwebshop med fokusvenlige flasker og jævnlige kampagner.",
    title: "Winefriends — shop og inspiration | Vinbot",
    description:
      "Winefriends er en dansk vinforhandler i Vinbots søgning. Læs om shoppen, se flasker og gå videre via Partner-Ads-link.",
    introParagraphs: [
      "Winefriends er en dansk vinwebshop, hvis sortiment indgår i Vinbots Partner-Ads-feed. Her får du en hub med intro, FAQ og flasker du kan klikke videre på.",
      "Vinbot sælger ikke vin. Brug forsiden til at sammenligne på tværs; denne side er dedikeret til Winefriends.",
      "Shoppen passer godt, når du vil finde vine til aftenen, gæster eller en gave — og samtidig holde øje med kampagner via rabatkoder.",
    ],
    matchHeading: "Hvornår er Winefriends et godt match?",
    matchBullets: [
      "Du har set Winefriends i søgeresultaterne og vil se mere fra dem.",
      "Du vil have direkte produkt-CTA’er med billede og pris.",
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
    productIntro: "Udvalgte flasker fra Winefriends i vores feed.",
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
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Winefriends har aktivt Partner-Ads-feed i vores søgning.",
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
    slug: "vinea",
    displayName: "Vinea",
    feedMerchant: "Vinea",
    blurb: "Dansk vinshop med sortiment til både hverdag og særlige anledninger.",
    title: "Vinea — shop og inspiration | Vinbot",
    description:
      "Vinea er en dansk vinforhandler i Vinbots Partner-Ads-feed. Inspiration, flasker med pris og link til shoppen.",
    introParagraphs: [
      "Vinea er en dansk vinwebshop, der indgår i Vinbots produktfeed. På denne hub får du baggrund, FAQ og flaske-CTA’er, så du nemt kan gå videre til køb.",
      "Vinbot sælger ikke vin. Sammenlign gerne på forsiden; her er fokus kun på Vinea.",
      "Brug siden, når du vil orientere dig om forhandleren og se aktuelle flasker fra deres feed hos os.",
    ],
    matchHeading: "Hvornår er Vinea et godt match?",
    matchBullets: [
      "Du har fundet Vinea i Vinbots søgning og vil se flere flasker.",
      "Du vil have et klart næste skridt: klik på flaske → shop.",
      "Du læser guider på Vinbot og vil handle hos én dansk webshop.",
    ],
    guideLinks: [
      { href: "/regioner", label: "Regioner" },
      { href: "/druesorter", label: "Druesorter" },
      { href: "/vine", label: "Vin-katalog" },
    ],
    shopCtaLabel: "Besøg Vinea",
    shopIntro: "Åbner Vinea i et nyt vindue — du handler og betaler altid hos dem.",
    productIntro: "Flasker fra Vinea i vores feed — udvalget kan skifte.",
    productSections: [
      {
        title: "Udvalgte vine hos Vinea",
        queries: ["pinot noir bourgogne", "riesling alsace", "champagne brut"],
        placement: "vinea-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Vinea?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Vinea har aktivt Partner-Ads-produktfeed.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid vinea.dk som kilde til endelig pris, lager og levering.",
      },
    ],
    affiliate: pa(B.vinea, "https://vinea.dk/"),
  },
  {
    slug: "barlife",
    displayName: "Barlife",
    feedMerchant: "Barlife",
    blurb: "Vin, spiritus og bar — til aftenen, cocktails og hygge.",
    title: "Barlife — shop og inspiration | Vinbot",
    description:
      "Barlife er en dansk forhandler i Vinbots feed med vin og spiritus. Se flasker, læs FAQ og gå videre via Partner-Ads.",
    introParagraphs: [
      "Barlife er en dansk webshop med vin og spiritus — relevant når du både kigger efter flasker til bordet og til baren. Deres produkter indgår i Vinbots Partner-Ads-feed.",
      "Vinbot sælger ikke vin. Denne side giver dig kontekst og flaske-CTA’er; du handler hos Barlife.",
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
    productIntro: "Udvalgte produkter fra Barlife i vores feed.",
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
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Barlife har aktivt Partner-Ads-feed.",
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
    feedMerchant: "D’Wine",
    blurb: "Dansk vinwebshop med Partner-Ads-feed i Vinbots søgning.",
    title: "D’Wine — shop og inspiration | Vinbot",
    description:
      "D’Wine er en dansk vinforhandler med Partner-Ads-produktfeed hos Vinbot. Inspiration, flasker med pris og link til d-wine.dk.",
    introParagraphs: [
      "D’Wine er en dansk vinwebshop, hvis sortiment synkroniseres til Vinbot via Partner-Ads (samme banner som produktfeedet). Her får du en dedikeret hub med SEO-tekst, FAQ og flaske-CTA’er.",
      "Vinbot sælger ikke vin. Brug forsiden til at sammenligne forhandlere; på denne side er fokus D’Wine.",
      "Klik på en flaske for at gå videre til shoppen — eller brug knappen nedenfor til at åbne d-wine.dk via tracked link.",
    ],
    matchHeading: "Hvornår er D’Wine et godt match?",
    matchBullets: [
      "Du har set D’Wine i Vinbots søgeresultater.",
      "Du vil handle hos en dansk vinwebshop med feed-synk til Vinbot.",
      "Du vil have klare go-to-actions via flaskekort.",
    ],
    guideLinks: [
      { href: "/vine", label: "Vin-katalog" },
      { href: "/regioner", label: "Regioner" },
      { href: "/mad-og-vin", label: "Mad og vin" },
    ],
    shopCtaLabel: "Besøg D’Wine",
    shopIntro: "Åbner D’Wine i et nyt vindue — du handler og betaler altid hos dem.",
    productIntro: "Flasker fra D’Wine i vores Partner-Ads-feed.",
    productSections: [
      {
        title: "Udvalgte vine hos D’Wine",
        queries: ["pinot noir", "chardonnay riesling", "champagne prosecco"],
        placement: "d-wine-page-table",
      },
      {
        title: "Rødvin og hvidvin",
        queries: ["rødvin italien spanien", "hvidvin sauvignon"],
        placement: "d-wine-page-colors",
      },
    ],
    faq: [
      {
        question: "Har D’Wine Partner-Ads?",
        answer:
          "Ja. D’Wine har et Partner-Ads-produktfeed hos Vinbot (banner-id matcher klikbanner). Hubben og shop-linket bruger samme tracking.",
      },
      {
        question: "Hvorfor linker Vinbot til D’Wine?",
        answer:
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid d-wine.dk som kilde til endelig pris, lager og levering.",
      },
    ],
    affiliate: pa(B.dWine, "https://d-wine.dk/"),
  },
  {
    slug: "gourmetshoppen",
    displayName: "Gourmetshoppen",
    feedMerchant: "Gourmetshoppen",
    blurb: "Gourmet og vin — flasker til madbordet og særlige anledninger.",
    title: "Gourmetshoppen — shop og inspiration | Vinbot",
    description:
      "Gourmetshoppen er en Partner-Ads-forhandler i Vinbots feed. Se vin og gå videre til shoppen med tracked links.",
    introParagraphs: [
      "Gourmetshoppen indgår i Vinbots Partner-Ads-feed med vine og relaterede produkter. Denne hub giver dig intro, FAQ og flasker som go-to-actions.",
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
    productIntro: "Udvalgte vine fra Gourmetshoppen i vores feed.",
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
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Gourmetshoppen har aktivt Partner-Ads-feed.",
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
    blurb: "Vestjysk smag — lokale produkter og vin i Vinbots feed.",
    title: "Westjysk Smag — shop og inspiration | Vinbot",
    description:
      "Westjysk Smag er en Partner-Ads-forhandler i Vinbots søgning. Læs om shoppen og se flasker med direkte købs-links.",
    introParagraphs: [
      "Westjysk Smag indgår i Vinbots Partner-Ads-produktfeed. Her samler vi intro, FAQ og flaske-CTA’er, så du nemt kan gå videre til køb.",
      "Vinbot sælger ikke vin. Sammenlign gerne på forsiden; denne side handler kun om Westjysk Smag.",
      "Brug flaskekortene nedenfor som klare næste skridt, når en vare matcher det, du leder efter.",
    ],
    matchHeading: "Hvornår er Westjysk Smag et godt match?",
    matchBullets: [
      "Du har set Westjysk Smag i Vinbots resultater.",
      "Du vil støtte en vestjysk forhandler med feed i vores søgning.",
      "Du vil have tracked links fra Vinbot til shoppen.",
    ],
    guideLinks: [
      { href: "/vine", label: "Vin-katalog" },
      { href: "/guides", label: "Guider" },
    ],
    shopCtaLabel: "Besøg Westjysk Smag",
    shopIntro: "Åbner Westjysk Smag i et nyt vindue — du handler og betaler altid hos dem.",
    productIntro: "Produkter fra Westjysk Smag i vores feed.",
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
    blurb: "Vin med fokus på smag og vejledning — i Vinbots Partner-Ads-feed.",
    title: "Winesommelier — shop og inspiration | Vinbot",
    description:
      "Winesommelier er en dansk vinforhandler i Vinbots feed. Inspiration, flasker og link til shoppen via Partner-Ads.",
    introParagraphs: [
      "Winesommelier er en dansk vinwebshop i Vinbots Partner-Ads-feed. På denne hub får du baggrund, FAQ og flasker du kan købe via tracked links.",
      "Vinbot sælger ikke vin. Brug vinsøgningen til at sammenligne; her er fokus Winesommelier.",
      "Shoppen passer godt, når du vil gå fra guide-læsning til konkrete flasker hos én forhandler.",
    ],
    matchHeading: "Hvornår er Winesommelier et godt match?",
    matchBullets: [
      "Du har set Winesommelier i søgeresultaterne.",
      "Du vil have sommelier-agtig inspiration kombineret med køb online.",
      "Du vil bruge flaskekort som go-to-action.",
    ],
    guideLinks: [
      { href: "/druesorter", label: "Druesorter" },
      { href: "/regioner", label: "Regioner" },
      { href: "/bedste-vine", label: "Bedste vine" },
    ],
    shopCtaLabel: "Besøg Winesommelier",
    shopIntro: "Åbner Winesommelier i et nyt vindue — du handler og betaler altid hos dem.",
    productIntro: "Flasker fra Winesommelier i vores feed.",
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
    title: "Bottles With History — vintage vin | Vinbot",
    description:
      "Bottles With History: vintage og ældre vine i Vinbots Daisycon-feed. Se flasker med pris og klik videre til shoppen.",
    introParagraphs: [
      "Bottles With History specialiserer sig i vintage og ældre vine — flasker der har ligget i årtier og fortæller en historie. Deres sortiment synkroniseres til Vinbot via Daisycon.",
      "Vinbot sælger ikke vin. På denne side får du intro og flaske-CTA’er fra feedet; shop-landing uden separat tracking-URL betyder, at de tracked køb primært sker via produktkortene.",
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
      "Primær go-to-action er flaskekortene — de linker videre via Daisycon-feed. Åbn bottleswithhistory.dk, når du vil browse hele sortimentet.",
    productIntro: "Vintage og ældre vine fra Bottles With History i vores feed.",
    productSections: [
      {
        title: "Udvalgte flasker",
        queries: ["vin vintage", "rødvin", "bordeaux"],
        placement: "bwh-page-table",
      },
    ],
    faq: [
      {
        question: "Hvorfor linker Vinbot til Bottles With History?",
        answer:
          "Når du køber efter et klik fra Vinbot (typisk via produktfeedet), kan vi modtage provision — typisk uden merpris for dig.",
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
    blurb: "International vinwebshop med stort udvalg — i Vinbots Daisycon-feed.",
    title: "8wines — shop og inspiration | Vinbot",
    description:
      "8wines er en vinforhandler i Vinbots Daisycon-feed. Se flasker med pris og klik videre til køb.",
    introParagraphs: [
      "8wines er en international vinwebshop, hvis produkter indgår i Vinbots Daisycon-feed. Denne hub giver dig kontekst og flaske-CTA’er.",
      "Vinbot sælger ikke vin. De tracked links ligger primært på produktkortene fra feedet.",
      "Brug forsiden til at sammenligne med danske forhandlere, hvis du vil se flere shops side om side.",
    ],
    matchHeading: "Hvornår er 8wines et godt match?",
    matchBullets: [
      "Du har set 8wines i Vinbots søgeresultater.",
      "Du vil browse et stort, internationalt sortiment.",
      "Du vil bruge flaskekort som direkte købs-CTA.",
    ],
    guideLinks: [
      { href: "/vine", label: "Vin-katalog" },
      { href: "/regioner", label: "Regioner" },
    ],
    shopCtaLabel: "Se flasker nedenfor",
    shopIntro: "Go-to-action er flaskekortene fra Daisycon-feedet — klik videre for at købe.",
    productIntro: "Flasker fra 8wines i vores feed.",
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
          "Når du køber efter et klik fra Vinbot via feedet, kan vi modtage provision — typisk uden merpris for dig.",
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
    blurb: "Vinwebshop i Vinbots Daisycon-feed — flasker med direkte købs-links.",
    title: "Wine Store — shop og inspiration | Vinbot",
    description:
      "Wine Store er en forhandler i Vinbots Daisycon-feed. Se flasker, læs FAQ og klik videre til køb.",
    introParagraphs: [
      "Wine Store indgår i Vinbots Daisycon-produktfeed. Her får du en hub med intro, FAQ og flasker som go-to-actions.",
      "Vinbot sælger ikke vin. Tracking sker primært via produktlinks fra feedet.",
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
    shopIntro: "Primær CTA er flaskekortene nedenfor — de linker videre via Daisycon.",
    productIntro: "Flasker fra Wine Store i vores feed.",
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
          "Når du køber efter et klik fra Vinbot via feedet, kan vi modtage provision — typisk uden merpris for dig.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid forhandlerens egen side som kilde til pris, lager og levering.",
      },
    ],
    affiliate: { kind: "feed-only" },
  },
  {
    slug: "vinpalle",
    displayName: "Vinpalle",
    feedMerchant: "Vinpalle",
    blurb: "Dansk vinshop med gratis produktfeed i Vinbots søgning.",
    title: "Vinpalle — shop og inspiration | Vinbot",
    description:
      "Vinpalle er en dansk vinforhandler i Vinbots gratis feed. Se flasker, læs om shoppen og gå videre til vinpalle.dk.",
    introParagraphs: [
      "Vinpalle er en dansk vinwebshop, der indgår i Vinbot via et gratis Google Shopping-feed (uden affiliate-provision). Vi viser dem alligevel, fordi flaskerne beriger søgningen for vores læsere.",
      "Vinbot sælger ikke vin. Links til Vinpalle er direkte — uden Partner-Ads-wrapper.",
      "Brug denne hub til at forstå forhandleren og se udvalgte flasker fra feedet.",
    ],
    matchHeading: "Hvornår er Vinpalle et godt match?",
    matchBullets: [
      "Du har set Vinpalle i Vinbots søgeresultater.",
      "Du vil handle hos en dansk shop med direkte links.",
      "Du sammenligner priser på tværs og lander på Vinpalle.",
    ],
    guideLinks: [
      { href: "/vine", label: "Vin-katalog" },
      { href: "/tilbud", label: "Vin tilbud" },
    ],
    shopCtaLabel: "Besøg Vinpalle",
    shopIntro: "Åbner Vinpalle i et nyt vindue — direkte link (gratis feed, ingen affiliate-wrapper).",
    productIntro: "Flasker fra Vinpalle i vores feed.",
    productSections: [
      {
        title: "Udvalgte vine hos Vinpalle",
        queries: ["vin rødvin", "hvidvin", "prosecco"],
        placement: "vinpalle-page-table",
      },
    ],
    faq: [
      {
        question: "Tjener Vinbot på klik til Vinpalle?",
        answer:
          "Nej — Vinpalle er på gratis feed-tier. Vi viser dem for at give dig flere valg i søgningen.",
      },
      {
        question: "Er priserne på Vinbot altid aktuelle?",
        answer: "Nej. Brug altid vinpalle.dk som kilde til pris, lager og levering.",
      },
    ],
    affiliate: { kind: "direct", shopUrl: "https://www.vinpalle.dk/" },
  },
  {
    slug: "whiskystack",
    displayName: "Whiskystack",
    feedMerchant: "Whiskystack",
    blurb: "Whisky, rom og vin — kurateret spiritusshop i Vinbots feed.",
    title: "Whiskystack — whisky, rom og vin | Vinbot",
    description:
      "Whiskystack er en dansk spiritus- og vinforhandler i Vinbots Partner-Ads-feed. Se produkter og gå videre via tracked links.",
    introParagraphs: [
      "Whiskystack er en dansk webshop med fokus på whisky, rom og udvalgt vin. Deres produkter indgår i Vinbots Partner-Ads-feed.",
      "Vinbot er primært vin — men Whiskystack dukker op, når søgninger og feed matcher. Her får du en hub med intro, FAQ og produkt-CTA’er.",
      "Du handler altid hos Whiskystack; Vinbot sælger ikke spiritus eller vin.",
    ],
    matchHeading: "Hvornår er Whiskystack et godt match?",
    matchBullets: [
      "Du leder efter whisky, rom eller begrænset vinudvalg.",
      "Du har set Whiskystack i Vinbots resultater.",
      "Du vil have tracked Partner-Ads-links fra Vinbot.",
    ],
    guideLinks: [
      { href: "/fest-og-vin", label: "Fest og vin" },
      { href: "/guides", label: "Guider" },
    ],
    shopCtaLabel: "Besøg Whiskystack",
    shopIntro: "Åbner Whiskystack i et nyt vindue — du handler og betaler altid hos dem.",
    productIntro: "Produkter fra Whiskystack i vores feed.",
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
    slug: "beer-me",
    displayName: "Beer Me",
    feedMerchant: "Beer Me",
    blurb: "Øl og abonnement — dansk shop i Vinbots Partner-Ads-feed.",
    title: "Beer Me — øl og shop | Vinbot",
    description:
      "Beer Me er en dansk ølforhandler i Vinbots feed. Se produkter, læs om affiliate og gå videre til beer-me.dk.",
    introParagraphs: [
      "Beer Me er en dansk webshop og ølabonnement, der indgår i Vinbots Partner-Ads-feed. Vinbot er vin-first, men Beer Me er relevant for læsere, der også søger øl.",
      "I footeren finder du også et dedikeret abonnements-promo. Denne hub dækker shoppen bredere med produkt-CTA’er fra feedet.",
      "Vinbot sælger ikke øl — du handler altid hos Beer Me.",
    ],
    matchHeading: "Hvornår er Beer Me et godt match?",
    matchBullets: [
      "Du leder efter øl eller ølabonnement.",
      "Du har set Beer Me i Vinbots søgning eller footer-promo.",
      "Du vil have tracked links fra Vinbot til beer-me.dk.",
    ],
    guideLinks: [
      { href: "/fest-og-vin", label: "Fest og vin" },
      { href: "/rabatkoder", label: "Rabatkoder" },
    ],
    shopCtaLabel: "Besøg Beer Me",
    shopIntro: "Åbner Beer Me i et nyt vindue — du handler og betaler altid hos dem.",
    showRabatkoderLink: true,
    productIntro: "Produkter fra Beer Me i vores feed.",
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
          "Når du køber efter et klik fra Vinbot, kan vi modtage provision — typisk uden merpris for dig. Beer Me har både shop-feed og abonnements-klikbanner.",
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

/** DSF shop CTA uses search deep-link via Partner-Ads. */
export function dsfHubShopHref(): string {
  return partnerAdsDsfClickUrl(
    "https://densidsteflaske.dk/search?q=champagne&form_type=product&utf8=%E2%9C%93",
  );
}
