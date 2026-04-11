import type { MetadataRoute } from "next";
import { getGuideSlugs } from "@/lib/content/guides";
import { siteUrl } from "@/lib/site";

const hubs = ["mad-og-vin", "humoer-og-vin", "saeson", "druesorter", "regioner", "den-sidste-flaske", "om-os", "kontakt", "privatliv", "betingelser"];

export default function sitemap(): MetadataRoute.Sitemap {
  const last = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: last, changeFrequency: "daily", priority: 1 },
    ...hubs.map((path) => ({
      url: `${siteUrl}/${path}`,
      lastModified: last,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
  ];

  const guides = getGuideSlugs().map((slug) => ({
    url: `${siteUrl}/guides/${slug}`,
    lastModified: last,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticPages, ...guides];
}
