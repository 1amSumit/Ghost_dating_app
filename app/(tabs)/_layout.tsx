import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Tabs tabBar={(props) => <TabBar {...props} />}>
        <Tabs.Screen name="find" options={{ headerShown: false }} />
        <Tabs.Screen name="matches" options={{ headerShown: false }} />
        <Tabs.Screen name="profile" options={{ headerShown: false }} />
      </Tabs>
    </SafeAreaProvider>
  );
}