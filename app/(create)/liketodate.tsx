import FloatingButton from "@/components/FloatingButton";
import LikeToDateInput from "@/components/LikeToDateInput";
import { RootState } from "@/store/store";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useSelector } from "react-redux";

export default function Liketodate() {
  const { liketodate } = useSelector(
    (state: RootState) => state.createUserSlice
  );
  const router = useRouter();
  return (
    <View className=" relative flex-1 flex flex-col bg-gray-200 items-center pt-[6rem]">
      <View className="flex flex-col gap-4 ">
        <SimpleLineIcons name="ghost" size={40} color={"#C084FC"} />
      </View>
      <View className="mt-[3rem] flex flex-col gap-[2rem]">
        <Animated.View entering={SlideInLeft.duration(500)}>
          <LikeToDateInput />
        </Animated.View>
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          active={liketodate.length > 0 ? true : false}
          onPress={() => {
            router.push("/(create)/address");
          }}
        />
      </View>
    </View>
  );
}
