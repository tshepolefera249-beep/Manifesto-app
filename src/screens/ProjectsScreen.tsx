import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { Card } from "@components/Card";
import { ProgressBar } from "@components/ProgressBar";
import { Badge } from "@components/Badge";
import { colors } from "@utils/colors";
import { formatCurrency } from "@utils/format";
import { mockProjects } from "@data/mockData";

type ProjectsScreenNavigationProp = StackNavigationProp<RootStackParamList, "Projects">;

const stageColors: Record<string, string> = {
  planning: colors.text.secondary,
  tender: colors.status.info,
  in_progress: colors.status.warning,
  completed: colors.status.success,
  on_hold: colors.text.secondary,
  cancelled: colors.status.error,
};

export const ProjectsScreen = () => {
  const navigation = useNavigation<ProjectsScreenNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      {mockProjects.map((project) => {
        const budgetProgress = (project.budgetSpent / project.budgetAllocated) * 100;
        const completedMilestones = project.milestones.filter(m => m.completed).length;
        const milestoneProgress = project.milestones.length > 0
          ? (completedMilestones / project.milestones.length) * 100
          : 0;

        return (
          <Card
            key={project._id}
            style={styles.projectCard}
            onPress={() => navigation.navigate("ProjectDetail", { projectId: project._id })}
          >
            <View style={styles.projectHeader}>
              <Text style={styles.projectTitle}>{project.title}</Text>
              <Badge
                variant={
                  project.stage === "completed" ? "success" :
                  project.stage === "cancelled" ? "error" :
                  project.stage === "in_progress" ? "info" : "secondary"
                }
                text={project.stage.replace("_", " ")}
                size="small"
              />
            </View>

            <Text style={styles.projectDescription}>{project.description}</Text>

            <View style={styles.budgetSection}>
              <View style={styles.budgetRow}>
                <Text style={styles.budgetLabel}>Budget</Text>
                <Text style={styles.budgetValue}>{formatCurrency(project.budgetAllocated)}</Text>
              </View>
              <View style={styles.budgetRow}>
                <Text style={styles.budgetLabel}>Spent</Text>
                <Text style={styles.budgetValue}>{formatCurrency(project.budgetSpent)}</Text>
              </View>
              <ProgressBar progress={budgetProgress} height={8} />
            </View>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{completedMilestones} / {project.milestones.length}</Text>
                <Text style={styles.statLabel}>Milestones</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{project.jobsCreated}</Text>
                <Text style={styles.statLabel}>Jobs Created</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{project.citizenMediaCount}</Text>
                <Text style={styles.statLabel}>Media</Text>
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
  projectCard: {
    margin: 16,
    marginBottom: 16,
  },
  projectHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  projectTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    flex: 1,
    marginRight: 8,
  },
  projectDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  budgetSection: {
    marginBottom: 16,
  },
  budgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  budgetLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  budgetValue: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.primary,
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
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});

