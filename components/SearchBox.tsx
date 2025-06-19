import { Ionicons } from "@expo/vector-icons";
import { Dimensions, TextInput, View } from "react-native";

export default function SearchBox() {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View className="bg-stone-800  flex flex-row gap-4 items-center ios:px-4 ios:py-2 px-4 py-2 rounded-full border-[1px] border-gray-300 w-full">
      <Ionicons name="search" color={"#e6dede"} size={20} />
      <TextInput
        placeholder="search"
        className="bg-stone-800 font-cinzelBold "
        style={{ width: screenWidth - 100 }}
      />
    </View>
  );
}
