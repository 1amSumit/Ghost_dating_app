import { addHeight } from "@/store/createUserSlice";
import { RootState } from "@/store/store";
import React from "react";
import { Text, View } from "react-native";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import { useDispatch, useSelector } from "react-redux";

export default function HeightInput() {
  const { height } = useSelector((state: RootState) => state.createUserSlice);
  const dispatch = useDispatch();

  const heightOptions = Array.from({ length: 49 }, (_, i) => {
    const totalInches = i + 36;
    const feet = Math.floor(totalInches / 12);
    const inches = totalInches % 12;
    return `${feet}'${inches}"`;
  });

  return (
    <View className="w-screen h-full px-[2rem] py-[2rem]">
      <Text className="font-cinzelBold text-3xl mb-[2rem]">
        How tall are you?
      </Text>

      <ScrollPicker
        dataSource={heightOptions}
        selectedIndex={heightOptions.indexOf(height)}
        renderItem={(data: string, index: number) => (
          <View className="items-center">
            <Text className="text-xl font-cinzelBold">{data}</Text>
          </View>
        )}
        //@ts-ignore
        onValueChange={(value: string, index: number) => {
          dispatch(addHeight(value));
        }}
        wrapperHeight={180}
        wrapperBackground="#e5e7eb"
        itemHeight={80}
        highlightColor="#7322ec"
        highlightBorderWidth={2}
      />
    </View>
  );
}
