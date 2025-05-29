import { store } from "@/store/store";
import { Stack, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import "../globals.css";

export default function RootLayout() {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const token = await SecureStore.getItemAsync("token");
      const userToken = await SecureStore.getItemAsync("userToken");
      console.log(userToken);

      if (userToken) {
        router.replace("/(tabs)/find");
        return;
      }

      if (token) {
        router.replace("/(create)/username");
      } else {
        router.replace("/");
      }
    };

    checkUser();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack screenOptions={{ headerShown: false }} />
      </Provider>
    </SafeAreaView>
  );
}
