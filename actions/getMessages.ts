import axios from "axios";
import * as SecureStorage from "expo-secure-store";

export const getMessages = async (to_user: string | string[], page: number) => {
  const API_URL = "http://192.168.1.3:3000/api/v1/message";
  const token = await SecureStorage.getItemAsync("userToken");

  const res = await axios.get(
    `${API_URL}/get-users-message/${to_user}/${page}`,
    {
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    }
  );

  return res.data;
};
