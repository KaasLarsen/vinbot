import Image from "next/image";
import type { ReactNode } from "react";

const HERO_IMAGE = "/images/hero/hero-vin-atmosphere.jpg";

/** Atmosfærisk vin-baggrund med gradient-overlay — redaktionelle indgange før vinsøgning. */
export function HomeHeroSearchSection({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden rounded-3xl shadow-sm ring-1 ring-stone-200/80">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1152px"
          className="object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-50/92 via-rose-50/88 to-amber-50/85 sm:from-stone-50/88 sm:via-rose-50/82 sm:to-white/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/40" />
      </div>
      <div className="relative z-10 px-5 py-7 sm:px-10 sm:py-9">{children}</div>
    </section>
  );
}
