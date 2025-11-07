import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { CameraView } from "./CameraView";
import { uploadMedia } from "@services/mediaService";
import { colors } from "@utils/colors";
import { Button } from "./Button";

interface MediaUploadProps {
  onUploadComplete: (url: string, type: "photo" | "video") => void;
  onCancel: () => void;
  projectId?: string;
}

export const MediaUpload: React.FC<MediaUploadProps> = ({
  onUploadComplete,
  onCancel,
  projectId,
}) => {
  const [uploading, setUploading] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [showCamera, setShowCamera] = useState(false);

  const handlePhotoTaken = (uri: string) => {
    setPhotoUri(uri);
    setShowCamera(false);
  };

  const handleUpload = async () => {
    if (!photoUri) {
      Alert.alert("Error", "Please select a photo first");
      return;
    }

    setUploading(true);
    try {
      const result = await uploadMedia(photoUri, "photo");
      // TODO: Save to Convex with caption and projectId
      onUploadComplete(result.url, "photo");
    } catch (error) {
      Alert.alert("Upload Failed", error instanceof Error ? error.message : "Unknown error");
    } finally {
      setUploading(false);
    }
  };

  const handlePickFromGallery = async () => {
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
      setPhotoUri(result.assets[0].uri);
    }
  };

  if (showCamera) {
    return <CameraView onPhotoTaken={handlePhotoTaken} onClose={() => setShowCamera(false)} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Upload Media</Text>
        <TouchableOpacity onPress={onCancel}>
          <Text style={styles.closeButton}>✕</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {photoUri ? (
          <View style={styles.previewContainer}>
            {/* Preview would go here */}
            <Text style={styles.previewText}>Photo selected</Text>
            <TextInput
              style={styles.captionInput}
              placeholder="Add a caption..."
              value={caption}
              onChangeText={setCaption}
              multiline
              numberOfLines={4}
            />
          </View>
        ) : (
          <View style={styles.uploadOptions}>
            <TouchableOpacity style={styles.optionButton} onPress={() => setShowCamera(true)}>
              <Text style={styles.optionIcon}>📷</Text>
              <Text style={styles.optionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.optionButton} onPress={handlePickFromGallery}>
              <Text style={styles.optionIcon}>🖼️</Text>
              <Text style={styles.optionText}>Choose from Gallery</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Button title="Cancel" variant="outline" onPress={onCancel} style={styles.button} />
        <Button
          title={uploading ? "Uploading..." : "Upload"}
          onPress={handleUpload}
          disabled={!photoUri || uploading}
          loading={uploading}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
  },
  closeButton: {
    fontSize: 24,
    color: colors.text.secondary,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  uploadOptions: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 24,
  },
  optionButton: {
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.primary.grey,
    borderRadius: 12,
    minWidth: 200,
  },
  optionIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  previewContainer: {
    flex: 1,
  },
  previewText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 16,
  },
  captionInput: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    color: colors.text.primary,
    minHeight: 100,
    textAlignVertical: "top",
  },
  footer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  button: {
    flex: 1,
  },
});

