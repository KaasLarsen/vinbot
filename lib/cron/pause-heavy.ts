/** Nødstop for dyre Fluid-paths (cron warm + /api/img upstream). */
export function isHeavyWorkPaused(): boolean {
  const v = process.env.VINBOT_PAUSE_HEAVY?.trim().toLowerCase();
  return v === "1" || v === "true" || v === "yes";
}
