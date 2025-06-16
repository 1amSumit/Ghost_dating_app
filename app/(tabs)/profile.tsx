import { RootState } from "@/store/store";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import {
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState("");
  const [howyoudie, setHowyoudie] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [hasLocationPermission, setHasLocationPermission] =
    useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const router = useRouter();
  const userData = useSelector(
    (state: RootState) => state.userDataSlice.userData
  );

  const parsedUserData = JSON.parse(userData);

  useFocusEffect(
    useCallback(() => {
      setUsername(
        parsedUserData.user_details.first_name +
          " " +
          parsedUserData.user_details.last_name
      );
      setBio(parsedUserData.user_details.bio);
      setHowyoudie(parsedUserData.user_details.howyoudie);
      setAddress(parsedUserData.user_details.location);
      return () => {};
    }, [])
  );

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Location permission not granted");
        setHasLocationPermission(false);
        return;
      }

      setHasLocationPermission(true);

      let loca = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = loca.coords;
      setLatitude(latitude);
      setLongitude(longitude);

      const addressArray = await Location.reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude,
      });

      if (addressArray.length > 0) {
        const address = addressArray[0];
        const formattedAddress = `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.postalCode}, ${address.country}`;
        setAddress(formattedAddress);
        console.log("Current Address:", formattedAddress);
      }
    } catch (error) {
      console.error("Error getting location or address:", error);
    }
  };

  return (
    <LinearGradient
      colors={["#252123", "#500177"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 px-4 pt-2"
    >
      <View className="">
        <Text className="text-gray-100 text-xl mt-4 font-cinzelBold">
          Profile
        </Text>

        <View className="flex border-[1px] border-slate-300  flex-col items-center mt-8 bg-gray-200/20 rounded-xl px-4 py-6">
          <View className="relative w-20 h-20 rounded-full">
            <Image
              source={{ uri: parsedUserData.user_details.profile_pic }}
              className="w-full h-full rounded-full"
            />
            <View className="absolute right-0 bottom-0 bg-pink-600 w-7 h-7 rounded-full flex items-center justify-center">
              <Feather name="camera" size={16} color="white" />
            </View>
          </View>

          <View className="flex flex-row gap-x-1 mt-2">
            <Text className="text-gray-100 font-cinzelBold text-sm text-center">
              {parsedUserData.user_details.first_name}{" "}
              {parsedUserData.user_details.last_name},
            </Text>
            <Text className="text-gray-100 font-cinzelBold text-sm text-center">
              {parsedUserData.user_details.age}
            </Text>
          </View>
        </View>

        <View className="flex border-[1px] border-slate-300 flex-col gap-4 mt-8 bg-gray-200/20 rounded-xl px-4 py-6">
          <View>
            <Text className="text-gray-100 text-sm font-cinzel">
              Display Name
            </Text>
            <TextInput
              className="bg-gray-200/30 text-gray-100 rounded-lg mt-2 px-3 font-cinzel"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View>
            <Text className="text-gray-100 text-sm font-cinzel">Bio</Text>
            <TextInput
              className="bg-gray-200/30 text-gray-100 rounded-lg mt-2 px-3 font-cinzel"
              value={bio}
              onChangeText={setBio}
            />
          </View>
          <View>
            <Text className="text-gray-100 text-sm font-cinzel">
              How you die!
            </Text>
            <TextInput
              className="bg-gray-200/30 text-gray-100 rounded-lg mt-2 px-3 font-cinzel"
              value={howyoudie}
              onChangeText={setHowyoudie}
            />
          </View>
        </View>

        <View className="flex border-[1px] border-slate-300 flex-col gap-4 mt-8 bg-gray-200/20 rounded-xl px-4 py-6">
          <View>
            <Text className="text-gray-100 font-cinzel text-sm">Location</Text>
            <View className="flex flex-col">
              <TextInput
                className="bg-gray-200/30 text-gray-100 rounded-lg mt-2 px-3 font-cinzel"
                value={address}
                onChangeText={setAddress}
              />
              <View className="items-end">
                <TouchableOpacity onPress={() => getCurrentLocation()}>
                  <Text className="font-cinzel mt-3  text-gray-100 text-xs">
                    Get current Location
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
      <StatusBar backgroundColor={"#271e1e"} />
    </LinearGradient>
  );
}
