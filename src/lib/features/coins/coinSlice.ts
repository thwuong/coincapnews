import { createSlice } from "@reduxjs/toolkit";

const coinSlice = createSlice({
    name: "coin",
    initialState: {
        coins: [],
    } as any,
    reducers: {
        setCoins(state, { payload }) {
            state.coins = payload;
        },
        getCoins(state) {
            return state.coins;
        },
    },
});
export const { getCoins, setCoins } = coinSlice.actions;
export default coinSlice.reducer;
