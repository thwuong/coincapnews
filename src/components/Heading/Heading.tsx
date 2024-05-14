import clsx from "clsx";
import React from "react";
type HeadingProps = {
    title: string;
    className: string;
    textAlign: any;
};
function Heading({ title, className, textAlign }: HeadingProps) {
    return (
        <h1
            className={clsx("text-[28px] leading-9 max-lg:py-6 font-bold text-typo-4/80", className)}
            style={{
                textAlign: textAlign,
            }}
        >
            {title}
        </h1>
    );
}

export default Heading;
