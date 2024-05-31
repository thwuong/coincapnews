"use client";
import useFetchAPI from "@/api/baseAPI";
import { formatCurrency } from "@/app/utils/formatCurrency";
import debounce from "@/hooks/UseDebounce";
import { useAppSelector } from "@/lib/hooks";
import { Box, NumberInput, NumberInputField, Select } from "@chakra-ui/react";
import React, { useState } from "react";
import { SpinnerLoading } from "../Loading";
type ConvertType = {
    name: string;
    unit: string;
    value: number;
    type: string;
};
function ConvertAmount() {
    const currentLanguage = useAppSelector((state) => state.globalStore.currentLanguage);
    const { data, isLoading } = useFetchAPI(`/api/exchange_rates`);
    const [from, setFrom] = useState<string>("btc");
    const [to, setTo] = useState<string>("usd");
    const [amount, setAmount] = useState<number | undefined>();
    const keysFiat = React.useMemo(() => {
        if (!data) return null;
        const objectToArray = Object.keys(data.rates).map((key) => [key, data.rates[key]]);

        return objectToArray.filter((value) => value[1].type === "fiat");
    }, [data]);
    const keysCrypto = React.useMemo(() => {
        if (!data) return null;
        const objectToArray = Object.keys(data.rates).map((key) => [key, data.rates[key]]);

        return objectToArray.filter((value) => value[1].type === "crypto");
    }, [data]);

    const result = React.useMemo(() => {
        if (!amount || !data.rates) return;

        return (Number(data.rates[to].value) * amount) / Number(data.rates[from].value);
    }, [amount, from, to]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(e.target.value));
    };

    if (isLoading) return <SpinnerLoading />;
    return (
        <div className="rounded-lg shadow-xl bg-white">
            <Box className="py-5 px-4 flex items-center justify-between gap-4">
                <Select
                    className="font-semibold text-sm text-black uppercase"
                    border={"none"}
                    value={from}
                    w={"fit-content"}
                    onChange={(e) => setFrom(e.target.value)}
                >
                    {keysCrypto &&
                        keysCrypto.map((item: any[]) => {
                            return (
                                <option key={item[0]} value={item[0]}>
                                    {item[0]}
                                </option>
                            );
                        })}
                </Select>
                <NumberInput className="w-4/5">
                    <NumberInputField
                        px={"0px"}
                        _focusVisible={{
                            boxShadow: "none",
                        }}
                        border={"none"}
                        outline={"none"}
                        textAlign={"right"}
                        className="font-bold text-[#222531]"
                        fontSize={"14px"}
                        placeholder="Enter Amount to Convert"
                        onChange={debounce(handleChange, 500)}
                    />
                </NumberInput>
            </Box>
            <Box className="py-5 px-4 flex items-center justify-between gap-4 bg-[#f8fafd]">
                <Select
                    className="font-semibold text-sm text-black uppercase"
                    border={"none"}
                    w={"fit-content"}
                    value={to}
                    onChange={(e) => {
                        setTo(e.target.value);
                    }}
                >
                    {keysFiat &&
                        keysFiat.map((item: any[]) => {
                            return (
                                <option key={item[0]} value={item[0]}>
                                    {item[0]}
                                </option>
                            );
                        })}
                </Select>
                <p className="font-bold text-sm">
                    {result
                        ? formatCurrency(result, "USD", currentLanguage, {
                            maximumFractionDigits: 2,
                            minimumIntegerDigits: 4,
                        })
                        : ""}
                </p>
            </Box>
        </div>
    );
}

export default ConvertAmount;
