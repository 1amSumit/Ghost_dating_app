import { ImageSlot } from "@/components/AddImages";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

interface userObject {
  username: string;
  address: string;
  email: string;
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
  images: ImageSlot[];
  profilePic: string;
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

  const formData = new FormData();

  formData.append("userId", userID!);
  formData.append("email", userObject.email);
  formData.append("firstName", userObject.username.split(" ")[0]);
  formData.append("lastName", userObject.username.split(" ")[1] || " ");
  formData.append("gender", userObject.gender);
  formData.append("bio", userObject.bio);
  formData.append("dateOfBirth", userObject.dob);
  formData.append("location", userObject.address);

  formData.append("latitude", String(userObject.location.coords.latitude));
  formData.append("longitude", String(userObject.location.coords.longitude));
  formData.append("interestedInGender", userObject.liketodate);
  formData.append("prefered_min_age", "22");
  formData.append("prefered_max_age", "38");
  formData.append("max_distance", "80");
  formData.append("show_on_feed", "true");
  formData.append("is_ghost_mode", "false");
  formData.append("verified", "false");
  formData.append("height", userObject.height);
  formData.append("sexuality", userObject.sexuality);
  formData.append("howyoudie", userObject.howyoudie);
  formData.append("education", userObject.education);

  userObject.pronouns.forEach((p, i) => {
    formData.append(`pronounce[${i}]`, p.label);
  });

  formData.append("profile-pic", {
    uri: userObject.profilePic,
    name: `profile-pic-${userID}.jpg`,
    type: "image/jpeg",
  } as any);

  userObject.intension.forEach((intt, i) => {
    formData.append(`intensions[${i}]`, intt.label);
  });

  userObject.images.forEach((image, i) => {
    formData.append(`images`, {
      uri: image.uri,
      name: `image_${i}.jpg`,
      type: "image/jpeg",
    } as any);
  });

  try {
    const res = await axios.post(`${API_URL}/create-user`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data;
  } catch (err: any) {
    console.log(err.response.data);
    throw new Error(err.response.data.message);
  }
};
