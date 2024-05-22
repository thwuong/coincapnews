"use client";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";

import useFetchAPI from "@/api/baseAPI";
import { CoinType } from "@/app/types";
import { createColumnHelper } from "@tanstack/react-table";
import dynamic from "next/dynamic";
import { TablePagination } from "../TablePagination";
import { useAppSelector } from "@/lib/hooks";
import { useTranslation } from "@/app/i18n/client";
const CoinTable = dynamic(() => import("../CoinTable").then((mod) => mod.CoinTable));

const columnHelper = createColumnHelper<CoinType>();

const columns = [
    columnHelper.group({
        header: "# Name",
        columns: [
            columnHelper.accessor("_source.name", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("_source.id", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("_source.image", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("_source.market_cap_rank", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("_source.id", {
                cell: (info) => info.getValue(),
            }),
        ],
    }),
    columnHelper.accessor("_source.current_price", {
        cell: (info) => info.getValue(),
        header: "Price",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("_source.price_change_percentage_24h", {
        cell: (info) => info.getValue(),
        header: "24H %",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("_source.price_change_percentage_7d_in_currency", {
        cell: (info) => info.getValue(),
        header: "7D %",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("_source.market_cap", {
        cell: (info) => info.getValue(),
        header: "Market Cap",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("_source.total_volume", {
        cell: (info) => info.getValue(),
        header: "Volume (24H)",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("_source.total_supply", {
        cell: (info) => info.getValue(),
        header: "Circulating Supply",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("_source.sparkline_in_7d.price", {
        cell: (info) => info.getValue(),
        header: "Last 7 Days",
        meta: {
            isNumeric: true,
        },
    }),
];
function TableSection() {
    const [keyword, setKeyword] = useState<string>();
    const [searchList, setSearchList] = useState<CoinType[]>();
    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(() =>
        Math.ceil(Number(process.env.NEXT_PUBLIC_TOTAL) / Number(process.env.NEXT_PUBLIC_PER_PAGE))
    );

    const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };
    const handlePageClick = (selectedItem: any) => {
        setPage(selectedItem.selected + 1);
    };
    const { data: dataAPI, isLoading } = useFetchAPI(
        `/api/coins/markets?page=${page}&per_page=${process.env.NEXT_PUBLIC_PER_PAGE}`
    );
    const { currentLanguage } = useAppSelector((state) => state.langStore);
    const { t } = useTranslation(currentLanguage, "home");
    return (
        <section className="flex flex-col items-center gap-8 py-6 pb-32 w-full">
            <section className="flex items-center justify-between w-full">
                <Box
                    _hover={{
                        bg: "transparent",
                    }}
                    cursor={"pointer"}
                    bg={"gray.100"}
                    borderRadius={"6px"}
                    gap={"4px"}
                    p={"8px"}
                    display={"flex"}
                    minW={"fit-content"}
                    alignItems={"center"}
                    justifyContent={"center"}
                >
                    <Image src={"/assets/icons/start.svg"} alt="start" width={14} height={14} />
                    <span className="text-12 font-bold max-lg:hidden">{t("watchlist")}</span>
                </Box>
                <InputGroup position={"relative"} w={"min-content"}>
                    <InputLeftElement pointerEvents="none">
                        <Image src={"/assets/icons/search.svg"} alt="dropdown" width={20} height={20} />
                    </InputLeftElement>

                    <Input
                        onChange={handlerSearch}
                        borderRadius={"99px"}
                        height={"min-content"}
                        py={"6px"}
                        w={200}
                        type="text"
                        bg={"gray.50"}
                        border={"none"}
                        placeholder={t("search coin")}
                        className="placeholder:text-13"
                    />
                </InputGroup>
            </section>
            <CoinTable columns={columns} data={dataAPI} isLoading={isLoading} />
            <TablePagination
                className={isLoading ? "hidden" : "flex"}
                pageCount={pageCount}
                handlePageClick={handlePageClick}
            />
        </section>
    );
}

export default TableSection;
