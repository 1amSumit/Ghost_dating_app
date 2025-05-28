import { addGender } from "@/store/createUserSlice";
import { RootState } from "@/store/store";
import { Pressable, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function GenderInput() {
  const { gender } = useSelector((state: RootState) => state.createUserSlice);
  const dispatch = useDispatch();
  return (
    <View className="px-[1rem]">
      <Text className="text-3xl font-cinzelBold">
        Which gender best describs you?
      </Text>

      <View className="mt-[3rem] flex flex-col gap-4">
        <Pressable onPress={() => dispatch(addGender("MALE"))}>
          <Text
            className={`${
              gender === "MALE" ? "text-purple-500" : ""
            }  font-cinzel text-xl`}
          >
            Male
          </Text>
        </Pressable>
        <Pressable onPress={() => dispatch(addGender("FEMALE"))}>
          <Text
            className={`${
              gender === "FEMALE" ? "text-purple-500" : ""
            }  font-cinzel text-xl`}
          >
            Female
          </Text>
        </Pressable>
        <Pressable onPress={() => dispatch(addGender("OTHERS"))}>
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
