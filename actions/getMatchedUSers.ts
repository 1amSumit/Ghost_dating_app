import axios from "axios";
import * as SecureStorage from "expo-secure-store";

export const getMatchedUsers = async () => {
  const API_URL = "https://ghost.sumitjha.site/api/v1/match";
  const token = await SecureStorage.getItemAsync("userToken");

  const res = await axios.get(`${API_URL}/get-user-match`, {
    headers: {
      "Content-Type": "application/json",
      authorization: token,
    },
  });

  return res.data;
};
