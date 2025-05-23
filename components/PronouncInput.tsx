import { Checkbox } from "expo-checkbox";
import { useState } from "react";
import { Text, View } from "react-native";

const pronounsData = [
  { label: "she", isChecked: false },
  { label: "her", isChecked: false },
  { label: "hers", isChecked: false },
  { label: "he", isChecked: false },
  { label: "him", isChecked: false },
  { label: "his", isChecked: false },
  { label: "they", isChecked: false },
  { label: "them", isChecked: false },
  { label: "theirs", isChecked: false },
];

export default function PronouncInput() {
  const [pronouns, setPronouns] = useState(pronounsData);

  const togglePronouns = (i: number) => {
    const updatedPronons = pronouns.map((p, index) =>
      i === index ? { ...p, isChecked: !p.isChecked } : p
    );

    setPronouns(updatedPronons);
  };

  const selectedPronouns = pronouns.filter((p) => p.isChecked);

  return (
    <View className="px-[1rem]">
      <Text className="text-3xl font-cinzelBold">
        What&apos; your pronouns?
      </Text>

      <View className="mt-[2rem] flex flex-row gap-[1rem]">
        {selectedPronouns.map((p, i) => (
          <View
            key={i}
            className="bg-purple-400 px-3 py-2 rounded-full flex items-center justify-center"
          >
            <Text className="font-cinzel">{p.label}</Text>
          </View>
        ))}
      </View>

      <View className="mt-[2rem]">
        <Text className="font-cinzelBold text-sm ">Select up to 4</Text>
      </View>

      <View className="mt-[2rem] flex flex-col gap-4">
        {pronouns.map((pro, i) => (
          <View key={i} className="flex flex-row items-center justify-between">
            <Text className="font-cinzel text-xl">{pro.label}</Text>
            <Checkbox
              color={pro.isChecked ? "#7322ec" : ""}
              value={pro.isChecked}
              onValueChange={() => {
                const count = pronouns.filter((p) => p.isChecked).length;
                if (!pro.isChecked && count >= 4) return;
                togglePronouns(i);
              }}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
