import React from "react";

interface ParagraphProps extends React.HTMLAttributes<HTMLParagraphElement> {
    builderBlock: any;
    builderState: any;
}
function Paragraph({ children, builderBlock, builderState, ...props }: ParagraphProps) {
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
