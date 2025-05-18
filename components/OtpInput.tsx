import { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function OtpInput() {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    if (/^\d$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (text === "") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };
  return (
    <View className="px-4">
      <View>
        <Text className="text-3xl font-cinzelBold">
          Enter your verification code
        </Text>
        <Text className="font-cinzel text-xs mt-4">send to youremail.com</Text>
      </View>
      <View className="mt-[10rem] flex flex-row gap-[1.5rem] items-center justify-center">
        {otp.map((digit, i: number) => (
          <View key={i} className="flex flex-col items-center">
            <TextInput
              //@ts-ignore
              ref={(el) => (inputRefs.current[i] = el)}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, i)}
              className="text-2xl text-center w-[40px] h-[50px] font-cinzelBold border-b-[2px] border-gray-800"
            />
          </View>
        ))}
      </View>
    </View>
  );
}
