"use client";

import Link from "next/link";
import { partnerAdsDsfClickUrl } from "@/lib/site";
import { trackAffiliateClick } from "@/lib/affiliate-track";

/** Forsidebutik — samme Partner-Ads-banner som øvrige DSF-produktlinks (lib/site.ts). */
const DSF_SHOP_HOME = "https://densidsteflaske.dk/";

/** Fremhævet anbefaling — neutral kundetekst */
export function CampaignBanner() {
  const shopAffiliateHref = partnerAdsDsfClickUrl(DSF_SHOP_HOME);
  const onClick = () =>
    trackAffiliateClick({
      merchant: "Den Sidste Flaske",
      placement: "campaign-banner",
      url: shopAffiliateHref,
    });

  return (
    <section className="mt-10 rounded-2xl border border-rose-200 bg-rose-950 px-6 py-8 text-rose-50 shadow-md">
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-200/90">Anbefalet</p>
      <h2 className="mt-2 text-2xl font-semibold">Den Sidste Flaske</h2>
      <p className="mt-3 max-w-2xl text-rose-100/95">
        Et af Danmarks stærkeste vinuniverser — med kurateret inspiration her på Vinbot, gode købsidéer og link direkte til deres butik, når du
        vil gå på opdagelse.
      </p>
      <a
        href={shopAffiliateHref}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        onClick={onClick}
        className="mt-5 inline-flex rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-rose-950 hover:bg-rose-100"
      >
        Gå til Den Sidste Flaske
      </a>
      <p className="mt-3 max-w-2xl text-xs leading-relaxed text-rose-200/90">
        <Link href="/den-sidste-flaske" className="font-medium text-white underline decoration-rose-300/70 underline-offset-2 hover:decoration-white">
          Inspiration og købstips på Vinbot
        </Link>
        <span className="text-rose-200/75"> · Butik-linket er affiliate via Partner-Ads (åbner i nyt vindue).</span>
      </p>
    </section>
  );
}
