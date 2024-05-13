import Image from "next/image";
import React from "react";
import ReactPaginate from "react-paginate";

type TablePaginationType = {
    handlePageClick: (data: any) => void;
    pageCount: number;
};

function TablePagination(props: TablePaginationType) {
    const { handlePageClick, pageCount } = props;

    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel={<Image src={"/assets/icons/d-arrow-next.svg"} alt="arrow-next" width={18} height={20} />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel={<Image src={"/assets/icons/d-arrow-pre.svg"} alt="arrow-pre" width={18} height={20} />}
            className="flex items-center gap-4 pagination"
        />
    );
}

export default TablePagination;
