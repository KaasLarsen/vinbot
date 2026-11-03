"use client";

import { usePathname } from "next/navigation";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { parseGoneWineSlug } from "@/lib/vine/gone-slug";

function slugFromPathname(pathname: string): string {
  const m = pathname.match(/^\/vine\/([^/]+)\/?$/);
  return m?.[1]?.trim() ?? "";
}

function useVineGoneSlug(): string {
  return slugFromPathname(usePathname() ?? "");
}

/** Client-only — undgår `headers()` i not-found, så `/vine/[slug]` kan ISR/CDN-caches. */
export function VineGonePathHint() {
  const slug = useVineGoneSlug();
  const hint = slug ? parseGoneWineSlug(slug)?.label : null;
  const displayHint = hint?.trim() || (slug ? slug.replace(/-/g, " ") : "Denne vin");

  return <span className="font-medium text-stone-900">{displayHint}</span>;
}

export function VineGoneBreadcrumbs() {
  const slug = useVineGoneSlug();
  return (
    <Breadcrumbs
      items={[
        { href: "/", label: "Forside" },
        { href: "/vine", label: "Vin-katalog" },
        { href: slug ? `/vine/${slug}` : "/vine", label: "Ikke længere tilgængelig" },
      ]}
    />
  );
}
