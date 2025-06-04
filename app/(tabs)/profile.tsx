import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Pressable, Text, View } from "react-native";

export default function Profile() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center">
      <Pressable
        onPress={async () => {
          await SecureStore.deleteItemAsync("token");
          await SecureStore.deleteItemAsync("userToken");
          router.replace("/");
        }}
        className="text-xl font-cinzelBold text-gray-800"
      >
        <Text>Log out</Text>
        <Text>{}</Text>
      </Pressable>
    </View>
  );
}
