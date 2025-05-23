import React, { useState } from "react";
import { Text, View } from "react-native";
import CustomCheckBox from "./CustomCheckBox";

export default function EducationInput() {
  const [education, setEducation] = useState("");
  return (
    <View className="px-[1rem]">
      <Text className="text-3xl font-cinzelBold">
        What&apos; the highest level you attained?
      </Text>

      <View className="mt-[4rem] flex flex-col gap-[2rem]">
        <CustomCheckBox
          label="Secondary school"
          value={education}
          onValueChange={() => setEducation("Secondary school")}
          fontSize="text-2xl"
        />
        <CustomCheckBox
          label="Undergrad"
          value={education}
          onValueChange={() => setEducation("Undergrad")}
          fontSize="text-2xl"
        />
        <CustomCheckBox
          label="Postgrad"
          value={education}
          onValueChange={() => setEducation("Postgrad")}
          fontSize="text-2xl"
        />

        <CustomCheckBox
          label="Prefer not to say"
          value={education}
          onValueChange={() => setEducation("Prefer not to say")}
          fontSize="text-2xl"
        />
      </View>
    </View>
  );
}
