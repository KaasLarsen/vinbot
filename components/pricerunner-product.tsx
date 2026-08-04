"use client";

import { PriceRunnerProductWidget } from "@/components/pricerunner-product-widget";
import type { PriceRunnerProductKey } from "@/lib/pricerunner/products";

/**
 * MDX-indlejring: &lt;PriceRunnerProduct productKey="witt-classic-ef5483i" /&gt;
 * Kun keys fra det kuraterede registry.
 */
export function PriceRunnerProduct({
  productKey,
  heading,
}: {
  productKey: PriceRunnerProductKey | string;
  heading?: string;
}) {
  return <PriceRunnerProductWidget productKey={productKey} heading={heading} />;
}
