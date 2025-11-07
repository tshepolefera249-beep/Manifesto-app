import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { colors } from "@utils/colors";

interface AvatarProps {
  uri?: string;
  name: string;
  size?: number;
  showBadge?: boolean;
  badgeText?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  uri,
  name,
  size = 40,
  showBadge = false,
  badgeText,
}) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const avatarStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
  };

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {uri ? (
        <Image source={{ uri }} style={avatarStyle} />
      ) : (
        <View style={[styles.placeholder, avatarStyle]}>
          <Text style={[styles.initials, { fontSize: size * 0.4 }]}>{initials}</Text>
        </View>
      )}
      {showBadge && (
        <View style={[styles.badge, { width: size * 0.4, height: size * 0.4, borderRadius: size * 0.2 }]}>
          {badgeText && (
            <Text style={[styles.badgeText, { fontSize: size * 0.25 }]}>{badgeText}</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  placeholder: {
    backgroundColor: colors.primary.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: colors.primary.white,
    fontWeight: "600",
  },
  badge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: colors.status.success,
    borderWidth: 2,
    borderColor: colors.background.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: colors.primary.white,
    fontWeight: "700",
  },
});

