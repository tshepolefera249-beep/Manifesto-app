import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "@utils/colors";

interface BadgeProps {
  text: string;
  variant?: "primary" | "secondary" | "success" | "warning" | "error" | "info";
  size?: "small" | "medium";
}

export const Badge: React.FC<BadgeProps> = ({
  text,
  variant = "primary",
  size = "medium",
}) => {
  const badgeStyle = [
    styles.badge,
    styles[variant],
    styles[size],
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
  },
  primary: {
    backgroundColor: colors.primary.blue + "20",
  },
  secondary: {
    backgroundColor: colors.primary.grey,
  },
  success: {
    backgroundColor: colors.status.success + "20",
  },
  warning: {
    backgroundColor: colors.status.warning + "20",
  },
  error: {
    backgroundColor: colors.status.error + "20",
  },
  info: {
    backgroundColor: colors.status.info + "20",
  },
  small: {
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  medium: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  text: {
    fontWeight: "600",
  },
  primaryText: {
    color: colors.primary.blue,
  },
  secondaryText: {
    color: colors.text.primary,
  },
  successText: {
    color: colors.status.success,
  },
  warningText: {
    color: colors.status.warning,
  },
  errorText: {
    color: colors.status.error,
  },
  infoText: {
    color: colors.status.info,
  },
  smallText: {
    fontSize: 10,
  },
  mediumText: {
    fontSize: 12,
  },
});

