import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "@navigation/types";
import { mockPetitions } from "@data/mockData";
import { Card } from "@components/Card";
import { Button } from "@components/Button";
import { colors } from "@utils/colors";

type PetitionDetailScreenRouteProp = RouteProp<RootStackParamList, "PetitionDetail">;

interface Props {
  route: PetitionDetailScreenRouteProp;
}

export const PetitionDetailScreen: React.FC<Props> = ({ route }) => {
  const petition = mockPetitions.find(p => p._id === route.params.petitionId);

  if (!petition) {
    return (
      <View style={styles.container}>
        <Text>Petition not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card}>
        <Text style={styles.title}>{petition.title}</Text>
        <Text style={styles.description}>{petition.description}</Text>
        {/* TODO: Add full petition details, sign button */}
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

