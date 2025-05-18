import { router } from "expo-router";

export const signin = (formData: { email: string; password: string }) => {
  console.log(formData);

  router.navigate("/(tabs)/find");
};
