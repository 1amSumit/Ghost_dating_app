import axios from "axios";

export const generateOtp = async (email: string) => {
  const API_URL = "https://ghost.sumitjha.site/api/v1user";

  const res = await axios.post(
    `${API_URL}/signup`,
    { email },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return res.data;
};
