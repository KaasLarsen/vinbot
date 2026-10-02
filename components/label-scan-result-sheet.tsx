"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { LabelScanMatch } from "@/lib/label-scan/types";
import { getFoodSessionContext, type FoodSessionContext } from "@/lib/food-picker/session-context";
import { useTasteProfile } from "@/lib/taste/use-taste-profile";
import { proxyImg } from "@/lib/search/helpers";

type Props = {
  match: LabelScanMatch | null;
  alternatives: LabelScanMatch[];
  query: string;
  onPickAlternative: (m: LabelScanMatch) => void;
  onGoToWine: (slug: string) => void;
  onSearchFallback: (q: string) => void;
  onRetake: () => void;
  onClose: () => void;
};

function savingsLine(m: LabelScanMatch): string | null {
  if (
    m.lowestPrice == null ||
    m.highestPrice == null ||
    m.cheapestMerchant == null ||
    m.highestMerchant == null
  ) {
    return null;
  }
  const diff = Math.round(m.highestPrice - m.lowestPrice);
  if (diff < 5) return null;
  return `${diff} kr. billigere hos ${m.cheapestMerchant} end hos ${m.highestMerchant}`;
}

export function LabelScanResultSheet({
  match,
  alternatives,
  query,
  onPickAlternative,
  onGoToWine,
  onSearchFallback,
  onRetake,
  onClose,
}: Props) {
  const [food, setFood] = useState<FoodSessionContext | null>(null);
  const { ready } = useTasteProfile();

  useEffect(() => {
    setFood(getFoodSessionContext());
  }, []);

  const primary = match;
  const showAlts = !match && alternatives.length > 0;
  const saveText = primary ? savingsLine(primary) : null;

  return (
    <div className="absolute inset-0 flex flex-col justify-end bg-stone-950/90 p-4 sm:p-5">
      <div className="max-h-[85%] overflow-y-auto rounded-2xl border border-stone-600 bg-stone-900 p-4 text-left shadow-xl">
        {primary ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-200/90">Fundet</p>
            <div className="mt-2 flex gap-3">
              {primary.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={proxyImg(primary.image)}
                  alt=""
                  className="size-20 shrink-0 rounded-lg bg-white object-contain p-1"
                />
              ) : null}
              <div className="min-w-0">
                <h3 className="text-base font-semibold leading-snug text-white">{primary.displayTitle}</h3>
                {primary.brand ? <p className="mt-0.5 text-xs text-stone-400">{primary.brand}</p> : null}
                {primary.lowestPrice != null && primary.cheapestMerchant ? (
                  <p className="mt-2 text-sm text-stone-200">
                    Fra <span className="font-semibold tabular-nums">{primary.lowestPrice} kr</span> hos{" "}
                    {primary.cheapestMerchant}
                    {primary.merchantCount > 1 ? ` · ${primary.merchantCount} butikker` : null}
                  </p>
                ) : null}
                {saveText ? <p className="mt-1 text-xs font-medium text-amber-200">{saveText}</p> : null}
              </div>
            </div>

            {food ? (
              <p className="mt-3 rounded-lg bg-stone-800/80 px-3 py-2 text-sm text-stone-200">
                Til <strong className="text-white">{food.dishLabel}</strong>
                {primary.pairingHint ? ` — ${primary.pairingHint}` : "."}
                {ready ? " Matcher også din smagsprofil." : null}
              </p>
            ) : primary.pairingHint ? (
              <p className="mt-3 text-sm text-stone-300">{primary.pairingHint}</p>
            ) : null}

            <div className="mt-4 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => onGoToWine(primary.slug)}
                className="w-full rounded-xl bg-rose-800 px-4 py-3 text-sm font-semibold text-white hover:bg-rose-700"
              >
                Se priser og køb
              </button>
              <Link
                href={`/vine/${primary.slug}`}
                onClick={onClose}
                className="text-center text-xs text-stone-400 underline hover:text-stone-200"
              >
                Åbn vinsiden
              </Link>
            </div>

            {alternatives.length > 0 ? (
              <div className="mt-4 border-t border-stone-700 pt-3">
                <p className="text-xs font-medium text-stone-400">Mente du en anden?</p>
                <ul className="mt-2 space-y-1.5">
                  {alternatives.slice(0, 3).map((a) => (
                    <li key={a.slug}>
                      <button
                        type="button"
                        onClick={() => onPickAlternative(a)}
                        className="w-full rounded-lg px-2 py-1.5 text-left text-sm text-stone-200 hover:bg-stone-800"
                      >
                        {a.displayTitle}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </>
        ) : showAlts ? (
          <>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-200/90">Mente du…?</p>
            <p className="mt-1 text-sm text-stone-300">Vi er ikke helt sikre — vælg den rigtige flaske:</p>
            <ul className="mt-3 space-y-2">
              {alternatives.map((a) => (
                <li key={a.slug}>
                  <button
                    type="button"
                    onClick={() => onPickAlternative(a)}
                    className="flex w-full items-center gap-3 rounded-xl border border-stone-600 bg-stone-800/50 px-3 py-2 text-left hover:border-amber-400/50"
                  >
                    {a.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={proxyImg(a.image)} alt="" className="size-12 rounded bg-white object-contain p-0.5" />
                    ) : null}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium text-white">{a.displayTitle}</span>
                      {a.lowestPrice != null ? (
                        <span className="text-xs text-stone-400">fra {a.lowestPrice} kr</span>
                      ) : null}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {query ? (
              <button
                type="button"
                onClick={() => onSearchFallback(query)}
                className="mt-3 w-full text-center text-xs text-stone-400 underline"
              >
                Søg i stedet efter «{query}»
              </button>
            ) : null}
          </>
        ) : (
          <p className="text-sm text-stone-200">Ingen sikre matches.</p>
        )}

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={onRetake}
            className="flex-1 rounded-xl border border-stone-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-stone-800"
          >
            Tag igen
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-xl border border-stone-600 px-3 py-2.5 text-sm font-medium text-white hover:bg-stone-800"
          >
            Luk
          </button>
        </div>
      </div>
    </div>
  );
}
