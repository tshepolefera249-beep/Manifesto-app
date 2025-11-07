import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  GestureResponderEvent,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { Card } from "@components/Card";
import { Avatar } from "@components/Avatar";
import { Badge } from "@components/Badge";
import { MediaFeed } from "@components/MediaFeed";
import { Button } from "@components/Button";
import { colors } from "@utils/colors";
import { formatDate, formatNumber } from "@utils/format";
import { mockPosts, mockMediaUploads } from "@data/mockData";
import { useAppStore } from "@store/appStore";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">;

export const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);
  const { setCameraOpen } = useAppStore();

  const handleRefresh = () => {
    setRefreshing(true);
    // TODO: Refresh data from Convex
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleSwipeRight = (event: GestureResponderEvent) => {
    // TODO: Implement swipe gesture to open camera
    navigation.navigate("Camera");
  };

  const handleCreatePost = () => {
    navigation.navigate("CreatePost");
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
      onTouchStart={handleSwipeRight}
    >
      {/* Government Hub Button */}
      <TouchableOpacity
        style={styles.govHubButton}
        onPress={() => navigation.navigate("GovernmentHub")}
      >
        <Text style={styles.govHubButtonText}>🏛️ South African Government</Text>
      </TouchableOpacity>

      {/* Create Post Button */}
      <View style={styles.createPostSection}>
        <Button title="+ Create Post" variant="primary" onPress={handleCreatePost} />
      </View>

      {/* Feed */}
      <View style={styles.feedSection}>
        <Text style={styles.sectionTitle}>Latest Updates</Text>
        {mockPosts.map((post) => (
          <Card key={post._id} style={styles.postCard}>
            <View style={styles.postHeader}>
              <Avatar
                uri={post.user?.profilePhoto}
                name={post.user?.name || "User"}
                size={40}
              />
              <View style={styles.postHeaderInfo}>
                <View style={styles.postHeaderTop}>
                  <Text style={styles.postAuthor}>{post.user?.name || "User"}</Text>
                  {post.isVerified && <Badge variant="success" text="✓ Verified" size="small" />}
                </View>
                <Text style={styles.postTime}>{formatDate(post.createdAt)}</Text>
              </View>
            </View>
            <Text style={styles.postTitle}>{post.title}</Text>
            <Text style={styles.postContent}>{post.content}</Text>
            {post.tags.length > 0 && (
              <View style={styles.tags}>
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="primary" text={tag} size="small" />
                ))}
              </View>
            )}
            <View style={styles.postFooter}>
              <TouchableOpacity style={styles.postAction}>
                <Text style={styles.postActionIcon}>❤️</Text>
                <Text style={styles.postActionText}>{formatNumber(post.likes)}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Text style={styles.postActionIcon}>💬</Text>
                <Text style={styles.postActionText}>{formatNumber(post.comments)}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postAction}>
                <Text style={styles.postActionIcon}>📤</Text>
                <Text style={styles.postActionText}>{formatNumber(post.shares)}</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>

      {/* Media Feed */}
      <View style={styles.mediaSection}>
        <Text style={styles.sectionTitle}>Citizen Media</Text>
        <MediaFeed
          media={mockMediaUploads}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          onMediaPress={(media) => {
            // TODO: Navigate to media detail
            console.log("Media pressed:", media._id);
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  govHubButton: {
    backgroundColor: colors.primary.blue,
    padding: 16,
    margin: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  govHubButtonText: {
    color: colors.primary.white,
    fontSize: 16,
    fontWeight: "700",
  },
  createPostSection: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  feedSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 12,
  },
  postCard: {
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  postHeaderInfo: {
    marginLeft: 12,
    flex: 1,
  },
  postHeaderTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  postTime: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 8,
  },
  postContent: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
    marginBottom: 12,
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  postFooter: {
    flexDirection: "row",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    gap: 24,
  },
  postAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  postActionIcon: {
    fontSize: 16,
  },
  postActionText: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  mediaSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
});

