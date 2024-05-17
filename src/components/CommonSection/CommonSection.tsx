import React from "react";
import { TablePagination } from "../TablePagination";
import { CommonTable } from "../CommonTable";
import useFetchAPI from "@/api/baseAPI";

function CommonSection({ totalPage, url, perPage }: { totalPage: number; perPage: number; url: string }) {
    const [page, setPage] = React.useState<number>(1);

    const handlePageClick = (selectedItem: any) => {
        setPage(selectedItem.selected + 1);
    };
    const { data: dataAPI, isLoading } = useFetchAPI(`/api/coins/markets?page=${page}&per_page=${perPage}`);
    return (
        <section className="w-full flex flex-col items-center">
            <CommonTable data={dataAPI} isLoading={isLoading} />
            <div className="py-10">
                <TablePagination
                    className={isLoading ? "hidden" : "flex"}
                    pageCount={totalPage}
                    handlePageClick={handlePageClick}
                />
            </div>
        </section>
    );
}

export default CommonSection;
