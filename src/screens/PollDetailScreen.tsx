import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@navigation/types";
import { mockPolls } from "@data/mockData";
import { Card } from "@components/Card";
import { colors } from "@utils/colors";

type PollDetailScreenRouteProp = RouteProp<RootStackParamList, "PollDetail">;

interface Props {
  route: PollDetailScreenRouteProp;
}

export const PollDetailScreen: React.FC<Props> = ({ route }) => {
  const poll = mockPolls.find(p => p._id === route.params.pollId);

  if (!poll) {
    return (
      <View style={styles.container}>
        <Text>Poll not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>{poll.title}</Text>
        <Text style={styles.description}>{poll.description}</Text>
        {/* TODO: Add full poll details, voting interface */}
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

