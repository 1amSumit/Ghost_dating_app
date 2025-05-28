import FloatingButton from "@/components/FloatingButton";
import { addBio } from "@/store/createUserSlice";
import { RootState } from "@/store/store";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

export default function Bio() {
  const router = useRouter();
  const { bio } = useSelector((state: RootState) => state.createUserSlice);
  const dispatch = useDispatch();
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
                onChangeText={(text) => dispatch(addBio(text))}
                textAlignVertical="top"
                placeholder="Tell us about yourself..."
              />
            </View>
          </View>
        </Animated.View>
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          active={bio.trim().length > 0 ? true : false}
          onPress={() => {
            router.push("/(create)/address");
          }}
        />
      </View>
    </View>
  );
}
