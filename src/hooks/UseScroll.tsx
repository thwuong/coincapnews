"use client";
import { useEffect, useState } from "react";
const UseScroll = () => {
    const [scrollingUp, setScrollingUp] = useState(false);
    let prevScroll = 0;
    const handleScroll = () => {
        const currScroll = window.scrollY;
        const isScrolled = currScroll > prevScroll;
        setScrollingUp(isScrolled);
        prevScroll = currScroll;
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return [scrollingUp];
};
export default UseScroll;
