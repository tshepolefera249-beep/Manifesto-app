import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { Card } from "@components/Card";
import { Avatar } from "@components/Avatar";
import { Badge } from "@components/Badge";
import { ProgressBar } from "@components/ProgressBar";
import { colors } from "@utils/colors";
import { formatDate } from "@utils/format";
import { mockLeaders } from "@data/mockData";

type LeaderDetailScreenRouteProp = RouteProp<RootStackParamList, "LeaderDetail">;
type LeaderDetailScreenNavigationProp = StackNavigationProp<RootStackParamList, "LeaderDetail">;

interface Props {
  route: LeaderDetailScreenRouteProp;
  navigation: LeaderDetailScreenNavigationProp;
}

export const LeaderDetailScreen: React.FC<Props> = ({ route }) => {
  const leader = mockLeaders.find(l => l._id === route.params.leaderId);

  if (!leader) {
    return (
      <View style={styles.container}>
        <Text>Leader not found</Text>
      </View>
    );
  }

  const fulfilledPromises = leader.promises.filter(p => p.status === "fulfilled").length;
  const promiseProgress = leader.promises.length > 0
    ? (fulfilledPromises / leader.promises.length) * 100
    : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar uri={leader.photo} name={leader.name} size={100} />
        <Text style={styles.name}>{leader.name}</Text>
        <Text style={styles.position}>{leader.position}</Text>
        <Text style={styles.party}>{leader.party}</Text>
      </View>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Bio</Text>
        <Text style={styles.bio}>{leader.bio}</Text>
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Approval Rating</Text>
        <ProgressBar progress={leader.approvalRating} height={12} />
        <Text style={styles.ratingValue}>{leader.approvalRating}%</Text>
      </Card>

      {leader.promises.length > 0 && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Promises ({fulfilledPromises} / {leader.promises.length} fulfilled)</Text>
          <ProgressBar progress={promiseProgress} height={8} color={colors.status.success} />
          {leader.promises.map((promise) => (
            <View key={promise.id} style={styles.promise}>
              <View style={styles.promiseHeader}>
                <Text style={styles.promiseTitle}>{promise.title}</Text>
                <Badge
                  variant={
                    promise.status === "fulfilled" ? "success" :
                    promise.status === "broken" ? "error" :
                    promise.status === "in_progress" ? "info" : "secondary"
                  }
                  text={promise.status}
                  size="small"
                />
              </View>
              <Text style={styles.promiseDescription}>{promise.description}</Text>
            </View>
          ))}
        </Card>
      )}

      {leader.achievements.length > 0 && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {leader.achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievement}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              <Text style={styles.achievementDate}>{formatDate(achievement.achievedAt)}</Text>
            </View>
          ))}
        </Card>
      )}

      {leader.scandals.length > 0 && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Scandals</Text>
          {leader.scandals.map((scandal) => (
            <View key={scandal.id} style={styles.scandal}>
              <Text style={styles.scandalTitle}>{scandal.title}</Text>
              <Text style={styles.scandalDescription}>{scandal.description}</Text>
              <Text style={styles.scandalDate}>{formatDate(scandal.reportedAt)}</Text>
            </View>
          ))}
        </Card>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  header: {
    alignItems: "center",
    padding: 24,
    backgroundColor: colors.background.primary,
    marginBottom: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text.primary,
    marginTop: 16,
  },
  position: {
    fontSize: 18,
    color: colors.text.primary,
    marginTop: 4,
  },
  party: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 2,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
  ratingValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary.blue,
    marginTop: 8,
    textAlign: "center",
  },
  promise: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  promiseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  promiseTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    flex: 1,
  },
  promiseDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  achievement: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  scandal: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  scandalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.status.error,
    marginBottom: 4,
  },
  scandalDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  scandalDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});

