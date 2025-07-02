import axios from "axios";

export const verifyOtp = async (
  email: string,
  password: string,
  otp: string
) => {
  const API_URL = "http://192.168.1.3:3000/api/v1/user";

  try {
    const res = await axios.post(
      `${API_URL}/verify-otp`,
      { email, password, otp },
      { headers: { "Content-Type": "application/json" } }
    );

    return res.data;
  } catch (err: any) {
    console.log(err.response.data);
    throw new Error(err.response.data.message);
  }
};
