import { addToMatch } from "@/actions/addToMach";
import { getLikedUsers } from "@/actions/getLikedUser";
import LikedUserComponent from "@/components/LikedUserComponent";
import { LickedUser } from "@/lib/types";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { SlideInDown } from "react-native-reanimated";

export default function Liked() {
  const [likedUsers, setLikedUsers] = useState<LickedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [likedUserIds, setLikedUserIds] = useState<string[]>([]);

  const handleLikedUser = (userid: string) => {
    setLikedUserIds((prev) => [...prev, userid]);
  };

  useFocusEffect(
    useCallback(() => {
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
        }, 1000);

        return () => clearInterval(interval);
      }
    }, [likedUserIds])
  );

  useFocusEffect(
    useCallback(() => {
      const fliterLikedUser = likedUsers.filter((user) =>
        likedUserIds.includes(user.liked_by.user_details.user_id) ? false : true
      );

      setLikedUsers(fliterLikedUser);

      return () => {};
    }, [likedUserIds])
  );

  useFocusEffect(
    useCallback(() => {
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
      return () => {};
    }, [])
  );

  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator size={"large"} color="purple" />
      </View>
    );
  }

  if (!likedUsers || likedUsers.length === 0) {
    return (
      <LinearGradient
        colors={["#252123", "#7a235d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1  px-4"
      >
        <View className="px-2  flex-1 items-center justify-center">
          <Text className="text-xl  text-purple-200 text-center font-cinzelBold">
            Apparently Love Is Still in the Coffin...
          </Text>
        </View>
      </LinearGradient>
    );
  }
  return (
    <LinearGradient
      colors={["#252123", "#7a235d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1  px-4"
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={likedUsers}
        contentContainerStyle={{ paddingBottom: 200 }}
        keyExtractor={(item) => item.liked_by.user_details.user_id}
        ItemSeparatorComponent={() => <View className="h-[100px]" />}
        className="w-full bg-none"
        ListHeaderComponent={
          <View className="mb-12 ios:p-4">
            <Text className="text-gray-100 pt-4 font-cinzelBold text-2xl">
              You&apos;ve Haunted Their Heart
            </Text>
            <Text className="pt-1 font-cinzelBold text-sm text-gray-200">
              It wasn&apos;t a cold breeze... it was love.
            </Text>
          </View>
        }
        renderItem={({ item }) => {
          return (
            <GestureHandlerRootView>
              <Animated.View
                entering={SlideInDown.duration(300).springify()}
                className="flex items-center justify-center"
              >
                <LikedUserComponent
                  userId={item.liked_by.user_details.user_id}
                  pictures={item.liked_by.media.gallery}
                  firstName={item.liked_by.user_details.first_name}
                  lastName={item.liked_by.user_details.last_name}
                  age={+item.liked_by.user_details.age}
                  handleLikedUser={handleLikedUser}
                />
              </Animated.View>
            </GestureHandlerRootView>
          );
        }}
      />
    </LinearGradient>
  );
}
