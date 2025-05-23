import { Checkbox } from "expo-checkbox";
import React, { useState } from "react";
import { FlatList, Text, View } from "react-native";

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
        Which gender best describs you?
      </Text>

      <View className="mt-[3rem] flex flex-col gap-4">
        <FlatList
          data={sexualitiesData}
          renderItem={({ item }) => (
            <View className="flex flex-row justify-between">
              <Text className="font-cinzel">{item.label}</Text>
              <Checkbox
                value={item.label === sexuality}
                onValueChange={() => setSexuality(item.label)}
                color={sexuality ? "#7322ec" : ""}
              />
            </View>
          )}
          keyExtractor={(item) => item.label}
          ItemSeparatorComponent={() => <View className="h-[30px]" />}
          scrollEnabled
        />
      </View>
    </View>
  );
}
