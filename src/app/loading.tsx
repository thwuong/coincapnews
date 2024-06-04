import { Container } from "@/components/Container";
import React from "react";
function Loading() {
    return (
        <Container className="h-[70vh] mx-auto">
            <div className="loader flex items-center justify-center"></div>
        </Container>
    );
}

export default Loading;
