import { addLiketoDate } from "@/store/createUserSlice";
import { RootState } from "@/store/store";
import React from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomCheckBox from "./CustomCheckBox";

export default function LikeToDateInput() {
  const { liketodate } = useSelector(
    (state: RootState) => state.createUserSlice
  );

  const dispatch = useDispatch();
  return (
    <View className="w-screen  ">
      <Text className="font-cinzelBold text-3xl px-[1rem]">
        Who would like to date?
      </Text>

      <View className="mt-[4rem] px-4 flex felx-col gap-4">
        <CustomCheckBox
          fontSize="text-xl"
          label="Men"
          value={liketodate}
          onValueChange={() => dispatch(addLiketoDate("Men"))}
        />
        <CustomCheckBox
          label="Women"
          fontSize="text-xl"
          value={liketodate}
          onValueChange={() => dispatch(addLiketoDate("Women"))}
        />
        <CustomCheckBox
          label="Non-binary people"
          fontSize="text-xl"
          value={liketodate}
          onValueChange={() => dispatch(addLiketoDate("Non-binary people"))}
        />
        <CustomCheckBox
          label="Everyone"
          fontSize="text-xl"
          value={liketodate}
          onValueChange={() => dispatch(addLiketoDate("Everyone"))}
        />
      </View>
    </View>
  );
}
