import RecieveChatBubble from "@/components/RecieveChatBubble";
import SendChatBubble from "@/components/SendChatBubble";
import { RootState } from "@/store/store";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { SlideInLeft, SlideInRight } from "react-native-reanimated";
import { useSelector } from "react-redux";

interface Message {
  id: number;
  type: string;
  message: string;
  to: string | string[];
  from: string;
  createdAt: Date;
  roomId: string | string[];
}

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { chatId, name, recieverUserId } = useLocalSearchParams();
  const ws = useRef<WebSocket>(null);
  const loggedInUserId = useSelector(
    (state: RootState) => state.tokenSlice.token
  );
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    if (!loggedInUserId || !recieverUserId) return;

    const initWebSocket = async () => {
      const socket = new WebSocket("ws://192.168.1.3:8080");
      ws.current = socket;

      socket.onopen = () => {
        console.log("websocket connect");

        socket.send(
          JSON.stringify({
            type: "roomID",
            loggedInUserId,
            recieverUserId,
          })
        );

        socket.onmessage = (event) => {
          const data = event.data;
          const parsedData = JSON.parse(data.toString());

          setMessages((prev) => {
            const updated = [...prev, parsedData];
            setTimeout(() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }, 100);

            return updated;
          });
        };

        socket.onerror = (err) => {
          console.log(err);
        };

        socket.onclose = () => {
          console.log("WebSocket disconnected");
        };
      };
    };

    initWebSocket();

    return () => {
      ws.current?.close();
    };
  }, [loggedInUserId, recieverUserId]);

  const sendMessage = (message: string) => {
    if (message.length === 0) {
      return;
    }

    if (!chatId || !recieverUserId || !loggedInUserId || !message) {
      return;
    }

    const newMessage: Message = {
      id: Date.now(),
      type: "message",
      roomId: chatId,
      to: recieverUserId,
      from: loggedInUserId,
      message: message,
      createdAt: new Date(),
    };

    ws.current?.send(JSON.stringify(newMessage));

    setMessage("");
  };

  return (
    <LinearGradient
      colors={["#db2777", "#dc2626"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View className="px-[1rem] pt-2 flex flex-row items-center justify-between">
          <View className="w-[40px] h-[40px] relative border-[1px] border-gray-600 rounded-full">
            <Ionicons
              name="chevron-back"
              size={24}
              color="white"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: [{ translateX: -12 }, { translateY: -12 }],
              }}
            />
          </View>
          <Text className="text-gray-100 text-xl font-cinzelBold">{name}</Text>
          <View>
            <Entypo name="dots-three-horizontal" size={24} color="white" />
          </View>
        </View>

        <View className="flex-1  rounded-xl mx-2 mt-4">
          <FlatList
            ref={flatListRef}
            data={messages}
            contentContainerStyle={{ paddingBottom: 20 }}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className="h-[10px]" />}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="flex flex-col">
                {item.from === loggedInUserId ? (
                  <Animated.View
                    entering={SlideInRight.duration(200)}
                    className="items-end"
                  >
                    <SendChatBubble
                      message={item.message}
                      time={item.createdAt}
                    />
                  </Animated.View>
                ) : (
                  <Animated.View entering={SlideInLeft.duration(200)}>
                    <RecieveChatBubble
                      message={item.message}
                      time={item.createdAt}
                    />
                  </Animated.View>
                )}
              </View>
            )}
          />
        </View>

        <View className="pb-[40px]">
          <View className="px-[1rem] mt-[1rem] flex flex-row justify-between items-center">
            <View className="flex flex-row gap-2 items-center border-[1px] border-gray-600 rounded-full px-4">
              <Entypo name="emoji-happy" size={24} color="white" />
              <TextInput
                value={message}
                onChangeText={setMessage}
                className="w-[250px] py-4 font-cinzel text-white"
                placeholder="send your message"
                placeholderTextColor="#ccc"
              />
            </View>
            <TouchableOpacity onPress={() => sendMessage(message)}>
              <View className="w-[30px] h-[30px]">
                <Image
                  source={require("@/assets/images/send-white.png")}
                  className="h-full w-full"
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
