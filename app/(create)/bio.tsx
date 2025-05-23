import FloatingButton from "@/components/FloatingButton";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";

export default function Bio() {
  const router = useRouter();
  const [bio, setBio] = useState("");
  return (
    <View className=" relative flex-1 flex flex-col bg-gray-200 items-center pt-[6rem]">
      <View className="flex flex-col gap-4 ">
        <SimpleLineIcons name="ghost" size={40} color={"#C084FC"} />
      </View>
      <View className="mt-[3rem] flex flex-col gap-[2rem]">
        <Animated.View entering={SlideInLeft.duration(500)}>
          <View className="px-[1rem]">
            <Text className="text-3xl font-cinzelBold">
              Ghost me only after reading this 👻
            </Text>
            <View className="mt-[4rem]">
              <TextInput
                className=" h-[300px] font-cinzel border-[2px] border-gray-300 rounded-lg"
                value={bio}
                onChangeText={setBio}
                textAlignVertical="top"
                placeholder="Tell us about yourself..."
              />
            </View>
          </View>
        </Animated.View>
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          onPress={() => {
            router.push("/(create)/bio");
          }}
        />
      </View>
    </View>
  );
}
