import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="username" />
      <Stack.Screen name="email" />
      <Stack.Screen name="password" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="dob" />
      <Stack.Screen name="location" />
      <Stack.Screen name="pronouns" />
      <Stack.Screen name="gender" />
      <Stack.Screen name="sexuality" />
      <Stack.Screen name="liketodate" />
      <Stack.Screen name="intension" />
      <Stack.Screen name="lookingfor" />
      <Stack.Screen name="height" />
      <Stack.Screen name="ethnicity" />
      <Stack.Screen name="hometown" />
      <Stack.Screen name="work" />
      <Stack.Screen name="education" />
      <Stack.Screen name="" />
    </Stack>
  );
}
