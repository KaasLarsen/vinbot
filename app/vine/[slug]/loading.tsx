import { PageShell } from "@/components/page-shell";

export default function VineProductLoading() {
  return (
    <PageShell className="py-10">
      <div role="status" aria-live="polite" aria-label="Henter vin">
        <div className="h-4 w-48 animate-pulse rounded bg-stone-200" />
        <div className="mt-8 space-y-3">
          <div className="h-10 max-w-xl animate-pulse rounded-lg bg-stone-200" />
          <div className="h-5 w-40 animate-pulse rounded bg-stone-100" />
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
          <div className="aspect-square w-full max-w-[280px] animate-pulse rounded-2xl bg-stone-100" />
          <div className="space-y-4">
            <div className="h-4 w-full animate-pulse rounded bg-stone-100" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-stone-100" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-stone-100" />
            <div className="mt-8 h-32 animate-pulse rounded-2xl bg-stone-50" />
          </div>
        </div>
        <div className="mt-10 h-48 animate-pulse rounded-2xl bg-stone-50" />
        <span className="sr-only">Henter vin…</span>
      </div>
    </PageShell>
  );
}
