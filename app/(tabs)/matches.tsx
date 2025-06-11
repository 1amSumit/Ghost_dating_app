import { getMatchedUsers } from "@/actions/getMatchedUSers";
import Profile from "@/components/Profile";
import SearchBox from "@/components/SearchBox";
import { MatchedUser } from "@/lib/types";
import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

const data = [
  { id: 1, name: "sumit", message: "hallo" },
  { id: 2, name: "sumit", message: "hallo" },
  { id: 3, name: "sumit", message: "hallo" },
  { id: 4, name: "sumit", message: "hallo" },
];

export default function Matches() {
  const [matchedUsers, setMatchedUsers] = useState<MatchedUser[]>([]);
  console.log(matchedUsers);

  useEffect(() => {
    const getUserMatched = async () => {
      try {
        const res = await getMatchedUsers();
        setMatchedUsers(res.matchedUsers);
      } catch (Err) {
        console.log(Err);
      }
    };
    getUserMatched();
  }, []);
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
        ItemSeparatorComponent={() => <View className="h-[30px]" />}
        data={matchedUsers}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Profile
            name={
              item.user_details.first_name + " " + item.user_details.last_name
            }
            lastMessage={item.user_details.gender}
            lastMessageTime="16 min"
            profile_pic={item.user_details.profile_pic}
          />
        )}
      />
    </View>
  );
}
