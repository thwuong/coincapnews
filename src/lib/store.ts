import { configureStore } from "@reduxjs/toolkit";
import coinSlice from "./features/coins/coinSlice";
import langSlice from "./features/lang/langSlice";

export const makeStore = () => {
    return configureStore({
        reducer: {
            coinStore: coinSlice,
            langStore: langSlice,
        },
    });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const store = makeStore();
