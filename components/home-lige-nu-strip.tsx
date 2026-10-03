"use client";

import Link from "next/link";
import { getHomeMoment } from "@/lib/home-moment";

export function HomeLigeNuStrip() {
  const moment = getHomeMoment();

  return (
    <section
      className="flex h-full flex-col rounded-2xl border border-rose-200/70 bg-rose-50/90 p-4 shadow-sm sm:p-5"
      aria-labelledby="home-lige-nu-heading"
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-rose-900/90">Lige nu</p>
      <h2 id="home-lige-nu-heading" className="mt-1 text-lg font-semibold tracking-tight text-stone-900 sm:text-xl">
        {moment.headline}
      </h2>
      <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-stone-700">{moment.blurb}</p>
      <ul className="mt-2 flex flex-wrap gap-1.5">
        {moment.links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="inline-flex rounded-full border border-rose-200 bg-white px-2.5 py-1 text-[13px] font-medium text-rose-900 shadow-sm hover:border-rose-400 hover:bg-rose-50"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-auto pt-3">
        <Link href="/saeson" className="text-sm font-medium text-rose-900 hover:underline">
          Se sæsonen →
        </Link>
      </p>
    </section>
  );
}
