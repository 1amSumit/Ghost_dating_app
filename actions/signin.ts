import axios from "axios";

export const signin = async (email: string, password: string) => {
  const API_URL = "http://192.168.1.3:3000/api/v1/user";

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
  } catch (err: any) {
    throw new Error(err.response.data);
  }
};
