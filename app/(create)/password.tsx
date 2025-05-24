import CustomInput from "@/components/CustomInput";
import FloatingButton from "@/components/FloatingButton";
import { RootState } from "@/store/store";
import { addPassword } from "@/store/userSlice";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

export default function Password() {
  const { password } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <View className=" relative flex-1 flex flex-col bg-gray-200 items-center pt-[6rem]">
      <View className="flex flex-col gap-4 items-center justify-center">
        <SimpleLineIcons name="ghost" size={40} color={"#C084FC"} />
      </View>
      <View className="mt-[3rem] flex flex-col gap-[2rem]">
        <Animated.View
          entering={SlideInLeft.duration(500)}
          className="flex flex-col"
        >
          <CustomInput
            label="Please provide your Passowrd"
            value={password}
            placeholder=""
            onChange={(text) => dispatch(addPassword(text))}
          />
        </Animated.View>
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          active={!password || password.trim().length < 6 ? false : true}
          onPress={() => {
            router.push("/(create)/otp");
          }}
        />
      </View>
    </View>
  );
}
