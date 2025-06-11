import { Image, View } from "react-native";

export default function ChatProfile({ profilePic }: { profilePic: string }) {
  return (
    <>
      <View className="w-[60px] bg-gray-200 h-[60px]  rounded-full ">
        {!profilePic ? (
          <Image
            source={require("@/assets/images/user.png")}
            className="w-full h-full"
          />
        ) : (
          <Image
            source={{ uri: profilePic }}
            className="w-full h-full rounded-full"
          />
        )}
      </View>
    </>
  );
}
