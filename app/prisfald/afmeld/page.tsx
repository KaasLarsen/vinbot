import type { Metadata } from "next";

import { PageShell } from "@/components/page-shell";
import { getPriceAlertById } from "@/lib/price-alerts/subscribe";
import { priceAlertTokenSecret, verifyPriceAlertToken } from "@/lib/price-alerts/token";

export const metadata: Metadata = {
  title: "Afmeld prisfald",
  robots: { index: false, follow: false },
};

type Props = {
  searchParams: Promise<{ token?: string; done?: string; error?: string }>;
};

export default async function PriceAlertUnsubscribePage({ searchParams }: Props) {
  const params = await searchParams;
  const done = params.done === "1";
  const failed = params.error === "1";

  if (done) {
    return (
      <PageShell className="py-10">
        <h1 className="text-3xl font-semibold text-stone-900">Du er afmeldt</h1>
        <p className="mt-3 max-w-xl text-stone-700">
          Vi sender ikke flere prisfald-mails for den vin. Nyhedsbrevet er uændret, hvis du er tilmeldt det.
        </p>
      </PageShell>
    );
  }

  if (!priceAlertTokenSecret()) {
    return (
      <PageShell className="py-10">
        <h1 className="text-3xl font-semibold text-stone-900">Afmeld prisfald</h1>
        <p className="mt-3 text-stone-700">Afmelding er midlertidigt utilgængelig. Prøv igen senere.</p>
      </PageShell>
    );
  }

  const alertId = params.token ? verifyPriceAlertToken(params.token) : null;
  const alert = alertId ? await getPriceAlertById(alertId) : null;

  if (!alert) {
    return (
      <PageShell className="py-10">
        <h1 className="text-3xl font-semibold text-stone-900">Afmeld prisfald</h1>
        <p className="mt-3 text-stone-700">Linket er ugyldigt eller udløbet. Skriv til os, hvis du stadig får mails.</p>
      </PageShell>
    );
  }

  if (alert.status === "unsubscribed") {
    return (
      <PageShell className="py-10">
        <h1 className="text-3xl font-semibold text-stone-900">Du er allerede afmeldt</h1>
        <p className="mt-3 text-stone-700">Vi sender ikke prisfald-mails om {alert.wineTitle}.</p>
      </PageShell>
    );
  }

  return (
    <PageShell className="py-10">
      <h1 className="text-3xl font-semibold text-stone-900">Afmeld prisfald</h1>
      <p className="mt-3 max-w-xl text-stone-700">
        Vil du stoppe mails, når en partnerbutik sætter <strong>{alert.wineTitle}</strong> på tilbud?
      </p>
      {failed ? (
        <p className="mt-3 text-sm text-rose-800" role="alert">
          Afmelding lykkedes ikke. Prøv igen.
        </p>
      ) : null}
      <form action="/api/price-alerts/unsubscribe" method="post" className="mt-6">
        <input type="hidden" name="token" value={params.token} />
        <button
          type="submit"
          className="rounded-xl bg-rose-900 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-950"
        >
          Afmeld denne vin
        </button>
      </form>
    </PageShell>
  );
}
