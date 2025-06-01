import { addImages } from "@/store/createUserSlice";
import { AntDesign, Entypo } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch } from "react-redux";

export interface ImageSlot {
  id: number;
  uri: string | null;
  isRequired: boolean;
}

interface AddImagesProps {
  getLength: (count: number) => void;
}

export default function AddImages({ getLength }: AddImagesProps) {
  const dispatch = useDispatch();

  const [images, setImages] = useState<ImageSlot[]>([
    { id: 1, uri: null, isRequired: true },
    { id: 2, uri: null, isRequired: true },
    { id: 3, uri: null, isRequired: true },
    { id: 4, uri: null, isRequired: false },
    { id: 5, uri: null, isRequired: false },
    { id: 6, uri: null, isRequired: false },
  ]);

  useEffect(() => {
    getLength(getRequiredUploadedCount());

    if (getRequiredUploadedCount() >= 3) {
      const selectedImages = images.filter((img) => img.uri);
      dispatch(addImages(selectedImages));
    }
  }, [images]);

  const pickImage = async (slotId: number) => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: false,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets[0]) {
        setImages((prev) =>
          prev.map((img) =>
            img.id === slotId ? { ...img, uri: result.assets[0].uri } : img
          )
        );
      }
    } catch (error: any) {
      Alert.alert("Error", "Failed to pick image");
    }
  };

  const removeImage = (slotId: number) => {
    setImages((prev) =>
      prev.map((img) => (img.id === slotId ? { ...img, uri: null } : img))
    );
  };

  const getUploadedCount = () => {
    return images.filter((img) => img.uri !== null).length;
  };

  const getRequiredUploadedCount = () => {
    return images.filter((img) => img.isRequired && img.uri !== null).length;
  };

  const { width } = Dimensions.get("window");
  const imageSize = (width - 60) / 3;

  const renderImageSlot = (imageSlot: ImageSlot) => {
    const { id, uri, isRequired } = imageSlot;

    return (
      <View key={id} className="relative mb-4">
        <TouchableOpacity
          className={`justify-center items-center rounded-xl overflow-hidden relative ${
            isRequired
              ? "border-2 border-dashed border-red-400 bg-red-50"
              : "border-2 border-dashed border-gray-300 bg-gray-50"
          } ${uri ? "border-solid border-green-500" : ""}`}
          style={{ width: imageSize, height: imageSize }}
          onPress={() => pickImage(id)}
          activeOpacity={0.7}
        >
          {uri ? (
            <>
              <Image source={{ uri }} className="w-full h-full rounded-lg" />
              <TouchableOpacity
                className="absolute top-2 right-2 bg-black/60 rounded-xl w-6 h-6 justify-center items-center"
                onPress={() => removeImage(id)}
              >
                <Entypo name="cross" size={20} color="#fff" />
              </TouchableOpacity>
            </>
          ) : (
            <View className="items-center justify-center">
              <AntDesign name="plus" size={24} color="#666" />
              {isRequired && (
                <Text className="text-xs font-semibold text-red-400 mt-1">
                  Required
                </Text>
              )}
            </View>
          )}
        </TouchableOpacity>

        {isRequired && (
          <View className="absolute -top-2 -left-2 bg-red-400 rounded-full w-6 h-6 justify-center items-center">
            <Text className="text-white text-xs font-bold">{id}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      <View className="p-5 pb-2.5">
        <Text className="text-3xl font-cinzelBold  text-gray-800 mb-2">
          Add Your Photos
        </Text>
        <Text className="text-base font-cinzel text-gray-600 leading-6">
          Upload at least 3 photos to get started. Show your personality!
        </Text>
      </View>

      <View className="px-5 pb-5">
        <Text className="text-base font-cinzel font-semibold text-gray-800 mb-1">
          {getUploadedCount()}/6 photos uploaded
        </Text>
        <Text className="text-sm font-cinzelBold text-red-400">
          {getRequiredUploadedCount()}/3 required photos
        </Text>
      </View>

      <View className="flex-row flex-wrap px-5 justify-between">
        {images.map(renderImageSlot)}
      </View>
    </ScrollView>
  );
}
