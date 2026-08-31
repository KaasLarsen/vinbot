"use client";

import { useEffect, useId, useMemo } from "react";
import {
  PRICERUNNER_DEFAULT_OFFER_LIMIT,
  PRICERUNNER_DEFAULT_OFFER_ORIGIN,
  PRICERUNNER_LOCALE,
  PRICERUNNER_ONLY_IN_STOCK,
  PRICERUNNER_PARTNER_ID,
  withPriceRunnerRefSite,
} from "@/lib/pricerunner/config";
import {
  getPriceRunnerProduct,
  type PriceRunnerProductKey,
} from "@/lib/pricerunner/products";
import { useMarketingConsent } from "@/lib/use-marketing-consent";

export type PriceRunnerProductWidgetProps = {
  /** Nøgle fra kurateret registry (foretrukket). */
  productKey?: PriceRunnerProductKey | string;
  /** Alternativ: rå PriceRunner-data uden registry. */
  productId?: string;
  title?: string;
  compareUrl?: string;
  /** Overskrift over widgeten (valgfri). */
  heading?: string;
  className?: string;
  offerLimit?: number;
};

function buildWidgetScriptSrc(params: {
  productId: string;
  widgetId: string;
  offerLimit: number;
}): string {
  const q = new URLSearchParams({
    onlyInStock: String(PRICERUNNER_ONLY_IN_STOCK),
    offerOrigin: PRICERUNNER_DEFAULT_OFFER_ORIGIN,
    offerLimit: String(params.offerLimit),
    productId: params.productId,
    partnerId: PRICERUNNER_PARTNER_ID,
    widgetId: params.widgetId,
  });
  return `https://api.pricerunner.com/publisher-widgets/${PRICERUNNER_LOCALE}/product.js?${q.toString()}`;
}

const compareLinkRel = "nofollow sponsored noopener";

/**
 * Kurateret PriceRunner-prissammenligning (udstyr/tilbehør).
 * Kræver marketing-samtykke før tredjepartsscript loades.
 *
 * Scriptet indlæses som almindeligt &lt;script async&gt; (som PriceRunners snippet),
 * ikke via next/script — det script er server-genereret HTML til et fast widgetId
 * og skal køre efter containeren er i DOM.
 */
export function PriceRunnerProductWidget({
  productKey,
  productId,
  title,
  compareUrl,
  heading,
  className = "my-8 not-prose",
  offerLimit = PRICERUNNER_DEFAULT_OFFER_LIMIT,
}: PriceRunnerProductWidgetProps) {
  const allowMarketing = useMarketingConsent();
  const reactId = useId();
  // PriceRunner lowercaser widgetId i det genererede script — ID skal matche 1:1.
  const widgetId = useMemo(
    () => `pr-product-widget-${reactId.replace(/:/g, "").toLowerCase()}`,
    [reactId],
  );

  const resolved = useMemo(() => {
    if (productKey) {
      const p = getPriceRunnerProduct(productKey);
      if (!p) return null;
      return { productId: p.productId, title: p.title, compareUrl: p.compareUrl };
    }
    if (productId && title && compareUrl) {
      return { productId, title, compareUrl };
    }
    return null;
  }, [productKey, productId, title, compareUrl]);

  const scriptSrc = resolved
    ? buildWidgetScriptSrc({
        productId: resolved.productId,
        widgetId,
        offerLimit,
      })
    : null;

  useEffect(() => {
    if (!allowMarketing || !scriptSrc) return;

    const host = document.getElementById(widgetId);
    if (!host) return;

    let cancelled = false;
    host.replaceChildren();

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = scriptSrc;
    script.dataset.pricerunnerWidget = widgetId;

    script.onerror = () => {
      if (!cancelled) {
        host.replaceChildren();
      }
    };

    document.body.appendChild(script);

    return () => {
      cancelled = true;
      script.remove();
      host.replaceChildren();
    };
  }, [allowMarketing, scriptSrc, widgetId]);

  if (!resolved) return null;

  const trackedCompareUrl = withPriceRunnerRefSite(resolved.compareUrl);

  return (
    <aside className={className} aria-label={`Prissammenligning: ${resolved.title}`}>
      {heading ? <h3 className="mb-3 text-lg font-semibold text-stone-900">{heading}</h3> : null}

      {allowMarketing ? (
        <div id={widgetId} style={{ display: "block", width: "100%" }} />
      ) : (
        <p className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-sm text-stone-600">
          Accepter cookies for at se live prissammenligning hos PriceRunner — eller{" "}
          <a
            href={trackedCompareUrl}
            rel={compareLinkRel}
            target="_blank"
            className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-2 hover:text-rose-950"
          >
            sammenlign priser for {resolved.title}
          </a>
          .
        </p>
      )}

      <div className="mt-2 inline-block">
        <a href={trackedCompareUrl} rel={compareLinkRel} target="_blank">
          <p
            className="text-sm italic text-stone-500 underline decoration-stone-300 underline-offset-2 hover:text-stone-700"
            style={{ fontFamily: "Klarna Text, Helvetica, sans-serif" }}
          >
            Annonce i samarbejde med <span className="font-bold not-italic">PriceRunner</span>
          </p>
        </a>
      </div>
    </aside>
  );
}
