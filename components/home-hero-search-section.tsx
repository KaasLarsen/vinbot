import Image from "next/image";
import type { ReactNode } from "react";

const HERO_IMAGE = "/images/hero/hero-vin-atmosphere.jpg";

/** Kompakt vinsøgnings-hero — rosé/bokeh til højre, læsbar tekst til venstre. */
export function HomeHeroSearchSection({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden rounded-2xl shadow-md ring-1 ring-rose-900/10">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1440px"
          className="object-cover object-[72%_center] sm:object-[85%_center]"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/78 to-white/15 sm:from-white/92 sm:via-white/55 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-950/8 via-transparent to-amber-900/15" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-rose-950/20 to-transparent sm:h-32" />
      </div>
      <div className="relative z-10 px-5 py-7 sm:px-8 sm:py-8">{children}</div>
    </section>
  );
}
