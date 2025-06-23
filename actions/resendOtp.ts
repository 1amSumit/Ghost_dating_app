import axios from "axios";

export const resendOtp = async (email: string) => {
  const API_URL = "https://ghost-backend.sumitjha.site/api/v1/user";

  const res = await axios.post(
    `${API_URL}/resend-otp`,
    { email: email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
