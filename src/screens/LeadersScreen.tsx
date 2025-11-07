import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { Card } from "@components/Card";
import { Avatar } from "@components/Avatar";
import { ProgressBar } from "@components/ProgressBar";
import { colors } from "@utils/colors";
import { mockLeaders } from "@data/mockData";

type LeadersScreenNavigationProp = StackNavigationProp<RootStackParamList, "Leaders">;

export const LeadersScreen = () => {
  const navigation = useNavigation<LeadersScreenNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      {mockLeaders.map((leader) => {
        const fulfilledPromises = leader.promises.filter(p => p.status === "fulfilled").length;
        const promiseProgress = leader.promises.length > 0
          ? (fulfilledPromises / leader.promises.length) * 100
          : 0;

        return (
          <Card
            key={leader._id}
            style={styles.leaderCard}
            onPress={() => navigation.navigate("LeaderDetail", { leaderId: leader._id })}
          >
            <View style={styles.leaderHeader}>
              <Avatar uri={leader.photo} name={leader.name} size={60} />
              <View style={styles.leaderInfo}>
                <Text style={styles.leaderName}>{leader.name}</Text>
                <Text style={styles.leaderPosition}>{leader.position}</Text>
                <Text style={styles.leaderParty}>{leader.party}</Text>
              </View>
            </View>

            <View style={styles.ratingSection}>
              <Text style={styles.ratingLabel}>Approval Rating</Text>
              <ProgressBar progress={leader.approvalRating} height={8} />
              <Text style={styles.ratingValue}>{leader.approvalRating}%</Text>
            </View>

            {leader.promises.length > 0 && (
              <View style={styles.promisesSection}>
                <Text style={styles.promisesLabel}>
                  Promises: {fulfilledPromises} / {leader.promises.length} fulfilled
                </Text>
                <ProgressBar progress={promiseProgress} height={6} color={colors.status.success} />
              </View>
            )}

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{leader.projectIds.length}</Text>
                <Text style={styles.statLabel}>Projects</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{leader.achievements.length}</Text>
                <Text style={styles.statLabel}>Achievements</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{leader.scandals.length}</Text>
                <Text style={styles.statLabel}>Scandals</Text>
              </View>
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
  leaderCard: {
    margin: 16,
    marginBottom: 16,
  },
  leaderHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 16,
  },
  leaderInfo: {
    flex: 1,
  },
  leaderName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 4,
  },
  leaderPosition: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 2,
  },
  leaderParty: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  ratingSection: {
    marginBottom: 16,
  },
  ratingLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  ratingValue: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.primary.blue,
    marginTop: 4,
  },
  promisesSection: {
    marginBottom: 16,
  },
  promisesLabel: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  stat: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});

