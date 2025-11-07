import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { MainTabNavigator } from "./MainTabNavigator";
import { RootStackParamList } from "./types";
import { useAuthStore } from "@store/authStore";
import { SignInScreen } from "@screens/SignInScreen";
import { SignUpScreen } from "@screens/SignUpScreen";
import { OTPScreen } from "@screens/OTPScreen";
import { ProfileSetupScreen } from "@screens/ProfileSetupScreen";
import { GovernmentHubScreen } from "@screens/GovernmentHubScreen";
import { LeadersScreen } from "@screens/LeadersScreen";
import { LeaderDetailScreen } from "@screens/LeaderDetailScreen";
import { DepartmentsScreen } from "@screens/DepartmentsScreen";
import { DepartmentDetailScreen } from "@screens/DepartmentDetailScreen";
import { ProjectsScreen } from "@screens/ProjectsScreen";
import { ProjectDetailScreen } from "@screens/ProjectDetailScreen";
import { ParliamentScreen } from "@screens/ParliamentScreen";
import { ParliamentDetailScreen } from "@screens/ParliamentDetailScreen";
import { CreatePostScreen } from "@screens/CreatePostScreen";
import { CameraScreen } from "@screens/CameraScreen";
import { DebateDetailScreen } from "@screens/DebateDetailScreen";
import { PollDetailScreen } from "@screens/PollDetailScreen";
import { PetitionDetailScreen } from "@screens/PetitionDetailScreen";

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated } = useAuthStore();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FFFFFF",
          },
          headerTintColor: "#000000",
          headerTitleStyle: {
            fontWeight: "700",
          },
        }}
      >
        {!isAuthenticated ? (
          <>
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: "Sign Up" }} />
            <Stack.Screen name="OTPScreen" component={OTPScreen} options={{ title: "Verify Phone" }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Main" component={MainTabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ title: "Complete Profile" }} />
            <Stack.Screen name="GovernmentHub" component={GovernmentHubScreen} options={{ title: "Government Hub" }} />
            <Stack.Screen name="Leaders" component={LeadersScreen} options={{ title: "Leaders" }} />
            <Stack.Screen name="LeaderDetail" component={LeaderDetailScreen} options={{ title: "Leader Profile" }} />
            <Stack.Screen name="Departments" component={DepartmentsScreen} options={{ title: "Departments" }} />
            <Stack.Screen name="DepartmentDetail" component={DepartmentDetailScreen} options={{ title: "Department" }} />
            <Stack.Screen name="Projects" component={ProjectsScreen} options={{ title: "Projects & Tenders" }} />
            <Stack.Screen name="ProjectDetail" component={ProjectDetailScreen} options={{ title: "Project Details" }} />
            <Stack.Screen name="Parliament" component={ParliamentScreen} options={{ title: "Parliament" }} />
            <Stack.Screen name="ParliamentDetail" component={ParliamentDetailScreen} options={{ title: "Parliament Item" }} />
            <Stack.Screen name="CreatePost" component={CreatePostScreen} options={{ title: "Create Post" }} />
            <Stack.Screen name="Camera" component={CameraScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DebateDetail" component={DebateDetailScreen} options={{ title: "Debate" }} />
            <Stack.Screen name="PollDetail" component={PollDetailScreen} options={{ title: "Poll" }} />
            <Stack.Screen name="PetitionDetail" component={PetitionDetailScreen} options={{ title: "Petition" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

