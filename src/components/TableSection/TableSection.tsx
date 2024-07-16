"use client";
import { Box, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Image from "next/image";
import React, { useState } from "react";

import useFetchAPI from "@/api/baseAPI";
import { COIN_PER_PAGE, IDS_FEATURE } from "@/app/contants";
import { useTranslation } from "@/app/i18n/client";
import { CoinType } from "@/app/types";
import { useAppSelector } from "@/lib/hooks";
import { SortingFn, createColumnHelper } from "@tanstack/react-table";
import dynamic from "next/dynamic";
import { TablePagination } from "../TablePagination";
const CoinTable = dynamic(() => import("../CoinTable").then((mod) => mod.CoinTable));

const columnHelper = createColumnHelper<CoinType>();
const skipFirstRowSortingFn: SortingFn<CoinType> = (rowA: any, rowB: any, columnId: string) => {
  // Skip sorting for the first row
  if (rowA.index <= 1 || rowB.index <= 1) {
    return 0;
  }
  // Your custom sorting logic here
  return rowA.original[columnId] > rowB.original[columnId] ? 1 : rowA.original[columnId] < rowB.original[columnId] ? -1 : 0;
};
const columns = [
    columnHelper.group({
        header: "# Name",
        columns: [
            columnHelper.accessor("name", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("id", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("image", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("market_cap_rank", {
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor("id", {
                cell: (info) => info.getValue(),
            }),
        ],
    }),
    columnHelper.accessor("current_price", {
        cell: (info) => info.getValue(),
        header: "Price",
        meta: {
            isNumeric: true,
        },
        sortingFn : skipFirstRowSortingFn
    }),
    columnHelper.accessor("price_change_percentage_24h", {
        cell: (info) => info.getValue(),
        header: "24H %",
        meta: {
            isNumeric: true,
        },
        sortingFn : skipFirstRowSortingFn

    }),
    columnHelper.accessor("price_change_percentage_7d_in_currency", {
        cell: (info) => info.getValue(),
        header: "7D %",
        meta: {
            isNumeric: true,
        },
        sortingFn : skipFirstRowSortingFn

    }),
    columnHelper.accessor("market_cap", {
        cell: (info) => info.getValue(),
        header: "Market Cap",
        meta: {
            isNumeric: true,
        },
        sortingFn : skipFirstRowSortingFn

    }),
    columnHelper.accessor("total_volume", {
        cell: (info) => info.getValue(),
        header: "Volume (24H)",
        meta: {
            isNumeric: true,
        },
        sortingFn : skipFirstRowSortingFn

    }),
    columnHelper.accessor("total_supply", {
        cell: (info) => info.getValue(),
        header: "Circulating Supply",
        meta: {
            isNumeric: true,
        },
        sortingFn : skipFirstRowSortingFn

    }),
    columnHelper.accessor("sparkline_in_7d.price", {
        cell: (info) => info.getValue(),
        header: "Last 7 Days",
        meta: {
            isNumeric: true,
        },
        sortingFn : skipFirstRowSortingFn

    }),
];
function TableSection() {
    const [keyword, setKeyword] = useState<string>("");
    const [searchTerms, setSearchTerms] = useState<string>("");
    const timer = React.useRef<any>(null);

    const [page, setPage] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(() =>
        Math.ceil(Number(process.env.NEXT_PUBLIC_TOTAL) / Number(process.env.NEXT_PUBLIC_PER_PAGE))
    );

    const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };
    const handlePageClick = (selectedItem: any) => {
        // setPage(selectedItem.selected + 1);
        setPage(page + 1);
    };
    const handlePrePage = (selectedItem: any) => {
        // setPage(selectedItem.selected + 1);
        setPage(page - 1);
    };
    const { data: dataAPI, isLoading } = useFetchAPI(
        `/api/coins/markets?page=${page}&per_page=${COIN_PER_PAGE}&search=${searchTerms}`
    );
    const { data: features, isLoading: isLoadingFeature } = useFetchAPI(`/api/coins/markets/?ids=${IDS_FEATURE}`);

    const currentLanguage = useAppSelector((state) => state.globalStore.currentLanguage);
    const { t } = useTranslation(currentLanguage, "home");
    React.useEffect(() => {
        // if (!keyword) return;
        if (timer.current) clearTimeout(timer.current);

        timer.current = setTimeout(() => {
            setSearchTerms(keyword);
        }, 600);
    }, [keyword]);

    return (
        <section className="flex flex-col items-center gap-8 w-full">
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
                    <InputLeftElement pointerEvents="none" height={"36px"}>
                        <Image src={"/assets/icons/search.svg"} alt="dropdown" width={20} height={20} />
                    </InputLeftElement>

                    <Input
                        onChange={handlerSearch}
                        borderRadius={"99px"}
                        height={"min-content"}
                        py={"6px"}
                        w={200}
                        value={keyword}
                        type="text"
                        bg={"gray.100"}
                        border={"none"}
                        placeholder={t("search coin")}
                        className="placeholder:text-13"
                    />
                </InputGroup>
            </section>
            <CoinTable columns={columns} data={dataAPI} features={features} isLoading={isLoading} currentPage={page} skipFirstRowSortingFn={skipFirstRowSortingFn}/>
            <section className="w-full py-4 flex justify-center">
                <TablePagination
                    handlePrePage={handlePrePage}
                    currentPage={page}
                    className={isLoading && isLoadingFeature ? "hidden" : "flex"}
                    pageCount={pageCount}
                    handlePageClick={handlePageClick}
                />
            </section>
        </section>
    );
}

export default TableSection;
