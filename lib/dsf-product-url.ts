const DSF_HOST = "densidsteflaske.dk";

/** Fjerner query/hash og kræver DSF-host — så Partner-Ads `htmlurl` altid er ren butiks-URL. */
export function sanitizeDsfProductUrl(raw: string): string {
  const u = new URL(raw.trim(), `https://${DSF_HOST}/`);
  if (!u.hostname.endsWith(DSF_HOST)) {
    throw new Error(`sanitizeDsfProductUrl: forventede ${DSF_HOST}, fik ${u.hostname}`);
  }
  u.protocol = "https:";
  u.search = "";
  u.hash = "";
  const path = u.pathname.replace(/\/+$/, "") || "/";
  return `https://${u.hostname}${path}`;
}
