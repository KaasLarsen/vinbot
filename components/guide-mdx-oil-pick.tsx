import { OilAffiliateCard } from "@/components/oil-affiliate-card";
import { getOilById } from "@/lib/oils/catalog";

/** MDX: &lt;GuideOilPick oilId="nicolas-vahe-evoo" heading="Gave-olie" /&gt; */
export function GuideOilPick({
  oilId,
  heading,
  slug,
  hub,
}: {
  oilId: string;
  heading?: string;
  slug?: string;
  hub?: string;
}) {
  const oil = getOilById(oilId);
  if (!oil) return null;

  return (
    <div className="not-prose mt-6">
      <OilAffiliateCard
        oil={oil}
        heading={heading ?? "Olie hos KitchenOne"}
        placement="guide-oil"
        slug={slug ?? "vin-og-olie-vaertsgave"}
        hub={hub ?? "bedste-vine"}
      />
    </div>
  );
}
