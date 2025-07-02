import { addAddress, addLocation } from "@/store/createUserSlice";
import { RootState } from "@/store/store";

import * as Location from "expo-location";

import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import CustomInput from "./CustomInput";

export default function LocationInput() {
  const { address, location } = useSelector(
    (state: RootState) => state.createUserSlice
  );

  const dispatch = useDispatch();
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.warn("Location permission not granted");
      setHasLocationPermission(false);
      return;
    }

    setHasLocationPermission(true);

    const loca = await Location.getCurrentPositionAsync({});

    const { latitude, longitude } = loca.coords;
    const addressArray = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (addressArray) {
      const address = addressArray[0];
      const formattedAddress = `${address.name}, ${address.street}, ${address.city}, ${address.region}, ${address.postalCode}, ${address.country}`;
      dispatch(addAddress(formattedAddress));
    }
    dispatch(addLocation(loca));
  };

  useEffect(() => {
    getLocation();
  }, []);

  const latitude = location?.coords?.latitude;
  const longitude = location?.coords?.longitude;

  return (
    <View className="w-screen px-[1rem]">
      <Text className="font-cinzelBold text-3xl px-[1rem]">
        Where do you live?
      </Text>
      <View className="mt-[3rem] flex felx-col">
        <CustomInput
          value={address}
          label="Your address"
          placeholder="Enter your address"
          keyboardType="text"
          onChange={(text) => dispatch(addAddress(text))}
        />

        <TouchableOpacity
          onPress={() => {
            getLocation();
          }}
          className="px-[1rem] mt-2 items-end"
        >
          <Text className="font-cinzel bg-purple-600 px-2 py-1 rounded-lg text-gray-100 text-xs">
            Get current address
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
