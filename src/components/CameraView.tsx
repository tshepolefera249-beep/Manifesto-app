import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  Alert,
} from "react-native";
import { Camera, CameraType } from "expo-camera";
import * as ImagePicker from "expo-image-picker";
import { colors } from "@utils/colors";
import { FilterCarousel } from "./FilterCarousel";
import { Filter } from "@types/index";

interface CameraViewProps {
  onPhotoTaken: (uri: string) => void;
  onClose: () => void;
  filters?: Filter[];
}

export const CameraView: React.FC<CameraViewProps> = ({
  onPhotoTaken,
  onClose,
  filters = [],
}) => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState<CameraType>(CameraType.back);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const cameraRef = useRef<Camera>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        if (photo) {
          setCapturedPhoto(photo.uri);
        }
      } catch (error) {
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission needed", "Please grant gallery access");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setCapturedPhoto(result.assets[0].uri);
    }
  };

  const handleUsePhoto = () => {
    if (capturedPhoto) {
      // TODO: Apply selected filter to photo
      onPhotoTaken(capturedPhoto);
    }
  };

  const handleRetake = () => {
    setCapturedPhoto(null);
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Camera permission denied</Text>
        <TouchableOpacity style={styles.button} onPress={onClose}>
          <Text style={styles.buttonText}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (capturedPhoto) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: capturedPhoto }} style={styles.preview} />
        {filters.length > 0 && (
          <FilterCarousel
            filters={filters}
            selectedFilterId={selectedFilter || undefined}
            onFilterSelect={setSelectedFilter}
          />
        )}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlButton} onPress={handleRetake}>
            <Text style={styles.controlButtonText}>Retake</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlButton, styles.primaryButton]}
            onPress={handleUsePhoto}
          >
            <Text style={[styles.controlButtonText, styles.primaryButtonText]}>Use Photo</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.overlay}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>

          <View style={styles.bottomControls}>
            <TouchableOpacity style={styles.galleryButton} onPress={pickFromGallery}>
              <Text style={styles.galleryButtonText}>📷</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => setType(type === CameraType.back ? CameraType.front : CameraType.back)}
            >
              <Text style={styles.flipButtonText}>↻</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary.black,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  closeButtonText: {
    color: colors.primary.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  galleryButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  galleryButtonText: {
    fontSize: 24,
  },
  captureButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: colors.primary.white,
    justifyContent: "center",
    alignItems: "center",
  },
  captureButtonInner: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary.white,
  },
  flipButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  flipButtonText: {
    color: colors.primary.white,
    fontSize: 24,
  },
  preview: {
    flex: 1,
    width: "100%",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: colors.primary.black,
  },
  controlButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  primaryButton: {
    backgroundColor: colors.primary.blue,
  },
  controlButtonText: {
    color: colors.primary.white,
    fontSize: 16,
    fontWeight: "600",
  },
  primaryButtonText: {
    color: colors.primary.white,
  },
  button: {
    padding: 16,
    backgroundColor: colors.primary.blue,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: colors.primary.white,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  errorText: {
    color: colors.status.error,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

