import { FontAwesome, Fontisto, SimpleLineIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import Animated, { SlideInDown } from "react-native-reanimated";

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [signInClicked, setSignInClicked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Font.loadAsync({
      CinzelDecorative: require("../assets/fonts/CinzelDecorative-Regular.ttf"),
      CinzelDecorativeBold: require("../assets/fonts/CinzelDecorative-Bold.ttf"),
      UnifrakturCook: require("../assets/fonts/UnifrakturCook-Bold.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return <Text>Loading...</Text>;

  return (
    <View className="flex-1 bg-gray-200 items-center justify-between pt-[6rem] pb-[2rem]">
      <StatusBar backgroundColor="#111827" barStyle="light-content" />

      <View className="items-center">
        <View className="w-[80px] h-[80px] bg-purple-500 flex flex-col items-center justify-center rounded-full">
          <SimpleLineIcons name="ghost" size={40} color="white" />
        </View>
        <View className="mt-[2rem] flex flex-col items-center gap-4 justify-center">
          <Text className="text-4xl text-gray-700 font-cinzelBold">
            Ghosted
          </Text>
          <Text className="text-purple-700 text-2xl font-cinzel">
            Dead. Single. Still picky.
          </Text>
        </View>
      </View>
      {signInClicked === false && (
        <Animated.View
          entering={SlideInDown}
          className="mt-12 flex flex-col gap-3"
        >
          <TouchableOpacity
            onPress={() => {
              router.replace("/(create)/email");
            }}
            className="bg-purple-700  flex flex-col items-center justify-center py-5  w-[300px] rounded-full"
          >
            <Text className="text-gray-100 font-cinzel text-xl font-semibold">
              Create Account
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSignInClicked(true);
            }}
            className="   flex flex-col items-center justify-center  rounded-lg"
          >
            <Text className="text-purple-700 font-cinzel ">Sign in</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      {signInClicked && (
        <Animated.View
          entering={SlideInDown.duration(200)}
          className="mt-12 flex flex-col gap-3"
        >
          <TouchableOpacity
            onPress={() => {
              router.replace("/(create)/uploadImages");
            }}
            className="bg-white  flex flex-row items-center justify-center py-5  w-[300px] rounded-full gap-3"
          >
            <FontAwesome name="google" size={24} />
            <Text className="text-gray-700 font-cinzel text-lg font-semibold">
              Sign in with Google
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              router.replace("/signin");
            }}
            className="bg-purple-700  flex flex-row gap-3 items-center justify-center py-5  w-[300px] rounded-full"
          >
            <Fontisto name="email" size={24} color={"white"} />
            <Text className="text-white font-cinzel text-lg font-semibold">
              Sign in with email
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSignInClicked(false);
            }}
            className="  flex flex-col items-center justify-center pt-3  rounded-lg"
          >
            <Text className="text-purple-700 font-cinzel font-semibold">
              Back
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
}
