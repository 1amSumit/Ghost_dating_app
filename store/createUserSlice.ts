import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Location {
  coords: {
    latitude: number;
    longitude: number;
  };
}

interface IntensionItem {
  label: string;
  isChecked: boolean;
}
interface PronounsItem {
  label: string;
  isChecked: boolean;
}

interface CreateUserState {
  username: string;
  address: string;
  bio: string;
  dob: string;
  education: string;
  gender: string;
  height: string;
  howyoudie: string;
  intension: IntensionItem[];
  liketodate: string;
  sexuality: string;
  location: Location;
  pronouns: PronounsItem[];
}

const initialState: CreateUserState = {
  username: "",
  address: "",
  bio: "",
  dob: "",
  education: "",
  gender: "",
  height: "",
  howyoudie: "",
  intension: [],
  pronouns: [],
  liketodate: "",
  sexuality: "",
  location: {
    coords: {
      latitude: 0,
      longitude: 0,
    },
  },
};

const createUserSlice = createSlice({
  name: "createUser",
  initialState,
  reducers: {
    addUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    addAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    addBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload;
    },
    addDob: (state, action: PayloadAction<string>) => {
      state.dob = action.payload;
    },
    addEducation: (state, action: PayloadAction<string>) => {
      state.education = action.payload;
    },
    addGender: (state, action: PayloadAction<string>) => {
      state.gender = action.payload;
    },
    addHeight: (state, action: PayloadAction<string>) => {
      state.height = action.payload;
    },
    addHowyoudie: (state, action: PayloadAction<string>) => {
      state.howyoudie = action.payload;
    },
    addIntension: (state, action: PayloadAction<IntensionItem[]>) => {
      state.intension = action.payload;
    },
    addPronouns: (state, action: PayloadAction<PronounsItem[]>) => {
      state.pronouns = action.payload;
    },
    addLiketoDate: (state, action: PayloadAction<string>) => {
      state.liketodate = action.payload;
    },
    addSexuality: (state, action: PayloadAction<string>) => {
      state.sexuality = action.payload;
    },
    addLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload;
    },
  },
});

export const {
  addUsername,
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
  addPronouns,
  addLocation,
} = createUserSlice.actions;

export default createUserSlice;
