import { getUnMatchedUsers } from "@/actions/getUnmatchedUsers";
import { likedUserToDb } from "@/actions/likedUsers";
import { setSeenUsersToCache } from "@/actions/setSeenUsers";
import DisplayUser from "@/components/DisplayUser";
import { userObject } from "@/lib/types";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Find() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedUser, setLikedUser] = useState<string[]>([]);
  const [dataIndex, setDataIndex] = useState<number>(0);
  const [seenUser, setSeenUser] = useState<string[]>([]);
  const [data, setData] = useState<userObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const updateLikedUser = (userId: string) => {
    setLikedUser((prev) => [...prev, userId]);
  };

  const updateCurrentIndex = () => {
    setSeenUser((prev) => [...prev, data[dataIndex].user_details.user_id]);
    setCurrentIndex((prev) => prev + 1);
    setDataIndex((prev) => prev + 1);
  };

  const getUnMatchedHandler = async () => {
    try {
      const res = await getUnMatchedUsers(page);
      setPage((prev) => prev + 1);
      if (data.length === 0) {
        setData(res.user);
      } else {
        setData((prev) => [...prev, ...res.user]);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (currentIndex === 8) {
        getUnMatchedHandler();
        setCurrentIndex(0);
      }

      return () => {};
    }, [currentIndex])
  );

  useFocusEffect(
    useCallback(() => {
      if (seenUser.length === 0) {
        return;
      } else {
        const interval = setInterval(async () => {
          try {
            await setSeenUsersToCache(seenUser);
          } catch (err) {
            console.log(err);
          }
        }, 3 * 60 * 1000);
        return () => clearInterval(interval);
      }
    }, [seenUser])
  );

  useFocusEffect(
    useCallback(() => {
      if (likedUser.length === 0) {
        return;
      } else {
        const interval = setInterval(async () => {
          try {
            await likedUserToDb(likedUser);
            setLikedUser([]);
          } catch (err) {
            console.log(err);
          }
        }, 3 * 60 * 1000);
        return () => clearInterval(interval);
      }
    }, [likedUser])
  );

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getUnMatchedHandler();
      return () => {};
    }, [])
  );

  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator color={"white"} size={"large"} />
      </View>
    );
  }

  const renderCard = () => {
    if (!data || currentIndex >= data.length) {
      return (
        <LinearGradient
          colors={["#252123", "#500177"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-1 items-center justify-center "
        >
          <Text className="text-2xl font-cinzelBold text-purple-400">
            No more souls 👻
          </Text>
        </LinearGradient>
      );
    }

    const ghost = data[dataIndex];

    return (
      <View className="flex flex-col  h-[100vh] items-center mt-[4rem]  mx-[10px] ">
        <GestureHandlerRootView>
          <DisplayUser
            user_id={ghost.user_details.user_id}
            firstName={ghost.user_details.first_name}
            lastName={ghost.user_details.last_name}
            location={ghost.user_details.location}
            interests={ghost.preferences.intensions}
            pictures={ghost.media.gallery}
            updateCurrentIndex={() => updateCurrentIndex()}
            updateLikedUser={(id: string) => updateLikedUser(id)}
          />
        </GestureHandlerRootView>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={["#252123", "#7a235d"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1  "
    >
      <View>
        <Text className="text-2xl font-cinzelBold text-gray-100 px-3 mt-2">
          Summon Your Soulmate
        </Text>
      </View>
      <View>{renderCard()}</View>
    </LinearGradient>
  );
}
