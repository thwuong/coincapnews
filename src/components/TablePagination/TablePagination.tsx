import UseResize from "@/hooks/UseResize";
import { Button } from "@chakra-ui/react";
import clsx from "clsx";
import Image from "next/image";
import ReactPaginate from "react-paginate";

type TablePaginationType = {
    handlePrePage: (data: any) => void;
    handlePageClick: (data: any) => void;
    pageCount: number;
    className?: string;
    pageRangeDisplayed?: number;
    disbledPre?: boolean;
    disbledNext?: boolean;
    currentPage: number;
};

function TablePagination(props: TablePaginationType) {
    const {
        handlePageClick,
        handlePrePage,
        pageCount,
        className,
        pageRangeDisplayed = 3,
        disbledPre = false,
        disbledNext = false,
        currentPage,
    } = props;
    const [width] = UseResize();

    if (true) {
        return (
            <div className="flex items-center gap-10 ">
                <Button onClick={handlePrePage} isDisabled={currentPage === 1}>
                    Previous
                </Button>
                <Button onClick={handlePageClick}>Next</Button>
            </div>
        );
    }
    return (
        <ReactPaginate
            breakLabel="..."
            nextLabel={<Image src={"/assets/icons/d-arrow-next.svg"} alt="arrow-next" width={18} height={20} />}
            onPageChange={handlePageClick}
            marginPagesDisplayed={1}
            pageRangeDisplayed={width >= 640 ? pageRangeDisplayed : 1}
            pageCount={pageCount}
            previousLabel={<Image src={"/assets/icons/d-arrow-pre.svg"} alt="arrow-pre" width={18} height={20} />}
            className={clsx(
                "flex items-center gap-4 pagination",
                className,
                disbledPre && "[&>*:first-child]:hidden",
                disbledNext && "[&>*:last-child]:hidden",
                "max-lg:[&>*:first-child]:hidden max-lg:[&>*:last-child]:hidden"
            )}
        />
    );
}

export default TablePagination;
