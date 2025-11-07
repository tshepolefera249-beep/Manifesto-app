import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@navigation/types";
import { mockDebates } from "@data/mockData";
import { Card } from "@components/Card";
import { Button } from "@components/Button";
import { colors } from "@utils/colors";

type DebateDetailScreenRouteProp = RouteProp<RootStackParamList, "DebateDetail">;

interface Props {
  route: DebateDetailScreenRouteProp;
}

export const DebateDetailScreen: React.FC<Props> = ({ route }) => {
  const debate = mockDebates.find(d => d._id === route.params.debateId);

  if (!debate) {
    return (
      <View style={styles.container}>
        <Text>Debate not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>{debate.title}</Text>
        <Text style={styles.description}>{debate.description}</Text>
        {/* TODO: Add full debate details, comments, reactions */}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  card: {
    margin: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
  },
});

