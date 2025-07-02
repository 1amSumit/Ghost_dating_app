import axios from "axios";
import * as SecureStore from "expo-secure-store";
export const getLoggedInUserDetails = async () => {
  const API_URL = "http://192.168.1.3:3000/api/v1/user";
  const token = await SecureStore.getItemAsync("userToken");

  try {
    const res = await axios.get(`${API_URL}/getLoggedInUser`, {
      headers: {
        authorization: token,
        "Content-Type": "application/json",
      },
    });

    return res.data;
  } catch (err: any) {
    console.log(err.response.data);
    throw new Error(err.response.data.message);
  }
};
