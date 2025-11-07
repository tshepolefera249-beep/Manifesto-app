import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { Card } from "@components/Card";
import { Avatar } from "@components/Avatar";
import { ProgressBar } from "@components/ProgressBar";
import { Badge } from "@components/Badge";
import { Button } from "@components/Button";
import { colors } from "@utils/colors";
import { formatDate, formatNumber } from "@utils/format";
import { mockPetitions } from "@data/mockData";

type PetitionsScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">;

export const PetitionsScreen = () => {
  const navigation = useNavigation<PetitionsScreenNavigationProp>();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // TODO: Refresh data from Convex
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handlePetitionPress = (petitionId: string) => {
    navigation.navigate("PetitionDetail", { petitionId });
  };

  const getProgressPercentage = (current: number, goal: number) => {
    return Math.min(100, (current / goal) * 100);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Petitions</Text>
        <Button title="+ New Petition" variant="primary" size="small" onPress={() => {
          // TODO: Navigate to create petition
          console.log("Create petition");
        }} />
      </View>

      {mockPetitions.map((petition) => {
        const progress = getProgressPercentage(petition.currentSignatures, petition.goal);
        const daysRemaining = Math.ceil((petition.targetDeadline - Date.now()) / (1000 * 60 * 60 * 24));

        return (
          <Card
            key={petition._id}
            style={styles.petitionCard}
            onPress={() => handlePetitionPress(petition._id)}
          >
            <View style={styles.petitionHeader}>
              <Avatar
                uri={petition.user?.profilePhoto}
                name={petition.user?.name || "User"}
                size={40}
              />
              <View style={styles.petitionHeaderInfo}>
                <Text style={styles.petitionAuthor}>{petition.user?.name || "User"}</Text>
                <Text style={styles.petitionTime}>{formatDate(petition.createdAt)}</Text>
              </View>
              <Badge
                variant={petition.status === "active" ? "success" : "secondary"}
                text={petition.status}
                size="small"
              />
            </View>

            <Text style={styles.petitionTitle}>{petition.title}</Text>
            <Text style={styles.petitionDescription}>{petition.description}</Text>

            <View style={styles.progressSection}>
              <View style={styles.progressHeader}>
                <Text style={styles.signaturesCount}>
                  {formatNumber(petition.currentSignatures)} / {formatNumber(petition.goal)} signatures
                </Text>
                <Text style={styles.daysRemaining}>{daysRemaining} days remaining</Text>
              </View>
              <ProgressBar progress={progress} height={12} />
            </View>

            <View style={styles.petitionFooter}>
              <TouchableOpacity style={styles.signButton}>
                <Text style={styles.signButtonText}>✍️ Sign Petition</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareButtonText}>📤 Share</Text>
              </TouchableOpacity>
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
  petitionCard: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  petitionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  petitionHeaderInfo: {
    flex: 1,
  },
  petitionAuthor: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
  },
  petitionTime: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 2,
  },
  petitionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 8,
  },
  petitionDescription: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
    marginBottom: 16,
  },
  progressSection: {
    marginBottom: 16,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  signaturesCount: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.primary,
  },
  daysRemaining: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  petitionFooter: {
    flexDirection: "row",
    gap: 12,
  },
  signButton: {
    flex: 1,
    backgroundColor: colors.primary.blue,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  signButtonText: {
    color: colors.primary.white,
    fontSize: 16,
    fontWeight: "600",
  },
  shareButton: {
    flex: 1,
    backgroundColor: colors.primary.grey,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  shareButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
});

