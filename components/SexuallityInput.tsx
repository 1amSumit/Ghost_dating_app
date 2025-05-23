import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";
import CustomCheckBox from "./CustomCheckBox";

const sexualitiesData = [
  { label: "Prefer not to say" },
  { label: "Straight" },
  { label: "Gay" },
  { label: "Lesbian" },
  { label: "Bisexual" },
  { label: "Pansexual" },
  { label: "Asexual" },
  { label: "Allosexual" },
  { label: "Demisexual" },
  { label: "Androsexual" },
  { label: "Gynosexual" },
  { label: "Queer" },
  { label: "Questioning" },
];

export default function SexuallityInput() {
  const [sexuality, setSexuality] = useState("");
  return (
    <View className="px-[1rem]">
      <Text className="text-3xl font-cinzelBold">
        What&apos; your sexuality?
      </Text>

      <View className="mt-[3rem] flex flex-col gap-4">
        <FlatList
          data={sexualitiesData}
          renderItem={({ item }) => (
            <CustomCheckBox
              value={sexuality}
              label={item.label}
              onValueChange={() => setSexuality(item.label)}
            />
          )}
          keyExtractor={(item) => item.label}
          ItemSeparatorComponent={() => <View className="h-[30px]" />}
          scrollEnabled
        />
      </View>
    </View>
  );
}
