import clsx from "clsx";
import Image from "next/image";
import React from "react";
import ReactPaginate from "react-paginate";

type TablePaginationType = {
    handlePageClick: (data: any) => void;
    pageCount: number;
    className?: string;
    pageRangeDisplayed?: number;
    disbledPre?: boolean;
    disbledNext?: boolean;
};

function TablePagination(props: TablePaginationType) {
    const {
        handlePageClick,
        pageCount,
        className,
        pageRangeDisplayed = 3,
        disbledPre = false,
        disbledNext = false,
    } = props;

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel={<Image src={"/assets/icons/d-arrow-next.svg"} alt="arrow-next" width={18} height={20} />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={pageRangeDisplayed}
            pageCount={pageCount}
            previousLabel={<Image src={"/assets/icons/d-arrow-pre.svg"} alt="arrow-pre" width={18} height={20} />}
            className={clsx(
                "flex items-center gap-4 pagination",
                className,
                disbledPre && "[&>*:first-child]:hidden",
                disbledNext && "[&>*:last-child]:hidden"
            )}
        />
    );
}

export default TablePagination;
