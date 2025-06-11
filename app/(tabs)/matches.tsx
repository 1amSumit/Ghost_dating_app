import Profile from "@/components/Profile";
import SearchBox from "@/components/SearchBox";
import { FlatList, Text, View } from "react-native";

const data = [
  { id: 1, name: "sumit", last_message: "hallo how are you" },
  { id: 2, name: "sumit", last_message: "hallo" },
  { id: 3, name: "sumit", last_message: "hallo" },
  { id: 4, name: "sumit", last_message: "hallo" },
  { id: 5, name: "sumit", last_message: "hallo" },
  { id: 6, name: "sumit", last_message: "hallo" },
];

export default function Matches() {
  return (
    <View className="bg-black flex-1 px-4 ">
      <View className="pt-[4rem] flex flex-row justify-between pb-[0.6rem]">
        <Text className="text-white font-cinzelBold text-xl">Messages</Text>
      </View>
      <FlatList
        ListHeaderComponent={
          <View className="">
            <View className="mt-4 mb-[1.5rem]">
              <SearchBox />
            </View>
          </View>
        }
        ItemSeparatorComponent={() => <View className="h-[10px]" />}
        data={data}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Profile
            name={item.name}
            lastMessage={item.last_message}
            lastMessageTime="16 min"
          />
        )}
      />
    </View>
  );
}
