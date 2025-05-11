import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Signin() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  return (
    <View className="flex-1 flex flex-col bg-gray-800 items-center justify-center">
      <View className="flex flex-col gap-4 items-center justify-center">
        <SimpleLineIcons name="ghost" size={40} color={"#C084FC"} />
        <Text className="text-gray-100 font-cinzelBold text-3xl">
          Welcome Back
        </Text>
      </View>
      <View className="mt-[3rem] flex flex-col gap-[2rem]">
        <View className="flex flex-col gap-2 ">
          <Text className="text-[#C084FC] text-md px-2">Email</Text>
          <TextInput
            autoFocus={false}
            autoCorrect
            value={email}
            onChangeText={setEmail}
            className="bg-gray-700 w-[300px] px-4 py-4 rounded-lg"
          />
        </View>
        <View className="flex flex-col gap-2 ">
          <Text className="text-[#C084FC] text-md px-2">Password</Text>
          <TextInput
            value={password}
            autoFocus={false}
            autoCorrect
            onChangeText={setPassword}
            className="bg-gray-700 w-[300px] px-4 py-4 rounded-lg"
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log("signup pressed");
          }}
          className="w-[300px] rounded-lg bg-[#c084fc] flex flex-col items-center"
        >
          <Text className="text-md font-bold py-3 text-gray-200 ">Log in</Text>
        </TouchableOpacity>

        <View>
          <View className="flex flex-row gap-2 w-[300px] items-center justify-center">
            <View className="bg-gray-400 h-[1px] w-[120px]"></View>
            <Text className="text-gray-400">or</Text>
            <View className="bg-gray-400 h-[1px] w-[120px]"></View>
          </View>
        </View>
        <View className="mt-[1.5rem]">
          <TouchableOpacity
            onPress={() => {
              console.log("google pressed");
            }}
            className="w-[300px] rounded-lg bg-black flex flex-col items-center"
          >
            <View className="flex flex-row gap-3 items-center justify-center">
              <SimpleLineIcons name="ghost" size={20} color="white" />
              <Text className="text-sm font-bold py-3 text-gray-200 ">
                Sign in with Google
              </Text>
            </View>
          </TouchableOpacity>

          <Pressable
            onPress={() => {
              router.push("/find");
            }}
            className="mt-6"
          >
            <Text className="text-[#c084fc] text-center">
              New ghost? Sign up here
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
