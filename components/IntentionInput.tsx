import { addIntension } from "@/store/createUserSlice";
import { Checkbox } from "expo-checkbox";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useDispatch } from "react-redux";

export type Intension = {
  label: string;
  isChecked: boolean;
};

const initialIntentions: Intension[] = [
  { label: "Just looking around", isChecked: false },
  { label: "Looking for new friends", isChecked: false },
  { label: "Looking for something casual", isChecked: false },
  { label: "Open to short-term dating", isChecked: false },
  { label: "Long-term relationship", isChecked: false },
  { label: "Life partner / Marriage", isChecked: false },
  { label: "Exploring my sexuality", isChecked: false },
  { label: "Not sure yet", isChecked: false },
  { label: "Prefer not to say", isChecked: false },
  { label: "Polyamorous relationship", isChecked: false },
  { label: "Monogamous relationship", isChecked: false },
  { label: "Open relationship", isChecked: false },
  { label: "Emotional connection", isChecked: false },
  { label: "Flirting / Fun", isChecked: false },
  { label: "Serious commitment", isChecked: false },
];

export default function IntentionInput() {
  const [selectedIntentions, setSelectedIntention] =
    useState<Intension[]>(initialIntentions);
  const dispatch = useDispatch();

  const finalIntension = selectedIntentions.filter((int) => int.isChecked);
  useEffect(() => {
    dispatch(addIntension(finalIntension));
  }, [selectedIntentions]);

  return (
    <View className="px-[1rem]">
      <Text className="font-cinzelBold text-3xl">
        What&apos;s your dating intention?
      </Text>
      <View className="mt-[2rem] h-[70vh] pb-[7rem] px-[1rem]">
        <FlatList
          data={selectedIntentions}
          keyExtractor={(item) => item.label}
          ItemSeparatorComponent={() => <View className="h-[40px]" />}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View className="flex flex-row items-center justify-between">
              <Text className="font-cinzel">{item.label}</Text>
              <Checkbox
                color="#7322ec"
                value={item.isChecked}
                onValueChange={() => {
                  const updated = selectedIntentions.map((intention) =>
                    intention.label === item.label
                      ? { ...intention, isChecked: !intention.isChecked }
                      : intention
                  );
                  setSelectedIntention(updated);
                }}
              />
            </View>
          )}
        />
      </View>
    </View>
  );
}
