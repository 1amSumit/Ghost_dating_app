import { Text, TextInput, View } from "react-native";

interface CustomInputProps {
  placeholder: string | undefined;
  value: string;
  label: string;
  onChange: (text: string) => void;
}

export default function CustomInput({
  value,
  onChange,
  label,
  placeholder,
}: CustomInputProps) {
  return (
    <View className="px-4">
      <Text className=" w-full text-xl  font-cinzelBold text-gray-700">
        {label}
      </Text>
      <TextInput
        autoFocus={false}
        autoCorrect
        value={value}
        onChangeText={onChange}
        className=" w-[350px]  font-cinzelBold placeholder:font-cinzelBold text-lg placeholder:text-gray-500  text-gray-800  rounded-lg"
        placeholder={placeholder}
      />
      <View className="w-[350px]  h-[3px] bg-gray-600 rounded-full"></View>
    </View>
  );
}
