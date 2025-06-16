import { createSlice } from "@reduxjs/toolkit";

const initState = {
  userData: "",
};

const userDataSlice = createSlice({
  name: "userDataSlice",
  initialState: initState,
  reducers: {
    addUserData: (state, action) => {
      state.userData = action.payload;
    },
  },
});

export const { addUserData } = userDataSlice.actions;

export default userDataSlice;
