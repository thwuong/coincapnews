"use client";
import { SOCKET_DETAIL_URL, SOCKET_URL } from "@/app/contants";
export const connectSocket = () => {
    return new WebSocket(SOCKET_URL);
};
export const socketDetail = (symbol: string) => {
    return new WebSocket(`${SOCKET_DETAIL_URL}${symbol}usdt@ticker`);
};
