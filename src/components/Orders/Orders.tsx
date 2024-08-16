"use client";
import React from "react";
import { Container } from "../Container";
import { Heading } from "../Heading";
import { useAppSelector } from "@/lib/hooks";
import { useTranslation } from "@/app/i18n/client";

function Orders() {
  const currentLanguage = useAppSelector(
    (state) => state.globalStore.currentLanguage
  );
  const { t } = useTranslation(currentLanguage);
  return (
    <section className="w-full bg-secondary pb-32 flex items-center justify-center">
      <Container className="px-12">
        <Heading
          className="py-8"
          textAlign={"center"}
          title={t("account.my_account")}
        />
        <div></div>
      </Container>
    </section>
  );
}

export default Orders;
