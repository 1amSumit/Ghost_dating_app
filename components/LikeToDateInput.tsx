import React, { useState } from "react";
import { Text, View } from "react-native";
import CustomCheckBox from "./CustomCheckBox";

export default function LikeToDateInput() {
  const [selectDate, setSelectDate] = useState("");
  return (
    <View className="w-screen  ">
      <Text className="font-cinzelBold text-3xl px-[1rem]">
        Who would like to date?
      </Text>

      <View className="mt-[4rem] px-4 flex felx-col gap-4">
        <CustomCheckBox
          label="Men"
          value={selectDate}
          onValueChange={() => setSelectDate("Men")}
        />
        <CustomCheckBox
          label="Women"
          value={selectDate}
          onValueChange={() => setSelectDate("Women")}
        />
        <CustomCheckBox
          label="Non-binary people"
          value={selectDate}
          onValueChange={() => setSelectDate("Non-binary people")}
        />
        <CustomCheckBox
          label="Everyone"
          value={selectDate}
          onValueChange={() => setSelectDate("Everyone")}
        />
      </View>
    </View>
  );
}
