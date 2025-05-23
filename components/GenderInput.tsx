import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function GenderInput() {
  const [gender, setGender] = useState("");
  return (
    <View className="px-[1rem]">
      <Text className="text-3xl font-cinzelBold">
        Which gender best describs you?
      </Text>

      <View className="mt-[3rem] flex flex-col gap-4">
        <Pressable onPress={() => setGender("MALE")}>
          <Text
            className={`${
              gender === "MALE" ? "text-purple-500" : ""
            }  font-cinzel text-xl`}
          >
            Male
          </Text>
        </Pressable>
        <Pressable onPress={() => setGender("FEMALE")}>
          <Text
            className={`${
              gender === "FEMALE" ? "text-purple-500" : ""
            }  font-cinzel text-xl`}
          >
            Female
          </Text>
        </Pressable>
        <Pressable onPress={() => setGender("OTHERS")}>
          <Text
            className={`${
              gender === "OTHERS" ? "text-purple-500" : ""
            }  font-cinzel text-xl`}
          >
            Non Binary
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
