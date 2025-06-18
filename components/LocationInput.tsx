import { addAddress, addLocation } from "@/store/createUserSlice";
import { RootState } from "@/store/store";

import * as Location from "expo-location";

import MapView, { MapPressEvent, Marker } from "react-native-maps";

import React, { useEffect, useMemo, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export default function LocationInput() {
  const { address, location } = useSelector(
    (state: RootState) => state.createUserSlice
  );

  const dispatch = useDispatch();
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const handleMapPress = async (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    dispatch(
      addLocation({
        coords: {
          latitude: latitude,
          longitude: longitude,
        },
      })
    );

    const newAddressArray = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    if (newAddressArray) {
      const address = newAddressArray[0];
      const formattedAddress = `${address.name} ${address.city} ${address.region}`;

      dispatch(addAddress(formattedAddress));
    }
  };

  useEffect(() => {
    const getLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.warn("Location permission not granted");
        setHasLocationPermission(false);
        return;
      }

      setHasLocationPermission(true);

      const loca = await Location.getCurrentPositionAsync({});
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

    getLocation();
  }, []);

  const latitude = location?.coords?.latitude;
  const longitude = location?.coords?.longitude;

  const isValidLocation =
    hasLocationPermission && latitude != null && longitude != null;

  const initialRegion = useMemo(() => {
    if (!latitude || !longitude) return null;
    return {
      latitude,
      longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    };
  }, [latitude, longitude]);

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

      {isValidLocation && initialRegion ? (
        <View className="mt-[2rem] flex flex-col items-center">
          <View className="w-[300px] h-[300px] rounded-lg overflow-hidden">
            <MapView
              style={{ width: "100%", height: "100%" }}
              initialRegion={initialRegion}
              zoomEnabled
              onPress={handleMapPress}
            >
              <Marker coordinate={{ latitude, longitude }} title={address} />
            </MapView>
          </View>
        </View>
      ) : (
        <View className="mt-[2rem] items-center">
          <Text className="text-red-500">
            Location permission not granted or location unavailable.
          </Text>
        </View>
      )}
    </View>
  );
}
