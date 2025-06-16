import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const updateUser = async (userObject: any) => {
  const API_URL = "http://192.168.1.3:3000/api/v1/user";
  const token = await SecureStore.getItemAsync("userToken");
  const userID = await SecureStore.getItemAsync("token");
  const formData = new FormData();

  formData.append("firstName", userObject.username.split(" ")[0]);
  formData.append("lastName", userObject.username.split(" ")[1]);
  formData.append("bio", userObject.bio);
  formData.append("howyoudie", userObject.howyoudie);
  formData.append("location", userObject.address);
  formData.append("latitude", userObject.latitude.toString());
  formData.append("longitude", userObject.longitude.toString());
  formData.append("prefered_min_age", userObject.min_age.toString());
  formData.append("prefered_max_age", userObject.max_age.toString());
  formData.append("max_distance", userObject.max_distance.toString());
  formData.append("show_on_feed", userObject.showOnFeed.toString());
  formData.append("is_ghost_mode", userObject.ghostMode.toString());

  formData.append("image", {
    uri: userObject.profile_pic,
    name: `profile-pic-${userID}.jpg`,
    type: "image/jpeg",
  } as any);

  const res = await axios.put(`${API_URL}/update-user`, formData, {
    headers: {
      authorization: token,
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(res);

  return res.data;
};
