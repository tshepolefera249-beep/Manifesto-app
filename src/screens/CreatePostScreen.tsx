import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@navigation/types";
import { Button } from "@components/Button";
import { colors } from "@utils/colors";

type CreatePostScreenNavigationProp = StackNavigationProp<RootStackParamList, "CreatePost">;

export const CreatePostScreen = () => {
  const navigation = useNavigation<CreatePostScreenNavigationProp>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedType, setSelectedType] = useState<"debate" | "poll" | "petition" | "media" | "update">("update");
  const [loading, setLoading] = useState(false);

  const postTypes = [
    { id: "update", label: "Update" },
    { id: "debate", label: "Debate" },
    { id: "poll", label: "Poll" },
    { id: "petition", label: "Petition" },
    { id: "media", label: "Media" },
  ];

  const handleCreatePost = async () => {
    setLoading(true);
    // TODO: Create post in Convex
    setTimeout(() => {
      setLoading(false);
      navigation.goBack();
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Post Type</Text>
        <View style={styles.typeSelector}>
          {postTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[
                styles.typeChip,
                selectedType === type.id && styles.typeChipSelected,
              ]}
              onPress={() => setSelectedType(type.id as any)}
            >
              <Text
                style={[
                  styles.typeText,
                  selectedType === type.id && styles.typeTextSelected,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title..."
          placeholderTextColor={colors.text.secondary}
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Content</Text>
        <TextInput
          style={styles.contentInput}
          placeholder="Write your post..."
          placeholderTextColor={colors.text.secondary}
          value={content}
          onChangeText={setContent}
          multiline
          numberOfLines={8}
        />

        <Button
          title="Create Post"
          onPress={handleCreatePost}
          loading={loading}
          disabled={!title || !content}
          style={styles.button}
        />
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
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 8,
    marginTop: 16,
  },
  typeSelector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  typeChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.primary.grey,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  typeChipSelected: {
    backgroundColor: colors.primary.blue,
    borderColor: colors.primary.blue,
  },
  typeText: {
    fontSize: 14,
    color: colors.text.primary,
  },
  typeTextSelected: {
    color: colors.primary.white,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: colors.text.primary,
    backgroundColor: colors.background.primary,
    marginBottom: 8,
  },
  contentInput: {
    borderWidth: 1,
    borderColor: colors.border.medium,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    color: colors.text.primary,
    backgroundColor: colors.background.primary,
    minHeight: 200,
    textAlignVertical: "top",
    marginBottom: 8,
  },
  button: {
    marginTop: 24,
  },
});

