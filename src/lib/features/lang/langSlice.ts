import { createSlice } from "@reduxjs/toolkit";

const langSlice = createSlice({
    name: "lang",
    initialState: {
        currentLanguage: "",
    } as any,
    reducers: {
        setCurrentLang(state, { payload }) {
            state.currentLanguage = payload;
        },
    },
});
export const { setCurrentLang } = langSlice.actions;
export default langSlice.reducer;
