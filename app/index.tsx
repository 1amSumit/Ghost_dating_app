import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const router = useRouter();

  useEffect(() => {
    Font.loadAsync({
      CinzelDecorative: require("../assets/fonts/CinzelDecorative-Regular.ttf"),
      CinzelDecorativeBold: require("../assets/fonts/CinzelDecorative-Bold.ttf"),
      UnifrakturCook: require("../assets/fonts/UnifrakturCook-Bold.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;
  return (
    <View className="flex-1 relative bg-gray-200 items-center justify-center">
      <StatusBar backgroundColor="#111827" barStyle="light-content" />

      <View className="items-center">
        <View className="w-[80px] h-[80px] bg-purple-500 flex flex-col items-center justify-center rounded-full">
          <SimpleLineIcons name="ghost" size={40} color="white" />
        </View>
        <View className="mt-[2rem] flex flex-col items-center gap-4 justify-center">
          <Text className="text-4xl text-gray-700 font-cinzelBold">
            Ghosted
          </Text>
          <Text className="text-purple-700 text-2xl ">
            Dead. Single. Still picky.
          </Text>
        </View>
      </View>
      <View className="mt-12 absolute bottom-5 right-10 ">
        <TouchableOpacity
          onPress={() => {
            router.push("/signin");
          }}
          className="bg-purple-800  realtive  rounded-full w-[50px] h-[50px]"
        >
          <Ionicons
            className="absolute top-[50%] left-[53%] translate-x-[-50%] translate-y-[-50%]"
            name="chevron-forward"
            size={28}
            color="white"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
