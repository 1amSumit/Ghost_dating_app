import CustomInput from "@/components/CustomInput";
import FloatingButton from "@/components/FloatingButton";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";

export default function Username() {
  const [username, setUsername] = useState<string>("");
  const router = useRouter();

  return (
    <View className=" relative flex-1 flex flex-col bg-gray-200 items-center pt-[6rem]">
      <View className="flex flex-col gap-4 items-center justify-center">
        <SimpleLineIcons name="ghost" size={40} color={"#C084FC"} />
        <Text className="text-gray-700 font-cinzelBold text-3xl">
          Join the Afterlife
        </Text>
      </View>
      <View className="mt-[3rem] flex flex-col gap-[2rem]">
        <Animated.View
          entering={SlideInLeft.duration(500)}
          className="flex flex-col"
        >
          <CustomInput
            label="Please provide your Username"
            value={username}
            placeholder="Bloody Marry"
            onChange={(text) => setUsername(text)}
          />
        </Animated.View>
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          active={username.trim().length > 5 ? true : false}
          onPress={() => {
            router.push("/(create)/email");
          }}
        />
      </View>
    </View>
  );
}
