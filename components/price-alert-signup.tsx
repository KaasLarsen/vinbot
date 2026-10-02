"use client";

import Link from "next/link";
import { useId, useState } from "react";
import type { FormEvent } from "react";

type CurrentDeal = {
  merchant: string;
  price: number;
  discountPercent: number | null;
};

type Props = {
  slug: string;
  wineTitle: string;
  currentDeal: CurrentDeal | null;
};

type Status = "idle" | "submitting" | "success" | "already" | "error";

function BellIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="size-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5"
      />
      <path strokeLinecap="round" d="M9.5 17a2.5 2.5 0 0 0 5 0" />
    </svg>
  );
}

export function PriceAlertSignup({ slug, wineTitle, currentDeal }: Props) {
  const formId = useId();
  const emailId = `${formId}-email`;
  const consentId = `${formId}-consent`;
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setErrorMessage(null);
    if (!email.trim()) {
      setErrorMessage("E-mail er påkrævet.");
      return;
    }
    if (!consent) {
      setErrorMessage("Du skal give samtykke for at få besked om prisfald.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/price-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), slug, consent: true }),
      });
      const json = (await res.json().catch(() => null)) as { error?: string; already?: boolean } | null;
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json?.error || "Noget gik galt. Prøv igen.");
        return;
      }
      setStatus(json?.already ? "already" : "success");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
      setErrorMessage("Kunne ikke sende. Tjek din forbindelse og prøv igen.");
    }
  }

  const dealNote = currentDeal ? (
    <p className="text-sm text-stone-700">
      {currentDeal.merchant} har den på tilbud nu (ca. {currentDeal.price} kr
      {currentDeal.discountPercent != null ? `, −${currentDeal.discountPercent} %` : ""}). Tilmelding gælder næste
      prisfald.
    </p>
  ) : null;

  if (status === "success" || status === "already") {
    return (
      <div role="status">
        <p className="text-sm font-semibold text-stone-900">
          {status === "already" ? "Du følger allerede prisfald på denne vin" : "Du er tilmeldt"}
        </p>
        <p className="mt-1 text-sm text-stone-600">
          {status === "already"
            ? `Vi skriver til dig, når en partnerbutik sætter ${wineTitle} yderligere ned.`
            : `Vi skriver, når en partnerbutik sætter ${wineTitle} på tilbud. Det er ikke nyhedsbrevet.`}
        </p>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-xl border border-rose-200 bg-white px-3.5 py-2 text-sm font-semibold text-rose-950 hover:border-rose-300 hover:bg-rose-50"
      >
        <BellIcon />
        Tilmeld dig prisfald
      </button>
      {open ? (
        <form onSubmit={handleSubmit} className="mt-3 flex flex-col gap-2.5">
          {dealNote}
          <p className="text-sm text-stone-600">
            Få en mail, når en partnerbutik sætter {wineTitle} på tilbud. Én tilmelding dækker alle partnerbutikker.
          </p>
          <label htmlFor={emailId} className="sr-only">
            E-mail
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-sm text-stone-900 shadow-sm outline-none placeholder:text-stone-400 focus:border-rose-900 focus:ring-2 focus:ring-rose-900/15"
            placeholder="din@email.dk"
            autoComplete="email"
            required
          />
          <label htmlFor={consentId} className="flex items-start gap-2 text-xs leading-snug text-stone-600">
            <input
              id={consentId}
              type="checkbox"
              name="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-rose-900"
              required
            />
            <span>
              Jeg samtykker til, at Vinbot sender mig en e-mail, når en partnerbutik sætter denne vin på tilbud. Jeg kan
              afmelde mig når som helst. Det er ikke tilmelding til nyhedsbrevet. Se{" "}
              <Link
                href="/privatliv"
                className="font-medium text-rose-900 underline decoration-rose-300 underline-offset-2 hover:text-rose-950"
              >
                privatlivspolitik
              </Link>
              .
            </span>
          </label>
          {errorMessage ? (
            <p className="text-sm text-rose-800" role="alert">
              {errorMessage}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="self-start rounded-xl bg-rose-900 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Tilmelder…" : "Giv mig besked"}
          </button>
        </form>
      ) : dealNote ? (
        <div className="mt-3">{dealNote}</div>
      ) : null}
    </div>
  );
}
