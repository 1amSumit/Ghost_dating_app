import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  otp: Array(6).fill(""),
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

    resetSinginUser: (state) => {
      return initialState;
    },
  },
});

export const { addEmail, addPassword, addOtp, resetSinginUser } =
  userSlice.actions;
export default userSlice;
