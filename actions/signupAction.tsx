import axios from "axios";
import { router } from "expo-router";

export const generateOtp = async (email: string) => {
  const API_URL = "http://192.168.1.2:3000/api/v1/user";

  try {
    const res = await axios.post(
      `${API_URL}/signup`,
      { email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (res.status !== 200) {
      throw new Error("OTP not generated");
    }

    router.navigate("/(create)/password");
  } catch (err: any) {
    if (axios.isAxiosError(err)) {
      return err.response?.data;
    } else {
      console.log("Unexpected error:", err);
    }
  }
};
