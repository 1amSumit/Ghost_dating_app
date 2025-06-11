import React from "react";
import { Text, View } from "react-native";
import ChatProfile from "./ChatProfile";

interface ProfileProp {
  name: string;
  lastMessage: string;
  lastMessageTime: string;
}

export default function Profile({
  name,
  lastMessage,
  lastMessageTime,
}: ProfileProp) {
  return (
    <View className="flex flex-row justify-between px-[1rem] items-center">
      <View className="flex flex-row gap-3 items-center ">
        <ChatProfile />
        <View className="flex flex-col gap-1">
          <Text className="font-cinzelBold text-gray-100 text-sm">{name}</Text>
          <Text className="font-cinzel text-gray-300 text-xs">
            {lastMessage}
          </Text>
        </View>
      </View>
      <View>
        <Text className="text-gray-400 font-cinzel text-xs ">
          {lastMessageTime}
        </Text>
      </View>
    </View>
  );
}
