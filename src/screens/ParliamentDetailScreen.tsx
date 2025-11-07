import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { Card } from "@components/Card";
import { Badge } from "@components/Badge";
import { colors } from "@utils/colors";
import { formatDate } from "@utils/format";
import { mockParliamentItems } from "@data/mockData";

type ParliamentDetailScreenRouteProp = RouteProp<RootStackParamList, "ParliamentDetail">;

interface Props {
  route: ParliamentDetailScreenRouteProp;
}

export const ParliamentDetailScreen: React.FC<Props> = ({ route }) => {
  const item = mockParliamentItems.find(i => i._id === route.params.itemId);

  if (!item) {
    return (
      <View style={styles.container}>
        <Text>Item not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{item.title}</Text>
        <Badge
          variant={
            item.status === "passed" ? "success" :
            item.status === "rejected" ? "error" :
            item.status === "voting" ? "warning" : "secondary"
          }
          text={item.status}
        />
        <Text style={styles.description}>{item.description}</Text>
      </View>

      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Details</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Type</Text>
          <Text style={styles.infoValue}>{item.type}</Text>
        </View>
        {item.billNumber && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Bill Number</Text>
            <Text style={styles.infoValue}>{item.billNumber}</Text>
          </View>
        )}
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Session Date</Text>
          <Text style={styles.infoValue}>{formatDate(item.sessionDate)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Status</Text>
          <Text style={styles.infoValue}>{item.status}</Text>
        </View>
      </Card>

      {item.attendance && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Attendance</Text>
          <View style={styles.attendanceStats}>
            <View style={styles.attendanceStat}>
              <Text style={styles.attendanceValue}>{item.attendance.present}</Text>
              <Text style={styles.attendanceLabel}>Present</Text>
            </View>
            <View style={styles.attendanceStat}>
              <Text style={styles.attendanceValue}>{item.attendance.absent}</Text>
              <Text style={styles.attendanceLabel}>Absent</Text>
            </View>
            <View style={styles.attendanceStat}>
              <Text style={styles.attendanceValue}>{item.attendance.total}</Text>
              <Text style={styles.attendanceLabel}>Total</Text>
            </View>
          </View>
        </Card>
      )}

      {item.votingRecords && item.votingRecords.length > 0 && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Voting Records</Text>
          {item.votingRecords.map((record, index) => (
            <View key={index} style={styles.votingRecord}>
              <Text style={styles.votingLeader}>Leader {record.leaderId}</Text>
              <Badge
                variant={
                  record.vote === "for" ? "success" :
                  record.vote === "against" ? "error" :
                  record.vote === "abstain" ? "warning" : "secondary"
                }
                text={record.vote}
                size="small"
              />
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
  attendanceStats: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  attendanceStat: {
    alignItems: "center",
  },
  attendanceValue: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 4,
  },
  attendanceLabel: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  votingRecord: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  votingLeader: {
    fontSize: 14,
    color: colors.text.primary,
    flex: 1,
  },
});

