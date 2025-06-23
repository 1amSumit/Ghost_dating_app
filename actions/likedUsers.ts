import axios from "axios";
import * as SecureStorage from "expo-secure-store";

export const likedUserToDb = async (users: string[]) => {
  const API_URL = "https://ghost-backend.sumitjha.site/api/v1/liked";
  const token = await SecureStorage.getItemAsync("userToken");

  const res = await axios.post(
    `${API_URL}/set-liked`,
    {
      users: users,
    },
    {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  );

  return res.data;
};
