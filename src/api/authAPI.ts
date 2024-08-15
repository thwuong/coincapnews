import { STATIC_HOST_URL } from "@/app/contants";
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
export const logoutAPI = async () => {
  try {
    const req = await fetch(`${STATIC_HOST_URL}/users/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await req.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
