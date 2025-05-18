import FloatingButton from "@/components/FloatingButton";
import OtpInput from "@/components/OtpInput";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";

export default function Otp() {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  return (
    <View className=" relative flex-1 flex flex-col bg-gray-200 items-center pt-[6rem]">
      <View className="flex flex-col gap-4 ">
        <SimpleLineIcons name="ghost" size={40} color={"#C084FC"} />
      </View>
      <View className="mt-[3rem] flex flex-col gap-[2rem]">
        <Animated.View
          entering={SlideInLeft.duration(500)}
          className="flex flex-col"
        >
          <OtpInput />
        </Animated.View>
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          onPress={() => {
            if (!email || !email.includes("@")) {
              return;
            }
            router.push("/(create)/password");
          }}
        />
      </View>
    </View>
  );
}
