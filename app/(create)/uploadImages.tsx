import { createUser } from "@/actions/createUser";
import AddImages from "@/components/AddImages";
import FloatingButton from "@/components/FloatingButton";
import { RootState } from "@/store/store";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useSelector } from "react-redux";

export default function UploadImages() {
  const router = useRouter();
  const [imagesCount, setImagesCount] = useState(0);
  const requiredImage = (count: number) => {
    setImagesCount(count);
  };
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
    images,
  } = useSelector((state: RootState) => state.createUserSlice);

  const handleSubmit = async () => {
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
      images,
    };

    try {
      const res = await createUser(userObject);
      await SecureStore.setItem("userToken", res.token);
      router.replace("/(tabs)/find");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View className=" relative flex-1 flex flex-col bg-gray-200 items-center pt-[6rem]">
      <View className="flex flex-col gap-4 ">
        <SimpleLineIcons name="ghost" size={40} color={"#C084FC"} />
      </View>
      <View className="mt-[3rem] flex flex-col gap-[2rem]">
        <Animated.View entering={SlideInLeft.duration(500)}>
          <AddImages getLength={(count: number) => requiredImage(count)} />
        </Animated.View>
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          active={imagesCount >= 3 ? true : false}
          onPress={() => {
            handleSubmit();
          }}
        />
      </View>
    </View>
  );
}
