import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const updateUser = async (userObject: any) => {
  const API_URL = "http://192.168.1.3:3000/api/v1/user";
  const token = await SecureStore.getItemAsync("userToken");
  const userID = await SecureStore.getItemAsync("userId");
  const formData = new FormData();

  if (userObject.username !== undefined)
    formData.append("firstName", userObject.username.split(" ")[0]);
  if (userObject.username !== undefined)
    formData.append("lastName", userObject.username.split(" ")[1]);
  if (userObject.bio !== undefined) formData.append("bio", userObject.bio);
  if (userObject.howyoudie !== undefined)
    formData.append("howyoudie", userObject.howyoudie);
  if (userObject.address !== undefined)
    formData.append("location", userObject.address);
  if (userObject.latitude !== undefined)
    formData.append("latitude", userObject.latitude.toString());
  if (userObject.longitude !== undefined)
    formData.append("longitude", userObject.longitude.toString());
  if (userObject.minAge !== undefined)
    formData.append("prefered_min_age", userObject.minAge.toString());
  if (userObject.maxAge !== undefined)
    formData.append("prefered_max_age", userObject.maxAge.toString());
  if (userObject.maxDistance !== undefined)
    formData.append("max_distance", userObject.maxDistance.toString());
  if (userObject.showOnFeed !== undefined)
    formData.append("show_on_feed", userObject.showOnFeed.toString());
  if (userObject.ghostMode !== undefined)
    formData.append("is_ghost_mode", userObject.ghostMode.toString());

  if (userObject.profilePic !== undefined)
    formData.append("image", {
      uri: userObject.profilePic,
      name: `profile-pic-${userID}.jpg`,
      type: "image/jpeg",
    } as any);

  const res = await axios.put(`${API_URL}/update-user`, formData, {
    headers: {
      authorization: token,
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};
