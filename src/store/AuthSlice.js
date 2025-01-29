import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  c_password: "",
  password: "",
  firstname: "",
  lastname: "",
  email: "",
  mobile_number: "",
  city:"",
  gender:"",
  DOB:""
};
const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setMobile_number(state, action) {
      state.mobile_number = action.payload;
    },
    setFirstname(state, action) {
      state.firstname = action.payload;
    },
    setLastname(state, action) {
      state.lastname = action.payload;
    },
    setGender(state, action) {
      state.gender = action.payload;
    },
    setDateofBirth(state, action) {
      state.DOB = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
      console.log('city',state.city)
    },
  },
});
export const {
  setFirstname,
  setLastname,
  setEmail,
  setMobile_number,
  setDateofBirth,
  setGender,
  setCity,
} = authSlice.actions;
export default authSlice.reducer;
