import { AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Dimensions, Text, Vibration, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  Pressable,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import Image from "react-native-fast-image";

const LikedUserComponent = ({
  pictures,
  firstName,
  lastName,
  age,
  handleLikedUser,
  userId,
}: {
  pictures: string[];
  firstName: string;
  lastName: string;
  age: number;
  userId: string;
  handleLikedUser: (userId: string) => void;
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const translateX = useSharedValue(0);
  const [liked, setLiked] = useState(false);
  const scale = useSharedValue(1);

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

  useEffect(() => {
    if (liked) {
      scale.value = withSpring(1.3, { damping: 5 }, () => {
        scale.value = withSpring(1);
      });

      Vibration.vibrate(50);
    }
  }, [liked]);

  const animatedHeartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View className="relative overflow-hidden  h-[350px] w-[350px] rounded-[3rem]">
      <View className="absolute top-5 left-6 z-[10000] flex flex-row gap-2">
        <View className="rounded-xl border-[2px] border-orange-600 shadow-xl shadow-orange-700 w-10 h-10 overflow-hidden">
          <Image
            source={{ uri: pictures[1] }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="contain"
          />
        </View>
        <View className="flex flex-col ">
          <View className="flex flex-row gap-1">
            <Text className="font-cinzelBold text-white">{firstName}</Text>
            <Text className="font-cinzelBold text-white">{lastName}</Text>
          </View>
          <View>
            <Text className="font-cinzelBold text-sm text-white">
              {age} years
            </Text>
          </View>
        </View>
      </View>

      <View className="absolute bottom-10 z-[10000] right-10">
        <View className="flex items-center justify-center w-[50px] h-[50px]">
          <View>
            {!liked ? (
              <Pressable
                onPress={() => {
                  setLiked(true);
                  setTimeout(() => {
                    handleLikedUser(userId);
                  }, 600);
                }}
              >
                <Animated.View>
                  <AntDesign name="heart" size={40} color={"white"} />
                </Animated.View>
              </Pressable>
            ) : (
              <Pressable onPress={() => setLiked(false)}>
                <Animated.View style={animatedHeartStyle}>
                  <AntDesign name="heart" size={40} color={"black"} />
                </Animated.View>
              </Pressable>
            )}
          </View>
        </View>
      </View>

      <View className="absolute  bottom-10 z-[10000] left-10 flex flex-row gap-2">
        <View
          className={`${
            activeIndex === 0 ? "bg-purple-800 w-8" : "bg-gray-100 w-3"
          } h-3 rounded-full`}
        ></View>
        <View
          className={`${
            activeIndex === 1 ? "bg-purple-800 w-8" : "bg-gray-100 w-3"
          }  h-3 rounded-full`}
        ></View>
        <View
          className={`${
            activeIndex === 2 ? "bg-purple-800 w-8 " : "bg-gray-100 w-3"
          }  h-3 rounded-full`}
        ></View>
      </View>

      <GestureDetector gesture={panGesture}>
        <Animated.View style={[{ width: SCREEN_WIDTH }, animatedStyle]}>
          {pictures.map((picture, i) => (
            <View key={i} style={{ width: "100%", height: "100%" }}>
              <Image
                source={{ uri: picture }}
                style={{ width: "100%", height: "100%" }}
                resizeMode="cover"
              />
            </View>
          ))}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

export default React.memo(LikedUserComponent);
