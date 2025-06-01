import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface DisplayuserProps {
  firstName: string;
  lastName: string;
  location: string;
  interests: string[];
}

export default function DisplayUser({
  firstName,
  lastName,
  location,
  interests,
}: DisplayuserProps) {
  return (
    <View>
      <View className="relative bg-gray-300 h-[500px] w-[350px] rounded-3xl shadow-2xl shadow-purple-600 ">
        <View className="absolute bottom-[10px] right-0 left-0  mx-[1rem] gap-[2px]">
          <View className="flex flex-row gap-2 items-center ">
            <FontAwesome5 name="map-marker-alt" size={20} color="black" />
            <Text className="font-cinzel">{location}</Text>
          </View>
          <Text className="font-cinzelBold text-3xl ">
            {firstName} {lastName}
          </Text>
          <View className="flex flex-row gap-[8px]">
            {interests.map((inter, i) => (
              <View
                key={i.toString()}
                className="bg-purple-900 px-2 py-1 rounded-full"
              >
                <Text className="text-gray-100">{inter}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="w-[350px] h-[100px]  mt-[1.8rem] rounded-full flex flex-row justify-between px-[4px] py-[4px]">
        <View className="flex items-center border-[1px] border-purple-300 justify-center bg-gray-100 w-[170px] rounded-full">
          <AntDesign name="close" size={24} color="black" />
        </View>
        <View className="flex items-center justify-center bg-purple-700 w-[170px] rounded-full">
          <AntDesign name="hearto" size={24} color="white" />
        </View>
      </View>
    </View>
  );
}
