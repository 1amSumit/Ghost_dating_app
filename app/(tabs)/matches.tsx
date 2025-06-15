import { getMatchedUsers } from "@/actions/getMatchedUSers";
import Profile from "@/components/Profile";
import SearchBox from "@/components/SearchBox";
import { generateUSerID } from "@/lib/genRoomId";
import { MatchedUser } from "@/lib/types";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useCallback, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";

export default function Matches() {
  const [matchedUsers, setMatchedUsers] = useState<MatchedUser[]>([]);

  const router = useRouter();
  const loggedInUserId = SecureStore.getItem("userToken");

  useFocusEffect(
    useCallback(() => {
      const getUserMatched = async () => {
        try {
          const res = await getMatchedUsers();
          setMatchedUsers(res.matchedUsers);
        } catch (err) {
          console.log(err);
        }
      };
      getUserMatched();
      return () => {};
    }, [])
  );

  return (
    <View className="bg-black flex-1 px-4 ">
      <View className="mt-2 flex flex-row justify-between pb-[0.6rem]">
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
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              router.push({
                pathname: "/chat/[chatId]",
                params: {
                  chatId: generateUSerID(
                    loggedInUserId!,
                    item.user_details.user_id
                  ),
                  name: item.user_details.first_name,
                  recieverUserId: item.user_details.user_id,
                },
              });
            }}
          >
            <Profile
              name={
                item.user_details.first_name + " " + item.user_details.last_name
              }
              lastMessage={item.user_details.gender}
              lastMessageTime="16 min"
              profile_pic={item.user_details.profile_pic}
            />
          </Pressable>
        )}
      />
    </View>
  );
}
