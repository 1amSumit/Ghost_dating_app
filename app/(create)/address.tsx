import { createUser } from "@/actions/createUser";
import FloatingButton from "@/components/FloatingButton";
import LocationInput from "@/components/LocationInput";
import { RootState } from "@/store/store";
import { SimpleLineIcons } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useSelector } from "react-redux";

export default function Address() {
  const {
    address,
    username,
    dob,
    bio,
    liketodate,
    howyoudie,
    location,
    education,
    height,
    intension,
    sexuality,
    gender,
    pronouns,
  } = useSelector((state: RootState) => state.createUserSlice);

  const handleSubmit = () => {
    const userObject = {
      address,
      username,
      dob,
      bio,
      liketodate,
      howyoudie,
      location,
      education,
      height,
      intension,
      sexuality,
      gender,
      pronouns,
    };

    createUser(userObject);
  };

  return (
    <View className=" relative flex-1 flex flex-col bg-gray-200 items-center pt-[6rem]">
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
            handleSubmit();
          }}
        />
      </View>
    </View>
  );
}
