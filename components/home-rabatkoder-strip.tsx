import Link from "next/link";
import { RabatkodeCopyGoLink } from "@/components/rabatkode-copy-go-link";
import { getHomepageRabatkoder } from "@/lib/rabatkoder/partners";

export function HomeRabatkoderStrip() {
  const codes = getHomepageRabatkoder();
  if (codes.length === 0) return null;

  return (
    <section
      className="rounded-2xl border border-emerald-200/80 bg-emerald-50/90 p-3 sm:p-4"
      aria-labelledby="home-rabatkoder-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-emerald-900/90">Rabatkoder</p>
      <h2 id="home-rabatkoder-heading" className="mt-1 text-base font-semibold tracking-tight text-stone-900 sm:text-lg">
        Gode koder lige nu
      </h2>

      <ul className="mt-2.5 divide-y divide-emerald-200/70 rounded-xl border border-emerald-200/80 bg-white">
        {codes.map((item) => (
          <li
            key={`${item.partnerName}-${item.code}`}
            className="flex items-center justify-between gap-2 px-3 py-2"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-stone-900">{item.partnerName}</p>
              <p className="text-xs font-medium text-emerald-800">{item.benefit}</p>
            </div>
            <RabatkodeCopyGoLink
              href={item.affiliateHref}
              merchant={item.partnerName}
              code={item.code}
              className="shrink-0 rounded-lg bg-emerald-800 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-emerald-900"
            >
              Kopiér & shop *
            </RabatkodeCopyGoLink>
          </li>
        ))}
      </ul>

      <div className="mt-2.5 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
        <p className="text-[11px] leading-snug text-stone-500">* Annoncelinks — koden kopieres.</p>
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
