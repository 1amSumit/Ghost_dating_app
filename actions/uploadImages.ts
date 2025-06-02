import { ImageSlot } from "@/components/AddImages";
import axios from "axios";
import * as SecureStore from "expo-secure-store";

export const uploadImages = async (pictures: ImageSlot[]) => {
  const API_URL = "http://192.168.1.3:3000/api/v1/upload";
  const token = await SecureStore.getItemAsync("userToken");

  const formData = new FormData();

  console.log(pictures);

  pictures.forEach((img, index) => {
    formData.append("images", {
      uri: img.uri,
      name: `image-${Date.now()}-${index}.jpg`,
      type: "image/jpeg",
    } as any);
  });

  const res = await axios.post(`${API_URL}/upload-images`, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: token,
    },
    body: formData,
  });

  return res.data;
};
