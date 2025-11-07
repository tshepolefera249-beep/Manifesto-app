import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { Button } from "@components/Button";
import { colors } from "@utils/colors";
import { useAuthStore } from "@store/authStore";

type ProfileSetupScreenNavigationProp = StackNavigationProp<RootStackParamList, "ProfileSetup">;

export const ProfileSetupScreen = () => {
  const navigation = useNavigation<ProfileSetupScreenNavigationProp>();
  const { user, updateUser } = useAuthStore();
  const [bio, setBio] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const availableInterests = [
    "Healthcare",
    "Education",
    "Infrastructure",
    "Economy",
    "Environment",
    "Security",
    "Housing",
    "Transport",
  ];

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    // TODO: Update user profile in Convex
    updateUser({
      bio,
      civicInterests: selectedInterests,
    });
    setLoading(false);
    // Navigate to main app
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  };

  const handleSkip = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Main" }],
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>Optional: Add a bio and select your interests</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Bio</Text>
          <TextInput
            style={styles.bioInput}
            placeholder="Tell us about yourself..."
            placeholderTextColor={colors.text.secondary}
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={4}
          />

          <Text style={styles.label}>Civic Interests</Text>
          <View style={styles.interests}>
            {availableInterests.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <TouchableOpacity
                  key={interest}
                  style={[styles.interestChip, isSelected && styles.interestChipSelected]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text style={[styles.interestText, isSelected && styles.interestTextSelected]}>
                    {interest}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <Button
            title="Complete Setup"
            onPress={handleComplete}
            loading={loading}
            style={styles.button}
          />

          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.linkText}>Skip for now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 32,
  },
  form: {
    gap: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 8,
  },
  bioInput: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: colors.text.primary,
    backgroundColor: colors.background.primary,
    minHeight: 100,
    textAlignVertical: "top",
  },
  interests: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  interestChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.primary.grey,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  interestChipSelected: {
    backgroundColor: colors.primary.blue,
    borderColor: colors.primary.blue,
  },
  interestText: {
    fontSize: 14,
    color: colors.text.primary,
  },
  interestTextSelected: {
    color: colors.primary.white,
  },
  button: {
    marginTop: 8,
  },
  linkText: {
    fontSize: 14,
    color: colors.primary.blue,
    textAlign: "center",
    marginTop: 16,
  },
});

