import useFetchAPI from "@/api/baseAPI";
import React from "react";
import { CommonTable } from "../CommonTable";
import { TablePagination } from "../TablePagination";

function CommonSection({
    totalPage,
    url,
    perPage,
    category,
}: {
    totalPage: number;
    category: string;
    perPage: number;
    url: string;
}) {
    const [page, setPage] = React.useState<number>(1);

    const handlePageClick = (selectedItem: any) => {
        setPage(selectedItem.selected + 1);
    };
    const { data: dataAPI, isLoading } = useFetchAPI(
        `/api/coins/details?categories=${category}&page=${page}&per_page=${perPage}`
    );
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
