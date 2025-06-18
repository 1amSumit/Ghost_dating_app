import { getMatchedUsers } from "@/actions/getMatchedUSers";
import Profile from "@/components/Profile";
import SearchBox from "@/components/SearchBox";
import { generateUSerID } from "@/lib/genRoomId";
import { MatchedUser } from "@/lib/types";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
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
    <LinearGradient
      colors={["#252123", "#7a235d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1  px-4"
    >
      <View className="mt-2 flex flex-row justify-between pb-[0.6rem]">
        <Text className="text-white font-cinzelBold text-xl ios:p-6">
          Messages
        </Text>
      </View>
      {matchedUsers.length > 0 && (
        <FlatList
          ListHeaderComponent={
            <View className="">
              <View className=" mt-4 mb-[1.5rem]">
                <SearchBox />
              </View>
            </View>
          }
          ItemSeparatorComponent={() => <View className="h-[30px]" />}
          data={matchedUsers}
          className="ios:px-6"
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
                  item.user_details.first_name +
                  " " +
                  item.user_details.last_name
                }
                lastMessage={item.user_details.gender}
                lastMessageTime="16 min"
                profile_pic={item.user_details.profile_pic}
              />
            </Pressable>
          )}
        />
      )}
      {matchedUsers.length === 0 && (
        <View className="flex-1 items-center justify-center">
          <Text className="text-purple-200 font-cinzelBold ">
            No Matched found to haunt!
          </Text>
        </View>
      )}
    </LinearGradient>
  );
}
