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
