import { getLikedUsers } from "@/actions/getLikedUser";
import { LickedUser } from "@/lib/types";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

export default function Like() {
  const [likedUsers, setLikedUsers] = useState<LickedUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator size={"large"} color="purple" />
      </View>
    );
  }

  if (!likedUsers || likedUsers.length === 0) {
    return (
      <View className="px-2 flex-1 items-center justify-center">
        <Text className="text-xl text-purple-700 text-center font-cinzelBold">
          Apparently Love Is Still in the Coffin...
        </Text>
      </View>
    );
  }
  return (
    <View className="px-4 mt-10">
      <View>
        <Text className="text-purple-900  mt-4 font-cinzelBold text-2xl">
          You&apos;ve Haunted Their Heart
        </Text>
        <Text className="mt-1 font-cinzelBold text-sm text-purple-600">
          It wasn&apos;t a cold breeze... it was love.
        </Text>
      </View>

      <View className="mt-[3rem] h-[75vh] flex flex-col items-center justify-center">
        <FlatList
          data={likedUsers}
          keyExtractor={(_, index) => index.toString()}
          numColumns={2}
          //@ts-ignore
          columnWrapperStyle={{
            justifyContent: "space-between",
            marginHorizontal: "10px",
          }}
          ItemSeparatorComponent={() => <View className="h-[10px]" />}
          className="w-full "
          renderItem={({ item }) => (
            <View className="w-[48%] h-[250px]">
              <View>
                <Image
                  source={{ uri: item.liked_by.media.gallery[0] }}
                  className="w-full h-[150px]"
                  resizeMode="cover"
                />
              </View>

              <View>
                <Text>
                  {item.liked_by.user_details.first_name}{" "}
                  {item.liked_by.user_details.last_name}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </View>
  );
}
