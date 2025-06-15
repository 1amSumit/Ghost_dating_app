import TabBar from "@/components/TabBar";
import { Tabs, useFocusEffect } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { addToken } from "@/store/token";
import * as SecureStore from "expo-secure-store";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

export default function RootLayout() {
  const dispatch = useDispatch();
  useFocusEffect(
    useCallback(() => {
      const fetchToken = async () => {
        const logedInUser = await SecureStore.getItemAsync("userId");
        if (logedInUser) {
          dispatch(addToken(logedInUser));
        }
      };

      fetchToken();

      return () => {};
    }, [dispatch])
  );

  return (
    <SafeAreaView className="flex-1">
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen name="find" options={{ headerShown: false }} />
        <Tabs.Screen name="like" options={{ headerShown: false }} />
        <Tabs.Screen name="matches" options={{ headerShown: false }} />
        <Tabs.Screen name="profile" options={{ headerShown: false }} />
      </Tabs>
      <StatusBar backgroundColor={"black"} />
    </SafeAreaView>
  );
}
