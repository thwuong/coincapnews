import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentLanguage: "",
};
const langSlice = createSlice({
    name: "lang",
    initialState: initialState,
    reducers: {
        setCurrentLang(state, { payload }) {
            state.currentLanguage = payload;
        },
    },
});
export const { setCurrentLang } = langSlice.actions;
export default langSlice.reducer;
