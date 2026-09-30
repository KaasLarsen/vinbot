import Link from "next/link";
import { RabatkodeCopyGoLink } from "@/components/rabatkode-copy-go-link";
import { getHomepageRabatkoder } from "@/lib/rabatkoder/partners";

export function HomeRabatkoderStrip() {
  const codes = getHomepageRabatkoder();
  if (codes.length === 0) return null;

  return (
    <section
      className="rounded-2xl border border-emerald-200/80 bg-emerald-50/90 p-4 sm:p-5"
      aria-labelledby="home-rabatkoder-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900/90">Rabatkoder</p>
      <h2 id="home-rabatkoder-heading" className="mt-1 text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">
        Gode koder lige nu
      </h2>
      <p className="mt-1.5 text-sm leading-relaxed text-stone-700">
        Tryk for at kopiere koden og gå til shoppen.
      </p>

      <ul className="mt-3 space-y-2">
        {codes.map((item) => (
          <li
            key={`${item.partnerName}-${item.code}`}
            className="rounded-xl border border-emerald-200/80 bg-white px-3 py-2.5 shadow-sm"
          >
            <div className="flex items-baseline justify-between gap-2">
              <p className="text-sm font-semibold text-stone-900">{item.partnerName}</p>
              <span className="shrink-0 text-xs font-medium text-emerald-800">{item.benefit}</span>
            </div>
            <RabatkodeCopyGoLink
              href={item.affiliateHref}
              merchant={item.partnerName}
              code={item.code}
              className="mt-2 flex w-full items-center justify-center rounded-lg bg-emerald-800 px-3 py-2 text-sm font-semibold text-white hover:bg-emerald-900"
            >
              Kopiér kode & shop *
            </RabatkodeCopyGoLink>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] leading-snug text-stone-500">
          * Annoncelinks — uden merpris for dig. Koden kopieres til udklipsholderen.
        </p>
        <Link
          href="/rabatkoder"
          className="text-sm font-medium text-emerald-900 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950"
        >
          Alle rabatkoder →
        </Link>
      </div>
    </section>
  );
}
