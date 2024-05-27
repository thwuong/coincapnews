import { DetailCoinType } from "@/app/types";
import { createSlice } from "@reduxjs/toolkit";

type CoinSliceType = {
    data: DetailCoinType | any;
    isLoading: boolean;
    error: any;
};

const initialState: CoinSliceType = {
    data: undefined,
    isLoading: false,
    error: undefined,
};

const coinSlice = createSlice({
    name: "coin",
    initialState: initialState,
    reducers: {
        setCoins(state, { payload }) {
            state.data = payload;
        },
        setLoading(state, { payload }) {
            state.isLoading = payload;
        },
    },
});
export const { setCoins, setLoading } = coinSlice.actions;
export default coinSlice.reducer;
