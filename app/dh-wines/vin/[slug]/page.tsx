import { createPlaEditorialWineDetailRoute } from "@/lib/pla/create-editorial-pla-route";

const route = createPlaEditorialWineDetailRoute("dh-wines");

export const revalidate = 21600;
export const dynamicParams = true;
export const generateStaticParams = route.generateStaticParams;
export const generateMetadata = route.generateMetadata;
export default route.default;
