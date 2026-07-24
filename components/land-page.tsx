import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { FaqJsonLd } from "@/components/json-ld";
import { PageShell } from "@/components/page-shell";
import { ProductFeedPreview } from "@/components/product-feed-preview";
import { CONTINENT_LABELS, getRelatedLande } from "@/lib/lande/registry";
import type { LandConfig } from "@/lib/lande/types";

export function LandPage({ land }: { land: LandConfig }) {
  const related = getRelatedLande(land.slug, 8);
  const searchHref = `/?q=${encodeURIComponent(land.primaryQuery)}`;

  return (
    <PageShell className="py-10">
      <FaqJsonLd items={land.faq} />

      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/lande", label: "Vinlande" },
          { href: `/lande/${land.slug}`, label: land.displayName },
        ]}
      />

      <p className="mt-4 text-sm font-medium text-rose-900/80">{CONTINENT_LABELS[land.continent]}</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-stone-900">
        Vin fra {land.displayName}
      </h1>

      {land.introParagraphs.map((paragraph, i) => (
        <p
          key={i}
          className={`mt-4 max-w-3xl leading-relaxed text-stone-700 ${i === 0 ? "text-lg" : ""}`}
        >
          {paragraph}
        </p>
      ))}

      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100">
        <h2 className="text-lg font-semibold text-stone-900">Kendetegn</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-700">
          {land.kendetegn.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </section>

      {land.regions.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-stone-900">Regioner</h2>
          <p className="mt-2 max-w-3xl text-stone-700">
            Klassiske områder at kende — gå til dybdeguiden eller søg direkte blandt danske forhandlere.
          </p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {land.regions.map((r) => (
              <li key={r.q} className="rounded-xl border border-stone-200 bg-white p-4 shadow-sm">
                <h3 className="font-semibold text-stone-900">
                  {r.guideSlug ? (
                    <Link
                      href={`/guides/${r.guideSlug}`}
                      className="text-stone-900 hover:text-rose-900 hover:underline"
                    >
                      {r.name}
                    </Link>
                  ) : (
                    r.name
                  )}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-stone-600">{r.note}</p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {r.guideSlug ? (
                    <Link
                      href={`/guides/${r.guideSlug}`}
                      className="font-medium text-rose-900 hover:underline"
                    >
                      Læs guide →
                    </Link>
                  ) : null}
                  <Link
                    href={`/?q=${encodeURIComponent(r.q)}`}
                    className="font-medium text-rose-900 hover:underline"
                  >
                    Søg {r.name} →
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-stone-900">Vinforslag</h2>
        <p className="mt-2 max-w-3xl text-stone-700">
          Hurtige indgange til forsiden — eller se live flasker fra danske forhandlere nedenfor.
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {land.wineSuggestions.map((s) => (
            <li key={s.q}>
              <Link
                href={`/?q=${encodeURIComponent(s.q)}`}
                className="inline-flex rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-sm font-medium text-rose-950 hover:border-rose-300 hover:bg-rose-100"
              >
                {s.title}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={searchHref}
              className="inline-flex rounded-xl border border-stone-200 bg-white px-3 py-1.5 text-sm font-medium text-stone-800 hover:border-rose-300"
            >
              Søg alle fra {land.displayName} →
            </Link>
          </li>
        </ul>

        <div className="mt-8 space-y-10">
          {land.wineSuggestions.slice(0, 2).map((s) => (
            <ProductFeedPreview
              key={s.q}
              query={s.q}
              title={s.title}
              maxItems={6}
              placement={`lande-${land.slug}-${s.q.slice(0, 24)}`}
            />
          ))}
          <ProductFeedPreview
            query={land.primaryQuery}
            title={`Flere vine fra ${land.displayName}`}
            maxItems={8}
            placement={`lande-${land.slug}-primary`}
          />
        </div>
      </section>

      {land.deepGuideSlug ? (
        <section className="mt-12 rounded-2xl border border-amber-200 bg-amber-50/60 p-6">
          <h2 className="text-xl font-semibold text-stone-900">Dybdeguide</h2>
          <p className="mt-2 text-stone-700">
            Vil du gå i dybden med historie, stil og madparring? Læs den fulde artikel.
          </p>
          <Link
            href={`/guides/${land.deepGuideSlug}`}
            className="mt-4 inline-flex font-medium text-rose-900 hover:underline"
          >
            Læs guide til {land.displayName} →
          </Link>
        </section>
      ) : null}

      {land.drueRegionLinks && land.drueRegionLinks.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-stone-900">Drue × region</h2>
          <ul className="mt-4 flex flex-col gap-1.5 text-sm sm:flex-row sm:flex-wrap sm:gap-x-4">
            {land.drueRegionLinks.map((item) => (
              <li key={item.slug}>
                <Link href={`/guides/${item.slug}`} className="text-rose-900 hover:underline">
                  {item.label} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {land.faq.length > 0 ? (
        <section className="mt-14 rounded-2xl border border-stone-200 bg-stone-50 p-6">
          <h2 className="text-xl font-semibold text-stone-900">Ofte stillede spørgsmål</h2>
          <dl className="mt-4 space-y-4">
            {land.faq.map((item) => (
              <div key={item.question}>
                <dt className="font-medium text-stone-900">{item.question}</dt>
                <dd className="mt-1 text-stone-700">{item.answer}</dd>
              </div>
            ))}
          </dl>
        </section>
      ) : null}

      <nav className="mt-10 text-sm text-stone-600" aria-label="Andre vinlande">
        {related.map((other, i) => (
          <span key={other.slug}>
            {i > 0 ? " · " : null}
            <Link href={`/lande/${other.slug}`} className="text-rose-900 hover:underline">
              {other.displayName}
            </Link>
          </span>
        ))}
        {" · "}
        <Link href="/lande" className="text-rose-900 hover:underline">
          Alle vinlande
        </Link>
        {" · "}
        <Link href="/regioner" className="text-rose-900 hover:underline">
          Regioner
        </Link>
      </nav>
    </PageShell>
  );
}
