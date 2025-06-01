import { Stack } from "expo-router";

export default function RootLayout() {
  return (
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
  );
}
