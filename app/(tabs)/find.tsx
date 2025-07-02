import { getUnMatchedUsers } from "@/actions/getUnmatchedUsers";
import { likedUserToDb } from "@/actions/likedUsers";
import { setSeenUsersToCache } from "@/actions/setSeenUsers";
import DisplayUser from "@/components/DisplayUser";
import { userObject } from "@/lib/types";
import { LinearGradient } from "expo-linear-gradient";
import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Find() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedUsers, setLikedUsers] = useState<string[]>([]);
  const [dataIndex, setDataIndex] = useState<number>(0);
  const [seenUsers, setSeenUsers] = useState<string[]>([]);
  const [data, setData] = useState<userObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const updateLikedUser = (userId: string) => {
    setLikedUsers((prev) => [...prev, userId]);
  };

  const updateCurrentIndex = useCallback(() => {
    const id = data[dataIndex]?.user_details?.user_id;
    if (id) setSeenUsers((prev) => [...prev, id]);
    setCurrentIndex((prev) => prev + 1);
    setDataIndex((prev) => prev + 1);
  }, [dataIndex]);

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
    if (currentIndex > 0 && currentIndex % 8 === 0) {
      getUnMatchedHandler();
    }
  }, [currentIndex]);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (seenUsers.length > 0) {
        await setSeenUsersToCache(seenUsers);
        setSeenUsers([]);
      }
      if (likedUsers.length > 0) {
        await likedUserToDb(likedUsers);
        setLikedUsers([]);
      }
    }, 2000);

    return () => clearTimeout(timeout);
  }, [seenUsers.length, likedUsers.length]);

  useEffect(() => {
    setLoading(true);
    getUnMatchedHandler();
    return () => {};
  }, []);

  if (loading) {
    return (
      <View className="flex-1 bg-black items-center justify-center">
        <ActivityIndicator color={"white"} size={"large"} />
      </View>
    );
  }

  if (data === undefined) {
    return (
      <LinearGradient
        colors={["#252123", "#7a235d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1  items-center justify-center"
      >
        <Text className="text-2xl font-cinzelBold text-gray-100 ">
          No matching user found
        </Text>
      </LinearGradient>
    );
  }
  if (data.length === 0) {
    return (
      <LinearGradient
        colors={["#252123", "#7a235d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1  items-center justify-center"
      >
        <Text className="text-2xl font-cinzelBold text-gray-100 ">
          No matching user found
        </Text>
      </LinearGradient>
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
        <Text className="text-2xl ios:pt-6 font-cinzelBold text-gray-100 px-6 mt-2">
          Summon Your Soulmate
        </Text>
      </View>
      <View>{renderCard()}</View>
    </LinearGradient>
  );
}
