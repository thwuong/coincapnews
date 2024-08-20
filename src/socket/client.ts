"use client";
import { SOCKET_DETAIL_URL } from "@/app/contants";
export const connectSocket = (url: string) => {
  return new WebSocket(`${SOCKET_DETAIL_URL}${url}@2000ms`);
};
export const socketDetail = (symbol: string, currentCurrency: string) => {
  const changedCurrency = currentCurrency === "usd" ? "usdt" : currentCurrency;
  return new WebSocket(
    `${SOCKET_DETAIL_URL}${symbol}${changedCurrency}@ticker`
  );
};
