import type { ReactNode } from "react";
import { HubFeaturedStores } from "@/components/hub-featured-stores";
import { FaqJsonLd } from "@/components/json-ld";
import { PriceRunnerProductWidget } from "@/components/pricerunner-product-widget";
import type { PriceRunnerProductKey } from "@/lib/pricerunner/products";

export type HubPriceRunnerSlot = {
  productKey: PriceRunnerProductKey;
  heading: string;
};

export type HubFaqItem = { question: string; answer: string };

export function GuideTopicHubExtras({
  hub,
  slug,
  products,
  seoHeading,
  faq,
  children,
}: {
  hub: string;
  slug: string;
  products: HubPriceRunnerSlot[];
  seoHeading: string;
  faq?: HubFaqItem[];
  children: ReactNode;
}) {
  return (
    <>
      {faq && faq.length > 0 ? <FaqJsonLd items={faq} /> : null}

      {products.length > 0 ? (
        <section className="mt-12" aria-labelledby="hub-pricerunner-heading">
          <h2 id="hub-pricerunner-heading" className="text-2xl font-semibold text-stone-900">
            Sammenlign priser
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-stone-600">
            Prissammenligning via PriceRunner (annonce). Tjek altid lager, årgang og fragt hos forhandleren.
          </p>
          {products.map((p) => (
            <PriceRunnerProductWidget
              key={p.productKey}
              productKey={p.productKey}
              heading={p.heading}
              className="mt-8"
            />
          ))}
        </section>
      ) : null}

      <HubFeaturedStores hub={hub} slug={slug} />

      <section className="mt-12 max-w-3xl space-y-4 text-stone-700">
        <h2 className="text-2xl font-semibold text-stone-900">{seoHeading}</h2>
        {children}
      </section>
    </>
  );
}
