import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }
};
const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, value);
  }
};

const initialState = {
  user: getLocalStorage("user") || null,
};
const userSlide = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      console.log(action.payload);

      state.user = action.payload;
      setLocalStorage("user", action.payload);
    },
    clearUser(state) {
      state.user = null;
      setLocalStorage("user", null);
    },
  },
});
export const { setUser, clearUser } = userSlide.actions;
export default userSlide.reducer;
