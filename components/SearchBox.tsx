import { Ionicons } from "@expo/vector-icons";
import { TextInput, View } from "react-native";

export default function SearchBox() {
  return (
    <View className="bg-stone-800 flex flex-row gap-4 items-center px-4 py-2 rounded-full">
      <Ionicons name="search" color={"#e6dede"} size={20} />
      <TextInput
        placeholder="search"
        className="bg-stone-800 font-cinzelBold "
      />
    </View>
  );
}
