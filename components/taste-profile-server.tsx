import { TasteProfileCta } from "@/components/taste-profile-cta";
import { loadTasteCandidates } from "@/lib/taste/load-candidates";

/** Server: bag ind kandidater i forsiden så wizard ikke venter på /api/taste/candidates. */
export async function TasteProfileServer({
  className = "",
  variant = "button",
}: {
  className?: string;
  variant?: "button" | "line";
}) {
  let initialCandidates: Awaited<ReturnType<typeof loadTasteCandidates>> = [];
  try {
    initialCandidates = await loadTasteCandidates(8);
  } catch (e) {
    console.error("[TasteProfileServer]", e);
  }
  return <TasteProfileCta className={className} variant={variant} initialCandidates={initialCandidates} />;
}
