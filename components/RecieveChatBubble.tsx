import React from "react";
import { Text, View } from "react-native";

interface RecieveChatBubbleProps {
  message: string;
  time: string;
}

const RecieveChatBubble: React.FC<RecieveChatBubbleProps> = ({
  message,
  time,
}) => {
  const messageDate = new Date(time).toLocaleString();
  const messageTime = messageDate.split(",")[1].split(":");
  const hours = messageTime[0];
  const minute = messageTime[1];
  const am_pm = messageTime[2].split(" ")[1];

  return (
    <View className="flex flex-col items-start gap-1">
      <Text className="text-white font-cinzel bg-[#374151] px-[1rem] py-[0.5rem] rounded-full">
        {message}
      </Text>
      <Text className="px-2 text-white text-xs font-cinzel">
        {hours}:{minute} {am_pm}
      </Text>
    </View>
  );
};

export default React.memo(RecieveChatBubble);
