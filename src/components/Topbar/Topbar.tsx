"use client";
import useFetchAPI from "@/api/baseAPI";
import { formatCurrencyHasUnit, formatQuoteCurrency } from "@/app/utils/formatCurrency";
import { currenciesData } from "@/fakedata/fakedata";
import { Button, useDisclosure } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import LanguageMenu from "../LanguageMenu/LanguageMenu";
import CurrencyModal from "../Modal/CurrencyModal";
import { useAppSelector } from "@/lib/hooks";
import { useTranslation } from "@/app/i18n/client";

type MarketData = {
    _source: {
        data: {
            active_cryptocurrencies: string;
            market_cap_change_percentage_24h_usd: number;
            total_market_cap: any;
            total_volume: any;
            market_cap_percentage: {
                btc: number;
                eth: number;
            };
        };
    };
};
type TopbarProps = {
    lang: string;
};
function Topbar({ lang }: TopbarProps) {
    const [currentCurrency, setCurrentCurrency] = useState(currenciesData[0]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, isLoading }: { data: MarketData[]; isLoading: boolean } = useFetchAPI(`/api/global?centralized=true`);
    const { currentLanguage } = useAppSelector((state) => state.langStore);
    const { t } = useTranslation(currentLanguage);
    return (
        <section className="w-full flex items-center justify-between text-12 min-h-[48px] max-lg:overflow-x-auto">
            {!isLoading ? (
                <div className="flex items-center gap-3 text-12 w-full animate-fade">
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-typo-1 whitespace-nowrap">{t(`topbar.cryptos`)}:</span>
                        <span className="text-primary-1 whitespace-nowrap">
                            {formatQuoteCurrency(Number(data[2]._source.data.active_cryptocurrencies))}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-typo-1 whitespace-nowrap">{t(`topbar.market`)}:</span>
                        <span className="text-primary-1 whitespace-nowrap">
                            {formatCurrencyHasUnit(Number(data[2]._source.data.total_market_cap["usd"]))}
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-typo-1 whitespace-nowrap">{t(`topbar.24h_vol`)}:</span>
                        <span className="text-primary-1 whitespace-nowrap">
                            {Number(data[2]._source.data.market_cap_change_percentage_24h_usd).toFixed(2)}%
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="font-medium text-typo-1 whitespace-nowrap">{t(`topbar.dominance`)}:</span>
                        <span className="text-primary-1 whitespace-nowrap">
                            BTC {data[2]._source.data.market_cap_percentage.btc.toFixed(2)}%
                        </span>
                        <span className="text-primary-1 whitespace-nowrap">
                            ETH {data[2]._source.data.market_cap_percentage.eth.toFixed(2)}%
                        </span>
                    </div>
                </div>
            ) : (
                <>Loading...</>
            )}

            <div className="flex items-center gap-2 max-lg:hidden">
                <LanguageMenu lang={lang} />
                <Button
                    onClick={() => onOpen()}
                    bg={"transparent"}
                    _hover={{
                        bg: "gray.100",
                    }}
                    borderRadius={6}
                    height={7}
                    alignItems={"center"}
                    rightIcon={<Image src={"/assets/icons/dropdown.svg"} alt="dropdown" width={12} height={12} />}
                >
                    <span className="text-12 font-semibold">{currentCurrency.code}</span>
                </Button>
            </div>
            <CurrencyModal isOpen={isOpen} onClose={onClose} />
        </section>
    );
}

export default Topbar;
