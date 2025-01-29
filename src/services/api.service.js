import axios from "axios";
import { configEnv } from "../config/configEnv";
import { displayNotification } from "../components/Notofications";

export const getRequest = async (url, token = null) => {
  try {
    const { data } = await axios.get(`${configEnv.baseURL}${url}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    displayNotification("success", data.message);
    return data;
  } catch (err) {
    if (err.response.data.errors) {
      let errors = err.response.data.errors;
      for (let i = 0; i < errors.length; i++) {
        for (const property in errors[i]) {
          displayNotification("success", ` ${errors[i][property]}`);
        }
      }
    } else {
      displayNotification("success", err.response.data.message);
    }
    throw new Error(err.message);
  }
};

export const postRequest = async (url, body, token = null) => {
  try {
    const { data } = await axios.post(`${configEnv.baseURL}${url}`, body, {
      headers: {
        Authorization: `${token}`,
      },
    });
    displayNotification("success", data.message);

    return data;
  } catch (err) {
    if (err.response.data.errors) {
      let errors = err.response.data.errors;
      for (let i = 0; i < errors.length; i++) {
        for (const property in errors[i]) {
          displayNotification("success", ` ${errors[i][property]}`);
        }
      }
    } else {
      displayNotification("success", err.response.data.message);
    }
    throw new Error(err.response.data.errors);
  }
};

export const getRequestGeneric = async (url, token = null) => {
  try {
    const { data } = await axios.get(`${url}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return data;
  } catch (err) {
    console.log(err);
    throw new Error(err?.response?.data?.error?.message);
  }
};
