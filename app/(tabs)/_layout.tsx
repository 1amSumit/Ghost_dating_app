import TabBar from "@/components/TabBar";
import { Tabs } from "expo-router";

export default function RootLayout() {
  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="find" options={{ headerShown: false }} />
      <Tabs.Screen name="matches" options={{ headerShown: false }} />
      <Tabs.Screen name="profile" options={{ headerShown: false }} />
    </Tabs>
  );
}
