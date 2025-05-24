import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function FloatingButton({
  onPress,
  active,
}: {
  onPress: () => void;
  active: boolean;
}) {
  return (
    <TouchableOpacity
      disabled={active === false}
      onPress={onPress}
      className={`relative w-[60px] h-[60px]  rounded-full ${
        active ? "bg-purple-700" : "bg-gray-300"
      } flex flex-col items-center`}
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
