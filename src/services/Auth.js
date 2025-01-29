import { postRequest } from "./api.service";
import { store } from "../store/store";

export const registerUser = async (item) => {
  const { data } = await postRequest("register", item);
  return data;
};
export const loginUser = async (item) => {
    const {data} = await postRequest("login", item);
    return data;
};

export const logoutHandler = async (history) => {
  try {
    localStorage.removeItem("access_token");
  } catch (err) {
    console.log(err);
  }
};
