import { addToMatch } from "@/actions/addToMach";
import { getLikedUsers } from "@/actions/getLikedUser";
import LikedUserComponent from "@/components/LikedUserComponent";
import { LickedUser } from "@/lib/types";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { SlideInDown } from "react-native-reanimated";

export default function Liked() {
  const [likedUsers, setLikedUsers] = useState<LickedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [likedUserIds, setLikedUserIds] = useState<string[]>([]);

  console.log(likedUsers.length);

  const handleLikedUser = (userid: string) => {
    setLikedUserIds((prev) => [...prev, userid]);
  };

  useEffect(() => {
    if (likedUserIds.length === 0) {
      return;
    } else {
      const interval = setInterval(async () => {
        try {
          const res = await addToMatch(likedUserIds);
          setLikedUserIds([]);
        } catch (err) {
          console.log(err);
        }
      }, 60 * 1000);

      return () => clearInterval(interval);
    }
  }, [likedUserIds]);

  useEffect(() => {
    const fliterLikedUser = likedUsers.filter((user) =>
      likedUserIds.includes(user.liked_by.user_details.user_id) ? false : true
    );

    setLikedUsers(fliterLikedUser);

    console.log(fliterLikedUser.length);
  }, [likedUserIds]);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      try {
        const res = await getLikedUsers();
        setLikedUsers(res.users);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={"large"} color="white" />
      </View>
    );
  }

  if (!likedUsers || likedUsers.length === 0) {
    return (
      <View className="px-2 flex-1 bg-black items-center justify-center">
        <Text className="text-xl text-purple-400 text-center font-cinzelBold">
          Apparently Love Is Still in the Coffin...
        </Text>
      </View>
    );
  }
  return (
    <View className="px-4   bg-black">
      <View className="pt-[3rem]  flex flex-col items-center justify-center">
        <FlatList
          showsVerticalScrollIndicator={false}
          data={likedUsers}
          contentContainerStyle={{ paddingBottom: 200 }}
          contentContainerClassName="bg-black"
          keyExtractor={(item) => item.liked_by.user_details.user_id}
          ItemSeparatorComponent={() => <View className="h-[50px]" />}
          className="w-full"
          ListHeaderComponent={
            <View className="mb-12">
              <Text className="text-gray-100 pt-4 font-cinzelBold text-2xl">
                You&apos;ve Haunted Their Heart
              </Text>
              <Text className="pt-1 font-cinzelBold text-sm text-gray-200">
                It wasn&apos;t a cold breeze... it was love.
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const currentDate = new Date();
            const userDateOfBirth = new Date(
              item.liked_by.user_details.date_of_birth
            );

            const age =
              currentDate.getFullYear() - userDateOfBirth.getFullYear();

            return (
              <GestureHandlerRootView>
                <Animated.View
                  entering={SlideInDown.duration(500)}
                  className="flex items-center justify-center"
                >
                  <LikedUserComponent
                    userId={item.liked_by.user_details.user_id}
                    pictures={item.liked_by.media.gallery}
                    firstName={item.liked_by.user_details.first_name}
                    lastName={item.liked_by.user_details.last_name}
                    age={age}
                    handleLikedUser={handleLikedUser}
                  />
                </Animated.View>
              </GestureHandlerRootView>
            );
          }}
        />
      </View>
    </View>
  );
}
