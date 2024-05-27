"use client";
import { DetailCoinType } from "@/app/types";
import { setCoins, setLoading } from "@/lib/features/coins/coinSlice";
import { AppDispatch } from "@/lib/store";
import useFetchAPI from "./baseAPI";

export const useCoinDetail = (dispatch: AppDispatch, symbol: string) => {
    const { data, isLoading, error }: { data: DetailCoinType; isLoading: boolean; error: any } = useFetchAPI(
        `/api/coins/details/${symbol}`
    );
    dispatch(setLoading(isLoading));
    if (data) {
        dispatch(setCoins(data));
    }
};
