import React from "react";
import { Text, View } from "react-native";

export default function SendChatBubble({
  message,
  time,
}: {
  message: string;
  time: string;
}) {
  const messageDate = new Date(time).toLocaleString("IN");
  console.log(messageDate);
  const messageTime = time.split("T")[1];

  console.log(messageTime);

  return (
    <View className="flex felx-col items-end gap-1">
      <Text className="text-white font-cinzel bg-[#6366F1] px-[1rem] py-[0.5rem] rounded-full">
        {message}
      </Text>
      <Text className="px-2 text-white text-xs font-cinzel">{time}</Text>
    </View>
  );
}
