import { createSlice } from "@reduxjs/toolkit";

const getLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    const data = window.localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(data);
  }
};
const setLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(key, JSON.stringify(value));
  }
};
type User = {
  email?: string;
  name?: string;
  id?: number;
};
const initialState = {
  user: (getLocalStorage("user") || null) as User | null,
};
const userSlide = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
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
