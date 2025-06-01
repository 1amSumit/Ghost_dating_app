import { getUnMatchedUsers } from "@/actions/getUnmatchedUsers";
import { setSeenUsersToCache } from "@/actions/setSeenUsers";
import DisplayUser from "@/components/DisplayUser";
import { userObject } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Find() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProfile, setLikedProfile] = useState<string[]>([]);
  const [unlikedProfile, setUnLikedProfile] = useState<string[]>([]);
  const [dataIndex, setDataIndex] = useState<number>(0);
  const [seenUser, setSeenUser] = useState<string[]>([]);
  const [data, setData] = useState<userObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getUnMatchedHandler = async () => {
    try {
      const res = await getUnMatchedUsers(page);
      setPage((prev) => prev + 1);
      console.log("res");
      console.log(res.user[0]);
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
          console.log(res);
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
        <DisplayUser
          firstName={ghost.user_details.first_name}
          lastName={ghost.user_details.last_name}
          location={ghost.user_details.location}
          interests={ghost.preferences.intensions}
          pictures={ghost.media.gallery}
        />
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
