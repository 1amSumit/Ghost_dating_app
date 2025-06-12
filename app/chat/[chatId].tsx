import RecieveChatBubble from "@/components/RecieveChatBubble";
import SendChatBubble from "@/components/SendChatBubble";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import * as SecureStore from "expo-secure-store";
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

const data = [
  { id: 1, from: "sumit", to: "amit", message: "Hello Amit!" },
  { id: 2, from: "amit", to: "sumit", message: "Hey Sumit, how are you?" },
  { id: 3, from: "sumit", to: "amit", message: "I'm good. You?" },
  { id: 4, from: "amit", to: "sumit", message: "Doing well, thanks!" },
  { id: 5, from: "sumit", to: "amit", message: "What are you up to today?" },
  { id: 6, from: "amit", to: "sumit", message: "Just working on a project." },
  { id: 7, from: "sumit", to: "amit", message: "Sounds cool!" },
  { id: 8, from: "amit", to: "sumit", message: "Yeah, it's interesting." },
  {
    id: 9,
    from: "sumit",
    to: "amit",
    message: "Let me know if you need help.",
  },
  { id: 10, from: "amit", to: "sumit", message: "Sure, thanks bro!" },
  { id: 11, from: "sumit", to: "amit", message: "Did you watch the match?" },
  { id: 12, from: "amit", to: "sumit", message: "Yeah! It was awesome!" },
  { id: 13, from: "sumit", to: "amit", message: "Totally, what a game!" },
  { id: 14, from: "amit", to: "sumit", message: "Unbelievable finish!" },
  { id: 15, from: "sumit", to: "amit", message: "Indeed." },
  { id: 16, from: "amit", to: "sumit", message: "What time is our meeting?" },
  { id: 17, from: "sumit", to: "amit", message: "At 4 PM." },
  { id: 18, from: "amit", to: "sumit", message: "Got it." },
  { id: 19, from: "sumit", to: "amit", message: "Don't forget the docs." },
  { id: 20, from: "amit", to: "sumit", message: "Already prepared." },
  { id: 21, from: "sumit", to: "amit", message: "Nice!" },
  { id: 22, from: "amit", to: "sumit", message: "See you there." },
  { id: 23, from: "sumit", to: "amit", message: "Cool." },
  { id: 24, from: "amit", to: "sumit", message: "Want to grab dinner after?" },
  { id: 25, from: "sumit", to: "amit", message: "Sure, let's go!" },
  { id: 26, from: "amit", to: "sumit", message: "Pizza?" },
  { id: 27, from: "sumit", to: "amit", message: "Always!" },
  { id: 28, from: "amit", to: "sumit", message: "Haha same here." },
  { id: 29, from: "sumit", to: "amit", message: "See you soon!" },
  { id: 30, from: "amit", to: "sumit", message: "Bye!" },
  { id: 31, from: "sumit", to: "amit", message: "Where are you now?" },
  { id: 32, from: "amit", to: "sumit", message: "Just left home." },
  { id: 33, from: "sumit", to: "amit", message: "Alright, be safe." },
  { id: 34, from: "amit", to: "sumit", message: "Thanks!" },
  { id: 35, from: "sumit", to: "amit", message: "Any update on the report?" },
  { id: 36, from: "amit", to: "sumit", message: "Sending it now." },
  { id: 37, from: "sumit", to: "amit", message: "Got it, looks great!" },
  { id: 38, from: "amit", to: "sumit", message: "Thanks man." },
  { id: 39, from: "sumit", to: "amit", message: "No problem." },
  { id: 40, from: "amit", to: "sumit", message: "Talk later?" },
  { id: 41, from: "sumit", to: "amit", message: "Yeah, after dinner." },
  { id: 42, from: "amit", to: "sumit", message: "Cool, bye for now." },
  { id: 43, from: "sumit", to: "amit", message: "Later!" },
  { id: 44, from: "amit", to: "sumit", message: "Take care!" },
  { id: 45, from: "sumit", to: "amit", message: "You too!" },
  { id: 46, from: "amit", to: "sumit", message: "Good night." },
  { id: 47, from: "sumit", to: "amit", message: "Good night, bro." },
  { id: 48, from: "amit", to: "sumit", message: "Chat tomorrow?" },
  { id: 49, from: "sumit", to: "amit", message: "For sure!" },
  { id: 50, from: "amit", to: "sumit", message: "Alright, peace!" },
];

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const { chatId, name, recieverUserId } = useLocalSearchParams();
  const ws = useRef<WebSocket>(null);
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
  const flatListRef = useRef<FlatList>(null);

  console.log("chatId");
  console.log(chatId);

  useEffect(() => {
    const initWebSocket = async () => {
      const logedInUser = await SecureStore.getItemAsync("userToken");
      setLoggedInUserId(logedInUser);
      const socket = new WebSocket("ws://192.168.1.3:8080");
      ws.current = socket;

      ws.current.onopen = () => {
        console.log("websocket connect");

        socket.send(
          JSON.stringify({
            type: "roomID",
            loggedInUserId: loggedInUserId,
            recieverUserId: recieverUserId,
          })
        );

        socket.onmessage = (event) => {
          const data = event.data;
          console.log(JSON.parse(data));
          setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
          }, 100);
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
  }, [chatId, recieverUserId]);

  const sendMessage = (message: string) => {
    if (message.length === 0) {
      return;
    }
    ws.current?.send(
      JSON.stringify({
        type: "message",
        roomId: chatId,
        to: recieverUserId,
        from: loggedInUserId,
        message: message,
        createdAt: new Date(),
      })
    );
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
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
        <View className="mt-[4rem] px-[1rem] flex flex-row items-center justify-between">
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

        <View className="flex-1 relative rounded-xl mx-2">
          <FlatList
            ref={flatListRef}
            data={data}
            contentContainerStyle={{ paddingBottom: 20 }}
            keyExtractor={(item) => item.id.toString()}
            ItemSeparatorComponent={() => <View className="h-[10px]" />}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <View className="flex flex-col">
                {item.from === "sumit" ? (
                  <View className="items-end">
                    <SendChatBubble message={item.message} time="now" />
                  </View>
                ) : (
                  <RecieveChatBubble message={item.message} time="now" />
                )}
              </View>
            )}
          />
        </View>

        <View className="pb-[20px]">
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
