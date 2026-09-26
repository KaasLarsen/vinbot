"use client";

import Link from "next/link";
import { useEffect, useId, useMemo, useRef, useState } from "react";
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
import { useIsClient } from "@/lib/use-is-client";
import { useMarketingConsent } from "@/lib/use-marketing-consent";

export type PriceRunnerProductWidgetProps = {
  productKey?: PriceRunnerProductKey | string;
  productId?: string;
  title?: string;
  compareUrl?: string;
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

/** Serialisér product.js — flere widgets på én side må ikke køre parallelt. */
let widgetLoadQueue: Promise<void> = Promise.resolve();

function enqueueWidgetLoad(task: () => Promise<void>): Promise<void> {
  const next = widgetLoadQueue.then(task, task);
  widgetLoadQueue = next.then(
    () => undefined,
    () => undefined,
  );
  return next;
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = src;
    script.onload = () => resolve();
    script.onerror = () => {
      script.remove();
      reject(new Error("PriceRunner widget script failed"));
    };
    document.body.appendChild(script);
  });
}

/**
 * Kurateret PriceRunner-prissammenligning (udstyr/tilbehør).
 * product.js indlæses kun efter cookie-valget "Accepter".
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
  const reactId = useId();
  const hostRef = useRef<HTMLDivElement>(null);
  const allowMarketing = useMarketingConsent();
  const isClient = useIsClient();
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

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
    const host = hostRef.current;
    if (!host) return;

    let cancelled = false;

    const observer = new MutationObserver(() => {
      if (host.childElementCount > 0) {
        setStatus("ready");
        observer.disconnect();
      }
    });
    observer.observe(host, { childList: true, subtree: true });

    void enqueueWidgetLoad(async () => {
      if (cancelled) return;
      if (host.childElementCount > 0) {
        setStatus("ready");
        return;
      }
      try {
        await loadScript(scriptSrc);
        if (cancelled) return;
        window.setTimeout(() => {
          if (!cancelled && host.childElementCount === 0) {
            setStatus("error");
          }
        }, 4000);
      } catch {
        if (!cancelled) setStatus("error");
      }
    });

    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [allowMarketing, scriptSrc]);

  if (!resolved) return null;

  if (!allowMarketing) {
    return (
      <aside className={className} aria-label={`Prissammenligning: ${resolved.title}`}>
        {heading ? <h3 className="mb-3 text-lg font-semibold text-stone-900">{heading}</h3> : null}
        {isClient ? (
          <p className="rounded-lg border border-stone-200 bg-stone-50 px-4 py-3 text-sm leading-relaxed text-stone-700">
            Prissammenligning via PriceRunner vises, når du har accepteret cookies til statistik og annoncer.{" "}
            <Link href="/cookiepolitik" className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-2">
              Cookiepolitik
            </Link>
          </p>
        ) : (
          <div className="min-h-[8rem] w-full animate-pulse rounded-lg bg-stone-100" />
        )}
      </aside>
    );
  }

  const trackedCompareUrl = withPriceRunnerRefSite(resolved.compareUrl);

  return (
    <aside className={className} aria-label={`Prissammenligning: ${resolved.title}`}>
      {heading ? <h3 className="mb-3 text-lg font-semibold text-stone-900">{heading}</h3> : null}

      <div
        ref={hostRef}
        id={widgetId}
        className={status === "loading" ? "min-h-[12rem] w-full animate-pulse rounded-lg bg-stone-100" : "block w-full"}
        style={{ display: "block", width: "100%" }}
      />

      {status === "error" ? (
        <a
          href={trackedCompareUrl}
          rel={compareLinkRel}
          target="_blank"
          className="mt-3 inline-flex rounded-lg bg-rose-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-rose-950"
        >
          Sammenlign priser for {resolved.title}
        </a>
      ) : null}

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
