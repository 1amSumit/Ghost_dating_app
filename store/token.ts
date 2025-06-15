import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const tokenSlice = createSlice({
  name: "tokenSlice",
  initialState: initialState,
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { addToken } = tokenSlice.actions;

export default tokenSlice;
