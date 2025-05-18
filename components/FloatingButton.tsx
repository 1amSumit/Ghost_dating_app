import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function FloatingButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="relative w-[60px] h-[60px]  rounded-full bg-purple-700 flex flex-col items-center"
    >
      <FontAwesome
        className="absolute top-[53%] left-[53%] translate-x-[-50%] translate-y-[-50%]"
        name="chevron-right"
        size={28}
        color={"white"}
      />
    </TouchableOpacity>
  );
}
