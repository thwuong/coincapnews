import clsx from "clsx";
import React from "react";
interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
    headingTag: React.ElementType;
    textAlign: any;
}
function Heading({ title, className, textAlign, headingTag }: HeadingProps) {
    const Tag = headingTag || "h1";
    return (
        <Tag
            className={clsx("text-[28px] leading-9 max-lg:py-6 font-bold text-typo-4/80", className)}
            style={{
                textAlign: textAlign,
            }}
        >
            {title}
        </Tag>
    );
}

export default Heading;
