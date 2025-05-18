import FloatingButton from "@/components/FloatingButton";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function Signin() {
  const [email, setEmail] = useState<string>("");

  const router = useRouter();
  return (
    <View className="relative flex-1 flex flex-col bg-gray-200 items-center pt-[6rem]">
      <View className="flex flex-col gap-4 items-center justify-center">
        <SimpleLineIcons name="ghost" size={40} color={"#C084FC"} />
        <Text className="text-gray-700 font-cinzelBold text-3xl">
          Welcome Back
        </Text>
      </View>
      <View className="mt-[3rem] flex flex-col gap-[2rem]">
        <View className="flex flex-col">
          <TextInput
            autoFocus={false}
            autoCorrect
            value={email}
            onChangeText={setEmail}
            className=" w-[350px] font-cinzelBold text-2xl text-gray-500  rounded-lg"
            placeholder="john@example.com"
          />
          <View className="w-[350px]  h-[3px] bg-gray-600 rounded-full"></View>
        </View>
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          onPress={() => {
            console.log("pressed");
          }}
        />
      </View>
    </View>
  );
}
