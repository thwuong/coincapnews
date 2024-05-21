"use client";
import { useTranslation } from "@/app/i18n/client";
import { useAppSelector } from "@/lib/hooks";
import { Container } from "../Container";
import { Heading } from "../Heading";
import FormSubmitCoin from "./FormSubmitCoin";

function SumbitCoin() {
    const { currentLanguage } = useAppSelector((state) => state.langStore);
    const { t } = useTranslation(currentLanguage);

    return (
        <section className="w-full bg-secondary pb-32 flex items-center justify-center">
            <Container className="px-12">
                <Heading className="py-8" textAlign={"center"} title={t("submit_coin.title")} />
                <FormSubmitCoin />
            </Container>
        </section>
    );
}

export default SumbitCoin;
