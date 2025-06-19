import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="username" />
        <Stack.Screen name="email" />
        <Stack.Screen name="password" />
        <Stack.Screen name="otp" />
        <Stack.Screen name="dob" />
        <Stack.Screen name="address" />
        <Stack.Screen name="pronouns" />
        <Stack.Screen name="gender" />
        <Stack.Screen name="sexuality" />
        <Stack.Screen name="liketodate" />
        <Stack.Screen name="intension" />
        <Stack.Screen name="height" />
        <Stack.Screen name="education" />
        <Stack.Screen name="howyoudie" />
        <Stack.Screen name="bio" />
        <Stack.Screen name="uploadImages" />
      </Stack>
      <StatusBar
        backgroundColor="#eee"
        barStyle="dark-content"
        translucent={false}
      />
    </SafeAreaView>
  );
}
