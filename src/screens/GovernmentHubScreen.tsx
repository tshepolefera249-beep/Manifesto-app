import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { Card } from "@components/Card";
import { colors } from "@utils/colors";

type GovernmentHubScreenNavigationProp = StackNavigationProp<RootStackParamList, "GovernmentHub">;

export const GovernmentHubScreen = () => {
  const navigation = useNavigation<GovernmentHubScreenNavigationProp>();

  const hubModules = [
    {
      id: "leaders",
      title: "Leaders",
      description: "Directory of politicians and government officials",
      icon: "👥",
      onPress: () => navigation.navigate("Leaders"),
    },
    {
      id: "departments",
      title: "Departments",
      description: "National and provincial departments",
      icon: "🏛️",
      onPress: () => navigation.navigate("Departments"),
    },
    {
      id: "projects",
      title: "Projects & Tenders",
      description: "Track government projects and tenders",
      icon: "🏗️",
      onPress: () => navigation.navigate("Projects"),
    },
    {
      id: "parliament",
      title: "Parliament",
      description: "Bills, sessions, and voting records",
      icon: "📜",
      onPress: () => navigation.navigate("Parliament"),
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Government Hub</Text>
        <Text style={styles.subtitle}>Transparency and accountability at your fingertips</Text>
      </View>

      <View style={styles.modules}>
        {hubModules.map((module) => (
          <Card key={module.id} style={styles.moduleCard} onPress={module.onPress}>
            <View style={styles.moduleContent}>
              <Text style={styles.moduleIcon}>{module.icon}</Text>
              <View style={styles.moduleInfo}>
                <Text style={styles.moduleTitle}>{module.title}</Text>
                <Text style={styles.moduleDescription}>{module.description}</Text>
              </View>
              <Text style={styles.moduleArrow}>→</Text>
            </View>
          </Card>
        ))}
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
    padding: 24,
    backgroundColor: colors.primary.blue,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.primary.white,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.primary.white,
    opacity: 0.9,
  },
  modules: {
    padding: 16,
  },
  moduleCard: {
    marginBottom: 16,
  },
  moduleContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  moduleIcon: {
    fontSize: 48,
  },
  moduleInfo: {
    flex: 1,
  },
  moduleTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 4,
  },
  moduleDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
  },
  moduleArrow: {
    fontSize: 24,
    color: colors.text.secondary,
  },
});

