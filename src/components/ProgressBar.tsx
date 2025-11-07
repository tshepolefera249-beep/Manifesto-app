import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@utils/colors";

interface ProgressBarProps {
  progress: number; // 0-100
  total?: number;
  current?: number;
  showLabel?: boolean;
  color?: string;
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  total,
  current,
  showLabel = false,
  color = colors.primary.blue,
  height = 8,
}) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View style={styles.container}>
      {showLabel && (total !== undefined || current !== undefined) && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>
            {current !== undefined && total !== undefined
              ? `${current} / ${total}`
              : `${Math.round(clampedProgress)}%`}
          </Text>
        </View>
      )}
      <View style={[styles.track, { height }]}>
        <View
          style={[
            styles.fill,
            {
              width: `${clampedProgress}%`,
              backgroundColor: color,
              height,
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  labelContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: "600",
  },
  track: {
    backgroundColor: colors.primary.grey,
    borderRadius: 4,
    overflow: "hidden",
  },
  fill: {
    borderRadius: 4,
  },
});

