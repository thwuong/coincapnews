"use client";
import { SOCKET_DETAIL_URL } from "@/app/contants";
export const connectSocket = (url: string) => {
    return new WebSocket(`${SOCKET_DETAIL_URL}${url}@2000ms`);
};
export const socketDetail = (symbol: string) => {
    return new WebSocket(`${SOCKET_DETAIL_URL}${symbol}usdt@ticker`);
};
