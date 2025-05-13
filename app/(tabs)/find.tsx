import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

const DUMMY_DATA = [
  {
    name: "ABS DFG",
    era: "Medivial (2000)",
    deathCause: "Broken heart",
    lookingFor:
      "A spirit who appreciates poetry, moonlit walks through abandoned mansions, and the occasional haunting of my ex-husband's descendants.",
  },
  {
    name: "Zena the Lost",
    era: "Victorian (1854)",
    deathCause: "Tea overdose",
    lookingFor:
      "A ghost who’ll join me in floating through foggy cemeteries and sipping invisible tea under the moonlight.",
  },
  {
    name: "Sir Booington",
    era: "Renaissance (1600)",
    deathCause: "Swordplay accident",
    lookingFor:
      "A gallant specter who can duel with words and waltz through walls.",
  },
  {
    name: "Sir Booington",
    era: "Renaissance (1600)",
    deathCause: "Swordplay accident",
    lookingFor:
      "A gallant specter who can duel with words and waltz through walls.",
  },
  {
    name: "Sir Booington",
    era: "Renaissance (1600)",
    deathCause: "Swordplay accident",
    lookingFor:
      "A gallant specter who can duel with words and waltz through walls.",
  },
  {
    name: "Sir Booington",
    era: "Renaissance (1600)",
    deathCause: "Swordplay accident",
    lookingFor:
      "A gallant specter who can duel with words and waltz through walls.",
  },
  {
    name: "Sir Booington",
    era: "Renaissance (1600)",
    deathCause: "Swordplay accident",
    lookingFor:
      "A gallant specter who can duel with words and waltz through walls.",
  },
  {
    name: "Sir Booington",
    era: "Renaissance (1600)",
    deathCause: "Swordplay accident",
    lookingFor:
      "A gallant specter who can duel with words and waltz through walls.",
  },
  {
    name: "Sir Booington",
    era: "Renaissance (1600)",
    deathCause: "Swordplay accident",
    lookingFor:
      "A gallant specter who can duel with words and waltz through walls.",
  },
];

export default function Find() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const position = new Animated.ValueXY();

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
          position.setValue({ x: 0, y: 0 });
        });
      } else if (gesture.dx < -120) {
        Animated.timing(position, {
          toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          setCurrentIndex((prev) => prev + 1);
          position.setValue({ x: 0, y: 0 });
        });
      } else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const renderCard = () => {
    if (currentIndex >= DUMMY_DATA.length) {
      return (
        <View style={styles.noMoreCards}>
          <Text style={styles.endText}>No more souls 👻</Text>
        </View>
      );
    }

    const ghost = DUMMY_DATA[currentIndex];

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
            <Text className="text-2xl font-cinzelBold">{ghost.name}</Text>
            <Text className="font-cinzel text-xl text-[#330202]">
              {ghost.era}
            </Text>
            <Text className="font-cinzel">Died from: {ghost.deathCause}</Text>
          </View>
          <View>
            <Text className="font-cinzelBold tex-lg text-[#330202] ">
              What I&apos;m looking for:
            </Text>
            <Text className="text-xs font-cinzel">{ghost.lookingFor}</Text>
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
            <Text style={{ fontSize: 40 }}>❤️</Text>
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
            <Text style={{ fontSize: 40 }}>❌</Text>
          </Animated.View>
        </Animated.View>
      </>
    );
  };

  return (
    <View className="flex-1 bg-purple-950">
      <View>
        <Text className="text-2xl font-cinzelBold text-gray-200 text-center mt-4">
          Summon Your Soulmate
        </Text>
      </View>
      <View style={styles.container}>{renderCard()}</View>
    </View>
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
    color: "#fff",
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
