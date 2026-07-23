import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DsfFeaturedPicks } from "@/components/dsf-featured-picks";
import {
  DsfFeaturedProductsJsonLd,
  FaqJsonLd,
  MerchantFeaturedProductsJsonLd,
} from "@/components/json-ld";
import { MerchantFeaturedPicks } from "@/components/merchant-featured-picks";
import { MerchantHubShopLink } from "@/components/merchant-hub-shop-link";
import { PageShell } from "@/components/page-shell";
import { ProductFeedPreview } from "@/components/product-feed-preview";
import { dsfFeaturedPicks } from "@/lib/dsf-featured";
import { getFeaturedPicksForMerchant } from "@/lib/merchant-featured-picks";
import {
  dsfHubShopHref,
  getRelatedMerchantHubs,
  resolveMerchantHubShopHref,
} from "@/lib/merchant-hubs/registry";
import type { MerchantHubConfig } from "@/lib/merchant-hubs/types";

export function MerchantHubPage({ hub }: { hub: MerchantHubConfig }) {
  const shopHref =
    hub.slug === "den-sidste-flaske" ? dsfHubShopHref() : resolveMerchantHubShopHref(hub);
  const related = getRelatedMerchantHubs(hub.slug, 8);
  const featuredPicks = hub.featuredWineId ? getFeaturedPicksForMerchant(hub.featuredWineId) : [];
  const showShopButton = Boolean(shopHref) && hub.affiliate.kind !== "feed-only";

  return (
    <PageShell className="py-10">
      <FaqJsonLd items={hub.faq} />
      {hub.showDsfFeatured ? <DsfFeaturedProductsJsonLd picks={dsfFeaturedPicks} /> : null}
      {hub.featuredWineId && featuredPicks.length > 0 ? (
        <MerchantFeaturedProductsJsonLd merchantId={hub.featuredWineId} picks={featuredPicks} />
      ) : null}

      <Breadcrumbs
        items={[
          { href: "/", label: "Forside" },
          { href: "/vinforhandlere", label: "Vinforhandlere" },
          { href: `/${hub.slug}`, label: hub.displayName },
        ]}
      />

      <h1 className="mt-6 text-4xl font-semibold tracking-tight text-stone-900">{hub.displayName}</h1>

      {hub.introParagraphs.map((paragraph, i) => (
        <p
          key={i}
          className={`mt-4 leading-relaxed text-stone-700 ${i === 0 ? "text-lg" : ""}`}
        >
          {paragraph}
        </p>
      ))}

      <p className="mt-4 leading-relaxed text-stone-700">
        Brug{" "}
        <Link href="/" className="font-medium text-rose-900 hover:underline">
          vinsøgningen på forsiden
        </Link>{" "}
        til at sammenligne på tværs af forhandlere, eller se hele listen under{" "}
        <Link href="/vinforhandlere" className="font-medium text-rose-900 hover:underline">
          vinforhandlere
        </Link>
        .
      </p>

      <section className="mt-10 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm ring-1 ring-stone-100">
        <h2 className="text-lg font-semibold text-stone-900">{hub.matchHeading}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-stone-700">
          {hub.matchBullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
        {hub.guideLinks.length > 0 ? (
          <p className="mt-4 text-sm text-stone-600">
            {hub.guideLinks.map((link, i) => (
              <span key={link.href}>
                {i > 0 ? " · " : null}
                <Link href={link.href} className="font-medium text-rose-900 hover:underline">
                  {link.label}
                </Link>
              </span>
            ))}
          </p>
        ) : null}
      </section>

      <section className="mt-10 space-y-4 text-stone-800">
        <h2 className="text-2xl font-semibold text-stone-900">Gå til butikken</h2>
        <p>{hub.shopIntro}</p>
        {showShopButton && shopHref ? (
          <MerchantHubShopLink
            href={shopHref}
            merchant={hub.feedMerchant ?? hub.displayName}
            slug={hub.slug}
            className="inline-flex rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950"
          >
            {hub.shopCtaLabel}
          </MerchantHubShopLink>
        ) : null}
        <p className="text-sm text-stone-600">
          {hub.showRabatkoderLink ? (
            <>
              <Link href="/rabatkoder" className="text-rose-900 hover:underline">
                Rabatkoder og nyhedsbrev
              </Link>
              {" · "}
            </>
          ) : null}
          <Link href="/" className="text-rose-900 hover:underline">
            Tilbage til vinsøgning
          </Link>
        </p>
      </section>

      {hub.showDsfFeatured ? <DsfFeaturedPicks picks={dsfFeaturedPicks} /> : null}
      {hub.featuredWineId && featuredPicks.length > 0 ? (
        <MerchantFeaturedPicks merchantId={hub.featuredWineId} picks={featuredPicks} />
      ) : null}

      {hub.productSections.length > 0 ? (
        <section className="mt-14 space-y-10">
          <div>
            <h2 className="text-2xl font-semibold text-stone-900">
              {hub.feedMerchant
                ? `Udvalgte flasker hos ${hub.displayName}`
                : "Måske finder du også…"}
            </h2>
            <p className="mt-2 max-w-3xl text-stone-700">{hub.productIntro}</p>
          </div>
          {hub.productSections.map((section) => (
            <ProductFeedPreview
              key={section.placement}
              queries={section.queries}
              title={section.title}
              merchant={hub.feedMerchant}
              placement={section.placement}
            />
          ))}
        </section>
      ) : null}

      <section className="mt-14 rounded-2xl border border-stone-200 bg-stone-50 p-6">
        <h2 className="text-xl font-semibold text-stone-900">Ofte stillede spørgsmål</h2>
        <dl className="mt-4 space-y-4">
          {hub.faq.map((item) => (
            <div key={item.question}>
              <dt className="font-medium text-stone-900">{item.question}</dt>
              <dd className="mt-1 text-stone-700">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </section>

      <nav className="mt-10 text-sm text-stone-600" aria-label="Andre vinforhandlere">
        {related.map((other, i) => (
          <span key={other.slug}>
            {i > 0 ? " · " : null}
            <Link href={`/${other.slug}`} className="text-rose-900 hover:underline">
              {other.displayName}
            </Link>
          </span>
        ))}
        {" · "}
        <Link href="/vinforhandlere" className="text-rose-900 hover:underline">
          Alle vinforhandlere
        </Link>
        {" · "}
        <Link href="/" className="text-rose-900 hover:underline">
          Forsiden
        </Link>
      </nav>
    </PageShell>
  );
}
