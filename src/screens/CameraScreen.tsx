import React from "react";
import { View } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { CameraView } from "@components/CameraView";
import { mockFilters } from "@data/mockData";

type CameraScreenNavigationProp = StackNavigationProp<RootStackParamList, "Camera">;
type CameraScreenRouteProp = RouteProp<RootStackParamList, "Camera">;

export const CameraScreen = () => {
  const navigation = useNavigation<CameraScreenNavigationProp>();

  const handlePhotoTaken = (uri: string) => {
    // TODO: Navigate to create post with photo
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        onPhotoTaken={handlePhotoTaken}
        onClose={() => navigation.goBack()}
        filters={mockFilters}
      />
    </View>
  );
};

