import clsx from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    headingTag?: React.ElementType;
    textAlign?: any;
}
function Heading({ title, className, textAlign, headingTag }: HeadingProps) {
    const Tag = headingTag || "h1";
    return (
        <Tag
            className={twMerge(
                clsx("text-[28px] text-center leading-9 font-bold text-typo-4/80 max-lg:text-[20px]", className)
            )}
            style={{
                textAlign: textAlign,
            }}
        >
            {title}
        </Tag>
    );
}

export default Heading;
