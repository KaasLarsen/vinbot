import Link from "next/link";
import { GuideFaqAccordion } from "@/components/guide-faq-accordion";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PageShell } from "@/components/page-shell";
import { PriceRunnerProductWidget } from "@/components/pricerunner-product-widget";
import { ProductFeedPreview } from "@/components/product-feed-preview";
import type { SupermarketChain } from "@/lib/supermarket/chains";
import { chainH1 } from "@/lib/supermarket/freshness";

function onlineSearchHref(chain: SupermarketChain): string {
  const q = chain.onlineQueries.join(" ");
  return `/?q=${encodeURIComponent(q)}&max=${chain.onlineMaxPrice}`;
}

export function SupermarketChainPage({ chain }: { chain: SupermarketChain }) {
  const h1 = chainH1(chain.name);
  const searchHref = onlineSearchHref(chain);

  return (
    <PageShell className="py-10">
      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/vin-i", label: "Vin i supermarkedet" },
          { href: `/vin-i/${chain.slug}`, label: chain.name },
        ]}
      />

      <header className="mt-6 max-w-3xl">
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-stone-900">{h1}</h1>
        <p className="mt-4 text-lg leading-relaxed text-stone-700">{chain.intro}</p>
        <p className="mt-3 text-sm text-stone-600">
          Vi viser ikke live hyldepriser. Prisen står i butikken. Dybden står i{" "}
          <Link href={`/guides/${chain.guideSlug}`} className="font-medium text-rose-900 hover:underline">
            guiden til {chain.name}
          </Link>
          .
        </p>
      </header>

      <ul className="mt-8 grid gap-3 sm:grid-cols-3">
        <li className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">Gå efter</p>
          <p className="mt-2 text-sm leading-relaxed text-stone-800">{chain.seek}</p>
        </li>
        <li className="rounded-xl border border-stone-200 bg-white p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-stone-500">Alternativ</p>
          <p className="mt-2 text-sm leading-relaxed text-stone-800">{chain.alternative}</p>
        </li>
        <li className="rounded-xl border border-rose-200 bg-rose-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-800">Undgå</p>
          <p className="mt-2 text-sm leading-relaxed text-stone-800">{chain.avoid}</p>
        </li>
      </ul>

      <section className="mt-12" aria-labelledby="shelf-heading">
        <h2 id="shelf-heading" className="text-2xl font-semibold text-stone-900">
          Det du går efter i {chain.name}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          Stil og etiket — ikke en tilbudsliste. Kampagner skifter fra uge til uge og fra butik til butik.
        </p>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {chain.shelf.map((pick) => (
            <li key={pick.title} className="rounded-2xl border border-stone-200 bg-white p-5">
              <h3 className="text-lg font-semibold text-stone-900">{pick.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-700">
                <span className="font-medium text-stone-900">Kig efter. </span>
                {pick.lookFor}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-stone-700">
                <span className="font-medium text-stone-900">Lad stå. </span>
                {pick.skip}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="staples-heading">
        <h2 id="staples-heading" className="text-2xl font-semibold text-stone-900">
          Faste linjer i {chain.name}
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          Det, du ofte møder på hylden. Ingen point — læs etiketten.
        </p>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {chain.staples.map((line) => (
            <li key={line.name} className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <h3 className="font-semibold text-stone-900">{line.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-700">{line.note}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="food-heading">
        <h2 id="food-heading" className="text-2xl font-semibold text-stone-900">
          Hvad skal du spise i aften?
        </h2>
        <ul className="mt-4 flex flex-wrap gap-3">
          {chain.meals.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-rose-900 hover:border-rose-300 hover:bg-rose-50"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <h3 className="mt-8 text-lg font-semibold text-stone-900">Anledninger</h3>
        <ul className="mt-3 flex flex-wrap gap-3">
          {chain.occasions.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="inline-flex rounded-full border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-stone-900 hover:bg-amber-100"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12" aria-labelledby="online-heading">
        <h2 id="online-heading" className="text-2xl font-semibold text-stone-900">
          Udsolgt på hylden? Samme stil online lige nu
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          Det her er ikke flasker fra {chain.name}. Det er samme stil hos vinhandlere med levering — under{" "}
          {chain.onlineMaxPrice} kr.
        </p>
        <div className="mt-6">
          <ProductFeedPreview
            queries={chain.onlineQueries}
            maxPrice={chain.onlineMaxPrice}
            maxItems={6}
            placement={`vin-i-${chain.slug}`}
          />
        </div>
        <p className="mt-4 text-sm">
          <Link href={searchHref} className="font-medium text-rose-900 hover:underline">
            Se flere i søgningen
          </Link>
        </p>
      </section>

      <section className="mt-12" aria-labelledby="gear-heading">
        <h2 id="gear-heading" className="text-2xl font-semibold text-stone-900">
          Glas og proptrækker
        </h2>
        <p className="mt-2 max-w-2xl text-sm text-stone-600">
          Supermarkedsvin smager mere af glasset, end man tror. Prissammenligning via PriceRunner (annonce).
        </p>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <PriceRunnerProductWidget
            productKey="spiegelau-definition-roedvinsglas"
            heading="Rødvinsglas"
            className="my-0"
          />
          <PriceRunnerProductWidget
            productKey="laguiole-haws-proptrekker"
            heading="Proptrækker"
            className="my-0"
          />
        </div>
      </section>

      <GuideFaqAccordion items={chain.faq} />
    </PageShell>
  );
}
