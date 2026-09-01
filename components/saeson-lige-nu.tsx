"use client";

import Link from "next/link";
import { getHomeMoment } from "@/lib/home-moment";

function joinLinks(links: { href: string; label: string }[]) {
  return links.map((link, i) => (
    <span key={link.href}>
      {i > 0 ? (i === links.length - 1 ? " og " : ", ") : null}
      <Link href={link.href} className="text-rose-900 hover:underline">
        {link.label}
      </Link>
    </span>
  ));
}

export function SaesonLigeNu() {
  const moment = getHomeMoment();

  return (
    <section className="mt-10 rounded-lg bg-rose-50 p-6">
      <h2 className="text-xl font-semibold text-stone-900">{moment.saesonHeadline}</h2>
      <p className="mt-3 text-stone-700">{moment.saesonIntro}</p>
      {moment.saesonGuideLinks.length > 0 ? (
        <p className="mt-3 text-stone-700">Sæson-højdepunkter: {joinLinks(moment.saesonGuideLinks)}.</p>
      ) : null}
      {moment.saesonRecipeLinks.length > 0 ? (
        <p className="mt-3 text-sm text-stone-700">
          Opskrifter: {joinLinks(moment.saesonRecipeLinks)}. Se hele{" "}
          <Link href="/opskrifter" className="text-rose-900 hover:underline">
            opskriftsoversigten
          </Link>
          .
        </p>
      ) : null}
    </section>
  );
}
