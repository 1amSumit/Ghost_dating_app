import { signin } from "@/actions/signin";
import CustomInput from "@/components/CustomInput";
import FloatingButton from "@/components/FloatingButton";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useState } from "react";
import { ActivityIndicator, Text, ToastAndroid, View } from "react-native";

import Animated, { SlideInLeft } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleSignin = async () => {
    setLoading(true);
    try {
      const res = await signin(email, password);
      await SecureStore.setItem("userToken", res.token);
      router.replace("/(tabs)/find");
    } catch (err) {
      console.log(err);
      ToastAndroid.show("Incorrect eamil or password", ToastAndroid.SHORT);
      router.replace("/");
    } finally {
      setLoading(true);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={"purple"} size={"large"} />
      </View>
    );
  }

  return (
    <SafeAreaView className="relative flex-1 px-[3rem] flex flex-col bg-gray-200 items-center pt-[6rem]">
      <View className="flex flex-col gap-4 items-center justify-center">
        <SimpleLineIcons name="ghost" size={40} color={"#C084FC"} />
        <Text className="text-gray-700 font-cinzelBold text-3xl">
          Welcome Back
        </Text>
      </View>
      <View className="mt-[4rem] flex flex-col gap-[2rem]">
        {showPassword === false && (
          <Animated.View
            entering={SlideInLeft.duration(500)}
            className="flex flex-col"
          >
            <CustomInput
              label="Provide your email"
              value={email}
              placeholder="bloodymarry@ghostmail.com"
              onChange={(text) => setEmail(text)}
            />
          </Animated.View>
        )}
        {showPassword && (
          <Animated.View
            entering={SlideInLeft.duration(500)}
            className="flex flex-col"
          >
            <CustomInput
              label="Provide your password"
              value={password}
              placeholder=""
              onChange={(text) => setPassword(text)}
            />
          </Animated.View>
        )}
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          active={true}
          onPress={() => {
            if (password.trim().length !== 0) {
              handleSignin();
            }

            if (!email || !email.includes("@")) {
              return;
            } else {
              setShowPassword(true);
            }
          }}
        />
      </View>
    </SafeAreaView>
  );
}
