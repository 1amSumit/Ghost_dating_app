import axios from "axios";
import * as SecureStorage from "expo-secure-store";

export const addToMatch = async (users: string[]) => {
  const API_URL = "https://ghost.sumitjha.site/api/v1match";
  const token = await SecureStorage.getItemAsync("userToken");

  const res = await axios.post(
    `${API_URL}/add-match`,
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
