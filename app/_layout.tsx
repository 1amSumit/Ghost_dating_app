import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import "../globals.css";

export default function RootLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SafeAreaView>
  );
}
