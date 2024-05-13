import { Spinner } from "@chakra-ui/react";
import React from "react";

function SpinnerLoading() {
    return (
        <div className="w-full flex items-center justify-center h-[30vh]">
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
        </div>
    );
}

export default SpinnerLoading;
