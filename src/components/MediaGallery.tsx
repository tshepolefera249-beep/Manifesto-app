import React from "react";
import { View, FlatList, Image, TouchableOpacity, StyleSheet } from "react-native";
import { MediaUpload } from "@types/index";
import { colors } from "@utils/colors";

interface MediaGalleryProps {
  media: MediaUpload[];
  onMediaPress?: (media: MediaUpload) => void;
  columns?: number;
}

export const MediaGallery: React.FC<MediaGalleryProps> = ({
  media,
  onMediaPress,
  columns = 3,
}) => {
  const itemSize = 100 / columns;

  const renderItem = ({ item }: { item: MediaUpload }) => (
    <TouchableOpacity
      style={[styles.item, { width: `${itemSize}%` }]}
      onPress={() => onMediaPress?.(item)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.thumbnailUrl || item.url }} style={styles.image} />
      {item.type === "video" && (
        <View style={styles.videoIndicator}>
          <View style={styles.videoIcon} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={media}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={columns}
        contentContainerStyle={styles.content}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 2,
  },
  item: {
    aspectRatio: 1,
    padding: 2,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
    backgroundColor: colors.primary.grey,
  },
  videoIndicator: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  videoIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderTopWidth: 4,
    borderBottomWidth: 4,
    borderTopColor: "transparent",
    borderBottomColor: "transparent",
    borderLeftColor: colors.primary.white,
    marginLeft: 2,
  },
});

