"use client";
import { useEffect, useState } from "react";
const UseGetScrollY = () => {
    const [scrollY, setScrollY] = useState<number>();
    const handleScroll = () => {
        const currScroll = window.scrollY;
        setScrollY(currScroll);
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return [scrollY];
};
export default UseGetScrollY;
