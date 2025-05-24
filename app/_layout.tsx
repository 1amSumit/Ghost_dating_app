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

      if (token) {
        router.replace("/(create)/username");
      } else {
        router.replace("/(create)/email");
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
