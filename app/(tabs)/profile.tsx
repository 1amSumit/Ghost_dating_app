import { getLoggedInUserDetails } from "@/actions/getLoggedInUserDetails";
import { updateUser } from "@/actions/updateUser";
import { RootState } from "@/store/store";
import { addUserData } from "@/store/userData";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import RangeSlider from "rn-range-slider";

export default function Profile() {
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState("");
  const [howyoudie, setHowyoudie] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [_, setHasLocationPermission] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [maxDistance, setMaxDistance] = useState<number>(10);
  const [gender, setGender] = useState<string>("");
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(0);
  const [profilePic, setProfilepic] = useState<string>("");
  const [showOnFeed, setShowOnFeed] = useState(false);
  const [ghostMode, setGhostMode] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);

  const [updating, setUpdating] = useState(false);

  const [isChanged, setIsChanged] = useState({});

  const [isAnyFiledChanged, setIsAnyFieldChanged] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setIsAnyFieldChanged(false);
    const isFieldChanged = Object.keys(isChanged).filter((key) => key);

    if (isFieldChanged.length !== 0) {
      setIsAnyFieldChanged(true);
    }
  }, [isChanged]);

  const handleChange = (field: any, value: any) => {
    setIsChanged((prev) => ({ ...prev, [field]: value }));
  };

  const router = useRouter();

  const userData = useSelector(
    (state: RootState) => state.userDataSlice.userData
  );

  const parsedUserData = JSON.parse(userData);

  const logout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    await SecureStore.deleteItemAsync("userId");
    await SecureStore.deleteItemAsync("user");
    router.replace("/");
  };

  const uploadImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: false,
      aspect: [1, 1],
      quality: 1,
    });

    if (!res.assets) {
      return;
    }

    setProfilepic(res.assets[0].uri);
    handleChange("profilePic", res.assets[0].uri);
  };

  useFocusEffect(
    useCallback(() => {
      setProfilepic(parsedUserData.user_details.profile_pic);
      setUsername(
        parsedUserData.user_details.first_name +
          " " +
          parsedUserData.user_details.last_name
      );
      setBio(parsedUserData.user_details.bio);
      setHowyoudie(parsedUserData.user_details.howyoudie);
      setAddress(parsedUserData.user_details.location);
      setMaxDistance(parsedUserData.preferences.max_distance);
      setMinAge(parsedUserData.preferences.prefered_min_age);
      setMaxAge(parsedUserData.preferences.prefered_max_age);
      setGender(parsedUserData.user_details.gender);
      setGhostMode(parsedUserData.preferences.is_ghost_mode);
      setShowOnFeed(parsedUserData.preferences.show_on_feed);

      setIsChanged({});
      return () => {};
    }, [userData])
  );

  const getCurrentLocation = async () => {
    setGettingLocation(true);
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
      handleChange("latitude", latitude);
      handleChange("longitude", longitude);

      const addressArray = await Location.reverseGeocodeAsync({
        latitude: latitude,
        longitude: longitude,
      });

      if (addressArray.length > 0) {
        const address = addressArray[0];
        const formattedAddress = `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.postalCode}, ${address.country}`;
        setAddress(formattedAddress);
        handleChange("address", formattedAddress);
      }
    } catch (error) {
      console.error("Error getting location or address:", error);
    } finally {
      setGettingLocation(false);
    }
  };

  const handleUpdateUser = async () => {
    const userObject: Record<string, string | boolean> = {};
    Object.entries(isChanged).forEach(([key, value]) => {
      if (key) {
        userObject[key] = value as string | boolean;
      }
    });

    setUpdating(true);

    try {
      await updateUser(userObject);
      const res = await getLoggedInUserDetails();
      await SecureStore.setItem("user", JSON.stringify(res.user));
      const user = await SecureStore.getItemAsync("user");

      dispatch(addUserData(user));
      ToastAndroid.show("Details updated", ToastAndroid.SHORT);

      setIsChanged({});
      setIsAnyFieldChanged(false);
    } catch (err) {
      console.log(err);
      ToastAndroid.show("Details updation failed", ToastAndroid.SHORT);
    } finally {
      setUpdating(false);
    }
  };

  if (updating) {
    return (
      <LinearGradient
        colors={["#252123", "#500177"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1 items-center justify-center "
      >
        <ActivityIndicator color={"purple"} size={"large"} />
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#252123", "#500177"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 px-4 pt-2 "
    >
      <ScrollView
        contentContainerStyle={{ paddingBottom: 200 }}
        showsVerticalScrollIndicator={false}
        className="ios:p-6"
      >
        <View className="mt-[3rem]">
          <View className="flex flex-row justify-between items-center">
            <Text className="text-gray-100 text-xl font-cinzelBold">
              Profile
            </Text>
            {isAnyFiledChanged === true && (
              <TouchableOpacity
                onPress={() => {
                  handleUpdateUser();
                }}
              >
                <Image source={require("@/assets/images/check.png")} />
              </TouchableOpacity>
            )}
          </View>

          <View className="flex border-[1px] border-slate-300  flex-col items-center mt-8 bg-gray-200/20 rounded-xl px-4 py-6">
            <Pressable
              onPress={() => uploadImage()}
              className="relative w-20 h-20 rounded-full"
            >
              <Image
                source={{ uri: profilePic }}
                className="w-full h-full rounded-full"
              />
              <View className="absolute right-0 bottom-0 bg-pink-600 w-7 h-7 rounded-full flex items-center justify-center">
                <Feather name="camera" size={16} color="white" />
              </View>
            </Pressable>

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
                onChangeText={(text) => {
                  setUsername(text);
                  if (text !== username) handleChange("username", text);
                }}
              />
            </View>
            <View>
              <Text className="text-gray-100 text-sm font-cinzel">Bio</Text>
              <TextInput
                className="bg-gray-200/30 text-gray-100 rounded-lg mt-2 px-3 font-cinzel"
                value={bio}
                onChangeText={(text) => {
                  setBio(text);
                  if (text !== bio) handleChange("bio", text);
                }}
              />
            </View>
            <View>
              <Text className="text-gray-100 text-sm font-cinzel">
                How you die!
              </Text>
              <TextInput
                className="bg-gray-200/30 text-gray-100 rounded-lg mt-2 px-3 font-cinzel"
                value={howyoudie}
                onChangeText={(text) => {
                  setHowyoudie(text);
                  if (text !== howyoudie) handleChange("howyoudie", text);
                }}
              />
            </View>
          </View>

          <View className="flex border-[1px] border-slate-300 flex-col gap-4 mt-8 bg-gray-200/20 rounded-xl px-4 py-6">
            <View>
              <Text className="text-gray-100 font-cinzel text-sm">
                Location
              </Text>
              <View className="flex flex-col">
                <TextInput
                  className="bg-gray-200/30 text-gray-100 rounded-lg mt-2 px-3 font-cinzel"
                  value={address}
                  onChangeText={(text) => {
                    setAddress(text);
                    if (text !== address) handleChange("address", text);
                  }}
                />
                <View className="items-end mt-2">
                  <TouchableOpacity onPress={() => getCurrentLocation()}>
                    {gettingLocation === false ? (
                      <Text className="font-cinzel mt-3  text-gray-100 text-xs">
                        Get current Location
                      </Text>
                    ) : (
                      <View className="mt-1">
                        <ActivityIndicator size={"small"} color={"white"} />
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View>
              <Text className="font-cinzel text-gray-100 text-sm">
                Maximum Distance
              </Text>
              <View className="flex flex-row justify-between">
                <Slider
                  style={{ width: 300, height: 20 }}
                  minimumValue={10}
                  maximumValue={100}
                  step={1}
                  value={maxDistance}
                  onValueChange={(value) => {
                    setMaxDistance(value);
                    if (value !== maxDistance)
                      handleChange("maxDistance", value);
                  }}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  thumbTintColor="#FF4081"
                />
                <Text className="text-gray-100 font-cinzelBold text-md">
                  {maxDistance}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex border-[1px] border-slate-300  flex-col  mt-8 bg-gray-200/20 rounded-xl px-4 py-6">
            <Text className="text-sm font-cinzel text-gray-100">Gender</Text>
            <View>
              <Picker
                selectedValue={gender}
                onValueChange={(itemValue) => {
                  setGender(itemValue);
                  if (itemValue !== gender) handleChange("gender", itemValue);
                }}
              >
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
            </View>
            <View>
              <Text className="font-cinzel text-gray-100 text-sm">
                Age range
              </Text>
              <View className="flex mt-3 flex-row justify-between w-[300px]">
                <RangeSlider
                  style={{ width: "100%" }}
                  min={19}
                  max={90}
                  step={1}
                  low={minAge}
                  high={maxAge}
                  floatingLabel
                  renderThumb={() => (
                    <View
                      style={{
                        width: 15,
                        height: 15,
                        backgroundColor: "#FF4081",
                        borderRadius: 10,
                      }}
                    />
                  )}
                  renderRail={() => (
                    <View
                      style={{
                        flex: 1,
                        height: 2,
                        backgroundColor: "#333",
                      }}
                    />
                  )}
                  renderRailSelected={() => (
                    <View
                      style={{
                        flex: 1,
                        height: 2,
                        backgroundColor: "#fff",
                      }}
                    />
                  )}
                  onValueChanged={(low, high) => {
                    setMinAge(low);
                    setMaxAge(high);
                    if (low !== minAge || high !== maxAge) {
                      handleChange("minAge", low);
                      handleChange("maxAge", high);
                    }
                  }}
                />
                <Text className="text-gray-100 font-cinzelBold text-md">
                  {minAge}-{maxAge}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex border-[1px] border-slate-300  flex-col gap-3  mt-8 bg-gray-200/20 rounded-xl px-4 py-6">
            <View className="flex flex-row justify-between items-center">
              <Text className="text-sm font-cinzel text-gray-100">
                Show on feed
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#fff" }}
                thumbColor={showOnFeed ? "#FF4081" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => {
                  setShowOnFeed(value);
                  if (value !== showOnFeed) handleChange("showOnFeed", value);
                }}
                value={showOnFeed}
              />
            </View>
            <View className="flex flex-row justify-between items-center">
              <Text className="text-sm font-cinzel text-gray-100">
                Ghost mode
              </Text>
              <Switch
                trackColor={{ false: "#767577", true: "#fff" }}
                thumbColor={ghostMode ? "#FF4081" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={(value) => {
                  setGhostMode(value);
                  if (value !== ghostMode) handleChange("ghostMode", value);
                }}
                value={ghostMode}
              />
            </View>
          </View>

          <TouchableOpacity className="flex border-[1px] border-slate-300  flex-col  mt-8 bg-gray-200/20 rounded-xl px-4 py-6">
            <View className="flex flex-row gap-4 items-center">
              <Text className="text-gray-100 font-cinzel text-sm ">
                My membership
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className="flex border-[1px] border-slate-300  flex-col  mt-8 bg-gray-200/20 rounded-xl px-4 py-6">
            <View className="flex flex-row gap-4 items-center">
              <Text className="text-gray-100 font-cinzel text-sm ">
                Terms and conditions
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => logout()}
            className="flex border-[1px] border-slate-300  flex-col  mt-8 bg-gray-200/20 rounded-xl px-4 py-6"
          >
            <View className="flex flex-row gap-4 items-center">
              <MaterialIcons name="logout" size={24} color="white" />
              <Text className="text-gray-100 font-cinzelBold text-sm ">
                Log out
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <StatusBar backgroundColor={"#271e1e"} />
      </ScrollView>
    </LinearGradient>
  );
}
