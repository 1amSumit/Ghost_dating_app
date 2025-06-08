import React, { useState } from "react";
import { Dimensions, Image, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function LikedUserComponent({
  pictures,
}: {
  pictures: string[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const SCREEN_WIDTH = Dimensions.get("window").width;
  const translateX = useSharedValue(0);

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
    <View className="relative overflow-hidden  h-[300px] w-[350px] rounded-[3rem]">
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
}
