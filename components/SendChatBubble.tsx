import React from "react";
import { Text, View } from "react-native";

interface SendChatBubbleProps {
  message: string;
  time: string;
}

const SendChatBubble: React.FC<SendChatBubbleProps> = ({ message, time }) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const am_pm = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return (
    <View className="flex flex-col items-end gap-1">
      <Text className="text-white font-cinzel bg-[#6366F1] px-[1rem] py-[0.5rem] rounded-full">
        {message}
      </Text>
      <Text className="px-2 text-white text-[10px] font-cinzel">
        {formattedHours}:{formattedMinutes} {am_pm}
      </Text>
    </View>
  );
};

export default React.memo(SendChatBubble);
