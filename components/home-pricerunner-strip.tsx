import Link from "next/link";
import { PriceRunnerProductWidget } from "@/components/pricerunner-product-widget";

export function HomePriceRunnerStrip() {
  return (
    <section className="mt-16" aria-labelledby="home-pricerunner-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="max-w-2xl">
          <h2 id="home-pricerunner-heading" className="text-xl font-semibold tracking-tight text-stone-900">
            Sammenlign priser
          </h2>
          <p className="mt-1 text-sm text-stone-600">
            Flaske og vintilbehør via PriceRunner (annonce). Tjek altid lager, årgang og fragt hos forhandleren.
          </p>
        </div>
        <Link href="/vintilbehor" className="text-sm font-medium text-rose-900 hover:underline">
          Mere vintilbehør →
        </Link>
      </div>

      <PriceRunnerProductWidget
        productKey="trapiche-oak-cask-malbec"
        heading="Vin — Trapiche Oak Cask Malbec"
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
