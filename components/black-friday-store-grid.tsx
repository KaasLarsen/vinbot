"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";

import { AffiliateTrackedLink } from "@/components/affiliate-tracked-link";
import { merchantMonogram } from "@/lib/merchant-hubs/logos";
import type { BlackFridayStore } from "@/lib/black-friday/store-directory";

const DEALS_HREF = "/black-friday#tilbud";

function StoreRing({ store }: { store: BlackFridayStore }) {
  const ring = store.partner
    ? "border-rose-800/40 shadow-[inset_0_0_0_3px_rgba(255,255,255,0.9)] ring-1 ring-rose-900/10"
    : "border-stone-200 opacity-80";
  const inner = (
    <>
      {store.logo ? (
        <Image
          src={store.logo.src}
          alt=""
          width={store.logo.wide ? 160 : 96}
          height={store.logo.wide ? 48 : 96}
          className="max-h-[58%] max-w-[70%] object-contain"
        />
      ) : (
        <span className="text-sm font-semibold tracking-wide text-stone-600" aria-hidden>
          {merchantMonogram(store.displayName)}
        </span>
      )}
    </>
  );

  return (
    <span
      className={`flex size-[4.75rem] items-center justify-center overflow-hidden rounded-full border-2 sm:size-24 ${
        store.logo?.onDark ? "bg-stone-900" : "bg-white"
      } ${ring}`}
    >
      {inner}
    </span>
  );
}

function InactiveDialog({
  store,
  open,
  onClose,
}: {
  store: BlackFridayStore | null;
  open: boolean;
  onClose: () => void;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      if (!el.open) el.showModal();
    } else if (el.open) {
      el.close();
    }
  }, [open]);

  if (!store) return null;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="w-[min(100%,24rem)] rounded-2xl border border-stone-200 bg-white p-0 shadow-xl backdrop:bg-stone-900/40"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
    >
      <div className="p-6">
        <h2 id={titleId} className="text-lg font-semibold text-stone-900">
          {store.displayName}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-stone-600">
          Vi har desværre ikke et prissamarbejde med denne butik endnu. Se de bedste verificerede tilbud fra vores
          partnere i stedet.
        </p>
        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            className="rounded-full border border-stone-200 px-4 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50"
            onClick={onClose}
          >
            Luk
          </button>
          <Link
            href={DEALS_HREF}
            className="rounded-full bg-rose-900 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-rose-800"
            onClick={onClose}
          >
            Se verificerede tilbud
          </Link>
        </div>
      </div>
    </dialog>
  );
}

function StoreCell({
  store,
  onInactive,
}: {
  store: BlackFridayStore;
  onInactive: (store: BlackFridayStore) => void;
}) {
  const label = store.partner
    ? `Åbn ${store.displayName}`
    : `${store.displayName} — intet prissamarbejde endnu`;

  const body = (
    <>
      <StoreRing store={store} />
      <span className="mt-2 line-clamp-2 max-w-[5.5rem] text-center text-[11px] font-medium leading-tight text-stone-700 sm:max-w-[6.5rem] sm:text-xs">
        {store.displayName}
      </span>
    </>
  );

  const className =
    "flex flex-col items-center rounded-2xl p-1.5 outline-none transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-rose-900/40";

  if (store.partner && store.href && store.external) {
    return (
      <li className="min-w-0">
        <AffiliateTrackedLink
          href={store.href}
          merchant={store.displayName}
          placement="black-friday-stores"
          slug={store.slug}
          hub="black-friday"
          className={className}
          aria-label={label}
        >
          {body}
        </AffiliateTrackedLink>
      </li>
    );
  }

  if (store.partner && store.href) {
    return (
      <li className="min-w-0">
        <Link href={store.href} className={className} aria-label={label}>
          {body}
        </Link>
      </li>
    );
  }

  return (
    <li className="min-w-0">
      <button type="button" className={`${className} w-full`} aria-label={label} onClick={() => onInactive(store)}>
        {body}
      </button>
    </li>
  );
}

export function BlackFridayStoreGrid({
  stores,
  teaserHref,
}: {
  stores: BlackFridayStore[];
  teaserHref?: string;
}) {
  const [inactive, setInactive] = useState<BlackFridayStore | null>(null);
  const onInactive = useCallback((store: BlackFridayStore) => setInactive(store), []);

  return (
    <div>
      <ul className="grid grid-cols-3 justify-items-center gap-x-2 gap-y-6 sm:gap-x-4 md:grid-cols-5">
        {stores.map((store) => (
          <StoreCell key={store.slug} store={store} onInactive={onInactive} />
        ))}
      </ul>
      {teaserHref ? (
        <p className="mt-8 text-center">
          <Link href={teaserHref} className="text-sm font-semibold text-rose-900 hover:underline">
            Se alle butikker
          </Link>
        </p>
      ) : null}
      <InactiveDialog store={inactive} open={Boolean(inactive)} onClose={() => setInactive(null)} />
    </div>
  );
}
