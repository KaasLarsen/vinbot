export function parseForceFlag(raw: string | null | undefined): boolean {
  const force = raw?.trim().toLowerCase();
  return force === "1" || force === "true" || force === "yes";
}
