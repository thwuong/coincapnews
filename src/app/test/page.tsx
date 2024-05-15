import Auth from "@/components/Auth/Auth";
import Container from "@/components/Container/Container";
import { DerivativesExchanges } from "@/components/DerivativesExchanges";
import dynamic from "next/dynamic";

interface PageProps {}
const BannerSlide = dynamic(() => import("@/components/BannerSlide/BannerSlide"));
const TableSection = dynamic(() => import("@/components/TableSection/TableSection"));
export default async function Page(props: PageProps) {
    return (
        <section className="w-full flex justify-center flex-col items-center">
            <Container className="px-12">
                <BannerSlide />
            </Container>
            <TableSection />
        </section>
    );
}
