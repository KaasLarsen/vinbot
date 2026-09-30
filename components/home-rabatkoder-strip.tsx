import Link from "next/link";
import { RabatkodeShopLink } from "@/components/rabatkode-shop-link";
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
        Koder fra partnere — tjek vilkår i shoppen.
      </p>

      <ul className="mt-3 space-y-2">
        {codes.map((item) => (
          <li
            key={`${item.partnerName}-${item.code}`}
            className="rounded-xl border border-emerald-200/80 bg-white px-3 py-2.5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-stone-900">{item.partnerName}</p>
                <p className="mt-1 flex flex-wrap items-center gap-2">
                  <code className="rounded-md border border-stone-200 bg-stone-50 px-2 py-0.5 font-mono text-sm font-semibold tracking-wide text-stone-900">
                    {item.code}
                  </code>
                  <span className="text-xs font-medium text-emerald-800">{item.benefit}</span>
                </p>
              </div>
              <RabatkodeShopLink
                href={item.affiliateHref}
                merchant={item.partnerName}
                placement="home-rabatkoder"
                className="shrink-0 text-sm font-medium text-emerald-900 underline decoration-emerald-300 underline-offset-4 hover:text-emerald-950"
              >
                Shop *
              </RabatkodeShopLink>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] leading-snug text-stone-500">
          * Annoncelinks — uden merpris for dig.
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
