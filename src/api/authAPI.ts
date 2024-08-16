import { STATIC_HOST_URL } from "@/app/contants";
import { clearUser, setUser } from "@/lib/features/user/userSlice";
type RequestBody = {
  email: string;
  password: string;
};
export const createUserAPI = async (payload: RequestBody) => {
  try {
    const req = await fetch(`${STATIC_HOST_URL}/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
      }),
    });
    const data = await req.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const loginAPI = async (payload: RequestBody) => {
  try {
    const req = await fetch(`${STATIC_HOST_URL}/users/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...payload,
      }),
    });
    const data = await req.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const logoutAPI = async (dispatch: any) => {
  try {
    const req = await fetch(`${STATIC_HOST_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await req.json();
    dispatch(clearUser());
    return data;
  } catch (err) {
    console.log(err);
  }
};
export const updateUserAPI = async (payload: any, dispatch: any) => {
  try {
    const { id, ...rest } = payload;
    const req = await fetch(`${STATIC_HOST_URL}/users/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...rest,
      }),
    });
    const data = await req.json();
    if (data.doc) {
      dispatch(setUser(data.user));
    }
    return data;
  } catch (err) {
    console.log(err);
  }
};
