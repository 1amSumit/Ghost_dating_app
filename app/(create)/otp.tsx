import { verifyOtp } from "@/actions/verifyOtp";
import FloatingButton from "@/components/FloatingButton";
import OtpInput from "@/components/OtpInput";
import { RootState } from "@/store/store";
import { SimpleLineIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { ToastAndroid, View } from "react-native";
import Animated, { SlideInLeft } from "react-native-reanimated";
import { useSelector } from "react-redux";

export default function Otp() {
  const router = useRouter();
  const { email, password, otp } = useSelector(
    (state: RootState) => state.userReducer
  );

  const handleOtp = async () => {
    try {
      const res = await verifyOtp(email, password, otp.join(""));
      ToastAndroid.show("User created successfully", ToastAndroid.SHORT);
      router.push("/(create)/username");
    } catch (err: any) {
      console.error(
        "OTP Verification Error:",
        err?.response?.data || err.message
      );
      ToastAndroid.show(
        err?.response?.data?.message || "Failed to verify OTP",
        ToastAndroid.SHORT
      );
    }
  };

  return (
    <View className=" relative flex-1 flex flex-col bg-gray-200 items-center pt-[6rem]">
      <View className="flex flex-col gap-4 ">
        <SimpleLineIcons name="ghost" size={40} color={"#C084FC"} />
      </View>
      <View className="mt-[3rem] flex flex-col gap-[2rem]">
        <Animated.View
          entering={SlideInLeft.duration(500)}
          className="flex flex-col"
        >
          <OtpInput />
        </Animated.View>
      </View>
      <View className="absolute bottom-5 right-10">
        <FloatingButton
          active={false}
          onPress={() => {
            handleOtp();
          }}
        />
      </View>
    </View>
  );
}
