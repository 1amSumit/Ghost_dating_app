import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white" edges={["bottom"]}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(create)/username" />
        <Stack.Screen name="(create)/email" />
        <Stack.Screen name="(create)/password" />
        <Stack.Screen name="(create)/otp" />
        <Stack.Screen name="(create)/dob" />
        <Stack.Screen name="(create)/address" />
        <Stack.Screen name="(create)/pronouns" />
        <Stack.Screen name="(create)/gender" />
        <Stack.Screen name="(create)/sexuality" />
        <Stack.Screen name="(create)/liketodate" />
        <Stack.Screen name="(create)/intension" />
        <Stack.Screen name="(create)/height" />
        <Stack.Screen name="(create)/education" />
        <Stack.Screen name="(create)/howyoudie" />
        <Stack.Screen name="(create)/bio" />
        <Stack.Screen name="(create)/uploadImages" />
      </Stack>
      <StatusBar
        backgroundColor="white"
        barStyle="dark-content"
        translucent={false}
      />
    </SafeAreaView>
  );
}
