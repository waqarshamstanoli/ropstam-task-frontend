import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./AuthSlice";
import citiesSlice from "./CitiesSlice";

export const store = configureStore({
  reducer: {
    authSlice: authSlice,
    citiesSlice:citiesSlice
  },
});
