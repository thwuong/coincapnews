import { Table, Thead, Tbody, Tr, Th, Td, Box, Icon, Badge } from "@chakra-ui/react";
import React from "react";
import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    ColumnDef,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";
import Image from "next/image";
import clsx from "clsx";
import { formatCurrency, formatQuoteCurrency } from "@/app/utils/formatCurrency";
import LineChartLastDays from "../Charts/LineChartLastDays";
import { UnitConversion } from "../TableSection/TableSection";

export type DataTableProps = {
    data: UnitConversion[];
    columns: ColumnDef<UnitConversion, any>[];
};
function CoinTable({ data, columns }: DataTableProps) {
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
    return (
        <Table>
            <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                        {headerGroup.headers.map((header, index) => {
                            const meta: any = header.column.columnDef.meta;
                            return (
                                <Th
                                    key={header.id}
                                    onClick={header.column.getToggleSortingHandler()}
                                    isNumeric={meta?.isNumeric}
                                    px={index === 0 ? "8px" : "0"}
                                    w={index === 0 ? "16px" : "fit-content"}
                                >
                                    <Box
                                        display={"flex"}
                                        alignItems={"center"}
                                        justifyContent={meta?.isNumeric && "end"}
                                        flexDirection={"row"}
                                    >
                                        <p className={clsx("capitalize text-12 font-semibold text-typo-4 font-inter")}>
                                            {flexRender(header.column.columnDef.header, header.getContext())}
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
                {table.getRowModel().rows.map((row) => (
                    <Tr key={row.id}>
                        <Td p={"4px"} w="fit-content">
                            <Image
                                className="cursor-pointer"
                                src={"/assets/icons/start.svg"}
                                alt="sort-down"
                                width={14}
                                height={14}
                            />
                        </Td>
                        <Td p={"4px"}>
                            <Box display={"flex"} alignItems={"center"} gap={"8px"}>
                                <Image
                                    className="cursor-pointer"
                                    src={"/assets/images/bnb.webp"}
                                    alt="bnb"
                                    width={24}
                                    height={24}
                                />
                                <Box flexDirection={"column"}>
                                    <p className="capitalize text-sm leading-4 font-semibold text-typo-4 font-inter">
                                        BNB
                                    </p>
                                    <Box display={"flex"} alignItems={"center"} gap={"4px"}>
                                        <Badge className="uppercase leading-[14px] text-12 text-typo-1 font-inter">
                                            4
                                        </Badge>
                                        <span className="uppercase leading-[18px] text-12 text-typo-1 font-inter">
                                            BNB
                                        </span>
                                    </Box>
                                </Box>
                            </Box>
                        </Td>
                        <Td isNumeric={true} px={"4px"}>
                            <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                                {formatCurrency(300000)}
                            </p>
                        </Td>
                        <Td isNumeric={true} px={"4px"}>
                            <p
                                className={clsx(
                                    "capitalize text-sm leading-4 font-semibold font-inter",
                                    false ? "text-up" : "text-down"
                                )}
                            >
                                {-1.57}%
                            </p>
                        </Td>
                        <Td isNumeric={true} px={"4px"}>
                            <p
                                className={clsx(
                                    "capitalize text-sm leading-4 font-semibold font-inter",
                                    true ? "text-up" : "text-down"
                                )}
                            >
                                {20.17}%
                            </p>
                        </Td>
                        <Td isNumeric={true} px={"4px"}>
                            <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                                {formatQuoteCurrency(33253137953)}
                            </p>
                        </Td>
                        <Td isNumeric={true} px={"4px"}>
                            <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                                {formatQuoteCurrency(300000)}
                            </p>
                        </Td>
                        <Td isNumeric={true} px={"4px"}>
                            <div className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter flex gap-1 justify-end">
                                <p>{formatQuoteCurrency(300000)}</p>
                                <p>BNB</p>
                            </div>
                        </Td>
                        <Td isNumeric={true} px={"4px"} maxWidth={"min-content"}>
                            <Box display={"flex"} justifyContent={"end"}>
                                <LineChartLastDays />
                            </Box>
                        </Td>
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
}

export default CoinTable;
