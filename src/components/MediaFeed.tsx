import React from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import { MediaCard } from "./MediaCard";
import { MediaUpload } from "@types/index";
import { colors } from "@utils/colors";

interface MediaFeedProps {
  media: MediaUpload[];
  onRefresh?: () => void;
  refreshing?: boolean;
  onMediaPress?: (media: MediaUpload) => void;
  onMediaLike?: (mediaId: string) => void;
}

export const MediaFeed: React.FC<MediaFeedProps> = ({
  media,
  onRefresh,
  refreshing = false,
  onMediaPress,
  onMediaLike,
}) => {
  const renderItem = ({ item }: { item: MediaUpload }) => (
    <MediaCard
      media={item}
      onPress={() => onMediaPress?.(item)}
      onLike={() => onMediaLike?.(item._id)}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={media}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.content}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          ) : undefined
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  content: {
    padding: 16,
  },
});

