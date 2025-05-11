import { FontAwesome5 } from "@expo/vector-icons";
import * as Font from "expo-font";
import { useEffect, useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    Font.loadAsync({
      CinzelDecorative: require("../assets/fonts/CinzelDecorative-Regular.ttf"),
      CinzelDecorativeBold: require("../assets/fonts/CinzelDecorative-Bold.ttf"),
      UnifrakturCook: require("../assets/fonts/UnifrakturCook-Bold.ttf"),
    }).then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) return null;
  return (
    <View className="flex-1 bg-purple-950 items-center justify-center">
      <StatusBar backgroundColor="#111827" barStyle="light-content" />

      <View className="items-center">
        <View className="w-[100px] h-[100px] bg-purple-500 flex flex-col items-center justify-center rounded-full">
          <FontAwesome5 name="ghost" size={50} color="white" />
        </View>
        <View className="mt-[2rem] flex flex-col items-center gap-4 justify-center">
          <Text className="text-4xl text-gray-100 font-cinzelBold">
            Ghosted
          </Text>
          <Text className="text-purple-200 text-2xl ">
            Dead. Single. Still picky.
          </Text>
        </View>

        <View className="mt-12">
          <TouchableOpacity
            onPress={() => {
              console.log("Pressed");
            }}
            className="bg-purple-500 flex flex-col items-center justify-center py-3  w-[250px] rounded-lg"
          >
            <Text className="text-gray-200 font-semibold">Get Started</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
