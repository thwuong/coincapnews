"use client";
import useFetchAPI from "@/api/baseAPI";
import { COIN_PER_PAGE } from "@/app/contants";
import React, { useMemo } from "react";
import { CommonTable } from "../CommonTable";
import { TablePagination } from "../TablePagination";
import { useAppSelector } from "@/lib/hooks";
import { coinCategories } from "@/fakedata/fakedata";

function CommonSection({
  totalPage = 100,
  category,
}: {
  totalPage?: number;
  category: string;
}) {
  const [page, setPage] = React.useState<number>(1);
  const { currentCurrency } = useAppSelector((state) => state.globalStore);
  const handlePageClick = (selectedItem: any) => {
    // setPage(selectedItem.selected + 1);
    setPage(page + 1);
  };
  const handlePrePage = (selectedItem: any) => {
    // setPage(selectedItem.selected + 1);
    setPage(page - 1);
  };
  const getCategory = useMemo(() => {
    if (!category) return;
    return coinCategories.find((item) => item.name === category)?.category_id;
  }, [category]);
  const { data: dataAPI, isLoading } = useFetchAPI(
    `/v1/coins/markets?category=${getCategory}&page=${page}&per_page=${COIN_PER_PAGE}&vs_currency=${currentCurrency}&sparkline=true`
  );
  return (
    <section className="w-full flex flex-col items-center">
      <CommonTable data={dataAPI} isLoading={isLoading} />
      <div className="py-10">
        <TablePagination
          currentPage={page}
          handlePrePage={handlePrePage}
          className={isLoading ? "hidden" : "flex"}
          pageCount={totalPage}
          handlePageClick={handlePageClick}
        />
      </div>
    </section>
  );
}

export default CommonSection;
