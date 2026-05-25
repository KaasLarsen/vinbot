import { createWineDetailRoute } from "@/lib/wine-detail-pages/create-route";

const route = createWineDetailRoute("winther-vin");

export const revalidate = 21600;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.default;
