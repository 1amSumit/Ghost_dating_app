import CustomInput from "@/components/CustomInput";
import FloatingButton from "@/components/FloatingButton";
import { addProfilePic, addUsername } from "@/store/createUserSlice";
import { RootState } from "@/store/store";
import { SimpleLineIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

export default function Username() {
  const { username } = useSelector((state: RootState) => state.createUserSlice);
  const [pickedImage, setPickedImage] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const pickImageHandler = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      quality: 1,
    });

    if (!result.canceled) {
      dispatch(addProfilePic(result.assets[0].uri));
      setPickedImage(result.assets[0].uri);
    }
  };

  return (
    <ScrollView contentContainerClassName="items-center pt-[6rem] flex-1 flex-col bg-gray-200">
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
          <View className="flex items-center mb-[2rem]">
            <Pressable
              onPress={pickImageHandler}
              className="flex flex-col items-center justify-center"
            >
              <View className="w-[80px] h-[80px] bg-gray-200 rounded-full">
                {!pickedImage ? (
                  <Image
                    className="w-full h-full rounded-full"
                    source={require("@/assets/images/user.png")}
                  />
                ) : (
                  <Image
                    className="w-full h-full rounded-full"
                    resizeMode="cover"
                    source={{ uri: pickedImage }}
                  />
                )}
              </View>
              <Text className="font-cinzelBold mt-2 text-xs text-gray-900">
                Upload your profile pic
              </Text>
            </Pressable>
          </View>
          <CustomInput
            keyboardType="text"
            label="Please provide your Username"
            value={username}
            placeholder="Bloody Marry"
            onChange={(text) => dispatch(addUsername(text))}
          />
        </Animated.View>
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          active={username.trim().length > 5 && pickedImage ? true : false}
          onPress={() => {
            router.push("/(create)/dob");
          }}
        />
      </View>
    </ScrollView>
  );
}
