import { getUnMatchedUsers } from "@/actions/getUnmatchedUsers";
import { setSeenUsersToCache } from "@/actions/setSeenUsers";
import { userObject } from "@/lib/types";
import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function Find() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedProfile, setLikedProfile] = useState<string[]>([]);
  const [unlikedProfile, setUnLikedProfile] = useState<string[]>([]);
  const [dataIndex, setDataIndex] = useState<number>(0);
  const [seenUser, setSeenUser] = useState<string[]>([]);
  const position = new Animated.ValueXY();
  const [data, setData] = useState<userObject[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const getUnMatchedHandler = async () => {
    try {
      const res = await getUnMatchedUsers(page);
      setPage((prev) => prev + 1);
      console.log("res");
      console.log(res.user);
      setData((prev) => [...prev, ...res.user]);
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

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ["-10deg", "0deg", "10deg"],
    extrapolate: "clamp",
  });

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: Animated.event(
      [null, { dx: position.x, dy: position.y }],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: (_, gesture) => {
      if (gesture.dx > 120) {
        Animated.timing(position, {
          toValue: { x: SCREEN_WIDTH + 100, y: gesture.dy },
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex((prev) => prev + 1);
          setDataIndex((prev) => prev + 1);
          setLikedProfile((prev) => [
            ...prev,
            data[dataIndex].user_details.user_id,
          ]);
          setSeenUser((prev) => [
            ...prev,
            data[currentIndex].user_details.user_id,
          ]);
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gesture.dx < -120) {
        Animated.timing(position, {
          toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex((prev) => prev + 1);
          setDataIndex((prev) => prev + 1);
          setUnLikedProfile((prev) => [
            ...prev,
            data[dataIndex].user_details.user_id,
          ]);
          position.setValue({ x: 0, y: 0 });
          setSeenUser((prev) => [
            ...prev,
            data[currentIndex].user_details.user_id,
          ]);
        });
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

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
        <View style={styles.noMoreCards}>
          <Text style={styles.endText}>No more souls 👻</Text>
        </View>
      );
    }

    const ghost = data[dataIndex];

    return (
      <>
        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.card,
            {
              transform: [...position.getTranslateTransform(), { rotate }],
            },
          ]}
        >
          <View className="flex flex-col gap-2">
            <Text className="text-2xl font-cinzelBold">
              {ghost.user_details.first_name}
            </Text>
            <Text className="font-cinzel text-xl text-[#330202]">
              {ghost.user_details.date_of_birth.split("T")[0]}
            </Text>
            <Text className="font-cinzel">
              Died from: {ghost.user_details.howyoudie}
            </Text>
          </View>
          <View>
            <Text className="font-cinzelBold tex-lg text-[#330202] ">
              What I&apos;m looking for:
            </Text>
            <Text className="text-xs font-cinzel">
              {ghost.user_details.interested_in_gender}
            </Text>
          </View>

          <Animated.View
            style={[
              styles.heart,
              {
                opacity: position.x.interpolate({
                  inputRange: [0, 150],
                  outputRange: [0, 1],
                  extrapolate: "clamp",
                }),
              },
            ]}
          >
            <AntDesign name="heart" size={60} color="purple" />
          </Animated.View>

          <Animated.View
            style={[
              styles.cross,
              {
                opacity: position.x.interpolate({
                  inputRange: [-150, 0],
                  outputRange: [1, 0],
                  extrapolate: "clamp",
                }),
              },
            ]}
          >
            <Entypo name="cross" size={60} color="black" />
          </Animated.View>
        </Animated.View>
      </>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gary-200">
      <View>
        <Text className="text-2xl font-cinzelBold text-purple-800 text-center mt-4">
          Summon Your Soulmate
        </Text>
      </View>
      <View style={styles.container}>{renderCard()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "#d3d3d3",
    width: 300,
    height: 400,
    borderRadius: 20,
    padding: 20,
    position: "absolute",
    justifyContent: "space-between",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#330202",
  },
  era: {
    fontSize: 18,
    color: "#555",
  },
  death: {
    fontSize: 16,
    color: "#870b0b",
  },
  want: {
    fontWeight: "bold",
    color: "#870b0b",
  },
  desc: {
    color: "#333",
    fontSize: 14,
  },
  noMoreCards: {
    justifyContent: "center",
    alignItems: "center",
  },
  endText: {
    color: "#000",
    fontSize: 24,
  },
  heart: {
    position: "absolute",
    top: 30,
    right: 30,
  },
  cross: {
    position: "absolute",
    top: 30,
    left: 30,
  },
});
