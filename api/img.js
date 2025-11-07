// /api/img.js
export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  try {
    const src = (req.query.src || "").toString();
    if (!src) return res.status(400).send("missing src");

    const r = await fetch(src, {
      headers: {
        "user-agent": "VinbotImageProxy/1.0 (+https://vinbot.dk)",
        "referer": "https://vinbot.dk/"
      }
    });

    const ct = r.headers.get("content-type") || "image/jpeg";
    res.setHeader("content-type", ct);
    res.setHeader("cache-control", "public, max-age=86400");
    const buf = Buffer.from(await r.arrayBuffer());
    res.status(200).send(buf);
  } catch (e) {
    res.status(204).end(); // intet billede = bare tomt
  }
}
