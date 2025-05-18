import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function OtpInput() {
  const [otp, setOtp] = useState("");
  const otpLength = [0, 0, 0, 0, 0, 0];
  return (
    <View className="px-4">
      <View>
        <Text className="text-3xl font-cinzelBold">
          Enter your verification code
        </Text>
        <Text className="font-cinzel text-xs mt-4">send to youremail.com</Text>
      </View>
      <View className="mt-[10rem] flex flex-row gap-[1.5rem] items-center justify-center">
        {otpLength.map((el, i: number) => (
          <View key={i.toString()} className="flex flex-col">
            <TextInput
              maxLength={6}
              keyboardType="numeric"
              value={otp[i]}
              onChangeText={(text) => setOtp(text)}
              className="text-2xl font-cinzelBold"
            />
            <Pressable onPress={() => {}}>
              <View className="w-[40px] h-[3px] bg-gray-800"></View>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
}
