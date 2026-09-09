import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { PartnerAdsLeaderboard } from "@/components/partner-ads-leaderboard";
import { SeasonWineCalculator } from "@/components/season-wine-calculator";
import { siteUrl } from "@/lib/site";

const PAGE_TITLE = "Julevin- og nytårsvins-beregner — flasker og konkrete vine";
const PAGE_DESCRIPTION =
  "Hvor meget vin til juleaften, julefrokost og nytår? Beregn flasker efter gæster og budget, og se vine til salg hos danske forhandlere.";
const PAGE_URL = `${siteUrl}/julevin-beregner`;

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    locale: "da_DK",
    type: "website",
  },
};

const FAQ = [
  {
    question: "Hvor meget vin skal man købe til juleaften?",
    answer:
      "Til seks voksne rammer du typisk 1 flaske bobler til velkomst, 2–3 flasker rød til and eller flæskesteg og 1 flaske sød vin eller port til risalamande — plus en lille buffer. Beregneren runder op.",
  },
  {
    question: "Hvilken vin til and og flæskesteg?",
    answer:
      "Vinbot anbefaler saftig rød med syre: pinot noir, gamay eller chianti. Kraftig julevin som Amarone er et tilvalg, hvis I foretrækker den stil.",
  },
  {
    question: "Virker beregneren kun i Black Friday-ugen?",
    answer:
      "Nej. Den bruger aktuelle forhandlerpriser hele sæsonen. Under Black Week prioriteres nedsatte flasker, når de matcher menuen.",
  },
] as const;

export default function JulevinBeregnerPage() {
  const breadcrumbItems = [
    { name: "Forside", url: `${siteUrl}/` },
    { name: "Julevin-beregner", url: PAGE_URL },
  ];

  return (
    <PageShell className="py-10">
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <FaqJsonLd items={[...FAQ]} />
      <Breadcrumbs items={[{ href: "/", label: "Forside" }, { href: "/julevin-beregner", label: "Julevin-beregner" }]} />

      <header className="mt-6 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-wide text-rose-800/90">Jul og nytår</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
          Julevin- og nytårsvins-beregner
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">
          Få antal flasker og ét konkret forslag pr. rolle — velkomst, hovedret og dessert — ud fra gæster og budget. Dybden ligger i{" "}
          <Link href="/guides/vin-til-juleaften" className="font-medium text-rose-900 hover:underline">
            vin til juleaften
          </Link>
          ,{" "}
          <Link href="/guides/vin-til-julefrokost" className="font-medium text-rose-900 hover:underline">
            julefrokost
          </Link>{" "}
          og{" "}
          <Link href="/guides/vin-til-nytaar-og-nytaarsmenu" className="font-medium text-rose-900 hover:underline">
            nytårsmenuen
          </Link>
          .
        </p>
      </header>

      <SeasonWineCalculator className="mt-10" />

      <PartnerAdsLeaderboard className="mt-12" hub="fest-og-vin" slug="julevin-beregner" />
    </PageShell>
  );
}
