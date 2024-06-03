"use client";
import useFetchAPI from "@/api/baseAPI";
import { COIN_PER_PAGE } from "@/app/contants";
import { useTranslation } from "@/app/i18n/client";
import { checkFormatImage } from "@/app/utils/checkFormatImage";
import { formatCurrency } from "@/app/utils/formatCurrency";
import UseResize from "@/hooks/UseResize";
import { useAppSelector } from "@/lib/hooks";
import {
    Box,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import {
    ColumnDef,
    SortingState,
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TablePagination } from "../TablePagination";
type NewCryptoType = {
    id: string;
    image: string;
    name: string;
    current_price: number;
    price_change_percentage_1h_in_currency: number;
    price_change_percentage_24h_in_currency: number;
    market_cap: number;
    volume_24h: number;
    blockchain: string;
    added: string;
    atl_date: string;
};
export type ExchangeTableProps = {
    data: NewCryptoType[];
    isLoading: boolean;
};
const columnHelper = createColumnHelper<NewCryptoType>();

const columns: ColumnDef<NewCryptoType, any>[] = [
    columnHelper.group({
        header: "#",
        columns: [
            columnHelper.accessor("image", {
                cell: (info) => info.getValue(),
            }),
        ],
        meta: {
            position: "center",
        },
    }),
    columnHelper.accessor("name", {
        cell: (info) => info.getValue(),
        header: "Name",
    }),
    columnHelper.accessor("current_price", {
        cell: (info) => info.getValue(),
        header: "Price",
        meta: {
            position: "center",
        },
    }),
    columnHelper.accessor("price_change_percentage_1h_in_currency", {
        cell: (info) => info.getValue(),
        header: "1H",
        meta: {
            position: "center",
        },
    }),
    columnHelper.accessor("price_change_percentage_24h_in_currency", {
        cell: (info) => info.getValue(),
        header: "24H",
        meta: {
            position: "center",
        },
    }),
    columnHelper.accessor("market_cap", {
        cell: (info) => info.getValue(),
        header: "Market Cap",
        meta: {
            position: "center",
        },
    }),
    columnHelper.accessor("volume_24h", {
        cell: (info) => info.getValue(),
        header: "Volume 24H",
        meta: {
            position: "center",
        },
    }),
    columnHelper.accessor("blockchain", {
        cell: (info) => info.getValue(),
        header: "Blockchain",
        meta: {
            position: "center",
        },
    }),
    columnHelper.accessor("added", {
        cell: (info) => info.getValue(),
        header: "Added",
        meta: {
            position: "center",
        },
    }),
];

function NewCryptoTable({
    data,
    isLoading,
    currentIndex = 0,
}: {
    data: NewCryptoType[];
    isLoading: boolean;
    currentIndex?: number;
}) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });
    const [width] = UseResize();
    const currentLanguage = useAppSelector((store) => store.globalStore.currentLanguage);
    const { t } = useTranslation(currentLanguage);
    return (
        <TableContainer w={"100%"}>
            <Table>
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header, index) => {
                                if (header.depth === 2) {
                                    return;
                                }

                                const meta: any = header.column.columnDef.meta;
                                return (
                                    <Th
                                        className="bg-secondary cursor-pointer"
                                        position={index <= 1 && width <= 768 ? "sticky" : "unset"}
                                        zIndex={index <= 1 && width <= 768 ? 2 : 0}
                                        left={index === 1 ? 8 : 0}
                                        px={"8px"}
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                    >
                                        <Box
                                            display={"flex"}
                                            alignItems={"center"}
                                            justifyContent={meta?.position || "start"}
                                            flexDirection={"row"}
                                        >
                                            <p
                                                className={clsx(
                                                    "capitalize text-12 font-semibold font-inter text-typo-4"
                                                )}
                                            >
                                                {t(`table.${header.column.columnDef.header}`)}
                                            </p>

                                            {header.column.getIsSorted() ? (
                                                header.column.getIsSorted() === "desc" ? (
                                                    <Image
                                                        src={"/assets/icons/sort-down.svg"}
                                                        alt="sort-down"
                                                        width={14}
                                                        height={14}
                                                    />
                                                ) : (
                                                    <Image
                                                        src={"/assets/icons/sort-up.svg"}
                                                        alt="sort-up"
                                                        width={14}
                                                        height={14}
                                                    />
                                                )
                                            ) : null}
                                        </Box>
                                    </Th>
                                );
                            })}
                        </Tr>
                    ))}
                </Thead>
                {/* replace data */}
                <Tbody>
                    {!isLoading
                        ? table.getRowModel().rows.map((row) => {
                            return (
                                <Tr key={row.index}>
                                    <Td
                                        px={"8px"}
                                        position={width <= 768 ? "sticky" : undefined}
                                        left={0}
                                        className="bg-secondary text-sm"
                                        textAlign={"center"}
                                        fontWeight={"500"}
                                    >
                                        {row.index + 1 + currentIndex}
                                    </Td>
                                    <Td
                                        px={"4px"}
                                        minW={"104px"}
                                        position={width <= 768 ? "sticky" : undefined}
                                        left={8}
                                        className="bg-secondary"
                                    >
                                        <Link
                                            href={`/currency/${row.original.id}`}
                                            className="flex items-center gap-3"
                                        >
                                            {checkFormatImage(row.original.image) && (
                                                <Image
                                                    src={row.original.image}
                                                    alt={row.original.name}
                                                    width={24}
                                                    height={24}
                                                />
                                            )}

                                            <p className="capitalize text-sm leading-4 font-semibold text-typo-4 ">
                                                {row.original.name}
                                            </p>
                                        </Link>
                                    </Td>
                                    <Td px={"4px"}>
                                        <p className="text-center text-sm leading-4 font-medium text-typo-4 ">
                                            {formatCurrency(row.original.current_price, "USD", currentLanguage, {
                                                maximumFractionDigits: 9,
                                            })}
                                        </p>
                                    </Td>
                                    <Td px={"4px"}>
                                        <p
                                            className={clsx(
                                                "capitalize text-sm text-center leading-4 change24 font-medium ",
                                                row.original.price_change_percentage_1h_in_currency > 0
                                                    ? "text-up"
                                                    : "text-down"
                                            )}
                                        >
                                            {row.original.price_change_percentage_1h_in_currency?.toFixed(2) || 0}%
                                        </p>
                                    </Td>
                                    <Td px={"4px"}>
                                        <p
                                            className={clsx(
                                                "capitalize text-sm text-center leading-4 change24 font-medium ",
                                                row.original.price_change_percentage_24h_in_currency > 0
                                                    ? "text-up"
                                                    : "text-down"
                                            )}
                                        >
                                            {row.original.price_change_percentage_24h_in_currency?.toFixed(2) || 0}%
                                        </p>
                                    </Td>
                                    <Td px={"4px"}>
                                        <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                            {formatCurrency(row.original.market_cap)}
                                        </p>
                                    </Td>
                                    <Td px={"4px"}>
                                        <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                            {formatCurrency(row.original.volume_24h || 0)}
                                        </p>
                                    </Td>
                                    <Td px={"4px"}>
                                        <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                            {/* {row.original.blockchain} */}
                                            Blockchanin
                                        </p>
                                    </Td>
                                    <Td px={"4px"}>
                                        <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                            {moment(row.original.atl_date).fromNow()}
                                        </p>
                                    </Td>
                                </Tr>
                            );
                        })
                        : Array(10)
                            .fill(0)
                            .map((_, index) => {
                                return (
                                    <Tr key={index}>
                                        <Td isNumeric={true} px={"8px"} py={"16px"} minW={"48px"}>
                                            <SkeletonText noOfLines={1} spacing="4" skeletonHeight="2" />
                                        </Td>
                                        <Td
                                            p={"4px"}
                                            height={"57px"}
                                            minW={"350px"}
                                            position={width <= 768 ? "sticky" : undefined}
                                            className="bg-secondary"
                                        >
                                            <div className="flex items-center gap-4">
                                                <SkeletonCircle size="5" />
                                                <Skeleton
                                                    height={"8px"}
                                                    width={`${Math.floor(Math.random() * 31) + 50}%`}
                                                />
                                            </div>
                                        </Td>
                                        <Td isNumeric={true} px={"4px"} minW={"166px"}>
                                            <SkeletonText noOfLines={1} spacing="2" skeletonHeight="2" />
                                        </Td>
                                        <Td isNumeric={true} px={"4px"} minW={"75px"}>
                                            <SkeletonText noOfLines={1} spacing="2" skeletonHeight="2" />
                                        </Td>
                                        <Td isNumeric={true} px={"4px"} minW={"88px"}>
                                            <SkeletonText noOfLines={1} spacing="2" skeletonHeight="2" />
                                        </Td>
                                        <Td isNumeric={true} px={"4px"} minW={"180px"}>
                                            <SkeletonText noOfLines={1} spacing="2" skeletonHeight="2" />
                                        </Td>
                                        <Td isNumeric={true} px={"4px"} minW={"180px"}>
                                            <SkeletonText noOfLines={1} spacing="2" skeletonHeight="2" />
                                        </Td>
                                        <Td isNumeric={true} px={"4px"} minW={"117px"}>
                                            <SkeletonText noOfLines={1} spacing="2" skeletonHeight="2" />
                                        </Td>
                                        <Td isNumeric={true} px={"4px"} minW={"133px"}>
                                            <SkeletonText noOfLines={1} spacing="2" skeletonHeight="2" />
                                        </Td>
                                    </Tr>
                                );
                            })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

function NewCrypto() {
    const [page, setPage] = useState(1);

    const { data, isLoading } = useFetchAPI(
        `/api/coins/list/new?page=${page}&per_page=${COIN_PER_PAGE}&centralized=true`
    );
    const handlePageClick = ({ selected }: { selected: number }) => {
        setPage(selected + 1);
    };
    return (
        <section className="flex flex-col items-center justify-center gap-6 w-full">
            {/* Table */}
            <NewCryptoTable data={data} isLoading={isLoading} currentIndex={(page - 1) * Number(COIN_PER_PAGE)} />
            <div className="w-full py-4 flex justify-center">
                <TablePagination disbledPre disbledNext pageCount={100} handlePageClick={handlePageClick} />
            </div>
        </section>
    );
}

export default NewCrypto;
