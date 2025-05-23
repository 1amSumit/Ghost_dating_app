import { Checkbox } from "expo-checkbox";
import React from "react";
import { Text, View } from "react-native";

interface Props {
  label: string;
  value: string;
  fontSize: string;
  onValueChange: () => void;
}

export default function CustomCheckBox({
  label,
  value,
  onValueChange,
  fontSize = "text-lg",
}: Props) {
  return (
    <View className="flex flex-row justify-between">
      <Text className={`font-cinzel ${fontSize}`}>{label}</Text>
      <Checkbox
        value={label === value}
        onValueChange={onValueChange}
        color={"#7322ec"}
      />
    </View>
  );
}
