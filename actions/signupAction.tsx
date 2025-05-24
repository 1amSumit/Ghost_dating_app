import axios from "axios";
import { router } from "expo-router";

export const gnerateOtp = async (email: string) => {
  const API_URL = "http:// 192.168.1.2:3000/api/v1/user";

  try {
    const res = await axios.post(
      `${API_URL}/signup`,
      {
        email: email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.status) {
      throw new Error("otp not generated");
    }

    router.navigate("/(create)/otp");
  } catch (err) {
    console.log(err);
  }
};
