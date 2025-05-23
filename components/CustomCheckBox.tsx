import { Checkbox } from "expo-checkbox";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  label: string;
  value: string;
  onValueChange: () => void;
}

export default function CustomCheckBox({ label, value, onValueChange }: Props) {
  return (
    <View className="flex flex-row justify-between">
      <Text className="font-cinzel">{label}</Text>
      <Checkbox
        value={label === value}
        onValueChange={onValueChange}
        color={"#7322ec"}
      />
    </View>
  );
}
