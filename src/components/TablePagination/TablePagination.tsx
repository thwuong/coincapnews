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
            nextLabel=">>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<<"
            className="flex items-center gap-4 pagination"
        />
    );
}

export default TablePagination;
