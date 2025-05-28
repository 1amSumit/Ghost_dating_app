import { configureStore } from "@reduxjs/toolkit";
import createUserSlice from "./createUserSlice";
import userSlice from "./userSlice";

export const store = configureStore({
  reducer: {
    userReducer: userSlice.reducer,
    createUserSlice: createUserSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type UserDispatch = typeof store.dispatch;
