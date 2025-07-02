import FloatingButton from "@/components/FloatingButton";
import LocationInput from "@/components/LocationInput";
import { RootState } from "@/store/store";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useSelector } from "react-redux";

export default function Address() {
  const router = useRouter();
  const { address } = useSelector((state: RootState) => state.createUserSlice);

  return (
    <ScrollView contentContainerClassName="items-center pt-[6rem] flex-1 flex-col bg-gray-200">
      <View className="flex flex-col gap-4 ">
        <SimpleLineIcons name="ghost" size={40} color={"#C084FC"} />
      </View>
      <View className="mt-[3rem] flex flex-col gap-[2rem]">
        <Animated.View entering={SlideInLeft.duration(500)}>
          <LocationInput />
        </Animated.View>
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          active={address.trim().length > 0 ? true : false}
          onPress={() => {
            router.push("/(create)/uploadImages");
          }}
        />
      </View>
    </ScrollView>
  );
}
