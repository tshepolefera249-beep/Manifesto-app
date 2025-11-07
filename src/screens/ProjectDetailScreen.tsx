import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { Card } from "@components/Card";
import { ProgressBar } from "@components/ProgressBar";
import { Badge } from "@components/Badge";
import { colors } from "@utils/colors";
import { formatCurrency, formatDate } from "@utils/format";
import { mockProjects } from "@data/mockData";

type ProjectDetailScreenRouteProp = RouteProp<RootStackParamList, "ProjectDetail">;

interface Props {
  route: ProjectDetailScreenRouteProp;
}

export const ProjectDetailScreen: React.FC<Props> = ({ route }) => {
  const project = mockProjects.find(p => p._id === route.params.projectId);

  if (!project) {
    return (
      <View style={styles.container}>
        <Text>Project not found</Text>
      </View>
    );
  }

  const budgetProgress = (project.budgetSpent / project.budgetAllocated) * 100;
  const completedMilestones = project.milestones.filter(m => m.completed).length;
  const milestoneProgress = project.milestones.length > 0
    ? (completedMilestones / project.milestones.length) * 100
    : 0;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{project.title}</Text>
        <Badge
          variant={
            project.stage === "completed" ? "success" :
            project.stage === "cancelled" ? "error" :
            project.stage === "in_progress" ? "info" : "secondary"
          }
          text={project.stage.replace("_", " ")}
        />
        <Text style={styles.description}>{project.description}</Text>
      </View>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Budget</Text>
        <View style={styles.budgetRow}>
          <Text style={styles.budgetLabel}>Allocated</Text>
          <Text style={styles.budgetValue}>{formatCurrency(project.budgetAllocated)}</Text>
        </View>
        <View style={styles.budgetRow}>
          <Text style={styles.budgetLabel}>Spent</Text>
          <Text style={styles.budgetValue}>{formatCurrency(project.budgetSpent)}</Text>
        </View>
        <View style={styles.budgetRow}>
          <Text style={styles.budgetLabel}>Remaining</Text>
          <Text style={styles.budgetValue}>{formatCurrency(project.budgetAllocated - project.budgetSpent)}</Text>
        </View>
        <ProgressBar progress={budgetProgress} height={12} />
      </Card>

      {project.milestones.length > 0 && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Milestones ({completedMilestones} / {project.milestones.length})</Text>
          <ProgressBar progress={milestoneProgress} height={8} color={colors.status.success} />
          {project.milestones.map((milestone) => (
            <View key={milestone.id} style={styles.milestone}>
              <View style={styles.milestoneHeader}>
                <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                <Badge
                  variant={milestone.completed ? "success" : "secondary"}
                  text={milestone.completed ? "Completed" : "Pending"}
                  size="small"
                />
              </View>
              {milestone.completed && milestone.completedAt && (
                <Text style={styles.milestoneDate}>Completed: {formatDate(milestone.completedAt)}</Text>
              )}
            </View>
          ))}
        </Card>
      )}

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Project Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Category</Text>
          <Text style={styles.infoValue}>{project.category}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Location</Text>
          <Text style={styles.infoValue}>{project.location.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Start Date</Text>
          <Text style={styles.infoValue}>{formatDate(project.startDate)}</Text>
        </View>
        {project.endDate && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>End Date</Text>
            <Text style={styles.infoValue}>{formatDate(project.endDate)}</Text>
          </View>
        )}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Jobs Created</Text>
          <Text style={styles.infoValue}>{project.jobsCreated}</Text>
        </View>
        {project.responsibleCompany && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Responsible Company</Text>
            <Text style={styles.infoValue}>{project.responsibleCompany}</Text>
          </View>
        )}
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Citizen Media</Text>
        <Text style={styles.mediaCount}>{project.citizenMediaCount} photos/videos uploaded</Text>
        {/* TODO: Display media gallery */}
      </Card>
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
    backgroundColor: colors.background.primary,
    marginBottom: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginTop: 8,
    textAlign: "center",
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
  budgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
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
  milestone: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  milestoneHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    flex: 1,
  },
  milestoneDate: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: colors.text.secondary,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  },
  mediaCount: {
    fontSize: 14,
    color: colors.text.secondary,
  },
});

