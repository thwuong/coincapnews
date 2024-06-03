import { useTranslation } from "@/app/i18n";
import { BannerSlide } from "@/components/BannerSlide";
import { Container } from "@/components/Container";
import { TableSection } from "@/components/TableSection";
interface PageProps {
    params: {
        id: string;
        lang: string;
    };
}
async function Page(props: PageProps) {
    const { t } = await useTranslation(props.params.lang);

    return (
        <main className="pb-24">
            <Container className="px-12">
                <BannerSlide />
                <TableSection />
            </Container>
        </main>
    );
}

export default Page;
