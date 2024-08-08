import { useTranslation } from "@/app/i18n/client";
import { formatCurrency } from "@/app/utils/formatCurrency";
import UseResize from "@/hooks/UseResize";
import { useAppSelector } from "@/lib/hooks";
import {
    Box,
    Skeleton,
    SkeletonCircle,
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
import Image from "next/image";
import React from "react";
type DerivativeChart = {
    coin_id: string;
    converted_volume: any;
    target: string;
    bid_ask_spread: number;
    converted_last: any;
    base: string;
    symbol: string;
};
export type DerivativeTableDetailProps = {
    data: DerivativeChart[];
    isLoading: boolean;
    currentIndex?: number;
};
const columnHelper = createColumnHelper<DerivativeChart>();

const columns: ColumnDef<DerivativeChart, any>[] = [
    columnHelper.group({
        header: "#",
        columns: [
            columnHelper.accessor("base", {
                cell: (info) => info.getValue(),
            }),
        ],
    }),
    columnHelper.accessor("symbol", {
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
    columnHelper.accessor("bid_ask_spread", {
        cell: (info) => info.getValue(),
        header: "Spread",
        meta: {
            isNumeric: true,
        },
    }),
];
function DerivativeTableDetail({ data, isLoading, currentIndex = 0 }: DerivativeTableDetailProps) {
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
    const { currentLanguage, currentCurrency } = useAppSelector((state) => state.globalStore);
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
                                        left={index === 1 ? 6 : 0}
                                        px={"8px"}
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                    >
                                        <Box
                                            display={"flex"}
                                            alignItems={"center"}
                                            justifyContent={
                                                (meta?.isNumeric || meta?.center) && "center"
                                            }
                                            flexDirection={"row"}
                                        >
                                            <p
                                                className={clsx(
                                                    "capitalize text-12 font-semibold text-typo-4 font-inter"
                                                )}
                                            >
                                                {t(`table.${header.column.columnDef.header}`)}
                                            </p>

                                            {header.column.getIsSorted() ? (
                                                header.column.getIsSorted() === "desc" ? (
                                                    <Image
                                                        src={"/assets/icons/sort-down.svg"}
                                                        alt="sort-down"
                                                        width={12}
                                                        height={12}
                                                    />
                                                ) : (
                                                    <Image
                                                        src={"/assets/icons/sort-up.svg"}
                                                        alt="sort-up"
                                                        width={12}
                                                        height={12}
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
                                  <Tr
                                      key={row.index}
                                      className="bg-secondary duration-300"
                                      _hover={{
                                          bg: "gray.100",
                                      }}
                                  >
                                      <Td
                                          px={"8px"}
                                          position={width <= 768 ? "sticky" : undefined}
                                          left={0}
                                          className="bg-inherit text-[13px] font-medium"
                                      >
                                          {row.index + 1 + currentIndex}
                                      </Td>
                                      <Td
                                          px={"4px"}
                                          minW={"160px"}
                                          maxW={"180px"}
                                          position={width <= 768 ? "sticky" : undefined}
                                          left={6}
                                          className="bg-inherit"
                                      >
                                          <p className="capitalize text-sm leading-4 font-semibold text-typo-4 ">
                                              {row.original.symbol}
                                          </p>
                                      </Td>
                                      <Td px={"4px"}>
                                          <p className="uppercase max-w-[600px] whitespace-normal text-center text-sm leading-4 font-semibold text-typo-4">
                                              {row.original.base} / {row.original.target}
                                          </p>
                                      </Td>
                                      <Td px={"4px"} minW={"89px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              {formatCurrency(
                                                  row.original.converted_last["usd"],
                                                  currentCurrency,
                                                  currentLanguage,
                                                  {
                                                      maximumFractionDigits: 6,
                                                      minimumFractionDigits: 0,
                                                  }
                                              )}
                                          </p>
                                      </Td>
                                      <Td px={"4px"} minW={"145px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              {formatCurrency(row.original.converted_volume["usd"])}
                                          </p>
                                      </Td>
                                      <Td px={"4px"} minW={"115px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              {Number(row.original.bid_ask_spread).toFixed(3)}%
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

export default DerivativeTableDetail;
