import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

import { useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  Pressable,
  Text,
  View,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  SlideInDown,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface DisplayuserProps {
  firstName: string;
  lastName: string;
  location: string;
  interests: string[];
  pictures: string[];
  updateCurrentIndex: () => void;
}

export default function DisplayUser({
  firstName,
  lastName,
  location,
  interests,
  pictures,
  updateCurrentIndex,
}: DisplayuserProps) {
  const [loading, setLoading] = useState(false);
  const translateX = useSharedValue(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const { width: SCREEN_WIDTH } = Dimensions.get("window");

  const clampIndex = (index: number) => {
    "worklet";
    return Math.max(0, Math.min(pictures.length - 1, index));
  };

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = -activeIndex * SCREEN_WIDTH + e.translationX;
    })
    .onEnd((e) => {
      const nextIndex =
        e.translationX < -50
          ? clampIndex(activeIndex + 1)
          : e.translationX > 50
          ? clampIndex(activeIndex - 1)
          : activeIndex;

      translateX.value = withSpring(-nextIndex * SCREEN_WIDTH, {
        damping: 20,
        stiffness: 100,
      });

      runOnJS(setActiveIndex)(nextIndex);
    });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
      flexDirection: "row",
    };
  });

  return (
    <View>
      <View
        className={`relative overflow-hidden bg-gray-300 h-[500px] w-[350px] rounded-[3rem] shadow-2xl shadow-purple-600`}
      >
        <View className="flex flex-row gap-2 mx-[1rem] z-[10000] w-[100px] h-[10px] absolute top-5 left-0">
          <View
            className={`${
              activeIndex === 0 ? "bg-purple-800" : "bg-gray-100"
            } w-4 h-4 rounded-full`}
          ></View>
          <View
            className={`${
              activeIndex === 1 ? "bg-purple-800" : "bg-gray-100"
            } w-4 h-4 rounded-full`}
          ></View>
          <View
            className={`${
              activeIndex === 2 ? "bg-purple-800" : "bg-gray-100"
            } w-4 h-4 rounded-full`}
          ></View>
        </View>
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[{ flex: 1, width: SCREEN_WIDTH }, animatedStyle]}
          >
            {pictures.map((picture, i) => (
              <View key={i} style={{ width: SCREEN_WIDTH, height: "100%" }}>
                <Image
                  source={{ uri: picture }}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="cover"
                  onLoadStart={() => setLoading(true)}
                  onLoadEnd={() => setLoading(false)}
                />
                {loading && (
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#00000040",
                    }}
                  >
                    <ActivityIndicator size="large" color="purple" />
                  </View>
                )}
              </View>
            ))}
          </Animated.View>
        </GestureDetector>

        {!loading && (
          <Animated.View
            entering={SlideInDown.duration(500)}
            className="absolute bottom-0 p-2 right-0 left-0 backdrop-blur-2xl bg-gray-800/30  px-[1.4rem] gap-[2px]"
          >
            <View className="flex flex-row gap-2 items-center ">
              <FontAwesome5 name="map-marker-alt" size={20} color="white" />
              <Text className="font-cinzelBold text-white">{location}</Text>
            </View>
            <Text className="font-cinzelBold text-3xl text-white ">
              {firstName} {lastName}
            </Text>
            <View className="flex flex-row gap-[8px]">
              {interests.map((inter, i) => (
                <View
                  key={i.toString()}
                  className="bg-purple-900 px-2 py-1 rounded-full"
                >
                  <Text className="text-gray-100">{inter}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        )}
      </View>

      <View className="w-[350px] h-[100px]  mt-[1.8rem] rounded-full flex flex-row justify-between px-[4px] py-[4px]">
        <Pressable
          disabled={loading}
          onPress={() => {
            updateCurrentIndex();
            setActiveIndex(0);
          }}
          className="flex items-center border-[1px] border-purple-300 justify-center bg-gray-100 w-[170px] rounded-full"
        >
          <AntDesign name="close" size={24} color="black" />
        </Pressable>
        <Pressable
          disabled={loading}
          onPress={() => {
            updateCurrentIndex();
            setActiveIndex(0);
          }}
          className="flex items-center justify-center bg-purple-700 w-[170px] rounded-full"
        >
          <AntDesign name="hearto" size={24} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
