import { getFeedDealSearchIndex } from "@/lib/deals/engine";
import { HomeBestDealsSearch } from "@/components/home-best-deals-search";

/** Server-wrapper: bager søgeindeks ind i HTML (ISR) — klient filtrerer instant. */
export async function HomeBestDealsSearchSection() {
  const index = await getFeedDealSearchIndex(15);
  return <HomeBestDealsSearch index={index} />;
}
