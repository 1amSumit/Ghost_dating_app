import { useState } from "react";
import { Text, View } from "react-native";

export default function Like() {
  const [likedUsers, setLikedUsers] = useState([]);

  if (likedUsers.length === 0) {
    return (
      <View className="px-2 flex-1 items-center justify-center">
        <Text className="text-xl text-purple-700 text-center font-cinzelBold">
          Apparently Love Is Still in the Coffin...
        </Text>
      </View>
    );
  }
  return (
    <View className="px-4">
      <View>
        <Text className="text-purple-900  mt-4 font-cinzelBold text-2xl">
          You’ve Haunted Their Heart
        </Text>
        <Text className="mt-1 font-cinzelBold text-sm text-purple-600">
          It wasn’t a cold breeze... it was love.
        </Text>
      </View>
    </View>
  );
}
