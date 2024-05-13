import { formatCurrency, formatQuoteCurrency } from "@/app/utils/formatCurrency";
import UseResize from "@/hooks/UseResize";
import {
    Badge,
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
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LineChartLastDays from "../Charts/LineChartLastDays";
import { UnitConversion } from "../TableSection/TableSection";

export type DataTableProps = {
    data: UnitConversion[];
    columns: ColumnDef<UnitConversion, any>[];
    isLoading: boolean;
};
function CoinTable({ data, columns, isLoading }: DataTableProps) {
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
                                        bg={"#fff"}
                                        position={index === 0 && width <= 768 ? "sticky" : "unset"}
                                        zIndex={index === 0 && width <= 768 ? 2 : 0}
                                        left={0}
                                        px={0}
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        isNumeric={meta?.isNumeric}
                                    >
                                        <Box
                                            display={"flex"}
                                            alignItems={"center"}
                                            justifyContent={meta?.isNumeric && "end"}
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
                                  <Tr key={row.original._source.id}>
                                      <Td
                                          p={"4px"}
                                          minW={"104px"}
                                          position={width <= 768 ? "sticky" : undefined}
                                          left={0}
                                          bg={"#fff"}
                                      >
                                          <Box display={"flex"} alignItems={"center"} gap={"8px"}>
                                              <Image
                                                  className="cursor-pointer"
                                                  src={"/assets/icons/start.svg"}
                                                  alt="sort-down"
                                                  width={14}
                                                  height={14}
                                              />
                                              <Link href={`/currency/${row.original._source.id}`}>
                                                  <Image
                                                      className="cursor-pointer"
                                                      src={row.original._source.image}
                                                      alt={row.original._source.name}
                                                      width={24}
                                                      height={24}
                                                  />
                                              </Link>
                                              <Box
                                                  flexDirection={"column"}
                                                  as={Link}
                                                  href={`/currency/${row.original._source.id}`}
                                              >
                                                  <p className="capitalize text-sm leading-4 font-semibold text-typo-4 font-inter">
                                                      {row.original._source.name}
                                                  </p>
                                                  <Box display={"flex"} alignItems={"center"} gap={"4px"}>
                                                      <Badge
                                                          p={"4px"}
                                                          className="uppercase leading-[14px] text-12 text-typo-1 font-inter"
                                                      >
                                                          {row.original._source.market_cap_rank}
                                                      </Badge>
                                                      <span className="uppercase leading-[18px] text-12 text-typo-1 font-inter">
                                                          {row.original._source.name}
                                                      </span>
                                                  </Box>
                                              </Box>
                                          </Box>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                                              {formatCurrency(row.original._source.current_price)}
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p
                                              className={clsx(
                                                  "capitalize text-sm leading-4 font-semibold font-inter",
                                                  row.original._source.price_change_percentage_24h_in_currency > 0
                                                      ? "text-up"
                                                      : "text-down"
                                              )}
                                          >
                                              {row.original._source.price_change_percentage_24h_in_currency.toFixed(2)}%
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p
                                              className={clsx(
                                                  "capitalize text-sm leading-4 font-semibold font-inter",
                                                  row.original._source.price_change_percentage_7d_in_currency > 0
                                                      ? "text-up"
                                                      : "text-down"
                                              )}
                                          >
                                              {row.original._source.price_change_percentage_7d_in_currency.toFixed(2)}%
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"} minW={"138px"}>
                                          <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                                              {formatQuoteCurrency(row.original._source.market_cap)}
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"} minW={"118px"}>
                                          <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                                              {formatQuoteCurrency(row.original._source.total_volume)}
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"} minW={"182px"}>
                                          <div className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter flex gap-1 justify-end">
                                              <p>{formatQuoteCurrency(row.original._source.total_supply)}</p>
                                              <p className="uppercase">{row.original._source.symbol}</p>
                                          </div>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"} minW={"180px"}>
                                          <Box display={"flex"} justifyContent={"end"}>
                                              <LineChartLastDays
                                                  isUp={row.original._source.price_change_percentage_7d_in_currency > 0}
                                                  data={row.original._source.sparkline_in_7d.price}
                                              />
                                          </Box>
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

export default CoinTable;
