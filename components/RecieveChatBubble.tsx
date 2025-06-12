import React from "react";
import { Text, View } from "react-native";

export default function RecieveChatBubble({
  message,
  time,
}: {
  message: string;
  time: string;
}) {
  return (
    <View className="flex felx-col items-start gap-1">
      <Text className="text-white font-cinzel bg-[#374151] px-[1rem] py-[0.5rem] rounded-full">
        {message}
      </Text>
      <Text className="px-2 text-white text-xs font-cinzel">{time}</Text>
    </View>
  );
}
