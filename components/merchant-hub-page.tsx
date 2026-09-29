import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { DsfFeaturedPicks } from "@/components/dsf-featured-picks";
import { GuideFaqAccordion } from "@/components/guide-faq-accordion";
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
  getMerchantLogo,
  merchantAccentForSlug,
  merchantMonogram,
} from "@/lib/merchant-hubs/logos";
import { getRelatedMerchantHubs, resolveMerchantHubShopHref } from "@/lib/merchant-hubs/registry";
import type { MerchantHubConfig } from "@/lib/merchant-hubs/types";

const CTA_CLASS =
  "inline-flex rounded-xl bg-rose-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-rose-950";

function ShopCta({
  hub,
  shopHref,
}: {
  hub: MerchantHubConfig;
  shopHref: string;
}) {
  if (hub.affiliate.kind === "partner-ads") {
    return (
      <MerchantHubShopLink
        href={shopHref}
        merchant={hub.feedMerchant ?? hub.displayName}
        slug={hub.slug}
        className={CTA_CLASS}
      >
        {hub.shopCtaLabel}
      </MerchantHubShopLink>
    );
  }
  return (
    <a
      href={shopHref}
      target="_blank"
      rel="nofollow noopener noreferrer"
      className={CTA_CLASS}
    >
      {hub.shopCtaLabel}
    </a>
  );
}

