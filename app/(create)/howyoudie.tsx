import FloatingButton from "@/components/FloatingButton";
import { addHowyoudie } from "@/store/createUserSlice";
import { RootState } from "@/store/store";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TextInput, View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

export default function Howyoudie() {
  const { howyoudie } = useSelector(
    (state: RootState) => state.createUserSlice
  );
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <View className=" relative flex-1 flex flex-col bg-gray-200 items-center pt-[6rem]">
      <View className="flex flex-col gap-4 ">
        <SimpleLineIcons name="ghost" size={40} color={"#C084FC"} />
      </View>
      <View className="mt-[3rem] flex flex-col gap-[2rem]">
        <Animated.View entering={SlideInLeft.duration(500)}>
          <View className="px-[1rem]">
            <Text className="text-2xl font-cinzelBold">
              Before love in the afterlife… how did you say goodbye to the
              living?
            </Text>

            <View className="mt-[4rem]">
              <TextInput
                multiline={true}
                className="border-[2px] h-[200px] placeholder:text-gray-600 border-gray-300 text-gray-900 font-cinzel"
                numberOfLines={4}
                value={howyoudie}
                placeholder="Tell us how you die."
                textAlignVertical="top"
                onChangeText={(text) => dispatch(addHowyoudie(text))}
              />
            </View>
          </View>
        </Animated.View>
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          active={howyoudie.trim().length > 0 ? true : false}
          onPress={() => {
            router.push("/(create)/education");
          }}
        />
      </View>
    </View>
  );
}
