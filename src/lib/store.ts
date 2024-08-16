import { configureStore } from "@reduxjs/toolkit";
import coinSlice from "./features/coins/coinSlice";
import globalSlice from "./features/global/globalSlice";
import userSlice from "./features/user/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      coinStore: coinSlice,
      globalStore: globalSlice,
      userStore: userSlice,
    },
  });
};
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const store = makeStore();
