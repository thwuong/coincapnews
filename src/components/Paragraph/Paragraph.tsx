import React from "react";

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {}
function Paragraph({ children, ...props }: ParagraphProps) {
    return (
        <div
            {...props}
            dangerouslySetInnerHTML={{
                __html: children || "",
            }}
        ></div>
    );
}

export default Paragraph;
