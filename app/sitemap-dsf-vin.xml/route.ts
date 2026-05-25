import { siteUrl } from "@/lib/site";

export const revalidate = 300;

/** Behold gammel URL — redirect til generaliseret wine-detail sitemap. */
export async function GET(): Promise<Response> {
  const target = `${siteUrl.replace(/\/$/, "")}/sitemap-wine-detail.xml`;
  return Response.redirect(target, 301);
}
