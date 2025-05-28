import { createSlice } from "@reduxjs/toolkit";

const intiState = {
  username: "",
  address: "",
  bio: "",
  dob: "",
  education: "",
  gender: "",
  height: "",
  howyoudie: "",
  intension: "",
  liketodate: "",
  sexuality: "",
};

const createUserSlice = createSlice({
  name: "createUser",
  initialState: intiState,
  reducers: {
    addUsername: (state, action) => {
      state.username = action.payload;
    },
    addAddress: (state, action) => {
      state.address = action.payload;
    },
    addBio: (state, action) => {
      state.bio = action.payload;
    },
    addDob: (state, action) => {
      state.dob = action.payload;
    },
    addEducation: (state, action) => {
      state.education = action.payload;
    },
    addGender: (state, action) => {
      state.gender = action.payload;
    },
    addHeight: (state, action) => {
      state.height = action.payload;
    },
    addHowyoudie: (state, action) => {
      state.howyoudie = action.payload;
    },
    addIntension: (state, action) => {
      state.intension = action.payload;
    },
    addSexuality: (state, action) => {
      state.sexuality = action.payload;
    },
    addLiketoDate: (state, action) => {
      state.liketodate = action.payload;
    },
  },
});

export const {
  addAddress,
  addBio,
  addDob,
  addEducation,
  addGender,
  addHeight,
  addHowyoudie,
  addIntension,
  addLiketoDate,
  addSexuality,
  addUsername,
} = createUserSlice.actions;

export default createUserSlice;
