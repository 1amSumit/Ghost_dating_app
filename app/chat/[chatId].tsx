import { getMessages } from "@/actions/getMessages";
import RecieveChatBubble from "@/components/RecieveChatBubble";
import SendChatBubble from "@/components/SendChatBubble";
import { RootState } from "@/store/store";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";

interface Message {
  id: string;
  message: string;
  message_to_user: string;
  message_from_user: string;
  created_at: string | Date;
  type?: string;
  roomId?: string;
}

export default function Chat() {
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const { chatId, name, recieverUserId } = useLocalSearchParams<{
    chatId: string;
    name: string;
    recieverUserId: string;
  }>();
  const [loading, setLoading] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const loggedInUserId = useSelector(
    (state: RootState) => state.tokenSlice.token
  );
  const [listLoading, setListLoading] = useState(false);
  const [page, setPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const fetchMessages = async () => {
      try {
        const res = await getMessages(recieverUserId, page);
        setMessages(res.messages || []);
        setPage((prev) => prev + 1);
      } catch (err) {
        console.log("Failed to fetch messages:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const getMessagePerPage = async () => {
    setListLoading(true);
    try {
      const res = await getMessages(recieverUserId, page);
      setPage((prev) => prev + 1);
      setMessages((prev) => [...prev, ...res.messages]);
    } catch (err) {
      console.log("Failed to fetch messages:", err);
    } finally {
      setListLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (!loggedInUserId || !recieverUserId) return;

      const socket = new WebSocket("ws://ghost-ws.sumitjha.site:8080");
      ws.current = socket;

      socket.onopen = () => {
        console.log("WebSocket connected");

        socket.send(
          JSON.stringify({
            type: "roomID",
            loggedInUserId,
            recieverUserId,
          })
        );
      };

      socket.onmessage = (event) => {
        try {
          const parsedData: Message = JSON.parse(event.data.toString());

          if (parsedData?.message) {
            setMessages((prev) => [parsedData, ...prev]);
          }
        } catch (err) {
          console.log("WebSocket message parse error:", err);
        }
      };

      socket.onerror = (err) => {
        console.log("WebSocket error:", err);
      };

      socket.onclose = () => {
        console.log("WebSocket disconnected");
      };

      return () => {
        socket.close();
      };
    }, [loggedInUserId, recieverUserId])
  );

  const sendMessage = (msg: string) => {
    if (!msg.trim() || !chatId || !recieverUserId || !loggedInUserId) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: "message",
      roomId: chatId,
      message_to_user: recieverUserId,
      message_from_user: loggedInUserId,
      message: msg,
      created_at: new Date(),
    };

    ws.current?.send(JSON.stringify(newMessage));
    setMessage("");
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#db2777" />
      </View>
    );
  }

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
        <View className="px-4 pt-2 flex flex-row items-center justify-between">
          <Pressable
            onPress={() => {
              router.back();
            }}
            className="w-[40px] h-[40px] relative border border-gray-600 rounded-full"
          >
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
          </Pressable>

          <Text className="text-gray-100 text-xl font-cinzelBold">{name}</Text>
          <Entypo name="dots-three-horizontal" size={24} color="white" />
        </View>

        <View className="flex-1 mx-2 mt-4 rounded-xl">
          <FlatList
            ref={flatListRef}
            data={messages}
            onEndReached={() => {
              getMessagePerPage();
            }}
            contentContainerStyle={{ paddingBottom: 20 }}
            keyExtractor={(item) => item.id}
            inverted={true}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View className="h-2" />}
            renderItem={({ item }) => {
              if (item.message_from_user === loggedInUserId) {
                return (
                  <View className="items-end">
                    <SendChatBubble
                      message={item.message}
                      time={item.created_at}
                    />
                  </View>
                );
              }

              return (
                <RecieveChatBubble
                  message={item.message}
                  time={item.created_at}
                />
              );
            }}
          />
        </View>

        <View className="pb-[40px]">
          <View className="px-4 mt-4 flex flex-row justify-between items-center">
            <View className="flex flex-row gap-2 items-center border border-gray-600 rounded-full px-4 flex-1 mr-2">
              <Entypo name="emoji-happy" size={24} color="white" />
              <TextInput
                value={message}
                onChangeText={setMessage}
                className="py-4 flex-1 font-cinzel text-white"
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
