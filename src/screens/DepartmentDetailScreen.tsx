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
import { mockDepartments } from "@data/mockData";

type DepartmentDetailScreenRouteProp = RouteProp<RootStackParamList, "DepartmentDetail">;

interface Props {
  route: DepartmentDetailScreenRouteProp;
}

export const DepartmentDetailScreen: React.FC<Props> = ({ route }) => {
  const department = mockDepartments.find(d => d._id === route.params.departmentId);

  if (!department) {
    return (
      <View style={styles.container}>
        <Text>Department not found</Text>
      </View>
    );
  }

  const budgetUsage = (department.expenditure / department.budget) * 100;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{department.name}</Text>
        <Badge variant={department.type === "national" ? "primary" : "secondary"} text={department.type} />
        <Text style={styles.description}>{department.description}</Text>
      </View>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Budget Overview</Text>
        <View style={styles.budgetRow}>
          <Text style={styles.budgetLabel}>Allocated</Text>
          <Text style={styles.budgetValue}>{formatCurrency(department.budget)}</Text>
        </View>
        <View style={styles.budgetRow}>
          <Text style={styles.budgetLabel}>Spent</Text>
          <Text style={styles.budgetValue}>{formatCurrency(department.expenditure)}</Text>
        </View>
        <View style={styles.budgetRow}>
          <Text style={styles.budgetLabel}>Remaining</Text>
          <Text style={styles.budgetValue}>{formatCurrency(department.budget - department.expenditure)}</Text>
        </View>
        <ProgressBar progress={budgetUsage} height={12} />
      </Card>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Performance Rating</Text>
        <ProgressBar progress={department.performanceRating} height={12} />
        <Text style={styles.ratingValue}>{department.performanceRating}%</Text>
      </Card>

      {department.keyInitiatives.length > 0 && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Key Initiatives</Text>
          {department.keyInitiatives.map((initiative) => (
            <View key={initiative.id} style={styles.initiative}>
              <Text style={styles.initiativeTitle}>{initiative.title}</Text>
              <Text style={styles.initiativeDescription}>{initiative.description}</Text>
              <Badge variant="info" text={initiative.status} size="small" />
            </View>
          ))}
        </Card>
      )}

      {department.issues.length > 0 && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Issues</Text>
          {department.issues.map((issue) => (
            <View key={issue.id} style={styles.issue}>
              <View style={styles.issueHeader}>
                <Text style={styles.issueTitle}>{issue.title}</Text>
                <Badge
                  variant={
                    issue.severity === "critical" ? "error" :
                    issue.severity === "high" ? "warning" : "secondary"
                  }
                  text={issue.severity}
                  size="small"
                />
              </View>
              <Text style={styles.issueDescription}>{issue.description}</Text>
              <Text style={styles.issueDate}>{formatDate(issue.reportedAt)}</Text>
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
    padding: 24,
    backgroundColor: colors.background.primary,
    marginBottom: 16,
    alignItems: "center",
  },
  name: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 8,
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
  ratingValue: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primary.blue,
    marginTop: 8,
    textAlign: "center",
  },
  initiative: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  initiativeTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 4,
  },
  initiativeDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 8,
  },
  issue: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  issueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    flex: 1,
  },
  issueDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 4,
  },
  issueDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
});

