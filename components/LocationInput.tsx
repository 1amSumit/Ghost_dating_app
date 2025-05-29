import { addAddress, addLocation } from "@/store/createUserSlice";
import { RootState } from "@/store/store";
import * as Location from "expo-location";
import { GoogleMaps } from "expo-maps";
import { GoogleMapsColorScheme } from "expo-maps/build/google/GoogleMaps.types";
import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function LocationInput() {
  const { address } = useSelector((state: RootState) => state.createUserSlice);
  const { location } = useSelector((state: RootState) => state.createUserSlice);

  const dispatch = useDispatch();
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Location permission not granted");
        setHasLocationPermission(false);
        return;
      }

      setHasLocationPermission(true);

      let loca = await Location.getCurrentPositionAsync({});
      dispatch(addLocation(loca));
    };

    getLocation();
  }, []);

  const latitude = location?.coords?.latitude;
  const longitude = location?.coords?.longitude;

  const isValidLocation =
    hasLocationPermission && latitude != null && longitude != null;

  return (
    <View className="w-screen px-[1rem]">
      <Text className="font-cinzelBold text-3xl px-[1rem]">
        Where do you live?
      </Text>

      <View className="mt-[4rem]">
        <TextInput
          className="font-cinzelBold placeholder:font-cinzel border placeholder:text-gray-700 border-gray-400 text-gray-800 rounded-lg p-2"
          value={address}
          onChangeText={(text) => dispatch(addAddress(text))}
          placeholder="Enter your address, area or pincode"
        />
      </View>

      {isValidLocation ? (
        <View className="mt-[2rem] flx flex-col items-center">
          <GoogleMaps.View
            style={{ width: 350, height: 350 }}
            colorScheme={GoogleMapsColorScheme.FOLLOW_SYSTEM}
            markers={[
              {
                coordinates: {
                  latitude,
                  longitude,
                },
                title: "Your current location",
                draggable: true,
              },
            ]}
            cameraPosition={{
              coordinates: {
                latitude,
                longitude,
              },
              zoom: 15,
            }}
            properties={{
              isMyLocationEnabled: true,
            }}
          />
        </View>
      ) : (
        <View className="mt-[2rem] items-center">
          <Text className="text-red-500">
            Location permission not granted. Please enable it to see the map.
          </Text>
        </View>
      )}
    </View>
  );
}
