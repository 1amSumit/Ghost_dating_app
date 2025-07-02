import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const setSeenUsersToCache = async (users: string[]) => {
  const API_URL = "http://192.168.1.3:3000/api/v1/user";
  const token = await SecureStore.getItemAsync("userToken");

  try {
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
  } catch (err: any) {
    console.log(err.response.data);
    throw new Error(err.response.data.message);
  }
};
