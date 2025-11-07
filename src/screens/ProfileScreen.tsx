import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { Avatar } from "@components/Avatar";
import { Badge } from "@components/Badge";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { colors } from "@utils/colors";
import { useAuthStore } from "@store/authStore";

type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Main">;

export const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { user, logout } = useAuthStore();

  // Mock user data for display
  const displayUser = user || {
    _id: "user-1",
    name: "John Citizen",
    email: "john@example.com",
    phone: "+27 12 345 6789",
    profilePhoto: "https://via.placeholder.com/200",
    bio: "Active citizen passionate about transparency and accountability",
    civicInterests: ["Healthcare", "Education", "Infrastructure"],
    badges: ["Debater", "Fact Checker", "Accountability Champion"],
    trustScore: 85,
    createdAt: Date.now() - 365 * 24 * 60 * 60 * 1000,
    lastActiveAt: Date.now(),
    isActive: true,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar uri={displayUser.profilePhoto} name={displayUser.name} size={100} />
        <Text style={styles.name}>{displayUser.name}</Text>
        <Text style={styles.email}>{displayUser.email}</Text>
        <View style={styles.trustScore}>
          <Text style={styles.trustScoreLabel}>Trust Score</Text>
          <Text style={styles.trustScoreValue}>{displayUser.trustScore}</Text>
        </View>
      </View>

      {displayUser.bio && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Bio</Text>
          <Text style={styles.bio}>{displayUser.bio}</Text>
        </Card>
      )}

      {displayUser.badges.length > 0 && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Badges</Text>
          <View style={styles.badges}>
            {displayUser.badges.map((badge, index) => (
              <Badge key={index} variant="primary" text={badge} />
            ))}
          </View>
        </Card>
      )}

      {displayUser.civicInterests.length > 0 && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Civic Interests</Text>
          <View style={styles.interests}>
            {displayUser.civicInterests.map((interest, index) => (
              <Badge key={index} variant="secondary" text={interest} />
            ))}
          </View>
        </Card>
      )}

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Edit Profile</Text>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Notifications</Text>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>Privacy</Text>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingLabel}>About</Text>
          <Text style={styles.settingArrow}>→</Text>
        </TouchableOpacity>
      </Card>

      <View style={styles.logoutSection}>
        <Button title="Logout" variant="outline" onPress={logout} />
      </View>
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
    fontSize: 24,
    fontWeight: "700",
    color: colors.text.primary,
    marginTop: 16,
  },
  email: {
    fontSize: 14,
    color: colors.text.secondary,
    marginTop: 4,
  },
  trustScore: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
  },
  trustScoreLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  trustScoreValue: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primary.blue,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  interests: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  settingLabel: {
    fontSize: 16,
    color: colors.text.primary,
  },
  settingArrow: {
    fontSize: 18,
    color: colors.text.secondary,
  },
  logoutSection: {
    padding: 16,
    marginBottom: 24,
  },
});

