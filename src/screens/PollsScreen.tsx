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
import { mockPolls } from "@data/mockData";

type PollsScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">;

export const PollsScreen = () => {
  const navigation = useNavigation<PollsScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // TODO: Refresh data from Convex
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handlePollPress = (pollId: string) => {
    navigation.navigate("PollDetail", { pollId });
  };

  const getOptionPercentage = (votes: number, total: number) => {
    return total > 0 ? (votes / total) * 100 : 0;
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Polls & Surveys</Text>
        <Button title="+ New Poll" variant="primary" size="small" onPress={() => {
          // TODO: Navigate to create poll
          console.log("Create poll");
        }} />
      </View>

      {mockPolls.map((poll) => (
        <Card
          key={poll._id}
          style={styles.pollCard}
          onPress={() => handlePollPress(poll._id)}
        >
          <View style={styles.pollHeader}>
            <Avatar
              uri={poll.user?.profilePhoto}
              name={poll.user?.name || "User"}
              size={40}
            />
            <View style={styles.pollHeaderInfo}>
              <Text style={styles.pollAuthor}>{poll.user?.name || "User"}</Text>
              <Text style={styles.pollTime}>{formatDate(poll.createdAt)}</Text>
            </View>
          </View>

          <Text style={styles.pollTitle}>{poll.title}</Text>
          <Text style={styles.pollDescription}>{poll.description}</Text>

          <View style={styles.options}>
            {poll.options.map((option) => {
              const percentage = getOptionPercentage(option.voteCount, poll.totalVotes);
              return (
                <View key={option.id} style={styles.option}>
                  <View style={styles.optionHeader}>
                    <Text style={styles.optionText}>{option.text}</Text>
                    <Text style={styles.optionPercentage}>{Math.round(percentage)}%</Text>
                  </View>
                  <ProgressBar progress={percentage} height={8} />
                  <Text style={styles.optionVotes}>{formatNumber(option.voteCount)} votes</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.pollFooter}>
            <Text style={styles.totalVotes}>{formatNumber(poll.totalVotes)} total votes</Text>
            {poll.isActive && <Text style={styles.activeBadge}>Active</Text>}
          </View>
        </Card>
      ))}
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
  pollCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  pollHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  pollHeaderInfo: {
    marginLeft: 12,
    flex: 1,
  },
  pollAuthor: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  pollTime: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  pollTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 8,
  },
  pollDescription: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
    marginBottom: 16,
  },
  options: {
    gap: 12,
    marginBottom: 16,
  },
  option: {
    padding: 12,
    backgroundColor: colors.primary.grey,
    borderRadius: 8,
  },
  optionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
    flex: 1,
  },
  optionPercentage: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.primary.blue,
  },
  optionVotes: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  pollFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  totalVotes: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  activeBadge: {
    fontSize: 12,
    color: colors.status.success,
    fontWeight: "600",
  },
});

