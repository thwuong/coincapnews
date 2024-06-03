"use client";

import useFetchAPI from "@/api/baseAPI";
import { setcurrentCurrency } from "@/lib/features/global/globalSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
    Button,
    Divider,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";
type CurrencyModalProps = {
    isOpen: boolean;
    onClose: () => void;
};
function CurrencyModal({ isOpen, onClose }: CurrencyModalProps) {
    const { currentLanguage, currentCurrency } = useAppSelector((state) => state.globalStore);
    const dispatch = useAppDispatch();
    const [keyword, setKeyword] = useState<string>("");
    const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };
    const selectCurrency = (currency: string) => {
        dispatch(setcurrentCurrency("usd"));
        onClose();
    };
    const { data } = useFetchAPI(`/api/exchange_rates`);
    const keysFiat = React.useMemo(() => {
        if (!data) return null;
        const objectToArray = Object.keys(data.rates).map((key) => [key, data.rates[key]]);
        const fiatList = objectToArray.filter((value) => value[1].type === "fiat");
        return fiatList.filter(
            (value) =>
                String(value[0]).includes(keyword.toLocaleLowerCase()) ||
                String(value[1]?.name.toLocaleLowerCase()).includes(keyword.toLocaleLowerCase())
        );
    }, [data, keyword]);
    const keysCrypto = React.useMemo(() => {
        if (!data) return null;
        const objectToArray = Object.keys(data.rates).map((key) => [key, data.rates[key]]);
        const cryptoList = objectToArray.filter((value) => value[1].type === "crypto");
        return cryptoList.filter(
            (value) =>
                String(value[0]).includes(keyword.toLocaleLowerCase()) ||
                String(value[1]?.name.toLocaleLowerCase()).includes(keyword.toLocaleLowerCase())
        );
    }, [data, keyword]);
    return (
        <Modal
            scrollBehavior={"inside"}
            size={"3xl"}
            blockScrollOnMount={false}
            isOpen={isOpen}
            onClose={onClose}
            isCentered
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Currencies</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Divider mb={4} />
                    <InputGroup my={3}>
                        <InputLeftElement pointerEvents="none" height={12}>
                            <Image src={"/assets/icons/search.svg"} alt="dropdown" width={20} height={20} />
                        </InputLeftElement>
                        {keyword && keyword.length > 0 && (
                            <InputRightElement height={12} className="cursor-pointer" onClick={() => setKeyword("")}>
                                <Image src={"/assets/icons/close.svg"} alt="dropdown" width={20} height={20} />
                            </InputRightElement>
                        )}
                        <Input
                            onChange={handlerSearch}
                            height={12}
                            value={keyword}
                            type="text"
                            placeholder="Search..."
                        />
                    </InputGroup>
                    <div className="grid items-start  grid-cols-2 overflow-y-auto max-h-[420px] scroll-hidden">
                        {/* Cryptocurrencies */}
                        <div className="grid grid-cols-2 col-span-1 gap-3">
                            <h5 className="col-span-2 px-3 text-typo-1 font-medium text-13 leading-[21px]">
                                Cryptocurrencies
                            </h5>
                            {keysCrypto &&
                                keysCrypto.map((item, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => {
                                            selectCurrency(item[0]);
                                        }}
                                        bg={"transparent"}
                                        _hover={{
                                            bg: "gray.100",
                                        }}
                                        borderRadius={6}
                                        alignItems={"center"}
                                        justifyContent={"start"}
                                        gap={0.5}
                                        py={2}
                                        pl={3}
                                        pr={2}
                                        height={"fit-content"}
                                    >
                                        <div className="flex flex-col w-[90%] items-start gap-0.5">
                                            <p className="text-typo-1 font-medium text-sm uppercase">{item[0]}</p>
                                            <p className="text-typo-1/60 text-[11px] capitalize truncate w-4/5 text-left">
                                                {item[1].name}
                                            </p>
                                        </div>
                                        {currentCurrency === item[0] && (
                                            <Image src={"/assets/icons/check.svg"} alt="check" width={16} height={16} />
                                        )}
                                    </Button>
                                ))}
                            {keysCrypto?.length === 0 && <p className="text-typo-1 text-12 px-3">Items not found</p>}
                        </div>
                        {/* Fiat Currencies */}
                        <div className="grid grid-cols-2 col-span-1 gap-3">
                            <h5 className="col-span-2 px-3 text-typo-1 font-medium text-13 leading-[21px]">
                                Fiat Currencies
                            </h5>
                            {keysFiat &&
                                keysFiat.map((item, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => {
                                            selectCurrency(item[0]);
                                        }}
                                        bg={"transparent"}
                                        _hover={{
                                            bg: "gray.100",
                                        }}
                                        borderRadius={6}
                                        alignItems={"center"}
                                        justifyContent={"start"}
                                        gap={0.5}
                                        py={2}
                                        pl={3}
                                        pr={2}
                                        height={"fit-content"}
                                    >
                                        <div className="flex flex-col w-[90%] items-start gap-0.5">
                                            <p className="text-typo-1 font-medium text-sm uppercase">{item[0]}</p>
                                            <p className="text-typo-1/60 text-[11px] capitalize truncate w-4/5 text-left">
                                                {item[1].name}
                                            </p>
                                        </div>
                                        {currentCurrency === item[0] && (
                                            <Image src={"/assets/icons/check.svg"} alt="check" width={16} height={16} />
                                        )}
                                    </Button>
                                ))}
                            {keysFiat?.length === 0 && <p className="text-typo-1 text-12 px-3">Items not found</p>}
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

export default CurrencyModal;
