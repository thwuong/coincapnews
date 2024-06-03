import { useTranslation } from "@/app/i18n/client";
import { formatCurrency } from "@/app/utils/formatCurrency";
import UseResize from "@/hooks/UseResize";
import { useAppSelector } from "@/lib/hooks";
import { Box, Skeleton, SkeletonCircle, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
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
type Exchange = {
    coin_id: string;
    market: {
        name: string;
    };
    converted_volume: any;
    converted_last: any;
    base: string;
    target: string;
};
export type ExchangeTableProps = {
    data: Exchange[];
    isLoading: boolean;
    currentIndex?: number;
};
const columnHelper = createColumnHelper<Exchange>();

const columns: ColumnDef<Exchange, any>[] = [
    columnHelper.group({
        header: "#",
        columns: [
            columnHelper.accessor("coin_id", {
                cell: (info) => info.getValue(),
            }),
        ],
    }),
    columnHelper.accessor("market.name", {
        cell: (info) => info.getValue(),
        header: "Name",
    }),
    columnHelper.accessor("base", {
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
    columnHelper.accessor("target", {
        cell: (info) => info.getValue(),
        header: "Update",
        meta: {
            isNumeric: true,
        },
    }),
];
function ExchangeTable({ data, isLoading, currentIndex = 0 }: ExchangeTableProps) {
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
                                            justifyContent={(meta?.isNumeric || meta?.center) && "center"}
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
                        ? table.getRowModel().rows.map((row, index) => {
                              return (
                                  <Tr key={row.index}>
                                      <Td
                                          px={"8px"}
                                          className="bg-secondary"
                                          position={width <= 768 ? "sticky" : undefined}
                                          left={0}
                                      >
                                          {index + 1 + currentIndex}
                                      </Td>
                                      <Td
                                          px={"4px"}
                                          minW={"120px"}
                                          maxW={"150px"}
                                          position={width <= 768 ? "sticky" : undefined}
                                          left={8}
                                          className="bg-secondary"
                                      >
                                          <p className="capitalize text-sm leading-4 font-semibold text-typo-4 ">
                                              {row.original.market.name}
                                          </p>
                                      </Td>
                                      <Td px={"4px"}>
                                          <p className="uppercase whitespace-normal text-center text-sm leading-4 font-medium text-primary-1 ">
                                              {row.original.base} / {row.original.target}
                                          </p>
                                      </Td>
                                      <Td px={"4px"} minW={"120px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              {formatCurrency(
                                                  row.original.converted_last["usd"],
                                                  "USD",
                                                  currentLanguage,
                                                  {
                                                      maximumFractionDigits: 6,
                                                  }
                                              )}
                                          </p>
                                      </Td>
                                      <Td px={"4px"} minW={"145px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              {formatCurrency(row.original.converted_volume["usd"])}
                                          </p>
                                      </Td>
                                      <Td px={"4px"} minW={"132px"}>
                                          <p className="capitalize text-center text-sm leading-4 font-medium text-typo-1 ">
                                              Recently
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

export default ExchangeTable;
