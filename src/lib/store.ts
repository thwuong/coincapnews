import { configureStore } from "@reduxjs/toolkit";
import coinSlice from "./features/coins/coinSlice";
import globalSlice from "./features/global/globalSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            coinStore: coinSlice,
            globalStore: globalSlice,
        },
    });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const store = makeStore();
