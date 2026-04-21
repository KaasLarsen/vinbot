import Link from "next/link";

/**
 * Above-fold CTA-boks der linker til forsidens søgning med forudfyldt query.
 * Anbefaling: placér umiddelbart efter intro, over MDX-indholdet.
 */
export function GuideSearchCta({
  label,
  searchHref,
}: {
  label: string;
  searchHref: string;
}) {
  const capitalized = label.charAt(0).toUpperCase() + label.slice(1);
  return (
    <aside className="not-prose mt-6 overflow-hidden rounded-2xl border border-rose-200 bg-rose-950 text-rose-50 shadow-md">
      <div className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-200/90">Find vin nu</p>
          <p className="mt-1 text-base font-semibold text-white sm:text-lg">
            {capitalized} — se aktuelle forslag fra 10+ danske forhandlere
          </p>
          <p className="mt-1 text-sm text-rose-100/85">
            Billede, pris og direkte link til butikken. Du handler altid hos forhandleren.
          </p>
        </div>
        <Link
          href={searchHref}
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-rose-950 shadow-sm hover:bg-rose-100"
        >
          Åbn søgning →
        </Link>
      </div>
    </aside>
  );
}
