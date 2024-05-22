import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

function Container({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <div
            className={twMerge(
                clsx("w-full max-w-[1440px] flex items-center justify-center flex-col max-lg:px-4", className)
            )}
        >
            {children}
        </div>
    );
}

export default Container;
