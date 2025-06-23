import axios from "axios";
import * as SecureStore from "expo-secure-store";
export const getLoggedInUserDetails = async () => {
  const API_URL = "https://ghost-backend.sumitjha.site/api/v1/user";
  const token = await SecureStore.getItemAsync("userToken");

  const res = await axios.get(`${API_URL}/getLoggedInUser`, {
    headers: {
      authorization: token,
      "Content-Type": "application/json",
    },
  });

  return res.data;
};
