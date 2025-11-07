import React from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors } from "@utils/colors";
import { formatDate } from "@utils/format";
import { MediaUpload } from "@types/index";
import { Avatar } from "./Avatar";
import { Badge } from "./Badge";

interface MediaCardProps {
  media: MediaUpload;
  onPress?: () => void;
  onLike?: () => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({ media, onPress, onLike }) => {
  const verificationBadge = {
    pending: { variant: "secondary" as const, text: "Pending" },
    verified: { variant: "success" as const, text: "Verified" },
    rejected: { variant: "error" as const, text: "Rejected" },
  }[media.verificationStatus];

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.header}>
        <Avatar
          uri={media.uploader?.profilePhoto}
          name={media.uploader?.name || "User"}
          size={32}
        />
        <View style={styles.headerInfo}>
          <Text style={styles.uploaderName}>{media.uploader?.name || "Unknown"}</Text>
          <Text style={styles.timestamp}>{formatDate(media.uploadedAt)}</Text>
        </View>
        <Badge variant={verificationBadge.variant} text={verificationBadge.text} size="small" />
      </View>

      {media.type === "photo" ? (
        <Image source={{ uri: media.url }} style={styles.media} resizeMode="cover" />
      ) : (
        <View style={[styles.media, styles.videoPlaceholder]}>
          <Text style={styles.videoText}>🎥 Video</Text>
        </View>
      )}

      {media.caption && (
        <View style={styles.caption}>
          <Text style={styles.captionText}>{media.caption}</Text>
        </View>
      )}

      {media.project && (
        <View style={styles.projectInfo}>
          <Text style={styles.projectLabel}>Related Project:</Text>
          <Text style={styles.projectName}>{media.project.title}</Text>
        </View>
      )}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.actionButton} onPress={onLike}>
          <Text style={styles.actionIcon}>❤️</Text>
          <Text style={styles.actionText}>{media.likeCount}</Text>
        </TouchableOpacity>
        <View style={styles.actionButton}>
          <Text style={styles.actionIcon}>👁️</Text>
          <Text style={styles.actionText}>{media.viewCount}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.primary,
    marginVertical: 8,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: colors.primary.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    gap: 12,
  },
  headerInfo: {
    flex: 1,
  },
  uploaderName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  },
  timestamp: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  media: {
    width: "100%",
    height: 300,
    backgroundColor: colors.primary.grey,
  },
  videoPlaceholder: {
    justifyContent: "center",
    alignItems: "center",
  },
  videoText: {
    fontSize: 24,
  },
  caption: {
    padding: 12,
  },
  captionText: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
  projectInfo: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: 12,
  },
  projectLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  projectName: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary.blue,
  },
  footer: {
    flexDirection: "row",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    gap: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  actionIcon: {
    fontSize: 16,
  },
  actionText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});

