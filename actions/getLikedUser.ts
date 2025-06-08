import axios from "axios";
import * as SecureStorage from "expo-secure-store";

export const getLikedUsers = async () => {
  const API_URL = "http://192.168.1.3:3000/api/v1/liked";
  const token = await SecureStorage.getItemAsync("userToken");

  const res = await axios.get(`${API_URL}/get-liked-users`, {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });

  return res.data;
};
