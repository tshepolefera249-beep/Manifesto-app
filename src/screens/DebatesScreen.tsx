import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { Card } from "@components/Card";
import { Avatar } from "@components/Avatar";
import { ProgressBar } from "@components/ProgressBar";
import { Button } from "@components/Button";
import { colors } from "@utils/colors";
import { formatDate, formatNumber } from "@utils/format";
import { mockDebates } from "@data/mockData";

type DebatesScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">;

export const DebatesScreen = () => {
  const navigation = useNavigation<DebatesScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // TODO: Refresh data from Convex
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handleDebatePress = (debateId: string) => {
    navigation.navigate("DebateDetail", { debateId });
  };

  const getAgreePercentage = (debate: typeof mockDebates[0]) => {
    const total = debate.agreeCount + debate.disagreeCount + debate.neutralCount;
    return total > 0 ? (debate.agreeCount / total) * 100 : 0;
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Debates</Text>
        <Button title="+ New Debate" variant="primary" size="small" onPress={() => {
          // TODO: Navigate to create debate
          console.log("Create debate");
        }} />
      </View>

      {mockDebates.map((debate) => {
        const agreePercentage = getAgreePercentage(debate);
        const totalReactions = debate.agreeCount + debate.disagreeCount + debate.neutralCount;

        return (
          <Card
            key={debate._id}
            style={styles.debateCard}
            onPress={() => handleDebatePress(debate._id)}
          >
            <View style={styles.debateHeader}>
              <Avatar
                uri={debate.user?.profilePhoto}
                name={debate.user?.name || "User"}
                size={40}
              />
              <View style={styles.debateHeaderInfo}>
                <Text style={styles.debateAuthor}>{debate.user?.name || "User"}</Text>
                <Text style={styles.debateTime}>{formatDate(debate.createdAt)}</Text>
              </View>
            </View>

            <Text style={styles.debateTitle}>{debate.title}</Text>
            <Text style={styles.debateDescription}>{debate.description}</Text>

            <View style={styles.debateStats}>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Agree</Text>
                <Text style={styles.statValue}>{formatNumber(debate.agreeCount)}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Disagree</Text>
                <Text style={styles.statValue}>{formatNumber(debate.disagreeCount)}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>Neutral</Text>
                <Text style={styles.statValue}>{formatNumber(debate.neutralCount)}</Text>
              </View>
            </View>

            <ProgressBar progress={agreePercentage} height={6} />

            <View style={styles.debateFooter}>
              <Text style={styles.commentCount}>
                💬 {formatNumber(debate.commentCount)} comments
              </Text>
              <Text style={styles.topic}>{debate.topic}</Text>
            </View>
          </Card>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text.primary,
  },
  debateCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  debateHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  debateHeaderInfo: {
    marginLeft: 12,
    flex: 1,
  },
  debateAuthor: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  debateTime: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  debateTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 8,
  },
  debateDescription: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
    marginBottom: 16,
  },
  debateStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 12,
    paddingVertical: 12,
    backgroundColor: colors.primary.grey,
    borderRadius: 8,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
  },
  debateFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  commentCount: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  topic: {
    fontSize: 12,
    color: colors.primary.blue,
    fontWeight: "600",
  },
});

