import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentLanguage: "",
};
const langSlice = createSlice({
    name: "lang",
    initialState: initialState,
    reducers: {
        setCurrentLang(state, action) {
            state.currentLanguage = action.payload;
        },
    },
});
export const { setCurrentLang } = langSlice.actions;
export default langSlice.reducer;
