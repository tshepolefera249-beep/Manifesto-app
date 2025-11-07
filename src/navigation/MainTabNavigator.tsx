import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "@screens/HomeScreen";
import { DebatesScreen } from "@screens/DebatesScreen";
import { PollsScreen } from "@screens/PollsScreen";
import { PetitionsScreen } from "@screens/PetitionsScreen";
import { ProfileScreen } from "@screens/ProfileScreen";
import { MainTabParamList } from "./types";
import { colors } from "@utils/colors";

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary.blue,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.background.primary,
          borderTopColor: colors.border.light,
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerStyle: {
          backgroundColor: colors.background.primary,
        },
        headerTintColor: colors.text.primary,
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <TabIcon icon="🏠" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Debates"
        component={DebatesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <TabIcon icon="💬" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Polls"
        component={PollsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <TabIcon icon="📊" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Petitions"
        component={PetitionsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <TabIcon icon="✍️" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <TabIcon icon="👤" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// Simple icon component for tabs
const TabIcon = ({ icon, size, color }: { icon: string; size: number; color: string }) => (
  <Text style={{ fontSize: size, color }}>{icon}</Text>
);

