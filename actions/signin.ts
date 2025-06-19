import axios from "axios";

export const signin = async (email: string, password: string) => {
  const API_URL = "https://ghost.sumitjha.site/api/v1user";

  try {
    const res = await axios.post(
      `${API_URL}/signin`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res.data;
  } catch (err) {
    console.log("err", err);
  }
};
