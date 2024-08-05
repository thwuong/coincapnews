"use client";
import useFetchAPI from "@/api/baseAPI";
import { COIN_PER_PAGE } from "@/app/contants";
import React from "react";
import { CommonTable } from "../CommonTable";
import { TablePagination } from "../TablePagination";

function CommonSection({
  totalPage = 100,
  category,
}: {
  totalPage?: number;
  category: string;
}) {
  const [page, setPage] = React.useState<number>(1);

  const handlePageClick = (selectedItem: any) => {
    // setPage(selectedItem.selected + 1);
    setPage(page + 1);
  };
  const handlePrePage = (selectedItem: any) => {
    // setPage(selectedItem.selected + 1);
    setPage(page - 1);
  };
  const { data: dataAPI, isLoading } = useFetchAPI(
    `/coins/details?categories=${category}&page=${page}&per_page=${COIN_PER_PAGE}`
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
