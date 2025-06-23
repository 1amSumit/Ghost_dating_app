import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const setSeenUsersToCache = async (users: string[]) => {
  const API_URL = "https://ghost-backend.sumitjha.site/api/v1/user";
  const token = await SecureStore.getItemAsync("userToken");

  const res = await axios.post(
    `${API_URL}/seen-user`,
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