export function MerchantHubPage({ hub }: { hub: MerchantHubConfig }) {
  const shopHref = resolveMerchantHubShopHref(hub);
  const related = getRelatedMerchantHubs(hub.slug, 8);
  const featuredPicks = hub.featuredWineId ? getFeaturedPicksForMerchant(hub.featuredWineId) : [];
  const showShopButton = Boolean(shopHref) && hub.affiliate.kind !== "feed-only";
  const logo = getMerchantLogo(hub.slug);
  const accent = merchantAccentForSlug(hub.slug);
  const introLead = hub.introParagraphs[0] ?? null;

  return (
    <div className="relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(ellipse_at_top,_rgba(136,19,55,0.08),_transparent_55%),linear-gradient(to_bottom,_#fafaf9_0%,_#f5f5f4_40%,_transparent_100%)]"
        aria-hidden
      />
      <PageShell className="relative py-10">
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

        <header className="mt-6 overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm ring-1 ring-stone-100">
          <div
            className={`relative flex min-h-[7.5rem] items-center justify-center bg-gradient-to-br px-6 py-8 sm:min-h-[9rem] sm:px-10 ${
              logo?.onDark ? accent : "from-stone-50 via-white to-rose-50/40"
            }`}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.07]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 20% 20%, #881337 0%, transparent 45%), radial-gradient(circle at 80% 80%, #78350f 0%, transparent 40%)",
              }}
            />
            {logo ? (
              <Image
                src={logo.src}
                alt={`${hub.displayName} logo`}
                width={logo.wide ? 320 : 140}
                height={logo.wide ? 90 : 140}
                className={`relative z-[1] object-contain ${
                  logo.wide ? "h-14 w-auto max-w-[80%] sm:h-16" : "h-20 w-20 sm:h-24 sm:w-24"
                }`}
                sizes={logo.wide ? "280px" : "112px"}
                priority
              />
            ) : (
              <span
                className={`relative z-[1] flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br text-2xl font-semibold tracking-wide text-white shadow-inner sm:size-24 sm:text-3xl ${accent}`}
                aria-hidden
              >
                {merchantMonogram(hub.displayName)}
              </span>
            )}
          </div>

          <div className="px-6 py-7 sm:px-10 sm:py-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rose-900/70">
              Vinforhandler · affiliate
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
              {hub.displayName}
            </h1>
            <p className="mt-3 max-w-2xl text-lg leading-relaxed text-stone-700">{hub.blurb}</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-stone-600">{hub.shopIntro}</p>

            {showShopButton && shopHref ? (
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
                <ShopCta hub={hub} shopHref={shopHref} />
                <span className="text-sm text-stone-600">
                  {hub.showRabatkoderLink ? (
                    <>
                      <Link href="/rabatkoder" className="font-medium text-rose-900 hover:underline">
                        Rabatkoder
                      </Link>
                      {" · "}
                    </>
                  ) : null}
                  <Link href="/" className="font-medium text-rose-900 hover:underline">
                    Vinsøgning
                  </Link>
                </span>
              </div>
            ) : (
              <p className="mt-6 text-sm text-stone-600">
                <Link href="/" className="font-medium text-rose-900 hover:underline">
                  Vinsøgning
                </Link>
                {" · "}
                <Link href="/vinforhandlere" className="font-medium text-rose-900 hover:underline">
                  Alle vinforhandlere
                </Link>
              </p>
            )}

            <p className="mt-4 text-xs leading-relaxed text-stone-500">
              Vinbot sælger ikke vin — du handler og betaler altid hos {hub.displayName}. Links kan
              give os provision, typisk uden merpris for dig.
            </p>
          </div>
        </header>

        {hub.showDsfFeatured ? <DsfFeaturedPicks picks={dsfFeaturedPicks} /> : null}
        {hub.featuredWineId && featuredPicks.length > 0 ? (
          <MerchantFeaturedPicks merchantId={hub.featuredWineId} picks={featuredPicks} />
        ) : null}

        {hub.productSections.length > 0 ? (
          <section className="mt-12 space-y-10">
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

        <section className="mt-14 max-w-3xl">
          {introLead ? (
            <p className="leading-relaxed text-stone-700">{introLead}</p>
          ) : null}
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
        </section>

        <section className="mt-10 rounded-2xl border border-stone-200 bg-white/80 p-6 ring-1 ring-stone-100">
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

        <GuideFaqAccordion items={hub.faq} />

        <nav className="mt-14" aria-label="Andre vinforhandlere">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-xl font-semibold text-stone-900">Andre vinforhandlere</h2>
            <Link
              href="/vinforhandlere"
              className="text-sm font-semibold text-rose-900 hover:underline"
            >
              Alle vinforhandlere →
            </Link>
          </div>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((other) => {
              const otherLogo = getMerchantLogo(other.slug);
              const otherAccent = merchantAccentForSlug(other.slug);
              return (
                <li key={other.slug} className="min-w-0">
                  <Link
                    href={`/${other.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-stone-200/90 bg-white shadow-sm ring-1 ring-stone-100 transition duration-300 hover:-translate-y-0.5 hover:border-rose-200/80 hover:shadow-md"
                  >
                    <div
                      className={`relative flex h-16 items-center justify-center bg-gradient-to-br px-3 ${
                        otherLogo?.onDark ? otherAccent : "from-stone-50 via-white to-rose-50/40"
                      }`}
                    >
                      {otherLogo ? (
                        <Image
                          src={otherLogo.src}
                          alt=""
                          width={otherLogo.wide ? 180 : 72}
                          height={otherLogo.wide ? 48 : 72}
                          className={`relative z-[1] object-contain ${
                            otherLogo.wide ? "h-8 w-auto max-w-[75%]" : "h-10 w-10"
                          }`}
                          sizes={otherLogo.wide ? "140px" : "40px"}
                        />
                      ) : (
                        <span
                          className={`relative z-[1] flex size-10 items-center justify-center rounded-lg bg-gradient-to-br text-xs font-semibold tracking-wide text-white ${otherAccent}`}
                          aria-hidden
                        >
                          {merchantMonogram(other.displayName)}
                        </span>
                      )}
                    </div>
                    <div className="px-3 py-3">
                      <span className="text-sm font-semibold text-stone-900 transition group-hover:text-rose-900">
                        {other.displayName}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </PageShell>
    </div>
  );
}
