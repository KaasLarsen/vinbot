"use client";

import { InlineProductPicks } from "@/components/inline-product-picks";

export function GuideProductPicks({
  q,
  max,
  slug,
  hub,
  label,
  searchHref,
  heading = "Se 3 forslag fra danske forhandlere",
  max_items = 3,
}: {
  q: string;
  max: number | null;
  slug: string;
  hub?: string;
  label: string;
  searchHref: string;
  heading?: string;
  max_items?: number;
}) {
  return (
    <InlineProductPicks
      q={q}
      max={max}
      slug={slug}
      hub={hub}
      placement="guide-picks"
      label={label}
      searchHref={searchHref}
      heading={heading}
      max_items={max_items}
    />
  );
}
