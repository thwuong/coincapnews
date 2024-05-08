"use client";
import React, { useState } from "react";
import Container from "../Container/Container";
import { Button, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import Image from "next/image";

import { createColumnHelper } from "@tanstack/react-table";
import dynamic from "next/dynamic";
const TablePagination = dynamic(() => import("../TablePagination/TablePagination"), { ssr: false });
const CoinTable = dynamic(() => import("../CoinTable/CoinTable"), { ssr: false });
export type UnitConversion = {
    name: string;
    icon: string;
    rank: string;
    code: string;
    price: number;
    dayRatio: string;
    weekRatio: string;
    totalSupply: number;
    volume: number;
    circulatingSupply: number;
    weekStatistic: number[];
};

const data: UnitConversion[] = [
    {
        name: "BNB",
        icon: "/assets/images/bnb.webp",
        rank: "4",
        code: "BNB",
        price: 3000000,
        dayRatio: "-1.5%",
        weekRatio: "20%",
        totalSupply: 3000000,
        circulatingSupply: 3000000,
        volume: 3000000,
        weekStatistic: [1, 2, 4, 123, 12, 3123, 1, 23, 1, 23, 1, 23],
    },
];

const columnHelper = createColumnHelper<UnitConversion>();

const columns = [
    columnHelper.accessor("code", {
        cell: (info) => info.getValue(),
        header: "#",
    }),
    columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: "Name",
    }),
    columnHelper.accessor("price", {
        cell: (info) => info.getValue(),
        header: "Price",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("dayRatio", {
        cell: (info) => info.getValue(),
        header: "24H %",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("weekRatio", {
        cell: (info) => info.getValue(),
        header: "7D %",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("totalSupply", {
        cell: (info) => info.getValue(),
        header: "Market Cap",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("volume", {
        cell: (info) => info.getValue(),
        header: "Volume (24H)",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("circulatingSupply", {
        cell: (info) => info.getValue(),
        header: "Circulating Supply",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("weekStatistic", {
        cell: (info) => info.getValue(),
        header: "Last 7 Days",
        meta: {
            isNumeric: true,
        },
    }),
];
function TableSection() {
    const [keyword, setKeyword] = useState<string>();
    const itemsPerPage = 1;
    const [pageCount, setPageCount] = useState<number>(Math.ceil(data.length / itemsPerPage));

    const handlerSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(e.target.value);
    };
    const handlePageClick = (selectedItem: any) => {
        console.log(selectedItem);

        const newPageCount = data.length / (selectedItem.selected * itemsPerPage);
        setPageCount(newPageCount);
    };

    return (
        <Container className="px-12 flex-col gap-8 py-6">
            <div className="flex items-center justify-between w-full">
                <Button
                    _hover={{
                        bg: "transparent",
                    }}
                    p={"8px"}
                    minW={"fit-content"}
                    alignItems={"center"}
                    leftIcon={<Image src={"/assets/icons/start.svg"} alt="start" width={16} height={16} />}
                >
                    <span className="text-12 font-bold">Watchlist</span>
                </Button>
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
                        placeholder="Search coin"
                    />
                </InputGroup>
            </div>
            <CoinTable columns={columns} data={data} />
            <TablePagination pageCount={pageCount} handlePageClick={handlePageClick} />
        </Container>
    );
}

export default TableSection;
