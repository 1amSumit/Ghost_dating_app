import { signin } from "@/actions/signin";
import CustomInput from "@/components/CustomInput";
import FloatingButton from "@/components/FloatingButton";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";

export default function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <View className="relative flex-1 px-[3rem] flex flex-col bg-gray-200 items-center pt-[6rem]">
      <View className="flex flex-col gap-4 items-center justify-center">
        <SimpleLineIcons name="ghost" size={40} color={"#C084FC"} />
        <Text className="text-gray-700 font-cinzelBold text-3xl">
          Welcome Back
        </Text>
      </View>
      <View className="mt-[3rem] flex flex-col gap-[2rem]">
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
              value="password"
              placeholder=""
              onChange={(text) => setPassword(text)}
            />
          </Animated.View>
        )}
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          onPress={() => {
            if (password.trim().length !== 0) {
              signin({ email, password });
            }

            if (!email || !email.includes("@")) {
              return;
            } else {
              setShowPassword(true);
            }
          }}
        />
      </View>
    </View>
  );
}
