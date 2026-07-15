import Link from "next/link";

const linkClass = "underline decoration-rose-300 underline-offset-4 hover:text-rose-950";

type LinkItem = { href: string; label: string };

type Props = {
  editorialLinks: LinkItem[];
  featuredLinks: LinkItem[];
  topicGroups: { title: string; links: LinkItem[] }[];
  editorialTeamName: string;
};

/** Anden hero-bånd: guides og hurtige emner — adskilt fra vinsøgning. */
export function HomeQuickTopicsSection({
  editorialLinks,
  featuredLinks,
  topicGroups,
  editorialTeamName,
}: Props) {
  return (
    <section className="relative mt-5 overflow-hidden rounded-2xl border border-rose-200/70 bg-gradient-to-br from-rose-50 via-white to-amber-50/80 px-6 py-6 shadow-sm ring-1 ring-stone-200/60 sm:px-8 sm:py-7">
      <div
        className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-rose-200/30 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-12 left-1/3 h-32 w-32 rounded-full bg-amber-200/25 blur-3xl"
        aria-hidden
      />

      <div className="relative">
        <p className="max-w-2xl text-sm leading-relaxed text-stone-600">
          Vinbot er også en{" "}
          <Link href="/guides" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4">
            redaktionel vinguide
          </Link>{" "}
          med hundredvis af artikler om parring, druer og regioner — skrevet af{" "}
          <Link href="/om-os" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-4">
            {editorialTeamName}
          </Link>
          .
        </p>

        <div className="mt-5">
          <h2 className="text-sm font-medium text-stone-800">Guides og inspiration</h2>
          <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
            {editorialLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-t border-rose-200/50 pt-5">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-rose-900/70">Hurtige emner</h2>
          <p className="mt-1.5 max-w-2xl text-sm text-stone-600">
            Spring til det mest brugte — eller fold listen ud for alle kategorier og vin-til-mad-sider.
          </p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm text-rose-900">
            {featuredLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <details className="group mt-4 rounded-xl border border-rose-200/50 bg-white/70 px-4 py-3 ring-1 ring-stone-100/80">
            <summary className="cursor-pointer list-none text-sm font-medium text-rose-900 marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="underline decoration-rose-300 decoration-dotted underline-offset-4 group-open:decoration-solid">
                Vis alle emner efter kategori
              </span>
              <span className="ml-1.5 tabular-nums text-stone-400 group-open:hidden" aria-hidden>
                {"\u25BC"}
              </span>
              <span className="ml-1.5 hidden tabular-nums text-stone-400 group-open:inline" aria-hidden>
                {"\u25B2"}
              </span>
            </summary>
            <div className="mt-4 space-y-5 border-t border-rose-100/80 pt-4">
              {topicGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-rose-900/70">{group.title}</h3>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-rose-900">
                    {group.links.map((item) => (
                      <li key={item.href}>
                        <Link href={item.href} className={linkClass}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
}
