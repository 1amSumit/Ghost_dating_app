import { createUser } from "@/actions/createUser";
import AddImages from "@/components/AddImages";
import FloatingButton from "@/components/FloatingButton";
import { resetCreateUser } from "@/store/createUserSlice";
import { RootState } from "@/store/store";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { ActivityIndicator, View } from "react-native";

import Animated, { SlideInLeft } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

export default function UploadImages() {
  const { email } = useSelector((state: RootState) => state.userReducer);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [imagesCount, setImagesCount] = useState(0);
  const dispatch = useDispatch();
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
    profilePic,
  } = useSelector((state: RootState) => state.createUserSlice);

  const handleSubmit = async () => {
    const userObject = {
      email,
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
      profilePic,
    };

    try {
      setLoading(true);
      const res = await createUser(userObject);
      await SecureStore.setItem("userToken", res.token);
      await SecureStore.setItem("userId", res.user.id);
      await SecureStore.setItem("user", JSON.stringify(res.user));
      dispatch(resetCreateUser());
      router.replace("/(tabs)/find");
    } catch (error) {
      console.log(error);
      await SecureStore.deleteItemAsync("userToken");
      await SecureStore.deleteItemAsync("userId");
      await SecureStore.deleteItemAsync("user");
      dispatch(resetCreateUser());
      router.replace("/");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={"purple"} size={"large"} />
      </View>
    );
  }
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
