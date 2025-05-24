import * as Location from "expo-location";
import { GoogleMaps } from "expo-maps";
import { GoogleMapsColorScheme } from "expo-maps/build/google/GoogleMaps.types";
import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

export default function LocationInput() {
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null
  );

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission not granted");
        return;
      }

      let loca = await Location.getCurrentPositionAsync({});
      setLocation(loca);
    };

    getLocation();
  }, []);

  return (
    <View className="w-screen px-[1rem]">
      <Text className="font-cinzelBold text-3xl px-[1rem]">
        Where do you live?
      </Text>

      <View className="mt-[4rem]">
        <TextInput
          className="font-cinzel border placeholder:text-gray-600 border-gray-400 text-gray-800 rounded-lg p-2"
          value={address}
          onChangeText={setAddress}
          placeholder="Enter your address, area or pincode"
        />
      </View>

      <View className="mt-[2rem] flx flex-col items-center">
        <GoogleMaps.View
          style={{ width: 350, height: 350 }}
          colorScheme={GoogleMapsColorScheme.FOLLOW_SYSTEM}
          markers={[
            {
              coordinates: {
                latitude: location?.coords.latitude,
                longitude: location?.coords.longitude,
              },
              title: "Your current location",
              draggable: true,
            },
          ]}
          cameraPosition={{
            coordinates: {
              latitude: location?.coords.latitude,
              longitude: location?.coords.longitude,
            },
            zoom: 15,
          }}
          properties={{
            isMyLocationEnabled: true,
          }}
        />
      </View>
    </View>
  );
}
