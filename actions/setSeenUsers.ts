import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const setSeenUsersToCache = async (users: string[]) => {
  const API_URL = "http://192.168.1.3:3000/api/v1/user";
  const token = await SecureStore.getItemAsync("userToken");

  console.log(users);

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
