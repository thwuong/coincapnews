import { IDS_FEATURE } from "@/app/contants";
import { useTranslation } from "@/app/i18n/client";
import { CoinType } from "@/app/types";
import { checkFormatImage } from "@/app/utils/checkFormatImage";
import {
  formatCurrency,
  formatQuoteCurrency,
} from "@/app/utils/formatCurrency";
import UseResize from "@/hooks/UseResize";
import { useAppSelector } from "@/lib/hooks";
import { connectSocket } from "@/socket/client";
import {
  Badge,
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
  SortingFn,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const LineHighChart = dynamic(() =>
  import("../Charts").then((mod) => mod.LineHighChart)
);
export type DataTableProps = {
  data: CoinType[];
  columns: ColumnDef<CoinType, any>[];
  isLoading: boolean;
  currentPage: number;
  features: CoinType[];
  skipFirstRowSortingFn: SortingFn<CoinType>;
};

function CoinTable({
  data,
  columns,
  isLoading,
  currentPage,
  features,
  skipFirstRowSortingFn,
}: DataTableProps) {
  const { currentLanguage, currentCurrency } = useAppSelector(
    (state) => state.globalStore
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const list = React.useMemo(() => {
    if (!data) return [];
    return currentPage === 1
      ? [
          ...(features || []),
          ...data.filter((item) =>
            features?.every((feature: CoinType) => feature.id !== item.id)
          ),
        ]
      : data;
  }, [data, currentPage, features]);
  let ref = React.useRef<any>();
  const table = useReactTable({
    columns,
    data: list,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    sortingFns: {
      skipFirstRowSortingFn,
    },
    state: {
      sorting,
    },
  });
  const [width] = UseResize();

  React.useEffect(() => {
    if (!list) return;
    const changedCurrency =
      currentCurrency === "usd" ? "usdt" : currentCurrency;
    const url = list
      .map((i) => `${i.symbol}${changedCurrency}@ticker/`)
      .join("");
    const socket = connectSocket(url);
    function onConnect(this: WebSocket) {}

    function onDisconnect() {}
    function getMessage(this: WebSocket, ev: MessageEvent<any>) {
      const streamData = JSON.parse(ev.data);
      const priceEL = document.querySelector(
        `tr[data-symbol="${streamData.data.s}"] td p.price`
      );
      const change24 = document.querySelector(
        `tr[data-symbol="${streamData.data.s}"] td p.change24`
      );
      if (priceEL) {
        priceEL.innerHTML = formatCurrency(
          parseFloat(streamData.data.c),
          currentCurrency,
          currentLanguage || "en",
          {
            maximumFractionDigits: 8,
          }
        );
      }
      if (change24) {
        change24.innerHTML = `${parseFloat(streamData.data.P)?.toFixed(2)}%`;
      }
      document
        .querySelector(`tr[data-symbol="${streamData.data.s}"] td p.change24`)
        ?.classList.remove(streamData.data.P <= 0 ? "text-up" : "text-down");
      document
        .querySelector(`tr[data-symbol="${streamData.data.s}"] td p.change24`)
        ?.classList.add(streamData.data.P >= 0 ? "text-up" : "text-down");
      document
        .querySelector(`tr[data-symbol="${streamData.data.s}"] td .fomo`)
        ?.classList.toggle("!hidden", streamData.data.P < 30);
    }

    socket.onopen = onConnect;
    socket.onmessage = getMessage;

    return () => {
      socket.onclose = onConnect;
      socket.onclose = onDisconnect;
      socket.close();
    };
  }, [list, currentLanguage, currentCurrency]);
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
                    position={index === 0 && width <= 768 ? "sticky" : "unset"}
                    zIndex={index === 0 && width <= 768 ? 2 : 0}
                    left={0}
                    px={"4px"}
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
        <Tbody ref={ref}>
          {!isLoading
            ? table.getRowModel().rows.map((row) => {
                let convertId =
                  `${row.original.symbol}USDT`.toLocaleUpperCase();
                return (
                  <Tr
                    key={row.index}
                    data-symbol={convertId}
                    className="bg-secondary duration-300"
                    _hover={{
                      bg: "gray.100",
                    }}
                    bg={
                      IDS_FEATURE?.includes(row.original.id)
                        ? "gray.100"
                        : "btn.50"
                    }
                  >
                    <Td
                      p={"4px"}
                      minW={"200px"}
                      maxW={"220px"}
                      height={"100px"}
                      position={width <= 768 ? "sticky" : undefined}
                      left={0}
                      zIndex={2}
                      className="bg-inherit"
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
                          className="flex items-center gap-2 cursor-pointer flex-1"
                          href={`/currency/${row.original.id}`}
                        >
                          {checkFormatImage(row.original.image) && (
                            <img
                              className="cursor-pointer"
                              src={row.original.image}
                              alt={row.original.name}
                              width={24}
                              height={24}
                              loading="lazy"
                            />
                          )}

                          <Box flexDirection={"column"}>
                            <p className="capitalize whitespace-normal text-sm leading-4 font-semibold text-typo-4 font-inter">
                              {row.original.name}
                            </p>
                            <Box
                              display={"flex"}
                              alignItems={"center"}
                              gap={"4px"}
                            >
                              {row.original.market_cap_rank && (
                                <Badge
                                  p={"4px"}
                                  className="uppercase leading-[14px] text-12 text-typo-1 font-inter"
                                >
                                  {row.original.market_cap_rank}
                                </Badge>
                              )}

                              <span className="uppercase leading-[18px] text-12 text-typo-1 font-inter">
                                {row.original.symbol}
                              </span>
                              {IDS_FEATURE?.includes(row.original.id) && (
                                <Badge
                                  variant="outline"
                                  colorScheme="brand"
                                  fontSize={"11px"}
                                >
                                  Sponsored
                                </Badge>
                              )}
                            </Box>
                          </Box>
                          <Badge
                            p={"2px"}
                            variant="outline"
                            colorScheme="green"
                            className={clsx(
                              "uppercase fomo leading-[14px] text-12 font-bold text-green-600 font-inter ml-auto ",
                              row.original
                                .price_change_percentage_24h_in_currency < 30 &&
                                "!hidden"
                            )}
                          >
                            FOMO
                          </Badge>
                        </Link>
                      </Box>
                    </Td>
                    <Td isNumeric={true} px={"4px"} minW={"100px"}>
                      <p className="capitalize price text-sm leading-4 font-semibold text-typo-1 font-inter">
                        {formatCurrency(
                          row.original.current_price,
                          currentCurrency,
                          currentLanguage,
                          {
                            maximumFractionDigits: 8,
                          }
                        )}
                      </p>
                    </Td>
                    <Td isNumeric={true} px={"4px"} minW={"60px"}>
                      <p
                        className={clsx(
                          "capitalize text-sm leading-4 change24 font-semibold font-inter",
                          row.original.price_change_percentage_24h_in_currency >
                            0
                            ? "text-up"
                            : "text-down"
                        )}
                      >
                        {row.original.price_change_percentage_24h_in_currency?.toFixed(
                          2
                        ) || 0}
                        %
                      </p>
                    </Td>
                    <Td isNumeric={true} px={"4px"}>
                      <p
                        className={clsx(
                          "capitalize text-sm leading-4 font-semibold font-inter",
                          row.original.price_change_percentage_7d_in_currency >
                            0
                            ? "text-up"
                            : "text-down"
                        )}
                      >
                        {row.original.price_change_percentage_7d_in_currency?.toFixed(
                          2
                        ) || 0}
                        %
                      </p>
                    </Td>
                    <Td isNumeric={true} px={"4px"} minW={"138px"}>
                      <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                        {formatCurrency(
                          row.original.market_cap,
                          currentCurrency,
                          currentLanguage,
                          {
                            minimumFractionDigits: 0,
                          }
                        )}
                      </p>
                    </Td>
                    <Td isNumeric={true} px={"4px"} minW={"118px"}>
                      <p className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter">
                        {formatCurrency(
                          row.original.total_volume,
                          currentCurrency,
                          currentLanguage,
                          {
                            minimumFractionDigits: 0,
                          }
                        )}
                      </p>
                    </Td>
                    <Td isNumeric={true} px={"4px"} minW={"182px"}>
                      <div className="capitalize text-sm leading-4 font-semibold text-typo-1 font-inter flex gap-1 justify-end">
                        <p>
                          {formatCurrency(
                            row.original.total_supply,
                            currentCurrency,
                            currentLanguage,
                            {
                              minimumFractionDigits: 0,
                            }
                          )}
                        </p>
                      </div>
                    </Td>
                    <Td
                      isNumeric={true}
                      px={"4px"}
                      minW={"180px"}
                      overflow={"hidden"}
                    >
                      <Box display={"flex"} justifyContent={"end"}>
                        <LineHighChart
                          isUp={
                            row.original
                              .price_change_percentage_7d_in_currency > 0
                          }
                          data={row.original.sparkline_in_7d.price}
                        />
                      </Box>
                    </Td>
                  </Tr>
                );
              })
            : Array(9)
                .fill(0)
                .map((_, index) => {
                  return (
                    <Tr key={index}>
                      <Td
                        height={"100px"}
                        p={"4px"}
                        minW={"260px"}
                        position={width <= 768 ? "sticky" : undefined}
                        left={0}
                      >
                        <div className="flex items-center gap-4">
                          <SkeletonCircle size="5" />
                          <div className="flex flex-col w-1/3">
                            <SkeletonText
                              noOfLines={2}
                              spacing="2"
                              skeletonHeight="2"
                            />
                          </div>
                        </div>
                      </Td>
                      <Td isNumeric={true} px={"4px"} minW={"127px"}>
                        <SkeletonText
                          noOfLines={1}
                          spacing="2"
                          skeletonHeight="2"
                        />
                      </Td>
                      <Td isNumeric={true} px={"4px"} minW={"76px"}>
                        <SkeletonText
                          noOfLines={1}
                          spacing="2"
                          skeletonHeight="2"
                        />
                      </Td>
                      <Td isNumeric={true} px={"4px"} minW={"80px"}>
                        <SkeletonText
                          noOfLines={1}
                          spacing="2"
                          skeletonHeight="2"
                        />
                      </Td>
                      <Td isNumeric={true} px={"4px"} minW={"172px"}>
                        <SkeletonText
                          noOfLines={1}
                          spacing="2"
                          skeletonHeight="2"
                        />
                      </Td>
                      <Td isNumeric={true} px={"4px"} minW={"150px"}>
                        <SkeletonText
                          noOfLines={1}
                          spacing="2"
                          skeletonHeight="2"
                        />
                      </Td>
                      <Td isNumeric={true} px={"4px"} minW={"237px"}>
                        <SkeletonText
                          noOfLines={1}
                          spacing="2"
                          skeletonHeight="2"
                        />
                      </Td>
                      <Td isNumeric={true} px={"4px"} minW={"229px"}>
                        <Skeleton height={"20px"} />
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
