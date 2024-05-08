import Container from "@/components/Container/Container";
import TableSection from "@/components/TableSection/TableSection";
import dynamic from "next/dynamic";

interface PageProps {}
const BannerSlide = dynamic(() => import("@/components/BannerSlide/BannerSlide"), { ssr: false });
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
