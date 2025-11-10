export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host  = req.headers.host;
  const base  = `${proto}://${host}`.replace(/\/+$/,"");

  const txt = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${base}/sitemap.xml`
  ].join("\n");

  res.setHeader("content-type", "text/plain; charset=utf-8");
  // Cache i 1 dag
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=600");
  res.status(200).send(txt);
}
