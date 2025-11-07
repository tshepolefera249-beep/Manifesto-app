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
import { mockDepartments } from "@data/mockData";

type DepartmentsScreenNavigationProp = StackNavigationProp<RootStackParamList, "Departments">;

export const DepartmentsScreen = () => {
  const navigation = useNavigation<DepartmentsScreenNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      {mockDepartments.map((dept) => {
        const budgetUsage = (dept.expenditure / dept.budget) * 100;

        return (
          <Card
            key={dept._id}
            style={styles.departmentCard}
            onPress={() => navigation.navigate("DepartmentDetail", { departmentId: dept._id })}
          >
            <View style={styles.departmentHeader}>
              <Text style={styles.departmentName}>{dept.name}</Text>
              <Badge
                variant={dept.type === "national" ? "primary" : "secondary"}
                text={dept.type}
                size="small"
              />
            </View>

            <Text style={styles.departmentDescription}>{dept.description}</Text>

            <View style={styles.budgetSection}>
              <View style={styles.budgetRow}>
                <Text style={styles.budgetLabel}>Budget</Text>
                <Text style={styles.budgetValue}>{formatCurrency(dept.budget)}</Text>
              </View>
              <View style={styles.budgetRow}>
                <Text style={styles.budgetLabel}>Spent</Text>
                <Text style={styles.budgetValue}>{formatCurrency(dept.expenditure)}</Text>
              </View>
              <ProgressBar progress={budgetUsage} height={8} />
            </View>

            <View style={styles.stats}>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{dept.projectIds.length}</Text>
                <Text style={styles.statLabel}>Projects</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{dept.performanceRating}%</Text>
                <Text style={styles.statLabel}>Performance</Text>
              </View>
              <View style={styles.stat}>
                <Text style={styles.statValue}>{dept.issues.length}</Text>
                <Text style={styles.statLabel}>Issues</Text>
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
  departmentCard: {
    margin: 16,
    marginBottom: 16,
  },
  departmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  departmentName: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    flex: 1,
  },
  departmentDescription: {
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

