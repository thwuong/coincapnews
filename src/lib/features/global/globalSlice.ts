import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
        return window.localStorage.getItem(key);
    }
};
const setLocalStorage = (key: string, value: string) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(key, value);
    }
};

const initialState = {
    currentLanguage: "",
    currentCurrency: getLocalStorage("currency") || "usd",
};
const globalSlice = createSlice({
    name: "global",
    initialState: initialState,
    reducers: {
        setCurrentLang(state, action) {
            state.currentLanguage = action.payload;
        },
        setcurrentCurrency(state, action) {
            state.currentCurrency = action.payload;
            setLocalStorage("currency", action.payload);
        },
    },
});
export const { setCurrentLang, setcurrentCurrency } = globalSlice.actions;
export default globalSlice.reducer;
