import axios from "axios";
import * as SecureStorage from "expo-secure-store";

export const getUnMatchedUsers = async (page: number) => {
  const API_URL = "http://192.168.1.3:3000/api/v1/feed";
  const token = await SecureStorage.getItemAsync("userToken");
  console.log(token);

  const res = await axios.get(`${API_URL}/getUnMatchedFeed/${page}`, {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });

  return res.data;
};
