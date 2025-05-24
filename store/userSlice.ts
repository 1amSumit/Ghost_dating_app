import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  otp: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addEmail: (state, action) => {
      state.email = action.payload;
    },
    addPassword: (state, action) => {
      state.password = action.payload;
    },
    addOtp: (state, action) => {
      state.otp = action.payload;
    },
  },
});

export const { addEmail, addPassword, addOtp } = userSlice.actions;
export default userSlice;
