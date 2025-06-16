import TabBar from "@/components/TabBar";
import { addToken } from "@/store/token";
import { addUserData } from "@/store/userData";
import { SplashScreen, Tabs } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";

export default function RootLayout() {
  const dispatch = useDispatch();

  useEffect(() => {
    const prepare = async () => {
      try {
        await SplashScreen.preventAutoHideAsync();

        const logedInUser = await SecureStore.getItemAsync("userId");
        const user = await SecureStore.getItemAsync("user");

        if (logedInUser) {
          dispatch(addToken(logedInUser));
        }

        if (user) {
          dispatch(addUserData(user));
        }

        await SplashScreen.hideAsync();
      } catch (err) {
        console.warn("Splash screen error:", err);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, [dispatch]);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen name="find" options={{ headerShown: false }} />
        <Tabs.Screen name="like" options={{ headerShown: false }} />
        <Tabs.Screen name="matches" options={{ headerShown: false }} />
        <Tabs.Screen name="profile" options={{ headerShown: false }} />
      </Tabs>
      <StatusBar backgroundColor="black" />
    </SafeAreaView>
  );
}
