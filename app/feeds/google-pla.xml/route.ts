import { getSpsPlaCatalog } from "@/lib/pla/catalog";
import { renderGooglePlaRss } from "@/lib/pla/google-rss";

export const revalidate = 21600;
export const maxDuration = 60;

export async function GET(): Promise<Response> {
  const items = await getSpsPlaCatalog();
  const xml = renderGooglePlaRss(items);
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
