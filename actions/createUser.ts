import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface userObject {
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

export const createUser = async (userObject: userObject) => {
  const API_URL = "http://192.168.1.3:3000/api/v1/user";

  const userID = await SecureStore.getItemAsync("token");

  const res = await axios.post(
    `${API_URL}/create-user`,
    {
      userId: userID,
      firstName: userObject.username.split(" ")[0],
      lastName: userObject.username.split(" ")[1] || " ",
      gender: userObject.gender,
      bio: userObject.bio,
      dateOfBirth: userObject.dob,
      location: userObject.address,
      profilePic: "https//abc.xom/sumit",
      latitude: userObject.location.coords.latitude,
      longitude: userObject.location.coords.longitude,
      pronounce: userObject.pronouns.map((p) => p.label),
      interestedInGender: userObject.liketodate,
      intensions: userObject.intension.map((intt) => intt.label),
      prefered_min_age: 22,
      prefered_max_age: 38,
      max_distance: 80,
      show_on_feed: true,
      is_ghost_mode: false,
      verified: false,
      height: userObject.height,
      sexuality: userObject.sexuality,
      howyoudie: userObject.howyoudie,
      education: userObject.education,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
