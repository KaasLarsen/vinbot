"use client";

import { InlineProductPicks } from "@/components/inline-product-picks";

type ShopPreset = {
  q: string;
  max: number | null;
  label: string;
  searchHref: string;
  heading: string;
};

const PRESETS: Record<string, ShopPreset> = {
  "bedste-box-vin": {
    q: "bag-in-box bib",
    max: null,
    label: "boxvin og papvin",
    searchHref: "/?q=bag-in-box+bib",
    heading: "Køb boxvin nu — direkte fra forhandler",
  },
  "bedste-papvin-under-150-kr": {
    q: "bag-in-box bib",
    max: 150,
    label: "papvin under 150 kr",
    searchHref: "/?q=bag-in-box+bib&max=150",
    heading: "Papvin under 150 kr — fra forhandlerne",
  },
  "bedste-rose-paa-boks": {
    q: "bag-in-box rosato bib",
    max: null,
    label: "rosé på boks",
    searchHref: "/?q=bag-in-box+rosato+bib",
    heading: "Rosé på boks — fra forhandlerne",
  },
  "bedste-rod-papvin": {
    q: "bag-in-box bib rodvin",
    max: null,
    label: "rød papvin",
    searchHref: "/?q=bag-in-box+bib+rodvin",
    heading: "Rød papvin — fra forhandlerne",
  },
  "bedste-hvid-papvin": {
    q: "bag-in-box bib hvidvin",
    max: null,
    label: "hvid papvin",
    searchHref: "/?q=bag-in-box+bib+hvidvin",
    heading: "Hvid papvin — fra forhandlerne",
  },
};

/** Shop-blok til indlejring i guide-MDX (fx ved Top 5). */
export function GuideMdxShopPicks({ preset = "bedste-box-vin" }: { preset?: string }) {
  const p = PRESETS[preset];
  if (!p) return null;

  return (
    <InlineProductPicks
      q={p.q}
      max={p.max}
      slug={preset}
      placement="guide-mdx-picks"
      label={p.label}
      searchHref={p.searchHref}
      heading={p.heading}
      max_items={3}
    />
  );
}
