import { RootState } from "@/store/store";
import React from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomCheckBox from "./CustomCheckBox";
import { addEducation } from "@/store/createUserSlice";

export default function EducationInput() {
  const { education } = useSelector(
    (state: RootState) => state.createUserSlice
  );
  const dispatch = useDispatch();
  return (
    <View className="px-[1rem]">
      <Text className="text-3xl font-cinzelBold">
        What&apos; the highest level you attained?
      </Text>

      <View className="mt-[4rem] flex flex-col gap-[2rem]">
        <CustomCheckBox
          label="Secondary school"
          value={education}
          onValueChange={() => dispatch(addEducation("Secondary school"))}
          fontSize="text-2xl"
        />
        <CustomCheckBox
          label="Undergrad"
          value={education}
          onValueChange={() => dispatch(addEducation("Undergrad"))}
          fontSize="text-2xl"
        />
        <CustomCheckBox
          label="Postgrad"
          value={education}
          onValueChange={() => dispatch(addEducation("Postgrad"))}
          fontSize="text-2xl"
        />

        <CustomCheckBox
          label="Prefer not to say"
          value={education}
          onValueChange={() => dispatch(addEducation("Prefer not to say"))}
          fontSize="text-2xl"
        />
      </View>
    </View>
  );
}
