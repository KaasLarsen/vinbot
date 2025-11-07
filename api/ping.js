// /api/ping.js
export const config = { runtime: "nodejs18.x" };

export default async function handler(req, res) {
  res.setHeader("content-type", "application/json; charset=utf-8");
  res.status(200).json({ ok: true, ts: Date.now() });
}
