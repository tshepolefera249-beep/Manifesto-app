import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { Card } from "@components/Card";
import { Badge } from "@components/Badge";
import { colors } from "@utils/colors";
import { formatDate } from "@utils/format";
import { mockParliamentItems } from "@data/mockData";

type ParliamentScreenNavigationProp = StackNavigationProp<RootStackParamList, "Parliament">;

export const ParliamentScreen = () => {
  const navigation = useNavigation<ParliamentScreenNavigationProp>();

  return (
    <ScrollView style={styles.container}>
      {mockParliamentItems.map((item) => (
        <Card
          key={item._id}
          style={styles.itemCard}
          onPress={() => navigation.navigate("ParliamentDetail", { itemId: item._id })}
        >
          <View style={styles.itemHeader}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Badge
              variant={
                item.status === "passed" ? "success" :
                item.status === "rejected" ? "error" :
                item.status === "voting" ? "warning" : "secondary"
              }
              text={item.status}
              size="small"
            />
          </View>

          <Text style={styles.itemDescription}>{item.description}</Text>

          <View style={styles.itemFooter}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemType}>{item.type}</Text>
              {item.billNumber && (
                <Text style={styles.billNumber}>Bill #{item.billNumber}</Text>
              )}
            </View>
            <Text style={styles.itemDate}>{formatDate(item.sessionDate)}</Text>
          </View>

          {item.attendance && (
            <View style={styles.attendance}>
              <Text style={styles.attendanceLabel}>Attendance</Text>
              <Text style={styles.attendanceValue}>
                {item.attendance.present} / {item.attendance.total} present
              </Text>
            </View>
          )}
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
  itemCard: {
    margin: 16,
    marginBottom: 16,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
    flex: 1,
    marginRight: 8,
  },
  itemDescription: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  itemFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  itemInfo: {
    flex: 1,
  },
  itemType: {
    fontSize: 12,
    color: colors.text.secondary,
    textTransform: "uppercase",
    marginBottom: 4,
  },
  billNumber: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.primary.blue,
  },
  itemDate: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  attendance: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  attendanceLabel: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 4,
  },
  attendanceValue: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text.primary,
  },
});

