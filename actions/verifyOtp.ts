import axios from "axios";

export const verifyOtp = async (
  email: string,
  password: string,
  otp: string
) => {
  const API_URL = "https://ghost.sumitjha.site/api/v1user";

  const res = await axios.post(
    `${API_URL}/verify-otp`,
    { email, password, otp },
    { headers: { "Content-Type": "application/json" } }
  );

  return res.data;
};
