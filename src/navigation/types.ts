import { NavigatorScreenParams } from "@react-navigation/native";
import { NavigationParamList } from "@types/index";

export type RootStackParamList = {
  Main: NavigatorScreenParams<MainTabParamList>;
  SignIn: undefined;
  SignUp: undefined;
  OTPScreen: { phone: string };
  ProfileSetup: undefined;
  GovernmentHub: undefined;
  Leaders: undefined;
  LeaderDetail: { leaderId: string };
  Departments: undefined;
  DepartmentDetail: { departmentId: string };
  Projects: undefined;
  ProjectDetail: { projectId: string };
  Parliament: undefined;
  ParliamentDetail: { itemId: string };
  CreatePost: undefined;
  Camera: undefined;
  DebateDetail: { debateId: string };
  PollDetail: { pollId: string };
  PetitionDetail: { petitionId: string };
};

export type MainTabParamList = {
  Home: undefined;
  Debates: undefined;
  Polls: undefined;
  Petitions: undefined;
  Profile: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

