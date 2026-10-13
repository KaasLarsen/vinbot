import Link from "next/link";
import { PriceRunnerProductWidget } from "@/components/pricerunner-product-widget";

export function HomePriceRunnerStrip() {
  return (
    <section className="mt-12" aria-labelledby="home-pricerunner-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-2xl">
          <h2 id="home-pricerunner-heading" className="text-xl font-semibold tracking-tight text-stone-900">
            Find den billigste flaske og tilbehør
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Samme produkt, forskellige butikker — se hvor prisen er lavest lige nu (annonce via PriceRunner).
          </p>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <Link href="/vinglas" className="text-sm font-medium text-rose-900 hover:underline">
            Vinglas →
          </Link>
          <Link href="/vintilbehor" className="text-sm font-medium text-rose-900 hover:underline">
            Mere vintilbehør →
          </Link>
        </div>
      </div>

      <PriceRunnerProductWidget
        productKey="trapiche-oak-cask-malbec"
        heading="Ugens flaske — Trapiche Oak Cask Malbec"
        className="mt-6"
      />
      <PriceRunnerProductWidget
        productKey="le-creuset-waiters-friend-classic"
        heading="Proptrækker — Le Creuset Waiter's Friend"
        className="mt-8"
      />
      <PriceRunnerProductWidget
        productKey="spiegelau-definition-roedvinsglas"
        heading="Glas — Spiegelau Definition rødvinsglas"
        className="mt-8"
      />
    </section>
  );
}
