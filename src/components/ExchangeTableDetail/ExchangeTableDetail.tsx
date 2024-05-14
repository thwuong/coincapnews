import { formatCurrency } from "@/app/utils/formatCurrency";
import UseResize from "@/hooks/UseResize";
import { Box, Skeleton, SkeletonCircle, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import {
    ColumnDef,
    SortingState,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
type ExchangeChart = {
    coin_id: string;
    converted_volume: any;
    target: string;
    bid_ask_spread_percentage: string;
    converted_last: any;
    base: string;
};
export type ExchangeTableDetailProps = {
    data: ExchangeChart[];
    isLoading: boolean;
    currentIndex?: number;
};
const columnHelper = createColumnHelper<ExchangeChart>();

const columns: ColumnDef<ExchangeChart, any>[] = [
    columnHelper.group({
        header: "#",
        columns: [
            columnHelper.accessor("base", {
                cell: (info) => info.getValue(),
            }),
        ],
    }),
    columnHelper.accessor("coin_id", {
        cell: (info) => info.getValue(),
        header: "Currency",
    }),
    columnHelper.accessor("target", {
        cell: (info) => info.getValue(),
        header: "Pair",
        meta: {
            center: true,
        },
    }),
    columnHelper.accessor("converted_last", {
        cell: (info) => info.getValue(),
        header: "Price",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("converted_volume", {
        cell: (info) => info.getValue(),
        header: "Volume (24H)",
        meta: {
            isNumeric: true,
        },
    }),
    columnHelper.accessor("bid_ask_spread_percentage", {
        cell: (info) => info.getValue(),
        header: "Volume (%)",
        meta: {
            isNumeric: true,
        },
    }),
];
function ExchangeTableDetail({ data, isLoading, currentIndex = 0 }: ExchangeTableDetailProps) {
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
                                        className="bg-secondary"
                                        position={index <= 1 && width <= 768 ? "sticky" : "unset"}
                                        zIndex={index <= 1 && width <= 768 ? 2 : 0}
                                        left={index === 1 ? 6 : 0}
                                        px={"8px"}
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                    >
                                        <Box
                                            display={"flex"}
                                            alignItems={"center"}
                                            justifyContent={(meta?.isNumeric || meta?.center) && "center"}
                                            flexDirection={"row"}
                                        >
                                            <p
                                                className={clsx(
                                                    "capitalize text-12 font-semibold text-typo-4 font-inter"
                                                )}
                                            >
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
                    {!isLoading
                        ? table.getRowModel().rows.map((row) => {
                              return (
                                  <Tr key={row.index}>
                                      <Td
                                          px={"8px"}
                                          position={width <= 768 ? "sticky" : undefined}
                                          left={0}
                                          className="bg-secondary text-[13px] font-medium"
                                      >
                                          {row.index + 1 + currentIndex}
                                      </Td>
                                      <Td
                                          px={"4px"}
                                          minW={"104px"}
                                          position={width <= 768 ? "sticky" : undefined}
                                          left={6}
                                          className="bg-secondary"
                                      >
                                          <p className="capitalize text-sm leading-4 font-semibold text-typo-4 ">
                                              {row.original.coin_id}
                                          </p>
                                      </Td>
                                      <Td px={"4px"}>
                                          <p className="uppercase text-center text-sm leading-4 font-semibold text-typo-4">
                                              {row.original.base}/{row.original.target}
                                          </p>
                                      </Td>
                                      <Td px={"4px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              {formatCurrency(row.original.converted_last["usd"])}
                                          </p>
                                      </Td>
                                      <Td px={"4px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              {formatCurrency(row.original.converted_volume["usd"])}
                                          </p>
                                      </Td>
                                      <Td px={"4px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              {Number(row.original.bid_ask_spread_percentage).toFixed(2)}%
                                          </p>
                                      </Td>
                                  </Tr>
                              );
                          })
                        : Array(8)
                              .fill(0)
                              .map((_, index) => {
                                  return (
                                      <Tr key={index}>
                                          <Td
                                              p={"4px"}
                                              minW={"104px"}
                                              position={width <= 768 ? "sticky" : undefined}
                                              left={0}
                                              bg={"#fff"}
                                          >
                                              <div className="flex items-center gap-4">
                                                  <SkeletonCircle size="5" />
                                                  <Skeleton height="10px" width={"50%"} />
                                              </div>
                                          </Td>
                                          <Td isNumeric={true} px={"4px"}>
                                              <Skeleton height="20px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"}>
                                              <Skeleton height="20px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"}>
                                              <Skeleton height="20px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"138px"}>
                                              <Skeleton height="20px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"118px"}>
                                              <Skeleton height="20px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"182px"}>
                                              <Skeleton height="20px" />
                                          </Td>
                                          <Td isNumeric={true} px={"4px"} minW={"180px"}>
                                              <Skeleton height="20px" />
                                          </Td>
                                      </Tr>
                                  );
                              })}
                </Tbody>
            </Table>
        </TableContainer>
    );
}

export default ExchangeTableDetail;
