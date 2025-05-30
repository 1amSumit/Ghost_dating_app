import { generateOtp } from "@/actions/signupAction";
import CustomInput from "@/components/CustomInput";
import FloatingButton from "@/components/FloatingButton";
import { RootState } from "@/store/store";
import { addEmail } from "@/store/userSlice";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, ToastAndroid, View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

export default function Email() {
  const { email } = useSelector((state: RootState) => state.userReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmitEmail = async () => {
    setLoading(true);
    try {
      const res = await generateOtp(email);
      router.push("/(create)/password");
    } catch (err: any) {
      console.log(err.message);
      ToastAndroid.show("User Already Exists" + err, ToastAndroid.SHORT);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <View className="h-screen flex flex-col items-center justify-center">
        <ActivityIndicator size="large" color="#7322ec" />
      </View>
    );
  }

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
            label="Please provide your Email"
            value={email}
            placeholder="bloddymarry@ghostmail.com"
            onChange={(text) => dispatch(addEmail(text))}
          />
        </Animated.View>
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          active={!email || !email.includes("@") ? false : true}
          onPress={() => {
            handleSubmitEmail();
          }}
        />
      </View>
    </View>
  );
}
