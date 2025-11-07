import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "@utils/colors";
import { Filter } from "@types/index";

interface FilterCarouselProps {
  filters: Filter[];
  onFilterSelect: (filterId: string) => void;
  selectedFilterId?: string;
}

export const FilterCarousel: React.FC<FilterCarouselProps> = ({
  filters,
  onFilterSelect,
  selectedFilterId,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {filters.map((filter) => {
        const isSelected = selectedFilterId === filter.id;
        return (
          <TouchableOpacity
            key={filter.id}
            style={[styles.filterItem, isSelected && styles.filterItemSelected]}
            onPress={() => onFilterSelect(filter.id)}
          >
            <View style={[styles.filterPreview, { backgroundColor: filter.preview }]} />
            <Text style={[styles.filterName, isSelected && styles.filterNameSelected]}>
              {filter.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  filterItem: {
    alignItems: "center",
    marginRight: 12,
  },
  filterItemSelected: {
    opacity: 1,
  },
  filterPreview: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: colors.border.light,
  },
  filterName: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  filterNameSelected: {
    color: colors.primary.blue,
    fontWeight: "600",
  },
});

