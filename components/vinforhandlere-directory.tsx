"use client";

import Image from "next/image";
import Link from "next/link";
import { getMerchantLogo, merchantMonogram } from "@/lib/merchant-hubs/logos";
import type { MerchantHubConfig } from "@/lib/merchant-hubs/types";

const ACCENTS = [
  "from-rose-900/90 to-stone-800",
  "from-amber-900/85 to-stone-800",
  "from-stone-800 to-rose-950",
  "from-rose-800 to-amber-950",
  "from-stone-700 to-stone-900",
] as const;

function accentForSlug(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i) * (i + 1)) % ACCENTS.length;
  return ACCENTS[h];
}

export function VinforhandlereDirectory({ hubs }: { hubs: MerchantHubConfig[] }) {
  return (
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {hubs.map((hub, index) => {
        const logo = getMerchantLogo(hub.slug);
        const accent = accentForSlug(hub.slug);
        return (
          <li key={hub.slug} className="min-w-0">
            <Link
              href={`/${hub.slug}`}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-stone-200/90 bg-white shadow-sm ring-1 ring-stone-100 transition duration-300 hover:-translate-y-0.5 hover:border-rose-200/80 hover:shadow-md"
              style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
            >
              <div
                className={`relative flex h-28 items-center justify-center bg-gradient-to-br px-5 ${
                  logo?.onDark ? accent : "from-stone-50 via-white to-rose-50/40"
                }`}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-[0.07]"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 20%, #881337 0%, transparent 45%), radial-gradient(circle at 80% 80%, #78350f 0%, transparent 40%)",
                  }}
                />
                {logo ? (
                  <Image
                    src={logo.src}
                    alt={`${hub.displayName} logo`}
                    width={logo.wide ? 280 : 120}
                    height={logo.wide ? 80 : 120}
                    className={`relative z-[1] object-contain transition duration-300 group-hover:scale-[1.04] ${
                      logo.wide ? "h-12 w-auto max-w-[85%]" : "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]"
                    }`}
                    sizes={logo.wide ? "220px" : "96px"}
                  />
                ) : (
                  <span
                    className={`relative z-[1] flex size-16 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-semibold tracking-wide text-white shadow-inner ${accent}`}
                    aria-hidden
                  >
                    {merchantMonogram(hub.displayName)}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h2 className="text-lg font-semibold tracking-tight text-stone-900 transition group-hover:text-rose-900">
                  {hub.displayName}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-stone-600">{hub.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-rose-900">
                  Se flasker og shop
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
