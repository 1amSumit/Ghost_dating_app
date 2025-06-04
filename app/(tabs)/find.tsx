import { getUnMatchedUsers } from "@/actions/getUnmatchedUsers";
import { likedUserToDb } from "@/actions/likedUsers";
import { setSeenUsersToCache } from "@/actions/setSeenUsers";
import DisplayUser from "@/components/DisplayUser";
import { userObject } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

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

  useEffect(() => {
    if (currentIndex === 8) {
      getUnMatchedHandler();
      setCurrentIndex(0);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (seenUser.length === 0) {
      return;
    } else {
      const interval = setInterval(async () => {
        try {
          const res = await setSeenUsersToCache(seenUser);
          const resp = await likedUserToDb(likedUser);
          console.log(res);
          console.log(resp);
          setSeenUser([]);
        } catch (err) {
          console.log(err);
        }
      }, 3 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [seenUser]);

  useEffect(() => {
    setLoading(true);
    getUnMatchedHandler();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator color={"purple"} size={"large"} />
      </View>
    );
  }

  const renderCard = () => {
    if (!data || currentIndex >= data.length) {
      return (
        <View className="flex-1 items-center justify-center">
          <Text className="text-2xl font-cinzelBold text-purple-600">
            No more souls 👻
          </Text>
        </View>
      );
    }

    const ghost = data[dataIndex];

    return (
      <View className="flex flex-col h-[100vh] items-center mt-[5rem]  mx-[10px] ">
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
    <SafeAreaView className="flex-1 bg-gary-200">
      <View>
        <Text className="text-2xl font-cinzelBold text-purple-800 text-center mt-4">
          Summon Your Soulmate
        </Text>
      </View>
      <View>{renderCard()}</View>
    </SafeAreaView>
  );
}
