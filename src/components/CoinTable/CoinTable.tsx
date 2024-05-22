import { useTranslation } from "@/app/i18n/client";
import { CoinType } from "@/app/types";
import { formatCurrency, formatQuoteCurrency } from "@/app/utils/formatCurrency";
import UseResize from "@/hooks/UseResize";
import { useAppSelector } from "@/lib/hooks";
import { connectSocket } from "@/socket/client";
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
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const LineChartLastDays = dynamic(() => import("../Charts").then((mod) => mod.LineChartLastDays));
export type DataTableProps = {
    data: CoinType[];
    columns: ColumnDef<CoinType, any>[];
    isLoading: boolean;
};
function CoinTable({ data, columns, isLoading }: DataTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    let ref = React.useRef<any>();
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

    React.useEffect(() => {
        if (!data) return;
        const url = data.map((i) => `${i._source.symbol}usdt@ticker/`).join("");
        const socket = connectSocket(url);
        function onConnect(this: WebSocket) {}

        function onDisconnect() {}
        function getMessage(this: WebSocket, ev: MessageEvent<any>) {
            const streamData = JSON.parse(ev.data);
            document.querySelector(`tr[data-symbol="${streamData.data.s}"] td p.price`)!.innerHTML = formatCurrency(
                parseFloat(streamData.data.c)
            );
            document.querySelector(`tr[data-symbol="${streamData.data.s}"] td p.change24`)!.innerHTML = `${parseFloat(
                streamData.data.P
            ).toFixed(2)}%`;
            document
                .querySelector(`tr[data-symbol="${streamData.data.s}"] td p.change24`)
                ?.classList.remove(streamData.data.P < 0 ? "text-up" : "text-down");
            document
                .querySelector(`tr[data-symbol="${streamData.data.s}"] td p.change24`)
                ?.classList.add(streamData.data.P > 0 ? "text-up" : "text-down");
        }

        socket.onopen = onConnect;
        socket.onmessage = getMessage;

        return () => {
            socket.onclose = onConnect;
            socket.onclose = onDisconnect;
            socket.close();
        };
    }, [data]);
    const { currentLanguage } = useAppSelector((state) => state.langStore);
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
                                        className="bg-secondary"
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
                <Tbody ref={ref}>
                    {!isLoading
                        ? table.getRowModel().rows.map((row) => {
                              let convertId = `${row.original._source.symbol}USDT`.toLocaleUpperCase();

                              return (
                                  <Tr key={row.original._source.name} data-symbol={convertId}>
                                      <Td
                                          p={"4px"}
                                          minW={"104px"}
                                          height={"100px"}
                                          position={width <= 768 ? "sticky" : undefined}
                                          left={0}
                                          className="bg-secondary"
                                      >
                                          <Box display={"flex"} alignItems={"center"} gap={"8px"}>
                                              <Image
                                                  className="cursor-pointer"
                                                  src={"/assets/icons/start.svg"}
                                                  alt="sort-down"
                                                  width={14}
                                                  height={14}
                                              />

                                              <Link
                                                  className="flex items-center gap-2 cursor-pointer"
                                                  href={`/currency/${row.original._source.id}`}
                                              >
                                                  <Image
                                                      className="cursor-pointer"
                                                      src={row.original._source.image}
                                                      alt={row.original._source.name}
                                                      width={24}
                                                      height={24}
                                                  />
                                                  <Box flexDirection={"column"}>
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
                                                              {row.original._source.symbol}
                                                          </span>
                                                      </Box>
                                                  </Box>
                                              </Link>
                                          </Box>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p className="capitalize price text-sm leading-4 font-semibold text-typo-1 font-inter">
                                              {formatCurrency(row.original._source.current_price)}
                                          </p>
                                      </Td>
                                      <Td isNumeric={true} px={"4px"}>
                                          <p
                                              className={clsx(
                                                  "capitalize text-sm leading-4 change24 font-semibold font-inter",
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
                                              height={"120px"}
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

export default CoinTable;
