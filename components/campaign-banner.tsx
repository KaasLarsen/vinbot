import Link from "next/link";

/** Fremhævet anbefaling — neutral kundetekst */
export function CampaignBanner() {
  return (
    <section className="mt-10 rounded-2xl border border-rose-200 bg-rose-950 px-6 py-8 text-rose-50 shadow-md">
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-200/90">Anbefalet</p>
      <h2 className="mt-2 text-2xl font-semibold">Den Sidste Flaske</h2>
      <p className="mt-3 max-w-2xl text-rose-100/95">
        Et af Danmarks stærkeste vinuniverser — med kurateret inspiration her på Vinbot, gode købsidéer og link direkte til deres butik, når du
        vil gå på opdagelse.
      </p>
      <Link
        href="/den-sidste-flaske"
        className="mt-5 inline-flex rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-rose-950 hover:bg-rose-100"
      >
        Se mere om Den Sidste Flaske
      </Link>
    </section>
  );
}
